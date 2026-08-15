"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-md bg-neutral-950 border-t border-white/10 sm:border sm:rounded-3xl rounded-t-3xl px-6 py-6 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Drag handle (mobile) */}
        <div className="sm:hidden w-10 h-1 bg-white/50 rounded-full mx-auto mb-6" />

        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          {title ? (
            <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {subtitle && (
          <p className="text-sm text-white/60 mb-4">{subtitle}</p>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}