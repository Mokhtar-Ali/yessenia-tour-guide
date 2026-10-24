import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

// Fonts are self-hosted from npm (@fontsource) so builds never depend on reaching Google Fonts.
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: "../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: `${dict.brand.name} | ${dict.brand.tagline}`,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.hero.subtitle,
    alternates: {
      languages: { en: "/en", es: "/es" },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header locale={lang} nav={dict.nav} brand={dict.brand} />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} dict={dict} />
      </body>
    </html>
  );
}
