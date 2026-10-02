import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_SECURE = process.env.SMTP_SECURE === "true"; // false for 587 (STARTTLS)
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : undefined;

const FROM_EMAIL =
  process.env.EMAIL_FROM ||
  (SMTP_USER ? `Hack for Good <${SMTP_USER}>` : "Hack for Good <noreply@hackforgood.dev>");

// Create reusable Nodemailer transporter if credentials are provided
const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

export interface RegistrationEmailData {
  teamName: string;
  leaderName: string;
  email: string;
  track?: string | null;
  members?: string | null;
}

// ----------------------------------------------------
// HTML Sanitizer to prevent HTML injection / XSS
// ----------------------------------------------------
function escapeHtml(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendRegistrationConfirmationEmail(
  data: RegistrationEmailData
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!transporter) {
    console.warn(
      "[EmailService] SMTP_USER or SMTP_PASS is not configured in server/.env. Skipping email dispatch."
    );
    return {
      success: false,
      error: "SMTP credentials not configured",
    };
  }

  const { teamName, leaderName, email, track, members } = data;

  // Sanitize all user-provided strings for HTML template
  const safeTeamName = escapeHtml(teamName);
  const safeLeaderName = escapeHtml(leaderName);
  const safeEmail = escapeHtml(email);
  const safeTrack = track ? escapeHtml(track) : null;
  const safeMembers = members ? escapeHtml(members) : null;

  // ----------------------------------------------------
  // 1. Plain Text Fallback (Reduces Spam Score / RFC 2046)
  // ----------------------------------------------------
  const textContent = `
HACK FOR GOOD - REGISTRATION CONFIRMED
Nexus | Coding Ninjas ITER

Welcome aboard, ${leaderName}!

Your team registration for Hack for Good has been successfully received and recorded.

Registration Details:
- Team Name: ${teamName}
- Team Leader: ${leaderName}
- Registered Email: ${email}
${track ? `- Preferred Track: ${track}\n` : ""}${members ? `- Team Members: ${members}\n` : ""}
Important Next Steps:
• Event Flow: Submit -> Kickoff (Sunday 7:00 PM) -> 24H Build -> Jury Evaluation & Handover.
• Ensure all your teammates are ready with their development environment.
• Join the official hackathon communications channel for real-time announcements.

If you have any questions or need to make changes to your registration, feel free to reply directly to this email or reach out to the organizing team.

Best regards,
The Hack for Good Organizing Team
Nexus (Coding Ninjas ITER)

---
© 2026 Hack for Good • Nexus (Coding Ninjas ITER) • Partnering for a better tomorrow
`.trim();

  // ----------------------------------------------------
  // 2. Sanitized HTML Email Template
  // ----------------------------------------------------
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hack for Good - Registration Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fff0d2; margin: 0; padding: 24px; color: #3d0c00; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #f5a06e; box-shadow: 0 4px 12px rgba(61,12,0,0.08); }
    .header { background: linear-gradient(135deg, #f47a2a, #8f1a00); color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; }
    .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 32px 24px; }
    .badge { display: inline-block; background-color: #fbbd5a; color: #3d0c00; font-weight: bold; padding: 6px 14px; border-radius: 20px; font-size: 12px; margin-bottom: 20px; text-transform: uppercase; }
    .details { background-color: #fff8eb; border-left: 4px solid #f47a2a; padding: 16px; margin: 20px 0; border-radius: 4px; }
    .details-row { margin-bottom: 8px; font-size: 14px; }
    .details-label { font-weight: bold; color: #8f1a00; }
    .timeline { margin: 24px 0; padding: 16px; background-color: #fafafa; border-radius: 8px; border: 1px solid #eaeaea; }
    .timeline-title { font-weight: bold; margin-bottom: 8px; font-size: 14px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HACK FOR GOOD</h1>
      <p>Nexus | Coding Ninjas ITER</p>
    </div>
    <div class="content">
      <div class="badge">Registration Confirmed</div>
      <h2>Welcome aboard, ${safeLeaderName}!</h2>
      <p>Your team registration for <strong>Hack for Good</strong> has been successfully received and recorded.</p>
      
      <div class="details">
        <div class="details-row"><span class="details-label">Team Name:</span> ${safeTeamName}</div>
        <div class="details-row"><span class="details-label">Team Leader:</span> ${safeLeaderName}</div>
        <div class="details-row"><span class="details-label">Registered Email:</span> ${safeEmail}</div>
        ${safeTrack ? `<div class="details-row"><span class="details-label">Preferred Track:</span> ${safeTrack}</div>` : ""}
        ${safeMembers ? `<div class="details-row"><span class="details-label">Team Members:</span> ${safeMembers}</div>` : ""}
      </div>

      <div class="timeline">
        <div class="timeline-title">Important Next Steps:</div>
        <ul>
          <li><strong>Event Flow:</strong> Submit &rarr; Kickoff (Sunday 7:00 PM) &rarr; 24H Build &rarr; Jury Evaluation.</li>
          <li>Make sure all your teammates are ready with their dev environment.</li>
          <li>Join the official hackathon communications channel for real-time announcements.</li>
        </ul>
      </div>

      <p>If you have any questions or need to make changes to your registration, feel free to reply directly to this email or reach out to the organizing team.</p>
      
      <p style="margin-top: 28px;">Best regards,<br><strong>The Hack for Good Organizing Team</strong><br>Nexus (Coding Ninjas ITER)</p>
    </div>
    <div class="footer">
      &copy; 2026 Hack for Good &bull; Nexus (Coding Ninjas ITER) &bull; Partnering for a better tomorrow
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `Registration Confirmed: ${teamName} - Hack for Good`,
      text: textContent,
      html: htmlContent,
    });

    console.log(
      `[EmailService] Confirmation email sent successfully to ${email} (MessageID: ${info.messageId})`
    );
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error("[EmailService] Nodemailer error sending email:", err);
    return {
      success: false,
      error: err?.message || "Failed to send email",
    };
  }
}
