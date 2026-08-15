"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { WizardShell } from "@/components/layout/WizardShell";
import { useSignupStore } from "@/hooks/useSignupStore";
import { calculateAge } from "@/utils/age";
import { dobSchema } from "@/utils/validators";

export default function AgePage() {
    const router = useRouter();
    const { data, update, hydrated } = useSignupStore();
    const [dobOpen, setDobOpen] = useState(false);

    const [dd, setDd] = useState(data.dob?.dd ?? "");
    const [mm, setMm] = useState(data.dob?.mm ?? "");
    const [yyyy, setYyyy] = useState(data.dob?.yyyy ?? "");
    const [error, setError] = useState<string | null>(null);

    // Display age (readonly)
    const age = data.dob
        ? calculateAge(data.dob.dd, data.dob.mm, data.dob.yyyy)
        : null;
    const displayAge = age !== null ? `${age}` : "";

    useEffect(() => {
        if (!hydrated) return;

        const user = localStorage.getItem("user");
        if (user) {
            router.replace("/home?loggedIn=true");
            return;
        }

        if (!data.name) {
            router.replace("/signup/name");
        }
    }, [hydrated, data.name, router]);

    const handleDobSubmit = () => {
        setError(null);
        const parsed = dobSchema.safeParse({ dd, mm, yyyy });
        if (!parsed.success) {
            setError(parsed.error.issues[0].message);
            return;
        }

        const calculatedAge = calculateAge(dd, mm, yyyy);

        if (calculatedAge < 18) {
            setError(
                "You must be at least 18 years old to use this app."
            );
            toast.error("Age must be 18 or above");
            return;
        }

        update({ dob: { dd, mm, yyyy } });
        setDobOpen(false);
        toast.success("Date of birth saved");
    };

    const handleNext = () => {
        if (!data.dob) {
            toast.error("Please enter your date of birth");
            return;
        }
        router.push("/signup/pronouns");
    };

    return (
        <WizardShell step={3} totalSteps={5}>
            <div className="flex-1 flex flex-col px-6 pt-6 pb-10">
                <h1 className="text-lg font-extrabold mb-6">
                    How many years have you been partying?
                </h1>

                <div onClick={() => setDobOpen(true)} className="cursor-pointer">
                    <Input
                        label="Age"
                        placeholder="Tap to enter date of birth"
                        value={displayAge}
                        readOnly
                        helperText="We need your age to verify you're eligible and help others know who they're connecting with."
                    />
                </div>

                <div className="mt-auto space-y-3">
                    <Button onClick={handleNext} disabled={!data.dob}>
                        NEXT
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => router.push("/signup/name")}
                    >
                        BACK
                    </Button>
                </div>
            </div>

            {/* DOB Bottom Sheet */}
            <BottomSheet
                open={dobOpen}
                onClose={() => setDobOpen(false)}
                title="DATE OF BIRTH"
            >
                <div className="py-4 space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="DD"
                            maxLength={2}
                            name="birth-day"
                            autoComplete="bday-day"
                            value={dd}
                            onChange={(e) => setDd(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-transparent border border-white/20 rounded-2xl px-4 py-4 text-white text-lg font-medium text-center focus:outline-none focus:border-white/60"
                        />
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="MM"
                            maxLength={2}
                            name="birth-month"
                            autoComplete="bday-month"
                            value={mm}
                            onChange={(e) => setMm(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-transparent border border-white/20 rounded-2xl px-4 py-4 text-white text-lg font-medium text-center focus:outline-none focus:border-white/60"
                        />
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="YYYY"
                            maxLength={4}
                            name="birth-year"
                            autoComplete="bday-year"
                            value={yyyy}
                            onChange={(e) => setYyyy(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-transparent border border-white/20 rounded-2xl px-4 py-4 text-white text-lg font-medium text-center focus:outline-none focus:border-white/60"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 leading-relaxed">{error}</p>
                    )}

                    <Button onClick={handleDobSubmit}>PROCEED</Button>
                </div>
            </BottomSheet>
        </WizardShell>
    );
}