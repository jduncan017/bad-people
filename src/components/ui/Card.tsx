import type { ReactNode } from "react";

type CardVariant = "default" | "gradient" | "stat";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: "rounded-xl border border-zinc-800 bg-zinc-900/50 p-4",
  gradient:
    "rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-700/80 to-zinc-800/80 p-10 shadow-lg",
  stat: "rounded-xl border border-zinc-800 bg-zinc-900/50 p-4",
};

export function Card({
  variant = "default",
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${className}`}>{children}</div>
  );
}
