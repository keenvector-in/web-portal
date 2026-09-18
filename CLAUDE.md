# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public marketing site for KeenVector (a WhatsApp Business Platform CPaaS), built with Vite + React + TypeScript + Tailwind + React Router, using `@keenvector/kvcl`. See `README.md` for local setup, build, and AWS (S3+CloudFront / EC2+nginx) hosting notes — don't repeat those here.

**Truthfulness constraint** (from the original build spec, `SANDESHA_REACT_FRONTEND_BUILD.md`): no claims of Meta partnership/approval/certification, no fabricated customers/testimonials/revenue, no real Meta credentials in frontend source.

**Scope drift to know about:** this repo currently also contains a full logged-in product shell — `/login`, `/register`, `/dashboard`, `/inbox`, `/contacts`, `/templates`, `/analytics`, `/settings/*` (see `src/App.tsx`). That product surface is being rebuilt properly as `business-admin-portal` (tenant onboarding/admin/integrations) and `super-admin-portal` (cross-tenant). Don't extend the dashboard/settings pages here — new product work belongs in those repos; this repo's job is narrowing back down to the marketing site (`/`, `/features`, `/pricing`, `/about`, `/contact`, legal pages) plus `/login` as the entry point that routes to the right app.

## Architecture

- **kvcl dependency is not `file:../kvcl` here**, unlike `business-admin-portal`/`super-admin-portal`. This repo is a yarn workspace root (`workspaces: ["packages/kvcl"]`) with its own copy of kvcl vendored under `packages/kvcl` — a real directory, not a symlink to the top-level `../kvcl`. Changes to the shared `kvcl` repo do not automatically appear here; they'd need to be synced into `packages/kvcl` separately. Building runs the workspace's kvcl build first: `yarn workspace @keenvector/kvcl build && tsc -b && vite build`.
- `src/config/env.ts` is the single point of access for `import.meta.env.VITE_*` — vars here (`VITE_API_BASE_URL`, `VITE_META_APP_ID`, `VITE_WHATSAPP_CONFIG_ID`, feature flags) are unrelated to `business-admin-portal`'s env (webhook-ingress/tenant-id) since these apps talk to different things.
- `src/services/api/` are typed real-backend calls; `src/services/mock/` is demo data for feature pages, deliberately isolated so it's swappable when a real backend lands. `env.apiBaseUrl` empty is the signal to fall back to mock/graceful-success behavior — see `services/api/client.ts`'s `apiPost`.
- `src/hooks/useTenant.tsx` provides a `Tenant` via context, currently hardcoded to a demo tenant — not wired to real auth/tenant resolution yet.
- `src/services/whatsapp/WhatsAppOnboardingService.ts` is a stub pending Meta Embedded Signup integration.

## Product role map

Across the KeenVector frontends, `/login` is the entry point that routes a user into one of the role-specific apps:
- **Public website** (this repo) — logged-out marketing site.
- **Business admin** (`business-admin-portal`) — a tenant's own onboarding, admin/team, and integrations.
- **Super admin** (`super-admin-portal`) — KeenVector staff, cross-tenant.
- **Developer docs** (`docs`) — reachable only after logging into `business-admin-portal`.

## Related repos (siblings under `keenvector.in/`)

- `kvcl` — canonical shared component library (this repo currently vendors its own copy, see above).
- `business-admin-portal`, `super-admin-portal` — where this repo's dashboard/settings pages are being rebuilt.
- `docs` — developer docs, linked from `business-admin-portal` post-login, not from here.
- `core-engine` — Go backend this frontend's `services/api/` calls target.
