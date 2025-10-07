## DYNAMIC PROMPT GENERATOR - BUILD PLAN

GOAL:
We’re building a dynamic prompt generator for the game “Bad People.” The idea is to have reusable building blocks (like people, places, timeframes, etc.) and category-specific templates that can combine into endless, grammatically correct and funny prompts.

---

SYSTEM OVERVIEW

/src
/data
/baseLists
baseModifiers.ts -> generic reusable lists (people, places, etc.)
/categories
authorityRules.ts -> category-specific templates
dailyLifeActivities.ts
embarrassingMoments.ts
/build
buildPrompts.ts -> generates all prompts at build time
/generated
prompts.json -> final compiled output

---

BASE LISTS

We’ll maintain a set of shared, reusable lists. These lists will NEVER produce nonsense results regardless of what template uses them.

Each list is exported like:
export const people = ["best friend", "coworker", "neighbor"]

Base lists include:

- people
- relationships
- groups
- places
- contexts
- timeframes
- frequencyAdverbs

We are NOT including actions or objects in these lists. Those will live inside specific templates.

---

CATEGORY FILES

Each category (like “authorityRules” or “dailyLifeActivities”) has its own file that exports an array of template objects:

Example:
export const authorityRules = [
{
id: "power_trip",
template: "Who is {most/least} likely to {actions} in front of {group}?",
overrides: {
actions: [
"make up a new rule",
"write someone a fake ticket",
"try to start a revolution"
],
group: ["their coworkers", "a group of friends", "a crowd of strangers"]
}
}
]

Templates can use placeholders like:
{person}, {group}, {place}, {time}, {frequency}, {playerLeft}, {playerRight}, etc.

Overrides take priority over base lists.

---

BUILD SCRIPT

We’ll use a Node or Bun script (`buildPrompts.ts`) that runs at build time.

Steps:

1. Import base lists and all category templates.
2. Iterate through each template.
3. Replace placeholders with random selections from lists.
4. Apply overrides if they exist.
5. Flatten all generated variations.
6. Write the result to `/generated/prompts.json`.

The app won’t generate prompts at runtime — they’re pre-built and loaded instantly.

---

DESIGN PRINCIPLES

1. Templates must make sense regardless of what words are substituted.
2. Each category controls its own tone and vocabulary.
3. Base lists provide consistent quality filler words.
4. Grammar helpers can be added later for pluralization, “a/an” correction, etc.
5. Each template gets a unique id like: category_templateName_variantNumber

---

EXAMPLE OUTPUT

Input:
{
id: "public_slipup",
template: "Who is {most/least} likely to {embarrassingAction} in front of {group}?",
overrides: {
embarrassingAction: [
"trip over nothing",
"say something inappropriate",
"spill a drink on someone",
"accidentally like their ex’s photo"
],
group: ["their coworkers", "a group of friends", "their parents"]
}
}

Output:
"Who is most likely to spill a drink on someone in front of their coworkers?"

---

NEXT STEPS

1. Finalize all base lists.
2. Build out 3–5 category files using this structure.
3. Create buildPrompts.ts to compile everything.
4. Add light validation to prevent broken or nonsensical sentences.
5. (Optional) Add support for tone filters or difficulty weighting later.

---

FUTURE IDEAS

- Smart pluralization helper
- Weighted randomness
- Translations / language packs
- “Safe mode” toggle (family-friendly filtering)
- Prompt preview / editor UI for manual tuning
