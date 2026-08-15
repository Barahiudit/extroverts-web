"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Logo } from "@/components/ui/Logo";
import { emailSchema } from "@/utils/validators";
import { useSignupStore } from "@/hooks/useSignupStore";

type FormData = z.infer<typeof emailSchema>;

export default function EmailPage() {
  const router = useRouter();
  const { data, update, hydrated } = useSignupStore();
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState(data.newsletter ?? false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: data.email ?? "",
      newsletter: data.newsletter ?? false,
    },
  });

  useEffect(() => {
    if (!hydrated) return;
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/home?loggedIn=true");
    }
  }, [hydrated, router]);

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    update({
      email: values.email,
      newsletter,
      emailVerified: false,
    });

    setLoading(false);
    toast.success("OTP sent to your email");
    router.push("/signup/otp");
  };

  return (
    <main className="min-h-screen w-full lg:max-w-md mx-auto flex flex-col">
      <div className="p-6">
        <Logo size="md" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-6 pt-8 flex flex-col"
      >
        <h1 className="text-3xl font-extrabold mb-8">Enter your email</h1>

        <Input
          label="Email"
          placeholder="EMAIL"
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="mt-6 space-y-4">
          <Button type="submit" loading={loading}>
            PROCEED
          </Button>

          <Checkbox
            label="I'd like to subscribe to your newsletter"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            labelClassName="text-[11px] md:text-sm"
          />
        </div>
      </form>
    </main>
  );
}