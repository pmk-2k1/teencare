"use client";

import Accept from "../app/assets/svg/Accept";
import NotAcceptedIcon from "../app/assets/svg/NotAccepted";

interface OptionCardProps {
  label?: string;
  emoji?: string;
  selected?: boolean;
  selectionType?: "single" | "multiple";
  onClick?: () => void;
  animationDelay?: number;
}

export default function OptionCard({
  label,
  emoji,
  selected,
  selectionType,
  onClick,
  animationDelay = 0,
}: OptionCardProps) {
  return (
    <button
      className={`option-card flex flex-col items-center ${selectionType === "single" ? "justify-center" : ""} ${selected ? "selected" : ""} ${selectionType === "single" ? "single" : "multiple"}`}
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {selectionType !== "single" && (
        <span className="option-card__indicator">
          {selected ? <Accept /> : <NotAcceptedIcon />}
        </span>
      )}
      {selectionType === "single" && (
        <span className="option-card__emoji">{emoji}</span>
      )}
      <span className="option-card__label">{label}</span>
    </button>
  );
}
