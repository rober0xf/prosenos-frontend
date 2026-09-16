# AI Agents Guidelines (`AGENTS.md`)

Welcome, AI Agent! This document outlines the technical stack, architectural patterns, and development standards for this project. Adhere to these rules strictly to ensure consistency, performance, and type safety.

---

## Tech Stack Overview

* **Runtime & Package Manager:** Bun (Do **not** use `npm`, `yarn`, or `pnpm`)
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript (Strict mode enabled)
* **Styling:** Plain CSS (no framework) — component-scoped stylesheets in `src/app/styles/`
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
│   ├── globals.css      # Global styles (body, fonts)
│   └── styles/          # Component-scoped CSS files
├── components/          # Reusable UI components
│   ├── MatchView.tsx    # Client component: interactive state, date nav, sport tabs
│   ├── MatchViewHeader.tsx
│   ├── MatchResult.tsx
│   ├── MatchCard.tsx
│   ├── MatchTimeStatus.tsx
│   ├── TeamDisplay.tsx
│   ├── ScoreColumn.tsx
│   ├── SportTabs.tsx
│   ├── DateNavigator.tsx
│   ├── LeagueSection.tsx
│   └── StatusBadge.tsx
├── api/                 # Fetch functions + mapping helpers
│   ├── helpers.ts
│   └── matches.ts
├── types/
│   └── index.ts         # Match, Team, Sport, etc.
└── utils/
    ├── cleanLogoName.ts # Logo path resolution from team/league names
    └── matches.ts       # Grouping/date-param helpers
```

### 2. Server vs. Client Components
* `src/app/page.tsx` is a **Server Component**: parses the `?date=` search param, fetches initial matches from the backend, and passes serialized data to `MatchView` via `initialMatches` / `initialError` / `initialDate` props.
* `src/components/MatchView.tsx` (and anything using `useState`, `useRouter`, `useSearchParams`, or `useEffect`) must have the `"use client"` directive.
* Rendering is server-driven: `MatchView` receives the initial data from the server; there is **no client-side match-fetching hook**. Date changes trigger a full server-side navigation via `useRouter.push`.
* When fetching server-side, pass the full backend URL: `fetchMatches(date, backendUrl)` where `backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000"`. Relative `/api/...` URLs only work in the browser.

### 3. API Proxy
`next.config.ts` rewrites `/api/:path*` → `http://localhost:8000/api/:path*`. Since rewrites only apply in the browser, server components must construct absolute URLs directly.

### 4. Routing & Date
The selected date lives in the URL as `?date=DD-MM-YYYY`. `MatchView` reads it via `useSearchParams` and navigates with `useRouter.push`. No `history.replaceState`. A missing or malformed `date` param falls back to today.

### 5. CSS & Styling
Plain CSS only — **no Tailwind, no CSS-in-JS, no CSS modules**. Rules:
* Each component imports its own stylesheet from `src/app/styles/` (e.g. `import "@/app/styles/<name>.css"`).
* No `tailwind.config`, no PostCSS plugin, no preprocessor.
* Class names follow a flat, unprefixed pattern matching the component (e.g. `.match-header`, `.sport-tab`, `.team-display-name`).
* Element-specific state classes use a modifier suffix (e.g. `.sport-tab.active`, `.team-display-name-right`, `.score-column-value-live`).

### 6. Public Assets
`bg.webp`, `favicon.svg`, `icons.svg`, and `logos/` live in `public/`. They are referenced from the root path (e.g. `/bg.webp`, `/logos/<name>.svg`) — do **not** prefix with `/public/`.