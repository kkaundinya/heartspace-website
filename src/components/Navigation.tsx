"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-16 left-0 right-0 z-50 bg-white/93 backdrop-blur-md border-b transition-shadow ${
        hasScrolled ? "shadow-[0_4px_24px_rgba(124,92,191,0.08)]" : ""
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="h-16 px-16 max-[900px]:px-5 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <img src="/heart-space-final-logo.svg" alt="Heart Space" height={36} className="h-9 w-auto" />
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-shrink-0">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/about" active={pathname === "/about"}>
            About Shashi
          </NavLink>
          <NavLink href="/workshop" active={pathname === "/workshop"}>
            Workshop
          </NavLink>
        </div>

        {/* Right: Mobile Hamburger Toggle / Desktop spacer */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-md" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-col px-5 py-5 gap-6">
            <NavLink href="/" active={pathname === "/"} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"} onClick={closeMenu}>
              About Shashi
            </NavLink>
            <NavLink href="/workshop" active={pathname === "/workshop"} onClick={closeMenu}>
              Workshop
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-sm transition-colors ${
        active ? "font-semibold" : "font-medium"
      }`}
      style={{ color: active ? "var(--purple)" : "var(--ink-soft)" }}
    >
      {children}
      {active && (
        <div
          className="absolute -bottom-1 left-0 right-0 h-0.5"
          style={{ background: "var(--purple)" }}
        />
      )}
    </Link>
  );
}
