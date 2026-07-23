# CLAUDE.md — Crescent Cares

Guidance for future Claude Code sessions on this project. Read this first.

## What this project is

A **Crescent Cares** marketing site + multi-step application flow for a
**fiscal-sponsor matching** product (nonprofits find a fiscal sponsor). It was
built on top of the Vercel **`nextjs-postgres-auth-starter`** template, but the
starter's home page has been fully replaced. Everything visual is implemented
**from Figma designs** (see Figma reference below).

- **GitHub:** https://github.com/willmirhashemi/crescent-cares-landing (branch `main`)
- **Package manager: npm** (we removed `pnpm-lock.yaml`; `package-lock.json` is the lockfile). Do NOT reintroduce pnpm.
- Dev server: `npm run dev` (runs `next dev --turbo`).

## Stack

- **Next.js 14** (App Router), React 18, **TypeScript**.
- **Tailwind CSS v3** (config `tailwind.config.ts`, empty theme — we use arbitrary values like `bg-[#263c42]`).
- **Inter** font, applied globally in `app/layout.tsx` via `next/font/google`.
  - ⚠️ The starter shipped Geist but only set its CSS *variable*, never the `font-family` — so it was silently rendering in system font. We switched to Inter (closest free match to the design's paid **TWK Lausanne**). Don't revert.
- **Instrument Serif** (italic) — used only for the accent words in headings (e.g. *right fiscal sponsor*, *deserves*, *submitted!*). Instantiated locally in the files that need it.
- `next-auth` v5 beta + Postgres/Drizzle come from the starter but are **not central**; the app is not DB-backed yet.
- **Playwright** (dev dep) — installed for visual verification (see Workflow below).

## Routes / structure

| Route | File | What |
|---|---|---|
| `/` | `app/page.tsx` | Landing page (hero, how-it-works, "why projects", CTA, footer). Server component. |
| `/apply` | `app/apply/page.tsx` | **"New" org** flow — 5-step client wizard (name, email, confirm code, company details, chat-style "a few more details"). |
| `/apply/existing` | `app/apply/existing/page.tsx` | **"Existing" org** flow — 8-step client wizard + submitted screen. |
| `/login`, `/register`, `/protected` | starter pages | Untouched auth starter pages. |

Key shared components:
- `app/application-card.tsx` — client hero card. Holds New/Existing selection state; "Start application" routes **New → `/apply`**, **Existing → `/apply/existing`**. Has `id="apply"`.
- `app/stage-selector.tsx` — the New/Existing radio options (used by ApplicationCard via `onChange`).
- `app/apply/existing/types.ts` — `ExistingData` + `StepProps` types.
- `app/apply/existing/ui.tsx` — shared primitives used by every Existing step: `Field`, `TextInput`, `Textarea`, `SelectMenu`, `OrDivider`, `ChipGroup`, `inputClass`.
- `app/apply/existing/steps/*.tsx` — one **body-only** component per step (renders fields only; the shell renders header/progress/title/nav).

## Design system / tokens

Use these exact hex values (they are the Figma "UI" tokens):

| Token | Hex | Use |
|---|---|---|
| ui-100 | `#263c42` | page background |
| ui-200 | `#2a4248` | input/field background, card bg |
| ui-300 | `#2c464d` | selected/hover surfaces |
| ui-400 | `#2e4c54` | panels, chips (unselected), pills |
| dark | `#1a2b32` | info boxes, magnifier handle |
| purple | `#d2b4fe` | accent (serif words, selected states, progress bar) |
| mint | `#e2f1e7` | primary button bg |
| green badge | `#2eb67d` | match/"Matching…" badges |
| gold badge | `#b69f2e` | lower match % badge |
| secondary text | `#babfc1` | == `white/70` over `#1a2b32` (info-box helper text) |

Text: white for primary; `white/50`–`white/70` for secondary (the user prefers strong white↔grey contrast). Global `body { letter-spacing: -0.015em }` in `globals.css` tightens everything; Tailwind `tracking-*` still overrides per element. Display headings also use `tracking-[-0.015em]`.

Assets live in `public/crescent/` (logo.svg + icons downloaded from Figma). The logo SVG was edited to `preserveAspectRatio="xMidYMid meet"` with real dimensions — don't revert to `preserveAspectRatio="none"`.

## Figma reference

- **fileKey:** `84AVQ4HjBTcNnO9FU8Svut` (Crescent Cares). Access via the `claude.ai Figma` MCP (`get_design_context`, `get_screenshot`). Requires Dev/Full seat — earlier a "View seat" blocked it; it works now.
- Landing frame: node `3420-5371`.
- New flow steps: `3427-5608` (name), `3436-2825` (email), `3427-5791` (code), `3447-3888` (company), `3447-3535` (chat).
- Existing flow: `3447-4176`/`4204`/`4232` (name/email/code), `3448-5230` & `3448-4829` (org search + IRS-autofill), `3448-4979` (mission), `3448-5313` (budget), `3448-5380` (funding), `3448-5472` (focus), `3448-5610` (last), `3449-5824` (submitted).

## The two flows (details)

Both wizards are single client components that hold all answers in one `data`
object, persist to `localStorage` on each Continue, support `?step=N` deep-links,
and derive the progress bar + "Step X of N" from the current step (never hardcode).

**New flow (`/apply`, 5 steps):** name → email → confirm code (6-box) → company
details → chat-style "few more details". localStorage key `crescent-application`.

**Existing flow (`/apply/existing`, 8 steps):** name → email → confirm code →
**org details** (search 1.8M nonprofits; pressing Enter simulates an IRS match
that prefills EIN/State/Zip + shows "Information pulled from IRS record"; "Enter
manually" reveals blank fields) → mission & program (upload zone + textareas) →
budget (two selects) → funding sources (multi-select chips) → focus areas (chips)
→ last details → **submitted screen** (fade-masked preview card + ref # CR-2026-5222D).
localStorage key `crescent-application-existing`. Note email+code both show
"Step 2 of 8"; org has search+autofill states — screen index ≠ progress `fill`.

## Conventions & gotchas

- **Screenshot-verify visual work.** Claude can't see rendered pixels otherwise. Playwright + headless Chromium is installed. Pattern used: start `next dev` on a spare port (e.g. 3199), drive `chromium.launch()` from a `.mjs` in the scratchpad importing playwright by ABSOLUTE path (`.../node_modules/playwright/index.js`, and it's CommonJS: `import pw from '...'; const { chromium } = pw`), screenshot `/route?step=N`, then `Read` the PNG. This is the real pixel gate — code-review agents can't see pixels.
- **`.next` cache corruption.** `next dev --turbo` throws `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'` when `.next` is modified under a running server (e.g. after `npm i` or deleting `.next` live). Fix: `rm -rf .next && npm run dev`. Not a code bug.
- **AUTH_SECRET.** The starter's `middleware.ts` runs next-auth on every request and spams `MissingSecret` without it. There's an `AUTH_SECRET` in **`.env.local`** (gitignored, never commit). If it's missing on a fresh clone, generate: `printf "AUTH_SECRET=%s\n" "$(openssl rand -base64 32)" > .env.local`.
- **Lower landing CTAs** ("Apply now", "Apply in 5 minutes") are `#apply` anchors that smooth-scroll to the hero card (so users pick New/Existing) — NOT direct flow links. Only the card's "Start application" enters a flow.
- The magnifier illustration in landing card 2 (`app/page.tsx`) was hand-tuned via screenshot iteration to match Figma (grey ring, dimmed figures showing through, `$8%`, ferrule + handle). It's not a real optical magnifier.

## Multi-agent workflows (used this session)

The `Workflow` tool fanned out parallel agents to (a) build the 9 Existing-flow
step components from Figma-derived specs and (b) review each against its spec.
Agents build/review from **text specs I provide** (they may not have Figma MCP
access in background runs), write to **separate files** (no conflicts), and
return structured results. The user calls this "spawn superset agents"; use the
`Workflow` tool for it. Always finish with a Playwright screenshot pass.

## User preferences (important)

- **Pixel-perfect to Figma** is the bar. When something's off, pull the exact
  frame and match colors/spacing precisely; verify with a screenshot.
- Prefers being shown results (screenshots) and reviewing together.
- Wants work committed + pushed when a batch is done (asks explicitly).
- Fix typos toward correctness even if the Figma has them (e.g. "acheive"→"achieve"),
  but flag it.
