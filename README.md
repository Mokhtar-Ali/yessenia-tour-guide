# Yessenia Tours

Website for Yessenia, a tour guide in Medellín. Built with Next.js (App Router), Tailwind CSS and Motion, hosted on Vercel.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site redirects to `/en` or `/es` based on the browser language.

## What is in here

| Path | Purpose |
| --- | --- |
| `src/app/[lang]/page.tsx` | Landing page |
| `src/app/[lang]/tours` | Tours listing and tour detail pages |
| `src/app/[lang]/checkout` | Checkout and success pages |
| `src/app/[lang]/about`, `contact` | About and contact pages |
| `src/app/api/checkout` | Validates a booking server-side and starts the deposit payment |
| `src/app/api/contact` | Contact form endpoint (email sending still to do) |
| `src/dictionaries/en.json`, `es.json` | All site text in both languages |
| `src/data/tours.ts` | Tours data. Currently placeholder, replace with the Airtable export |
| `src/lib/pricing.ts` | 30% deposit math |
| `src/lib/payments` | Payment providers (Wompi, plus a demo mode) |
| `src/proxy.ts` | Redirects `/` to the right language |

## Brand

Burgundy `#6d1230` with deep burgundy `#470a1e`, a blush tint and a small gold accent. Colors are defined in `src/app/globals.css`. Fonts are Cormorant Garamond (headings) and Manrope (body), self-hosted from npm.

## Payments

Deposit is 30% of the total, paid online. The remaining 70% is paid on the day.

With no payment keys set, checkout runs in **demo mode**: it goes straight to the success page and no money moves. To go live, copy `.env.example` to `.env.local`, fill in the Wompi keys, and add the same variables in Vercel.

Wompi Colombia only accepts COP, so the USD deposit is converted using `USD_COP_RATE`. The booking price is always recomputed on the server from the tour data.

## Still to do

- Replace placeholder tours with the Airtable export (CSV to `src/data/tours.ts`)
- Add real photos, Yessenia's portrait, hero video and testimonials
- Save bookings, receive the payment webhook, and send confirmation emails to the guest and Yessenia
- Availability calendar connected to Yessenia's calendar
- Logo, real contact details, cancellation policy text
- Leads tracking system
- Bold as an alternative payment provider, if wanted
