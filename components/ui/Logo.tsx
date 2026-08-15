import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "lg" }: LogoProps) {
  const sizes = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl",
  };

  const dotStyles = {
    sm: {
      size: "w-1.5 h-1.5",
      top: "0.4em",
      right: "-0.3em",
    },
    md: {
      size: "w-2 h-2",
      top: "0.25em",
      right: "-0.32em",
    },
    lg: {
      size: "w-3 h-3",
      top: "0.7em",
      right: "-0.65em",
    },
  };

  const current = dotStyles[size];

  return (
    <div className={cn("relative inline-block font-serif font-bold leading-none", className)}>
      <span className={sizes[size]}>E</span>
      <span
        className={cn("absolute rounded-full bg-white", current.size)}
        style={{
          top: current.top,
          right: current.right,
        }}
      />
    </div>
  );
}