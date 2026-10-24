import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.nav.contact };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-40 sm:px-8 lg:grid-cols-2">
      <div>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.contact.eyebrow}</p>
        </Reveal>
        <AnimatedHeading as="h1" text={dict.contact.title} className="font-display mt-3 text-5xl font-semibold sm:text-7xl" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-lg text-foreground/75">{dict.contact.text}</p>
        </Reveal>
      </div>
      <Reveal>
        <ContactForm labels={dict.contact} errorLabel={dict.checkout.error} />
      </Reveal>
    </section>
  );
}
