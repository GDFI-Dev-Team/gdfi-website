# AGENTS.md

Guidance for AI coding agents working in the GDFI website repo. Follow these conventions when reading, writing, or refactoring code.

---

## Project

GDFI foundation website — public-facing.

## Stack

- Next.js
- Tailwind CSS v4

---

## Styling rules

Two layers: **tokens** (raw values) and **components** (semantic usage). Keep them separate.

**Typography**

- All UI text (nav, buttons, headings, card titles, labels) renders through the `Heading` / `Text` components. Never write raw `text-*`, `font-*`, or `leading-*` on UI text.
- Use `prose` (`@tailwindcss/typography`) **only** for long-form editorial content (About narrative, publication/report bodies). Never apply `prose` to UI chrome.
- Headings are responsive inside the `Heading` component — do not add breakpoint sizing at call sites.

**Color**

- Colors use two tiers in `globals.css`: a raw palette (Tier 1) mapped to **role tokens** (Tier 2) — `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-hover`, `--color-ring`, `--color-accent`, plus state colors.
- Components use only role tokens (`bg-background`, `text-text`, `hover:bg-hover`, `ring-ring`). Never use a raw palette color (`bg-brand-500`) or raw hex at a call site.
- Applying a color to a new area or state (background, hover, border, focus) means adding/adjusting its role-token mapping in `globals.css` first, then using the role.

**Spacing & layout**

- Spacing uses Tailwind defaults (`p-*`, `gap-*`, `space-y-*`). Add a custom value to `@theme` only when the same value repeats 3+ times.
- Vertical rhythm between sections → `Section`.

---

## Component organization

- `components/ui/` — reusable primitives (`Heading`, `Text`, `Button`, `Container`, `Section`)
- `components/layout/` — `Navbar`, `Footer`
- `features/<domain>/` — feature-specific components (e.g. `features/programs/`, `features/biodiversity/`)
- `app/` — routes

Rules:

- Promote a component into `components/ui/` only after it is reused 3+ times (rule of three). Until then keep it local to its feature.
- Colocate a component's files: `Component.tsx`, `Component.test.tsx`, `Component.stories.tsx`, `index.ts`.

---
