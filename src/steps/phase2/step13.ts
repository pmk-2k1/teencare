import type { SurveyStep } from "@/src/types/survey";

const step13: SurveyStep = {
  id: 13,
  questionKey: "step11.question",
  type: "single",
  optionLayout: "grid",
  image: "/images/step13-image.png",
  heightImage: 360,
  options: [
    { id: "no", labelKey: "no", emoji: "👎" },
    { id: "yes", labelKey: "yes", emoji: "👍" },
  ],
};

export default step13;
