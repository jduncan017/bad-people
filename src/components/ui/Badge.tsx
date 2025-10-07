import type { ReactNode } from "react";

type BadgeVariant = "drinking" | "challenge" | "off" | "low" | "med" | "high";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  drinking: "border-blue-500/30 bg-blue-500/20 text-blue-400",
  challenge: "border-purple-500/30 bg-purple-500/20 text-purple-400",
  off: "bg-zinc-600 text-white",
  low: "bg-green-600 text-white",
  med: "bg-yellow-600 text-white",
  high: "bg-red-600 text-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export function Badge({ variant, size = "md", children }: BadgeProps) {
  const baseStyles = variant === "drinking" || variant === "challenge"
    ? "border"
    : "";

  return (
    <span
      className={`
        inline-block rounded-full font-bold uppercase tracking-wide
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {children}
    </span>
  );
}
