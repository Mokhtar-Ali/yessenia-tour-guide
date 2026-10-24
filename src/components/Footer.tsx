import { cacheLife } from "next/cache";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

async function getYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer({ locale, dict }: FooterProps) {
  const year = await getYear();
  return (
    <footer className="bg-burgundy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl font-semibold">{dict.brand.name}</p>
          <p className="mt-3 max-w-xs text-sm text-white/70">{dict.brand.tagline}</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm" aria-label="Footer">
          <Link href={localePath(locale, "/tours")} className="text-white/80 hover:text-white">
            {dict.nav.tours}
          </Link>
          <Link href={localePath(locale, "/about")} className="text-white/80 hover:text-white">
            {dict.nav.about}
          </Link>
          <Link href={localePath(locale, "/contact")} className="text-white/80 hover:text-white">
            {dict.nav.contact}
          </Link>
        </nav>
        <div className="text-sm text-white/70">
          {/* TODO: replace with Yessenia's real contact details and social links */}
          <p>Medellín, Colombia</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
