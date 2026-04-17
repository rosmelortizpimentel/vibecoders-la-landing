# Proposal: Landing Completa

## Intent

Replace the placeholder hero in `index.astro` with a full, production-ready landing page following the Renault design system. This will deliver Sprint 1.B, establishing the public face of the VibeCoders community.

## Scope

### In Scope
- Build 7 main landing sections: Hero, Social Proof/Marquee, Apps Showcase, Why VibeCoders, Charlas Highlight, Pricing Preview, Final CTA.
- Create reusable UI components (e.g., `Badge`, `CTAPlatform`).
- Expand mock data (`builders.json`, `apps.json`) to populate the components.
- Strictly adhere to Renault design principles: Space Grotesk font, `#EFDF00` yellow for super-primary CTAs only, zero border-radius buttons, and alternating light/dark sections.

### Out of Scope
- Detail pages (/blog, /charlas).
- Directory pages (/builders, /apps).
- Real data integration with Supabase.
- Internationalization and dark mode toggle.
- Mobile hamburger menu.

## Capabilities

### New Capabilities
- `landing-page`: Main marketing landing page structure and full-page layout.
- `marketing-components`: Reusable UI components specific to the marketing site (cards, badges, grids).

### Modified Capabilities
- None

## Approach

Create modular Astro components for each section in `src/components/landing/`. Compose these sections inside `src/pages/index.astro`. Use Tailwind CSS utility classes aligned with the design tokens. Update the mock JSON files to ensure the sections render with varied and realistic content. Rely heavily on the `platformCTA` helper for all interactive authentication/platform buttons.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/index.astro` | Modified | Replace placeholder hero with full landing composition |
| `src/components/landing/` | New | Create section components (Hero, Stats, Marquee, etc.) |
| `src/components/` | New | Create reusable UI elements (Badge, CTAPlatform) |
| `src/data/builders.json` | Modified | Expand from 3 to 8-10 mock builders |
| `src/data/apps.json` | Modified | Expand from 3 to 6-8 mock apps |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Design drift (colors, border-radius) | Low | Strict adherence to `renault/DESIGN.md` guidelines and CSS variables |
| Mock data structure mismatch | Low | Validate data against `Builder` and `AppListItem` types |
| Broken links | Medium | Route unbuilt pages to `/` or use correct platform CTA tracking |

## Rollback Plan

Revert `src/pages/index.astro` to its current single-hero layout. Delete `src/components/landing/` and restore the original `builders.json` and `apps.json`.

## Dependencies

- Design system definitions from `renault/DESIGN.md`.
- Basic setup and utilities from `setup-foundation`.

## Success Criteria

- [ ] `index.astro` renders all 7 specified sections perfectly.
- [ ] Strict compliance with the design rules (alternating sections, 0px border-radius).
- [ ] Expanded mock data accurately reflects the component structures.
- [ ] No build warnings or TypeScript errors.
