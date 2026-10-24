export type CheckoutInput = {
  /** Unique booking reference, also used as the payment reference. */
  reference: string;
  /** Deposit amount in USD (what the guest sees). */
  depositUsd: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  /** Absolute URL the guest returns to after paying. */
  redirectUrl: string;
};

export type CheckoutSession = {
  /** Where to send the guest to pay. */
  url: string;
  /** "demo" means no real payment provider is configured and no money moves. */
  mode: "live" | "demo";
};

export interface PaymentProvider {
  createCheckout(input: CheckoutInput): Promise<CheckoutSession>;
}
