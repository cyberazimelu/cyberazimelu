import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Website and application development, cybersecurity services, and scoped PMAT Website Care & Security.",
  alternates: { canonical: "/services" },
};

const serviceGroups = [
  { id: "build", number: "01", label: "BUILD", title: "Digital products made for real work.", description: "From an effective website to a custom application, we shape digital solutions around your business needs.", services: ["Website development", "Application development", "UI/UX design", "Custom digital solutions"] },
  { id: "secure", number: "02", label: "SECURE", title: "Understand exposure and strengthen protection.", description: "Authorized, scoped security work helps businesses understand risks across their digital environments.", services: ["Website security", "Vulnerability assessment and penetration testing (VAPT)", "Network security", "Infrastructure security", "Cybersecurity training"] },
  { id: "care", number: "03", label: "PMAT WEBSITE CARE & SECURITY", title: "Ongoing website care, scoped to your needs.", description: "Website Care & Security can be scoped to include maintenance and checks appropriate for your site and its supporting systems.", services: ["Website maintenance and supported software updates", "Dependency vulnerability reviews", "Recurring security checks, scoped to the engagement", "Website availability and security monitoring where technically supported", "Maintenance reporting and recommendations"] },
];

export default function ServicesPage() {
  return (
    <main id="main-content" className="inner-page">
      <section className="page-hero"><div className="container">
        <p className="eyebrow"><span className="eyebrow-line" /> Services</p>
        <h1>Build, secure, and care for your digital presence.</h1>
        <p>Practical technology and security services for businesses at every stage of their digital work.</p>
      </div></section>
      <section className="section service-sections" aria-label="PMAT services">
        <div className="container service-listing">{serviceGroups.map((group) => (
          <article className="service-detail" id={group.id} key={group.id}>
            <div className="service-detail-aside"><span>{group.number}</span><p>{group.label}</p></div>
            <div className="service-detail-content">
              <h2>{group.title}</h2><p>{group.description}</p>
              <ul>{group.services.map((service) => <li key={service}>{service}</li>)}</ul>
              {group.id === "care" && <p className="service-note">Monitoring and recurring checks depend on the website, available access, and agreed scope. We will confirm what is technically supported before an engagement begins.</p>}
              <Link className="text-link" href={`/contact?service=${group.id}`}>Discuss this service <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}</div>
      </section>
      <section className="final-cta section"><div className="container final-cta-inner">
        <p className="eyebrow"><span className="eyebrow-line" /> Let&apos;s talk</p>
        <h2>Start with the outcome<br /><span>you have in mind.</span></h2>
        <p>We can discuss the right scope for your project or security need.</p>
        <Link className="button button-primary" href="/contact">CONTACT PMAT <span aria-hidden="true">→</span></Link>
      </div></section>
    </main>
  );
}
