export const breakingTheRules = {
  staticPrompts: [
    // Static prompts with sentence structure variety
    "Who never follows rules just because they exist?",
    "Who has argued their way into getting arrested?",
    "Best at turning a simple request into a constitutional debate?",
    "Worst person to give any power to whatsoever?",
    "Who absolutely abuses the 'mute all' button in Zoom meetings?",
    "Most likely to power trip after being given a clipboard?",
    "Who would become a cult leader and actually get followers?",
    "In a zombie apocalypse, who dies within 24 hours?",
    "If we all got superpowers, who would abuse them immediately?",
    "Whose fake important title would be the most ridiculous?",
    "Who starts every sentence with 'As the leader...'?",
    "Most likely to say 'I pay your salary' to a cop?",
    "Who threatens to call the cops over nothing?",
    "Worst at reading room but argues with everyone anyway?",
    "Who gets banned from multiple establishments in one year?",
    "Most likely to be the reason new rules get made?",
    "Who turns everything into absolute chaos?",
  ],
  templates: [
    // Player reference prompts with variety
    {
      id: "break_player_boss",
      pattern:
        "{playerRefs} is now everyone's boss. Who is {most/least} likely to {action}?",
      overrides: {
        action: [
          "quit immediately",
          "get fired within a week",
          "actually thrive under their management",
          "start planning office pranks",
          "kiss ass the hardest",
          "report them to HR",
        ],
      },
    },
    {
      id: "break_player_president",
      pattern:
        "{playerRefs} is suddenly president. Who is {most/least} likely to {action}?",
      overrides: {
        action: [
          "join their cabinet",
          "lead the impeachment efforts",
          "become their press secretary",
          "start a resistance movement",
          "benefit the most from their policies",
        ],
      },
    },
    {
      id: "break_player_authority",
      pattern: "{scenario}. Who is {most/least} likely to {action}?",
      overrides: {
        scenario: [
          "{playerRefs} just got put in charge of {locations}",
          "{playerRefs} is now the manager at {locations}",
          "{playerRefs} was just promoted to run {locations}",
          "{playerRefs} somehow ended up in charge of {eventTypes}",
        ],
        action: [
          "get fired first",
          "become their right-hand person",
          "start a rebellion",
          "quit on the spot",
          "thrive under their leadership",
          "get banned immediately",
        ],
      },
    },

    // Apocalypse scenarios
    {
      id: "break_apocalypse",
      pattern: "{apocalypse}, who is {most/least} likely to {action}?",
      overrides: {
        apocalypse: [
          "In a zombie apocalypse",
          "In the case of nuclear war",
          "Aliens are invading Earth",
          "A global pandemic wipes out 90% of the population",
        ],
        action: [
          "be prepared with a doomsday bunker",
          "screw over the group by stealing all the food",
          "declare themselves Supreme Leader",
          "sacrifice themselves to save everyone",
          "become a total villain",
          "die within 24 hours",
          "betray the group for their own survival",
          "eat {playerRefs} first",
          "form an alliance with {playerRefs}",
          "hoard all the supplies",
          "be completely useless",
          "accidentally cause everyone's death",
        ],
      },
    },

    // Arguing with inanimate objects - varied structures
    {
      id: "break_argue_technology",
      pattern: "Most likely to {action}",
      overrides: {
        action: [
          "get into a screaming match with their GPS",
          "yell at an automated phone system for 20 minutes",
          "have a full meltdown at a parking meter",
          "argue with Siri/Alexa like it's a real person",
          "threaten their printer during a paper jam",
        ],
      },
    },

    // Karen behavior - varied sentence structures
    {
      id: "break_karen_manager",
      pattern: "Demands to speak to the manager over {issue}",
      overrides: {
        issue: [
          "an expired coupon",
          "a 5-minute wait",
          "being told 'no'",
          "literally nothing",
          "the weather",
        ],
      },
    },
    {
      id: "break_karen_quotes",
      pattern: "Most likely to say {quote} unironically",
      overrides: {
        quote: [
          "'Do you know who I am?'",
          "'I know the owner'",
          "'I'll take my business elsewhere'",
          "'You just lost a customer'",
          "'This is going on Yelp'",
        ],
      },
    },

    // Authority abuse - remove nested placeholders, make specific
    {
      id: "break_power_locations",
      pattern: "If put in charge of {locations}, whose rules would be the most ridiculous?",
    },
    {
      id: "break_power_addiction",
      pattern: "Most likely to {action}",
      overrides: {
        action: [
          "become addicted to being in charge of anything",
          "turn into a dictator over something trivial",
          "create unnecessarily complicated rules for no reason",
        ],
      },
    },

    // Defiance & rebellion - varied structures
    {
      id: "break_refuse_orders",
      pattern: "Refuses to take orders from {relationshipRefs}",
    },
    {
      id: "break_defiance_actions",
      pattern: "Most likely to {action}",
      overrides: {
        action: [
          "start a rebellion over something stupid",
          "do the exact opposite of what they're told",
          "break rules just to prove a point",
        ],
      },
    },
    {
      id: "break_defiance_authority",
      pattern: "Most likely to tell {authority} to fuck off",
      overrides: {
        authority: [
          "their boss",
          "a cop",
          "their landlord",
          "the HOA",
          "TSA",
          "a security guard",
        ],
      },
    },

    // Getting kicked out / banned - simplify
    {
      id: "break_banned_reason",
      pattern: "Gets kicked out of {locations} for {reason}",
      overrides: {
        reason: [
          "being drunk and belligerent",
          "starting a fight",
          "arguing with staff",
          "doing something wildly inappropriate",
          "being a complete menace",
        ],
      },
    },

    // Dramatic exits - add ironic outcomes
    {
      id: "break_dramatic_quit",
      pattern: "Most likely to {action}",
      overrides: {
        action: [
          "quit their job dramatically and immediately regret it",
          "storm out and then realize they left their keys",
          "write a resignation email that goes viral",
          "quit over something petty and make it everyone's problem",
        ],
      },
    },
    {
      id: "break_protest_trivial",
      pattern: "Starts a protest over {issue}",
      overrides: {
        issue: [
          "the coffee selection",
          "a minor inconvenience",
          "something nobody else cares about",
          "being slightly inconvenienced",
        ],
      },
    },

    // Wild chaos & dares - remove nested placeholders
    {
      id: "break_dare_acceptance",
      pattern: "On a dare, who would {action}?",
      overrides: {
        action: [
          "actually do it without hesitation",
          "take it way too far",
          "do something that gets everyone kicked out",
          "make everyone regret daring them",
        ],
      },
    },
    {
      id: "break_chaos_locations",
      pattern: "Causes absolute chaos at {locations}",
    },
    {
      id: "break_chaos_events",
      pattern: "Turns {eventTypes} into absolute chaos",
    },

    // Getting fired - sentence variety
    {
      id: "break_workplace_disaster",
      pattern: "Gets fired for {action}",
      overrides: {
        action: [
          "telling their boss to fuck off",
          "correcting the CEO mid-presentation",
          "falling asleep in an important meeting",
          "live-tweeting confidential company info",
          "showing up drunk",
        ],
      },
    },

    // Taking over without permission - varied structures
    {
      id: "break_self_appointed",
      pattern: "Appoints themselves {role} without asking",
      overrides: {
        role: [
          "leader",
          "rule enforcer",
          "decision maker",
          "group spokesperson",
        ],
      },
    },
    {
      id: "break_takeover_event",
      pattern: "Takes over as host of {eventTypes} uninvited",
    },
    {
      id: "break_demand_title",
      pattern: "Demands everyone call them {title}",
      overrides: {
        title: [
          "Your Majesty",
          "Supreme Leader",
          "Captain",
          "Chief",
          "The Boss",
        ],
      },
    },

    // Trust with power - varied structures
    {
      id: "break_trust_power",
      pattern: "Worst person to trust with {power}",
      overrides: {
        power: [
          "a badge and a taser",
          "emergency powers",
          "control of the aux cord",
          "the WiFi password",
          "admin privileges",
        ],
      },
    },

    // Petty meltdowns - ironic structure
    {
      id: "break_petty_meltdown",
      pattern: "Acts like the world is ending over {issue}",
      overrides: {
        issue: [
          "an expired coupon",
          "a 5-minute wait",
          "being told 'no'",
          "a slight inconvenience",
        ],
      },
    },
    {
      id: "break_banned_arguing",
      pattern: "Argues with staff until they're banned from {locations}",
    },

    // Abusing small amounts of power - semi-static
    {
      id: "break_abuse_small_power",
      pattern: "Absolutely abuses {power}",
      overrides: {
        power: [
          "group chat admin privileges",
          "control of the thermostat",
          "the remote control",
          "being in charge of the guest list",
        ],
      },
    },
  ],
};
