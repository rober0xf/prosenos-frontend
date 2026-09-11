# Prosenos Frontend

Next.js 16 (App Router) + TypeScript sports scoreboard. Displays football ("futbol") and NBA match scores grouped by league for a selectable date, fetched from a backend API.

## Tech Stack

- **Runtime / Package Manager:** Bun
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **State:** React `useState`

## Getting Started

```bash
bun install
bun run dev
```

The app expects a backend API on `http://localhost:8000`. In the browser, `/api/*` is proxied there via `next.config.ts` rewrites; server components hit the backend URL directly.

## Scripts

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `bun run dev`      | Start dev server (Turbopack)    |
| `bun run build`    | Production build                |
| `bun run start`    | Start production server         |
| `bun run lint`     | Run ESLint                      |
| `bunx tsc --noEmit`| Type-check without emitting     |

## Architecture Notes

- `src/app/page.tsx` is the server component: it reads `?date=DD-MM-YYYY`, fetches initial matches from the backend, and passes them to the client `MatchView`.
- `src/components/MatchView.tsx` manages interactivity (sport tabs, date navigation via `useSearchParams`/`useRouter`, re-fetches via `useMatches`).
- Public assets (`bg.webp`, logos, favicon) are served from `public/` at the root path.