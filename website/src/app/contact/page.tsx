import type { Metadata } from "next";
import { EnquiryForm } from "@/app/contact/enquiry-form";
import { ENQUIRY_CONTEXTS } from "@/lib/enquiry-options";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PM AZIMELU TECHNOLOGIES for digital development, cybersecurity, and website care enquiries.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const params = await searchParams;
  const requestedContext = typeof params.service === "string" ? params.service : "";
  const initialService = ENQUIRY_CONTEXTS[requestedContext];

  return (
    <main id="main-content" className="inner-page">
      <section className="page-hero"><div className="container">
        <p className="eyebrow"><span className="eyebrow-line" /> Contact</p>
        <h1>Let&apos;s talk about what you need.</h1>
        <p>Share a little about your project, security needs, or website care enquiry. You can also contact PMAT directly by email.</p>
      </div></section>
      <section className="section contact-section">
        <div className="container contact-panel">
          <div className="contact-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> Business enquiries</p>
            <h2>Tell us what you are building or looking to protect.</h2>
            <p>Use the form for a structured enquiry. Share only non-sensitive project information.</p>
            <div className="contact-details">
              <span>Prefer email?</span>
              <a href="mailto:info@pmazimelutechnologies.com?subject=Business%20enquiry">info@pmazimelutechnologies.com</a>
            </div>
          </div>
          <div className="enquiry-form-panel">
            <p className="delivery-notice" role="note">Online enquiry delivery is not configured yet. Please email <a href="mailto:info@pmazimelutechnologies.com">info@pmazimelutechnologies.com</a> for a response.</p>
            <EnquiryForm initialService={initialService} />
          </div>
        </div>
      </section>
    </main>
  );
}
