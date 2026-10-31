import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="arrow-icon"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function HeroIllustration() {
  return (
    <div className="hero-visual hero-ecosystem">
      <svg className="ecosystem-art" viewBox="0 0 800 560" role="img" aria-labelledby="ecosystem-title ecosystem-description">
        <title id="ecosystem-title">PM AZIMELU TECHNOLOGIES connected security ecosystem</title>
        <desc id="ecosystem-description">A commercial airplane, communications tower, fiber optic lines, satellite, desktop computer, laptop, and phone connect in both directions through a central PM AZIMELU TECHNOLOGIES security shield.</desc>
        <defs>
          <linearGradient id="shield-fill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#12385f" /><stop offset="1" stopColor="#071526" /></linearGradient>
          <linearGradient id="plane-fill" x1="0" x2="1"><stop offset="0" stopColor="#b7d8f7" /><stop offset="1" stopColor="#fff" /></linearGradient>
          <radialGradient id="core-glow"><stop stopColor="#50c8ed" stopOpacity=".22" /><stop offset="1" stopColor="#50c8ed" stopOpacity="0" /></radialGradient>
          <marker id="route-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 8 5 1 9" fill="none" stroke="#69d5ff" strokeWidth="1.4" /></marker>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx="405" cy="296" r="205" fill="url(#core-glow)" />
        <g className="eco-grid" aria-hidden="true">
          <path d="M20 80H780M20 160H780M20 240H780M20 320H780M20 400H780M20 480H780" />
          <path d="M80 30V530M160 30V530M240 30V530M320 30V530M400 30V530M480 30V530M560 30V530M640 30V530M720 30V530" />
        </g>
        <g className="eco-routes" fill="none" markerStart="url(#route-arrow)" markerEnd="url(#route-arrow)">
          <path d="M170 242C228 229 267 249 309 275" /><path d="M277 131C321 166 348 203 367 232" />
          <path d="M605 188C552 209 515 242 489 268" /><path d="M221 419C275 384 309 358 335 342" />
          <path d="M560 433C523 396 490 365 465 345" /><path d="M683 352C618 342 550 326 488 317" />
          <path d="M196 481C310 514 483 512 584 465" />
        </g>
        <g className="eco-node" aria-hidden="true"><circle cx="170" cy="242" r="5" /><circle cx="277" cy="131" r="5" /><circle cx="605" cy="188" r="5" /><circle cx="221" cy="419" r="5" /><circle cx="560" cy="433" r="5" /><circle cx="683" cy="352" r="5" /></g>
        <g className="eco-plane" transform="translate(132 52) scale(1.2)" aria-hidden="true">
          <path className="plane-wing" d="M111 42 63 5Q60 3 57 6L88 41 17 42Q12 42 12 45t5 3l71 1-31 35q3 3 6 1l48-36 61-2q9 0 12-2-3-3-12-3l-61-1Z" />
          <path className="plane-tail" d="m27 42-14-13q-3-2-5 0l10 15L8 59q2 2 5 0l14-11 18-1-1-4-17-1Z" />
          <path className="plane-engine" d="M99 24q-4 0-5 4v11h15l8-5-8-10Z" />
          <path className="plane-engine" d="M99 66q-4 0-5-4V51h15l8 5-8 10Z" />
          <path className="plane-fuselage" d="M11 42Q4 43 0 45q4 3 11 3l178-2q11 0 17-1-6-2-17-2L11 42Z" />
          <path className="plane-cockpit" d="m177 43 11 1-11 1Z" />
          <path className="plane-detail" d="m34 44 18 .2m-9 2 17 .1" />
          <circle cx="75" cy="45" r="1.4" /><circle cx="67" cy="45" r="1.4" /><circle cx="59" cy="45" r="1.4" />
        </g>
        <text className="eco-label" x="275" y="45" textAnchor="middle">GLOBAL CONNECTIVITY</text>
        <g className="eco-infrastructure" transform="translate(83 176)">
          <path d="m44 13 35 115M44 13 9 128M19 96h51M25 75h39M31 54h26M37 33h14M19 96l50-21M69 96 25 75M25 75l39-21M64 75 31 54M31 54l26-21M57 54 37 33M44 13V1M44 13 24 0M44 13 64 0" />
          <path className="tower-wave" d="M71 5c11 8 11 20 0 28M79 0c17 13 17 33 0 46M17 5C6 13 6 25 17 33M9 0C-8 13-8 33 9 46" /><path d="M1 130h87" />
        </g>
        <text className="eco-label" x="126" y="326" textAnchor="middle">CELL TOWER</text>
        <g className="eco-fiber" fill="none">
          <path d="M125 312C120 354 144 367 183 367H281M125 312C132 342 151 347 186 347H285M178 367v-20M192 367v-20M207 367v-20" />
          <circle cx="281" cy="367" r="3" /><circle cx="285" cy="347" r="3" />
        </g>
        <text className="eco-label" x="206" y="394" textAnchor="middle">FIBER OPTIC</text>
        <g className="eco-satellite" transform="translate(590 116)">
          <path d="M40 18 57 1l16 16-17 17ZM45 23l13-13m-8 18 13-13m-33 5 7 7-14 14-7-7Zm40 24 7 7 14-14-7-7Zm-7-17 8 8-9 9-8-8Z" />
          <path className="signal-wave" d="M73 32q20 12 8 30m0-36q30 18 12 46" />
        </g>
        <text className="eco-label" x="653" y="188" textAnchor="middle">SATELLITE LINK</text>
        <g className="eco-device" transform="translate(157 408)">
          <rect x="0" y="0" width="94" height="61" rx="5" /><rect className="device-glass" x="6" y="6" width="82" height="47" rx="2" />
          <path d="M47 61v10M32 72h30" /><path className="device-ui" d="m18 38 12-12 9 8 14-17 22 22" /><circle className="device-dot" cx="18" cy="16" r="2" />
        </g>
        <text className="eco-label" x="204" y="500" textAnchor="middle">DESKTOP</text>
        <g className="eco-device" transform="translate(529 421)">
          <rect x="5" y="0" width="79" height="53" rx="4" /><rect className="device-glass" x="11" y="6" width="67" height="41" rx="2" />
          <path d="M1 57h88l-8 8H9Z" /><path className="device-ui" d="m23 36 12-12 9 8 11-14 14 18" />
        </g>
        <text className="eco-label" x="573" y="503" textAnchor="middle">LAPTOP</text>
        <g className="eco-device" transform="translate(680 313)">
          <rect x="0" y="0" width="40" height="72" rx="7" /><rect className="device-glass" x="4" y="8" width="32" height="51" rx="3" />
          <path d="M17 65h6" /><circle className="device-dot" cx="20" cy="21" r="3" /><path className="device-ui" d="M12 33h16M12 40h12" />
        </g>
        <text className="eco-label" x="700" y="404" textAnchor="middle">MOBILE</text>
        <g className="eco-shield">
          <path className="shield-halo" d="M400 197 507 237v86c0 69-43 118-107 148-64-30-107-79-107-148v-86Z" />
          <path className="shield-face" d="M400 208 495 244v78c0 61-37 104-95 132-58-28-95-71-95-132v-78Z" />
          <path className="shield-inset" d="M400 228 477 257v65c0 50-29 86-77 111-48-25-77-61-77-111v-65Z" />
          <path className="shield-check" d="m361 316 27 27 53-60" />
          <text className="shield-overline" x="400" y="369" textAnchor="middle">PM AZIMELU</text>
          <text className="shield-name" x="400" y="391" textAnchor="middle">TECHNOLOGIES</text>
          <text className="shield-tag" x="400" y="414" textAnchor="middle">SECURE · CONNECT · PROTECT</text>
        </g>
        <g className="eco-status" aria-hidden="true"><circle cx="326" cy="245" r="3" /><circle cx="475" cy="231" r="3" /><circle cx="327" cy="389" r="3" /><circle cx="474" cy="382" r="3" /></g>
      </svg>
      <p className="network-caption caption-bottom" aria-hidden="true">CONNECTED. PROTECTED. IN MOTION.</p>
    </div>
  );
}

