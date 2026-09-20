import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 150;
const MAX_SERVICE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

const MAX_REQUEST_SIZE = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const HOSTINGER_TIMEOUT_MS = 10_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type DuplicateEntry = {
  timestamp: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const duplicateStore = new Map<string, DuplicateEntry>();

function clean(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function getExpectedOrigin(request: Request) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      return new URL(configuredSiteUrl).origin;
    } catch {
      return null;
    }
  }

  return new URL(request.url).origin;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  if (
    process.env.NODE_ENV !== "production" &&
    (origin === "http://localhost:3000" ||
      origin === "http://127.0.0.1:3000")
  ) {
    return true;
  }

  const expectedOrigin = getExpectedOrigin(request);

  return expectedOrigin ? origin === expectedOrigin : false;
}

function isAllowedHost(request: Request) {
  const host = request.headers.get("host");

  if (!host) {
    return false;
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredSiteUrl) {
    return true;
  }

  try {
    const expectedHost = new URL(configuredSiteUrl).host;

    if (host === expectedHost) {
      return true;
    }

    if (
      process.env.NODE_ENV !== "production" &&
      (host.startsWith("localhost:") || host.startsWith("127.0.0.1:"))
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now >= existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfter: 0,
    };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    retryAfter: 0,
  };
}

function createDuplicateKey(
  ip: string,
  email: string,
  service: string,
  message: string,
) {
  return `${ip}|${email.toLowerCase()}|${service.toLowerCase()}|${message}`;
}

function isDuplicateSubmission(key: string) {
  const now = Date.now();
  const existing = duplicateStore.get(key);

  if (
    existing &&
    now - existing.timestamp < DUPLICATE_WINDOW_MS
  ) {
    return true;
  }

  duplicateStore.set(key, {
    timestamp: now,
  });

  return false;
}

function cleanupStores() {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }

  for (const [key, entry] of duplicateStore) {
    if (now - entry.timestamp >= DUPLICATE_WINDOW_MS) {
      duplicateStore.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    cleanupStores();

    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed." },
        { status: 405 },
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 415 },
      );
    }

    const contentLength = request.headers.get("content-length");

    if (contentLength) {
      const parsedLength = Number(contentLength);

      if (
        !Number.isFinite(parsedLength) ||
        parsedLength > MAX_REQUEST_SIZE
      ) {
        return NextResponse.json(
          { error: "Request is too large." },
          { status: 413 },
        );
      }
    }

    if (!isAllowedHost(request) || !isAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    const clientIp = getClientIp(request);

    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      );
    }

    const formData = await request.formData();

    const name = clean(formData.get("name"), MAX_NAME_LENGTH);
    const email = clean(formData.get("email"), MAX_EMAIL_LENGTH);
    const company = clean(
      formData.get("company"),
      MAX_COMPANY_LENGTH,
    );
    const service = clean(
      formData.get("service"),
      MAX_SERVICE_LENGTH,
    );
    const message = clean(
      formData.get("message"),
      MAX_MESSAGE_LENGTH,
    );

    const honeypot = clean(formData.get("website"), 100);

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 },
      );
    }

    if (service.length < 2) {
      return NextResponse.json(
        { error: "Please select a service." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Please provide more detail in your message." },
        { status: 400 },
      );
    }

    const duplicateKey = createDuplicateKey(
      clientIp,
      email,
      service,
      message,
    );

    if (isDuplicateSubmission(duplicateKey)) {
      return NextResponse.json(
        {
          error:
            "This enquiry has already been submitted. Please wait before sending it again.",
        },
        { status: 409 },
      );
    }

    const mailboxResourceId =
      process.env.HOSTINGER_MAILBOX_RESOURCE_ID;

    const hostingerApiToken =
      process.env.HOSTINGER_EMAIL_API_TOKEN;

    if (!mailboxResourceId || !hostingerApiToken) {
      console.error("Hostinger email configuration is missing.");

      return NextResponse.json(
        {
          error:
            "The contact service is temporarily unavailable.",
        },
        { status: 500 },
      );
    }

    const emailSubject = `Website enquiry: ${service} — ${name}`;

    const emailText = [
      "New website enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Service: ${service}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, HOSTINGER_TIMEOUT_MS);

    let hostingerResponse: Response;

    try {
      hostingerResponse = await fetch(
        `https://api.mail.hostinger.com/api/v1/mailboxes/${encodeURIComponent(
          mailboxResourceId,
        )}/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hostingerApiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: ["info@pmazimelutechnologies.com"],
            subject: emailSubject,
            text: emailText,
          }),
          signal: controller.signal,
          cache: "no-store",
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!hostingerResponse.ok) {
      console.error(
        "Hostinger Mail API request failed with status:",
        hostingerResponse.status,
      );

      return NextResponse.json(
        { error: "Unable to send your enquiry right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("Hostinger Mail API request timed out.");

      return NextResponse.json(
        { error: "Unable to send your enquiry right now." },
        { status: 504 },
      );
    }

    console.error("Contact service error.");

    return NextResponse.json(
      { error: "Unable to send your enquiry right now." },
      { status: 500 },
    );
  }
}