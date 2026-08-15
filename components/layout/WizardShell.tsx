"use client";

import { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

interface WizardShellProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
}

export function WizardShell({
  step,
  totalSteps,
  children,
}: WizardShellProps) {
  return (
    <main className="min-h-screen w-full lg:max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <Logo size="md" />
        <p className="text-sm font-bold uppercase tracking-wide text-white">
          Getting Ready
        </p>
      </div>

      {/* Progress */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        {/* <p className="text-xs text-white/50">
          Step {step} of {totalSteps}
        </p> */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </main>
  );
}