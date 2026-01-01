# Full-Stack Job Board (Frontend)

A simple role-based job board frontend built with React, TypeScript, Vite, and Tailwind CSS.  
Supports **USER** (read-only) and **ADMIN** (full CRUD) roles. Works with the backend APIs you own.

---

## Project Overview

- Role-based job board application.
- USER: can view and paginate through job listings.
- ADMIN: can view, create, update, and delete jobs.
- Role selection is done at `/` and persisted via cookie.
- Frontend is a consumer of backend APIs; backend is the source of truth.

## Tech stack

- React 20 + TypeScript
- Vite
- Tailwind CSS
- React Router 6

## Local setup

Prereqs:

- Node.js (v18+ recommended)
- npm (or pnpm/yarn)

## Setup & Run Locally

Clone the repo:

```bash
git clone <repo-url>
cd <repo-folder>
```

Install and run:

```sh
npm install
npm run dev
```

Build / preview:

```sh
npm run build
npm run preview
```

Type-check:

```sh
npm run type-check
```

## Environment

Create or update `.env` with the backend URL:

- `.env` (example)

```
VITE_BACKEND_URL=http://localhost:3000
```

This variable is consumed via `import.meta.env.VITE_BACKEND_URL` across the app (see usages in pages like [`UserJobsPage`](src/pages/UserJobsPage.tsx) and [`AdminJobsPage`](src/pages/AdminJobsPage.tsx)).

Start the dev server:

```sh
npm run dev
```

Open in browser:

http://localhost:5173

## Troubleshooting

- If the frontend cannot reach the backend, confirm `VITE_BACKEND_URL` in [.env](.env) and that the backend is running.
- CORS and cookie credentials: backend must enable CORS and allow credentials for cookie auth.
