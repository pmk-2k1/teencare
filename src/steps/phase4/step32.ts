import type { SurveyStep } from "@/src/types/survey";

const step32: SurveyStep = {
  id: 32,
  questionKey: "step32.question",
  type: "single",
  options: [
    { id: "partnered", labelKey: "step32.opt.realistically", emoji: "🤙", extra: "5 min/day" },
    { id: "solo_parent", labelKey: "step32.opt.on_a_good_day", emoji: "👌", extra: "10 min/day" },
    { id: "shared_custody", labelKey: "step32.opt.when_the_stars_align", emoji: "🤘", extra: "15 min/day" },
    { id: "blended_family", labelKey: "step32.opt.in_another_life", emoji: "💪", extra: "20+ min/day" },
  ],
};

export default step32;
