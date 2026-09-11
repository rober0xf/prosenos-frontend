# AI Agents Guidelines (`AGENTS.md`)

Welcome, AI Agent! This document outlines the technical stack, architectural patterns, and development standards for this project. Adhere to these rules strictly to ensure consistency, performance, and type safety.

---

## Tech Stack Overview

* **Runtime & Package Manager:** Bun (Do **not** use `npm`, `yarn`, or `pnpm`)
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript (Strict mode enabled)
* **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
* **State Management:** React `useState` (no library for now)
* **Routing:** Next.js App Router with URL search params (`?date=DD-MM-YYYY`)

---

## Bun-Specific Command Reference

Always use `bun` commands. Never generate instructions or run scripts using `npm` or `npx`.

* **Installing dependencies:** `bun add <package>` or `bun add -d <package>` (dev)
* **Running the app:** `bun run dev`
* **Building:** `bun run build`
* **Linting:** `bun run lint`
* **Verifying types:** `bunx tsc --noEmit`
* **Executing binaries:** Use `bunx` instead of `npx`

---

## Architecture & Component Rules

### 1. File Structure
Keep the project modular. Follow this general structure:
```text
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Server component: parses date, fetches initial matches
│   └── globals.css      # Tailwind + global styles
├── components/          # Reusable UI components
│   ├── MatchView.tsx    # Client component: interactive state, date nav, sport tabs
│   ├── SportTabs.tsx
│   ├── DateNavigator.tsx
│   ├── LeagueSection.tsx
│   ├── MatchCard.tsx
│   └── StatusBadge.tsx
├── api/                 # Fetch functions + mapping helpers
│   ├── helpers.ts
│   └── matches.ts
├── hooks/               # Client-side hooks
│   └── useMatches.ts
├── types/
│   └── index.ts         # Match, Team, Sport, etc.
└── utils/
    └── cleanLogoName.ts # Logo path resolution from team/league names
```

### 2. Server vs. Client Components
* `src/app/page.tsx` is a **Server Component**: parses the `?date=` search param, fetches initial matches from the backend, and passes serialized data to `MatchView`.
* `src/components/MatchView.tsx` (and anything using `useState`, `useRouter`, `useSearchParams`, or `useEffect`) must have the `"use client"` directive.
* Client-side re-fetches on date change go through `useMatches`, which calls `fetchMatches` (relative `/api/...` URLs work in the browser).
* When fetching server-side, pass the full backend URL: `fetchMatches(date, "http://localhost:8000")`.

### 3. API Proxy
`next.config.ts` rewrites `/api/:path*` → `http://localhost:8000/api/:path*`. Since rewrites only apply in the browser, server components must construct absolute URLs directly.

### 4. Routing & Date
The selected date lives in the URL as `?date=DD-MM-YYYY`. `MatchView` reads it via `useSearchParams` and navigates with `useRouter.push`. No `history.replaceState`.

### 5. Tailwind CSS
Tailwind v4 is configured via `postcss.config.mjs` (`@tailwindcss/postcss` plugin). Styles import `@import "tailwindcss"` in `globals.css`. No `tailwind.config` file.

### 6. Public Assets
`bg.webp`, `favicon.svg`, `icons.svg`, and `logos/` live in `public/`. They are referenced from the root path (e.g. `/bg.webp`, `/logos/<name>.svg`) — do **not** prefix with `/public/`.