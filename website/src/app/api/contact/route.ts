import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 150;
const MAX_SERVICE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

function clean(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = clean(formData.get("name"), MAX_NAME_LENGTH);
    const email = clean(formData.get("email"), MAX_EMAIL_LENGTH);
    const company = clean(formData.get("company"), MAX_COMPANY_LENGTH);
    const service = clean(formData.get("service"), MAX_SERVICE_LENGTH);
    const message = clean(formData.get("message"), MAX_MESSAGE_LENGTH);

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

    const mailboxResourceId = process.env.HOSTINGER_MAILBOX_RESOURCE_ID;
    const hostingerApiToken = process.env.HOSTINGER_EMAIL_API_TOKEN;

    if (!mailboxResourceId || !hostingerApiToken) {
      console.error("Hostinger email configuration is missing.");

      return NextResponse.json(
        { error: "The contact service is temporarily unavailable." },
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

    const hostingerResponse = await fetch(
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
      },
    );

    if (!hostingerResponse.ok) {
      const errorBody = await hostingerResponse.text();

      console.error(
        "Hostinger Mail API returned:",
        hostingerResponse.status,
        errorBody,
      );

      return NextResponse.json(
        { error: "Unable to send your enquiry right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Unable to send your enquiry right now." },
      { status: 500 },
    );
  }
}