import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { getTour, tours } from "@/data/tours";
import { getDictionary, isLocale, localePath, locales } from "@/lib/i18n";
import { formatUsd } from "@/lib/pricing";

export function generateStaticParams() {
  return locales.flatMap((lang) => tours.map((tour) => ({ lang, slug: tour.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tours/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const tour = getTour(slug);
  if (!isLocale(lang) || !tour) return {};
  return { title: tour.name[lang], description: tour.summary[lang] };
}

export default async function TourPage({ params }: PageProps<"/[lang]/tours/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const tour = getTour(slug);
  if (!tour) notFound();

  const dict = await getDictionary(lang);
  const related = tours.filter((item) => item.slug !== tour.slug).slice(0, 3);
  const checkoutHref = `${localePath(lang, "/checkout")}?tour=${tour.slug}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-burgundy-deep pb-16 pt-36 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,#8f1b43_0%,#470a1e_60%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href={localePath(lang, "/tours")} className="text-sm text-white/70 transition hover:text-white">
            ← {dict.tour.back}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{tour.category[lang]}</p>
          <AnimatedHeading
            as="h1"
            text={tour.name[lang]}
            className="font-display mt-3 max-w-4xl text-5xl font-semibold leading-[1.05] sm:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">{tour.summary[lang]}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">{tour.description[lang]}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-foreground">{dict.tour.highlights}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {tour.highlights[lang].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-blush px-5 py-4 text-sm font-medium text-burgundy-deep">
                  <span className="text-gold">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-foreground">{dict.tour.included}</h2>
            <ul className="mt-5 space-y-3">
              {tour.included[lang].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-0.5 text-burgundy">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_24px_60px_-30px_rgba(109,18,48,0.4)]">
              <p className="text-xs uppercase tracking-widest text-muted">{dict.toursPage.from}</p>
              <p className="text-4xl font-bold text-burgundy">
                {formatUsd(tour.priceUsd)} <span className="text-sm font-normal text-muted">{dict.toursPage.perPerson}</span>
              </p>

              <dl className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-muted">{dict.tour.duration}</dt>
                  <dd className="font-semibold">{tour.durationHours}h</dd>
                </div>
                <div>
                  <dt className="text-muted">{dict.tour.group}</dt>
                  <dd className="font-semibold">{dict.tour.upTo.replace("{n}", String(tour.maxGuests))}</dd>
                </div>
                <div>
                  <dt className="text-muted">{dict.tour.meeting}</dt>
                  <dd className="font-semibold">{tour.meetingPoint[lang]}</dd>
                </div>
              </dl>

              <Link
                href={checkoutHref}
                className="mt-8 block rounded-full bg-burgundy px-6 py-4 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-burgundy-deep"
              >
                {dict.tour.reserve}
              </Link>
              <p className="mt-3 text-center text-xs text-muted">{dict.tour.reserveNote}</p>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="bg-blush py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-semibold text-foreground">{dict.tour.related}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <TourCard key={item.slug} tour={item} locale={lang} labels={dict.toursPage} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
