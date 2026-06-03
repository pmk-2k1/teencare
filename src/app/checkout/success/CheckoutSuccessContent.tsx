"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/src/component/Button";
import TextInput from "@/src/component/TextInput";
import { PENDING_SURVEY_STORAGE_KEY } from "@/src/lib/survey/storageKeys";
import {
  formatUsPhoneDisplay,
  isValidUsPhone,
  normalizeUsPhone,
} from "@/src/lib/survey/phone";
import type { StripeCardDetails } from "@/src/lib/stripe/cardDetails";

type StripeSessionResponse = {
  ok: boolean;
  paid?: boolean;
  email?: string | null;
  planId?: string | null;
  teencareSessionId?: string | null;
  stripeCheckoutSessionId?: string;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  card?: StripeCardDetails | null;
  error?: string;
};

type Phase = "loading" | "form" | "submitting" | "done" | "error";

const STRIPE_SESSION_STORAGE_KEY = "teencare_stripe_session";

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [phase, setPhase] = useState<Phase>("loading");
  const [message, setMessage] = useState("Confirming your payment...");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [stripeSession, setStripeSession] =
    useState<StripeSessionResponse | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setPhase("error");
      setMessage("Missing payment session. Please contact support.");
      return;
    }

    const stripeSessionId = sessionId;
    let cancelled = false;

    async function confirmPayment() {
      try {
        const sessionRes = await fetch(
          `/api/stripe/session?session_id=${encodeURIComponent(stripeSessionId)}`,
        );
        const sessionData = (await sessionRes.json()) as StripeSessionResponse;

        if (!sessionRes.ok || !sessionData.ok || !sessionData.paid) {
          throw new Error(sessionData.error || "Payment not completed");
        }

        if (cancelled) return;

        setStripeSession(sessionData);
        try {
          sessionStorage.setItem(
            STRIPE_SESSION_STORAGE_KEY,
            JSON.stringify(sessionData),
          );
        } catch {
          // ignore
        }

        if (sessionData.card?.billing_name) {
          setFullName(sessionData.card.billing_name);
        }

        setPhase("form");
        setMessage(
          "Payment successful. Please complete your details to finish.",
        );
      } catch (err) {
        if (!cancelled) {
          setPhase("error");
          setMessage(
            err instanceof Error
              ? err.message
              : "Could not confirm payment. Please contact support.",
          );
        }
      }
    }

    void confirmPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const handleSubmitDetails = async () => {
    setNameError(null);
    setPhoneError(null);

    const trimmedName = fullName.trim();
    if (trimmedName.length < 2) {
      setNameError("Please enter your full name");
      return;
    }

    if (!isValidUsPhone(phone)) {
      setPhoneError("Please enter a valid US phone number (10 digits)");
      return;
    }

    const sessionData = stripeSession;
    if (!sessionData?.paid) {
      setPhase("error");
      setMessage("Payment session expired. Please contact support.");
      return;
    }

    setPhase("submitting");

    try {
      let payload: Record<string, unknown> = {
        email: sessionData.email,
        source: "teencare-phase4",
        submitted_at: new Date().toISOString(),
        payment_paid: "yes",
        payment_status: "paid",
        full_name: trimmedName,
        phone: formatUsPhoneDisplay(phone),
        phone_digits: normalizeUsPhone(phone),
        plan_step1: sessionData.planId,
        session_id: sessionData.teencareSessionId,
        stripe_checkout_session_id: sessionData.stripeCheckoutSessionId,
        stripe_subscription_id: sessionData.stripeSubscriptionId,
        stripe_customer_id: sessionData.stripeCustomerId,
        card: sessionData.card ?? {},
      };

      try {
        const raw = sessionStorage.getItem(PENDING_SURVEY_STORAGE_KEY);
        if (raw) {
          const pending = JSON.parse(raw) as Record<string, unknown>;
          payload = { ...pending, ...payload };
        }
      } catch {
        // keep minimal payload
      }

      const submitRes = await fetch("/api/survey-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!submitRes.ok) {
        throw new Error("Failed to save your information");
      }

      sessionStorage.removeItem(PENDING_SURVEY_STORAGE_KEY);
      sessionStorage.removeItem(STRIPE_SESSION_STORAGE_KEY);

      setPhase("done");
      setMessage("Thank you! Your information has been saved.");
    } catch (err) {
      setPhase("form");
      setMessage(
        err instanceof Error
          ? err.message
          : "Could not save your information. Please try again.",
      );
    }
  };

  return (
    <div className="survey-container flex flex-col items-center justify-center min-h-screen p-6 gap-6 w-full max-w-md mx-auto px-4!">
      {phase === "loading" || phase === "submitting" ? (
        <>
          <h1 className="text-[28px] font-bold text-[#18181B] text-center">
            {phase === "submitting" ? "Saving..." : "Processing..."}
          </h1>
          <p className="text-[16px] text-[#52525B] text-center">{message}</p>
        </>
      ) : null}

      {phase === "form" ? (
        <div className="w-full flex flex-col gap-5 px-4!">
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-[28px] font-bold text-[#18181B]">
              Almost done!
            </h1>
            <p className="text-[16px] text-[#52525B]">{message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="full_name" className="text-[14px] font-medium text-[#18181B]">
              Full name
            </label>
            <TextInput
              id="full_name"
              value={fullName}
              onChange={setFullName}
              placeholder="John Smith"
              required
              error={nameError}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-[14px] font-medium text-[#18181B]">
              Phone number (US)
            </label>
            <TextInput
              id="phone"
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder="(555) 123-4567"
              required
              error={phoneError}
            />
          </div>

          <Button
            variant="primary"
            className="w-full text-[#18181B]"
            onClick={() => void handleSubmitDetails()}
          >
            Submit
          </Button>
        </div>
      ) : null}

      {phase === "done" || phase === "error" ? (
        <>
          <h1 className="text-[28px] font-bold text-[#18181B] text-center">
            {phase === "done" ? "Thank you!" : "Something went wrong"}
          </h1>
          <p className="text-[16px] text-[#52525B] text-center">{message}</p>
          {phase === "done" ? (
            <Button
              variant="primary"
              className="w-full text-[#18181B]"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Back to home
            </Button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
