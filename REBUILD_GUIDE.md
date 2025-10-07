# Category Rebuild Guide

## ✅ Current Status

**Completed:**
- ✅ Spicy 🌶️ (fully rebuilt with tense-organized arrays)
- ✅ Embarrassing/Taboo (partially rebuilt - needs more items)
- ✅ Infrastructure (semanticTypes.ts, templates.ts, buildPrompts.ts)
- ✅ System is functional with **4,398 prompts** from just 2 categories!

**Remaining Categories to Rebuild:**
1. Life Events
2. Personality Traits
3. Social Situations
4. Skills/Activities
5. Relationship Dynamics
6. Extreme Scenarios
7. Daily Life Activities
8. Risky/Daring Behavior
9. Vice/Indulgence
10. Mischief/Chaos
11. Money/Materialism
12. Vanity/Appearance
13. Authority/Rules

---

## 📋 Template for Each Category File

Use this structure for EVERY category file:

```typescript
// Category Name - Organized by grammatical tense

export const categoryName = {
  // Base verb form - for "would {action}", "can {action}"
  actions: [
    "do something",
    "try something",
    // ... 20-30 items
  ],

  // Past tense - for "has {past-action}", "have {past-action}"
  pastActions: [
    "did something",
    "tried something",
    // ... same count as actions
  ],

  // Gerunds (-ing form) - for "enjoys {gerund}", "caught {gerund}"
  gerunds: [
    "doing something",
    "trying something",
    // ... same count as actions
  ],

  // Scenarios/Events (noun phrases) - for "most likely to {scenario}"
  scenarios: [
    "get caught doing something",
    "accidentally do something",
    // ... 20-30 items
  ],

  // Optional: Add category-specific arrays like:
  // locations: [...],  // for "where" contexts
  // partners: [...],   // for "with whom" contexts
  // etc.
};
```

---

## 🔧 Steps to Rebuild a Category

### 1. Edit the category file

File location: `/src/data/categories/{categoryFileName}.ts`

**Example:** For "Life Events", edit `/src/data/categories/lifeEvents.ts`

```typescript
export const lifeEvents = {
  actions: [
    "get arrested",
    "win the lottery",
    "go viral",
    // ... more
  ],

  pastActions: [
    "gotten arrested",
    "won the lottery",
    "gone viral",
    // ... more
  ],

  gerunds: [
    "getting arrested",
    "winning the lottery",
    "going viral",
    // ... more
  ],

  scenarios: [
    "accidentally become internet famous",
    "lock themselves out naked",
    // ... more
  ],
};
```

### 2. Import in semanticTypes.ts

Add import at top:
```typescript
import { lifeEvents } from "./categories/lifeEvents";
```

Add to `semanticTypes` object:
```typescript
"Life Events: Actions": lifeEvents.actions,
"Life Events: Past Actions": lifeEvents.pastActions,
"Life Events: Gerunds": lifeEvents.gerunds,
"Life Events: Scenarios": lifeEvents.scenarios,
```

Add to `categoryNames` array:
```typescript
"Life Events",
```

### 3. Add templates in templates.ts

```typescript
{
  pattern: "Who would {action} first?",
  slots: {
    action: "Life Events: Actions"
  }
},
{
  pattern: "Who has {past-action} before?",
  slots: {
    "past-action": "Life Events: Past Actions"
  }
},
```

### 4. Test

```bash
npm run build:prompts
```

Check that the prompt count increases and no errors occur.

---

## ✨ Pro Tips

### Grammar Rules
- **Actions**: Base verb ("send", "do", "try")
- **Past Actions**: Simple past tense ("sent", "did", "tried")
- **Gerunds**: -ing form ("sending", "doing", "trying")
- **Scenarios**: Full phrases ("get caught", "accidentally send")

### Array Sizes
- Aim for 15-25 items per array
- Actions/PastActions/Gerunds should match in count
- Scenarios can be different count

### Quality Over Quantity
- ONLY add items that work in EVERY slot of that type
- Test mentally: "Who would {this item}?" - does it work?
- Better to have 15 perfect items than 50 broken ones

### Category-Specific Arrays
Some categories need special arrays:
- **Spicy**: locations, partners
- **Social**: reactions, awkwardSituations
- **Relationship**: mistakes, traits
- **Skills**: levels (beginner/expert)

---

## 🎯 Recommended Rebuild Order

1. **Relationship Dynamics** - Easy, lots of content already
2. **Social Situations** - Good variety potential
3. **Life Events** - Fun, relatable
4. **Embarrassing/Taboo** - Expand what's already there
5. **Personality Traits** - Straightforward
6. **Skills/Activities** - Simple
7. **Vice/Indulgence** - Similar to Spicy
8. **Mischief/Chaos** - Overlap with Embarrassing
9. **Daily Life** - Easy filler content
10. **Money/Materialism** - Specific domain
11. **Vanity/Appearance** - Specific domain
12. **Authority/Rules** - Specific domain
13. **Extreme Scenarios** - Most challenging
14. **Risky/Daring** - Overlap with others

---

## 📊 Expected Results

Once all 14 categories are rebuilt with ~20 items each:
- **Estimated prompts**: 15,000-25,000+
- **Perfect grammar**: 100% of combinations
- **Clean categories**: Only 14 in dropdown
- **Easy maintenance**: Add items to tense-specific arrays

---

## 🐛 Troubleshooting

**Build fails?**
- Check for typos in import names
- Ensure export names match imports
- Verify all arrays in semanticTypes.ts exist

**Grammar still broken?**
- Review the array - does EVERY item work?
- Move non-matching items to different tense array
- Test template: "Who would {item}?" - grammatical?

**Duplicate prompts?**
- Normal! Same template + different categories = variety
- Player position templates add uniqueness

---

## ✅ Checklist for Each Category

- [ ] Create/edit category file with tense arrays
- [ ] Import in semanticTypes.ts
- [ ] Add all arrays to semanticTypes object
- [ ] Add category name to categoryNames array
- [ ] Add 3-5 templates using the new arrays
- [ ] Run `npm run build:prompts`
- [ ] Verify build succeeds
- [ ] Test a few prompts manually
- [ ] Commit changes

---

Good luck! The system is working perfectly - just needs content. 🎉
