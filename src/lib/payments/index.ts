import type { CheckoutInput, CheckoutSession, PaymentProvider } from "./types";
import { WompiProvider } from "./wompi";

/** Used when no payment keys are set. Sends the guest straight to the success page; no money moves. */
class DemoProvider implements PaymentProvider {
  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    return { url: input.redirectUrl, mode: "demo" };
  }
}

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER ?? "wompi";

  if (provider === "wompi") {
    const publicKey = process.env.WOMPI_PUBLIC_KEY;
    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    const rate = Number(process.env.USD_COP_RATE);
    if (publicKey && secret && rate > 0) {
      return new WompiProvider(publicKey, secret, rate, process.env.WOMPI_CHECKOUT_URL);
    }
  }

  // TODO: add a BoldProvider here if Yessenia prefers Bold over Wompi.
  return new DemoProvider();
}

export type { CheckoutInput, CheckoutSession, PaymentProvider } from "./types";
