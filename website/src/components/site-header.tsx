import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { OptimizedImage } from "@/components/optimized-image";

const navigation = [["Home", "/"], ["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]] as const;

function NavigationLinks() {
  return <nav className="desktop-nav-links" aria-label="Primary navigation">{navigation.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="header-logo-link" href="/" aria-label="PM Azimelu Technologies home">
          <OptimizedImage src="/brand/PM AZIMELU TECH.PNG" alt="PM Azimelu Technologies" className="header-logo" width={728} height={360} sizes="(max-width: 960px) 136px, 164px" />
        </Link>
        <NavigationLinks />
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  );
}
