"use client";

import { useI18n } from "@/src/i18n/context";
import Arrow from "../app/assets/svg/Arrow";

interface SurveyHeaderProps {
  step: number;
  total: number;
  onBack: () => void;
  canGoBack: boolean;
}

export default function SurveyHeader({
  step,
  total,
  onBack,
  canGoBack,
}: SurveyHeaderProps) {
  const { t } = useI18n();

  return (
    <header className="survey-header">
      <button
        className="back-button"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label={t("nav.back")}
        id="btn-back"
      >
        <Arrow className="rotate-180 shrink-0 w-4 h-4" />
      </button>
      {/* <span className="step-indicator">
        {step} / {total}
      </span> */}
      <p className="text-[#FFAC08] text-[14px]">Your family</p>
    </header>
  );
}
