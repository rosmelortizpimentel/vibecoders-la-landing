# Design: setup-foundation

## Technical Approach

Greenfield Astro 5 project in hybrid mode — all pages prerendered by default, SSR opt-in per-page. Tailwind CSS v4 with CSS-first configuration: design tokens as CSS custom properties in `src/styles/globals.css`, consumed by Tailwind utility classes. Content Collections with Zod schemas validate MDX at build time. Space Grotesk loads via Google Fonts CDN with `preconnect` + `font-display: swap`.

## Architecture Decisions

| # | Decision | Alternatives | Rationale |
|---|----------|-------------|-----------|
| 1 | **Hybrid output mode** (`output: 'hybrid'`) | `static` or `server` | Static default + per-page SSR opt-in. Future directory pages need SSR; static-only would block that. Full SSR wastes edge compute for marketing pages. |
| 2 | **Tailwind v4 CSS-first tokens** in `globals.css` | JS config-only, CSS modules | v4's native `@theme` approach. Tokens as `--color-*` CSS vars enable non-Tailwind consumers (shadcn, raw CSS). Single source of truth. |
| 3 | **Space Grotesk via Google Fonts CDN** | Self-hosted woff2, system font | Placeholder font — will be swapped to self-hosted RenaultGroup-Variable.woff2 later. CDN avoids asset management overhead for a temp font. `preconnect` + `font-display: swap` prevents layout shift. |
| 4 | **Single BaseLayout with slot** | Multiple layouts, nested layouts | One page type now (marketing). Additional layouts (blog, docs) can extend or wrap BaseLayout later. YAGNI. |
| 5 | **Content Collections with Zod** (Astro native) | Custom loader, CMS | Astro's built-in type-safe pipeline. Zod schemas enforce frontmatter contracts at build time. Zero runtime cost. |
| 6 | **Zero border-radius via global CSS reset** | Per-component classes, Tailwind plugin | Global `button, [role="button"], .btn { border-radius: 0 !important; }` is the only way to ENFORCE the Renault constraint. Per-component is error-prone. |
| 7 | **Env vars via `import.meta.env`** | dotenv, process.env | Astro + Vite convention. `PUBLIC_` prefix exposes to client. Type-safe via `env.d.ts`. |

## Data Flow

```
Build Time:
  src/content/**/*.mdx ──→ Zod Schema (config.ts) ──→ Validated Collections
  src/data/*.json       ──→ TypeScript imports       ──→ Mock data for dev

Render Time (Static):
  index.astro ──→ BaseLayout.astro ──→ Header.astro
                                   ──→ <slot/> (hero)
                                   ──→ Footer.astro
                                   ──→ HTML output

Font Loading:
  <link preconnect> ──→ Google Fonts CDN ──→ Space Grotesk Variable
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Create | Hybrid mode, Vercel adapter, sitemap, Tailwind |
| `tailwind.config.mjs` | Create | Extend theme with Renault tokens (colors, shadows, font) |
| `tsconfig.json` | Create | Strict mode, `@/*` path alias |
| `package.json` | Create | Astro 5, Tailwind v4, shadcn deps |
| `.env.example` | Create | PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_PLATFORM_URL, PUBLIC_SITE_URL |
| `public/robots.txt` | Create | Static robots.txt |
| `src/env.d.ts` | Create | Astro + env type declarations |
| `src/styles/globals.css` | Create | `@import "tailwindcss"`, CSS custom properties for all tokens, global button reset, typography scale |
| `src/layouts/BaseLayout.astro` | Create | HTML skeleton: `<html lang="es">`, meta, fonts, globals import, Header + slot + Footer |
| `src/components/Header.astro` | Create | Sticky white nav, logo text, nav links (13px/700), black CTA button |
| `src/components/Footer.astro` | Create | Multi-column: logo + tagline, nav columns (Platform, Content, Legal), socials, copyright |
| `src/pages/index.astro` | Create | Hero placeholder: dark full-viewport, 56px heading, subtitle, yellow super-primary + ghost CTA |
| `src/content/config.ts` | Create | `defineCollection` × 6 with Zod schemas (blog, charlas, recursos, tools, learn, glosario) |
| `src/content/blog/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/content/charlas/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/content/recursos/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/content/tools/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/content/learn/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/content/glosario/placeholder.mdx` | Create | Minimal valid frontmatter |
| `src/data/builders.json` | Create | Mock Builder[] array |
| `src/data/apps.json` | Create | Mock AppListItem[] array |
| `src/types/builder.ts` | Create | `Builder` interface |
| `src/types/app.ts` | Create | `AppListItem` interface |
| `src/lib/constants.ts` | Create | SITE_NAME, SITE_DESCRIPTION, SITE_URL, SUPABASE_URL, SUPABASE_ANON_KEY |
| `src/lib/urls.ts` | Create | PLATFORM_URL, `platformCTA(ref, path?)` |

## Interfaces / Contracts

```typescript
// src/lib/urls.ts
export const PLATFORM_URL: string;
export function platformCTA(ref: string, path?: string): string;
// Returns: `${PLATFORM_URL}${path ?? ''}?ref=${ref}`

// src/lib/constants.ts
export const SITE_NAME = 'VibeCoders';
export const SITE_DESCRIPTION: string;
export const SITE_URL: string;       // import.meta.env.PUBLIC_SITE_URL
export const SUPABASE_URL: string;   // import.meta.env.PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY: string;
```

## Design Tokens Implementation

CSS custom properties in `globals.css` → extended in `tailwind.config.mjs`:

| Token | CSS Variable | Tailwind Class | Value |
|-------|-------------|----------------|-------|
| Brand Yellow | `--color-brand-yellow` | `bg-brand-yellow` | `#EFDF00` |
| Brand Black | `--color-brand-black` | `bg-brand-black` | `#000000` |
| Brand White | `--color-brand-white` | `bg-brand-white` | `#FFFFFF` |
| Brand Blue | `--color-brand-blue` | `text-brand-blue` | `#1883FD` |
| Surface Charcoal | `--color-surface-charcoal` | `bg-surface-charcoal` | `#222222` |
| Surface Silver | `--color-surface-silver` | `bg-surface-silver` | `#F2F2F2` |
| Border | `--color-border` | `border-border` | `#D1D1D1` |
| Text Muted | `--color-text-muted` | `text-muted` | `#D9D9D6` |
| Shadow 1–6 | `--shadow-{n}` | `shadow-{n}` | Per DESIGN.md L1–L6 |

Global CSS enforces: `button, [role="button"] { border-radius: 0 !important; }`
Pill exception: `input[type="search"] { border-radius: 50px; }`

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | Astro builds without errors | `pnpm build` — zero exit code |
| Schema | Content collection validation | Placeholder MDX files pass Zod schemas during build |
| Visual | Design tokens render correctly | Manual verification in dev server |
| Unit | `platformCTA()` returns correct URL | Future: Vitest (not in this change — no test runner yet) |

No automated test runner in this change (per `openspec/config.yaml` — testing TBD). Build-time validation via Astro + Zod is the primary safety net.

## Migration / Rollout

No migration required. Greenfield project — first commit. Rollback = delete generated files.

## Open Questions

None — all decisions are locked per proposal and AGENTS.md.
