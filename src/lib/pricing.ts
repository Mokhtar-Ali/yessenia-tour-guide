export const DEPOSIT_RATE = 0.3;

export type PriceBreakdown = {
  totalUsd: number;
  depositUsd: number;
  balanceUsd: number;
};

/** All amounts are rounded to whole cents so deposit + balance always equals the total. */
export function calculatePrice(pricePerPersonUsd: number, guests: number): PriceBreakdown {
  const totalCents = Math.round(pricePerPersonUsd * guests * 100);
  const depositCents = Math.round(totalCents * DEPOSIT_RATE);
  return {
    totalUsd: totalCents / 100,
    depositUsd: depositCents / 100,
    balanceUsd: (totalCents - depositCents) / 100,
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
