# Proposal: Directories

## Intent

Implement public directories for Builders (`/builders`) and Apps (`/apps`) on `vibecoders.la` to showcase the community and their projects, generating organic traction and providing detailed profiles. This provides visibility for builders and their creations without requiring platform authentication.

## Scope

### In Scope
- Create `/builders` directory page (visual filter bar, responsive grid).
- Create `/builders/[username]` profile page (generated statically with builder details and their apps).
- Create `/apps` directory page (visual filter bar, responsive grid).
- Create `/apps/[slug]` detail page (generated statically with full app details and screenshots).
- New components: `BuilderDirectoryCard`, `AppDirectoryCard`, `BuilderProfileHero`, `AppDetailHero`, `SocialLinks`, `FilterBar`.
- New layout: `DirectoryLayout` extending `BaseLayout` and adding breadcrumbs.
- Expand data: add 2 builders to `builders.json` and 2 apps to `apps.json`.
- Update type: add `AppDetail` fields to `apps.json` entries.

### Out of Scope
- Client-side filtering with React islands (deferred).
- Real Supabase data integration (Fase 2).
- Search functionality.
- Pagination.

## Capabilities

### New Capabilities
- `directory-builders`: List all community builders with a visual UI filter and profile links.
- `directory-apps`: List all community apps with a visual UI filter and app detail links.
- `builder-profiles`: Static pages for individual builders containing stats, bio, and a link to the chat platform (`/chat/${username}`).
- `app-details`: Static pages for individual apps containing long descriptions, screenshots, tech stacks, builder info, and external links.

### Modified Capabilities
- None

## Approach

Use Astro's `getStaticPaths()` to generate dynamic routes `/builders/[username]` and `/apps/[slug]` from existing JSON data (`builders.json` and `apps.json`). Apply the Renault-inspired design system: light backgrounds (`bg-brand-white`) for directory grids, and dark heroes (`bg-brand-black` with NouvelR-style typography, handled via Space Grotesk) for detail pages. Components will use strict Tailwind classes following `DESIGN.md`. Data files will be expanded manually.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/builders/` | New | Directory and dynamic routing for builders (`index.astro`, `[username].astro`) |
| `src/pages/apps/` | New | Directory and dynamic routing for apps (`index.astro`, `[slug].astro`) |
| `src/layouts/DirectoryLayout.astro` | New | Consistent page header and breadcrumbs |
| `src/components/` | New | UI Cards, Heroes, FilterBar, SocialLinks |
| `src/data/builders.json` | Modified | Add 2 builders |
| `src/data/apps.json` | Modified | Add 2 apps, expand fields to include `AppDetail` properties |
| `src/types/app.ts` | Modified | Interface validation for new fields if required |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Broken static paths | Low | Ensure all JSON entries have valid, unique `username` and `slug` fields before building. |
| Design drift from Renault guidelines | Medium | Adhere strictly to `DESIGN.md` rules: zero border-radius, strict light/dark alternation, and exact color usage. |

## Rollback Plan

Revert the pull request containing the `directories` feature branch, or remove the added `src/pages/builders/` and `src/pages/apps/` directories along with reverting JSON data modifications.

## Dependencies

- Existing `BaseLayout.astro`.
- Existing Renault-inspired `DESIGN.md` color scheme and typography.
- Static JSON data in `src/data/`.

## Success Criteria

- [ ] `/builders` and `/apps` render correctly with a light theme and grid layout showing all items.
- [ ] Detail pages (`/builders/[username]`, `/apps/[slug]`) generate successfully at build time.
- [ ] All new components strictly adhere to the Renault design system (e.g., zero border radius, tight typography, correct color roles).
- [ ] Added 2 new builders and 2 new apps to the JSON files correctly mapping to the interfaces.
- [ ] CTAs pointing to the platform use `platformCTA()` correctly with a `ref`.