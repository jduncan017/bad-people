import type { PromptsData } from "~/types/prompts";

/**
 * Calculate total possible prompts from static prompts and template combinations
 */
export function calculateTotalPrompts(data: PromptsData): number {
  let total = 0;

  // Count static prompts from all categories
  Object.values(data.categories).forEach((prompts) => {
    total += prompts.length;
  });

  // Count template variations
  data.templates.forEach((template) => {
    let combinations = 1;
    Object.values(template.slots).forEach((slot) => {
      if (Array.isArray(slot)) {
        combinations *= slot.length;
      } else if (typeof slot === "string") {
        // Handle baseLists references
        if (slot.startsWith("baseLists.")) {
          const listName = slot.replace("baseLists.", "");
          combinations *= data.baseLists[listName]?.length ?? 1;
        } else {
          // Handle legacy semantic type references
          combinations *= data.categories[slot]?.length ?? 0;
        }
      }
    });
    total += combinations;
  });

  return total;
}

/**
 * Get the most frequently used category name
 */
export function getMostFrequentCategory(
  categoryUsage: Record<string, number>,
  categoryDisplayNames: Record<string, string>,
): string {
  if (Object.keys(categoryUsage).length === 0) return "None yet";

  const sorted = Object.entries(categoryUsage).sort((a, b) => b[1] - a[1]);
  const categoryKey = sorted[0]?.[0];

  if (!categoryKey) return "None";

  return categoryDisplayNames[categoryKey] ?? categoryKey;
}
