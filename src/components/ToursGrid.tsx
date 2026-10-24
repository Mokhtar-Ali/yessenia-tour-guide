"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Tour } from "@/data/tours";
import type { Dictionary, Locale } from "@/lib/i18n";
import { TourCard } from "./TourCard";

type ToursGridProps = {
  tours: Tour[];
  locale: Locale;
  labels: Dictionary["toursPage"];
};

export function ToursGrid({ tours, locale, labels }: ToursGridProps) {
  const categories = Array.from(new Set(tours.map((tour) => tour.category[locale])));
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? tours.filter((tour) => tour.category[locale] === active) : tours;

  const chip = (selected: boolean) =>
    `rounded-full border px-5 py-2 text-sm font-semibold transition ${
      selected ? "border-burgundy bg-burgundy text-white" : "border-line text-foreground/80 hover:border-burgundy hover:text-burgundy"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className={chip(active === null)} onClick={() => setActive(null)}>
          {labels.all}
        </button>
        {categories.map((category) => (
          <button key={category} type="button" className={chip(active === category)} onClick={() => setActive(category)}>
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((tour) => (
            <motion.div
              key={tour.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <TourCard tour={tour} locale={locale} labels={labels} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
