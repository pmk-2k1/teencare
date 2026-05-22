import type { SurveyStep } from "@/src/types/survey";

const step10: SurveyStep = {
  id: 10,
  questionKey: "step10.question",
  type: "single",
  options: [
    { id: "still_figuring_it_out", labelKey: "step10.opt.still_figuring_it_out", emoji: "🐥" },
    { id: "i_mostly_trust_my_instincts", labelKey: "step10.opt.i_mostly_trust_my_instincts", emoji: "🧭" },
    { id: "i_read_and_research_a_lot", labelKey: "step10.opt.i_read_and_research_a_lot", emoji: "🔍" },
    { id: "i_feel_pretty_confident", labelKey: "step10.opt.i_feel_pretty_confident", emoji: "🎓" },
  ],
};

export default step10;
