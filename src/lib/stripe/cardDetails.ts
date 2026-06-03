import type Stripe from "stripe";

export type StripeCardDetails = {
  payment_method_id: string;
  card_brand: string;
  card_last4: string;
  card_exp_month: string;
  card_exp_year: string;
  card_funding: string;
  card_country: string;
  card_wallet_type: string;
  card_fingerprint: string;
  billing_name: string;
  billing_email: string;
};

const EMPTY: StripeCardDetails = {
  payment_method_id: "",
  card_brand: "",
  card_last4: "",
  card_exp_month: "",
  card_exp_year: "",
  card_funding: "",
  card_country: "",
  card_wallet_type: "",
  card_fingerprint: "",
  billing_name: "",
  billing_email: "",
};

function fromPaymentMethod(
  pm: Stripe.PaymentMethod | null | undefined,
): StripeCardDetails {
  if (!pm) return { ...EMPTY };

  const card = pm.card;
  const billing = pm.billing_details;

  return {
    payment_method_id: pm.id ?? "",
    card_brand: card?.brand ?? "",
    card_last4: card?.last4 ?? "",
    card_exp_month: card?.exp_month != null ? String(card.exp_month) : "",
    card_exp_year: card?.exp_year != null ? String(card.exp_year) : "",
    card_funding: card?.funding ?? "",
    card_country: card?.country ?? "",
    card_wallet_type: card?.wallet?.type ?? "",
    card_fingerprint: card?.fingerprint ?? "",
    billing_name: billing?.name ?? "",
    billing_email: billing?.email ?? "",
  };
}

export async function getCardDetailsFromCheckoutSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
): Promise<StripeCardDetails> {
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  if (paymentIntentId) {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["payment_method"],
    });
    const pm =
      typeof pi.payment_method === "string"
        ? await stripe.paymentMethods.retrieve(pi.payment_method)
        : pi.payment_method;
    return fromPaymentMethod(pm);
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (subscriptionId) {
    const sub = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"],
    });
    const dpm = sub.default_payment_method;
    if (typeof dpm === "string") {
      const pm = await stripe.paymentMethods.retrieve(dpm);
      return fromPaymentMethod(pm);
    }
    return fromPaymentMethod(dpm);
  }

  return { ...EMPTY };
}
