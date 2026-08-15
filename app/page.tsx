"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, #ff4500 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, #00c8ff 0%, transparent 45%), radial-gradient(ellipse at 50% 60%, #ff1493 0%, transparent 35%), radial-gradient(ellipse at 30% 80%, #9d4edd 0%, transparent 40%), #000",
        }}
      />

      {/* Dark overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto w-full">
        {/* Center logo */}
        <div className="flex-1 flex items-center justify-center">
          <Logo size="lg" />
        </div>

        {/* Bottom section */}
        <div className="px-6 pb-10 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              An App Only For
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              Extroverts
            </h1>
          </div>

          <p className="text-center text-[11px] text-white/80 leading-relaxed  px-2">
            <span className="text-red-400 font-semibold">Warning:</span>{" "}
            Entering may lead to spontaneous dancing and unsolicited high-fives!
          </p>

          <Button onClick={() => router.push("/terms")}>CONTINUE</Button>
        </div>
      </div>
    </main>
  );
}