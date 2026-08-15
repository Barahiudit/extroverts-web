"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full lg:max-w-md mx-auto flex flex-col items-center justify-center px-6 text-center">
      <Logo size="lg" className="mb-8" />
      <h1 className="text-4xl font-extrabold uppercase mb-3">Lost the vibe?</h1>
      <p className="text-white/60 mb-8">
        This page doesn&apos;t exist. Let&apos;s get you back to the party.
      </p>
      <div className="w-full">
        <Button onClick={() => router.push("/")}>GO HOME</Button>
      </div>
    </main>
  );
}