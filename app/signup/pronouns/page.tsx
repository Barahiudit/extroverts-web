"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { WizardShell } from "@/components/layout/WizardShell";
import { useSignupStore } from "@/hooks/useSignupStore";
import { PRONOUNS } from "@/data/pronouns";

const MAX_PRONOUNS = 3;

export default function PronounsPage() {
  const router = useRouter();
  const { data, update, hydrated } = useSignupStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(data.pronouns ?? []);

useEffect(() => {
  if (!hydrated) return;

  const user = localStorage.getItem("user");
  if (user) {
    router.replace("/home?loggedIn=true");
    return;
  }

  if (!data.dob) {
    router.replace("/signup/age");
  }
}, [hydrated, data.dob, router]);

  const toggle = (pronoun: string) => {
    setSelected((prev) => {
      if (prev.includes(pronoun)) {
        return prev.filter((p) => p !== pronoun);
      }
      if (prev.length >= MAX_PRONOUNS) {
        toast.error(`You can select up to ${MAX_PRONOUNS} pronouns`);
        return prev;
      }
      return [...prev, pronoun];
    });
  };

  const handleSave = () => {
    if (selected.length === 0) {
      toast.error("Please select at least one pronoun");
      return;
    }
    update({ pronouns: selected });
    setOpen(false);
    toast.success("Pronouns saved");
  };

  const handleNext = () => {
    if (!data.pronouns || data.pronouns.length === 0) {
      toast.error("Please select your pronouns");
      return;
    }
    router.push("/signup/invite");
  };

  const displayValue = data.pronouns?.join(", ") ?? "";

  return (
    <WizardShell step={4} totalSteps={5}>
      <div className="flex-1 flex flex-col px-6 pt-6 pb-10">
        <h1 className="text-lg font-extrabold mb-6">
          Which pronouns feel right for you?
        </h1>

        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <Input
            label="Pronouns"
            placeholder="Tap to select"
            value={displayValue}
            readOnly
            helperText="Select the pronouns that feel right for you."
          />
        </div>

      <div className="mt-auto space-y-3">
  <Button onClick={handleNext} disabled={!data.pronouns?.length}>
    NEXT
  </Button>
  <Button
    variant="secondary"
    onClick={() => router.push("/signup/age")}
  >
    BACK
  </Button>
</div>
      </div>

      {/* Pronouns Bottom Sheet */}
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="SELECT PRONOUNS"
        subtitle={`Select up to ${MAX_PRONOUNS} · ${selected.length}/${MAX_PRONOUNS} selected`}
      >
        <div className="py-2 space-y-1 max-h-[50vh] overflow-y-auto">
          {PRONOUNS.map((pronoun) => (
            <Checkbox
              key={pronoun}
              label={pronoun}
              checked={selected.includes(pronoun)}
              onChange={() => toggle(pronoun)}
            />
          ))}
        </div>

        <div className="mt-4">
          <Button onClick={handleSave}>SAVE</Button>
        </div>
      </BottomSheet>
    </WizardShell>
  );
}