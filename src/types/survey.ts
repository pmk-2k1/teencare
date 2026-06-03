export interface SurveyOption {
  id: string;
  labelKey: string;
  emoji?: string;
  extra?: string;
}

import type { SurveyCustomPageProps } from "@/src/lib/survey/customPageTypes";

export interface SurveyStep {
  id: number;
  questionKey?: string;
  subtitleKey?: string;
  image?: string;
  type?: "single" | "multiple";
  optionLayout?: "list" | "grid";
  options?: SurveyOption[];
  showHeader?: boolean;
  customPage?: React.ComponentType<SurveyCustomPageProps>;
  wrapperClass?: string;
  gridColumns?: number;
  heightImage?: number;
}

export type Locale = "vi" | "en";

export type Direction = "forward" | "backward";

export interface SurveyAnswers {
  [stepIndex: number]: string[];
}
