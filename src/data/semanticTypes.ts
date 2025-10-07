// Import category objects (each contains actions, pastActions, gerunds, scenarios, etc.)
import { embarrassingTaboo } from "./categories/embarrassingTaboo";
import { spicy } from "./categories/spicy";
import { lifeEvents } from "./categories/lifeEvents";
import { personalityTraits } from "./categories/personalityTraits";
import { socialSituations } from "./categories/socialSituations";
import { skillsActivities } from "./categories/skillsActivities";
import { relationshipDynamics } from "./categories/relationshipDynamics";
import { extremeScenarios } from "./categories/extremeScenarios";
import { dailyLifeActivities } from "./categories/dailyLifeActivities";
import { riskyDaringBehavior } from "./categories/riskyDaringBehavior";
import { viceIndulgence } from "./categories/viceIndulgence";
import { mischiefChaos } from "./categories/mischiefChaos";
import { moneyMaterialism } from "./categories/moneyMaterialism";
import { vanityAppearance } from "./categories/vanityAppearance";
import { authorityRules } from "./categories/authorityRules";

export const semanticTypes = {
  embarrassingTaboo,
  spicy,
  lifeEvents,
  personalityTraits,
  socialSituations,
  skillsActivities,
  relationshipDynamics,
  extremeScenarios,
  dailyLifeActivities,
  riskyDaringBehavior,
  viceIndulgence,
  mischiefChaos,
  moneyMaterialism,
  vanityAppearance,
  authorityRules,
};

// Export category names for the dropdown (only show main categories, not subcategories)
export const categoryNames = [
  "Embarrassing/Taboo",
  "Spicy 🌶️",
  "Life Events",
  "Personality Traits",
  "Social Situations",
  "Skills/Activities",
  "Relationship Dynamics",
  "Extreme Scenarios",
  "Daily Life Activities",
  "Risky/Daring Behavior",
  "Vice/Indulgence",
  "Mischief/Chaos",
  "Money/Materialism",
  "Vanity/Appearance",
  "Authority/Rules",
];
