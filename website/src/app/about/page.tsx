import type { Metadata } from "next";
import Link from "next/link";
import { OptimizedImage } from "@/components/optimized-image";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Peter Majesty Azimelu, founder of PM AZIMELU TECHNOLOGIES, and explore his professional work.",
  alternates: { canonical: "/about" },
};

const credentials = ["CISSP", "CISM", "CEH v12", "CompTIA Security+"];

export default function AboutPage() {
  return (
    <main id="main-content" className="inner-page">
      <section className="page-hero"><div className="container">
        <p className="eyebrow"><span className="eyebrow-line" /> About</p>
        <h1>Technology built with security in mind.</h1>
        <p>PM AZIMELU TECHNOLOGIES builds digital solutions and helps businesses secure their websites, applications, networks, and infrastructure.</p>
      </div></section>
      <section className="section founder-section" aria-labelledby="founder-heading">
        <div className="container founder-layout">
          <div className="founder-portrait">
            <OptimizedImage src="/brand/PMAT-CEO.jpeg" alt="Peter Majesty Azimelu, founder of PM AZIMELU TECHNOLOGIES" width={640} height={800} sizes="(max-width: 760px) 100vw, 420px" className="founder-image" />
          </div>
          <div className="founder-bio">
            <p className="eyebrow"><span className="eyebrow-line" /> Founder</p>
            <h2 id="founder-heading">Peter Majesty Azimelu</h2>
            <p className="founder-role">Founder, PM AZIMELU TECHNOLOGIES</p>
            <p>Peter Majesty Azimelu is a cybersecurity consultant, security researcher, and technology professional focused on building digital systems and helping organizations secure them.</p>
            <p>His professional focus includes network VAPT, penetration testing, application security, web and API security, cloud security, and infrastructure security.</p>
            <Link className="github-work-link" href="https://github.com/cyberazimelu" target="_blank" rel="noopener noreferrer">View my work on GitHub <span aria-hidden="true">↗</span></Link>
            <div className="credential-list" aria-label="Professional credentials listed in the existing project">{credentials.map((credential) => <span key={credential}>{credential}</span>)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
