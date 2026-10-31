"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavigationItem = readonly [label: string, href: string];

export function MobileMenu({ navigation }: { navigation: readonly NavigationItem[] }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (menuRef.current?.open) {
      menuRef.current.open = false;
      menuRef.current.querySelector("summary")?.focus();
    }
  }, [pathname]);

  useEffect(() => {
    const closeForHistoryNavigation = () => {
      if (menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    window.addEventListener("popstate", closeForHistoryNavigation);
    window.addEventListener("hashchange", closeForHistoryNavigation);
    return () => {
      window.removeEventListener("popstate", closeForHistoryNavigation);
      window.removeEventListener("hashchange", closeForHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 960px)");
    const syncScrollLock = () => document.body.classList.toggle("mobile-menu-open", isOpen && mobileViewport.matches);
    syncScrollLock();
    mobileViewport.addEventListener("change", syncScrollLock);
    return () => {
      mobileViewport.removeEventListener("change", syncScrollLock);
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
      menuRef.current.querySelector("summary")?.focus();
    }
    setIsOpen(false);
  }

  return (
    <details
      className="mobile-menu"
      id="mobile-navigation"
      ref={menuRef}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary aria-controls="mobile-navigation-panel" aria-expanded={isOpen} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
        <span className="menu-label">MENU</span><span className="menu-icon" aria-hidden="true"><i /><i /></span>
      </summary>
      <div className="mobile-menu-panel" id="mobile-navigation-panel">
        <nav className="mobile-nav-links" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link href={href} key={label} onClick={() => {
              if (href.split("#", 1)[0] === pathname) closeMenu();
            }}>{label}</Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <Link className="button button-primary" href="/services#build" onClick={closeMenu}>BUILD WITH US</Link>
          <Link className="button button-secondary" href="/services#secure" onClick={closeMenu}>SECURE YOUR BUSINESS</Link>
        </div>
      </div>
    </details>
  );
}
