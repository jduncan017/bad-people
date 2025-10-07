import { useRef } from "react";
import type { ModeFrequency } from "~/types/prompts";
import { FrequencySelector } from "~/components/features/FrequencySelector";
import { useClickOutside } from "~/hooks/useClickOutside";

interface GameModesModalProps {
  isOpen: boolean;
  onClose: () => void;
  drinkingModeFrequency: ModeFrequency;
  challengeModeFrequency: ModeFrequency;
  onDrinkingFrequencyChange: (frequency: ModeFrequency) => void;
  onChallengeFrequencyChange: (frequency: ModeFrequency) => void;
}

export function GameModesModal({
  isOpen,
  onClose,
  drinkingModeFrequency,
  challengeModeFrequency,
  onDrinkingFrequencyChange,
  onChallengeFrequencyChange,
}: GameModesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div
        ref={modalRef}
        className="my-8 w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Game Modes</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
            aria-label="Close modal"
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
              <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
                Drinking Mode
              </h4>
            </div>
            <p className="mb-3 text-zinc-300">
              Mix drinking consequences into your game! Perfect for parties
              where everyone has a drink in hand.
            </p>
            <div className="mb-3">
              <p className="mb-2 text-sm font-semibold text-zinc-400">
                Frequency
              </p>
              <FrequencySelector
                currentFrequency={drinkingModeFrequency}
                onFrequencyChange={onDrinkingFrequencyChange}
              />
            </div>
            <div className="space-y-1 text-sm text-zinc-400">
              <p className="font-semibold text-zinc-300">Examples:</p>
              <p>&ldquo;Everyone drinks!&rdquo;</p>
              <p>&ldquo;Choose someone to take two drinks!&rdquo;</p>
              <p>
                &ldquo;Who&rsquo;s the biggest lightweight? They drink!&rdquo;
              </p>
            </div>
          </div>

          {/* Challenge Mode */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
                Challenge Mode
              </h4>
            </div>
            <p className="mb-3 text-zinc-300">
              Add dares, performances, and physical challenges to spice things
              up!
            </p>
            <div className="mb-3">
              <p className="mb-2 text-sm font-semibold text-zinc-400">
                Frequency
              </p>
              <FrequencySelector
                currentFrequency={challengeModeFrequency}
                onFrequencyChange={onChallengeFrequencyChange}
              />
            </div>
            <div className="space-y-1 text-sm text-zinc-400">
              <p className="font-semibold text-zinc-300">Examples:</p>
              <p>&ldquo;Do your best impression of the Dictator!&rdquo;</p>
              <p>&ldquo;Tell an embarrassing secret or lose a point!&rdquo;</p>
              <p>&ldquo;Act out: a dramatic breakup&rdquo;</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-amber-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-4">
            <p className="text-sm tracking-wider text-orange-400">
              <strong>Tip:</strong> You can enable both modes at once for
              maximum chaos, or mix them with specific categories for themed
              games!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
