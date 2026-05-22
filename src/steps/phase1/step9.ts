import type { SurveyStep } from "@/src/types/survey";

const step9: SurveyStep = {
  id: 9,
  questionKey: "step9.question",
  type: "single",
  options: [
    { id: "full_time_job", labelKey: "step9.opt.full_time_job", emoji: "💼" },
    { id: "part_time_job", labelKey: "step9.opt.part_time_job", emoji: "⏰" },
    { id: "full_time_parent", labelKey: "step9.opt.full_time_parent", emoji: "🏡" },
    { id: "it_varies", labelKey: "step9.opt.it_varies", emoji: "📄" },
  ],
};

export default step9;
