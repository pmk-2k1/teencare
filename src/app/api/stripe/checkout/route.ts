import { NextResponse } from "next/server";
import { getAppBaseUrl, getStripe } from "@/src/lib/stripe/client";
import { getPriceIdForPlan, isPlanId } from "@/src/lib/stripe/plans";

type CheckoutBody = {
  planId?: string;
  email?: string;
  sessionId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const planId = body.planId?.trim();
    const email = body.email?.trim().toLowerCase();
    const sessionId = body.sessionId?.trim() || "";

    if (!isPlanId(planId)) {
      return NextResponse.json(
        { ok: false, error: "Invalid plan. Choose week, month, or quarterly." },
        { status: 400 },
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Valid email is required." },
        { status: 400 },
      );
    }

    const priceId = getPriceIdForPlan(planId);
    const baseUrl = getAppBaseUrl();
    const stripe = getStripe();

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        source: "teencare-phase4",
        plan_id: planId,
        teencare_session_id: sessionId,
      },
      subscription_data: {
        metadata: {
          source: "teencare-phase4",
          plan_id: planId,
          teencare_session_id: sessionId,
        },
      },
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { ok: false, error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
