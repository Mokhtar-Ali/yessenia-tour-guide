import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.nav.about };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-40 sm:px-8 lg:grid-cols-2">
      {/* TODO: replace with a portrait of Yessenia */}
      <Reveal>
        <div className="flex aspect-[4/5] items-end rounded-3xl bg-gradient-to-br from-burgundy via-burgundy-deep to-black p-8">
          <span className="font-display text-3xl text-white/80">Yessenia</span>
        </div>
      </Reveal>
      <div className="self-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.about.eyebrow}</p>
        </Reveal>
        <AnimatedHeading as="h1" text={dict.about.title} className="font-display mt-3 text-5xl font-semibold sm:text-7xl" />
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
          {dict.about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.1 * index}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
