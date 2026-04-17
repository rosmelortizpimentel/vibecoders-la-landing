# Change Proposal: setup-foundation

## Intent
Initialize the project infrastructure for `vibecoders-public` using Astro 5, integrating the Renault-inspired design system tokens, and setting up the core content architecture. This provides the technical foundation (Fase 0) and content infrastructure (Sprint 1.A) required before building out feature pages.

## Scope
### In scope
- Astro 5 scaffolding with hybrid mode and Vercel adapter
- Tailwind CSS v4 and shadcn/ui configuration
- Renault design tokens integration (colors, font, zero-radius, shadows) from DESIGN.md
- Space Grotesk variable font loading setup
- Base layouts, placeholder index page, Header, and Footer components
- Content collections schema definitions via Zod (blog, charlas, recursos, tools, learn, glosario)
- Placeholder MDX files for content collections to validate pipelines
- Mock JSON data for builders and apps
- Core project configuration (`tsconfig.json`, `.env.example`, `robots.txt`, sitemaps, constants, urls)

### Out of scope
- Full landing page content (Sprint 1.B)
- Blog/charla listing pages (Sprint 1.D)
- Directory pages for /builders, /apps (Sprint 1.C)
- Supabase client or edge function wrappers (Fase 2)
- i18n setup (prepared but not active)
- Dark mode toggle

## Capabilities

### New Capabilities
- `project-setup`: Core infrastructure, dependencies, building and rendering strategy.
- `design-system`: Implementation of the Renault-inspired design tokens, typography, colors, and base components (Header, Footer).
- `content-collections`: Zod schemas and placeholder data for MDX collections and mock JSON models.

### Modified Capabilities
None

## Approach
We will initialize the project using `pnpm create astro@latest` and configure it for hybrid rendering, serving static pages by default while allowing edge SSR for future directory pages. Tailwind v4 and global CSS will be configured strictly according to `DESIGN.md`, defining CSS variables for Renault Yellow, Absolute Black, Pure White, and Renault Blue, enforcing the zero border-radius constraint. For content, we will use Astro's `src/content/config.ts` to build out Zod validation matching `data-model.md`, and create placeholder files to verify the pipelines.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `/` | New | Root configs (`astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`) |
| `src/styles/` | New | Global CSS with design tokens |
| `src/layouts/` | New | `BaseLayout.astro` skeleton |
| `src/components/` | New | `Header.astro`, `Footer.astro` |
| `src/pages/` | New | `index.astro` hero placeholder |
| `src/content/` | New | `config.ts`, MDX placeholders, JSON mocks |
| `src/types/` | New | Type definitions |
| `src/lib/` | New | Constants and URL helpers |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Space Grotesk font metric mismatch with NouvelR | Low | Keep design tight; adjust metrics later when RenaultGroup woff2 is available. |
| Strict Tailwind v4 migration friction | Low | Use standard v4 conventions for CSS variables and base configuration. |

## Rollback Plan
Since this is a greenfield project and the first commit, rollback consists of deleting the generated directories/files (`src`, configuration files) and resetting to the initial empty state.

## Dependencies
- Astro 5, Vercel Adapter, Sitemap Integration
- Tailwind CSS v4, shadcn/ui
- Zod (for Astro Content Collections)

## Success Criteria
- [ ] Astro build completes successfully without errors
- [ ] Dev server runs and displays the placeholder index page with the correct Renault design tokens
- [ ] Header and Footer render with zero-radius buttons and correct brand colors
- [ ] Astro's `getCollection` API successfully validates the placeholder MDX and JSON mock data