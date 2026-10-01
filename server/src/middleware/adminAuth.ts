import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export function adminAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const configuredPassword =
    process.env.ADMIN_PASSWORD || "hackforgood2026";

  // Check header 'x-admin-password', 'x-admin-key', Authorization Bearer/Basic, or query '?password='
  let providedPassword: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      providedPassword = authHeader.substring(7).trim();
    } else if (authHeader.startsWith("Basic ")) {
      try {
        const decoded = Buffer.from(
          authHeader.substring(6).trim(),
          "base64"
        ).toString("utf-8");
        // Format is username:password or :password
        const parts = decoded.split(":");
        providedPassword = parts.length > 1 ? parts[1] : parts[0];
      } catch {
        // fallback
      }
    }
  }

  if (!providedPassword) {
    providedPassword =
      (req.headers["x-admin-password"] as string) ||
      (req.headers["x-admin-key"] as string) ||
      (req.query.password as string) ||
      (req.query.key as string);
  }

  if (!providedPassword) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing admin password",
    });
  }

  // Constant-time comparison to prevent side-channel timing attacks
  const providedBuffer = Buffer.from(providedPassword);
  const configuredBuffer = Buffer.from(configuredPassword);

  const isMatch =
    providedBuffer.length === configuredBuffer.length &&
    crypto.timingSafeEqual(providedBuffer, configuredBuffer);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing admin password",
    });
  }

  next();
}
