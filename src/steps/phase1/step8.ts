import type { SurveyStep } from "@/src/types/survey";

const step8: SurveyStep = {
  id: 8,
  questionKey: "step8.question",
  subtitleKey: "step8.subtitle",
  type: "multiple",
  optionLayout: "grid",
  gridColumns: 3,
  options: [
    { id: "behavior_patterns", labelKey: "step8.opt.behavior_patterns"},
    { id: "build_closer_relationships", labelKey: "step8.opt.build_closer_relationships"},
    { id: "discipline", labelKey: "step8.opt.discipline"},
    { id: "less_tension", labelKey: "step8.opt.less_tension"},
    { id: "handle_big_emotions", labelKey: "step8.opt.handle_big_emotions"},
    { id: "more_quality_time", labelKey: "step8.opt.more_quality_time"},
    { id: "empathy", labelKey: "step8.opt.empathy"},
    { id: "Puberty", labelKey: "step8.opt.puberty"},
    { id: "the_sex_talk", labelKey: "step8.opt.the_sex_talk"},
  ],
};

export default step8;
