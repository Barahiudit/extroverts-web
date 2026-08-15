"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, labelClassName, checked, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group py-2">
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            {...props}
          />
          <div
            className={cn(
              "w-6 h-6 rounded-md border-2 border-white/40 transition-all",
              "peer-checked:bg-white peer-checked:border-white",
              "group-hover:border-white/70",
              className
            )}
          >
            {checked && (
              <Check
                className="w-4 h-4 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                strokeWidth={3}
              />
            )}
          </div>
        </div>
        <span className={cn("text-white text-sm font-medium", labelClassName)}>
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";