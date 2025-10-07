// Grammar-perfect templates - each slot ONLY uses arrays where 100% of items work grammatically

export const templates = [
  // ===== BASE VERB TEMPLATES ("would {action}") =====
  {
    pattern: "Who would {adverb} {action}?",
    slots: {
      adverb: ["definitely", "probably", "secretly", "never"],
      action: "Spicy: Actions",
    },
  },
  {
    pattern: "Who would {action} on a dare?",
    slots: {
      action: "Embarrassing: Actions",
    },
  },
  {
    pattern: "Who would {action} and not feel guilty?",
    slots: {
      action: "Spicy: Actions",
    },
  },

  // ===== PAST TENSE TEMPLATES ("has {past-action}") =====
  {
    pattern: "Who has {adverb} {past-action} before?",
    slots: {
      adverb: ["definitely", "probably", "100%", "secretly"],
      "past-action": "Spicy: Past Actions",
    },
  },
  {
    pattern: "Who has {past-action} and never told anyone?",
    slots: {
      "past-action": "Embarrassing: Past Actions",
    },
  },
  {
    pattern: "Who has {past-action} the most times?",
    slots: {
      "past-action": "Spicy: Past Actions",
    },
  },

  // ===== GERUND TEMPLATES ("enjoys {gerund}", "caught {gerund}") =====
  {
    pattern: "Who would be caught {gerund}?",
    slots: {
      gerund: "Embarrassing: Gerunds",
    },
  },
  {
    pattern: "Who secretly enjoys {gerund}?",
    slots: {
      gerund: "Spicy: Gerunds",
    },
  },

  // ===== SCENARIO TEMPLATES ("most likely to {scenario}") =====
  {
    pattern: "Who is most likely to {scenario}?",
    slots: {
      scenario: "Spicy: Scenarios",
    },
  },
  {
    pattern: "Who is least likely to {scenario}?",
    slots: {
      scenario: "Embarrassing: Scenarios",
    },
  },
  {
    pattern: "Who would {scenario} and laugh about it?",
    slots: {
      scenario: "Embarrassing: Scenarios",
    },
  },

  // ===== COMBINATION TEMPLATES (multiple slots) =====
  {
    pattern: "Who would {action} {location}?",
    slots: {
      action: "Spicy: Actions",
      location: "Spicy: Locations",
    },
  },
  {
    pattern: "Who would {action} with {partner}?",
    slots: {
      action: "Spicy: Actions",
      partner: "Spicy: Partners",
    },
  },
  {
    pattern: "Who would {action} {location} with {partner}?",
    slots: {
      action: "Spicy: Actions",
      location: "Spicy: Locations",
      partner: "Spicy: Partners",
    },
  },

  // ===== PLAYER POSITION TEMPLATES =====
  {
    pattern: "Who would {action} with the person to their left?",
    slots: {
      action: "Spicy: Actions",
    },
  },
  {
    pattern: "Who would {action} with the person to their right?",
    slots: {
      action: "Spicy: Actions",
    },
  },
  {
    pattern: "Who would {action} with the person across from them?",
    slots: {
      action: "Spicy: Actions",
    },
  },
  {
    pattern: "Who has {past-action} to the person on their left?",
    slots: {
      "past-action": "Embarrassing: Past Actions",
    },
  },
  {
    pattern: "Who has {past-action} to the person on their right?",
    slots: {
      "past-action": "Embarrassing: Past Actions",
    },
  },

  // ===== STANDALONE PLAYER TEMPLATES (no category needed) =====
  {
    pattern: "Who is most attracted to the person on their left?",
    slots: {},
  },
  {
    pattern: "Who is most attracted to the person on their right?",
    slots: {},
  },
  {
    pattern: "Who has hooked up with the person to their left?",
    slots: {},
  },
  {
    pattern: "Who has hooked up with the person to their right?",
    slots: {},
  },
  {
    pattern: "Who has a crush on the person across from them?",
    slots: {},
  },
  {
    pattern: "Who would trust the person to their left with a secret?",
    slots: {},
  },
  {
    pattern: "Who would never trust the person across from them?",
    slots: {},
  },
  {
    pattern: "Who is most jealous of the person to their right?",
    slots: {},
  },
  {
    pattern: "Who would date the person to their left if they were single?",
    slots: {},
  },
  {
    pattern: "Who thinks they're smarter than the person to their right?",
    slots: {},
  },

  // TODO: Add more templates as you rebuild other categories
  // Follow these patterns:
  // - Base verb: "Who would {action}?"
  // - Past tense: "Who has {past-action}?"
  // - Gerund: "Who enjoys {gerund}?"
  // - Scenario: "Who is most likely to {scenario}?"
];
