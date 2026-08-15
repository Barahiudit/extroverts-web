"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { EventCard } from "@/components/event/EventCard";
import { ClubBadge } from "@/components/ui/ClubBadge";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { RotatingText } from "@/components/ui/RotatingText";
import { events } from "@/data/events";
import { Star } from "lucide-react";


type User = {
  email: string;
  username: string;
  name: string;
  pronouns: string[];
  club: "bronze" | "silver" | "gold";
  hvts: number;
};

function HomeContent() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAuthSheet, setShowAuthSheet] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch { }
    }
  }, [searchParams]);

  const isLoggedIn = !!user;

  const handleJoin = () => {
    if (isLoggedIn) return;
    setShowAuthSheet(true);
  };

  const handleGetStarted = () => {
    setShowAuthSheet(false);
    router.push("/signup/email");
  };

  const clubTier = user?.club ?? "silver";
  const clubLabel = user
    ? `${user.club.charAt(0).toUpperCase() + user.club.slice(1)} Club Member`
    : "Silver Club Member";

  return (
    <main className="min-h-screen flex flex-col w-full lg:max-w-md mx-auto pb-24">
      <Header
        isLoggedIn={isLoggedIn}
        vipCount={0}
        mailCount={isLoggedIn ? 3 : 0}
      />

      {/* Your Club */}
      <div className="px-4 space-y-3">
        <p className="text-xs text-white/60 uppercase tracking-wide mb-1">
          Your Club
        </p>
        <div className="relative border border-white/20 rounded-md px-5 py-4 flex items-center justify-between overflow-hidden mb-1">
          <span className="text-lg font-semibold">{clubLabel}</span>
          <ClubBadge tier={clubTier} size="md" />
          {/* progress bar */}
          <div
            className="absolute bottom-0 left-0 h-1 bg-white/70"
            style={{ width: user?.club === "bronze" ? "20%" : "70%" }}
          />
        </div>

        {/* HVT counter */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
          <RotatingText
            texts={
              isLoggedIn
                ? [
                  `You have ${user!.hvts} Honorary Vibe Tokens!`,
                  "Earn HVTs by hosting events",
                  "Invite friends to earn more",
                ]
                : [
                  "20 HVTs to Golden Club",
                  "Earn HVTs by hosting events",
                  "Invite friends to earn more",
                ]
            }
            interval={3000}
            className="flex-1"
          />
        </div>
      </div>

      {/* Events */}
      <div className="px-4 mt-6 space-y-5">
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            onJoin={handleJoin}
            isLoggedIn={isLoggedIn}
            spotsLeft={isLoggedIn && i === 1 ? 3 : undefined}
          />
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-white/30 mt-10">
        Extroverts 2026 | v1.8.5 | Himanshu
      </p>

      {/* Bottom nav when logged in */}
      {isLoggedIn && <BottomNav />}

      {/* Auth Bottom Sheet */}
      <BottomSheet
        open={showAuthSheet}
        onClose={() => setShowAuthSheet(false)}
        title="YOU NEED AN ACCOUNT"
      >
        <div className="py-4 space-y-6">
          <p className="text-[12px] text-center text-white/70 leading-relaxed">
            Create an account to join events, earn HVTs, and party with
            extroverts near you- all for free!
          </p>
          <div className="space-y-3">
            <Button onClick={handleGetStarted}>GET STARTED</Button>
            <Button variant="secondary" onClick={() => setShowAuthSheet(false)}>
              MAYBE LATER
            </Button>
          </div>
        </div>
      </BottomSheet>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}