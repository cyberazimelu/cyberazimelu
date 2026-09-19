const footerLinks = [
  ["HOME", "/"],
  ["BUILD", "/build"],
  ["SECURE", "/secure"],
  ["ABOUT", "/about"],
  ["CASE STUDIES", "/case-studies"],
  ["CONTACT", "/contact"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <p className="footer-company">
            PM AZIMELU
            <br />
            TECHNOLOGIES
          </p>

          <p className="footer-slogan">SECURE. CONNECT. PROTECT.</p>
        </div>

        <div className="footer-contact">
          <span className="footer-label">PUBLIC BUSINESS CONTACT</span>

          <a href="mailto:info@pmazimelutechnologies.com">
            info@pmazimelutechnologies.com
          </a>
        </div>

        <nav
          className="footer-nav"
          aria-label="Footer navigation"
        >
          {footerLinks.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} PM AZIMELU TECHNOLOGIES</span>

        <span>Build Digital. Secure Digital. Move Forward.</span>
      </div>
    </footer>
  );
}
