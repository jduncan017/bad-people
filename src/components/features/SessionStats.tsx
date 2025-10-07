import { useState, useEffect } from "react";
import { Card } from "~/components/ui/Card";
import type { PromptsData } from "~/types/prompts";
import {
  calculateTotalPrompts,
  getMostFrequentCategory,
} from "~/utils/promptCalculator";

interface SessionStatsProps {
  totalGenerated: number;
  categoryUsage: Record<string, number>;
  promptsData: PromptsData | null;
}

export function SessionStats({
  totalGenerated,
  categoryUsage,
  promptsData,
}: SessionStatsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card variant="stat">
      <h3 className="mb-2 text-sm font-semibold text-zinc-400">
        Session Stats
      </h3>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div>
          <span className="text-zinc-500">Questions: </span>
          <span className="font-bold text-orange-500">
            {mounted ? totalGenerated : 0}
          </span>
        </div>
        <div>
          <span className="text-zinc-500">Most Frequent Category: </span>
          <span className="text-xs font-bold text-orange-500">
            {mounted && promptsData
              ? getMostFrequentCategory(
                  categoryUsage,
                  promptsData.categoryDisplayNames,
                )
              : "None yet"}
          </span>
        </div>
        <div>
          <span className="text-zinc-500">Total Possible Prompts: </span>
          <span className="font-bold text-orange-500">
            {promptsData
              ? calculateTotalPrompts(promptsData).toLocaleString()
              : "—"}
          </span>
        </div>
      </div>
    </Card>
  );
}
