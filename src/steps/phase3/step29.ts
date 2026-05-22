import type { SurveyStep } from "@/src/types/survey";

const step29: SurveyStep = {
  id: 29,
  questionKey: "step29.question",
  type: "single",
  optionLayout: "grid",
  gridColumns: 3,
  options: [
    { id: "honestly_no", labelKey: "honestly_no", emoji: "🔴" },
    { id: "mostly_yes", labelKey: "mostly_yes", emoji: "🟡" },
    { id: "absolutely", labelKey: "absolutely", emoji: "🟢" },
  ],
};

export default step29;
