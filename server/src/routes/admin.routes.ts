import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { supabase } from "../db/supabase";
import { adminAuthMiddleware } from "../middleware/adminAuth";
import { sendRegistrationConfirmationEmail } from "../services/email.service";

const router = Router();

// Protect admin endpoints against brute-force attacks
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30, // 30 requests per 15 min window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many admin requests. Please try again later.",
  },
});

router.use(adminLimiter);

// Helper to escape values for CSV and prevent CSV Formula Injection (CWE-1236)
function escapeCsvValue(val: any): string {
  if (val === null || val === undefined) {
    return '""';
  }
  let str = String(val);
  // Prepend single quote if string begins with dangerous spreadsheet formula characters
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  // Double internal quotes and wrap in quotes
  return `"${str.replace(/"/g, '""')}"`;
}

// ----------------------------------------------------
// 1. JSON List of all registrations (Password protected)
// ----------------------------------------------------
router.get("/registrations", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[AdminRoute] Fetch registrations error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve registrations",
      });
    }

    return res.status(200).json({
      success: true,
      count: data ? data.length : 0,
      registrations: data || [],
    });
  } catch (err: any) {
    console.error("[AdminRoute] Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ----------------------------------------------------
// 2. CSV Export for Excel (Password protected)
// ----------------------------------------------------
router.get(
  ["/export-csv", "/registrations/csv"],
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("[AdminRoute] CSV export fetch error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to export registrations to CSV",
        });
      }

      const rows = data || [];
      const headers = [
        "Registration ID",
        "Team Name",
        "Leader Name",
        "Email",
        "Phone",
        "College and Year",
        "Preferred Track",
        "Team Members",
        "Consent Given",
        "Registered At (UTC)",
      ];

      const csvLines = [headers.map(escapeCsvValue).join(",")];

      for (const row of rows) {
        csvLines.push(
          [
            row.id,
            row.team_name,
            row.leader_name,
            row.email,
            row.phone,
            row.college,
            row.track || "Not specified",
            row.members || "None",
            row.consent ? "Yes" : "No",
            row.created_at || "",
          ]
            .map(escapeCsvValue)
            .join(",")
        );
      }

      const csvContent = "\uFEFF" + csvLines.join("\r\n"); // UTF-8 BOM for seamless Excel display
      const filename = `hack-for-good-registrations-${new Date().toISOString().slice(0, 10)}.csv`;

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      return res.status(200).send(csvContent);
    } catch (err: any) {
      console.error("[AdminRoute] CSV generation error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to generate CSV export",
      });
    }
  }
);

