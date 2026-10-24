import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/checkout/success">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.success.title, robots: { index: false } };
}

export default async function SuccessPage({ params }: PageProps<"/[lang]/checkout/success">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-2xl px-5 pb-32 pt-44 text-center">
      <Reveal>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-burgundy text-4xl text-white">✓</div>
      </Reveal>
      <AnimatedHeading as="h1" text={dict.success.title} className="font-display mt-8 text-5xl font-semibold sm:text-6xl" />
      <Reveal delay={0.2}>
        <p className="mt-6 text-lg leading-relaxed text-foreground/75">{dict.success.text}</p>
        <Link
          href={localePath(lang)}
          className="mt-10 inline-block rounded-full bg-burgundy px-8 py-4 font-semibold text-white transition hover:bg-burgundy-deep"
        >
          {dict.success.home}
        </Link>
      </Reveal>
    </section>
  );
}
