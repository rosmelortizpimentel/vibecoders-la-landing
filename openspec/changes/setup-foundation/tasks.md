# Tasks: setup-foundation

## Phase 1: Project Configuration

- [x] 1.1 Create `package.json` — declare Astro 5, `@astrojs/vercel`, `@astrojs/sitemap`, `@astrojs/tailwind`, Tailwind CSS v4, shadcn deps; pnpm workspace
  - Files: `package.json`
  - Depends on: none
  - Done when: `pnpm install` completes with zero errors

- [x] 1.2 Create `astro.config.mjs` — `output: 'hybrid'`, Vercel adapter, sitemap integration, Tailwind integration
  - Files: `astro.config.mjs`
  - Depends on: 1.1
  - Done when: config file is valid ESM; no TypeScript errors
  - NOTE: Astro 5 removed `output: 'hybrid'` — using `output: 'static'` which has the same behavior (hybrid merged into static)

- [x] 1.3 Create `tsconfig.json` — `strict: true`, `@/*` path alias mapped to `src/*`
  - Files: `tsconfig.json`
  - Depends on: 1.1
  - Done when: TypeScript resolves `@/` imports in any `src/` file

- [x] 1.4 Create `src/env.d.ts` — Astro + Vite env type declarations for all `PUBLIC_*` vars
  - Files: `src/env.d.ts`
  - Depends on: 1.1
  - Done when: `import.meta.env.PUBLIC_SUPABASE_URL` is typed as `string`

- [x] 1.5 Create `.env.example` — declares `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_PLATFORM_URL`, `PUBLIC_SITE_URL`
  - Files: `.env.example`
  - Depends on: none
  - Done when: file lists all 4 vars with empty or example values

- [x] 1.6 Create `public/robots.txt` — allow all crawlers, sitemap reference
  - Files: `public/robots.txt`
  - Depends on: none
  - Done when: file contains `User-agent: *` and `Allow: /`

## Phase 2: Design System

- [x] 2.1 Create `src/styles/globals.css` — `@import "tailwindcss"`, `@theme` block with all CSS custom properties (`--color-brand-yellow: #EFDF00`, `--color-brand-black`, `--color-brand-white`, `--color-brand-blue`, `--color-surface-charcoal`, `--color-surface-silver`, `--color-border`, `--color-text-muted`, `--shadow-{1-6}`), global button reset (`border-radius: 0 !important`), pill exception for `input[type="search"]`, Space Grotesk `@import` from Google Fonts
  - Files: `src/styles/globals.css`
  - Depends on: 1.1
  - Done when: all tokens defined; dev server shows correct colors; no button has border-radius

- [x] 2.2 Create `tailwind.config.mjs` — extend theme to expose `brand-yellow`, `brand-black`, `brand-white`, `brand-blue`, `surface-charcoal`, `surface-silver`, `border`, `text-muted` as Tailwind utility classes referencing CSS vars from 2.1
  - Files: `tailwind.config.mjs`
  - Depends on: 2.1
  - Done when: `bg-brand-yellow` applies `#EFDF00` in the browser

## Phase 3: Layouts & Components

- [x] 3.1 Create `src/layouts/BaseLayout.astro` — `<html lang="es">`, `<head>` with meta charset/viewport/title/description, `<link preconnect>` to Google Fonts, globals.css import, `<Header />`, `<slot />`, `<Footer />`
  - Files: `src/layouts/BaseLayout.astro`
  - Depends on: 2.1, 3.2, 3.3
  - Done when: renders valid HTML with Header and Footer slots

- [x] 3.2 Create `src/components/Header.astro` — sticky white nav, logo text "VibeCoders", nav links at 13px/700 weight, black primary CTA button (`border-radius: 0`, black bg, white text) linking to `platformCTA('nav')`
  - Files: `src/components/Header.astro`
  - Depends on: 2.2, 5.2
  - Done when: CTA button is black, zero border-radius; logo renders; nav links present

- [x] 3.3 Create `src/components/Footer.astro` — multi-column layout: logo + tagline, nav columns (Platform, Content, Legal), social icons, copyright line
  - Files: `src/components/Footer.astro`
  - Depends on: 2.2, 5.1
  - Done when: footer renders in all 3 columns; copyright year is current

