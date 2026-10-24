"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  brand: Dictionary["brand"];
};

export function Header({ locale, nav, brand }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const switchedPath = pathname.replace(/^\/(en|es)/, `/${otherLocale}`) || `/${otherLocale}`;

  const links = [
    { href: localePath(locale), label: nav.home },
    { href: localePath(locale, "/tours"), label: nav.tours },
    { href: localePath(locale, "/about"), label: nav.about },
    { href: localePath(locale, "/contact"), label: nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_1px_0_var(--line)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href={localePath(locale)} className="font-display text-3xl font-semibold tracking-tight text-burgundy">
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-burgundy ${
                pathname === link.href ? "text-burgundy" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchedPath}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-burgundy transition hover:border-burgundy"
            aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
          >
            {otherLocale}
          </Link>
          <Link
            href={localePath(locale, "/tours")}
            className="hidden rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-burgundy-deep sm:inline-block"
          >
            {nav.book}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className={`h-0.5 w-6 bg-burgundy transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-burgundy transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-burgundy transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-5 pb-6 pt-2 md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block py-3 text-lg font-medium text-foreground">
              {link.label}
            </Link>
          ))}
          <Link
            href={localePath(locale, "/tours")}
            className="mt-3 block rounded-full bg-burgundy px-5 py-3 text-center font-semibold text-white"
          >
            {nav.book}
          </Link>
        </nav>
      )}
    </header>
  );
}
