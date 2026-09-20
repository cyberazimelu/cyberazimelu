"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

let data: { error?: string } = {};

if (responseText) {
  try {
    data = JSON.parse(responseText);
  } catch {
    console.error("Unexpected API response:", responseText);
  }
}

if (!response.ok) {
  throw new Error(
    data.error || "Unable to send your enquiry right now.",
  );
}

      form.reset();
      setStatus("success");
      setMessage(
        "Your enquiry has been sent successfully. We will get back to you soon.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry right now.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-[#081727] p-7 sm:p-10"
    >
    <div
   className="absolute -left-[9999px] h-px w-px overflow-hidden"
   aria-hidden="true"
>
   <label htmlFor="website">Website</label>
   <input
    id="website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
     />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-slate-200"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-200"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="company"
          className="text-sm font-medium text-slate-200"
        >
          Company
        </label>

        <input
          id="company"
          name="company"
          type="text"
          maxLength={150}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
          placeholder="Company name"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="service"
          className="text-sm font-medium text-slate-200"
        >
          What do you need?
        </label>

        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00b3a6]/60"
        >
          <option value="" disabled>
            Select an enquiry type
          </option>
          <option value="Website Development">Website Development</option>
          <option value="Web Application Development">
            Web Application Development
          </option>
          <option value="Mobile App Development">
            Mobile App Development
          </option>
          <option value="VAPT">VAPT</option>
          <option value="Web Application Security">
            Web Application Security
          </option>
          <option value="Network Security">Network Security</option>
          <option value="Infrastructure Security">
            Infrastructure Security
          </option>
          <option value="Cybersecurity Training">
            Cybersecurity Training
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="text-sm font-medium text-slate-200"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
          placeholder="Tell us briefly about your project or security requirement."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "SENDING..." : "SEND ENQUIRY"}
      </button>

      {status !== "idle" && (
        <p
          className={`mt-4 text-center text-sm leading-6 ${
            status === "success" ? "text-[#74e2d4]" : "text-red-300"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Please do not include passwords, credentials, private keys, or other
        sensitive information in this form.
      </p>
    </form>
  );
}