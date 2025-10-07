import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import type { ModeFrequency } from "~/types/prompts";

/**
 * Custom hook that manages game mode settings (drinking and challenge modes)
 * with cookie persistence.
 */
export function useGameModes() {
  const [drinkingModeFrequency, setDrinkingModeFrequency] =
    useState<ModeFrequency>("off");

  const [challengeModeFrequency, setChallengeModeFrequency] =
    useState<ModeFrequency>("off");

  // Load mode frequencies from cookies on mount
  useEffect(() => {
    const drinkingMode = Cookies.get("drinkingModeFrequency") as
      | ModeFrequency
      | undefined;
    const challengeMode = Cookies.get("challengeModeFrequency") as
      | ModeFrequency
      | undefined;

    if (drinkingMode) {
      setDrinkingModeFrequency(drinkingMode);
    }
    if (challengeMode) {
      setChallengeModeFrequency(challengeMode);
    }
  }, []);

  // Save drinking mode frequency to cookies whenever it changes
  useEffect(() => {
    Cookies.set("drinkingModeFrequency", drinkingModeFrequency, {
      expires: 365,
    });
  }, [drinkingModeFrequency]);

  // Save challenge mode frequency to cookies whenever it changes
  useEffect(() => {
    Cookies.set("challengeModeFrequency", challengeModeFrequency, {
      expires: 365,
    });
  }, [challengeModeFrequency]);

  return {
    drinkingModeFrequency,
    setDrinkingModeFrequency,
    challengeModeFrequency,
    setChallengeModeFrequency,
  };
}
