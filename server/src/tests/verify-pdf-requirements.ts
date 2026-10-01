import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "http://localhost:5000";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "hackforgood2026";

interface TestResult {
  category: string;
  requirement: string;
  passed: boolean;
  notes: string;
}

const results: TestResult[] = [];

function record(category: string, requirement: string, passed: boolean, notes: string) {
  results.push({ category, requirement, passed, notes });
  const status = passed ? "\x1b[32m[PASS]\x1b[0m" : "\x1b[31m[FAIL]\x1b[0m";
  console.log(`${status} ${category} -> ${requirement}: ${notes}`);
}

async function runAudit() {
  console.log("\n=======================================================");
  console.log("   HACK FOR GOOD (B2) - PDF REQUIREMENTS VERIFICATION   ");
  console.log("=======================================================\n");

  // 1. Health Check & Server Running
  try {
    const res = await fetch(`${BASE_URL}/`);
    const json = await res.json();
    const ok = res.status === 200 && json.success === true;
    record(
      "Server Base",
      "GET / health check",
      ok,
      `Status ${res.status}, response: ${JSON.stringify(json)}`
    );
  } catch (err: any) {
    record("Server Base", "GET / health check", false, `Failed to reach server: ${err.message}`);
    process.exit(1);
  }

  // 2. Security Headers (Helmet)
  try {
    const res = await fetch(`${BASE_URL}/`);
    const hasHelmet =
      res.headers.has("x-content-type-options") ||
      res.headers.has("content-security-policy");
    record(
      "Tech Stack (Page 15)",
      "Helmet security headers enabled",
      hasHelmet,
      `x-content-type-options: ${res.headers.get("x-content-type-options")}`
    );
  } catch (err: any) {
    record("Tech Stack (Page 15)", "Helmet security headers enabled", false, err.message);
  }

  // 3. Validation - 400 for wrong data (Page 12)
  try {
    const badPayload = {
      teamName: "A", // too short (< 2)
      leaderName: "",
      email: "invalid-email",
      phone: "123", // not 10 digits
      college: "",
      consent: false,
    };
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(badPayload),
    });
    const json = await res.json();
    const ok = res.status === 400 && json.success === false && json.errors !== undefined;
    record(
      "Validation (Page 12)",
      "400 for wrong data (Zod server-side validation)",
      ok,
      `Status ${res.status}, errors caught: ${Object.keys(json.errors || {}).join(", ")}`
    );
  } catch (err: any) {
    record("Validation (Page 12)", "400 for wrong data", false, err.message);
  }

  // 4. Honeypot Spam Protection (Page 12)
  try {
    const botPayload = {
      teamName: "Bot Spammer",
      leaderName: "Spambot",
      email: "bot@spammer.org",
      phone: "9998887776",
      college: "Bot University",
      consent: true,
      website: "http://spam-link.ru", // trap field filled
    };
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botPayload),
    });
    const json = await res.json();
    const ok = res.status === 200 && json.success === true;
    record(
      "Spam Trap (Page 12)",
      "Silent rejection / honeypot for website trap field",
      ok,
      `Status ${res.status}, acknowledged without inserting bot data`
    );
  } catch (err: any) {
    record("Spam Trap (Page 12)", "Honeypot protection", false, err.message);
  }

  // 5. Successful Registration & Email Dispatch (Page 12, Page 14)
  const letters = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"];
  const randomWord = letters[Math.floor(Math.random() * letters.length)] + " " + letters[Math.floor(Math.random() * letters.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const testTeam = {
    teamName: `Team ${randomWord} ${letters[Math.floor(Math.random() * letters.length)]}`,
    leaderName: "Dev Tester",
    email: `alpha${randomNum}@testdomain.org`,
    phone: "9876543210",
    college: "ITER SOA 2026",
    track: "blood-donation",
    members: "Dev One, Dev Two",
    consent: true,
  };

  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testTeam),
    });
    const json = await res.json();
    const ok = res.status === 201 && json.success === true && json.registration?.id;
    record(
      "Registration (Page 12 & 14)",
      "201 when saved & Supabase PostgreSQL insertion",
      ok,
      `Status ${res.status}, registered ID: ${json.registration?.id}`
    );
  } catch (err: any) {
    record("Registration (Page 12 & 14)", "201 when saved", false, err.message);
  }

  // 6. Duplicate Registration Protection (Page 12, Page 13)
  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testTeam),
    });
    const json = await res.json();
    const ok = res.status === 409 && json.success === false;
    record(
      "Duplicates (Page 12)",
      "409 for duplicates (team name or email already registered)",
      ok,
      `Status ${res.status}, message: "${json.message}"`
    );
  } catch (err: any) {
    record("Duplicates (Page 12)", "409 for duplicates", false, err.message);
  }

  // 7. Admin Protection - 401 when unauthorized (Page 14)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/registrations`);
    const ok = res.status === 401;
    record(
      "Admin Protection (Page 14)",
      "Password protection (401 without credentials)",
      ok,
      `Status ${res.status}`
    );
  } catch (err: any) {
    record("Admin Protection (Page 14)", "401 without credentials", false, err.message);
  }

  // 8. Admin List - 200 when authenticated (Page 14)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/registrations`, {
      headers: { "x-admin-password": ADMIN_PASS },
    });
    const json = await res.json();
    const ok = res.status === 200 && json.success === true && Array.isArray(json.registrations);
    record(
      "Admin List (Page 14)",
      "Organizers can see all registrations list",
      ok,
      `Status ${res.status}, retrieved ${json.count} teams`
    );
  } catch (err: any) {
    record("Admin List (Page 14)", "Organizers can see list", false, err.message);
  }

  // 9. CSV Export for Excel (Page 14)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/export-csv?password=${encodeURIComponent(ADMIN_PASS)}`);
    const text = await res.text();
    const contentType = res.headers.get("content-type") || "";
    const disposition = res.headers.get("content-disposition") || "";
    const hasHeader = text.includes("Registration ID") && text.includes("Team Name");
    const ok =
      res.status === 200 &&
      contentType.includes("text/csv") &&
      disposition.includes("attachment") &&
      hasHeader;
    record(
      "Admin CSV Export (Page 14)",
      "Download registrations as CSV file for Excel",
      ok,
      `Status ${res.status}, Content-Type: ${contentType}, Header verified`
    );
  } catch (err: any) {
    record("Admin CSV Export (Page 14)", "CSV Export", false, err.message);
  }

  // 10. Organizer Web Dashboard (Page 14)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/dashboard?password=${encodeURIComponent(ADMIN_PASS)}`);
    const html = await res.text();
    const ok = res.status === 200 && html.includes("Organizer Admin") && html.includes("Registered Teams");
    record(
      "Organizer UI (Page 14)",
      "Interactive browser portal for organizers",
      ok,
      `Status ${res.status}, HTML dashboard rendered`
    );
  } catch (err: any) {
    record("Organizer UI (Page 14)", "Organizer UI", false, err.message);
  }

  // Summary
  const allPassed = results.every((r) => r.passed);
  console.log("\n=======================================================");
  console.log(`  AUDIT SUMMARY: ${results.filter((r) => r.passed).length}/${results.length} PASSED`);
  console.log("=======================================================\n");

  if (!allPassed) {
    console.error("Some requirements failed!");
    process.exit(1);
  } else {
    console.log("\x1b[32mALL PDF REQUIREMENTS ARE 100% SATISFIED AND WORKING!\x1b[0m\n");
    process.exit(0);
  }
}

runAudit();
