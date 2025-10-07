import type { ModeFrequency } from "~/types/prompts";

interface FrequencySelectorProps {
  currentFrequency: ModeFrequency;
  onFrequencyChange: (frequency: ModeFrequency) => void;
}

const frequencies: ModeFrequency[] = ["off", "low", "med", "high"];

const frequencyColors: Record<
  ModeFrequency,
  { active: string; inactive: string }
> = {
  off: {
    active: "bg-zinc-500/70 text-white",
    inactive: "text-zinc-400 hover:text-white",
  },
  low: {
    active: "bg-green-500/70 text-white",
    inactive: "text-zinc-400 hover:text-white",
  },
  med: {
    active: "bg-yellow-500/70 text-white",
    inactive: "text-zinc-400 hover:text-white",
  },
  high: {
    active: "bg-red-500/70 text-white",
    inactive: "text-zinc-400 hover:text-white",
  },
};

export function FrequencySelector({
  currentFrequency,
  onFrequencyChange,
}: FrequencySelectorProps) {
  return (
    <div className="flex gap-1 rounded-full bg-zinc-800 p-1">
      {frequencies.map((freq) => {
        const colors =
          currentFrequency === freq
            ? frequencyColors[freq].active
            : frequencyColors[freq].inactive;

        return (
          <button
            key={freq}
            onClick={() => onFrequencyChange(freq)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-all ${colors}`}
          >
            {freq.charAt(0).toUpperCase() + freq.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
