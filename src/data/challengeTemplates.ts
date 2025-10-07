export const challengeTemplates = [
  {
    pattern: "Do your best impression of {target}!",
    slots: {
      target: ["the Dictator", "the person on your left", "a celebrity", "your mom", "your dad"]
    }
  },
  {
    pattern: "{action} or lose a point!",
    slots: {
      action: ["Tell an embarrassing secret", "Show your most embarrassing photo", "Read your last text out loud", "Call your ex", "Post an embarrassing selfie"]
    }
  },
  {
    pattern: "Everyone: {challenge}!",
    slots: {
      challenge: ["share your most embarrassing moment", "confess something you've never told anyone", "reveal your biggest fear", "say something nice about the person on your right"]
    }
  },
  {
    pattern: "Dictator chooses someone to: {dare}",
    slots: {
      dare: ["do 10 pushups", "sing a song", "dance for 30 seconds", "speak in an accent for the next round", "switch seats with someone"]
    }
  },
  {
    pattern: "Truth or Dare: Who would most likely {action}?",
    slots: {
      action: ["lie on this dare", "chicken out", "go through with anything", "regret this tomorrow"]
    }
  },
  {
    pattern: "Act out: {scenario}",
    slots: {
      scenario: ["a dramatic breakup", "a first date gone wrong", "a job interview disaster", "meeting your partner's parents"]
    }
  }
];
