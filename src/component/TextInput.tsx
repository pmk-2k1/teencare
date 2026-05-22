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
        className={`w-full h-12 px-3! rounded-md text-sm border ${
          error ? "border-red-500" : "border-gray-200"
        } focus:outline-none focus:border-primary`}
      />
      {error ? (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      ) : null}
    </div>
  );
}
