import { useRef } from "react";
import { useClickOutside } from "~/hooks/useClickOutside";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div
        ref={modalRef}
        className="my-8 w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-2xl font-bold text-white">How to Play</h3>
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
        <div className="max-h-[60vh] space-y-3 overflow-y-auto text-zinc-300">
          <div className="space-y-1">
            <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
              Objective
            </h4>
            <p>
              Be the first player to score 7 points by correctly guessing who
              the Dictator chooses.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
              Setup
            </h4>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>
                Each player chooses an Identity Card and places it face up in
                front of them
              </li>
              <li>
                Each player collects Voting Cards for every person playing
                (including themselves)
              </li>
              <li>Each player gets one Double Down card</li>
              <li>The last person to arrive begins as the Dictator</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
              How to Play
            </h4>
            <ol className="list-inside list-decimal space-y-2 text-zinc-300">
              <li>
                <strong>Generate a Question:</strong> The Dictator uses this app
                to generate a random question by clicking &ldquo;Next
                Question&rdquo;
              </li>
              <li>
                <strong>Dictator Votes:</strong> The Dictator silently chooses
                one player who best fits the question (can vote for anyone,
                including themselves) and places that player&rsquo;s Voting Card
                face down
              </li>
              <li>
                <strong>Players Vote:</strong> All other players must guess who
                the Dictator voted for and place their vote face down (players
                can vote for themselves)
              </li>
              <li>
                <strong>Reveal:</strong> Everyone reveals their votes
                simultaneously
              </li>
            </ol>
          </div>

          <div className="space-y-1">
            <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
              Scoring
            </h4>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>
                Players who voted the same as the Dictator receive 1 point
              </li>
              <li>
                <strong>Double Down:</strong> If you use your Double Down card
                and vote the same as the Dictator, you get 2 points. But if
                you&rsquo;re wrong, you lose it for the rest of the game!
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <h4 className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-xl font-bold text-transparent">
              Winning
            </h4>
            <p className="text-zinc-300">
              The first player to score 7 points wins the game!
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-amber-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-4">
            <p className="text-sm tracking-wider text-orange-400">
              <strong>Note:</strong> This digital version replaces the physical
              question cards. Use your physical Identity Cards, Voting Cards,
              and Double Down cards to play. Simply generate questions using
              this app instead of drawing from the deck!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
