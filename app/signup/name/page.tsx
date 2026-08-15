"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { WizardShell } from "@/components/layout/WizardShell";
import { nameSchema } from "@/utils/validators";
import { useSignupStore } from "@/hooks/useSignupStore";

type FormData = z.infer<typeof nameSchema>;

export default function NamePage() {
  const router = useRouter();
  const { data, update, hydrated } = useSignupStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingName, setPendingName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(nameSchema),
    mode: "onChange",
    defaultValues: { name: data.name ?? "" },
  });

 useEffect(() => {
  if (!hydrated) return;

  const user = localStorage.getItem("user");
  if (user) {
    router.replace("/home?loggedIn=true");
    return;
  }

  if (!data.username) {
    router.replace("/signup/username");
  }
}, [hydrated, data.username, router]);

  const onSubmit = (values: FormData) => {
    setPendingName(values.name);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    update({ name: pendingName });
    setConfirmOpen(false);
    router.push("/signup/age");
  };

  return (
   <WizardShell step={2} totalSteps={5}>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col px-6 pt-6 pb-10"
    >
      <h1 className="text-lg font-extrabold mb-6">
        &ldquo;Name, please, for the party check!&rdquo;
      </h1>

      <Input
        label="Name"
        placeholder="e.g. Udit"
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
        helperText={
          !errors.name
            ? "This is the name shown as on members and requests. Cannot be changed later."
            : undefined
        }
      />

    <div className="mt-auto space-y-3">
  <Button type="submit" disabled={!isValid}>
    NEXT
  </Button>
  <Button
    type="button"
    variant="secondary"
    onClick={() => router.push("/signup/username")}
  >
    BACK
  </Button>
</div>
    </form>

      {/* Confirm modal */}
      <BottomSheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="CONFIRM YOUR NAME"
      >
        <div className="py-4 space-y-6">
          <p className="text-white/70 leading-relaxed">
            You entered:{" "}
            <span className="text-white font-bold">{pendingName}</span>
            <br />
            This name <span className="text-orange-400">cannot be changed later</span>.
            Are you sure?
          </p>
          <div className="space-y-3">
            <Button onClick={handleConfirm}>YES, CONFIRM</Button>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              EDIT
            </Button>
          </div>
        </div>
      </BottomSheet>
    </WizardShell>
  );
}