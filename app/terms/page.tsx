"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function TermsPage() {
  const router = useRouter();

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    router.push("/location");
  };

  return (
    <main className="min-h-screen flex flex-col max-w-md mx-auto">
      {/* Logo top */}
      <div className="p-6">
        <Logo size="lg" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <h1 className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-tight">
          By using this app, you're agreeing to keep things fun, safe, and
          respectful… and also agreeing to our terms and conditions. Politeness
          is a must—treat others how you'd want to be treated. Everyone here is
          looking for reasons to{" "}
          <span style={{ color: "#b57eff" }}>party</span>, so bring your best
          vibe and expect the same from others. Let's party responsibly and make
          every experience a great one!
        </h1>
      </div>

      {/* Bottom */}
      <div className="px-6 pb-10 space-y-4">
        <p className="text-center text-sm text-white/60">
          To proceed, accept{" "}
          <span className="text-white font-medium">Terms and Conditions</span>
        </p>
        <Button onClick={handleAccept}>ACCEPT</Button>
      </div>
    </main>
  );
}