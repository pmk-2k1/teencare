import type { SurveyStep } from "@/src/types/survey";

const step21: SurveyStep = {
  id: 21,
  questionKey: "step21.question",
  type: "single",
  options: [
    { id: "honesty", labelKey: "step21.opt.honesty", emoji: "🧊" },
    { id: "responsibility", labelKey: "step21.opt.responsibility", emoji: "⚖️" },
    { id: "gratitude", labelKey: "step21.opt.gratitude", emoji: "🙏" },
    { id: "empathy", labelKey: "step21.opt.empathy", emoji: "💙" },
  ],
};

export default step21;