// ----------------------------------------------------
// 3. Organizer Browser Dashboard (HTML View)
// ----------------------------------------------------
router.get(["/", "/dashboard"], async (req: Request, res: Response) => {
  const configuredPassword = process.env.ADMIN_PASSWORD || "hackforgood2026";
  const passQuery = (req.query.password as string) || (req.query.key as string);

  // If password provided in URL or cookie matches, render full table
  const isAuthenticated = passQuery === configuredPassword;

  let registrations: any[] = [];
  if (isAuthenticated) {
    try {
      const { data } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      registrations = data || [];
    } catch {
      registrations = [];
    }
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hack for Good - Organizer Admin Portal</title>
  <style>
    :root {
      --amber: #fbbd5a;
      --orange: #f47a2a;
      --cream: #fff0d2;
      --maroon: #3d0c00;
      --red: #8f1a00;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fffdf9; color: var(--maroon); }
    header { background: linear-gradient(135deg, var(--orange), var(--red)); color: white; padding: 24px; box-shadow: 0 4px 12px rgba(61,12,0,0.15); }
    .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
    h1 { font-size: 24px; letter-spacing: 0.5px; }
    .container { max-width: 1200px; margin: 32px auto; padding: 0 20px; }
    .card { background: white; border: 1px solid #ebd8c0; border-radius: 10px; padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; font-size: 14px; }
    .btn-primary { background: var(--orange); color: white; }
    .btn-primary:hover { background: #e0681a; }
    .btn-amber { background: var(--amber); color: var(--maroon); }
    .btn-amber:hover { background: #f0b04c; }
    .form-row { display: flex; gap: 12px; margin-top: 12px; max-width: 450px; }
    input[type="password"] { flex: 1; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: var(--cream); border-left: 4px solid var(--orange); border-radius: 8px; padding: 16px; }
    .stat-card .num { font-size: 28px; font-weight: bold; color: var(--red); }
    .stat-card .label { font-size: 13px; color: #555; text-transform: uppercase; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 16px; }
    th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #f0e4d4; }
    th { background: #fcf6ee; font-weight: 600; color: var(--maroon); }
    tr:hover { background: #fffaf2; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; background: var(--amber); color: var(--maroon); }
    .export-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
    .table-responsive { overflow-x: auto; }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <div>
        <h1>Hack for Good &bull; Organizer Admin</h1>
        <p style="opacity: 0.9; font-size: 13px;">Manage registrations & export team rosters</p>
      </div>
      ${
        isAuthenticated
          ? `<a href="${req.baseUrl}/export-csv?password=${encodeURIComponent(
              passQuery
            )}" class="btn btn-amber">&#128229; Download CSV for Excel</a>`
          : ""
      }
    </div>
  </header>

  <div class="container">
    ${
      !isAuthenticated
        ? `
      <div class="card" style="max-width: 500px; margin: 40px auto; text-align: center;">
        <h2 style="margin-bottom: 8px;">Enter Admin Password</h2>
        <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Please enter the organizer password to access the team list and export files.</p>
        <form method="GET" action="">
          <div class="form-row" style="margin: 0 auto;">
            <input type="password" name="password" placeholder="Admin password" required autofocus />
            <button type="submit" class="btn btn-primary">Unlock</button>
          </div>
        </form>
      </div>
    `
        : `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="num">${registrations.length}</div>
          <div class="label">Total Teams Registered</div>
        </div>
        <div class="stat-card">
          <div class="num">${
            new Set(registrations.map((r) => r.college)).size
          }</div>
          <div class="label">Unique Colleges</div>
        </div>
        <div class="stat-card">
          <div class="num">${
            registrations.filter((r) => r.track).length
          }</div>
          <div class="label">Tracks Selected</div>
        </div>
      </div>

      <div class="card">
        <div class="export-bar">
          <h2>Registered Teams (${registrations.length})</h2>
          <a href="${req.baseUrl}/export-csv?password=${encodeURIComponent(
            passQuery
          )}" class="btn btn-primary">&#128229; Export All to CSV</a>
        </div>
        
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Leader Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Track</th>
                <th>Members</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              ${
                registrations.length === 0
                  ? `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #888;">No teams registered yet.</td></tr>`
                  : registrations
                      .map(
                        (r, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td><strong>${r.team_name}</strong></td>
                  <td>${r.leader_name}</td>
                  <td><a href="mailto:${r.email}" style="color: var(--orange);">${r.email}</a></td>
                  <td>${r.phone}</td>
                  <td>${r.college}</td>
                  <td><span class="badge">${r.track || "General"}</span></td>
                  <td style="font-size: 12px; color: #555;">${r.members || "-"}</td>
                  <td style="font-size: 12px; color: #888;">${
                    r.created_at ? new Date(r.created_at).toLocaleString() : "-"
                  }</td>
                </tr>
              `
                      )
                      .join("")
              }
            </tbody>
          </table>
        </div>
      </div>
    `
    }
  </div>
</body>
</html>
  `.trim();

  return res.status(200).send(html);
});

// ----------------------------------------------------
// 4. Diagnostic Email Test Route (Password protected)
// ----------------------------------------------------
router.get("/test-email", adminAuthMiddleware, async (req: Request, res: Response) => {
  const to = (req.query.to as string) || "swarnimrashi@gmail.com";
  const result = await sendRegistrationConfirmationEmail({
    teamName: "Diagnostic Test",
    leaderName: "Admin",
    email: to,
  });
  return res.json({
    envCheck: {
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
      smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
      smtpPort: process.env.SMTP_PORT || "587",
      smtpSecure: process.env.SMTP_SECURE,
      userPrefix: process.env.SMTP_USER ? process.env.SMTP_USER.slice(0, 5) + "***" : "missing",
    },
    result,
  });
});

export default router;
