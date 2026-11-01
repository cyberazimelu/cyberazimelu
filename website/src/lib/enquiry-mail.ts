import "server-only";

const HOSTINGER_MAIL_API_URL = "https://api.mail.hostinger.com/api/v1";
const PMAT_MAILBOX = "info@pmazimelutechnologies.com";

type HostingerMailSettings = {
  mailboxResourceId: string;
  apiToken: string;
};

type EnquiryEmail = {
  fullName: string;
  organisation: string;
  email: string;
  service: string;
  details: string;
  budget: string;
};

export class HostingerMailApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly apiCode?: string,
  ) {
    super(message);
    this.name = "HostingerMailApiError";
  }
}

function getHostingerMailSettings(): HostingerMailSettings | null {
  const mailboxResourceId =
    process.env.HOSTINGER_MAILBOX_RESOURCE_ID?.trim() ?? "";
  const apiToken = process.env.HOSTINGER_EMAIL_API_TOKEN?.trim() ?? "";

  if (
    !/^AC[a-zA-Z0-9]+$/.test(mailboxResourceId) ||
    !apiToken
  ) {
    return null;
  }

  return { mailboxResourceId, apiToken };
}

export function isEnquiryDeliveryConfigured(): boolean {
  return (
    getHostingerMailSettings() !== null &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()) &&
    Boolean(process.env.TURNSTILE_SECRET_KEY?.trim()) &&
    Boolean(
      process.env.TURNSTILE_ALLOWED_HOSTNAMES
        ?.split(",")
        .some((hostname) => hostname.trim()),
    )
  );
}

export async function sendEnquiryEmail(enquiry: EnquiryEmail): Promise<void> {
  const settings = getHostingerMailSettings();

  if (!settings) {
    throw new HostingerMailApiError("Hostinger Mail API is not configured.");
  }

  const subject = `New PMAT Website Enquiry — ${enquiry.service}`;

  const text = [
    "A new enquiry was submitted through the PMAT website.",
    "",
    `Name: ${enquiry.fullName}`,
    `Business or organisation: ${enquiry.organisation || "Not provided"}`,
    `Visitor email: ${enquiry.email}`,
    `Service required: ${enquiry.service}`,
    `Budget range: ${enquiry.budget}`,
    "",
    "Project or enquiry details:",
    enquiry.details,
  ].join("\n");

  let response: Response;

  try {
    response = await fetch(
      `${HOSTINGER_MAIL_API_URL}/mailboxes/${encodeURIComponent(settings.mailboxResourceId)}/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${settings.apiToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          to: [PMAT_MAILBOX],
          displayName: "PM AZIMELU TECHNOLOGIES",
          subject,
          text,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      },
    );
  } catch {
    throw new HostingerMailApiError(
      "Could not connect to the Hostinger Mail API.",
    );
  }

  if (response.status === 204) {
    return;
  }

    let apiCode: string | undefined;

  try {
    const result: unknown = await response.json();

    if (
      result !== null &&
      typeof result === "object" &&
      "code" in result &&
      typeof result.code === "string" &&
      /^[A-Z0-9_-]{1,64}$/i.test(result.code)
    ) {
      apiCode = result.code;
    }
  } catch {
    // Do not expose or log an unparsed API response.
  }

  throw new HostingerMailApiError(
    "Hostinger Mail API rejected the email request.",
    response.status,
    apiCode,
  );
}