"use client";

import Image from "next/image";
import { useI18n } from "@/src/i18n/context";
import Button from "./Button";

interface CompletionScreenProps {
  onRestart: () => void;
}

export default function CompletionScreen({ onRestart }: CompletionScreenProps) {
  const { t } = useI18n();

  return (
    <div className="completion-screen animate-fade-in-up">
      <div className="completion-icon">🎉</div>
      <h1 className="completion-title">{t("complete.title")}</h1>
      <p className="completion-subtitle">
        {t("complete.subtitle").split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 && <br />}
          </span>
        ))}
      </p>
      <div className="completion-image-wrapper">
        <Image
          src="/images/survey_complete.png"
          alt={t("complete.imageAlt")}
          width={220}
          height={220}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Button variant="outline" onClick={onRestart} id="btn-restart">
        {t("action.restart")}
      </Button>
    </div>
  );
}
