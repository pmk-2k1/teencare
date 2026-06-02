export interface SurveyOption {
  id: string;
  labelKey: string;
  emoji?: string;
  extra?: string;
}

export interface SurveyStep {
  id: number;
  questionKey?: string;
  subtitleKey?: string;
  image?: string;
  type?: "single" | "multiple";
  optionLayout?: "list" | "grid";
  options?: SurveyOption[];
  showHeader?: boolean;
  customPage?: React.ComponentType<{ onNext: () => void; onSkipTo?: (stepIndex: number) => void }>;
  wrapperClass?: string;
  gridColumns?: number;
  heightImage?: number;
}

export type Locale = "vi" | "en";

export type Direction = "forward" | "backward";

export interface SurveyAnswers {
  [stepIndex: number]: string[];
}
