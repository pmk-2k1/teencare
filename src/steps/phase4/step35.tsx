import type { SurveyStep } from "@/src/types/survey";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/src/i18n/context";
import Star from "@/src/app/assets/svg/Star";
import TextInput from "@/src/component/TextInput";
import ErrorCircle from "@/src/app/assets/svg/ErrorCircle";
import Button from "@/src/component/Button";
import Arrow from "@/src/app/assets/svg/Arrow";

function CustomPage35({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const labels = [
    "Your profile",
    "Parents like you",
    "Your personal plan",
    "Ready to go",
  ];
  const itemCount = labels.length;
  const [progress, setProgress] = useState<number[]>(Array(itemCount).fill(0));
  const [completed, setCompleted] = useState<boolean[]>(
    Array(itemCount).fill(false),
  );
  const { t } = useI18n();

  useEffect(() => {
    if (step >= itemCount) return;

    const id = window.setInterval(() => {
      setProgress((prev) => {
        const next = [...prev];
        next[step] = Math.min(100, next[step] + 6);
        return next;
      });
    }, 160);

    return () => clearInterval(id);
  }, [step, itemCount]);

  useEffect(() => {
    if (step >= itemCount) return;
    if (progress[step] >= 100) {
      setTimeout(() => {
        setCompleted((prev) => {
          const next = [...prev];
          next[step] = true;
          return next;
        });
        if (step < itemCount - 1) setStep((s) => s + 1);
        else setStep(itemCount);
      }, 0);
    }
  }, [progress, step, itemCount]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleFinalNext = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError(null);
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1">
      {step < itemCount && (
        <>
          <div className="flex flex-col justify-center gap-y-8 w-full">
            <div className="flex flex-col gap-5 justify-center">
              <div className="flex items-end justify-center gap-1">
                <div className="h-7.5 w-12">
                  <Image
                    src="/images/logo.png"
                    alt="TeenCare"
                    width={48}
                    height={30}
                    className="h-full w-full"
                  />
                </div>

                <p className="text-[24px] font-bold text-[#292929] leading-none">
                  {t("brand")}
                </p>
              </div>
              <div className="text-center font-bold text-[32px] text-[#18181B] leading-[1.3]">
                <p>Spotting your patterns</p>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-5 justify-center">
                {labels.map((label, i) => {
                  if (i > step) return null;
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                      className="bg-white flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[18px] font-extrabold text-[#18181B]">
                          {label}
                        </div>
                        {completed[i] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              fill="var(--primary)"
                            />
                            <path
                              d="M7.5 12.5l2.5 2.5 6-6"
                              stroke="#fff"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <p className="text-[16px] text-[#A1A1AA] font-normal">
                            {" "}
                            {progress[i]}%
                          </p>
                        )}
                      </div>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ background: "#FFE5B2" }}
                      >
                        <div
                          className="h-full"
                          style={{
                            width: `${progress[i]}%`,
                            background: "#FFAC08",
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 justify-center w-full">
            <div className="w-full flex items-center justify-center gap-x-3">
              <div className="h-px bg-[#E4E4E7] flex-1" />
              <div className="flex items-center px-6">
                <div className="flex gap-3 justify-center items-center mr-4">
                  <p className="text-[24px] text-[#18181B] font-semibold">
                    4.8
                  </p>
                  <Star />
                </div>
                <p className="text-[18px] text-[#18181B] font-medium">
                  Trust pilot
                </p>
              </div>
              <div className="h-px bg-[#E4E4E7] flex-1" />
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
        </>
      )}
      <AnimatePresence>
        {step === itemCount && (
          <motion.div
            className="w-full p-6 flex flex-col min-h-0 flex-1"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col justify-between min-h-0 flex-1">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-[24px] font-semibold text-[#18181B]">
                    You’re closer than you think
                  </p>
                  <p className="text-[16px] text-[#18181B]">
                    Your plan is built around your goals. Enter your email to
                    unlock it.
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}
                    required
                    error={emailError}
                  />
                  <div className="flex gap-x-1 text-[#1A1A1A] text-[12px] items-center">
                    <ErrorCircle />
                    <p>No spam. Unsubscribe anytime.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Button
                  variant="primary"
                  onClick={handleFinalNext}
                  id="btn-plan"
                  className="text-[#18181B] w-full flex flex-row items-center justify-center gap-x-2"
                  iconRight={<Arrow />}
                >
                  Get my plan
                </Button>
                <div className="flex flex-col gap-2 text-[12px] text-[#6B6B6B] font-medium justify-center text-center">
                  <p>By continuing you agree with</p>
                  <div className="w-full flex justify-between items-center flex-wrap text-center">
                    <p className="underline text-[12px] text-[#6B6B6B]">
                      Terms & Conditions
                    </p>
                    <p className="underline text-[12px] text-[#6B6B6B]">
                      Privacy Policy
                    </p>
                    <p className="underline text-[12px] text-[#6B6B6B]">
                      Subscription Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const step35: SurveyStep = {
  id: 35,
  customPage: CustomPage35,
  showHeader: false,
};

export default step35;
