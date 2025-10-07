# Bad People Prompt Generator - Project Brief

## Overview

Building a web app that generates random "Bad People" style prompts for party games. The game involves players voting on who in the group is most likely to do various things.

## Core Concept

Instead of running out of physical cards, we'll generate infinite variations by:

- Creating semantic word/phrase categories
- Building sentence templates with constrained substitution slots
- Randomly combining them to create sensible prompts

## Architecture Decision

### Chosen Approach: Semantic Type System

- **Top Level:** 14 semantic categories of words/phrases
- **Templates:** Sentence structures with slots that specify which semantic type fits
- **No subtypes:** Keep it simple - each category is just an array of compatible items
- **Storage:** JSON file (no database for now - can add later if needed)

### Why This Approach?

- More variety than manually curated combinations
- More sensible than pure Mad Libs randomization
- Avoids LLM costs while still getting good results
- Can iterate and add more items easily

## Semantic Categories (14 Total)

1. **Embarrassing/Taboo Actions** - socially awkward or rule-breaking behavior
2. **Life Events** - things that happen to people (get arrested, win lottery, get married)
3. **Personality Traits** - descriptors of character (honest, lazy, dramatic)
4. **Social Situations** - contexts where behavior matters (at a wedding, under pressure)
5. **Skills/Activities** - things people can be good/bad at (keeping secrets, cooking)
6. **Relationship Dynamics** - interpersonal behaviors (ghost someone, hold grudges)
7. **Extreme Scenarios** - hypothetical wild situations (survive apocalypse, fake death)
8. **Daily Life Activities** - mundane things (take care of plants, remember birthdays)
9. **Risky/Daring Behavior** - bold or boundary-pushing actions (skinny dipping, drunk texting)
10. **Vice/Indulgence** - guilty pleasures and bad habits (overindulge, procrastinate)
11. **Mischief/Chaos** - troublemaking that's playful (start drama, cause a scene)
12. **Money/Materialism** - spending habits, greed, cheapness
13. **Vanity/Appearance** - behavior around looks, social media, image
14. **Authority/Rules** - how people relate to being told what to do

## Template Structure

Templates should follow patterns like:

```javascript
{
  pattern: "Who would be the {quality} person to {activity}?",
  slots: {
    quality: ["best", "worst", "funniest", "scariest"],
    activity: "Skills/Activities" // references semantic category
  }
}
```

Common patterns from original Bad People:

- "Who would [verb phrase]?"
- "Who is most/least likely to [verb phrase]?"
- "Who would be the best/worst at [activity]?"
- "Who would [modifier] [action]?"

## Technical Requirements

### Frontend

- Simple, clean UI
- Single button: "Generate Prompt"
- Display the generated prompt clearly
- Optional: "Skip" button for bad combinations (can add later)

### Data Structure

```javascript
{
  "semanticTypes": {
    "Embarrassing/Taboo Actions": [...],
    "Life Events": [...],
    // etc
  },
  "templates": [
    {
      "pattern": "Who would {slot1} {slot2}?",
      "slots": {
        "slot1": ["definitely", "never", "secretly"],
        "slot2": "Embarrassing/Taboo Actions"
      }
    }
    // etc
  ]
}
```

### Logic

1. Pick random template
2. For each slot, either:
   - Pick from inline array if provided, OR
   - Reference semantic category and pick random item
3. Substitute into pattern
4. Display result

### Deployment

- Host at: badpeople.digitalnovastudio.com (subdomain)
- Add robots.txt to disallow indexing
- Add `<meta name="robots" content="noindex, nofollow">` to HTML

## Next Steps

1. **Populate semantic categories** - Add 20-50 items per category
2. **Create 30-50 templates** - Cover different question styles
3. **Build simple web interface** - Just HTML/CSS/JS, no framework needed
4. **Test with friends** - See what works, what doesn't
5. **Iterate** - Add more items/templates based on gameplay

## Future Enhancements (Maybe Later)

- Track shown combinations in session (browser memory)
- "Don't show again" button for bad combos
- Add Supabase for cross-session persistence
- Weight less-served prompts
- Categories/difficulty levels

## Key Design Principle

**Start simple, iterate based on actual gameplay.** Don't over-engineer until we know what problems actually exist.
