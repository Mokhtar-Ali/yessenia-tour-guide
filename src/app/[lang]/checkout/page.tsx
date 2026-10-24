import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { CheckoutForm } from "@/components/CheckoutForm";
import { tours } from "@/data/tours";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/checkout">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.checkout.title, robots: { index: false } };
}

export default async function CheckoutPage({ params }: PageProps<"/[lang]/checkout">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const options = tours.map((tour) => ({
    slug: tour.slug,
    name: tour.name[lang],
    priceUsd: tour.priceUsd,
    maxGuests: tour.maxGuests,
  }));

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-40 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.checkout.eyebrow}</p>
      <AnimatedHeading as="h1" text={dict.checkout.title} className="font-display mb-12 mt-3 text-5xl font-semibold sm:text-6xl" />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-blush" />}>
        <CheckoutForm locale={lang} tours={options} labels={dict.checkout} />
      </Suspense>
    </section>
  );
}
