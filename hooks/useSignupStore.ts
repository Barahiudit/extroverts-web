"use client";

import { useEffect, useState } from "react";

export type SignupData = {
  email?: string;
  newsletter?: boolean;
  emailVerified?: boolean;
  username?: string;
  name?: string;
  dob?: { dd: string; mm: string; yyyy: string };
  pronouns?: string[];
  inviteCode?: string;
};

const STORAGE_KEY = "signupData";

export function useSignupStore() {
  const [data, setData] = useState<SignupData>({});
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData({});
      }
    }
    setHydrated(true);
  }, []);

  const update = (patch: Partial<SignupData>) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const reset = () => {
    setData({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return { data, update, reset, hydrated };
}