import { SectionHeading } from "@/components/section-heading";

const buildServices = [
  "Professional website design and development",
  "Web application development",
  "Mobile application development",
  "UI/UX design",
  "Custom digital solutions",
];

const secureServices = [
  "VAPT",
  "Web Application Security",
  "Network Security",
  "Infrastructure Security",
  "API/Backend Security",
  "Cybersecurity Training",
];

const capabilities = [
  { index: "01", title: "Digital products", text: "Websites, web applications, mobile applications, and custom digital solutions.", anchor: "#build" },
  { index: "02", title: "Experience design", text: "UI/UX thinking that makes complex digital experiences clear and useful.", anchor: "#build" },
  { index: "03", title: "Offensive security", text: "VAPT and penetration testing across web, network, infrastructure, and APIs.", anchor: "#secure" },
  { index: "04", title: "Security architecture", text: "Web, network, infrastructure, cloud, and backend security assessment and hardening.", anchor: "#secure" },
  { index: "05", title: "Security enablement", text: "Cybersecurity training and ethical hacking education for authorized environments.", anchor: "#secure" },
  { index: "06", title: "Research & documentation", text: "Structured technical investigation, security research, and clear written findings.", anchor: "#research" },
];

const credentials = ["CISSP", "CISM", "CEH v12", "CompTIA Security+"];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="arrow-icon">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Digital systems + cybersecurity</p>
              <p className="hero-kicker">PRODUCT DELIVERY / SECURITY PRACTICE</p>
              <h1 id="hero-title">Build Digital.<br /><span>Secure Digital.</span><br />Move Forward.</h1>
              <p className="hero-supporting-copy">We build digital systems and help secure them.</p>
              <div className="hero-actions" aria-label="Primary actions">
                <a className="button button-primary" href="#build">BUILD WITH US <ArrowIcon /></a>
                <a className="button button-secondary" href="#secure">SECURE YOUR BUSINESS <ArrowIcon /></a>
              </div>
              <div className="hero-principles" aria-label="Core disciplines"><span>Digital delivery</span><span>Security engineering</span></div>
            </div>
            <div className="hero-visual" aria-hidden="true">
  <div className="infrastructure-grid" />

  <svg
    className="network-architecture"
    viewBox="0 0 560 560"
    role="presentation"
  >
    {/* Network wires */}
    <g className="architecture-wires">
      <path id="wire-desktop" d="M150 135 C205 170 220 210 250 250" />
      <path id="wire-laptop" d="M135 405 C195 370 215 325 250 290" />
      <path id="wire-phone" d="M425 150 C370 180 350 215 310 250" />
      <path id="wire-server" d="M430 405 C375 370 350 325 310 290" />

      <path
        className="architecture-wire-secondary"
        d="M150 135 C280 80 380 85 425 150"
      />
      <path
        className="architecture-wire-secondary"
        d="M135 405 C260 475 365 475 430 405"
      />
    </g>

    {/* Bidirectional network traffic */}
    <g className="network-traffic">
      <circle r="4">
        <animateMotion
          dur="3.8s"
          repeatCount="indefinite"
          path="M150 135 C205 170 220 210 250 250"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.4s"
          repeatCount="indefinite"
          path="M250 250 C220 210 205 170 150 135"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.1s"
          repeatCount="indefinite"
          path="M135 405 C195 370 215 325 250 290"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.7s"
          repeatCount="indefinite"
          path="M250 290 C215 325 195 370 135 405"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="3.6s"
          repeatCount="indefinite"
          path="M425 150 C370 180 350 215 310 250"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.3s"
          repeatCount="indefinite"
          path="M310 250 C350 215 370 180 425 150"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.2s"
          repeatCount="indefinite"
          path="M430 405 C375 370 350 325 310 290"
        />
      </circle>

      <circle r="4">
        <animateMotion
          dur="4.8s"
          repeatCount="indefinite"
          path="M310 290 C350 325 375 370 430 405"
        />
      </circle>
    </g>

    {/* Desktop */}
    <g className="network-device device-desktop">
      <rect x="92" y="88" width="116" height="76" rx="7" />
      <rect x="101" y="97" width="98" height="56" rx="3" className="device-screen" />
      <path d="M126 176 H174 L184 190 H116 Z" />
      <line x1="145" y1="181" x2="155" y2="181" />
      <text x="150" y="122" textAnchor="middle">DESKTOP</text>
    </g>

    {/* Laptop */}
    <g className="network-device device-laptop">
      <rect x="75" y="362" width="118" height="68" rx="6" />
      <rect x="84" y="371" width="100" height="49" rx="3" className="device-screen" />
      <path d="M61 438 H207 L220 451 H48 Z" />
      <text x="134" y="398" textAnchor="middle">LAPTOP</text>
    </g>

    {/* Phone */}
    <g className="network-device device-phone">
      <rect x="387" y="92" width="76" height="128" rx="12" />
      <rect x="395" y="107" width="60" height="94" rx="5" className="device-screen" />
      <circle cx="425" cy="210" r="3" />
      <text x="425" y="157" textAnchor="middle">PHONE</text>
    </g>

    {/* Server / API */}
    <g className="network-device device-server">
      <rect x="380" y="358" width="104" height="88" rx="7" />
      <rect x="392" y="370" width="80" height="20" rx="3" className="server-slot" />
      <rect x="392" y="397" width="80" height="20" rx="3" className="server-slot" />
      <circle cx="401" cy="380" r="2.5" />
      <circle cx="401" cy="407" r="2.5" />
      <text x="432" y="433" textAnchor="middle">SERVER / API</text>
    </g>

    {/* Central cyber shield */}
    <g className="cyber-shield">
      <circle cx="280" cy="270" r="76" className="shield-aura" />
      <path
        className="shield-outline"
        d="M280 201
           L331 220
           V268
           C331 304 309 330 280 346
           C251 330 229 304 229 268
           V220 Z"
      />
      <path
        className="shield-inner"
        d="M280 218
           L315 232
           V267
           C315 291 301 310 280 323
           C259 310 245 291 245 267
           V232 Z"
      />
      <path
        className="shield-check"
        d="M261 269 L274 282 L301 251"
      />
      <text x="280" y="366" textAnchor="middle">SECURE CORE</text>
    </g>
  </svg>

  <span className="network-caption caption-top">CONNECTED SYSTEMS</span>
  <span className="network-caption caption-bottom">SECURE INFRASTRUCTURE</span>
