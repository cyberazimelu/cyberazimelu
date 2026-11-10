"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import type { EnquiryService } from "@/lib/enquiry-options";
import { ENQUIRY_BUDGETS, ENQUIRY_SERVICES } from "@/lib/enquiry-options";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldName =
  | "fullName"
  | "organisation"
  | "email"
  | "service"
  | "details"
  | "budget";

type FieldErrors = Partial<Record<FieldName, string>>;

type ResponseBody = {
  message?: string;
  errors?: FieldErrors;
  kind?: string;
};

type TurnstileOptions = {
  sitekey: string;
  action: "enquiry";
  theme: "light";
  size: "flexible";
  execution: "execute";
  appearance: "execute";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "error-callback": (errorCode: number) => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
  execute: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function EnquiryForm({
  initialService,
  siteKey,
  nonce,
  deliveryConfigured,
}: {
  initialService?: EnquiryService;
  siteKey: string;
  nonce?: string;
  deliveryConfigured: boolean;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");

  const challengeRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const isSubmittingRef = useRef(false);

  function resetChallenge() {
    setTurnstileToken("");
    setVerificationStarted(false);

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  function renderChallenge() {
    if (
      !siteKey ||
      !challengeRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(
      challengeRef.current,
      {
        sitekey: siteKey,
        action: "enquiry",
        theme: "light",
        size: "flexible",
        execution: "execute",
        appearance: "execute",

        callback: (token) => {
          setTurnstileToken(token);
          setMessage("");
          setState("idle");
          setVerificationStarted(false);
        },

        "expired-callback": () => {
          setTurnstileToken("");
          setVerificationStarted(false);
          setState("error");
          setMessage(
            "The security check expired. Please complete it again before submitting."
          );
        },

        "timeout-callback": () => {
          setTurnstileToken("");
          setVerificationStarted(false);
          setState("error");
          setMessage(
            "The security check timed out. Please try again."
          );

          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },

        "error-callback": (errorCode) => {
          console.warn("Cloudflare Turnstile error:", errorCode);
          setTurnstileToken("");
          setVerificationStarted(false);
          setState("error");
          setMessage(
            "The security check could not load. Please retry it or email info@pmazimelutechnologies.com."
          );
        },
      }
    );
  }

  function startVerification() {
    const form = challengeRef.current?.closest("form");

    if (!form?.reportValidity()) {
      return;
    }

    if (!widgetIdRef.current || !window.turnstile) {
      setState("error");
      setMessage(
        "The security check is not ready. Please reload the page and try again."
      );
      return;
    }

    setTurnstileToken("");
    setMessage("");
    setState("idle");
    setVerificationStarted(true);

    try {
      window.turnstile.execute(widgetIdRef.current);
    } catch {
      setVerificationStarted(false);
      setState("error");
      setMessage(
        "The security check could not start. Please try again."
      );
    }
  }

  async function submitEnquiry(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    if (!deliveryConfigured) {
      setState("error");
      setMessage(
        "Online enquiry delivery is unavailable. Please email info@pmazimelutechnologies.com."
      );
      return;
    }

    if (!turnstileToken) {
      setState("error");
      setMessage(
        "Please complete the security check before submitting."
      );
      return;
    }

    const form = event.currentTarget;

    isSubmittingRef.current = true;
    setState("submitting");
    setMessage("");
    setFieldErrors({});

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.turnstileToken = turnstileToken;

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ResponseBody = await response.json();

      if (!response.ok) {
        setFieldErrors(result.errors ?? {});
        setMessage(
          result.message ??
            "We could not submit your enquiry. Please try again or email us directly."
        );
        setState("error");

        if (
          [
            "turnstile",
            "turnstile_unavailable",
            "delivery_unavailable",
          ].includes(result.kind ?? "") ||
          response.status >= 500
        ) {
          resetChallenge();
        }

        return;
      }

      setState("success");
      setMessage(
        result.message ??
          "Your enquiry was accepted by our email service. Inbox delivery is not confirmed, so please email info@pmazimelutechnologies.com for an urgent enquiry."
      );

      form.reset();
      resetChallenge();
    } catch {
      setState("error");
      setMessage(
        "We could not reach the enquiry service. Your enquiry was not confirmed as sent. Please try again later or email info@pmazimelutechnologies.com."
      );

      resetChallenge();
    } finally {
      isSubmittingRef.current = false;
    }
  }

  function errorFor(field: FieldName, id: string) {
    return fieldErrors[field] ? (
      <span className="form-error" id={id}>
        {fieldErrors[field]}
      </span>
    ) : null;
  }

  return (
    <>
      {deliveryConfigured && siteKey && (
        <Script
          id="cloudflare-turnstile"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          nonce={nonce}
          onReady={renderChallenge}
          onError={() => {
            setState("error");
            setMessage(
              "The security check could not load. Please reload the page or email info@pmazimelutechnologies.com."
            );
          }}
        />
      )}

      <form
        className="enquiry-form"
        onSubmit={submitEnquiry}
      >
        <div className="enquiry-form-grid">
          <div className="form-field">
            <label htmlFor="enquiry-name">
              Full name <span aria-hidden="true">*</span>
            </label>

            <input
              autoComplete="name"
              id="enquiry-name"
              name="fullName"
              maxLength={100}
              required
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={
                fieldErrors.fullName
                  ? "enquiry-name-error"
                  : undefined
              }
            />

            {errorFor("fullName", "enquiry-name-error")}
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-organisation">
              Business or organisation{" "}
              <span className="optional-label">(optional)</span>
            </label>

            <input
              autoComplete="organization"
              id="enquiry-organisation"
              name="organisation"
              maxLength={150}
              aria-invalid={Boolean(fieldErrors.organisation)}
              aria-describedby={
                fieldErrors.organisation
                  ? "enquiry-organisation-error"
                  : undefined
              }
            />

            {errorFor(
              "organisation",
              "enquiry-organisation-error"
            )}
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-email">
              Email address <span aria-hidden="true">*</span>
            </label>

            <input
              autoComplete="email"
              id="enquiry-email"
              name="email"
              type="email"
              maxLength={254}
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={
                fieldErrors.email
                  ? "enquiry-email-error"
                  : undefined
              }
            />

            {errorFor("email", "enquiry-email-error")}
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-service">
              Service required <span aria-hidden="true">*</span>
            </label>

            <select
              id="enquiry-service"
              name="service"
              defaultValue={initialService ?? ""}
              required
              aria-invalid={Boolean(fieldErrors.service)}
              aria-describedby={
                fieldErrors.service
                  ? "enquiry-service-error"
                  : undefined
              }
            >
              <option value="" disabled>
                Select a service
              </option>

              {ENQUIRY_SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            {errorFor("service", "enquiry-service-error")}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="enquiry-details">
              Project or enquiry details{" "}
              <span aria-hidden="true">*</span>
            </label>

            <p
              className="form-help"
              id="enquiry-details-help"
            >
              Tell us about what you want to build, improve,
              maintain or protect. Include your objectives and
              any relevant non-sensitive project details.
            </p>

            <textarea
              id="enquiry-details"
              name="details"
              rows={6}
              maxLength={3000}
              required
              placeholder="Tell us about what you want to build, improve, maintain or protect. Include your objectives and any relevant non-sensitive project details."
              aria-invalid={Boolean(fieldErrors.details)}
              aria-describedby={`enquiry-details-help${
                fieldErrors.details
                  ? " enquiry-details-error"
                  : ""
              }`}
            />

            {errorFor("details", "enquiry-details-error")}

            <p className="sensitive-warning">
              Please do not include passwords, credentials,
              private keys, or other sensitive information in
              your initial inquiry.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-budget">
              Optional budget range
            </label>

            <select
              id="enquiry-budget"
              name="budget"
              defaultValue="Not specified"
              aria-invalid={Boolean(fieldErrors.budget)}
              aria-describedby={
                fieldErrors.budget
                  ? "enquiry-budget-error"
                  : undefined
              }
            >
              {ENQUIRY_BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>

            {errorFor("budget", "enquiry-budget-error")}
          </div>
        </div>

        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="enquiry-website">
            Leave this field empty
          </label>

          <input
            autoComplete="off"
            id="enquiry-website"
            name="website"
            tabIndex={-1}
          />
        </div>

        {deliveryConfigured && siteKey && (
          <div className="turnstile-field">
            <span className="form-label">
              Security check{" "}
              <span aria-hidden="true">*</span>
            </span>

            <div
              ref={challengeRef}
              role="group"
              aria-label="Cloudflare security check"
            />

            {!turnstileToken && (
              <button
                className="button button-primary"
                type="button"
                onClick={startVerification}
                disabled={
                  state === "submitting" ||
                  verificationStarted
                }
              >
                {verificationStarted
                  ? "VERIFYING…"
                  : "VERIFY SECURITY CHECK"}
              </button>
            )}

            <p className="form-help">
              Fill in the required fields, then click Verify
              Security Check.
            </p>
          </div>
        )}

        <p className="sensitive-warning submission-warning">
          Please do not include passwords, credentials,
          private keys, or other sensitive information in
          your initial inquiry.
        </p>

        <button
          className="button button-primary enquiry-submit"
          type="submit"
          disabled={
            state === "submitting" || !deliveryConfigured
          }
        >
          {state === "submitting"
            ? "SUBMITTING…"
            : deliveryConfigured
              ? "SUBMIT ENQUIRY"
              : "FORM TEMPORARILY UNAVAILABLE"}
        </button>

        <p
          aria-live="polite"
          className={`form-status form-status-${state}`}
          role={state === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      </form>
    </>
  );
}
