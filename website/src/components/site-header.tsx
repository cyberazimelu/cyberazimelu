import Image from "next/image";

const navigation = [["HOME", "#top"], ["BUILD", "#build"], ["SECURE", "#secure"], ["ABOUT", "#about"], ["CASE STUDIES", "#case-studies"], ["CONTACT", "#contact"]] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return <nav className={mobile ? "mobile-nav-links" : "desktop-nav-links"} aria-label="Primary navigation">{navigation.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>;
}

export function SiteHeader() {
  return <header className="site-header" id="top"><div className="container site-header-inner"><a className="header-logo-link" href="#top" aria-label="PM Azimelu Technologies home"><Image src="/brand/PM AZIMELU TECH.PNG" alt="PM Azimelu Technologies" width={1456} height={720} sizes="(max-width: 767px) 10rem, 12rem" className="header-logo" /></a><NavigationLinks /><div className="header-actions"><a className="header-cta header-cta-build" href="#build">BUILD WITH US</a><a className="header-cta header-cta-secure" href="#secure">SECURE YOUR BUSINESS</a></div><details className="mobile-menu"><summary aria-label="Open navigation menu"><span className="menu-label">MENU</span><span className="menu-icon"><i /><i /></span></summary><div className="mobile-menu-panel"><NavigationLinks mobile /><div className="mobile-menu-actions"><a className="button button-primary" href="#build">BUILD WITH US</a><a className="button button-secondary" href="#secure">SECURE YOUR BUSINESS</a></div></div></details></div></header>;
}
