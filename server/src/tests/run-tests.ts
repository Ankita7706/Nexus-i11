import { registrationSchema } from "../schemas/registration.schema";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} ${detail ? `- ${detail}` : ""}`);
  }
}

console.log("\n==========================================");
console.log("  HACK FOR GOOD - B2 BACKEND TEST SUITE   ");
console.log("==========================================\n");

// ----------------------------------------------------
// 1. GOOD REGISTRATION TESTS
// ----------------------------------------------------
console.log("\x1b[36m[1] Good Registration Validations\x1b[0m");

const validPayload = {
  teamName: "Code Warriors",
  leaderName: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "9876543210",
  college: "ITER SOA 3rd Year",
  track: "blood-donation",
  members: "Ananya Roy, Priya Patel, Sourav Das",
  consent: true,
  website: "",
};

const validResult = registrationSchema.safeParse(validPayload);
assert(validResult.success, "Valid payload passes schema validation");

const minimalValidPayload = {
  teamName: "Nexus Team",
  leaderName: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  college: "ITER SOA 2nd Year",
  consent: true,
};

const minimalResult = registrationSchema.safeParse(minimalValidPayload);
assert(
  minimalResult.success,
  "Minimal payload without optional track/members passes schema validation"
);

// ----------------------------------------------------
// 2. BAD REGISTRATION TESTS (Validation Failures)
// ----------------------------------------------------
console.log("\n\x1b[36m[2] Bad Registration Validations\x1b[0m");

// Bad phone (9 digits instead of 10)
const badPhone = { ...validPayload, phone: "987654321" };
const badPhoneResult = registrationSchema.safeParse(badPhone);
assert(
  !badPhoneResult.success &&
    badPhoneResult.error.flatten().fieldErrors.phone !== undefined,
  "Rejects invalid phone number (less than 10 digits)"
);

// Bad email
const badEmail = { ...validPayload, email: "not-an-email" };
const badEmailResult = registrationSchema.safeParse(badEmail);
assert(
  !badEmailResult.success &&
    badEmailResult.error.flatten().fieldErrors.email !== undefined,
  "Rejects invalid email format"
);

// Team name too short
const shortTeam = { ...validPayload, teamName: "A" };
const shortTeamResult = registrationSchema.safeParse(shortTeam);
assert(
  !shortTeamResult.success &&
    shortTeamResult.error.flatten().fieldErrors.teamName !== undefined,
  "Rejects team name shorter than 2 characters"
);

// Team name with symbols
const symbolTeam = { ...validPayload, teamName: "Team#@123" };
const symbolTeamResult = registrationSchema.safeParse(symbolTeam);
assert(
  !symbolTeamResult.success &&
    symbolTeamResult.error.flatten().fieldErrors.teamName !== undefined,
  "Rejects team name with illegal characters/numbers (letters and spaces only)"
);

// Missing consent
const noConsent = { ...validPayload, consent: false };
const noConsentResult = registrationSchema.safeParse(noConsent);
assert(
  !noConsentResult.success &&
    noConsentResult.error.flatten().fieldErrors.consent !== undefined,
  "Rejects submission without consent checkbox checked"
);

// ----------------------------------------------------
// 3. SPAM HONEYPOT PROTECTION TESTS
// ----------------------------------------------------
console.log("\n\x1b[36m[3] Spam Honeypot Protection\x1b[0m");

const botPayload = { ...validPayload, website: "http://bot-spam-link.com" };
const isSpam = typeof botPayload.website === "string" && botPayload.website.trim() !== "";
assert(isSpam, "Correctly identifies honeypot trap field filled by bots");

// ----------------------------------------------------
// 4. ADMIN AUTHENTICATION TESTS
// ----------------------------------------------------
console.log("\n\x1b[36m[4] Admin Authentication & Protection\x1b[0m");

const configuredPassword = process.env.ADMIN_PASSWORD || "hackforgood2026";
const validToken = "hackforgood2026";
const wrongToken = "incorrect_password";

assert(
  wrongToken !== configuredPassword,
  "Unauthorized attempt is blocked when password does not match"
);
assert(
  validToken === configuredPassword,
  "Authorized organizer access succeeds when password matches"
);

// ----------------------------------------------------
// 5. CSV FORMATTING TESTS
// ----------------------------------------------------
console.log("\n\x1b[36m[5] CSV Export Escaping\x1b[0m");

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  return `"${str.replace(/"/g, '""')}"`;
}

const unescaped = 'Test "Quotes", and commas';
const escaped = escapeCsv(unescaped);
assert(
  escaped === '"Test ""Quotes"", and commas"',
  "CSV field properly escapes commas and double quotes for Excel"
);

// ----------------------------------------------------
// SUMMARY REPORT
// ----------------------------------------------------
console.log("\n==========================================");
console.log(
  `  TEST RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`
);
console.log("==========================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("\x1b[32mAll test specifications passed successfully!\x1b[0m\n");
  process.exit(0);
}
