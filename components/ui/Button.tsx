"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className,
  fullWidth = true,
  ...props
}: ButtonProps) {
  const base =
    "rounded-md font-semibold text-base py-3 px-6 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-white text-black hover:bg-gray-100 disabled:bg-neutral-700 disabled:text-neutral-400",
    secondary:
      "bg-transparent text-white border border-white/40 hover:bg-white/5 disabled:border-neutral-700 disabled:text-neutral-500",
    ghost:
      "bg-transparent text-white hover:bg-white/5 disabled:text-neutral-500",
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}