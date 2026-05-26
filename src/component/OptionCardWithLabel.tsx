"use client";

import React from "react";

interface Props {
  topLabel?: string;
  title?: string;
  discount?: string;
  price?: string;
  per_day?: number;
  explain?: number;
  selected?: boolean;
  selectionType?: "single" | "multiple";
  onClick?: () => void;
  className?: string;
  image?: React.ReactNode;
  check_price?: boolean;
}

export default function OptionCardWithLabel({
  topLabel,
  title,
  per_day,
  explain,
  selected,
  selectionType = "multiple",
  onClick,
  className = "",
  discount,
  price,
  image,
  check_price = true,
}: Props) {
  const btnStyle: React.CSSProperties = {
    paddingLeft: 60,
  };

  return (
    <div className={`relative w-full ${className}`}>
      {topLabel && (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded text-[14px] font-medium text-[#18181B] px-3! ${
            selected ? "bg-[#FFAC08]" : "bg-white"
          }`}
        >
          {topLabel}
        </div>
      )}

      <button
        type="button"
        className={`option-button ${selected ? "selected bg-[#FFF7E8]! border-[#FFAC08]!" : ""} hover:bg-[#FFF7E8] hover:border-[#FFAC08] transition-colors w-full text-left`}
        onClick={onClick}
        style={btnStyle}
      >
        <div className="flex gap-x-3 justify-between w-full">
          <span
            className="option-radio"
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          <div className="flex flex-col justify-center gap-y-2">
            <span className="text-[#18181B] text-[16px] font-semibold">
              {title}
            </span>
            <div className="flex gap-1 text-[16px] font-semibold">
              {discount && <span className="text-[#18181B]">{discount}</span>}
              {price && (
                <span className="text-[#A1A1AA] line-through">{price}</span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-1 items-center">
            {check_price && (
              <span className="text-[#18181B] font-semibold text-[16px]">
                $
              </span>
            )}
            <span className="text-[#18181B] font-medium text-[56px]">
              {explain}
            </span>
            <div className="flex flex-col text-[12px] text-[#18181B] font-semibold justify-center items-center">
              <span>{per_day}</span>
              {check_price && <span>per day</span>}
            </div>
            {image && (
              <div className="flex flex-col text-[12px] text-[#18181B] font-semibold justify-center items-center">
                <span>{image}</span>
              </div>
            )}
          </div>

          {selectionType === "single" ? null : (
            <span className="option-check" />
          )}
        </div>
      </button>
    </div>
  );
}
