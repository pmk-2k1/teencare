import type { SurveyStep } from "@/src/types/survey";

const step6: SurveyStep = {
  id: 6,
  questionKey: "step6.question",
  subtitleKey: "step6.subtitle",
  type: "multiple",
  optionLayout: "list",
  options: [
    { id: "0_to_3", labelKey: "step6.opt.0_to_3", emoji: "🌞" },
    { id: "3_to_6", labelKey: "step6.opt.3_to_6", emoji: "🧸" },
    { id: "6_to_12", labelKey: "step6.opt.6_to_12", emoji: "🎒" },
    { id: "12_to_18", labelKey: "step6.opt.12_to_18", emoji: "🛹" },
    { id: "over_19", labelKey: "step6.opt.over_19", emoji: "🎓" },
  ],
};

export default step6;
