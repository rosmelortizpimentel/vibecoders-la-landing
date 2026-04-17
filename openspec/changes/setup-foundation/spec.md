# Spec: setup-foundation

## Overview
Initializes the Astro 5 infrastructure for the `vibecoders-public` marketing site. Implements the Renault-inspired design system tokens, typography, base layout, and establishes the complete Zod schema architecture for MDX content collections and mock data.

## Requirements

### REQ-001: Astro Project Initialization
The system MUST initialize an Astro 5 project using `pnpm`.
The output mode MUST be set to `hybrid` in `astro.config.mjs`.
The project MUST include `@astrojs/vercel` adapter and `@astrojs/sitemap` integration.
The `tsconfig.json` MUST enforce `strict: true` and define path aliases (`@/*` mapping to `src/*`).

### REQ-002: Design System Tokens
The system MUST implement Tailwind CSS v4 configured via `src/styles/global.css` and/or `tailwind.config.mjs` with exact tokens from `DESIGN.md`:
- Renault Yellow: `#EFDF00`
- Absolute Black: `#000000`
- Pure White: `#FFFFFF`
- Renault Blue: `#1883FD`
The global CSS MUST enforce zero border-radius (`0px`) globally on all buttons.
The typography MUST use `Space Grotesk` from Google Fonts as a variable font placeholder for `NouvelR`.

### REQ-003: Base Layout & Components
The system MUST implement `src/layouts/BaseLayout.astro` as the root HTML skeleton.
The layout MUST include `src/components/Header.astro` and `src/components/Footer.astro`.
The Header MUST contain a primary CTA button using Absolute Black and zero border-radius.
The system MUST implement `src/pages/index.astro` as a placeholder hero page rendering the Header, Footer, and a main content area.

### REQ-004: Content Collections
The system MUST define Astro content collections in `src/content/config.ts` using the EXACT Zod schemas provided in the data model for:
- `blog`
- `charlas`
- `recursos`
- `tools`
- `learn`
- `glosario`
The system MUST include at least one placeholder MDX file for each collection to validate the schema pipeline.

### REQ-005: Mock Data & Types
The system MUST implement exactly the provided TypeScript interfaces for `Builder` and `AppListItem` in `src/types/models.ts` (or similar).
The system MUST include mock JSON arrays conforming to these interfaces to be used for initial directory page testing.

### REQ-006: Utility Libraries
The system MUST implement `src/lib/constants.ts` exporting site metadata and Supabase environment variables.
The system MUST implement `src/lib/urls.ts` exporting a `PLATFORM_URL` constant and a `platformCTA(ref: string, path?: string): string` function that appends `?ref=source` to the platform URL.

### REQ-007: Build & Deploy Configuration
The system MUST include a `.env.example` file declaring:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_PLATFORM_URL`
- `PUBLIC_SITE_URL`
The system MUST generate a valid `robots.txt` upon build (or statically).

## Scenarios

### SC-001: Dev server starts successfully
- GIVEN the project is set up
- WHEN `pnpm dev` is executed
- THEN the dev server starts on localhost:4321 without errors

### SC-002: Base layout rendering
- GIVEN the user navigates to `/`
- WHEN the page loads
- THEN `BaseLayout.astro` renders with `Header` and `Footer` components
- AND the primary CTA button exhibits zero border-radius

### SC-003: Content collection validation
- GIVEN valid placeholder MDX files in `src/content/blog/`
- WHEN Astro builds or `getCollection('blog')` is called
- THEN the files are successfully parsed against the Zod schema without validation errors

### SC-004: Platform CTA URL generation
- GIVEN the `platformCTA` function is called with `ref="hero"`
- WHEN evaluated
- THEN it returns `https://app.vibecoders.la?ref=hero`

## Constraints
- MUST use `pnpm`, not npm or yarn.
- MUST NOT apply `border-radius` to any button elements.
- MUST NOT include Supabase fetching logic in this phase (Fase 2).

## Open Questions
- None.