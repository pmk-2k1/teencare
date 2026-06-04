import type { SurveyStep } from "@/src/types/survey";

const step32: SurveyStep = {
  id: 32,
  questionKey: "step32.question",
  type: "single",
  options: [
    { id: "realistically", labelKey: "step32.opt.realistically", emoji: "🤙", extra: "5 min/day" },
    { id: "on_a_good_day", labelKey: "step32.opt.on_a_good_day", emoji: "👌", extra: "10 min/day" },
    { id: "when_the_stars_align", labelKey: "step32.opt.when_the_stars_align", emoji: "🤘", extra: "15 min/day" },
    { id: "in_another_life", labelKey: "step32.opt.in_another_life", emoji: "💪", extra: "20+ min/day" },
  ],
};

export default step32;
