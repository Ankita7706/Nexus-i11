A  hackathon website for Hack for Good, a Nexus (Coding Ninjas ITER) club hackathon. The website presents the event, challenges/tracks, timeline, prizes, FAQs, and a registration flow for participating teams.

The project is intentionally split into a highly visual frontend and a small backend whose only responsibility is handling registration data and storing it in a database.

Project Goals

Create a visually distinctive, cinematic hackathon website.

Use scroll-driven storytelling rather than a generic template layout.

Keep the frontend animation-rich while maintaining good performance.

Provide a reliable registration form backed by a database.

Keep the codebase easy for multiple frontend and backend contributors to work on.

Tech Stack

Frontend

React

Vite

TypeScript

Tailwind CSS

GSAP

GSAP ScrollTrigger

Lenis

React Hook Form

Zod

Fetch API or Axios

Lucide React where icons are actually needed

Backend

Node.js

Express.js

TypeScript

Zod

CORS

Helmet

express-rate-limit

Database

PostgreSQL

Supabase

The backend is intentionally small. There are no submission APIs, admin dashboard APIs, payment systems, or other backend features in the current scope.

Development / Quality

Git

GitHub

ESLint

Prettier

Vitest

Playwright

GitHub Actions

Deployment

Frontend: Vercel

Backend: Render or Railway

Database: Supabase

Repository Structure

hack-for-good/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── animations/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── data/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── schemas/
│   │   ├── db/
│   │   ├── types/
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── DESIGN.md
└── README.md

Website Sections

The current one-page experience is organized around:

Navbar

Hero

About

Challenges / Tracks

Timeline / How It Works

Prizes

FAQ

Registration

Footer

The exact content should always come from confirmed organizer information. Do not add invented dates, prize amounts, participant counts, sponsors, judges, testimonials, or other social-proof data.

Frontend Animation Architecture

The website uses two separate responsibilities:

Lenis

Lenis is responsible for smooth page scrolling.

GSAP + ScrollTrigger

GSAP and ScrollTrigger are responsible for visual animation:

Hero entrance animation

Scroll reveals

Chapter transitions

Subtle parallax

Pinned storytelling sections

Timeline animation

CTA and interaction motion

Do not introduce another smooth-scroll library.

Do not create multiple Lenis instances.

Do not connect background-video playback position to scroll progress.

Registration Flow

Registration Form
       ↓
React Hook Form
       ↓
Zod validation
       ↓
POST /api/register
       ↓
Express backend
       ↓
Server-side validation
       ↓
Duplicate check
       ↓
Supabase / PostgreSQL
       ↓
Success response

The registration API should:

validate all submitted fields on the server

reject invalid requests

reject duplicate team names where required

reject duplicate emails where required

silently ignore/reject bot submissions using the hidden website trap field

apply basic rate limiting

return clear HTTP responses

Expected response classes:

201 — registration saved

400 — invalid data

409 — duplicate registration/team/email

429 — rate limit exceeded

Registration Data

The form should stay aligned with the agreed registration contract.

Typical fields:

team name

leader name

email

phone

college

year

preferred track

other members

consent

hidden website spam-trap field

Do not add new required fields without agreement between frontend and backend contributors.

Local Development

Frontend

cd frontend
npm install
npm run dev

Backend

cd backend
npm install
npm run dev

The frontend should call the backend through the configured API base URL.

Keep secrets only in environment variables. Never commit .env files containing credentials.

Environment Variables

Example frontend variables:

VITE_API_BASE_URL=http://localhost:5000

Example backend variables:

PORT=5000
DATABASE_URL=your_database_connection
FRONTEND_ORIGIN=http://localhost:5173

Use .env.example to document required variables without exposing real credentials.

Git Workflow

Use the fork + branch + pull request workflow.

First setup

git clone https://github.com/YOUR-USERNAME/hack-for-good.git
cd hack-for-good
npm install
git remote add upstream https://github.com/LEAD-USERNAME/hack-for-good.git
git remote -v

Before starting a task

git checkout main
git pull upstream main
git checkout -b feature/<task-name>

Commit

Keep commits small and clear:

git status
git add <your-files>
git commit -m "feat: add about section"
git push origin feature/<task-name>

Then open a pull request.

Rules

Do not push directly to main.

One branch per task.

Change only the files needed for your task.

Do not commit node_modules.

Do not commit secrets or real .env files.

Check desktop and mobile before opening a pull request.

Make sure the browser console has no red errors.

Contribution Ownership

The team guide currently divides work between:

Frontend

Foundation / shared setup

Navbar / Footer

Hero

About

Tracks / How It Works

Prizes / Partners

FAQ / page details

Registration page

Backend

Registration API

Database integration

Use the branch names agreed by the team. Keep shared files protected from unnecessary edits.

Quality Checklist

Before merging:

Page loads without console errors.

No horizontal overflow.

Mobile layout works.

Hero artwork/video stays visually stable.

Lenis scrolling remains smooth.

ScrollTrigger animations do not duplicate on re-render.

prefers-reduced-motion is respected.

Registration validation works on both frontend and backend.

Duplicate registrations are handled correctly.

No secrets are committed.

Only intended files are changed.

Scope Principle

Hack for Good is a frontend-heavy experience. Keep the frontend expressive and the backend intentionally small.

Prefer:

Excellent visual design
+
Reliable registration
+
Simple database

over adding backend systems that the event does not currently need.
