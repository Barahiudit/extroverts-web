"use client";

import { Logo } from "@/components/ui/Logo";
import { Bell, MessageCircle, Star, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isLoggedIn?: boolean;
  vipCount?: number;
  mailCount?: number;
}

export function Header({ isLoggedIn = false, vipCount = 0, mailCount = 0 }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-5">
      <Logo size="sm" />

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button className="relative" aria-label="Messages">
              <Mail className="w-6 h-6 text-white fill-blue-400" strokeWidth={1.5} />
              {mailCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {mailCount}
                </span>
              )}
            </button>
            <button aria-label="Notifications" onClick={() => router.push("/notifications")}>
              <Bell className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
            <button aria-label="Superlatives">
              <Star className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 border border-white/30 rounded-full px-3 py-1.5">
              <span className="text-xs font-bold" style={{ color: "#b57eff" }}>
                VIP
              </span>
              <span className="text-sm font-semibold">{vipCount}</span>
            </div>
            <button aria-label="Notifications" onClick={() => router.push("/notifications")}>
              <Bell className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
            <button aria-label="Messages">
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}