⚡ Hack for Good

Build. Solve. Impact.

A cinematic, frontend-heavy website for Hack for Good, a Nexus (Coding Ninjas ITER) hackathon where student teams build software for real NGO problems.

The project combines a highly interactive visual experience with a focused registration backend that safely stores team registrations in a PostgreSQL database.

<div align="center">

🎨 Frontend-first • 🎞️ Motion-driven • 📝 Registration-ready

React + TypeScript + GSAP + Lenis + Node.js + Express + PostgreSQL

</div>

✨ What is Hack for Good?

Hack for Good is designed around one simple idea:

Technology should solve problems that matter.

The website introduces the event, presents its challenges and tracks, explains how the hackathon works, showcases prizes and FAQs, and provides a registration flow for participating teams.

The experience is intentionally visual and motion-led instead of looking like a conventional hackathon template.

🎯 Project Goals

Build a memorable first impression through a cinematic hero experience.

Use scroll-driven storytelling and purposeful animation.

Keep the interface dark, editorial, and visually refined.

Make the information architecture simple and easy to scan.

Provide a reliable team-registration flow.

Keep the backend small and focused on the actual requirement: registration + database storage.

Make the repository easy for a multi-person team to contribute to.

🧩 Tech Stack

Frontend

Technology

Purpose

React

UI and component architecture

Vite

Development and build tooling

TypeScript

Type-safe frontend code

Tailwind CSS

Utility-based styling

GSAP

Animation engine

GSAP ScrollTrigger

Scroll-based animation and reveals

Lenis

Smooth page scrolling

React Hook Form

Registration form state

Zod

Client-side validation

Fetch / Axios

API communication

Lucide React

Lightweight icons where needed

Backend

Technology

Purpose

Node.js

Backend runtime

Express.js

REST API

TypeScript

Type-safe backend code

Zod

Server-side request validation

CORS

Controlled frontend/API access

Helmet

HTTP security headers

express-rate-limit

Basic request protection

Database

Technology

Purpose

PostgreSQL

Registration data storage

Supabase

Hosted PostgreSQL database

Current backend scope

The backend is intentionally minimal.

Registration Form
       ↓
POST /api/register
       ↓
Express
       ↓
Validate + duplicate check
       ↓
PostgreSQL / Supabase
       ↓
Success / Error response

No extra backend systems are required unless the project scope changes.

🎬 Visual Direction

Hack for Good uses a dark cinematic editorial aesthetic with warm terracotta/orange accents.

Design principles

strong typography

large-scale imagery

generous negative space

thin borders

restrained accent color

cinematic artwork

subtle micro-interactions

scroll-driven storytelling

Avoid

generic SaaS layouts

excessive glassmorphism

neon cyberpunk styling

random gradients

decorative clutter

unnecessary 3D effects

fake statistics or testimonials

animation for the sake of animation

The artwork and typography should carry the experience.

🌀 Motion System

Motion is a core part of the frontend.

Lenis

Responsible for:

Smooth page scrolling

GSAP + ScrollTrigger

Responsible for:

Hero entrance
↓
Section reveals
↓
Scroll-linked motion
↓
Parallax
↓
Pinned storytelling
↓
Timeline animation
↓
Micro-interactions

Motion rule

Motion should communicate hierarchy, not compete with the content.

Large visual movements are reserved for storytelling sections. Most UI interactions remain subtle.

The project also respects prefers-reduced-motion.

🏗️ Project Architecture

hack-for-good/
│
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
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── DESIGN.md
└── README.md

🖥️ Website Sections

The current website is structured around:

Navbar
   ↓
Hero
   ↓
About
   ↓
Challenges / Tracks
   ↓
Timeline / How It Works
   ↓
Prizes
   ↓
FAQ
   ↓
Registration
   ↓
Footer

Each section should remain modular so contributors can work without unnecessary conflicts.

📝 Registration System

The registration system is intentionally simple.

Registration data

The form can collect:

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

API

POST /api/register

Expected responses

Status

Meaning

201

Registration saved

400

Invalid request data

409

Duplicate registration/team/email

429

Too many requests

Validation rules

Server-side validation must always happen even when the frontend already validates the form.

Never trust browser validation alone.

🛠️ Local Development

1. Clone

git clone https://github.com/YOUR-USERNAME/hack-for-good.git
cd hack-for-good

2. Frontend

cd frontend
npm install
npm run dev

3. Backend

Open another terminal:

cd backend
npm install
npm run dev

🔐 Environment Variables

Frontend

VITE_API_BASE_URL=http://localhost:5000

Backend

PORT=5000
DATABASE_URL=your_database_connection
FRONTEND_ORIGIN=http://localhost:5173

Use .env.example for documentation.

Never commit real secrets.

🌿 Git Workflow

We use the fork → branch → pull request workflow.

Start from latest main

git checkout main
git pull upstream main

Create a feature branch

git checkout -b feature/<task-name>

Examples:

feature/navbar-footer
feature/hero
feature/about
feature/tracks
feature/register-page
backend/api

Commit

git status
git add <your-files>
git commit -m "feat: add about section"
git push origin feature/<task-name>

Then open a pull request.

📌 Contribution Rules

Do

keep commits small and focused

work only in your assigned area

test on desktop and mobile

check the browser console

keep components reusable

communicate before changing shared files

open a pull request for every task

Don't

push directly to main

commit node_modules

commit .env

commit API keys or passwords

rewrite another contributor's section without coordination

add unrelated refactors to a feature PR

👥 Team Structure

The current team guide divides the work into frontend and backend ownership.

Frontend

F1 → Foundation / shared setup
F2 → Navbar / Footer
F3 → Hero
F4 → About
F5 → Tracks / How It Works
F6 → Prizes / Partners
F7 → FAQ / page details
F8 → Registration page

Backend

B1 / B2 → Registration system + database

Keep ownership boundaries clear, especially around shared files.

✅ Pre-Merge Checklist

Before opening a PR:

Page loads without console errors

No horizontal overflow

Desktop layout works

Mobile layout works

GSAP animations work correctly

Lenis scrolling remains smooth

Reduced-motion behavior works

Only intended files changed

No secrets are committed

Registration validation works

Duplicate registrations are handled

API returns the expected status code

🚀 Deployment

Recommended deployment setup:

Frontend
   ↓
Vercel

Backend
   ↓
Render / Railway

Database
   ↓
Supabase PostgreSQL

The production frontend should communicate with the deployed API through the configured API base URL.

📚 Documentation

The repository also contains:

DESIGN.md

Use it as the source of truth for:

visual language

color system

typography

layout rules

animation principles

responsive behavior

artwork handling

accessibility

performance constraints

🧭 Project Philosophy

Hack for Good is frontend-heavy by design.

That means:

Rich visual experience
        +
Purposeful motion
        +
Clear information
        +
Simple registration backend
        =
Hack for Good

The frontend should be expressive.

The backend should be boring, reliable, and secure.

<div align="center">

⚡ Hack for Good

Build. Solve. Impact.

Made by the Hack for Good team • Nexus (Coding Ninjas ITER)

</div>
