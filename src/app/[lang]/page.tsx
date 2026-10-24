import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { getFeaturedTours } from "@/data/tours";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const featured = getFeaturedTours();

  return (
    <>
      <Hero locale={lang} hero={dict.hero} />
      <Marquee items={dict.marquee} />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {dict.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-5xl font-semibold text-burgundy sm:text-6xl">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="bg-blush py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.featured.eyebrow}</p>
              </Reveal>
              <AnimatedHeading
                text={dict.featured.title}
                className="font-display mt-3 text-5xl font-semibold text-foreground sm:text-6xl"
              />
            </div>
            <Reveal>
              <Link
                href={localePath(lang, "/tours")}
                className="rounded-full border border-burgundy px-6 py-3 text-sm font-semibold text-burgundy transition hover:bg-burgundy hover:text-white"
              >
                {dict.featured.viewAll}
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour, index) => (
              <Reveal key={tour.slug} delay={index * 0.1}>
                <TourCard tour={tour} locale={lang} labels={dict.toursPage} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.why.eyebrow}</p>
        </Reveal>
        <AnimatedHeading
          text={dict.why.title}
          className="font-display mt-3 max-w-3xl text-5xl font-semibold text-foreground sm:text-6xl"
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.why.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="h-full border-t-2 border-burgundy pt-6">
                <p className="font-display text-2xl font-semibold text-foreground">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-burgundy-deep py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{dict.video.eyebrow}</p>
          </Reveal>
          <AnimatedHeading text={dict.video.title} className="font-display mt-3 text-5xl font-semibold sm:text-6xl" />
          <Reveal className="mt-12">
            {/* TODO: replace with Yessenia's tour video or an Instagram reel embed */}
            <div className="flex aspect-video items-center justify-center rounded-3xl border border-white/15 bg-white/5 text-sm text-white/50">
              Video placeholder
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.testimonials.eyebrow}</p>
        </Reveal>
        <AnimatedHeading
          text={dict.testimonials.title}
          className="font-display mt-3 text-5xl font-semibold text-foreground sm:text-6xl"
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {dict.testimonials.items.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                <span className="font-display text-6xl leading-none text-gold">“</span>
                <blockquote className="mt-2 flex-1 text-base leading-relaxed text-foreground/80">{item.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-burgundy">{item.name}</span>
                  <span className="text-muted"> · {item.from}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-blush py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">{dict.faq.eyebrow}</p>
          </Reveal>
          <AnimatedHeading text={dict.faq.title} className="font-display mt-3 text-5xl font-semibold text-foreground" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {dict.faq.items.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {item.q}
                  <span className="text-2xl text-burgundy transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <AnimatedHeading text={dict.cta.title} className="font-display text-5xl font-semibold sm:text-6xl" />
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-white/80">{dict.cta.text}</p>
            <Link
              href={localePath(lang, "/tours")}
              className="mt-9 inline-block rounded-full bg-white px-9 py-4 font-semibold text-burgundy transition hover:-translate-y-0.5 hover:bg-gold hover:text-burgundy-deep"
            >
              {dict.cta.button}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
