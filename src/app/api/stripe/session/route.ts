import { NextResponse } from "next/server";
import { getCardDetailsFromCheckoutSession } from "@/src/lib/stripe/cardDetails";
import { getStripe } from "@/src/lib/stripe/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id")?.trim();

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing session_id" },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "payment_intent"],
    });

    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    const card = paid
      ? await getCardDetailsFromCheckoutSession(stripe, session)
      : null;

    return NextResponse.json({
      ok: true,
      paid,
      email:
        session.customer_details?.email ??
        session.customer_email ??
        card?.billing_email ??
        null,
      planId: session.metadata?.plan_id ?? null,
      teencareSessionId: session.metadata?.teencare_session_id ?? null,
      stripeCheckoutSessionId: session.id,
      stripeSubscriptionId:
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id ?? null,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
      card,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve session";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
