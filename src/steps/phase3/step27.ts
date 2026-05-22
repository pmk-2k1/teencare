import type { SurveyStep } from "@/src/types/survey";

const step27: SurveyStep = {
  id: 27,
  questionKey: "step27.question",
  type: "single",
  options: [
    { id: "partnered", labelKey: "step27.opt.partnered_co_parenting", emoji: "👫" },
    { id: "solo_parent", labelKey: "step27.opt.solo_parent", emoji: "🦸‍♀️" },
    { id: "shared_custody", labelKey: "step27.opt.shared_custody", emoji: "🔄" },
    { id: "blended_family", labelKey: "step27.opt.blended_family", emoji: "👨‍👩‍👧‍👦" },
  ],
};

export default step27;
