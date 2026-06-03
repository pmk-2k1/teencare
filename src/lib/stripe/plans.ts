export type PlanId = "week" | "month" | "quarterly";

const PLAN_PRICE_ENV: Record<PlanId, string> = {
  week: "STRIPE_PRICE_ID_WEEK",
  month: "STRIPE_PRICE_ID_MONTH",
  quarterly: "STRIPE_PRICE_ID_QUARTERLY",
};

export function isPlanId(value: unknown): value is PlanId {
  return value === "week" || value === "month" || value === "quarterly";
}

export function getPriceIdForPlan(planId: PlanId): string {
  const envKey = PLAN_PRICE_ENV[planId];
  const priceId = process.env[envKey]?.trim();
  if (!priceId) {
    throw new Error(`Missing ${envKey}`);
  }
  return priceId;
}
