import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import {
  ENQUIRY_BUDGETS,
  ENQUIRY_SERVICES,
} from "@/lib/enquiry-options";
import {
  HostingerMailApiError,
  sendEnquiryEmail,
} from "@/lib/enquiry-mail";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12 * 1024;
const MAX_TURNSTILE_TOKEN_LENGTH = 2048;

const EMAIL_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_LIMIT = 2;

const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_LIMIT = 30;
const MAX_EMAIL_RATE_LIMIT_KEYS = 2000;

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const emailWindows = new Map<string, number[]>();
let recentRequests: number[] = [];

type FieldName =
  | "fullName"
  | "organisation"
  | "email"
  | "service"
  | "details"
  | "budget";

type FieldErrors = Partial<Record<FieldName, string>>;
type EnquiryInput = Record<string, unknown>;

type TurnstileResult =
  | "valid"
  | "invalid"
  | "unavailable"
  | "misconfigured";

type BodyReadResult =
  | { success: true; body: string }
  | {
      success: false;
      reason: "too_large" | "invalid_utf8" | "read_failed";
    };

function json(
  message: string,
  status: number,
  options: {
    errors?: FieldErrors;
    kind?: string;
  } = {},
) {
  return NextResponse.json(
    { message, ...options },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

function isGlobalRateLimited(now: number): boolean {
  recentRequests = recentRequests.filter(
    (timestamp) => now - timestamp < GLOBAL_WINDOW_MS,
  );

  if (recentRequests.length >= GLOBAL_LIMIT) {
    return true;
  }

  recentRequests.push(now);
  return false;
}

function isEmailRateLimited(
  email: string,
  now: number,
): boolean {
  for (const [key, timestamps] of emailWindows) {
    const active = timestamps.filter(
      (timestamp) => now - timestamp < EMAIL_WINDOW_MS,
    );

    if (active.length > 0) {
      emailWindows.set(key, active);
    } else {
      emailWindows.delete(key);
    }
  }

  const key = createHash("sha256")
    .update(email)
    .digest("hex");

  const timestamps = emailWindows.get(key) ?? [];

  if (timestamps.length >= EMAIL_LIMIT) {
    return true;
  }

  if (
    !emailWindows.has(key) &&
    emailWindows.size >= MAX_EMAIL_RATE_LIMIT_KEYS
  ) {
    const oldest = emailWindows.keys().next().value;

    if (oldest !== undefined) {
      emailWindows.delete(oldest);
    }
  }

  emailWindows.set(key, [...timestamps, now]);

  return false;
}

async function readLimitedBody(
  request: Request,
): Promise<BodyReadResult> {
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    reader = request.body?.getReader();

    if (!reader) {
      return { success: true, body: "" };
    }

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;
      if (!value) continue;

      size += value.byteLength;

      if (size > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return { success: false, reason: "too_large" };
      }

      chunks.push(value);
    }
  } catch {
    if (reader) {
      await reader.cancel().catch(() => {});
    }

    return { success: false, reason: "read_failed" };
  } finally {
    reader?.releaseLock();
  }

  const body = new Uint8Array(size);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return {
      success: true,
      body: new TextDecoder("utf-8", {
        fatal: true,
      }).decode(body),
    };
  } catch {
    return { success: false, reason: "invalid_utf8" };
  }
}

function stringValue(
  input: EnquiryInput,
  field: string,
): string | null {
  return typeof input[field] === "string"
    ? (input[field] as string)
    : null;
}

function oneLine(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function validate(input: EnquiryInput) {
  const errors: FieldErrors = {};

  const rawName = stringValue(input, "fullName");
  const fullName =
    rawName === null ? "" : oneLine(rawName);

  if (!fullName || fullName.length > 100) {
    errors.fullName =
      "Enter your name (up to 100 characters).";
  }

  const rawOrganisation = stringValue(
    input,
    "organisation",
  );

  const organisation =
    rawOrganisation === null
      ? ""
      : oneLine(rawOrganisation);

  if (
    input.organisation !== undefined &&
    rawOrganisation === null
  ) {
    errors.organisation =
      "Use plain text for your business or organisation.";
  }

  if (organisation.length > 150) {
    errors.organisation =
      "Use 150 characters or fewer.";
  }

  const rawEmail = stringValue(input, "email");
  const email =
    rawEmail === null
      ? ""
      : rawEmail.trim().toLowerCase();

  const [localPart, ...domainParts] = email.split("@");

  const emailPattern =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i;

  const domainPattern =
    /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

  if (
    email.length > 254 ||
    !localPart ||
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    domainParts.length !== 1 ||
    !emailPattern.test(localPart) ||
    !domainPattern.test(domainParts[0] ?? "")
  ) {
    errors.email = "Enter a valid email address.";
  }

  const service = stringValue(input, "service") ?? "";

  if (
    !(ENQUIRY_SERVICES as readonly string[]).includes(
      service,
    )
  ) {
    errors.service =
      "Choose one of the listed services.";
  }

  const rawDetails = stringValue(input, "details");

  const details =
    rawDetails === null
      ? ""
      : rawDetails.replace(/\r\n?/g, "\n").trim();

  if (
    !details ||
    details.length > 3000 ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(
      details,
    )
  ) {
    errors.details =
      "Add enquiry details using up to 3,000 characters.";
  }

  const budget =
    input.budget === undefined
      ? "Not specified"
      : stringValue(input, "budget") ?? "";

  if (
    !(ENQUIRY_BUDGETS as readonly string[]).includes(
      budget,
    )
  ) {
    errors.budget =
      "Choose a listed budget range.";
  }

  const website =
    input.website === undefined
      ? ""
      : stringValue(input, "website");

  if (website === null || website.length > 0) {
    errors.details =
      "We could not accept this submission. Please review the form and try again.";
  }

  const turnstileToken =
    stringValue(input, "turnstileToken") ?? "";

  return {
    errors,
    fullName,
    organisation,
    email,
    service,
    details,
    budget,
    turnstileToken,
  };
}

async function verifyTurnstile(
  token: string,
): Promise<TurnstileResult> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY?.trim();

  const allowedHostnames = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? ""
  )
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (!secret || allowedHostnames.length === 0) {
    return "misconfigured";
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        secret,
        response: token,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return "unavailable";

    const result: unknown = await response.json();

    if (
      result === null ||
      typeof result !== "object"
    ) {
      return "unavailable";
    }

    const validation = result as {
      success?: unknown;
      hostname?: unknown;
      action?: unknown;
    };

    if (validation.success !== true) {
      return "invalid";
    }

    if (
      typeof validation.hostname !== "string" ||
      !allowedHostnames.includes(
        validation.hostname.toLowerCase(),
      )
    ) {
      return "invalid";
    }

    if (validation.action !== "enquiry") {
      return "invalid";
    }

    return "valid";
  } catch {
    return "unavailable";
  }
}

