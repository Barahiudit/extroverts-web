"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useSignupStore } from "@/hooks/useSignupStore";
import { Info } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds
const VALID_OTP = "123456"; // mock

export default function OTPPage() {
  const router = useRouter();
  const { data, update, hydrated } = useSignupStore();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no email
  useEffect(() => {
    if (!hydrated) return;

    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/home?loggedIn=true");
      return;
    }

    if (!data.email) {
      router.replace("/signup/email");
    }
  }, [hydrated, data.email, router]);

  // Resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    // Only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    // Auto focus next
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setOtp(next);

    // Focus last filled or last input
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      toast.error("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    if (code !== VALID_OTP) {
      setLoading(false);
      toast.error("Invalid OTP. Try 123456");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      return;
    }

    update({ emailVerified: true });
    setLoading(false);
    toast.success("Email verified");
    router.push("/signup/username");
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    toast.success("OTP resent");
  };

  const handleGoBack = () => {
    router.push("/signup/email");
  };

  return (
    <main className="min-h-screen flex flex-col max-w-md mx-auto">
      {/* Logo center */}
      <div className="pt-8 flex justify-center">
        <Logo size="md" />
      </div>

      <div className="flex-1 px-6 pt-10 flex flex-col">
        <h1 className="sm:text-[1.04rem] md:text-[1.4rem] font-bold uppercase tracking-wide mb-6">
          Enter OTP
        </h1>

        {/* OTP inputs */}
        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-bold bg-transparent border-b-2 border-white/30 focus:border-white outline-none transition-colors"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-sm text-white/70 hover:text-white disabled:text-white/30 transition-colors"
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button onClick={handleVerify} loading={loading}>
            VERIFY
          </Button>
          <Button variant="secondary" onClick={handleGoBack} disabled={loading}>
            GO BACK
          </Button>
        </div>

        {/* Info */}
        <p className="mt-8 text-sm text-white/50 flex items-start gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            A 6-digit OTP has been sent to{" "}
            <span className="text-white/80">{data.email}</span>. Use{" "}
            <span className="text-white/80 font-semibold">123456</span> for demo.
          </span>
        </p>
      </div>
    </main>
  );
}