</div>
          </div>
        </section>

        <section className="pillars section" aria-labelledby="pillars-title">
          <div className="container">
            <SectionHeading label="Two disciplines. One direction." title="Build what matters. Secure what moves it forward." description="Technology should be purposeful from the first idea through the systems that support it. BUILD and SECURE are two equal ways we help digital work move with confidence." id="pillars-title" />
            <div className="pillar-grid">
              <article className="pillar-card pillar-card-build" id="build">
                <div className="pillar-card-topline"><span>01</span><span>BUILD</span></div>
                <div className="pillar-card-heading"><h3>Digital experiences, made with intent.</h3><p>From a precise first impression to a product people return to, build a digital foundation that fits the work.</p></div>
                <ul className="service-list">{buildServices.map((service) => <li key={service}>{service}</li>)}</ul>
                <a className="text-link" href="#integrated">Explore the approach <ArrowIcon /></a>
              </article>
              <article className="pillar-card pillar-card-secure" id="secure">
                <div className="pillar-card-topline"><span>02</span><span>SECURE</span></div>
                <div className="pillar-card-heading"><h3>See the exposure. Strengthen the boundary.</h3><p>Assess the digital environment with a clear scope, useful evidence, and a practical path toward stronger controls.</p></div>
                <ul className="service-list service-list-two-column">{secureServices.map((service) => <li key={service}>{service}</li>)}</ul>
                <a className="text-link" href="#case-studies">View documented work <ArrowIcon /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="integrated section section-dark" id="integrated" aria-labelledby="integrated-title">
          <div className="container integrated-layout">
            <SectionHeading label="The integrated approach" title="Security is part of the product conversation." description="Digital products should be built intentionally, with security considered throughout the lifecycle—not treated as an afterthought." id="integrated-title" tone="light" />
            <div className="approach-steps" aria-label="Integrated approach stages">
              <div className="approach-step"><span>01</span><p>Understand the intent</p></div>
              <div className="approach-step"><span>02</span><p>Shape the experience</p></div>
              <div className="approach-step"><span>03</span><p>Examine the exposure</p></div>
              <div className="approach-step"><span>04</span><p>Move forward with clarity</p></div>
            </div>
          </div>
        </section>

        <section className="capabilities section" aria-labelledby="capabilities-title">
          <div className="container">
            <SectionHeading label="Capabilities" title="A considered range of digital capability." description="Focused services for organizations creating, connecting, and protecting modern digital environments." id="capabilities-title" />
            <div className="capability-grid">{capabilities.map((capability) => <a className="capability-card" href={capability.anchor} key={capability.index}><span className="capability-index">{capability.index}</span><h3>{capability.title}</h3><p>{capability.text}</p><span className="capability-arrow"><ArrowIcon /></span></a>)}</div>
          </div>
        </section>

        <section className="credibility section section-tinted" id="about" aria-labelledby="credibility-title">
          <div className="container credibility-layout">
            <div className="credibility-intro"><p className="eyebrow"><span className="eyebrow-line" /> Founder / credibility</p><h2 id="credibility-title">Grounded in security practice. Open to what comes next.</h2><p>PM AZIMELU TECHNOLOGIES is founded by Peter Majesty Azimelu, a cybersecurity consultant and security researcher.</p></div>
            <div className="founder-card"><div className="founder-card-top"><div><p className="founder-name">Peter Majesty Azimelu</p><p className="founder-role">Founder — PM AZIMELU TECHNOLOGIES</p><p className="founder-role">Cybersecurity Consultant &amp; Security Researcher</p></div><span className="founder-mark" aria-hidden="true">PM</span></div><div className="credential-list" aria-label="Credentials">{credentials.map((credential) => <span key={credential}>{credential}</span>)}</div></div>
          </div>
        </section>

        <section className="case-study section" id="case-studies" aria-labelledby="case-study-title">
          <div className="container">
            <div className="case-study-header"><SectionHeading label="Featured case study / 001" title="Evidence over assumption." description="An authorized Network VAPT investigation into MySQL service reachability and an overly permissive firewall access-control rule." id="case-study-title" /><span className="case-study-status">REMEDIATED<br />&amp; RETESTED</span></div>
            <article className="case-study-panel"><div className="case-study-panel-main"><div className="case-study-meta"><span>AUTHORIZED NETWORK VAPT</span><span>MAY 2026</span><span>CLIENT / ASSETS ANONYMIZED</span></div><h3>MySQL Service Reachability Through Overly Permissive Firewall Access Control</h3><p>Initial Nmap reconnaissance was inconclusive. Host-level verification confirmed a service listening on TCP/3306, and firewall ACL review identified a <code>0.0.0.0/0</code> source rule permitting access.</p><a className="button button-light" href="#research">Read the context <ArrowIcon /></a></div><div className="case-study-finding"><span className="finding-label">ACCESS-CONTROL WEAKNESS</span><div className="finding-flow"><span>0.0.0.0/0</span><i>→</i><span>TCP/3306</span><i>→</i><span>ALLOW</span></div><p>Remediation restricted the relevant access-control boundary to authorized sources, followed by a retest confirming that the specific rule was fixed.</p><small>This was not a demonstrated MySQL software vulnerability, database compromise, or unauthorized database access.</small></div></article>
          </div>
        </section>

        <section className="research section section-dark" id="research" aria-labelledby="research-title">
          <div className="container research-layout"><SectionHeading label="Research / labs" title="Technical work, documented with care." description="The existing repository includes controlled cybersecurity research, technical laboratories, and public case-study documentation. Sensitive information is omitted or anonymized for public portfolio use." id="research-title" tone="light" /><div className="research-note"><span className="research-note-number">/ 02</span><p>Explore the thinking behind the work through the existing case-study and lab materials.</p><a className="text-link text-link-light" href="#case-studies">See featured work <ArrowIcon /></a></div></div>
        </section>

        <section className="final-cta section" id="contact" aria-labelledby="final-cta-title"><div className="container final-cta-inner"><p className="eyebrow"><span className="eyebrow-line" /> Start a conversation</p><h2 id="final-cta-title">Build with intention.<br /><span>Secure with clarity.</span></h2><p>Bring the next digital idea or security question into focus.</p><div className="hero-actions" aria-label="Contact actions"><a className="button button-primary" href="mailto:info@pmazimelutechnologies.com?subject=Build%20with%20PM%20Azimelu%20Technologies">BUILD WITH US <ArrowIcon /></a><a className="button button-secondary" href="mailto:info@pmazimelutechnologies.com?subject=Secure%20my%20business%20with%20PM%20Azimelu%20Technologies">SECURE YOUR BUSINESS <ArrowIcon /></a></div></div></section>
      </main>
    </div>
  );
}
