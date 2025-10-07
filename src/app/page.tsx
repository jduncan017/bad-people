"use client";

import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

type PromptsData = {
  semanticTypes: Record<string, string[]>;
  templates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
  }>;
  drinkingModeTemplates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
  }>;
  challengeModeTemplates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
  }>;
};

type ModeFrequency = "off" | "low" | "med" | "high";

export default function HomePage() {
  const [promptsData, setPromptsData] = useState<PromptsData | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentPromptMode, setCurrentPromptMode] = useState<string | null>(
    null,
  );
  const [revealedChars, setRevealedChars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shownPrompts, setShownPrompts] = useState<Set<string>>(new Set());
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [badPrompts, setBadPrompts] = useState<string[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [categoryUsage, setCategoryUsage] = useState<Record<string, number>>(
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allPromptsExhausted, setAllPromptsExhausted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showModesModal, setShowModesModal] = useState(false);
  const [drinkingModeFrequency, setDrinkingModeFrequency] =
    useState<ModeFrequency>("off");
  const [challengeModeFrequency, setChallengeModeFrequency] =
    useState<ModeFrequency>("off");

  // Refs for click-outside detection
  const menuRef = useRef<HTMLDivElement>(null);
  const modesModalRef = useRef<HTMLDivElement>(null);
  const instructionsModalRef = useRef<HTMLDivElement>(null);
  const historyModalRef = useRef<HTMLDivElement>(null);
  const resetModalRef = useRef<HTMLDivElement>(null);

  // Click outside to close handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        modesModalRef.current &&
        !modesModalRef.current.contains(event.target as Node)
      ) {
        setShowModesModal(false);
      }
      if (
        instructionsModalRef.current &&
        !instructionsModalRef.current.contains(event.target as Node)
      ) {
        setShowInstructionsModal(false);
      }
      if (
        historyModalRef.current &&
        !historyModalRef.current.contains(event.target as Node)
      ) {
        setShowHistoryModal(false);
      }
      if (
        resetModalRef.current &&
        !resetModalRef.current.contains(event.target as Node)
      ) {
        setShowResetModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load mode settings and session stats from storage on mount
  useEffect(() => {
    try {
      const savedDrinking = Cookies.get("drinkingMode");
      const savedChallenge = Cookies.get("challengeMode");
      if (savedDrinking)
        setDrinkingModeFrequency(savedDrinking as ModeFrequency);
      if (savedChallenge)
        setChallengeModeFrequency(savedChallenge as ModeFrequency);
    } catch {
      // Ignore cookie errors
    }

    // Load session stats from localStorage (no size limit issues)
    const savedShownPrompts = localStorage.getItem("shownPrompts");
    const savedPromptHistory = localStorage.getItem("promptHistory");
    const savedBadPrompts = localStorage.getItem("badPrompts");
    const savedTotalGenerated = localStorage.getItem("totalGenerated");
    const savedCategoryUsage = localStorage.getItem("categoryUsage");

    if (savedShownPrompts)
      setShownPrompts(new Set(JSON.parse(savedShownPrompts) as string[]));
    if (savedPromptHistory)
      setPromptHistory(JSON.parse(savedPromptHistory) as string[]);
    if (savedBadPrompts) setBadPrompts(JSON.parse(savedBadPrompts) as string[]);
    if (savedTotalGenerated)
      setTotalGenerated(parseInt(savedTotalGenerated, 10));
    if (savedCategoryUsage)
      setCategoryUsage(
        JSON.parse(savedCategoryUsage) as Record<string, number>,
      );
  }, []);

  // Save mode settings to cookies when they change
  useEffect(() => {
    try {
      Cookies.set("drinkingMode", drinkingModeFrequency, { expires: 365 });
    } catch {
      // Ignore cookie errors
    }
  }, [drinkingModeFrequency]);

  useEffect(() => {
    try {
      Cookies.set("challengeMode", challengeModeFrequency, { expires: 365 });
    } catch {
      // Ignore cookie errors
    }
  }, [challengeModeFrequency]);

  // Save session stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem("shownPrompts", JSON.stringify([...shownPrompts]));
  }, [shownPrompts]);

  useEffect(() => {
    localStorage.setItem("promptHistory", JSON.stringify(promptHistory));
  }, [promptHistory]);

  useEffect(() => {
    localStorage.setItem("badPrompts", JSON.stringify(badPrompts));
  }, [badPrompts]);

  useEffect(() => {
    localStorage.setItem("totalGenerated", totalGenerated.toString());
  }, [totalGenerated]);

  useEffect(() => {
    localStorage.setItem("categoryUsage", JSON.stringify(categoryUsage));
  }, [categoryUsage]);

  // Calculate total possible prompts
  const calculateTotalPrompts = (data: PromptsData): number => {
    let total = 0;
    data.templates.forEach((template) => {
      let combinations = 1;
      Object.values(template.slots).forEach((slot) => {
        if (Array.isArray(slot)) {
          combinations *= slot.length;
        } else if (typeof slot === "string") {
          combinations *= data.semanticTypes[slot]?.length ?? 0;
        }
      });
      total += combinations;
    });
    return total;
  };

  useEffect(() => {
    fetch("/prompts.json")
      .then((res) => res.json())
      .then((data: PromptsData) => {
        setPromptsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading prompts:", error);
        setIsLoading(false);
      });
  }, []);

  // Fade-in effect for each character
  useEffect(() => {
    if (!currentPrompt) {
      setRevealedChars(0);
      return;
    }

    setRevealedChars(0);
    let index = 0;

    const interval = setInterval(() => {
      if (index < currentPrompt.length) {
        setRevealedChars(index + 1);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [currentPrompt]);

  const getMostFrequentCategory = () => {
    if (Object.keys(categoryUsage).length === 0) return "None yet";
    const sorted = Object.entries(categoryUsage).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] ?? "None";
  };

  const generatePrompt = () => {
    if (!promptsData || isGenerating) return;

    // Check if we've exhausted all possible prompts
    if (allPromptsExhausted) {
      // Reset and start over
      setShownPrompts(new Set());
      setAllPromptsExhausted(false);
    }

    setIsGenerating(true);
    setCurrentPrompt(""); // Clear immediately to prevent flash
    setRevealedChars(0);

    // Small delay to ensure state updates
    setTimeout(() => {
      let result = "";
      let usedCategory: string | null = null;
      let attempts = 0;
      const maxAttempts = 1000;
      let foundUnique = false;

      // Build template pool based on mode frequencies
      const frequencyMultipliers = { off: 0, low: 1, med: 2, high: 4 };

      let templates = [...promptsData.templates];

      // Add drinking mode templates based on frequency
      const drinkingMultiplier = frequencyMultipliers[drinkingModeFrequency];
      for (let i = 0; i < drinkingMultiplier; i++) {
        templates = [...templates, ...promptsData.drinkingModeTemplates];
      }

      // Add challenge mode templates based on frequency
      const challengeMultiplier = frequencyMultipliers[challengeModeFrequency];
      for (let i = 0; i < challengeMultiplier; i++) {
        templates = [...templates, ...promptsData.challengeModeTemplates];
      }

      // Track which pool the template comes from
      const templateSources: ("drinking" | "challenge" | null)[] =
        templates.map((t, idx) => {
          if (idx < promptsData.templates.length) return null;
          if (promptsData.drinkingModeTemplates.includes(t)) return "drinking";
          if (promptsData.challengeModeTemplates.includes(t))
            return "challenge";
          return null;
        });

      // Filter by category if selected
      let activeTemplateSources: ("drinking" | "challenge" | null)[] =
        templateSources;
      if (selectedCategory) {
        const filtered: typeof templates = [];
        const filteredSources: ("drinking" | "challenge" | null)[] = [];
        templates.forEach((t, idx) => {
          if (Object.values(t.slots).includes(selectedCategory)) {
            filtered.push(t);
            filteredSources.push(templateSources[idx] ?? null);
          }
        });
        templates = filtered;
        activeTemplateSources = filteredSources;
      }

      if (templates.length === 0) {
        setIsGenerating(false);
        return;
      }

      // Try to generate a unique prompt
      while (attempts < maxAttempts && !foundUnique) {
        // Pick random template
        const templateIndex = Math.floor(Math.random() * templates.length);
        const template = templates[templateIndex];
        if (!template) continue;

        // Determine if this is a mode template
        const templateSource = activeTemplateSources[templateIndex];
        if (templateSource) {
          setCurrentPromptMode(templateSource);
        } else {
          setCurrentPromptMode(null);
        }

        result = template.pattern;
        usedCategory = null;

        // Fill in each slot
        for (const [slotName, slotValue] of Object.entries(template.slots)) {
          let replacement: string;

          if (Array.isArray(slotValue)) {
            // Inline array - pick random item
            replacement =
              slotValue[Math.floor(Math.random() * slotValue.length)]!;
          } else {
            // Reference to semantic category
            const category = promptsData.semanticTypes[slotValue];
            if (!category) continue;
            replacement =
              category[Math.floor(Math.random() * category.length)]!;
            usedCategory = slotValue; // Track the category used
          }

          result = result.replace(`{${slotName}}`, replacement);
        }

        // Check if we've seen this prompt before
        if (!shownPrompts.has(result)) {
          foundUnique = true;
          break;
        }

        attempts++;
      }

      // If we couldn't find a unique prompt, all have been exhausted
      if (!foundUnique) {
        setAllPromptsExhausted(true);
        setCurrentPrompt(
          "🎉 You've seen all the prompts! Click again to restart.",
        );
        setIsGenerating(false);
        return;
      }

      // Update state
      setCurrentPrompt(result);
      setShownPrompts((prev) => new Set([...prev, result]));
      setPromptHistory((prev) => [result, ...prev]);
      setTotalGenerated((prev) => prev + 1);

      // Track category usage
      if (usedCategory) {
        setCategoryUsage((prev) => ({
          ...prev,
          [usedCategory]: (prev[usedCategory] ?? 0) + 1,
        }));
      }

      setIsGenerating(false);
    }, 400);
  };

  const downvotePrompt = () => {
    if (!currentPrompt) return;
    if (badPrompts.includes(currentPrompt)) {
      // Toggle off - remove from bad prompts
      setBadPrompts((prev) => prev.filter((p) => p !== currentPrompt));
    } else {
      // Add to bad prompts
      setBadPrompts((prev) => [...prev, currentPrompt]);
    }
  };

  const emailBadPrompts = () => {
    if (badPrompts.length === 0) {
      alert("No bad prompts to email!");
      return;
    }

    const subject = encodeURIComponent("Bad People - Bad Prompts List");
    const body = encodeURIComponent(
      `Here are the prompts that didn't work well:\n\n${badPrompts.join("\n")}\n\nTotal: ${badPrompts.length} prompts`,
    );
    window.location.href = `mailto:emailjoshduncan@gmail.com?subject=${subject}&body=${body}`;
    setIsMenuOpen(false);
  };

  const resetSession = () => {
    setShownPrompts(new Set());
    setPromptHistory([]);
    setTotalGenerated(0);
    setCategoryUsage({});
    setCurrentPrompt("");
    setRevealedChars(0);
    setAllPromptsExhausted(false);
    setBadPrompts([]);
    setShowResetModal(false);
    setIsMenuOpen(false);

    // Clear session data from localStorage
    localStorage.removeItem("shownPrompts");
    localStorage.removeItem("promptHistory");
    localStorage.removeItem("badPrompts");
    localStorage.removeItem("totalGenerated");
    localStorage.removeItem("categoryUsage");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hamburger Nav */}
      <nav className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h2 className="text-lg font-bold text-white">
            Bad <span className="text-orange-500">People</span>
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full right-0 z-50 mt-2 w-fit min-w-[250px] rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl"
              >
                <div className="space-y-1 p-6">
                  <button
                    onClick={() => {
                      setShowInstructionsModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left whitespace-nowrap text-white transition-colors hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    How to Play
                  </button>
                  <button
                    onClick={() => {
                      setShowModesModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left whitespace-nowrap text-white transition-colors hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Game Modes{" "}
                    {(drinkingModeFrequency !== "off" ||
                      challengeModeFrequency !== "off") && (
                      <span className="text-xs text-orange-500">
                        (
                        {[
                          drinkingModeFrequency !== "off" && "Drinking",
                          challengeModeFrequency !== "off" && "Challenge",
                        ]
                          .filter(Boolean)
                          .join(", ")}
                        )
                      </span>
                    )}
                  </button>
                  <button
                    onClick={emailBadPrompts}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left whitespace-nowrap text-white transition-colors hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Report Bad Prompts ({badPrompts.length})
                  </button>
                  <button
                    onClick={() => {
                      setShowResetModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left whitespace-nowrap text-red-400 transition-colors hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modes Modal */}
      {showModesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div
            ref={modesModalRef}
            className="my-8 w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Game Modes</h3>
              <button
                onClick={() => setShowModesModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {/* Drinking Mode */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">🍺</span>
                  <h4 className="text-lg font-bold text-amber-500">
                    Drinking Mode
                  </h4>
                </div>
                <p className="mb-3 text-sm text-zinc-300">
                  Mix drinking consequences into your game! Perfect for parties
                  where everyone has a drink in hand.
                </p>
                <div className="mb-3">
                  <p className="mb-2 text-xs font-semibold text-zinc-400">
                    Frequency
                  </p>
                  <div className="flex gap-1 rounded-lg bg-zinc-800 p-1">
                    {(["off", "low", "med", "high"] as ModeFrequency[]).map(
                      (freq) => {
                        const colors = {
                          off:
                            drinkingModeFrequency === freq
                              ? "bg-zinc-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          low:
                            drinkingModeFrequency === freq
                              ? "bg-green-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          med:
                            drinkingModeFrequency === freq
                              ? "bg-yellow-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          high:
                            drinkingModeFrequency === freq
                              ? "bg-red-600 text-white"
                              : "text-zinc-400 hover:text-white",
                        };

                        return (
                          <button
                            key={freq}
                            onClick={() => setDrinkingModeFrequency(freq)}
                            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-all ${colors[freq]}`}
                          >
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-xs text-zinc-400">
                  <p className="font-semibold text-zinc-300">Examples:</p>
                  <p>&ldquo;Everyone drinks!&rdquo;</p>
                  <p>&ldquo;Choose someone to take two drinks!&rdquo;</p>
                  <p>
                    &ldquo;Who&rsquo;s the biggest lightweight? They
                    drink!&rdquo;
                  </p>
                </div>
              </div>

              {/* Challenge Mode */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  <h4 className="text-lg font-bold text-amber-500">
                    Challenge Mode
                  </h4>
                </div>
                <p className="mb-3 text-sm text-zinc-300">
                  Add dares, performances, and physical challenges to spice
                  things up!
                </p>
                <div className="mb-3">
                  <p className="mb-2 text-xs font-semibold text-zinc-400">
                    Frequency
                  </p>
                  <div className="flex gap-1 rounded-lg bg-zinc-800 p-1">
                    {(["off", "low", "med", "high"] as ModeFrequency[]).map(
                      (freq) => {
                        const colors = {
                          off:
                            challengeModeFrequency === freq
                              ? "bg-zinc-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          low:
                            challengeModeFrequency === freq
                              ? "bg-green-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          med:
                            challengeModeFrequency === freq
                              ? "bg-yellow-600 text-white"
                              : "text-zinc-400 hover:text-white",
                          high:
                            challengeModeFrequency === freq
                              ? "bg-red-600 text-white"
                              : "text-zinc-400 hover:text-white",
                        };

                        return (
                          <button
                            key={freq}
                            onClick={() => setChallengeModeFrequency(freq)}
                            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-all ${colors[freq]}`}
                          >
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-xs text-zinc-400">
                  <p className="font-semibold text-zinc-300">Examples:</p>
                  <p>&ldquo;Do your best impression of the Dictator!&rdquo;</p>
                  <p>
                    &ldquo;Tell an embarrassing secret or lose a point!&rdquo;
                  </p>
                  <p>&ldquo;Act out: a dramatic breakup&rdquo;</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-400">
                  <strong>Tip:</strong> You can enable both modes at once for
                  maximum chaos, or mix them with specific categories for themed
                  games!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div
            ref={instructionsModalRef}
            className="my-8 w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">How to Play</h3>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-[60vh] space-y-4 overflow-y-auto text-zinc-300">
              <div>
                <h4 className="mb-2 text-lg font-bold text-amber-500">
                  Objective
                </h4>
                <p>
                  Be the first player to score 7 points by correctly guessing
                  who the Dictator chooses.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-bold text-amber-500">Setup</h4>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>
                    Each player chooses an Identity Card and places it face up
                    in front of them
                  </li>
                  <li>
                    Each player collects Voting Cards for every person playing
                    (including themselves)
                  </li>
                  <li>Each player gets one Double Down card</li>
                  <li>The last person to arrive begins as the Dictator</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-bold text-amber-500">
                  How to Play
                </h4>
                <ol className="list-inside list-decimal space-y-2 text-sm">
                  <li>
                    <strong>Generate a Question:</strong> The Dictator uses this
                    app to generate a random question by clicking &ldquo;Next
                    Question&rdquo;
                  </li>
                  <li>
                    <strong>Dictator Votes:</strong> The Dictator silently
                    chooses one player who best fits the question (can vote for
                    anyone, including themselves) and places that player&rsquo;s
                    Voting Card face down
                  </li>
                  <li>
                    <strong>Players Vote:</strong> All other players must guess
                    who the Dictator voted for and place their vote face down
                    (players can vote for themselves)
                  </li>
                  <li>
                    <strong>Reveal:</strong> Everyone reveals their votes
                    simultaneously
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-bold text-amber-500">
                  Scoring
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>
                    Players who voted the same as the Dictator receive 1 point
                  </li>
                  <li>
                    <strong>Double Down:</strong> If you use your Double Down
                    card and vote the same as the Dictator, you get 2 points.
                    But if you&rsquo;re wrong, you lose it for the rest of the
                    game!
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-bold text-amber-500">
                  Winning
                </h4>
                <p className="text-sm">
                  The first player to score 7 points wins the game!
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-400">
                  <strong>Note:</strong> This digital version replaces the
                  physical question cards. Use your physical Identity Cards,
                  Voting Cards, and Double Down cards to play. Simply generate
                  questions using this app instead of drawing from the deck!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            ref={historyModalRef}
            className="flex w-full max-w-2xl flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            style={{ maxHeight: "80vh" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                All Questions ({promptHistory.length})
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className="overflow-y-auto pr-2"
              style={{ maxHeight: "calc(80vh - 100px)" }}
            >
              {promptHistory.length > 0 ? (
                <div className="space-y-2">
                  {promptHistory.map((prompt, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
                    >
                      <p className="text-sm text-zinc-300">{prompt}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-zinc-500">
                  No questions generated yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            ref={resetModalRef}
            className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <h3 className="mb-2 text-xl font-bold text-white">
              Reset Session?
            </h3>
            <p className="mb-6 text-zinc-400">
              This will clear all session stats, history, and bad prompts. This
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-white transition-colors hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={resetSession}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-1 flex-col items-center justify-between bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 pt-24 text-white lg:p-8">
        {/* Category Dropdown */}
        <div className="mx-auto mb-6 w-full max-w-md">
          <div className="relative">
            <select
              value={selectedCategory ?? ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 pr-10 text-sm font-semibold text-white focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              {promptsData &&
                Object.keys(promptsData.semanticTypes).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Bad{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                People
              </span>
            </h1>
            <p className="text-base text-zinc-400 sm:text-lg">
              The party game that reveals who your friends really are
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            {/* Prompt Display */}
            <div className="relative flex min-h-[220px] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 text-center shadow-lg">
              {isLoading ? (
                <p className="text-xl text-zinc-400">Loading...</p>
              ) : isGenerating ? (
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-full bg-amber-500/70"
                      style={{
                        animation: `wave 0.4s ease-in-out infinite`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
              ) : currentPrompt ? (
                <>
                  {currentPromptMode && (
                    <div className="mb-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                          currentPromptMode === "drinking"
                            ? "border border-blue-500/30 bg-blue-500/20 text-blue-400"
                            : "border border-purple-500/30 bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {currentPromptMode === "drinking"
                          ? "🍺 Drink"
                          : "🎭 Challenge"}
                      </span>
                    </div>
                  )}
                  <p className="text-2xl leading-relaxed font-bold text-white sm:text-3xl lg:text-4xl">
                    {currentPrompt.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          opacity: index < revealedChars ? 1 : 0,
                          transition: "opacity 0.1s ease-in",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </p>
                  {/* Downvote Button */}
                  <button
                    onClick={downvotePrompt}
                    className={`absolute right-4 bottom-4 flex items-center gap-2 rounded-lg p-2 transition-all ${
                      badPrompts.includes(currentPrompt)
                        ? "bg-red-500/20 text-red-400"
                        : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                    }`}
                    title={
                      badPrompts.includes(currentPrompt)
                        ? "Unmark bad prompt"
                        : "Mark as bad prompt"
                    }
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                    </svg>
                    {badPrompts.includes(currentPrompt) && (
                      <span className="text-xs font-semibold whitespace-nowrap">
                        Bad Prompt
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <p className="text-xl text-zinc-400">
                  {selectedCategory
                    ? `Select a category and click below!`
                    : `Click the button below to generate a prompt!`}
                </p>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePrompt}
              disabled={isLoading || !promptsData || isGenerating}
              className="cursor-pointer rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-10 py-4 text-xl font-bold text-white transition-all hover:from-orange-600 hover:to-amber-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating
                ? "Generating..."
                : currentPrompt
                  ? "Next Question"
                  : "Start Game"}
            </button>
          </div>
        </div>

        {/* History & Stats Sidebar (Desktop) / Bottom Bar (Mobile) */}
        <div className="mx-auto mt-8 w-full max-w-7xl lg:mt-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Session Stats */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-zinc-400">
                Session Stats
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div>
                  <span className="text-zinc-500">Questions: </span>
                  <span className="font-bold text-orange-500">
                    {totalGenerated}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    Most Frequent Category:{" "}
                  </span>
                  <span className="text-xs font-bold text-orange-500">
                    {getMostFrequentCategory()}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    Total Possible Prompts:{" "}
                  </span>
                  <span className="font-bold text-orange-500">
                    {promptsData
                      ? calculateTotalPrompts(promptsData).toLocaleString()
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="max-h-32 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-400">
                  Recent Questions
                </h3>
                {promptHistory.length > 0 && (
                  <button
                    onClick={() => setShowHistoryModal(true)}
                    className="text-xs font-semibold text-orange-500 hover:text-orange-400"
                  >
                    View All
                  </button>
                )}
              </div>
              {promptHistory.length > 0 ? (
                <div className="space-y-1">
                  {promptHistory.slice(0, 3).map((prompt, idx) => (
                    <p
                      key={idx}
                      className="truncate text-xs text-zinc-500"
                      style={{ opacity: 1 - idx * 0.3 }}
                    >
                      {prompt}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-600">No questions yet</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-4">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-zinc-500">
            App developed by{" "}
            <a
              href="https://digitalnovastudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
            >
              DigitalNova Studio
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
