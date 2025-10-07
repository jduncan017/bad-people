import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { clearSessionStorage } from "~/utils/storage";

/**
 * Custom hook that manages session statistics with localStorage persistence.
 * Provides state management for shown prompts, history, bad prompts, and category usage.
 */
export function useSessionStats() {
  // Store shown prompts as an array in localStorage, convert to Set for usage
  const [shownPromptsArray, setShownPromptsArray] = useLocalStorage<string[]>(
    "shownPrompts",
    [],
  );

  const [promptHistory, setPromptHistory] = useLocalStorage<string[]>(
    "promptHistory",
    [],
  );

  const [badPrompts, setBadPrompts] = useLocalStorage<string[]>(
    "badPrompts",
    [],
  );

  const [totalGenerated, setTotalGenerated] = useLocalStorage<number>(
    "totalGenerated",
    0,
  );

  const [categoryUsage, setCategoryUsage] = useLocalStorage<
    Record<string, number>
  >("categoryUsage", {});

  // Convert array to Set for efficient lookups
  const shownPrompts = useMemo(
    () => new Set(shownPromptsArray),
    [shownPromptsArray],
  );

  /**
   * Adds a new prompt to the session history
   */
  const addPromptToHistory = (
    prompt: string,
    category: string | null,
  ): void => {
    // Add to shown prompts array
    setShownPromptsArray((prev) => {
      if (prev.includes(prompt)) return prev;
      return [...prev, prompt];
    });

    // Add to history array (keep last 50)
    setPromptHistory((prev) => {
      const newHistory = [prompt, ...prev].slice(0, 50);
      return newHistory;
    });

    // Update total generated count
    setTotalGenerated((prev) => prev + 1);

    // Update category usage
    if (category) {
      setCategoryUsage((prev) => ({
        ...prev,
        [category]: (prev[category] ?? 0) + 1,
      }));
    }
  };

  /**
   * Toggles a prompt as bad (inappropriate/buggy)
   */
  const markPromptAsBad = (prompt: string): void => {
    setBadPrompts((prev) => {
      if (prev.includes(prompt)) {
        // Toggle off - remove from bad prompts
        return prev.filter((p) => p !== prompt);
      }
      // Add to bad prompts
      return [...prev, prompt];
    });
  };

  /**
   * Clears the shown prompts set (useful when exhausted)
   */
  const clearShownPrompts = (): void => {
    setShownPromptsArray([]);
  };

  /**
   * Resets all session statistics
   */
  const resetSession = (): void => {
    clearSessionStorage();
    setShownPromptsArray([]);
    setPromptHistory([]);
    setBadPrompts([]);
    setTotalGenerated(0);
    setCategoryUsage({});
  };

  return {
    shownPrompts,
    promptHistory,
    badPrompts,
    totalGenerated,
    categoryUsage,
    addPromptToHistory,
    markPromptAsBad,
    clearShownPrompts,
    resetSession,
  };
}
