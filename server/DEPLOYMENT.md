# B2: Backend Email, Admin & Deployment Guide

This document contains everything needed for **B2 (Email, Admin, Testing, and Deployment)** for Hack for Good.

---

## 1. Supabase Database Setup

If your Supabase project does not have the `registrations` table yet, go to [Supabase Dashboard](https://supabase.com/dashboard) &rarr; **SQL Editor**, and execute this script:

```sql
-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL UNIQUE,
  leader_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  college TEXT NOT NULL,
  track TEXT,
  members TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_team_name ON registrations(team_name);

-- 3. Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow public frontend registration insert
CREATE POLICY "Allow public insert" ON registrations 
  FOR INSERT WITH CHECK (true);

-- Allow backend select/read
CREATE POLICY "Allow read access" ON registrations 
  FOR SELECT USING (true);
```

---

## 2. Environment Variables (`server/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for Express server | `5000` |
| `ALLOWED_ORIGIN` | Comma-separated list of allowed frontend URLs | `http://localhost:5173,http://localhost:3000` |
| `SUPABASE_URL` | Supabase Project URL | `https://xyzcompany.supabase.co` |
| `SUPABASE_SECRET_KEY` | Supabase Service Role or Anon Key | `eyJh...` |
| `RESEND_API_KEY` | Resend API Key | `re_123456789...` |
| `RESEND_FROM_EMAIL` | Sender address | `Hack for Good <onboarding@resend.dev>` |
| `ADMIN_PASSWORD` | Password for organizer portal & CSV export | `hackforgood2026` |

---

## 3. Available Endpoints

### Public Endpoints
- `GET /`: Health check & API status (`{ success: true, message: "Hack for Good API is running" }`).
- `POST /api/register`: Submit registration form.
  - Returns `201` on success (triggers confirmation email via Resend).
  - Returns `400` on validation errors.
  - Returns `409` on duplicate email or team name.
  - Returns `429` on rate limit.

### Admin & Organizer Endpoints (Protected by `ADMIN_PASSWORD`)
- `GET /admin` or `GET /api/admin/dashboard`:
  - Beautiful browser dashboard for organizers with summary stats and table of registered teams.
- `GET /api/admin/registrations`:
  - JSON response of all registered teams.
  - Pass password via header `x-admin-password: <password>`, `Authorization: Bearer <password>`, or query `?password=<password>`.
- `GET /api/admin/export-csv` (or `/api/admin/registrations/csv`):
  - Downloads Excel-compatible CSV file with all registration details.

---

## 4. Running Tests

To run the automated test suite verifying validations, honeypots, admin auth, and CSV escaping:

```bash
cd server
npm test
```

---

## 5. Deploying to Render (Hosting)

1. Push your branch `backend/admin-email` to your GitHub fork (`swarnimnim/Nexus-i11`).
2. Go to [render.com](https://render.com) and log in.
3. Click **New +** &rarr; **Web Service**.
4. Connect your GitHub repository `swarnimnim/Nexus-i11`.
5. Configure the service:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Branch**: `backend/admin-email` (or `main` after PR merge)
6. Add the **Environment Variables** in Render's "Environment" tab:
   - `PORT`: `5000`
   - `ALLOWED_ORIGIN`: `*` (or your frontend Vercel/Netlify URL)
   - `SUPABASE_URL`: (Your Supabase URL)
   - `SUPABASE_SECRET_KEY`: (Your Supabase Key)
   - `RESEND_API_KEY`: (Your Resend Key)
   - `RESEND_FROM_EMAIL`: `Hack for Good <onboarding@resend.dev>`
   - `ADMIN_PASSWORD`: (Your choice of password)
7. Click **Create Web Service**.
8. Once deployed, copy your Render URL (e.g., `https://hack-for-good-backend.onrender.com`) and share with F8 for their `VITE_API_BASE_URL`.
