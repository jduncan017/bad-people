import { useRef } from "react";
import type { ModeFrequency } from "~/types/prompts";
import { useClickOutside } from "~/hooks/useClickOutside";

interface NavProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onShowInstructions: () => void;
  onShowModes: () => void;
  onEmailBadPrompts: () => void;
  onShowReset: () => void;
  drinkingModeFrequency: ModeFrequency;
  challengeModeFrequency: ModeFrequency;
  badPromptsCount: number;
}

export function Nav({
  isMenuOpen,
  onMenuToggle,
  onShowInstructions,
  onShowModes,
  onEmailBadPrompts,
  onShowReset,
  drinkingModeFrequency,
  challengeModeFrequency,
  badPromptsCount,
}: NavProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => onMenuToggle(), isMenuOpen);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <h2 className="text-lg font-bold text-white">
          Bad <span className="text-orange-500">People</span>
        </h2>
        <div className="relative">
          <button
            onClick={onMenuToggle}
            className="p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
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
                    onShowInstructions();
                    onMenuToggle();
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
                    onShowModes();
                    onMenuToggle();
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
                  onClick={onEmailBadPrompts}
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
                  Report Bad Prompts ({badPromptsCount})
                </button>
                <button
                  onClick={() => {
                    onShowReset();
                    onMenuToggle();
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
  );
}
