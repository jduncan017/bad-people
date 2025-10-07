# Prompt Design Guide

A living document for crafting funny, varied prompts for Bad People.

---

## Core Philosophy

1. **Specificity > Variability**
   One hilarious, specific prompt beats 100 generic template variations.

2. **Irony and unexpected outcomes create humor**
   The funniest prompts have ironic consequences or absurd situations.

3. **Sentence structure variety prevents monotony**
   Don't overuse "Who would..." - vary your question structures.

4. **Not everything needs most/least**
   Some questions only work in one direction.

---

## Sentence Structure Library

### "Who would..." patterns
- `Who would {action}?`
- `Who would be the {superlative} {trait}?`

**Examples:**
- "Who would fall in love the fastest?"
- "Who would be the most dramatic?"

---

### "Who has..." patterns
- `Who has {past_action}?`
- `Who has a {trait/condition}?`
- `Who has the {superlative} {noun}?`

**Examples:**
- "Who has the highest body count?"
- "Who has a savior complex?" ✅ (Better than "Who would try to fix people")
- "Who has definitely sent nudes?"

---

### "Who is..." patterns
- `Who is the {superlative} {trait}?`
- `Who is {adjective}?`

**Examples:**
- "Who is the worst liar?"
- "Who is most attracted to the person across from them?"

---

### "Whose..." patterns
- `Whose {thing} would be the {superlative}?`
- `Whose {thing} is definitely {adjective}?`

**Examples:**
- "Whose apartment is definitely the messiest?"
- "Whose hookup stories would be the wildest?"

---

### "Most/Least likely to..." patterns
- `Most likely to {action}`
- `Least likely to {action}`

**⚠️ Important:** Not all prompts work with both directions!

