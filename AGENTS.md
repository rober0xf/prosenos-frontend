# AI Agents Guidelines (`AGENTS.md`)

Welcome, AI Agent! This document outlines the technical stack, architectural patterns, and development standards for this project. Adhere to these rules strictly to ensure consistency, performance, and type safety.

---

## Tech Stack Overview

* **Runtime & Package Manager:** Bun (Do **not** use `npm`, `yarn`, or `pnpm`)
* **Framework:** React 19 (Vite + Bun template)
* **Language:** TypeScript (Strict mode enabled)
* **Styling:** Tailwind CSS v4 (no config file needed — `@tailwindcss/vite` plugin)
* **State Management:** React `useState` (no library for now)
* **Routing:** None (single-page MVP)

---

## Bun-Specific Command Reference

Always use `bun` commands. Never generate instructions or run scripts using `npm` or `npx`.

* **Installing dependencies:** `bun add <package>` or `bun add -d <package>` (dev)
* **Running the app:** `bun run dev`
* **Running tests:** `bun test`
* **Executing binaries:** Use `bunx` instead of `npx` (e.g., `bunx tailwindcss init`)

---

## Architecture & Component Rules

### 1. File Structure
Keep the project modular. Follow this general structure for components:
```text
src/
├── components/     # Reusable UI components
│   ├── SportTabs.tsx
│   ├── LeagueSection.tsx
│   └── MatchCard.tsx
├── data/
│   └── dummy.ts    # Dummy match data (football + NBA)
├── types/
│   └── index.ts    # Match, Team, Sport, etc.
├── App.tsx
├── main.tsx
└── index.css