export async function POST(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return json(
      "The enquiry service is temporarily unavailable. Please email info@pmazimelutechnologies.com.",
      503,
      { kind: "unavailable" },
    );
  }

  if (
    request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      .trim()
      .toLowerCase() !== "application/json"
  ) {
    return json(
      "Submit the enquiry using the website form.",
      415,
      { kind: "invalid_request" },
    );
  }

  const origin = request.headers.get("origin");

  if (
    !origin ||
    origin !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return json(
      "We could not verify this form submission. Please reload the page and try again.",
      403,
      { kind: "invalid_request" },
    );
  }

  // Global limit: all same-origin POST attempts.
  // Maximum 30 requests in a rolling 10-minute window.
  if (isGlobalRateLimited(Date.now())) {
    return json(
      "Too many requests have been received recently. Please wait and try again.",
      429,
      { kind: "rate_limit" },
    );
  }

  const declaredLength = Number(
    request.headers.get("content-length") ?? 0,
  );

  if (declaredLength > MAX_BODY_BYTES) {
    return json(
      "The submission is too large. Please shorten the details and try again.",
      413,
      { kind: "invalid_request" },
    );
  }

  const bodyResult = await readLimitedBody(request);

  if (!bodyResult.success) {
    switch (bodyResult.reason) {
      case "too_large":
        return json(
          "The submission is too large. Please shorten the details and try again.",
          413,
          { kind: "invalid_request" },
        );

      case "invalid_utf8":
        return json(
          "The submission contains invalid text encoding. Please review the form and try again.",
          400,
          { kind: "invalid_request" },
        );

      case "read_failed":
        return json(
          "The submission could not be read. Please try again.",
          400,
          { kind: "invalid_request" },
        );
    }
  }

  let input: unknown;

  try {
    input = JSON.parse(bodyResult.body);
  } catch {
    return json(
      "The submission could not be read. Please review the form and try again.",
      400,
      { kind: "invalid_request" },
    );
  }

  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    return json(
      "The submission could not be read. Please review the form and try again.",
      400,
      { kind: "invalid_request" },
    );
  }

  const validated = validate(input as EnquiryInput);

  if (Object.keys(validated.errors).length > 0) {
    return json(
      "Please correct the highlighted fields and try again.",
      422,
      {
        kind: "validation",
        errors: validated.errors,
      },
    );
  }

  if (
    validated.turnstileToken.length === 0 ||
    validated.turnstileToken.length >
      MAX_TURNSTILE_TOKEN_LENGTH
  ) {
    return json(
      "Please complete the security check and try again.",
      400,
      { kind: "turnstile" },
    );
  }

  // Verify Turnstile before consuming the per-email limit.
  const turnstileResult = await verifyTurnstile(
    validated.turnstileToken,
  );

  if (turnstileResult === "misconfigured") {
    return json(
      "Online enquiry verification is not configured yet. Please email info@pmazimelutechnologies.com.",
      503,
      { kind: "unavailable" },
    );
  }

  if (turnstileResult === "unavailable") {
    return json(
      "The security check is temporarily unavailable. Please try again shortly or email info@pmazimelutechnologies.com.",
      503,
      { kind: "turnstile_unavailable" },
    );
  }

  if (turnstileResult === "invalid") {
    return json(
      "The security check expired or could not be verified. Please complete it again.",
      403,
      { kind: "turnstile" },
    );
  }

  // Per-email limit: maximum 2 verified attempts per hour.
  // The email is hashed before being used as the map key.
  if (
    isEmailRateLimited(validated.email, Date.now())
  ) {
    return json(
      "Too many enquiries were submitted recently. Please wait and try again, or email us directly.",
      429,
      { kind: "rate_limit" },
    );
  }

  try {
    await sendEnquiryEmail({
      fullName: validated.fullName,
      organisation: validated.organisation,
      email: validated.email,
      service: validated.service,
      details: validated.details,
      budget: validated.budget,
    });
  } catch (error: unknown) {
    if (error instanceof HostingerMailApiError) {
      console.error(
        "[PMAT HOSTINGER MAIL API ERROR]",
        {
          status: error.status,
          apiCode: error.apiCode,
        },
      );
    } else {
      console.error(
        "[PMAT HOSTINGER MAIL API ERROR]",
        {
          name:
            error instanceof Error
              ? error.name
              : "UnknownError",
        },
      );
    }

    return json(
      "We could not send your enquiry just now. Please try again later or email info@pmazimelutechnologies.com.",
      503,
      { kind: "delivery_unavailable" },
    );
  }

  return json(
    "Your enquiry has been sent. We will be in touch.",
    200,
    { kind: "success" },
  );
}
