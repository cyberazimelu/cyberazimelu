import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["HOME", "/"],
  ["BUILD", "/build"],
  ["SECURE", "/secure"],
  ["ABOUT", "/about"],
  ["CASE STUDIES", "/case-studies"],
  ["CONTACT", "/contact"],
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      className={mobile ? "mobile-nav-links" : "desktop-nav-links"}
      aria-label="Primary navigation"
    >
      {navigation.map(([label, href]) => (
        <Link href={href} key={label}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          className="header-logo-link"
          href="/"
          aria-label="PM Azimelu Technologies home"
        >
          <Image
            src="/brand/PM AZIMELU TECH.PNG"
            alt="PM Azimelu Technologies"
            width={1456}
            height={720}
            sizes="(max-width: 960px) 8.5rem, 10.25rem"
            priority
            className="header-logo"
          />
        </Link>

        <NavigationLinks />

        <div className="header-actions">
          <Link className="header-cta header-cta-build" href="/build">
            BUILD WITH US
          </Link>

          <Link className="header-cta header-cta-secure" href="/secure">
            SECURE YOUR BUSINESS
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Toggle navigation menu">
            <span className="menu-label">MENU</span>
            <span className="menu-icon">
              <i />
              <i />
            </span>
          </summary>

          <div className="mobile-menu-panel">
            <NavigationLinks mobile />

            <div className="mobile-menu-actions">
              <Link className="button button-primary" href="/build">
                BUILD WITH US
              </Link>

              <Link className="button button-secondary" href="/secure">
                SECURE YOUR BUSINESS
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
