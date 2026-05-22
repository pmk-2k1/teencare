import type { SurveyStep } from "@/src/types/survey";

const step4: SurveyStep = {
  id: 4,
  questionKey: "step4.question",
  type: "single",
  options: [
    { id: "parent", labelKey: "step4.opt.parent", emoji: "❤️" },
    { id: "soon_to_be_parent", labelKey: "step4.opt.soon_to_be_parent", emoji: "🌱" },
    { id: "stepparent", labelKey: "step4.opt.stepparent", emoji: "🧩" },
    { id: "grandparent", labelKey: "step4.opt.grandparent", emoji: "🌳" },
  ],
};

export default step4;
