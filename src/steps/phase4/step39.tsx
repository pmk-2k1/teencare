import type { SurveyStep } from "@/src/types/survey";
import Button from "@/src/component/Button";
import { useState } from "react";
import OptionCardWithLabel from "@/src/component/OptionCardWithLabel";
import Shield from "@/src/app/assets/svg/Shield";
import Star from "@/src/app/assets/svg/Star";
import Image from "next/image";
import Apple from "@/src/app/assets/svg/Apple";
import GooglePlay from "@/src/app/assets/svg/GooglePlay";
import ArrowDown from "@/src/app/assets/svg/ArrowDown";
import Logo from "@/src/app/assets/svg/Logo";
import type { PlanId } from "@/src/lib/stripe/plans";
import {
  ANSWERS_STORAGE_KEY,
  PENDING_SURVEY_STORAGE_KEY,
  SESSION_ID_STORAGE_KEY,
  STEP35_EMAIL_STORAGE_KEY,
} from "@/src/lib/survey/storageKeys";

type StoredAnswers = Record<string, string[]>;

const CustomPage39 = ({ onNext }: { onNext: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parseStoredAnswers = (): StoredAnswers => {
    try {
      const raw = localStorage.getItem(ANSWERS_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};
      return parsed as StoredAnswers;
    } catch {
      return {};
    }
  };

  const getStepAnswersPayload = (stored: StoredAnswers) => {
    const result: Record<string, string[]> = {};
    for (let stepNumber = 1; stepNumber <= 39; stepNumber += 1) {
      const zeroBased = String(stepNumber - 1);
      const value = stored[zeroBased];
      result[`step${stepNumber}`] = Array.isArray(value) ? value : [];
    }
    return result;
  };

  const buildSurveyPayload = (
    planId: PlanId,
    email: string,
    sessionId: string,
  ) => {
    const storedAnswers = parseStoredAnswers();
    const stepAnswers = getStepAnswersPayload(storedAnswers);
    return {
      email,
      source: "teencare-phase4",
      submitted_at: new Date().toISOString(),
      session_id: sessionId,
      payment_paid: "no",
      payment_status: "pending",
      plan_step1: planId,
      step_answers: stepAnswers,
      user_agent: navigator.userAgent,
    };
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
    <div className="flex flex-col justify-start pt-10! min-h-full! flex-1 gap-5">
      {/* slide 1 */}
      <div className="flex flex-col justify-center items-center gap-5 w-full">
        <p className="font-bold text-[32px] text-[#18181B]">Choose your plan</p>
        <div className="discount grid grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-[#18181B] font-semibold text-[14px]">
              Applied limited discount
            </p>
            <div className="flex flex-col items-center">
              <div className="relative w-full flex flex-col items-center">
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 text-center flex justify-center items-center gap-2 bg-[#FFAC08] rounded-sm p-1.5! z-10">
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
                <p className="text-[#18181B] font-bold text-[32px]">08</p>
                <p className="text-[#52525B] text-[12px]">minutes</p>
              </div>
              <div className="flex flex-col items-center gap-5 discount-time">
                <p className="text-[#18181B] font-bold text-[32px]">54</p>
                <p className="text-[#52525B] text-[12px]">seconds</p>
              </div>
              <div className="flex flex-col items-center gap-2 "> </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-sm px-3! py-5! flex flex-col gap-5 items-center justify-center w-full">
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

      {/* slide 2 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5">
        <p className="font-bold text-[32px] text-[#18181B] text-center">
          What’s inside
        </p>
        <div className="flex flex-col gap-y-5">
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
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5">
        <p className="font-bold text-[20px] text-[#18181B] text-center">
          Numbers from parents like you
        </p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1 p-5! justify-center items-center border-r border-b border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">28K</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              parents already practicing
            </span>
          </div>
          <div className="flex flex-col gap-1 p-5! justify-center items-center border-b border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">83%</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              felt less guilt after a hard moment
            </span>
          </div>
          <div className="flex flex-col gap-1 p-5! justify-center items-center border-r border-[#E4E4E7]">
            <span className="font-bold text-[#FFAC08] text-[32px]">91%</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              say they react less, connect more
            </span>
          </div>
          <div className="flex flex-col gap-1 p-5! justify-center items-center">
            <span className="font-bold text-[#FFAC08] text-[32px]">10min</span>
            <span className="text-[#18181B] text-[14px] font-medium text-center">
              short enough to actually do
            </span>
          </div>
        </div>
      </div>

      {/* slide 4 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-[32px] text-[#18181B] text-center">
            What parents are saying
          </p>
          <span className="text-[#18181B] text-[14px] font-medium text-center">
            Join 28,400+ parents already doing the work.
          </span>
        </div>
        <div className="flex flex-col gap-y-5 justify-center w-full">
          <div className="feed-back flex flex-col gap-y-5">
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
        <div className="flex flex-col gap-3 justify-center">
          <span className="text-[14px] font-medium text-[#18181B] text-center">
            Featured in:
          </span>
          <div className="flex justify-center items-center w-full max-w-[500px]">
            <Image
              src="/images/partner.png"
              alt="Survey Image"
              width={500}
              height={500}
              className="object-contain animate-bounce-in"
              style={{ width: "100%", height: "auto" }}
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* slide 5 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5 justify-center items-center">
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
          <div className="flex flex-col justify-center items-center text-[#18181B]">
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
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-1">
                <Star className="h-4 w-4" />
                <Star className="h-4 w-4" />
                <Star className="h-4 w-4" />
                <Star className="h-4 w-4" />
                <Star className="h-4 w-4" />
              </div>
              <div className="flex justify-center items-end">
                <span className="text-[18px] text[#FFAC08] font-semibold">
                  4,6
                </span>
                <span className="text-[14px] text[#18181B] ">out of 5</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <Apple />
              <span className="text-[14px] text[#18181B] font-medium">
                App Store
              </span>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <Apple />
              <span className="text-[14px] text[#18181B] font-medium">
                App Store
              </span>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <GooglePlay />
              <span className="text-[14px] text[#18181B] font-medium">
                medium Google Play
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="px-3! py-2! rounded-sm bg-[#FFE5B2] text-[14px] flex gap-3 justify-center items-center">
              <span className="font-bold text-[#18181B]">35K</span>
              <span className="font-medium text-[#52525B]">5-star ratings</span>
            </div>
            <div className="px-3! py-2! rounded-sm bg-[#FFE5B2] text-[14px] flex gap-3 justify-center items-center">
              <span className="font-bold text-[#18181B]">4M</span>
              <span className="font-medium text-[#52525B]">downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* slide 6 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5">
        <p className="font-bold text-[32px] text-[#18181B] text-center">
          We are ready to answer you questions
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center bg-[#FFE5B2] py-3! px-5! rounded-sm text-[16px] text-[#18181B] font-medium cursor-pointer">
            <span>How do I get access to the app?</span>
            <ArrowDown />
          </div>
          <div className="flex justify-between items-center bg-[#FFE5B2] py-3! px-5! rounded-sm text-[16px] text-[#18181B] font-medium cursor-pointer">
            <span>How do I get access to the app?</span>
            <ArrowDown />
          </div>
          <div className="flex justify-between items-center bg-[#FFE5B2] py-3! px-5! rounded-sm text-[16px] text-[#18181B] font-medium cursor-pointer">
            <span>How do I get access to the app?</span>
            <ArrowDown />
          </div>
        </div>
      </div>

      {/* slide 9 */}
      <div className="flex flex-col bg-[#FFFFFF] rounded-sm p-5! gap-y-5">
        <p className="font-bold text-[18px] text-[#18181B]">
          Money-Back Guarantee
        </p>
        <p className="font-medium text-[14px] text-[##52525B] whitespace-pre-line">
          {
            "Explore our app with confidence, backed by our Money-Back Guarantee. Our expertly crafted content ensures a risk-free experience for you to dive into the full potential of our app.\n\n If you don't witness the expected results within 30 days of your purchase, we stand by our commitment to provide a hassle-free refund. For detailed information, please refer to our Subscription Policy."
          }
        </p>
      </div>

      {/* slide 10 */}
      <div className="flex flex-col gap-y-5">
        <div className="flex items-end justify-center gap-1">
          <div className="flex mb-0.5!">
            <Logo />
          </div>

          <p className="text-[24px] font-bold text-[#292929] leading-none">
            TeenCare
          </p>
        </div>
        <div className="flex flex-col justify-center gap-5 text-[#18181B] text-[12px] font-medium">
          <span>© 2026 by TeenCare</span>
          <div className="flex flex-col gap-3 justify-center">
            <span>
              🇻🇳 61E De La Thanh, Dong Da District, Ha Noi city, Viet Nam
            </span>
            <span>🇸🇬 20A Tanjong Pagar Road, Singapore</span>
            <span>
              🇵🇭 One Ayala Ave, Makati City, 1226 Metro Manila, Philippines
            </span>
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <span>
              These documents collectively outline the guidlines and policies
              governing your interaction with our platform
            </span>
            <div className="text-[#A1A1AA] flex flex-wrap gap-x-5 gap-y-2 items-center underline">
              <a href="https://vn.teencare.co/dieukhoandichvu" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Terms & Conditions
              </a>
              <a href="https://vn.teencare.co/dieukhoandichvu" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Privacy Policy
              </a>
              <a href="https://vn.teencare.co/dieukhoandichvu" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
                Subscription Policy
              </a>
              <a href="https://vn.teencare.co/dieukhoandichvu" target="_blank" className="underline text-[12px] text-[#6B6B6B]">
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
