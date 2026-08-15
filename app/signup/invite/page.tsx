"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { WizardShell } from "@/components/layout/WizardShell";
import { useSignupStore } from "@/hooks/useSignupStore";

export default function InvitePage() {
    const router = useRouter();
    const { data, update, hydrated, reset } = useSignupStore();
    const [inviteCode, setInviteCode] = useState(data.inviteCode ?? "");
    const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!hydrated) return;

  const user = localStorage.getItem("user");
  if (user) {
    router.replace("/home?loggedIn=true");
    return;
  }

  if (!data.pronouns || data.pronouns.length === 0) {
    router.replace("/signup/pronouns");
  }
}, [hydrated, data.pronouns, router]);

    const handleSignup = async () => {
        setLoading(true);
        update({ inviteCode });

        await new Promise((r) => setTimeout(r, 1500));

        localStorage.setItem(
            "user",
            JSON.stringify({
                email: data.email,
                username: data.username,
                name: data.name,
                pronouns: data.pronouns,
                club: "bronze",
                hvts: inviteCode ? 30 : 0,
            })
        );

        toast.success(
            inviteCode ? "Welcome! +30 HVTs added" : "Welcome to Extroverts!"
        );

        // Navigate first, then clear signup data
        router.push("/home?loggedIn=true");

        // Clear after navigation completes
        setTimeout(() => {
            reset();
            setLoading(false);
        }, 300);
    };

    return (
        <WizardShell step={5} totalSteps={5}>
            <div className="flex-1 flex flex-col px-6 pt-6 pb-10">
                {/* Manifesto text */}
                <div className="space-y-1 mb-8">
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug">
                        Kindness = Good <span style={{ color: "#b57eff" }}>Hair</span> Day
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug">
                        Sip in? <span style={{ color: "#b57eff" }}>Chip</span> in.
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug">
                        Ghosting is for{" "}
                        <span style={{ color: "#b57eff" }}>Halloween</span>.
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug">
                        Outfits loud,{" "}
                        <span style={{ color: "#b57eff" }}>Intentions</span> clear.
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug text-white/60">
                        Joining? Free. Hosting?{" "}
                        <span style={{ color: "#b57eff" }}>Also</span> free.
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug text-white/60">
                        Early is <span style={{ color: "#b57eff" }}>Iconic</span>.
                    </p>
                    <p className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-snug text-white/60">
                        Yes. <span style={{ color: "#b57eff" }}>Spelling</span> mistake.
                    </p>
                </div>

                <Input
                    label="Enter invite code (optional)"
                    placeholder=""
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    helperText="Enter invite code and get up to +30 HVTs!"
                />

                <div className="mt-auto space-y-3">
                    <Button onClick={handleSignup} loading={loading}>
                        SIGN UP
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => router.push("/signup/pronouns")}
                        disabled={loading}
                    >
                        BACK
                    </Button>
                </div>
            </div>
        </WizardShell>
    );
}