import type { PromptsData } from "~/types/prompts";

interface CategorySelectorProps {
  selectedCategory: string | null;
  promptsData: PromptsData | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategorySelector({
  selectedCategory,
  promptsData,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <div className="mx-auto mb-6 w-full max-w-lg">
      <div className="relative">
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 pr-10 text-sm font-semibold text-white focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {promptsData &&
            Object.keys(promptsData.categories).map((category) => (
              <option key={category} value={category}>
                {promptsData.categoryDisplayNames[category] ?? category}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-zinc-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/* Category Description */}
      <div className="mt-3 text-center">
        {selectedCategory && promptsData ? (
          <p className="text-base font-medium text-zinc-300">
            {promptsData.categoryDescriptions[selectedCategory]}
          </p>
        ) : (
          <p className="text-base font-medium text-zinc-500">
            Showing all categories
          </p>
        )}
      </div>
    </div>
  );
}
