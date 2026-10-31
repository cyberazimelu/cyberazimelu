import Link from "next/link";

const footerLinks = [["Home", "/"], ["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div><p className="footer-company">PM AZIMELU<br />TECHNOLOGIES</p><p className="footer-slogan">SECURE. CONNECT. PROTECT.</p></div>
        <div className="footer-contact"><span className="footer-label">BUSINESS ENQUIRIES</span><a href="mailto:info@pmazimelutechnologies.com">info@pmazimelutechnologies.com</a></div>
        <nav className="footer-nav" aria-label="Footer navigation">{footerLinks.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} PM AZIMELU TECHNOLOGIES</span><span>SECURE. CONNECT. PROTECT.</span></div>
    </footer>
  );
}
