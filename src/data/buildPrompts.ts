import { writeFileSync } from "fs";
import { join } from "path";
import { baseLists } from "./baseLists";
import { breakingTheRules } from "./categories/breakingTheRules";
import { firstWorldProblems } from "./categories/firstWorldProblems";
import { theTruthComesOut } from "./categories/theTruthComesOut";
import { spicyConfessions } from "./categories/spicyConfessions";
import { theGoodTheBadTheUgly } from "./categories/theGoodTheBadTheUgly";
import { thePeopleWeTolerate } from "./categories/thePeopleWeTolerate";
import { romanceAndRelationships } from "./categories/romanceAndRelationships";
import { dollarsAndSense } from "./categories/dollarsAndSense";
import { drinkingTemplates } from "./drinkingTemplates";
import { challengeTemplates } from "./challengeTemplates";

// Type definition for template structure
type Template = {
  id: string;
  pattern: string;
  overrides?: Record<string, string[] | undefined>;
};

// Helper to extract templates with base list references mapped
const processTemplates = (templates: Template[], categoryName: string) => {
  return templates.map((template) => {
    const slots: Record<string, string | string[]> = {};

    // Parse the template pattern to identify placeholders
    const placeholderRegex = /\{([^}]+)\}/g;
    const matches = template.pattern.matchAll(placeholderRegex);

    for (const match of matches) {
      const placeholder = match[1]!;

      // Handle special placeholders
      if (placeholder === "most/least") {
        slots[placeholder] = ["most", "least"];
      } else if (template.overrides?.[placeholder]) {
        // Check if there's an override for this placeholder
        slots[placeholder] = template.overrides[placeholder]!;
      } else {
        // Map to base list reference
        const baseListKey = placeholder as keyof typeof baseLists;
        if (baseLists[baseListKey]) {
          slots[placeholder] = `baseLists.${placeholder}`;
        }
      }
    }

    return {
      pattern: template.pattern,
      slots,
      category: categoryName,
    };
  });
};

// Combine all category data
const categories: Record<string, string[]> = {
  firstWorldProblems: firstWorldProblems.staticPrompts,
  breakingTheRules: breakingTheRules.staticPrompts,
  theTruthComesOut: theTruthComesOut.staticPrompts,
  spicyConfessions: spicyConfessions.staticPrompts,
  theGoodTheBadTheUgly: theGoodTheBadTheUgly.staticPrompts,
  thePeopleWeTolerate: thePeopleWeTolerate.staticPrompts,
  romanceAndRelationships: romanceAndRelationships.staticPrompts,
  dollarsAndSense: dollarsAndSense.staticPrompts,
};

// Combine all templates (category name is derived automatically)
const allTemplates = [
  ...processTemplates(firstWorldProblems.templates, "firstWorldProblems"),
  ...processTemplates(breakingTheRules.templates, "breakingTheRules"),
  ...processTemplates(theTruthComesOut.templates, "theTruthComesOut"),
  ...processTemplates(spicyConfessions.templates, "spicyConfessions"),
  ...processTemplates(theGoodTheBadTheUgly.templates, "theGoodTheBadTheUgly"),
  ...processTemplates(thePeopleWeTolerate.templates, "thePeopleWeTolerate"),
  ...processTemplates(romanceAndRelationships.templates, "romanceAndRelationships"),
  ...processTemplates(dollarsAndSense.templates, "dollarsAndSense"),
];

// Create category display names and descriptions
const categoryDisplayNames: Record<string, string> = {
  firstWorldProblems: "First World Problems",
  breakingTheRules: "Breaking The Rules",
  theTruthComesOut: "The Truth Comes Out",
  spicyConfessions: "Spicy Confessions",
  theGoodTheBadTheUgly: "The Good, The Bad, & The Ugly",
  thePeopleWeTolerate: "The People We Tolerate",
  romanceAndRelationships: "Romance & Relationships",
  dollarsAndSense: "Dollars & Sense",
};

const categoryDescriptions: Record<string, string> = {
  firstWorldProblems:
    "Mundane, privileged inconveniences of modern living.",
  breakingTheRules:
    "Cheeky defiance of authority, wild dares, and rebellious actions.",
  theTruthComesOut:
    "Secret habits, embarrassing moments, and confessions nobody wants to admit.",
  spicyConfessions:
    "Intimate and risqué topics that push boundaries.",
  theGoodTheBadTheUgly:
    "The best, worst, and most questionable personality traits.",
  thePeopleWeTolerate:
    "Unspoken rules and awkward experiences with friends and frenemies.",
  romanceAndRelationships:
    "Love, dating, hookups, and relationship drama.",
  dollarsAndSense:
    "Money, wealth, status, and how we value ourselves and others.",
};

// Build the output data structure
const promptsData = {
  categories,
  templates: allTemplates,
  drinkingModeTemplates: drinkingTemplates,
  challengeModeTemplates: challengeTemplates,
  baseLists,
  categoryDisplayNames,
  categoryDescriptions,
};

// Write to public/prompts.json
const outputPath = join(process.cwd(), "public", "prompts.json");
writeFileSync(outputPath, JSON.stringify(promptsData, null, 2));

// Calculate statistics
let totalStaticPrompts = 0;
let totalTemplateVariations = 0;

// Count static prompts
totalStaticPrompts = Object.values(categories).reduce(
  (sum, prompts) => sum + prompts.length,
  0,
);

// Calculate template combinations
allTemplates.forEach((template) => {
  let combinations = 1;
  Object.values(template.slots).forEach((slot) => {
    if (Array.isArray(slot)) {
      combinations *= slot.length;
    } else if (typeof slot === "string" && slot.startsWith("baseLists.")) {
      const listName = slot.replace("baseLists.", "") as keyof typeof baseLists;
      combinations *= baseLists[listName]?.length ?? 1;
    }
  });
  totalTemplateVariations += combinations;
});

console.log("✅ Built prompts.json successfully!");
console.log(`\n📊 Statistics:`);
console.log(`  Categories: ${Object.keys(categories).length}`);
console.log(`  Static prompts: ${totalStaticPrompts.toLocaleString()}`);
console.log(`  Template variations: ${totalTemplateVariations.toLocaleString()}`);
console.log(
  `  Total possible prompts: ${(totalStaticPrompts + totalTemplateVariations).toLocaleString()}`,
);
console.log(`\n📝 Templates: ${allTemplates.length}`);
console.log(`🍺 Drinking templates: ${drinkingTemplates.length}`);
console.log(`🎭 Challenge templates: ${challengeTemplates.length}`);