**Examples:**
- ✅ "Most likely to stalk an ex's new partner" (least isn't funny)
- ✅ "Who causes the most drama in their relationships" (least isn't funny)

---

### "Best/Worst at..." patterns
- `Best/Worst at {activity}`
- `Biggest/Smallest {trait}`

**Examples:**
- "Who would be the best at karaoke?"
- "Who would be the worst dancer?"
- "Who would be the biggest people pleaser?"

---

### "Who never/always..." patterns
Better than "Who would not..."

- `Who never {action}?`
- `Who always {action}?`

**Examples:**
- ✅ "Who never uses their turn signal" (natural)
- ❌ "Who would not use their turn signal" (awkward)

---

### Hypothetical scenario patterns
- `If we were all {role}, who would {action}?`
- `If we all had {thing}, who would be the first to {action}?`
- `If there was a {situation}, who would {action}?`

**Examples:**
- "If we were all stranded on an island, who would die first?"
- "If we all had superpowers, who would be the first to abuse them?"

---

### Situational context patterns
- `In {situation}, who would {action}?`
- `During {event}, who would {action}?`
- `At {location}, who would {action}?`

**Examples:**
- "In a zombie apocalypse, who would betray the group first?"
- "At a house party, who would pee in the hot tub?"

---

### Future/prediction patterns
- `Who will be the first to {action}?`
- `Who will definitely {action}?`

**Examples:**
- "Who will be the first to get arrested?"
- "Who will definitely have a midlife crisis?"

---

### Action + ironic outcome patterns
These are GOLD when the outcome is unexpected or ironic.

- `Most likely to {action} and {ironic_consequence}`
- `Who would get excited about {thing} and then {unexpected_reaction}`

**Examples:**
- ✅ "Complain to the manager that their food was bad and end up paying more" (ironic!)
- ✅ "Who would get excited at the idea of a threesome and then hate it" (unexpected!)
- ❌ "argue with a self-checkout machine and lose" (losing isn't inherently funny)

---

### Comparative structures
- `Who needs {thing} the most?`
- `Who talks about {topic} too much?`
- `Who takes {thing} way too seriously?`

**Examples:**
- "Who needs therapy the most?"
- "Who takes fantasy football way too seriously?"

---

## What Makes Prompts Funny

### ✅ Ironic outcomes
The consequence contradicts the action in a funny way.

**Example:** "Complain to manager about food and end up paying more"

---

### ✅ Unexpected consequences
The result surprises you.

**Example:** "Get excited about threesome and then hate it"

---

### ✅ Specific contexts
Specific situations are funnier than generic ones.

**Examples:**
- ✅ "Most likely to pee in the hot tub at a house party" (specific)
- ❌ "Who has peed in the ocean" (generic, not funny)

---

### ✅ Situational absurdity
The situation itself creates the humor.

**Example:** "In a zombie apocalypse, who would eat {playerRefs} first?"

---

### ✅ Punchy phrasing
Shorter and more specific is better.

**Examples:**
- ✅ "Who has a savior complex?" (punchy, specific)
- ❌ "Who would try to fix people?" (wordy, vague)

---

## What Doesn't Work

### ❌ Overusing "Who would..."
Becomes monotonous. Vary your sentence structures!

---

### ❌ Generic setups with unrelated actions
Setup must connect to the action thematically.

**Bad example:**
```typescript
{
  setup: ["Technology is not your friend", "Some battles aren't worth fighting"],
  action: ["argue with a self-checkout", "yell at GPS", "fight with vending machine"]
}
```

The setups don't add anything. Just ask the question directly.

---

### ❌ "and lose/fail" unless the failure is inherently funny
Losing isn't automatically funny.

**Examples:**
- ❌ "argue with self-checkout and lose" (losing isn't the funny part)
- ✅ "Complain to manager and end up paying more" (ironic loss is funny)

---

### ❌ Both most/least when only one is funny
Some prompts only work in one direction.

**Examples:**
- ✅ "Who causes the most drama" (works)
- ❌ "Who causes the least drama" (not funny)

---

### ❌ Awkward grammar
Use natural language.

**Examples:**
- ✅ "Who never uses their turn signal"
- ❌ "Who would not use their turn signal"

---

### ❌ Too many variables creating mediocre combinations
More variables ≠ better prompts.

**Rule:** If template generates 500 variations and only 10 are funny, make them static prompts instead.

---

## When to Use What

### Static Prompts
**Use when:** Prompt is already funny and specific.

**Examples:**
- "Who has a savior complex?"
- "Most likely to stalk an ex's new partner"
- "Who never uses their turn signal"

**Don't template these!** They're perfect as-is.

---

### Semi-Static (1 variable, 3-5 variations)
**Use when:** Swapping ONE element multiplies humor.

**Example:**
```typescript
{
  pattern: "Who would get excited about {thing} and then hate it?",
  overrides: {
    thing: ["a threesome", "living abroad", "having a pet", "going vegan"]
  }
}
```

**Rule:** Every variation should be independently funny.

---

### Templates (2+ variables)
**Use when:** Multiple combinations multiply humor thematically.

**Example (GOOD):**
```typescript
{
  pattern: "{apocalypse}, who is {most/least} likely to {action}?",
  overrides: {
    apocalypse: ["In a zombie apocalypse", "In case of nuclear war"],
    action: ["betray the group", "die within 24 hours", "eat {playerRefs} first"]
  }
}
```

All actions are thematically connected to apocalypse survival.

**Rule:** Use sparingly. Most prompts work better as static or semi-static.

---

## Variable Guidelines

1. **Maximum 1-2 variables per prompt**
   More variables = more mediocre combinations.

2. **3-5 variations max (not 20+)**
   Quality over quantity.

3. **Every variation should be independently funny**
   If it's not funny on its own, remove it.

4. **If you can't think of 3 genuinely funny variations, make it static**
   Don't force template patterns.

---

## Example Prompt Analysis

### ✅ Good Prompts

**"Who has a savior complex?"**
- Punchy, specific trait
- Natural phrasing
- Doesn't need "most/least"

**"Who causes the most drama in their relationships"**
- "Most" works, "least" doesn't
- Structure variation

**"Most likely to stalk an ex's new partner"**
- Sentence structure variety
- Only works in one direction

**"Most likely to pee in the hot tub at a house party"**
- Specific context makes it funnier
- Better than generic "pee in ocean"

**"Who never uses their turn signal"**
- Natural grammar
- Present tense feels authentic

**"Complain to manager about food and end up paying more"**
- Ironic outcome creates humor
- Consequence is unexpected

---

### ❌ Bad Prompts (with fixes)

**❌ "Who would try to fix people"**
✅ "Who has a savior complex"
(More punchy and specific)

**❌ "Who has peed in the ocean"**
✅ "Most likely to pee in hot tub at house party"
(Specific context is funnier)

**❌ "argue with self-checkout and lose"**
✅ "Complain to manager about food and end up paying more"
(Ironic outcome is funnier than just losing)

**❌ "Who would not use turn signal"**
✅ "Who never uses their turn signal"
(Natural grammar)

---

## Improvement Process

1. **Review existing prompts for monotonous structure**
   Are we overusing "Who would..."?

2. **Identify opportunities to vary sentence patterns**
   Could "Who would be..." become "Who has..." or "Most likely to..."?

3. **Test if prompt is funnier with different structure**
   Try rewriting in 2-3 different structures.

4. **Add new patterns we discover to this guide**
   Keep updating this as we learn what works.

---

## Notes

- This is a **living document** - update it as we discover what works
- When in doubt, make it static and specific rather than templated and generic
- Humor comes from specificity, irony, and unexpected outcomes
- Sentence structure variety keeps the game fresh

---

**Last Updated:** 2025-10-07
