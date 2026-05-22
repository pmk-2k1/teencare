import type { SurveyStep } from "@/src/types/survey";

const step33: SurveyStep = {
  id: 33,
  questionKey: "step33.question",
  subtitleKey: "step33.subtitle",
  type: "multiple",
  optionLayout: "list",
  options: [
    { id: "practice_scenarios", labelKey: "step33.opt.practice_scenarios", emoji: "🎭" },
    { id: "quick_videos", labelKey: "step33.opt.quick_videos", emoji: "📱" },
    { id: "step_by_step_guides", labelKey: "step33.opt.step_by_step_guides", emoji: "📝" },
    { id: "2_minute_drills", labelKey: "step33.opt.2_minute_drills", emoji: "⚡" },
  ],
};

export default step33;
