import type { SurveyStep } from "@/src/types/survey";

const step12: SurveyStep = {
  id: 12,
  questionKey: "step11.question",
  type: "single",
  optionLayout: "grid",
  image: "/images/step12-image.png",
  heightImage: 360,
  options: [
    { id: "no", labelKey: "no", emoji: "👎" },
    { id: "yes", labelKey: "yes", emoji: "👍" },
  ],
};

export default step12;
