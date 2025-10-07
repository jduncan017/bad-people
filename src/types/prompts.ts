export type PromptsData = {
  categories: Record<string, string[]>;
  templates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
    category?: string;
  }>;
  drinkingModeTemplates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
  }>;
  challengeModeTemplates: Array<{
    pattern: string;
    slots: Record<string, string | string[]>;
  }>;
  baseLists: Record<string, string[]>;
  categoryDisplayNames: Record<string, string>;
  categoryDescriptions: Record<string, string>;
};

export type ModeFrequency = "off" | "low" | "med" | "high";

export type Template = {
  pattern: string;
  slots: Record<string, string | string[]>;
  category?: string;
};

export type PromptSource = {
  type: "static" | "template";
  content: string | Template;
  category: string;
  mode: "drinking" | "challenge" | null;
};

export type SessionStats = {
  shownPrompts: Set<string>;
  promptHistory: string[];
  badPrompts: string[];
  totalGenerated: number;
  categoryUsage: Record<string, number>;
};
