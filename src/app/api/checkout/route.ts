import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getTour } from "@/data/tours";
import { isLocale } from "@/lib/i18n";
import { getPaymentProvider } from "@/lib/payments";
import { calculatePrice } from "@/lib/pricing";

type CheckoutPayload = {
  tourSlug?: string;
  date?: string;
  guests?: number;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  lang?: string;
};

function newReference(): string {
  return `YT-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  let body: CheckoutPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lang = body.lang && isLocale(body.lang) ? body.lang : "en";
  const tour = body.tourSlug ? getTour(body.tourSlug) : undefined;
  const guests = Number(body.guests);
  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!tour) return NextResponse.json({ error: "Unknown tour" }, { status: 400 });
  if (!Number.isInteger(guests) || guests < 1 || guests > tour.maxGuests) {
    return NextResponse.json({ error: "Invalid guest count" }, { status: 400 });
  }
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  // Accept only a real calendar date that is today or later (Bogota time is close enough for a date-only check).
  const date = body.date ?? "";
  const parsed = new Date(`${date}T00:00:00-05:00`);
  const startOfToday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed < startOfToday) {
    return NextResponse.json({ error: "Choose a valid future date" }, { status: 400 });
  }

  // Price is always recomputed on the server from the tour data. The client never sets the amount.
  const price = calculatePrice(tour.priceUsd, guests);
  const reference = newReference();
  const origin = new URL(request.url).origin;

  const session = await getPaymentProvider().createCheckout({
    reference,
    depositUsd: price.depositUsd,
    customerEmail: email,
    customerName: name,
    customerPhone: body.phone?.trim() || undefined,
    redirectUrl: `${origin}/${lang}/checkout/success?ref=${reference}`,
  });

  // TODO: persist the booking (reference, tour, date, guests, contact, notes, price, status "pending")
  // so the payment webhook can mark it paid, email the guest and Yessenia, and create the lead record.
  console.log("[checkout] booking started", {
    reference,
    tour: tour.slug,
    date,
    guests,
    depositUsd: price.depositUsd,
    mode: session.mode,
  });

  return NextResponse.json({ url: session.url, reference, mode: session.mode });
}
