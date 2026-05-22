import type { SurveyStep } from "@/src/types/survey";

const step5: SurveyStep = {
  id: 5,
  questionKey: "step5.question",
  type: "single",
  options: [
    { id: "one_child", labelKey: "step5.opt.one_child", emoji: "🌻" },
    { id: "two_children", labelKey: "step5.opt.two_children", emoji: "🌺" },
    { id: "three_children", labelKey: "step5.opt.three_children", emoji: "💐" },
    { id: "more_than_three", labelKey: "step5.opt.more_than_three", emoji: "⚽" },
  ],
};

export default step5;
