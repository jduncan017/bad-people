"use client";

import { useState, useEffect } from "react";
import type { PromptsData } from "~/types/prompts";
import { buildPromptPool, generateUniquePrompt } from "~/utils/promptGenerator";
import { Button } from "~/components/ui/Button";
import { useSessionStats } from "~/hooks/useSessionStats";
import { useGameModes } from "~/hooks/useGameModes";
import { PromptDisplay } from "~/components/features/PromptDisplay";
import { CategorySelector } from "~/components/features/CategorySelector";
import { SessionStats } from "~/components/features/SessionStats";
import { RecentHistory } from "~/components/features/RecentHistory";
import { GameModesModal } from "~/components/modals/GameModesModal";
import { InstructionsModal } from "~/components/modals/InstructionsModal";
import { HistoryModal } from "~/components/modals/HistoryModal";
import { ResetModal } from "~/components/modals/ResetModal";
import { Nav } from "~/components/layout/Nav";
import { Footer } from "~/components/layout/Footer";

export default function HomePage() {
  // Custom hooks
  const {
    shownPrompts,
    promptHistory,
    badPrompts,
    totalGenerated,
    categoryUsage,
    addPromptToHistory,
    markPromptAsBad,
    clearShownPrompts,
    resetSession: resetSessionStats,
  } = useSessionStats();

  const {
    drinkingModeFrequency,
    setDrinkingModeFrequency,
    challengeModeFrequency,
    setChallengeModeFrequency,
  } = useGameModes();

  // Local state
  const [promptsData, setPromptsData] = useState<PromptsData | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentPromptMode, setCurrentPromptMode] = useState<string | null>(
    null,
  );
  const [revealedChars, setRevealedChars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allPromptsExhausted, setAllPromptsExhausted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showModesModal, setShowModesModal] = useState(false);


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

  const generatePrompt = () => {
    if (!promptsData || isGenerating) return;

    // Check if we've exhausted all possible prompts
    if (allPromptsExhausted) {
      // Reset and start over
      clearShownPrompts();
      setAllPromptsExhausted(false);
    }

    setIsGenerating(true);
    setCurrentPrompt(""); // Clear immediately to prevent flash
    setRevealedChars(0);

    // Small delay to ensure state updates
    setTimeout(() => {
      // Build pool of available prompts
      const promptPool = buildPromptPool(
        promptsData,
        selectedCategory,
        drinkingModeFrequency,
        challengeModeFrequency,
      );

      if (promptPool.length === 0) {
        setIsGenerating(false);
        return;
      }

      // Generate unique prompt
      const { prompt, category, mode } = generateUniquePrompt(
        promptPool,
        promptsData,
        shownPrompts,
      );

      // If we couldn't find a unique prompt, all have been exhausted
      if (!prompt) {
        setAllPromptsExhausted(true);
        setCurrentPrompt(
          "🎉 You've seen all the prompts! Click again to restart.",
        );
        setIsGenerating(false);
        return;
      }

      // Update state
      setCurrentPrompt(prompt);
      setCurrentPromptMode(mode);
      addPromptToHistory(prompt, category);

      setIsGenerating(false);
    }, 400);
  };

  const downvotePrompt = () => {
    if (!currentPrompt) return;
    markPromptAsBad(currentPrompt);
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
    resetSessionStats();
    setCurrentPrompt("");
    setRevealedChars(0);
    setAllPromptsExhausted(false);
    setShowResetModal(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Nav
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onShowInstructions={() => setShowInstructionsModal(true)}
        onShowModes={() => setShowModesModal(true)}
        onEmailBadPrompts={emailBadPrompts}
        onShowReset={() => setShowResetModal(true)}
        drinkingModeFrequency={drinkingModeFrequency}
        challengeModeFrequency={challengeModeFrequency}
        badPromptsCount={badPrompts.length}
      />

      <GameModesModal
        isOpen={showModesModal}
        onClose={() => setShowModesModal(false)}
        drinkingModeFrequency={drinkingModeFrequency}
        challengeModeFrequency={challengeModeFrequency}
        onDrinkingFrequencyChange={setDrinkingModeFrequency}
        onChallengeFrequencyChange={setChallengeModeFrequency}
      />

      <InstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
      />

      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        promptHistory={promptHistory}
      />

      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={resetSession}
      />

      <main className="flex flex-1 flex-col items-center justify-between bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 pt-24 text-white lg:p-8">
        {/* Category Dropdown */}
        <CategorySelector
          selectedCategory={selectedCategory}
          promptsData={promptsData}
          onCategoryChange={setSelectedCategory}
        />

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
            <PromptDisplay
              isLoading={isLoading}
              isGenerating={isGenerating}
              currentPrompt={currentPrompt}
              currentPromptMode={currentPromptMode}
              revealedChars={revealedChars}
              badPrompts={badPrompts}
              selectedCategory={selectedCategory}
              onDownvote={downvotePrompt}
            />

            {/* Generate Button */}
            <Button
              onClick={generatePrompt}
              disabled={isLoading || !promptsData || isGenerating}
              variant="primary"
              size="lg"
              loading={isGenerating}
            >
              {currentPrompt ? "Next Question" : "Start Game"}
            </Button>
          </div>
        </div>

        {/* History & Stats Sidebar (Desktop) / Bottom Bar (Mobile) */}
        <div className="mx-auto mt-8 w-full max-w-7xl lg:mt-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SessionStats
              totalGenerated={totalGenerated}
              categoryUsage={categoryUsage}
              promptsData={promptsData}
            />
            <RecentHistory
              promptHistory={promptHistory}
              onViewAll={() => setShowHistoryModal(true)}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
