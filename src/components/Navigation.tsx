"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWorkshopPage = pathname === "/workshop";

  const handleCtaClick = (e: React.MouseEvent) => {
    if (isWorkshopPage) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-booking-modal"));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white/93 backdrop-blur-md border-b transition-shadow ${
        hasScrolled ? "shadow-[0_4px_24px_rgba(124,92,191,0.08)]" : ""
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="h-full px-16 max-[900px]:px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/heart-space-final-logo.svg" alt="Heart Space" height={36} className="h-9 w-auto" />
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* CTA Button */}
        <Link
          href={isWorkshopPage ? "#" : "/workshop#book"}
          onClick={handleCtaClick}
          className="btn-pr text-[13px] px-[22px] py-[11px] rounded-full font-bold transition-all hover:shadow-lg group"
          style={{
            background: "var(--purple)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(124, 92, 191, 0.3)",
          }}
        >
          Join Workshop{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
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
