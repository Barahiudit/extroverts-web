import { cn } from "@/lib/cn";

type Tier = "bronze" | "silver" | "gold";

interface ClubBadgeProps {
  tier: Tier;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ClubBadge({ tier, size = "md", className }: ClubBadgeProps) {
  const colors: Record<Tier, string> = {
    bronze: "#c97a3e",
    silver: "#c0c0c0",
    gold: "#ffd700",
  };

  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center flex-shrink-0",
        sizes[size],
        className
      )}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill={colors[tier]}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <polygon
          points="20,8 32,14 32,26 20,32 8,26 8,14"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fontSize="14"
          fill="white"
          fontWeight="bold"
        >
          ★
        </text>
      </svg>
    </div>
  );
}