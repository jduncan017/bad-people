import { useState, useEffect } from "react";
import { Card } from "~/components/ui/Card";

interface RecentHistoryProps {
  promptHistory: string[];
  onViewAll: () => void;
}

export function RecentHistory({
  promptHistory,
  onViewAll,
}: RecentHistoryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayHistory = mounted ? promptHistory : [];

  return (
    <Card variant="stat" className="max-h-32 overflow-y-auto">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-400">
          Recent Questions
        </h3>
        {displayHistory.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-orange-500 hover:text-orange-400"
          >
            View All
          </button>
        )}
      </div>
      {displayHistory.length > 0 ? (
        <div className="space-y-1">
          {displayHistory.slice(0, 3).map((prompt, idx) => (
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
    </Card>
  );
}
