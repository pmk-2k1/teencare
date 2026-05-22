"use client";

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
      className={`option-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <span className="option-card__indicator">
        {selectionType === "single" ? (
          <></>
        ) : (
          <span className="option-check" />
        )}
      </span>
      <span className="option-card__emoji">{emoji}</span>
      <span className="option-card__label">{label}</span>
    </button>
  );
}
