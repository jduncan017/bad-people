import type { PromptsData, Template, PromptSource, ModeFrequency } from "~/types/prompts";

const FREQUENCY_MULTIPLIERS: Record<ModeFrequency, number> = {
  off: 0,
  low: 1,
  med: 2,
  high: 4,
};

/**
 * Build pool of all available prompt sources (static + templates)
 * based on selected category and mode frequencies
 */
export function buildPromptPool(
  promptsData: PromptsData,
  selectedCategory: string | null,
  drinkingModeFrequency: ModeFrequency,
  challengeModeFrequency: ModeFrequency,
): PromptSource[] {
  const allPromptSources: PromptSource[] = [];

  // Add static prompts from categories
  Object.entries(promptsData.categories).forEach(([category, prompts]) => {
    prompts.forEach((prompt) => {
      if (!selectedCategory || category === selectedCategory) {
        allPromptSources.push({
          type: "static",
          content: prompt,
          category,
          mode: null,
        });
      }
    });
  });

  // Add regular templates
  promptsData.templates.forEach((template) => {
    if (
      !selectedCategory ||
      template.category === selectedCategory ||
      Object.values(template.slots).includes(selectedCategory)
    ) {
      allPromptSources.push({
        type: "template",
        content: template,
        category: template.category ?? "unknown",
        mode: null,
      });
    }
  });

  // Add drinking mode templates based on frequency
  const drinkingMultiplier = FREQUENCY_MULTIPLIERS[drinkingModeFrequency];
  for (let i = 0; i < drinkingMultiplier; i++) {
    promptsData.drinkingModeTemplates.forEach((template) => {
      allPromptSources.push({
        type: "template",
        content: template,
        category: "drinking",
        mode: "drinking",
      });
    });
  }

  // Add challenge mode templates based on frequency
  const challengeMultiplier = FREQUENCY_MULTIPLIERS[challengeModeFrequency];
  for (let i = 0; i < challengeMultiplier; i++) {
    promptsData.challengeModeTemplates.forEach((template) => {
      allPromptSources.push({
        type: "template",
        content: template,
        category: "challenge",
        mode: "challenge",
      });
    });
  }

  return allPromptSources;
}

/**
 * Fill template slots with random values from baseLists or inline arrays
 */
export function fillTemplateSlots(
  template: Template,
  promptsData: PromptsData,
): string {
  let result = template.pattern;

  for (const [slotName, slotValue] of Object.entries(template.slots)) {
    let replacement: string;

    if (Array.isArray(slotValue)) {
      // Inline array - pick random item
      replacement = slotValue[Math.floor(Math.random() * slotValue.length)]!;
    } else if (typeof slotValue === "string") {
      // Reference to base list or category
      if (slotValue.startsWith("baseLists.")) {
        const listName = slotValue.replace("baseLists.", "");
        const list = promptsData.baseLists[listName];
        if (!list) continue;
        replacement = list[Math.floor(Math.random() * list.length)]!;
      } else {
        // Legacy semantic category reference
        const category = promptsData.categories[slotValue];
        if (!category) continue;
        replacement = category[Math.floor(Math.random() * category.length)]!;
      }
    } else {
      continue;
    }

    result = result.replace(`{${slotName}}`, replacement);
  }

  return result;
}

/**
 * Generate a unique prompt from the pool
 * Returns null if all prompts have been exhausted
 */
export function generateUniquePrompt(
  promptPool: PromptSource[],
  promptsData: PromptsData,
  shownPrompts: Set<string>,
  maxAttempts = 1000,
): {
  prompt: string | null;
  category: string | null;
  mode: "drinking" | "challenge" | null;
} {
  if (promptPool.length === 0) {
    return { prompt: null, category: null, mode: null };
  }

  let attempts = 0;
  let foundUnique = false;
  let result = "";
  let usedCategory: string | null = null;
  let usedMode: "drinking" | "challenge" | null = null;

  // Try to generate a unique prompt
  while (attempts < maxAttempts && !foundUnique) {
    // Pick random prompt source
    const sourceIndex = Math.floor(Math.random() * promptPool.length);
    const source = promptPool[sourceIndex];
    if (!source) continue;

    usedMode = source.mode;
    usedCategory = source.category;

    if (source.type === "static") {
      // Static prompt - use as is
      result = source.content as string;
    } else {
      // Template - fill in slots
      const template = source.content as Template;
      result = fillTemplateSlots(template, promptsData);
    }

    // Check if we've seen this prompt before
    if (!shownPrompts.has(result)) {
      foundUnique = true;
      break;
    }

    attempts++;
  }

  if (!foundUnique) {
    return { prompt: null, category: null, mode: null };
  }

  return { prompt: result, category: usedCategory, mode: usedMode };
}
