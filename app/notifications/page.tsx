"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Logo } from "@/components/ui/Logo";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-4 py-5">
         <div className=" flex justify-center">
        <Logo size="sm" />
      </div>
        <h1 className="text-lg font-bold uppercase tracking-wide">Notifications</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={<Bell className="w-16 h-16" strokeWidth={1.5} />}
          title="No notifications yet"
          description="Updates about your parties, requests, and superlatives will appear here."
        />
      </div>

      <div className="px-6 pb-10">
        <Button variant="secondary" onClick={() => router.back()}>
          EXIT
        </Button>
      </div>
    </main>
  );
}