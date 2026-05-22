"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/src/i18n/context";
import type { Locale } from "@/src/types/survey";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "vi", label: "lang.vi", flag: "🇻🇳" },
  { code: "en", label: "lang.en", flag: "🇬🇧" },
];

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-selector__trigger"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        id="btn-language"
      >
        <span className="lang-selector__flag">{current.flag}</span>
        <span className="lang-selector__label">{t(current.label)}</span>
        <span className={`lang-selector__chevron ${open ? "open" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="lang-selector__dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-selector__option ${lang.code === locale ? "active" : ""}`}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
            >
              <span className="lang-selector__flag">{lang.flag}</span>
              <span>{t(lang.label)}</span>
              {lang.code === locale && (
                <span className="lang-selector__check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
