export const drinkingTemplates = [
  {
    pattern: "Choose someone to take {amount} drink{plural}!",
    slots: {
      amount: ["a", "two", "three"],
      plural: ["", "s", "s"]
    }
  },
  {
    pattern: "Everyone drinks!",
    slots: {}
  },
  {
    pattern: "Dictator drinks!",
    slots: {}
  },
  {
    pattern: "{group} drinks!",
    slots: {
      group: ["Youngest person", "Oldest person", "Last person to arrive", "Person on your left", "Person on your right", "Everyone wearing black"]
    }
  },
  {
    pattern: "Who would be most likely to {action}? They drink!",
    slots: {
      action: ["black out tonight", "drunk text an ex", "start a fight when drunk", "cry when drunk", "dance on a table"]
    }
  },
  {
    pattern: "Who's the biggest lightweight? They drink!",
    slots: {}
  },
  {
    pattern: "Finish your drink if you've ever {action}!",
    slots: {
      action: ["gotten kicked out of a bar", "blacked out", "thrown up from drinking", "drunk dialed someone", "made out with a stranger"]
    }
  },
  {
    pattern: "Choose two people to compete in a staring contest. Loser drinks!",
    slots: {}
  }
];
