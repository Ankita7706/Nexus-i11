import { Router } from "express";
import rateLimit from "express-rate-limit";

import { supabase } from "../db/supabase";
import { registrationSchema } from "../schemas/registration.schema";

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

router.post("/", registerLimiter, async (req, res) => {
  try {

    // -------------------------
    // Honeypot spam protection
    // -------------------------

    if (
      typeof req.body.website === "string" &&
      req.body.website.trim() !== ""
    ) {
      // Pretend everything is fine.
      // Nothing is actually stored.
      return res.status(200).json({
        success: true,
        message: "Registration received",
      });
    }

    // -------------------------
    // Validate request
    // -------------------------

    const result = registrationSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      teamName,
      leaderName,
      email,
      phone,
      college,
      track,
      members,
      consent,
    } = result.data;

    // -------------------------
    // Check duplicates
    // -------------------------

    const { data: duplicate, error: duplicateError } =
      await supabase
        .from("registrations")
        .select("team_name, email")
        .or(`team_name.eq.${teamName},email.eq.${email}`)
        .maybeSingle();

    if (duplicateError) {
      console.error("Duplicate check failed:", duplicateError);

      return res.status(500).json({
        success: false,
        message: "Could not check existing registrations",
      });
    }

    if (duplicate) {
      if (duplicate.email === email) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered",
        });
      }

      if (duplicate.team_name === teamName) {
        return res.status(409).json({
          success: false,
          message: "This team name is already registered",
        });
      }
    }

    // -------------------------
    // Save registration
    // -------------------------

    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          team_name: teamName,
          leader_name: leaderName,
          email,
          phone,
          college,
          track: track || null,
          members: members || null,
          consent,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Registration insert failed:", error);

      // PostgreSQL unique constraint violation
      if (error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "Email or team name is already registered",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Could not save registration",
      });
    }

    // -------------------------
    // Success
    // -------------------------

    return res.status(201).json({
      success: true,
      message: "Team registered successfully",
      registration: {
        id: data.id,
        teamName: data.team_name,
        leaderName: data.leader_name,
        email: data.email,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;