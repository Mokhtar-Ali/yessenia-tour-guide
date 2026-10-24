import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Tour } from "@/data/tours";
import { formatUsd } from "@/lib/pricing";

type TourCardProps = {
  tour: Tour;
  locale: Locale;
  labels: Dictionary["toursPage"];
};

export function TourCard({ tour, locale, labels }: TourCardProps) {
  const href = localePath(locale, `/tours/${tour.slug}`);
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(109,18,48,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-burgundy via-burgundy-deep to-black">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.name[locale]}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6">
            <span className="font-display text-3xl font-semibold leading-tight text-white/90">{tour.name[locale]}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-burgundy">
          {tour.category[locale]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold leading-snug text-foreground">{tour.name[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tour.summary[locale]}</p>
        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{labels.from}</p>
            <p className="text-xl font-bold text-burgundy">
              {formatUsd(tour.priceUsd)} <span className="text-xs font-normal text-muted">{labels.perPerson}</span>
            </p>
          </div>
          <span className="text-sm font-semibold text-burgundy transition group-hover:translate-x-1">
            {labels.details} →
          </span>
        </div>
      </div>
    </Link>
  );
}
