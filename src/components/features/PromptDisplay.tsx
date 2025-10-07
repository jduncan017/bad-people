import { Card } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";

interface PromptDisplayProps {
  isLoading: boolean;
  isGenerating: boolean;
  currentPrompt: string;
  currentPromptMode: string | null;
  revealedChars: number;
  badPrompts: string[];
  onDownvote: () => void;
}

export function PromptDisplay({
  isLoading,
  isGenerating,
  currentPrompt,
  currentPromptMode,
  revealedChars,
  badPrompts,
  onDownvote,
}: PromptDisplayProps) {
  return (
    <Card
      variant="gradient"
      className="relative flex min-h-[220px] w-full max-w-3xl flex-col items-center justify-center text-center"
    >
      {isLoading ? (
        <p className="text-xl text-zinc-400">Loading...</p>
      ) : isGenerating ? (
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-amber-500/70"
              style={{
                animation: `wave 0.9s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      ) : currentPrompt ? (
        <>
          {currentPromptMode && (
            <div className="mb-3">
              <Badge variant={currentPromptMode as "drinking" | "challenge"}>
                {currentPromptMode === "drinking" ? "🍺 Drink" : "🎭 Challenge"}
              </Badge>
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
            onClick={onDownvote}
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
          Click the button below to generate a prompt!
        </p>
      )}
    </Card>
  );
}
