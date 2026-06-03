import en from "@/src/i18n/locales/en";
import vi from "@/src/i18n/locales/vi";
import { surveySteps } from "@/src/steps";
import type { Locale, SurveyStep } from "@/src/types/survey";
import { ANSWERS_STORAGE_KEY } from "@/src/lib/survey/storageKeys";

const LOCALE_STORAGE_KEY = "teencare_locale";

const translations: Record<Locale, Record<string, string>> = { en, vi };

export type StoredAnswers = Record<string, string[]>;

function translate(locale: Locale, labelKey: string): string {
  return translations[locale][labelKey] ?? labelKey;
}

export function getLocaleFromStorage(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "vi") return stored;
  } catch {
    // ignore
  }
  return "vi";
}

export function parseStoredAnswers(raw: string | null): StoredAnswers {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as StoredAnswers;
  } catch {
    return {};
  }
}

export function loadStoredAnswers(): StoredAnswers {
  try {
    return parseStoredAnswers(localStorage.getItem(ANSWERS_STORAGE_KEY));
  } catch {
    return {};
  }
}

function resolveParentRoleLabel(raw: string): string {
  const v = raw.trim().toLowerCase();
  if (v === "dad") return en.dad;
  if (v === "mom") return en.mom;
  return raw.trim();
}

/** Dad / Mom from step 1 — always English labels for the sheet */
export function getParentRole(stored: StoredAnswers): string {
  const values = stored["0"];
  if (!Array.isArray(values) || values.length === 0) return "";
  return resolveParentRoleLabel(values[0]);
}

function resolveAnswerValue(
  step: SurveyStep,
  optionId: string,
  locale: Locale,
): string {
  if (!step.options?.length) {
    return optionId;
  }

  const option = step.options.find((o) => o.id === optionId);
  if (option) {
    return translate(locale, option.labelKey);
  }

  if (optionId === "dad" || optionId === "mom") {
    return resolveParentRoleLabel(optionId);
  }

  return optionId;
}

/** Map stored option ids → display labels for Google Sheets */
export function buildStepAnswersForSheet(
  stored: StoredAnswers,
  locale: Locale = getLocaleFromStorage(),
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  surveySteps.forEach((step, stepIndex) => {
    const key = String(stepIndex);
    const rawValues = stored[key];
    const values = Array.isArray(rawValues) ? rawValues : [];

    result[`step${step.id}`] = values.map((v) =>
      resolveAnswerValue(step, v, locale),
    );
  });

  return result;
}

/** Merge survey answers (labels) + parent_role into an API payload */
export function applySheetAnswersToPayload<T extends Record<string, unknown>>(
  payload: T,
  stored: StoredAnswers = loadStoredAnswers(),
  locale: Locale = getLocaleFromStorage(),
): T & { step_answers: Record<string, string[]>; parent_role: string } {
  return {
    ...payload,
    step_answers: buildStepAnswersForSheet(stored, locale),
    parent_role: getParentRole(stored),
  };
}
