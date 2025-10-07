import { writeFileSync } from "fs";
import { join } from "path";
import { semanticTypes } from "./semanticTypes";
import { templates } from "./templates";
import { drinkingTemplates } from "./drinkingTemplates";
import { challengeTemplates } from "./challengeTemplates";

const promptsData = {
  semanticTypes,
  templates,
  drinkingModeTemplates: drinkingTemplates,
  challengeModeTemplates: challengeTemplates,
};

const outputPath = join(process.cwd(), "public", "prompts.json");
writeFileSync(outputPath, JSON.stringify(promptsData, null, 2));

// Calculate total possible prompts
let totalPrompts = 0;

templates.forEach((template) => {
  let combinations = 1;
  Object.values(template.slots).forEach((slot) => {
    if (Array.isArray(slot)) {
      combinations *= slot.length;
    } else if (typeof slot === "string") {
      combinations *= semanticTypes[slot as keyof typeof semanticTypes]?.length ?? 1;
    }
  });
  totalPrompts += combinations;
});

console.log("✅ Built prompts.json successfully!");
console.log(`📊 Total possible base prompts: ${totalPrompts.toLocaleString()}`);
console.log(`📝 Templates: ${templates.length}`);
console.log(`🍺 Drinking templates: ${drinkingTemplates.length}`);
console.log(`🎭 Challenge templates: ${challengeTemplates.length}`);
