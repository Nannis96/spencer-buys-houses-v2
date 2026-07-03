# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js 16 (App Router) marketing site + lead-gen tool + internal CMS for a "we buy houses" real estate business (Spencer Buys Houses, Memphis/Tennessee/Mississippi area). Public pages generate cash-offer leads; an authenticated `/dashboard` lets staff manage blog posts, service pages, and API tokens.

This repo is independent from the sibling `../blog-wp` project — that is a completely separate WordPress site (`blog.spencerbuyshouses.com`) with its own database and Docker stack. The `Post`/blog system in *this* app (Prisma-backed, under `/dashboard/blog`) is a different, custom-built blog and does not share data with WordPress.

## Commands

Package manager is **pnpm** (`packageManager` pinned in `package.json`).

```bash
pnpm dev             # dev server (localhost:3000)
pnpm build           # production build
pnpm start           # run production build
pnpm lint            # eslint
```

Prisma (client output is `app/generated/prisma`, not the default location — gitignored, must be generated locally/in-container):

```bash
pnpm prisma generate                       # after any schema.prisma change
pnpm prisma migrate dev --name <name>       # create + apply a migration
pnpm prisma migrate reset                   # ⚠ wipes data, reapplies migrations
pnpm prisma db push                         # sync schema without a migration
pnpm prisma db seed                         # run the main seeder (creates admin user)
npx tsx prisma/seed/<file>.ts               # run one specific seeder file
pnpm prisma studio                          # DB admin UI
```

Docker (two environments; see `docs/docker-guide.md`):

```bash
docker compose up -d --build                                  # dev (Dockerfile.dev, hot reload, port 3000 + postgres 5432)
docker compose -f docker-compose.stage.yml up -d --build       # staging (Dockerfile.stage, standalone build)
docker compose -f docker-compose.stage.yml exec web npx prisma migrate deploy
docker compose -f docker-compose.stage.yml exec web npx tsx prisma/seed/<file>.ts
```

The staging/runner image is a Next.js `standalone` build and does **not** include `pnpm` — inside that container always use `npx prisma` / `npx tsx`, never `pnpm`.

Standalone scripts (run from repo root, outside Next.js — `.env.local` is not auto-loaded, see script header for the dotenv workaround):

```bash
node scripts/geocode-properties.mjs   # build-time geocoding, see docs/geocode-properties-guide.md
```

There is no test suite/framework configured in this repo.

## Architecture

**Two independent auth systems** — don't conflate them:
- **NextAuth** (`lib/auth.ts`, Credentials provider + Prisma adapter, JWT session strategy) protects the `/dashboard` UI (human login via email/password, bcrypt-hashed).
- **A separate hand-rolled Bearer-JWT system** (`lib/jwt.ts` using `jose`, `lib/api-auth.ts`'s `requireApiAuth` helper) authorizes *programmatic* access to `app/api/*` routes for external integrations. Tokens are minted at `POST /api/auth/token` (email+password → JWT) and rotated/stored via `/api/token` (backed by the `ApiToken` Prisma model). `scripts/regenerate_tokens.js` is invoked by cron (`crontab/cron_entries.txt`, installed via `scripts/install_cron.sh`) to rotate tokens periodically.

**Mutations go through Server Actions, not API routes.** Files under `lib/*-actions.ts` (`blog-actions.ts`, `service-actions.ts`, `s3-actions.ts`, `sitemap-actions.ts`) are `'use server'` modules called directly from dashboard components. `app/api/*` route handlers exist specifically for cases needing a plain HTTP contract: external/Bearer-token access (`api/blog`), third-party proxying (`api/rentcast`, `api/geocode`), or the cash-offer calculator (`api/offers`).

**S3 uploads use a presigned-URL pattern** (`lib/s3-actions.ts`, detailed in `docs/s3-upload-system.md`): the server never streams file bytes. A Server Action validates MIME type/size, sanitizes the destination folder, and returns a 60s-TTL presigned PUT URL; the browser uploads directly to S3. Deletion (`deleteS3Object`) is hard-guarded to only allow keys under the `blog/` prefix. When adding a new image domain, update `remotePatterns` in `next.config.ts` (restart dev server after).

**Cash-offer calculator** (`app/api/offers/route.ts` + `lib/offer-calculations.ts`): fetches property/AVM/rent data from the RentCast API in parallel, then computes ARV, repair-cost estimate, and final cash offer server-side. Requires `RENTCAST_API_KEY`.

**Geocoded properties map is a build-time pipeline, not a runtime API call**: `scripts/geocode-properties.mjs` reads `scripts/properties.json`, geocodes each address (Nominatim by default, see doc for switching to Google), and writes `scripts/properties-geocoded.json`. That file is read via `readFileSync` at build time by `app/properties-we-bought/page.tsx` and passed to a client-only `PropertiesMap` (`react-leaflet`, loaded with `dynamic(..., { ssr: false })` since Leaflet needs `window`). Re-run the script manually whenever `properties.json` changes — nothing regenerates it automatically.

**Prisma models**: `User`/`Account`/`Session`/`VerificationToken` (NextAuth), `ApiToken` (external API tokens), `Post`/`PostImage` (custom blog), `Service`/`ServiceImage` (service pages). Blog/Service content models are intentionally similar/duplicated rather than sharing a generic "content" abstraction.

**Route structure**: most of `app/*` is public marketing pages, including SEO-driven location pages at `app/we-serve/[state]/[city]/page.tsx` backed by static data in `lib/cities.ts`. `app/dashboard/*` is the authenticated admin area (blog, services, sitemap tooling, API token management under `dashboard/token`). `next.config.ts` carries a large list of hand-maintained 301 redirects for legacy/renamed URLs — preserve existing entries when editing that file.

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`).
