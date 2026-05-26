"use client";

interface OptionButtonProps {
  label?: string;
  emoji?: React.ReactNode;
  selected?: boolean;
  selectionType?: "single" | "multiple";
  onClick?: () => void;
  animationDelay?: number;
  extra?: string;
}

export default function OptionButton({
  label,
  emoji,
  selected,
  selectionType,
  onClick,
  animationDelay = 0,
  extra,
}: OptionButtonProps) {
  return (
    <button
      className={`option-button ${selected ? "selected bg-[#FFF7E8]! border-[#FFAC08]!" : ""} hover:bg-[#FFF7E8] hover:border-[#FFAC08] transition-colors`}
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <span className="option-emoji">{emoji}</span>
      <span className="option-label">{label}</span>
      {selectionType === "single" ? (
        <></>
      ) : (
        <span className="option-check" />
      )}
      {extra && <span className="option-extra">{extra}</span>}
    </button>
  );
}
