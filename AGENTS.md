# vibecoders.la — Agent Rules

## Project Purpose

This is the **PUBLIC marketing site** for vibecoders.la. It is a READ-ONLY site:
- No authentication
- No database writes
- All interactive CTAs that require user accounts redirect to `app.vibecoders.la`

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5 — `output: 'hybrid'` mode |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui via `astro-shadcn` |
| Content | MDX via Astro Content Collections |
| Data | Supabase JS v2 — READ-ONLY via public edge functions |
| Hosting | Vercel |
| Package manager | **pnpm** (never npm or yarn) |

## Design System

**Single source of truth**: `D:\Projects\vibecoders\renault\DESIGN.md`

Do NOT use any other design reference. Key rules from that document:
- **Renault Yellow** `#EFDF00` — super-primary CTA only (one per screen max)
- **Absolute Black** `#000000` — primary CTA + headings on light surfaces
- **Pure White** `#FFFFFF` — page background, light sections
- **Renault Blue** `#1883FD` — link hover ONLY
- **Zero border-radius on all buttons** — non-negotiable
- **Chessboard alternation** — light/dark sections alternate throughout
- Never hardcode colors — use Tailwind tokens from `tailwind.config.mjs`

## Typography

- Font: **Space Grotesk** (Google Fonts variable) — PLACEHOLDER
- Will be replaced with `RenaultGroup-Variable.woff2` when the user provides the font file
- Do NOT reference NouvelR or any Renault proprietary font in generated code

## Supabase

- Project URL: `https://zkotnnmrehzqonlyeorv.supabase.co`
- Same backend as `app.vibecoders.la`
- Access: read-only via public edge functions (no direct table queries from frontend)
- Never expose service role key — only anon key allowed

## CTA Convention

All CTAs that trigger auth or platform actions MUST redirect to the platform:

```
https://app.vibecoders.la?ref=<source>
```

Where `<source>` is a kebab-case identifier of the originating page/component (e.g., `hero`, `pricing`, `nav`).

## TypeScript Rules

- `strict: true` in tsconfig
- Zero `any` — use `unknown` + type guards when needed
- Absolute imports from `@/` (mapped to `src/`)
- No implicit `any`, no type assertions without justification

## File Conventions

- **File names**: kebab-case (e.g., `hero-section.astro`, `pricing-card.tsx`)
- **Component names**: PascalCase (e.g., `HeroSection`, `PricingCard`)
- **Astro components**: `.astro` extension
- **React islands**: `.tsx` extension (only when interactivity needed)
- **Styles**: Tailwind utility classes only — no CSS modules, no inline styles

## Related Repos (reference only — do NOT modify)

| Repo | Path | Role |
|------|------|------|
| Platform | `D:\Projects\vibecoders\app.vibecoders.la\` | Main app (React + Vite + Supabase) |
| Slides | `D:\Projects\vibecoders\slides.vibecoders.la\` | Slides/presentation app |
| Docs | `D:\Projects\vibecoders\vibecoders (Docs)\` | Architecture + business plans |

## Language

- All UI text MUST be in **neutral Spanish** (Spanish from Spain / international).
- **NO Argentine voseo**: never use "construí", "empezá", "mostrá", "unite", "escalá", "elegí", "probá".
- **USE tuteo**: "construye", "empieza", "muestra", "únete", "escala", "elige", "prueba".
- This applies to ALL user-facing text: headings, CTAs, subtitles, descriptions, badges, tooltips.

## What NOT to Do

- Never install packages without checking if pnpm is used
- Never duplicate logic that exists in Supabase edge functions on the platform repo
- Never add auth logic — this is a public site
- Never apply border-radius to buttons
- Never use Renault Yellow as a background/surface color (CTA only)
- Never reference NouvelR font — use Space Grotesk until font file is provided
- Never use `npm` or `yarn` — pnpm only

## SDD Context

- Artifact store: `openspec/` (hybrid mode — also backed by engram)
- Config: `openspec/config.yaml`
- Specs: `openspec/specs/`
- Changes: `openspec/changes/`
