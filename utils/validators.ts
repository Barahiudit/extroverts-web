import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  newsletter: z.boolean().optional(),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscore allowed"
    ),
});

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
});

export const dobSchema = z
  .object({
    dd: z.string().regex(/^\d{1,2}$/, "Invalid day"),
    mm: z.string().regex(/^\d{1,2}$/, "Invalid month"),
    yyyy: z.string().regex(/^\d{4}$/, "Invalid year"),
  })
  .refine(
    (data) => {
      const d = parseInt(data.dd);
      const m = parseInt(data.mm);
      const y = parseInt(data.yyyy);
      if (d < 1 || d > 31) return false;
      if (m < 1 || m > 12) return false;
      if (y < 1900 || y > new Date().getFullYear()) return false;
      const date = new Date(y, m - 1, d);
      return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
      );
    },
    { message: "Please enter a valid date" }
  );