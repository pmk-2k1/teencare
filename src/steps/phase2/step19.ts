import type { SurveyStep } from "@/src/types/survey";

const step19: SurveyStep = {
  id: 19,
  questionKey: "step19.question",
  type: "single",
  optionLayout: "grid",
  gridColumns: 3,
  options: [
    { id: "honestly_no", labelKey: "honestly_no", emoji: "🔴" },
    { id: "mostly_yes", labelKey: "mostly_yes", emoji: "🟡" },
    { id: "absolutely", labelKey: "absolutely", emoji: "🟢" },
  ],
};

export default step19;
