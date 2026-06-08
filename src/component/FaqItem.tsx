"use client";

import { useState } from "react";
import ArrowDown from "@/src/app/assets/svg/ArrowDown";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col bg-[#FFE5B2] py-3! px-4! rounded-sm cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center text-[16px] text-[#18181B] font-medium">
        <span>{question}</span>
        <div
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)" }}
        >
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="h-[1px] w-full bg-[#FFCF71] my-4!" />
          <p
            className="text-[#18181B] text-[14px] font-medium leading-[24px] tracking-[-0.28px]"
            style={{
              fontFeatureSettings: "'cv01' on, 'cv02' on, 'cv03' on, 'cv04' on, 'cv10' on",
              fontFamily: "var(--Family-Body, Inter, sans-serif)",
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