const serviceCards = [
  { number: "01", title: "Build", text: "Websites, applications, thoughtful UI/UX, and custom digital products.", href: "/services#build" },
  { number: "02", title: "Secure", text: "Security assessments and practical protection for digital environments.", href: "/services#secure" },
  { number: "03", title: "Care", text: "Scoped website maintenance, software updates, and ongoing security care.", href: "/services#care" },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> PM AZIMELU TECHNOLOGIES</p>
            <h1 id="hero-title">Build Digital.<br /><span>Secure Digital.</span><br />Move Forward.</h1>
            <p className="hero-supporting-copy">We build digital solutions and help businesses secure their websites, applications, networks, and infrastructure.</p>
            <p className="hero-slogan">SECURE. CONNECT. PROTECT.</p>
            <div className="hero-actions" aria-label="Primary actions">
              <Link className="button button-primary" href="/services#build">BUILD WITH US <ArrowIcon /></Link>
              <Link className="button button-secondary" href="/services#secure">SECURE YOUR BUSINESS <ArrowIcon /></Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>
      <section className="section home-services" aria-labelledby="services-heading">
        <div className="container">
          <SectionHeading label="What PMAT does" title="Build well. Secure thoughtfully. Keep moving." description="A technology partner for businesses creating digital products and protecting the systems behind them." id="services-heading" />
          <div className="home-service-grid">{serviceCards.map((service) => <Link className="home-service-card" href={service.href} key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><ArrowIcon /></Link>)}</div>
          <Link className="text-link" href="/services">Explore our services <ArrowIcon /></Link>
        </div>
      </section>
      <section className="section home-about section-tinted">
        <div className="container home-about-layout">
          <div><p className="eyebrow"><span className="eyebrow-line" /> About PMAT</p><h2>Digital capability with security in view.</h2></div>
          <div><p>PM AZIMELU TECHNOLOGIES was founded by Peter Majesty Azimelu, a cybersecurity consultant and security researcher. The company brings digital development and cybersecurity together to help businesses move forward with clarity.</p><Link className="text-link" href="/about">Meet the founder <ArrowIcon /></Link></div>
        </div>
      </section>
      <section className="final-cta section" aria-labelledby="contact-heading">
        <div className="container final-cta-inner">
          <p className="eyebrow"><span className="eyebrow-line" /> Start a conversation</p>
          <h2 id="contact-heading">Build with intention.<br /><span>Secure with clarity.</span></h2>
          <p>Tell us what your business is building or looking to protect.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/contact">CONTACT PMAT <ArrowIcon /></Link></div>
        </div>
      </section>
    </main>
  );
}
