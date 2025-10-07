// Import category objects (each contains actions, pastActions, gerunds, scenarios, etc.)
import { embarrassingTaboo } from "./categories/embarrassingTabooActions";
import { spicy } from "./categories/spicy";

// TODO: Import remaining categories as you rebuild them
// import { lifeEvents } from "./categories/lifeEvents";
// import { personality } from "./categories/personalityTraits";
// etc...

// Flatten category objects into individual arrays for template usage
export const semanticTypes = {
  // Embarrassing/Taboo
  "Embarrassing: Actions": embarrassingTaboo.actions,
  "Embarrassing: Past Actions": embarrassingTaboo.pastActions,
  "Embarrassing: Gerunds": embarrassingTaboo.gerunds,
  "Embarrassing: Scenarios": embarrassingTaboo.scenarios,

  // Spicy
  "Spicy: Actions": spicy.actions,
  "Spicy: Past Actions": spicy.pastActions,
  "Spicy: Gerunds": spicy.gerunds,
  "Spicy: Scenarios": spicy.scenarios,
  "Spicy: Locations": spicy.locations,
  "Spicy: Partners": spicy.partners,

  // TODO: Add remaining categories here as you rebuild them
  // Example pattern:
  // "Life Events: Actions": lifeEvents.actions,
  // "Life Events: Past Actions": lifeEvents.pastActions,
  // etc...
};

// Export category names for the dropdown (only show main categories, not subcategories)
export const categoryNames = [
  "Embarrassing/Taboo",
  "Spicy 🌶️",
  // TODO: Add remaining as you rebuild
  // "Life Events",
  // "Personality Traits",
  // etc...
];
