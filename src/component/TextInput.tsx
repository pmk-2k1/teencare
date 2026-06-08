"use client";

import React from "react";

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  id?: string;
  error?: string | null;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  id,
  error,
}: TextInputProps) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        className={`w-full h-12 py-3! pr-3! pl-4! rounded-[12px] text-sm border ${error ? "border-red-500" : "border-[#E4E4E7]"
          } focus:outline-none focus:border-[#FF8F1D]`}
      />
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
