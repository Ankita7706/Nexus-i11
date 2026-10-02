import { z } from "zod";

export const registrationSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(2, "Team name must contain at least 2 characters")
    .max(60, "Team name cannot exceed 60 characters")
    .regex(
      /^[A-Za-z ]+$/,
      "Team name can contain letters and spaces only"
    ),

  leaderName: z
    .string()
    .trim()
    .min(1, "Leader name is required")
    .max(100, "Leader name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(120, "Email cannot exceed 120 characters"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits"),

  college: z
    .string()
    .trim()
    .min(1, "College and year are required")
    .max(150, "College and year cannot exceed 150 characters"),

  track: z
    .string()
    .trim()
    .max(100, "Track name cannot exceed 100 characters")
    .optional(),

  members: z
    .string()
    .trim()
    .max(500, "Team members list cannot exceed 500 characters")
    .optional(),

  consent: z.literal(true, {
    error: "Consent is required",
  }),

  website: z
    .string()
    .optional()
    .default(""),
});

export type RegistrationInput = z.infer<
  typeof registrationSchema
>;