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
    .min(1, "Leader name is required"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits"),

  college: z
    .string()
    .trim()
    .min(1, "College and year are required"),

  track: z
    .string()
    .trim()
    .optional(),

  members: z
    .string()
    .trim()
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