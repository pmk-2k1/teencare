import type { SurveyStep } from "@/src/types/survey";
import Button from "@/src/component/Button";
import FaqItem from "@/src/component/FaqItem";
import { useState, useEffect } from "react";
import OptionCardWithLabel from "@/src/component/OptionCardWithLabel";
import Shield from "@/src/app/assets/svg/Shield";
import Star from "@/src/app/assets/svg/Star";
import Image from "next/image";
import Apple from "@/src/app/assets/svg/Apple";
import GooglePlay from "@/src/app/assets/svg/GooglePlay";
import Logo from "@/src/app/assets/svg/Logo";
import type { PlanId } from "@/src/lib/stripe/plans";
import {
  applySheetAnswersToPayload,
  loadStoredAnswers,
} from "@/src/lib/survey/buildSheetPayload";
import {
  PENDING_SURVEY_STORAGE_KEY,
  SESSION_ID_STORAGE_KEY,
  STEP35_EMAIL_STORAGE_KEY,
} from "@/src/lib/survey/storageKeys";

const CustomPage39 = ({ onNext }: { onNext: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 60 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const buildSurveyPayload = (
    planId: PlanId,
    email: string,
    sessionId: string,
  ) => {
    const base = {
      email,
      source: "teencare-phase4",
      submitted_at: new Date().toISOString(),
      session_id: sessionId,
      payment_paid: "no",
      payment_status: "pending",
      plan_step1: planId,
      user_agent: navigator.userAgent,
    };
    return applySheetAnswersToPayload(base, loadStoredAnswers());
  };

  const handleGetPlan = async () => {
    if (isSubmitting) return;
    setSubmitError(null);

    const planId = selectedPlan;

    if (!planId || (planId !== "week" && planId !== "month" && planId !== "quarterly")) {
      setSubmitError("Please select a plan before continuing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const email = localStorage
        .getItem(STEP35_EMAIL_STORAGE_KEY)
        ?.trim()
        .toLowerCase();
      if (!email) {
        throw new Error("Missing email from step 35");
      }

      let sessionId = localStorage.getItem(SESSION_ID_STORAGE_KEY);
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
      }

      const payload = buildSurveyPayload(
        planId as PlanId,
        email,
        sessionId,
      );

      try {
        sessionStorage.setItem(
          PENDING_SURVEY_STORAGE_KEY,
          JSON.stringify(payload),
        );
      } catch {
        // Continue checkout even if sessionStorage is unavailable
      }

      const surveyResponse = await fetch("/api/survey-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!surveyResponse.ok) {
        throw new Error("Failed to save your answers");
      }

      const checkoutResponse = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          email,
          sessionId,
        }),
      });

      const checkoutData = (await checkoutResponse.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };

      if (!checkoutResponse.ok || !checkoutData.ok || !checkoutData.url) {
        throw new Error(checkoutData.error || "Failed to start checkout");
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to start payment. Please go back and check your email, then try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-start pt-10! min-h-full! flex-1 gap-6">
      {/* slide 1 */}
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <p className="font-bold text-[32px] text-[#18181B]">Choose your plan</p>
        <div className="discount grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-[#18181B] font-semibold text-[14px]">
              Applied limited discount
            </p>
            <div className="flex flex-col items-center">
              <div className="relative w-full flex flex-col items-center">
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 text-center flex justify-center items-center gap-1.5 bg-[#FFAC08] rounded-sm py-0.5! px-2! z-10">
                  <p className="text-[#52525B] font-semibold text-[14px] line-through">
                    33%
                  </p>
                  <p className="text-[#18181B] font-semibold text-[16px]">
                    Save 53%
                  </p>
                </div>
                <div className="bg-[#FFFAEF] rounded-md px-3! pb-3! pt-10! flex flex-col items-center gap-2 w-full">
                  <p className="text-[#A1A1AA] text-[12px] line-through">
                    newcomer_apr26
                  </p>
                  <p className="text-[#18181B] font-bold text-[16px]">
                    CALM_DAD
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <p className="text-[#18181B] font-semibold text-[14px] text-center">
              Valid for
            </p>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex flex-col items-center gap-5 discount-time">
                <p className="text-[#18181B] font-bold text-[32px]">{minutes}</p>
                <p className="text-[#52525B] text-[12px]">minutes</p>
              </div>
              <div className="flex flex-col items-center gap-5 discount-time">
                <p className="text-[#18181B] font-bold text-[32px]">{seconds}</p>
                <p className="text-[#52525B] text-[12px]">seconds</p>
              </div>
              <div className="flex flex-col items-center gap-2 "> </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-md p-4! flex flex-col gap-6 items-center justify-center w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 w-full">
              <OptionCardWithLabel
                topLabel="Intro Offer"
                title="1 week"
                discount="USD 4.99"
                price="USD 29.99"
                per_day={71}
                explain={0}
                selected={selectedPlan === "week"}
                selectionType="single"
                onClick={() => setSelectedPlan("week")}
              />
              <OptionCardWithLabel
                topLabel="Save 15%"
                title="1 month"
                discount="USD 17.99"
                price="USD 29.99"
                per_day={60}
                explain={0}
                selected={selectedPlan === "month"}
                selectionType="single"
                onClick={() => setSelectedPlan("month")}
              />
              <OptionCardWithLabel
                topLabel="Save 53%"
                title="3 months"
                discount="USD 29.99"
                price="USD 59.99"
                per_day={33}
                explain={0}
                selected={selectedPlan === "quarterly"}
                selectionType="single"
                onClick={() => setSelectedPlan("quarterly")}
              />
            </div>
          </div>
          <div className="text-center flex gap-2 justify-center items-center">
            <Shield className="text-[#FFAC08]" />
            <p className="text-[#18181B] font-medium text-[12px] underline">
              30-DAY MONEY-BACK GUARANTEE
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => void handleGetPlan()}
            id="btn-continue"
            className="text-[#18181B] w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Redirecting to payment..." : "Get my plan"}
          </Button>
          {submitError ? (
            <p className="text-[12px] text-[#DC2626] text-center">{submitError}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-4">
        <div className="text-[#52525B] text-[14px]">
          <span>
            Your 3 month plan now includes a discounted intro price. After the 3 month intro period ends, your subscription will renew at the standard price of $59.99 every 3 months and will continue to bill every 3 months until you cancel. You can cancel anytime in your account at teencareparent.app, in the app settings, or by contacting us at info@teencare.co. Please note: deleting or removing the app does not cancel your subscription.
          </span>
        </div>
        <div className="text-center flex gap-2 justify-center items-center">
          <Shield className="text-[#FFAC08]" />
          <p className="text-[#18181B] font-medium text-[14px]">
            Guaranteed Safe Checkout
          </p>
        </div>
        <div className="relative h-5.5! w-full! flex justify-center items-center">
          <Image
            src="/images/pay.webp"
            alt="Survey Image"
            fill
            sizes="328px"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>

      {/* slide 9 */}
      <div className="relative flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-4">
        <div className="absolute top-[-15px] right-[-15px] w-[90px] h-[90px]">
          <Image
            src="/images/moneyImage.webp"
            alt="Money Back Guarantee"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <p className="font-bold text-[18px] text-[#18181B] pr-12">
          Money-Back Guarantee
        </p>
        <span className="font-medium text-[14px] text-[##52525B] whitespace-pre-line">
          {
            "Explore our app with confidence, backed by our Money-Back Guarantee. Our expertly crafted content ensures a risk-free experience for you to dive into the full potential of our app.\n\n If you don't witness the expected results within 30 days of your purchase, we stand by our commitment to provide a hassle-free refund. For detailed information, please refer to our "
          }
          <span className="underline">Subscription Policy.</span>
        </span>
      </div>


      {/* slide 2 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-6">
        <p className="font-bold text-[32px] text-[#18181B] text-center">
          What’s inside
        </p>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 justify-center items-center">
            <span>🔥</span>
            <span className="text-[#18181B] text-[14px] font-medium">
              AI Role-Play Trainer: practice hard conversations before they
              happen.
            </span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span>🧠</span>
            <span className="text-[#18181B] text-[14px] font-medium">
              Personalized Plan: built around your kids and your schedule.
            </span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span>📱</span>
            <span className="text-[#18181B] text-[14px] font-medium">
              Daily 10-min Sessions: short enough to actually do.
            </span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span>📈</span>
            <span className="text-[#18181B] text-[14px] font-medium">
              Progress Tracking: see yourself get better, week by week.
            </span>
          </div>
        </div>
      </div>

      {/* slide 3 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-6">
        <p className="font-bold text-[20px] text-[#18181B] text-center">
          Numbers from parents like you
        </p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1 p-4! justify-center items-center border-r border-b border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">100K</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              parents already practicing
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4! justify-center items-center border-b border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">83%</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              felt less guilt after a hard moment
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4! justify-center items-center border-r border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">91%</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              say they react less, connect more
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4! justify-center items-center">
            <span className="font-bold text-[#FFAC08] text-[32px]">10min</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              short enough to actually do
            </span>
          </div>
        </div>
      </div>

      {/* slide 4 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-5">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-[32px] text-[#18181B] text-center">
            What parents are saying
          </p>
          <span className="text-[#18181B] text-[14px] font-medium text-center">
            Join 28,400+ parents already doing the work.
          </span>
        </div>
        <div className="flex flex-col gap-y-4 justify-center w-full">
          <div className="feed-back flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p>@marcus</p>
            </div>
            <p>
              Not gonna lie, by week 2 I had pretty much stopped yelling, and my
              son actually started talking to me insted of shutting down.
            </p>
          </div>
          <div className="feed-back flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p>@priya</p>
            </div>
            <p>
              The role-play practice helped me stay calm when everything was
              falling apart.
            </p>
          </div>
          <div className="feed-back flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p>@mirraonair</p>
            </div>
            <p>I finally feel like I know that what I’m doing</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <span className="text-[14px] font-medium text-[#18181B] text-center">
            Featured in:
          </span>
          <div className="flex justify-center items-center w-full max-w-[500px]">
            <Image
              src="/images/partner.png"
              alt="Survey Image"
              width={500}
              height={500}
              className="object-contain"
              style={{ width: "100%", height: "auto" }}
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* slide 5 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-md py-6! px-4! gap-y-6 justify-center items-center">
        <div className="flex justify-center items-center gap-1 w-[80%]">
          <div className="relative h-20! w-10!">
            <Image
              src="/images/wreath-left.png"
              alt="Survey Image"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-center text-[#18181B] gap-1">
            <span className="font-bold text-[24px]">4+ million</span>
            <span className="font-medium text-[14px] text-center">
              users started improving their lives with us
            </span>
          </div>
          <div className="relative h-20! w-10!">
            <Image
              src="/images/wreath-right.png"
              alt="Survey Image"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center w-full">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-2 justify-start items-center h-full">
              <div className="h-8 flex items-center justify-center">
                <div className="flex gap-1">
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
              </div>
              <div className="flex justify-center items-start flex-1">
                <span className="text-[18px] text-[#FFAC08] font-semibold leading-tight text-center whitespace-nowrap">
                  4,6 <span className="text-[14px] text-[#18181B] ml-1">out of 5</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-start items-center h-full">
              <div className="h-8 flex items-center justify-center">
                <Apple />
              </div>
              <div className="flex justify-center items-start flex-1">
                <span className="text-[14px] text-[#18181B] font-medium text-center leading-tight mt-1">
                  App Store
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-start items-center h-full">
              <div className="h-8 flex items-center justify-center">
                <GooglePlay />
              </div>
              <div className="flex justify-center items-start flex-1">
                <span className="text-[14px] text-[#18181B] font-medium text-center leading-tight mt-1">
                  Google Play
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full">
            <div className="px-4! py-1! rounded-sm bg-[#FFE5B2] text-[14px] flex gap-3 justify-center items-center">
              <span className="font-bold text-[#18181B]">35K</span>
              <span className="font-medium text-[#52525B]">5-star ratings</span>
            </div>
            <div className="px-4! py-1! rounded-sm bg-[#FFE5B2] text-[14px] flex gap-3 justify-center items-center">
              <span className="font-bold text-[#18181B]">4M</span>
              <span className="font-medium text-[#52525B]">downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* slide 6 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-md p-4! gap-y-6">
        <p className="font-bold text-[32px] text-[#18181B] text-center">
          We are ready to answer you questions
        </p>
        <div className="flex flex-col gap-y-2">
          <FaqItem
            question="How do I get access to the app?"
            answer="Once you've enrolled in a learning package, TeenCare will automatically create your account and send your login details via Whatsapp. Simply sign in with your phone number - no sign-up process, no complicated passwords."
          />
          <FaqItem
            question="How can I cancel my subscription?"
            answer="If you'd like to pause or cancel your package, just reach out to our support team via Whatsapp or email us at info@teencare.co. We'll get back to you within 24 business hours."
          />
          <FaqItem
            question="Why the TeenCare app?"
            answer="The TeenCare app brings everything into one place — your child's class schedule, Mentor 1:1 bookings, and learning progress updates. No more juggling messages across different channels; everything stays synced so you can focus on what matters most."
          />
        </div>
      </div>

      {/* slide 10 */}
      <div className="flex flex-col gap-y-6">
        <div className="flex items-end gap-1">
          <div className="flex mb-0.5!">
            <Logo />
          </div>
          <p className="text-[24px] font-bold text-[#292929] leading-none">
            TeenCare
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 text-[#18181B] text-[12px] font-medium">
          <span>© 2026 by TeenCare</span>
          <div className="flex flex-col gap-4 justify-center">
            <span>
              These documents collectively outline the guidlines and policies
              governing your interaction with our platform
            </span>
            <div className="text-[#A1A1AA] flex flex-wrap gap-x-4 gap-y-2 items-center underline">
              <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Terms & Conditions
              </a>
              <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Privacy Policy
              </a>
              <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Subscription Policy
              </a>
              <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const step39: SurveyStep = {
  id: 39,
  customPage: CustomPage39,
  showHeader: false,
  wrapperClass: "step39-bg",
};

export default step39;
