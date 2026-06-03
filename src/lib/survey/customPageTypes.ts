export type SurveyCustomPageProps = {
  onNext: () => void;
  onSkipTo?: (stepIndex: number) => void;
  onSaveAnswer?: (values: string[]) => void;
};
