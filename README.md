# KeenVector web

Public marketing site + product UI (auth, onboarding, dashboard) for KeenVector, a business
communication platform built for the WhatsApp Business Platform. Built with Vite + React +
TypeScript + Tailwind CSS + React Router, using shared components from
[`@keenvector/kvcl`](../kvcl).

Truthfulness constraints (see `SANDESHA_REACT_FRONTEND_BUILD.md` on the author's Desktop,
the original build spec): no claims of Meta partnership/approval/certification, no
fabricated customers/testimonials/revenue, no real Meta credentials in frontend source.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_API_BASE_URL` empty means no backend — the registration flow falls back to a
graceful mock success so the UI can be exercised end to end without a backend.

`VITE_CHAT_API_BASE_URL` is **required for the contact form**, which has no such fallback:
it posts to `tenant-site`'s public `/public/sites/{slug}/leads`, and an unset value fails
every submit. Set it in every environment that builds this site — `.env` is gitignored, so
a Vercel or container build does not inherit yours. Vite reads `.env` only at startup:
after editing it, restart the dev server.

## Build

```bash
npm run build     # type-checks and produces dist/ — a static SPA bundle
npm run preview    # serve the production build locally
```

## AWS hosting

The build output in `dist/` is a plain static SPA — no server-only APIs are used, so it
deploys to:

- **S3 + CloudFront** (recommended): upload `dist/` to an S3 bucket, serve through
  CloudFront with a custom error response mapping 403/404 to `/index.html` (client-side
  routing needs this — React Router handles the path once the SPA loads).
- **EC2 + Nginx** (initial/simpler): serve `dist/` as static files, with an nginx
  `try_files $uri /index.html;` fallback for the same reason.

Point `VITE_API_BASE_URL` at the real backend (e.g. `https://api.keenvector.com`) at build
time for each environment — never hardcode a host in source.

## Structure

```
src/
  components/    shared page-local components (Logo, Seo)
  layouts/       MarketingLayout, AuthLayout, DashboardLayout
  pages/
    marketing/   /, /features, /pricing, /about, /contact
    auth/        /login, /register, /forgot-password
    legal/       /privacy, /terms, /acceptable-use, /data-deletion, /whatsapp
    dashboard/   /dashboard
    settings/    placeholder settings pages
  features/      inbox, contacts, templates, automation, analytics, whatsapp
  services/
    api/         typed calls to the real backend (contact, auth)
    mock/        demo data for feature pages, isolated so it's swappable later
    whatsapp/    WhatsAppOnboardingService — stub until Meta Embedded Signup is wired up
  hooks/         useTenant — multi-tenant context for the dashboard shell
  config/        site copy/nav, pricing data, env var typing
```
