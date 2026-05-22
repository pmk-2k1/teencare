import type { SurveyStep } from "@/src/types/survey";

const step16: SurveyStep = {
  id: 16,
  questionKey: "step16.question",
  type: "single",
  optionLayout: "grid",
  gridColumns: 3,
  options: [
    { id: "honestly_no", labelKey: "honestly_no", emoji: "🔴" },
    { id: "mostly_yes", labelKey: "mostly_yes", emoji: "🟡" },
    { id: "absolutely", labelKey: "absolutely", emoji: "🟢" },
  ],
};

export default step16;
