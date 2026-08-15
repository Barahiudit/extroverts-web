"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { WizardShell } from "@/components/layout/WizardShell";
import { usernameSchema } from "@/utils/validators";
import { useSignupStore } from "@/hooks/useSignupStore";
import { Loader2, Check } from "lucide-react";

type FormData = z.infer<typeof usernameSchema>;

// Mock taken usernames
const TAKEN = ["admin", "test", "extroverts", "party"];

export default function UsernamePage() {
  const router = useRouter();
  const { data, update, hydrated } = useSignupStore();
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: { username: data.username ?? "" },
  });

  // Redirect if email not verified
  useEffect(() => {
    if (!hydrated) return;

    // If already logged in, go home
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/home?loggedIn=true");
      return;
    }

    if (!data.emailVerified) {
      router.replace("/signup/email");
    }
  }, [hydrated, data.emailVerified, router]);

  const username = watch("username");

  // Debounced availability check
  useEffect(() => {
    if (!username || errors.username) {
      setAvailable(null);
      return;
    }
    setChecking(true);
    setAvailable(null);
    const timer = setTimeout(() => {
      const taken = TAKEN.includes(username.toLowerCase());
      setAvailable(!taken);
      setChecking(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [username, errors.username]);

  const onSubmit = (values: FormData) => {
    if (available === false) {
      toast.error("Username already taken");
      return;
    }
    if (available === null) {
      toast.error("Please wait, checking availability");
      return;
    }
    update({ username: values.username });
    router.push("/signup/name");
  };

  return (
    <WizardShell step={1} totalSteps={5}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col px-6 pt-6 pb-10"
      >
        <h1 className="text-lg font-extrabold mb-6">
          Create a username that fits your vibe!
        </h1>

        <div className="relative">
          <Input
            label="Username"
            placeholder="e.g. udit11"
            autoComplete="off"
            {...register("username")}
            error={errors.username?.message}
            helperText={
              !errors.username
                ? "All your Superlatives and Invites will come your way with this name, so make it unforgettable!"
                : undefined
            }
          />
          {/* Status indicator */}
          {username && !errors.username && (
            <div className="absolute right-4 top-11">
              {checking && (
                <Loader2 className="w-5 h-5 animate-spin text-white/60" />
              )}
              {!checking && available === true && (
                <Check className="w-5 h-5 text-green-400" />
              )}
              {!checking && available === false && (
                <span className="text-red-400 text-xs font-semibold">
                  Taken
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <Button
            type="submit"
            disabled={!isValid || checking || available === false}
          >
            NEXT
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/signup/otp")}
          >
            BACK
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}