import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { ENQUIRY_BUDGETS, ENQUIRY_SERVICES } from "@/lib/enquiry-options";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12 * 1024;
const EMAIL_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_LIMIT = 2;
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_LIMIT = 30;
const emailWindows = new Map<string, number[]>();
let recentRequests: number[] = [];

type FieldName = "fullName" | "organisation" | "email" | "service" | "details" | "budget";
type FieldErrors = Partial<Record<FieldName, string>>;
type EnquiryInput = Record<string, unknown>;

function json(message: string, status: number, extra: { errors?: FieldErrors } = {}) {
  return NextResponse.json({ message, ...extra }, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

async function readLimitedBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    return null;
  }
}

function stringValue(input: EnquiryInput, field: string): string | null {
  return typeof input[field] === "string" ? input[field] as string : null;
}

function oneLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function validate(input: EnquiryInput) {
  const errors: FieldErrors = {};
  const rawName = stringValue(input, "fullName");
  const fullName = rawName === null ? "" : oneLine(rawName);
  if (!fullName || fullName.length > 100) errors.fullName = "Enter your name (up to 100 characters).";

  const rawOrganisation = stringValue(input, "organisation");
  const organisation = rawOrganisation === null ? "" : oneLine(rawOrganisation);
  if (organisation.length > 150) errors.organisation = "Use 150 characters or fewer.";

  const rawEmail = stringValue(input, "email");
  const email = rawEmail === null ? "" : rawEmail.trim().toLowerCase();
  const [localPart, ...domainParts] = email.split("@");
  const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i;
  const domainPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (email.length > 254 || !localPart || localPart.length > 64 || localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..") || domainParts.length !== 1 || !emailPattern.test(localPart) || !domainPattern.test(domainParts[0] ?? "")) {
    errors.email = "Enter a valid email address.";
  }

  const service = stringValue(input, "service") ?? "";
  if (!(ENQUIRY_SERVICES as readonly string[]).includes(service)) errors.service = "Choose one of the listed services.";

  const rawDetails = stringValue(input, "details");
  const details = rawDetails === null ? "" : rawDetails.replace(/\r\n?/g, "\n").trim();
  if (!details || details.length > 3000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(details)) {
    errors.details = "Add enquiry details using up to 3,000 characters.";
  }

  const budget = stringValue(input, "budget") ?? "Not specified";
  if (!(ENQUIRY_BUDGETS as readonly string[]).includes(budget)) errors.budget = "Choose a listed budget range.";

  const website = stringValue(input, "website") ?? "";
  if (website.length > 0) errors.details = "We could not accept this submission. Please review the form and try again.";

  return { errors, fullName, organisation, email, service, details, budget };
}

function isRateLimited(email: string, now: number): boolean {
  recentRequests = recentRequests.filter((timestamp) => now - timestamp < GLOBAL_WINDOW_MS);
  if (recentRequests.length >= GLOBAL_LIMIT) return true;

  for (const [key, timestamps] of emailWindows) {
    const active = timestamps.filter((timestamp) => now - timestamp < EMAIL_WINDOW_MS);
    if (active.length) emailWindows.set(key, active);
    else emailWindows.delete(key);
  }

  const key = createHash("sha256").update(email).digest("hex");
  const timestamps = emailWindows.get(key) ?? [];
  if (timestamps.length >= EMAIL_LIMIT) return true;

  // Keep process memory bounded if clients rotate through many email values.
  if (!emailWindows.has(key) && emailWindows.size >= 2000) {
    const oldest = emailWindows.keys().next().value;
    if (oldest) emailWindows.delete(oldest);
  }

  recentRequests.push(now);
  emailWindows.set(key, [...timestamps, now]);
  return false;
}

export async function POST(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return json("The enquiry service is temporarily unavailable. Please email info@pmazimelutechnologies.com.", 503);
  }

  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return json("Submit the enquiry using the website form.", 415);
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return json("We could not verify this form submission. Please reload the page and try again.", 403);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json("The submission is too large. Please shorten the details and try again.", 413);

  const body = await readLimitedBody(request);
  if (body === null) return json("The submission is too large or malformed. Please review the form and try again.", 413);

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return json("The submission could not be read. Please review the form and try again.", 400);
  }
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return json("The submission could not be read. Please review the form and try again.", 400);
  }

  const validated = validate(input as EnquiryInput);
  if (Object.keys(validated.errors).length) return json("Please correct the highlighted fields and try again.", 422, { errors: validated.errors });

  if (isRateLimited(validated.email, Date.now())) {
    return json("Too many enquiries were submitted recently. Please wait and try again, or email us directly.", 429);
  }

  // Email delivery is intentionally unavailable until the owner configures a
  // server-side provider. No success is returned and no enquiry is stored.
  // Hostinger supports SMTP, but account-specific credentials/provider details
  // are not configured in this repository and must be supplied out of band.
  return json("Online enquiry delivery is not configured yet. Please email info@pmazimelutechnologies.com.", 503);
}
