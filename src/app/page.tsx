"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { surveySteps } from "@/src/steps";
import { useI18n } from "@/src/i18n/context";
import type { Direction, SurveyAnswers, SurveyOption } from "@/src/types/survey";
import SurveyHeader from "@/src/component/SurveyHeader";
import ProgressBar from "@/src/component/ProgressBar";
// import CompletionScreen from "@/src/component/CompletionScreen";
// import ConfettiEffect from "@/src/component/ConfettiEffect";
import OptionButton from "@/src/component/OptionButton";
import OptionCard from "@/src/component/OptionCard";
import Button from "@/src/component/Button";
// import LanguageSelector from "../component/LanguageSelector";

const ANSWERS_STORAGE_KEY = "teencare_survey_answers";

export default function SurveyPage() {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isAnimatingRef = useRef(false);
  const singleSelectTimeoutRef = useRef<number | null>(null);

  const totalSteps = surveySteps.length;
  const currentQuestion = surveySteps[currentStep];
  const progressPercent = isCompleted ? 100 : (currentStep / totalSteps) * 100;

  // `mounted` is initialized based on `window` presence to avoid synchronous setState in effects
  // Load answers from localStorage on mount (client-only)
  useEffect(() => {
    let timer: number | undefined;
    try {
      const stored = localStorage.getItem(ANSWERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SurveyAnswers;
        // Defer state updates to avoid synchronous setState inside effect
        timer = window.setTimeout(() => {
          setAnswers(parsed);

          // Optionally jump to the last unanswered step
          let maxStep = 0;
          for (const key of Object.keys(parsed)) {
            const stepIdx = parseInt(key, 10);
            if (parsed[stepIdx] && parsed[stepIdx].length > 0) {
              maxStep = Math.max(maxStep, stepIdx + 1);
            }
          }
          if (maxStep < totalSteps) {
            setCurrentStep(maxStep);
          } else if (maxStep >= totalSteps) {
            setIsCompleted(true);
          }
        }, 0);
      }
    } catch {
      // Ignore errors parsing local storage
    } finally {

      if (!timer) {
        timer = window.setTimeout(() => setMounted(true), 0);
      } else {
        // if timer already set, schedule mounted after it
        const prev = timer;
        timer = window.setTimeout(() => setMounted(true), 0);
        window.clearTimeout(prev);
      }
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [totalSteps]);

  // Save answers to localStorage on change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
      } catch {
        // Ignore errors saving local storage
      }
    }
  }, [answers, mounted]);

  useEffect(() => {
    const imagesToPreload = [
      "/images/step1Dad.png",
      "/images/step1Mom.png",
      "/images/step2.png",
      "/images/step3_1.webp",
      "/images/step7_1.webp",
      "/images/step11.png",
      "/images/step12-image.png",
      "/images/step13-image.png",
      "/images/step17_1.webp",
      "/images/step20_1.webp",
      "/images/step23_1.webp",
      "/images/step26_1.webp",
      "/images/step31_1.webp",
      "/images/step34_1.webp",
      "/images/partner.png",
      "/images/wreath-left.png",
      "/images/wreath-right.png",
      "/images/google-pay.png",
      "/images/paypal-pay.png",
      "/images/card-pay.png",
      "/images/pays.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimatingRef.current || isAnimating) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setDirection("forward");

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 200);
  }, [currentStep, totalSteps, isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimatingRef.current || isAnimating || currentStep === 0) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setDirection("backward");

    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 200);
  }, [currentStep, isAnimating]);

  const goToStep = useCallback((stepIndex: number) => {
    if (isAnimatingRef.current || isAnimating) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setDirection("forward");

    setTimeout(() => {
      setCurrentStep(stepIndex);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const handleSingleSelect = useCallback(
    (optionId: string) => {
      if (isAnimatingRef.current || isAnimating) return;
      setAnswers((prev) => ({ ...prev, [currentStep]: [optionId] }));

      if (singleSelectTimeoutRef.current !== null) {
        window.clearTimeout(singleSelectTimeoutRef.current);
      }

      // Auto advance after a brief delay for visual feedback
      singleSelectTimeoutRef.current = window.setTimeout(() => {
        goToNext();
      }, 300);
    },
    [currentStep, goToNext]
  );

  const handleMultipleSelect = useCallback(
    (optionId: string) => {
      setAnswers((prev) => {
        const current = prev[currentStep] || [];
        if (current.includes(optionId)) {
          return {
            ...prev,
            [currentStep]: current.filter((id) => id !== optionId),
          };
        }
        return { ...prev, [currentStep]: [...current, optionId] };
      });
    },
    [currentStep]
  );

  const handleSaveAnswer = useCallback(
    (values: string[]) => {
      setAnswers((prev) => ({ ...prev, [currentStep]: values }));
    },
    [currentStep],
  );

  const selectedOptions = answers[currentStep] || [];
  const canConfirm =
    currentQuestion?.type === "multiple" && selectedOptions.length > 0;

  // Determine animation class
  const getAnimationClass = () => {
    if (isAnimating) {
      return direction === "forward" ? "exiting-forward" : "exiting-forward";
    }
    return direction === "forward"
      ? "entering-forward visible"
      : "entering-backward visible";
  };

  if (!mounted) return null; // Avoid hydration mismatch
  if (!currentQuestion) return null;

  // options container classes and style (support configurable grid columns)
  const optionsClass =
    currentQuestion.optionLayout === "grid" ? "options-grid" : "options-container";
  const optionsStyle =
    currentQuestion.optionLayout === "grid"
      ? { gridTemplateColumns: `repeat(${currentQuestion.gridColumns ?? 2}, 1fr)` }
      : undefined;

  return (
    <div className="survey-container">
      {/* <LanguageSelector /> */}
      {currentQuestion.showHeader !== false && (
        <>
          <SurveyHeader
            step={currentStep + 1}
            total={totalSteps}
            onBack={goToPrev}
            canGoBack={currentStep > 0}
          />
          <ProgressBar percent={progressPercent} />
        </>
      )}

      <div
        key={currentStep}
        className={`question-screen ${getAnimationClass()} ${currentQuestion.wrapperClass ?? ""}`}
      >
        {
          currentQuestion.customPage ? (() => {
            const CustomComponent = currentQuestion.customPage;
            return (
              <CustomComponent
                onNext={goToNext}
                onSkipTo={goToStep}
                onSaveAnswer={handleSaveAnswer}
              />
            );
          })() : <>
            <h1 className="question-text">{t(currentQuestion.questionKey ?? "")}</h1>
            <p className="question-subtitle">{currentQuestion.subtitleKey ? t(currentQuestion.subtitleKey) : ""}</p>

            {currentQuestion.image && <div className={`question-image-wrapper h-[${currentQuestion.heightImage ?? 360}px]!`}>
              <Image
                src={currentQuestion.image}
                alt={t(currentQuestion.questionKey ?? "")}
                width={280}
                height={currentQuestion.heightImage ?? 360}
                className="object-cover"
                style={{ width: "auto", height: "100%" }}
                unoptimized
                priority
              />
            </div>}

            <div className={optionsClass} style={optionsStyle}>
              {currentQuestion.options?.map((option: SurveyOption, index: number) => {
                const isSelected = selectedOptions.includes(option.id);
                const commonProps = {
                  label: t(option.labelKey),
                  emoji: option.emoji,
                  selected: isSelected,
                  selectionType: currentQuestion.type,
                  onClick: () =>
                    currentQuestion.type === "single"
                      ? handleSingleSelect(option.id)
                      : handleMultipleSelect(option.id),
                  animationDelay: index * 0.07,
                  extra: option.extra,
                };

                return currentQuestion.optionLayout === "grid" ? (
                  <OptionCard key={option.id} {...commonProps} />
                ) : (
                  <OptionButton key={option.id} {...commonProps} />
                );
              })}
            </div>
            {currentQuestion.type === "multiple" && (
              <div style={{ marginTop: "40px" }}>
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!canConfirm}
                  onClick={goToNext}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${((currentQuestion.options?.length ?? 0) * 0.07 + 0.1)}s forwards`,
                  }}
                >
                  {t("continue")}
                </Button>
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}
