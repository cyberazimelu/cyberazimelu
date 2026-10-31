"use client";

import { useState } from "react";
import { ENQUIRY_BUDGETS, ENQUIRY_SERVICES, type EnquiryService } from "@/lib/enquiry-options";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldName = "fullName" | "organisation" | "email" | "service" | "details" | "budget";
type FieldErrors = Partial<Record<FieldName, string>>;

export function EnquiryForm({ initialService }: { initialService?: EnquiryService }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function submitEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");
    setFieldErrors({});

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { message?: string; errors?: FieldErrors } = await response.json();

      if (!response.ok) {
        setFieldErrors(result.errors ?? {});
        setMessage(result.message ?? "We could not submit your enquiry. Please try again or email us directly.");
        setState("error");
        return;
      }

      setState("success");
      setMessage(result.message ?? "Your enquiry has been sent. We will be in touch.");
      form.reset();
    } catch {
      setState("error");
      setMessage("We could not reach the enquiry service. Please email info@pmazimelutechnologies.com.");
    }
  }

  function errorFor(field: FieldName, id: string) {
    return fieldErrors[field] ? <span className="form-error" id={id}>{fieldErrors[field]}</span> : null;
  }

  return (
    <form className="enquiry-form" onSubmit={submitEnquiry}>
      <div className="enquiry-form-grid">
        <div className="form-field">
          <label htmlFor="enquiry-name">Full name <span aria-hidden="true">*</span></label>
          <input autoComplete="name" id="enquiry-name" name="fullName" maxLength={100} required aria-invalid={Boolean(fieldErrors.fullName)} aria-describedby={fieldErrors.fullName ? "enquiry-name-error" : undefined} />
          {errorFor("fullName", "enquiry-name-error")}
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-organisation">Business or organisation <span className="optional-label">(optional)</span></label>
          <input autoComplete="organization" id="enquiry-organisation" name="organisation" maxLength={150} aria-invalid={Boolean(fieldErrors.organisation)} aria-describedby={fieldErrors.organisation ? "enquiry-organisation-error" : undefined} />
          {errorFor("organisation", "enquiry-organisation-error")}
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-email">Email address <span aria-hidden="true">*</span></label>
          <input autoComplete="email" id="enquiry-email" name="email" type="email" maxLength={254} required aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "enquiry-email-error" : undefined} />
          {errorFor("email", "enquiry-email-error")}
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-service">Service required <span aria-hidden="true">*</span></label>
          <select id="enquiry-service" name="service" defaultValue={initialService ?? ""} required aria-invalid={Boolean(fieldErrors.service)} aria-describedby={fieldErrors.service ? "enquiry-service-error" : undefined}>
            <option value="" disabled>Select a service</option>
            {ENQUIRY_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          {errorFor("service", "enquiry-service-error")}
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="enquiry-details">Project or enquiry details <span aria-hidden="true">*</span></label>
          <p className="form-help" id="enquiry-details-help">Tell us about what you want to build, improve, maintain or protect. Include your objectives and any relevant non-sensitive project details.</p>
          <textarea id="enquiry-details" name="details" rows={6} maxLength={3000} required placeholder="Tell us about what you want to build, improve, maintain or protect. Include your objectives and any relevant non-sensitive project details." aria-invalid={Boolean(fieldErrors.details)} aria-describedby={`enquiry-details-help${fieldErrors.details ? " enquiry-details-error" : ""}`} />
          {errorFor("details", "enquiry-details-error")}
          <p className="sensitive-warning">Please do not include passwords, credentials, private keys, or other sensitive information in your initial inquiry.</p>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-budget">Optional budget range</label>
          <select id="enquiry-budget" name="budget" defaultValue="Not specified" aria-invalid={Boolean(fieldErrors.budget)} aria-describedby={fieldErrors.budget ? "enquiry-budget-error" : undefined}>
            {ENQUIRY_BUDGETS.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
          </select>
          {errorFor("budget", "enquiry-budget-error")}
        </div>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input autoComplete="off" id="enquiry-website" name="website" tabIndex={-1} />
      </div>

      <p className="sensitive-warning submission-warning">Please do not include passwords, credentials, private keys, or other sensitive information in your initial inquiry.</p>
      <button className="button button-primary enquiry-submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "SUBMITTING…" : "SUBMIT ENQUIRY"}
      </button>
      <p aria-live="polite" className={`form-status form-status-${state}`} role={state === "error" ? "alert" : "status"}>
        {message}
      </p>
    </form>
  );
}
