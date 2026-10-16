# FAST website

Download site for **FAST (Family Assistance & Safety Technology)**: Next.js 16 (App Router), React 19, TypeScript, GSAP + ScrollTrigger, Lenis.
No UI framework and no database dependency, so the client bundle stays small.

## Run it

```bash
nvm use            # Node 24 (>= 20.9)
cp .env.example .env.local
npm install        # or pnpm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Dependencies use caret ranges, so a fresh install gets the newest release inside each major.
To jump to the newest majors: `npx npm-check-updates -u && npm install`, then `npm run typecheck`.

## Make the buttons live

Set `WINDOWS_DOWNLOAD_URL` and `ANDROID_DOWNLOAD_URL` (https only). Until a link is set, its
button shows **Coming soon** instead of a dead link. Downloads go through `/api/download/[platform]`
(rate limited, https-only redirect, no open redirect possible because the target comes from your env).

## iPhone notify list

`POST /api/notify` stores opted-in emails in `DATA_DIR/waitlist.ndjson` (owner-only permissions).
Use a persistent private folder in production, or swap `src/lib/waitlist.ts` for Supabase/Postgres.
Email is personal information: keep a privacy policy page (POPIA) and delete the list when you launch on iPhone.

## Security

- **Nonce-based CSP** with `strict-dynamic` (`src/proxy.ts`), no `unsafe-eval` in production, `frame-ancestors 'none'`, `object-src 'none'`, `upgrade-insecure-requests`.
- HSTS, `nosniff`, frame denial, strict referrer policy, locked-down Permissions-Policy, COOP/CORP (`next.config.ts`).
- API: same-origin (CSRF) check, JSON-only, 2 KB body cap, Zod validation, honeypot, per-IP rate limits (IPs hashed with `IP_HASH_SALT`, never stored), identical replies for new and existing emails.
- No third-party scripts, fonts, analytics or trackers. Fonts are self-hosted at build time.
- Container runs as a non-root user (`Dockerfile`).
- Set `TRUST_PROXY=true` only behind a proxy you control. For several server instances replace `src/lib/rate-limit.ts` with Redis.
- Pages are rendered per request (needed for CSP nonces). If you prefer fully static pages, move to hash-based CSP.

## Interaction layer

`src/components/Interactions.tsx` + `interactions-core.ts`: custom 3D arrow cursor (mouse only, native cursor kept over form fields and on touch), hover info bubbles (`data-tip`, edit `TIP_RULES` / `ROW_TIPS` in `src/lib/content.ts`), animated right-click menu (hold Shift for the browser menu), and a different animation for every emoji.

## Data saving

About 110 KB of WebP images (app screens are drawn in HTML/CSS, so they cost no image weight) (served as AVIF/WebP by `next/image`), self-hosted subsetted fonts, lazy-loaded
below-the-fold images, Lenis loaded on demand. Smooth scrolling, the splash and the pinned tour are
skipped for visitors with reduced motion, reduced data or Save-Data on.

## Docker

```bash
docker build -t fast-website . && docker run -p 3000:3000 --env-file .env.local -v fast-data:/data fast-website
```

## Notes

Built without network access, so it has **not** been installed or compiled yet. Run `npm run typecheck` and `npm run build` first.
Helpline numbers were checked in October 2026; re-verify before launch.
