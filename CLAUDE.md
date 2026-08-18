# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # next dev — local server on :3000
npm run build    # next build (also the only real typecheck; there is no `tsc` script)
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test framework in this repo — no test runner, no test files. Verify changes by building and by loading pages in the dev server.

Env vars live in `.env` (gitignored; `.env.example` is the template): `MONGODB_URI`, `MONGODB_DB`, `ADMIN_PASSWORD`, `RESEND_API_KEY`. Everything degrades gracefully when a var is missing — `notify.ts` silently skips email without `RESEND_API_KEY`, `proxy.ts` returns 503 without `ADMIN_PASSWORD` — so a missing var shows up as a quiet no-op rather than a crash.

## What this is

A marketing + lead-capture site for Josh Vantage Consulting Group, a UK care-sector consultancy. Next.js 16 App Router, React 19, Tailwind v4, MongoDB, deployed on Vercel. All copy is client-approved and legally sensitive (CQC regulation, sponsorship, employment outcomes) — do not paraphrase, tighten, or "improve" marketing or disclaimer copy unless asked; several commits exist purely to restore exact client wording.

## Architecture

### The three funnels

The whole site is organised around three product funnels, and that key string (`launch` | `growth` | `academy`) threads through routing, storage, and email:

- `/launch` — CQC registration for new care businesses
- `/growth` — tender writing for established providers
- `/academy` — Registered Manager leadership programme

Each funnel page is a single server component that composes the same shared kit from `components/funnel/` (`Objections`, `StepsList`, `Packages`/`LaunchPackages`, `MediaTestimonials`, `MultiStepForm`, `FunnelDisclaimer`, `StickyAssessmentCta`) with page-local content arrays. Content lives as `const` arrays at the top of the page file, not in a CMS — editing copy means editing the page. Adding a funnel means adding the key in three places: `FUNNELS` in `app/api/leads/route.ts`, and `FUNNEL_INBOX` / `FUNNEL_LABEL` in `lib/notify.ts`.

`/contact` uses a fourth pseudo-funnel key, `contact`, which posts to the same endpoint but routes by the visitor's selected "nature of enquiry" instead of by page.

### Lead flow

`MultiStepForm` / `ContactForm` (client) → `POST /api/leads` → Mongo `leads` collection → `Promise.allSettled([notifyTeam, notifyCustomer])`. The route sanitises input to flat strings (key ≤64 chars, value ≤2000) before insert, and email is deliberately non-blocking: a Resend failure must never fail a submission that was already stored.

`lib/notify.ts` sends from the verified `niravana.in` domain while the `joshvantageconsultinggroup.co.uk` funnel inboxes receive and appear as reply-to. Each funnel has its own subject line, customer acknowledgement copy, and inbox; the acknowledgement text contains deliberate legal hedges ("does not guarantee CQC registration", "does not guarantee admission").

### Admin

`/admin` redirects to `/admin/leads`. `proxy.ts` (Next 16's replacement for `middleware.ts` — see `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`) gates `/admin/:path*` with HTTP Basic auth against `ADMIN_PASSWORD`, then sets a `jv_admin` cookie so same-origin `fetch()` from the dashboard stays authenticated when the browser doesn't replay the Basic header. The admin API deliberately lives at `app/admin/api/leads/route.ts` — inside `/admin` — so the same proxy matcher protects it; do not move it under `/api`.

### Motion and visual system

- `SmoothScroll` wraps each page's `<main>`: Lenis smooth scrolling driven by the GSAP ticker, with `ScrollTrigger.update` bound to it. It bails out entirely under `prefers-reduced-motion`. Any page using `Reveal` or `PinnedGrid` needs this wrapper.
- `Reveal` is the standard fade-up-on-enter wrapper (`stagger` prop animates children individually). Always use `gsap.context()` + `ctx.revert()` for cleanup, as the existing components do.
- Design tokens are CSS custom properties on `:root` in `app/globals.css` (`--brand-navy`, `--brand-pale`, `--navy-deepest`, …), not Tailwind theme config. Reference them as `text-[var(--brand-navy)]`.
- Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-archivo` (wordmark), `--font-lora` (h2/h3, set globally in CSS), `--font-inter` (body).
- Elaborate background effects (`.silk-span`, `.funnels-bg`, `.funnel-card`, `.notch-card`) are hand-written CSS in `globals.css`, tuned to compose across section boundaries — the homepage hero and Funnels section share one continuous silk surface. Changing one class's masks or z-index can break that seam. `html, body` use `overflow-x: clip`, not `hidden`, because `hidden` creates a scroll container that breaks `position: sticky`.
- Reduced-motion handling is centralised in one `@media (prefers-reduced-motion: reduce)` block; add new animated classes to it.

### Analytics and SEO

`components/Analytics.tsx` is consent-gated GA4 — the gtag script only loads after the visitor accepts the banner, per the commitments in the Privacy Notice. Do not add tracking that runs before consent. `app/sitemap.ts` and `app/robots.ts` are code-generated and hardcode `https://joshvantage.com` as the base; `robots.ts` disallows `/admin` and `/api`, and new public routes must be added to `sitemap.ts` by hand.