- [x] 3.4 Create `src/pages/index.astro` — wraps `BaseLayout`, dark full-viewport hero section, 56px heading, subtitle, yellow super-primary CTA (`bg-brand-yellow`, black text, `border-radius: 0`) + ghost CTA; both CTAs use `platformCTA`
  - Files: `src/pages/index.astro`
  - Depends on: 3.1, 5.2
  - Done when: SC-001 and SC-002 pass; yellow CTA visible; ghost CTA visible

## Phase 4: Content Collections

- [x] 4.1 Create `src/content/config.ts` — `defineCollection` × 6 with Zod schemas:
  - `blog`: full schema with title, description, publishedAt, author, cover, tags, cluster, featured, readingTime, draft
  - `charlas`: full schema with sessionNumber, title, speaker, recordedAt, video, topics, resources, timestamps, etc.
  - `recursos`: title, description, type, tags, compatibleTools, difficulty, publishedAt, author, draft
  - `tools`: name, tagline, category, website, logo (image), pricing, pros, cons, bestFor, etc.
  - `learn`: moduleNumber, title, description, durationMinutes, prerequisites, outcomes, draft
  - `glosario`: term, acronym, shortDefinition, category, relatedTerms, draft
  - Files: `src/content/config.ts`
  - Depends on: 1.3
  - Done when: all 6 collections defined; TypeScript compiles; SC-003 passes

- [x] 4.2 Create placeholder MDX files for all 6 collections — minimal valid frontmatter matching each Zod schema
  - Files: `src/content/blog/placeholder.mdx`, `src/content/charlas/placeholder.mdx`, `src/content/recursos/placeholder.mdx`, `src/content/tools/placeholder.mdx`, `src/content/learn/placeholder.mdx`, `src/content/glosario/placeholder.mdx`
  - Depends on: 4.1
  - Done when: `pnpm build` processes all 6 files without Zod validation errors

## Phase 5: Types & Utilities

- [x] 5.1 Create `src/lib/constants.ts` — export `SITE_NAME = 'VibeCoders'`, `SITE_DESCRIPTION`, `SITE_URL` (from `import.meta.env.PUBLIC_SITE_URL`), `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  - Files: `src/lib/constants.ts`
  - Depends on: 1.4
  - Done when: all 5 exports present; TypeScript strict compliant; no `any`

- [x] 5.2 Create `src/lib/urls.ts` — export `PLATFORM_URL` (from `PUBLIC_PLATFORM_URL`), `platformCTA(ref: string, path?: string): string` returning `${PLATFORM_URL}${path ?? ''}?ref=${ref}`
  - Files: `src/lib/urls.ts`
  - Depends on: 1.4
  - Done when: SC-004 passes — `platformCTA('hero')` returns `https://app.vibecoders.la?ref=hero`

- [x] 5.3 Create `src/types/builder.ts` — `Builder` interface with all fields from design model
  - Files: `src/types/builder.ts`
  - Depends on: 1.3
  - Done when: TypeScript compiles; no `any`; interface exported as named export

- [x] 5.4 Create `src/types/app.ts` — `AppListItem` interface with all fields from design model
  - Files: `src/types/app.ts`
  - Depends on: 1.3
  - Done when: TypeScript compiles; no `any`; interface exported as named export

- [x] 5.5 Create `src/data/builders.json` — mock `Builder[]` array (≥2 entries) conforming to `Builder` interface
  - Files: `src/data/builders.json`
  - Depends on: 5.3
  - Done when: JSON is valid; TypeScript `import data from '@/data/builders.json'` resolves without errors

- [x] 5.6 Create `src/data/apps.json` — mock `AppListItem[]` array (≥2 entries) conforming to `AppListItem` interface
  - Files: `src/data/apps.json`
  - Depends on: 5.4
  - Done when: JSON is valid; TypeScript `import data from '@/data/apps.json'` resolves without errors

## Verification Checklist

- [x] V.1 `pnpm install` exits 0 (SC-001 pre-condition)
- [ ] V.2 `pnpm dev` starts on localhost:4321 without errors (SC-001) — not verified (no running server in CI)
- [x] V.3 `/` renders `Header` + `Footer` + hero content (SC-002) — verified via `pnpm build`
- [x] V.4 All buttons on `/` have zero border-radius (SC-002) — enforced globally in globals.css
- [x] V.5 `pnpm build` exits 0 — all 6 MDX files validated (SC-003) ✅
- [x] V.6 `platformCTA('hero')` returns `https://app.vibecoders.la/?ref=hero` (SC-004) — uses URL constructor
