"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { calculatePrice, formatUsd } from "@/lib/pricing";

export type CheckoutTour = {
  slug: string;
  name: string;
  priceUsd: number;
  maxGuests: number;
};

type CheckoutFormProps = {
  locale: Locale;
  tours: CheckoutTour[];
  labels: Dictionary["checkout"];
};

export function CheckoutForm({ locale, tours, labels }: CheckoutFormProps) {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("tour");

  const [slug, setSlug] = useState(tours.some((tour) => tour.slug === initialSlug) ? (initialSlug as string) : "");
  const [guests, setGuests] = useState(2);
  const [minDate, setMinDate] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "invalid">("idle");

  // Computed after mount so the server-rendered page never depends on the current time.
  useEffect(() => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    setMinDate(tomorrow.toISOString().slice(0, 10));
  }, []);

  const tour = tours.find((item) => item.slug === slug);
  const guestCount = tour ? Math.min(guests, tour.maxGuests) : guests;
  const price = tour ? calculatePrice(tour.priceUsd, guestCount) : null;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tour) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tourSlug: tour.slug, guests: guestCount, lang: locale }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      const data: { url: string } = await response.json();
      window.location.assign(data.url);
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-2xl border border-line bg-white px-5 py-4 text-base outline-none transition focus:border-burgundy focus:ring-4 focus:ring-burgundy/10";
  const label = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={onSubmit} className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <label className={label}>
          {labels.tour}
          <select
            name="tourSelect"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
            className={field}
          >
            <option value="" disabled>
              {labels.chooseTour}
            </option>
            {tours.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            {labels.date}
            <input name="date" type="date" required min={minDate} className={field} />
          </label>
          <label className={label}>
            {labels.guests}
            <input
              type="number"
              min={1}
              max={tour?.maxGuests ?? 20}
              value={guestCount}
              onChange={(event) => setGuests(Math.max(1, Number(event.target.value) || 1))}
              required
              className={field}
            />
          </label>
        </div>

        <label className={label}>
          {labels.name}
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            {labels.email}
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className={label}>
            {labels.phone}
            <input name="phone" type="tel" autoComplete="tel" className={field} />
          </label>
        </div>
        <label className={label}>
          {labels.notes}
          <textarea name="notes" rows={3} className={field} />
        </label>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-line bg-blush p-7">
          <p className="font-display text-3xl font-semibold text-burgundy-deep">{labels.summary}</p>
          {tour && price ? (
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{tour.name}</dt>
                <dd className="font-semibold">
                  {guestCount} × {formatUsd(tour.priceUsd)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="text-muted">{labels.total}</dt>
                <dd className="font-semibold">{formatUsd(price.totalUsd)}</dd>
              </div>
              <div className="flex justify-between text-base">
                <dt className="font-semibold text-burgundy">{labels.deposit}</dt>
                <dd className="font-bold text-burgundy">{formatUsd(price.depositUsd)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{labels.balance}</dt>
                <dd className="font-semibold">{formatUsd(price.balanceUsd)}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-6 text-sm text-muted">{labels.noTour}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-8 w-full rounded-full bg-burgundy px-6 py-4 font-semibold text-white transition hover:bg-burgundy-deep disabled:opacity-60"
          >
            {status === "sending" ? labels.processing : labels.pay}
          </button>
          {status === "error" && <p className="mt-3 text-sm text-red-700">{labels.error}</p>}
          {status === "invalid" && <p className="mt-3 text-sm text-red-700">{labels.required}</p>}
          <p className="mt-4 text-center text-xs text-muted">{labels.secure}</p>
        </div>
      </aside>
    </form>
  );
}
