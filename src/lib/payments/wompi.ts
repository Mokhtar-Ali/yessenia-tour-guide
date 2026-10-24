import { createHash } from "node:crypto";
import type { CheckoutInput, CheckoutSession, PaymentProvider } from "./types";

/**
 * Wompi Web Checkout (Colombia).
 * Per Wompi's docs the checkout is a GET redirect with these query params:
 * public-key, currency, amount-in-cents, reference, signature:integrity, redirect-url.
 * Wompi Colombia only accepts COP, so the USD deposit is converted with USD_COP_RATE.
 * signature:integrity = SHA256(reference + amountInCents + currency + integritySecret).
 *
 * Env vars: WOMPI_PUBLIC_KEY, WOMPI_INTEGRITY_SECRET, USD_COP_RATE, optional WOMPI_CHECKOUT_URL.
 * The docs page does not state the checkout host, so it is configurable. Verify it in the sandbox.
 */
const DEFAULT_CHECKOUT_URL = "https://checkout.wompi.co/p/";

export function usdToCopCents(usd: number, rate: number): number {
  // COP amounts are whole pesos; Wompi wants the amount multiplied by 100.
  return Math.round(usd * rate) * 100;
}

export function wompiSignature(reference: string, amountInCents: number, currency: string, secret: string): string {
  return createHash("sha256").update(`${reference}${amountInCents}${currency}${secret}`).digest("hex");
}

export class WompiProvider implements PaymentProvider {
  constructor(
    private readonly publicKey: string,
    private readonly integritySecret: string,
    private readonly usdCopRate: number,
    private readonly checkoutUrl: string = DEFAULT_CHECKOUT_URL,
  ) {}

  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    const currency = "COP";
    const amountInCents = usdToCopCents(input.depositUsd, this.usdCopRate);

    const params = new URLSearchParams({
      "public-key": this.publicKey,
      currency,
      "amount-in-cents": String(amountInCents),
      reference: input.reference,
      "signature:integrity": wompiSignature(input.reference, amountInCents, currency, this.integritySecret),
      "redirect-url": input.redirectUrl,
      "customer-data:email": input.customerEmail,
      "customer-data:full-name": input.customerName,
    });
    if (input.customerPhone) params.set("customer-data:phone-number", input.customerPhone);

    return { url: `${this.checkoutUrl}?${params.toString()}`, mode: "live" };
  }
}
