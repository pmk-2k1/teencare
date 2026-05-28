import type { SurveyStep } from "@/src/types/survey";

const step11: SurveyStep = {
  id: 11,
  questionKey: "step11.question",
  type: "single",
  optionLayout: "grid",
  image: "/images/step11.png",
  heightImage: 360,
  options: [
    { id: "no", labelKey: "no", emoji: "👎" },
    { id: "yes", labelKey: "yes", emoji: "👍" },
  ],
};

export default step11;
