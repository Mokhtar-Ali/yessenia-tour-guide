import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Reveal } from "@/components/Reveal";
import { ToursGrid } from "@/components/ToursGrid";
import { tours } from "@/data/tours";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/tours">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.nav.tours, description: dict.toursPage.subtitle };
}

export default async function ToursPage({ params }: PageProps<"/[lang]/tours">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-burgundy-deep pb-20 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{dict.toursPage.eyebrow}</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            text={dict.toursPage.title}
            className="font-display mt-3 max-w-3xl text-5xl font-semibold sm:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/75">{dict.toursPage.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <ToursGrid tours={tours} locale={lang} labels={dict.toursPage} />
      </section>
    </>
  );
}
