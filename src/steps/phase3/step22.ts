import type { SurveyStep } from "@/src/types/survey";

const step22: SurveyStep = {
  id: 22,
  questionKey: "step22.question",
  type: "single",
  options: [
    { id: "do_it_yourself_to_save_time", labelKey: "step22.opt.do_it_yourself_to_save_time", emoji: "⚡" },
    { id: "let_them_figure_it_out", labelKey: "step22.opt.let_them_figure_it_out", emoji: "🌱" },
    { id: "guide_them_through_it", labelKey: "step22.opt.guide_them_through_it", emoji: "🤝" },
  ],
};

export default step22;
