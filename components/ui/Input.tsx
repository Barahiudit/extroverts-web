"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent border border-white/20 rounded-md px-5 py-3 text-white text-lg font-medium",
            "focus:outline-none focus:border-white/60 transition-colors",
            "placeholder:text-white/30",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
        {!error && helperText && (
          <p className="mt-3 text-sm text-white/50 leading-relaxed">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";