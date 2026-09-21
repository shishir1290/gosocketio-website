import { DocStep, ApiReferenceCategory } from "./docs/types";
import { GUIDE_STEPS_PART1 } from "./docs/guide-steps-part1";
import { GUIDE_STEPS_PART2 } from "./docs/guide-steps-part2";
import { API_REFERENCE_DATA } from "./docs/api-reference-data";

export type { DocStep, ApiReferenceCategory };

export const STEP_BY_STEP_DOCS: DocStep[] = [
  ...GUIDE_STEPS_PART1,
  ...GUIDE_STEPS_PART2,
];

export { API_REFERENCE_DATA };
