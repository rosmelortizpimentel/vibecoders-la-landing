# Design: Directories

## Technical Approach

Static-first Astro pages using `getStaticPaths()` from JSON data. Four new routes: two listing pages (`/builders`, `/apps`) and two dynamic detail pages (`/builders/[username]`, `/apps/[slug]`). A shared `DirectoryLayout` extends `BaseLayout` adding breadcrumbs and a consistent page header. Cross-referencing between builders↔apps uses the existing `builder.username` foreign key in `apps.json`. All components are `.astro` (zero JS) following existing patterns from `SectionWrapper`, `Badge`, and `CTAButton`.

## Architecture Decisions

| Decision | Choice | Alternative | Rationale |
|----------|--------|-------------|-----------|
| Layout strategy | `DirectoryLayout` wraps `BaseLayout` via composition (uses `<BaseLayout>` internally) | Slot-based extension | Matches how `index.astro` already uses `BaseLayout` — composition over inheritance. Layout adds breadcrumbs + page title slot above `<slot />` |
| Directory cards vs landing cards | New `BuilderDirectoryCard` and `AppDirectoryCard` components in `src/components/directory/` | Reuse `BuilderCard`/`AppCard` from `landing/` | Landing cards are optimized for marquee/showcase (no links, compact). Directory cards need `<a>` wrapping, richer metadata, and light-bg variant. Different concerns = different components |
| FilterBar approach | Static `.astro` component rendering pill chips from a passed `categories[]` prop | React island with state | Spec explicitly defers client-side filtering. Static pills are visual-only — future React island replaces this without changing the interface |
| SocialLinks | Generic `src/components/ui/SocialLinks.astro` accepting `socials` object | Inline in profile page | Reusable on builder profiles AND potentially footer. Renders icon links for each truthy key in the `Builder['socials']` type |
| Cross-reference pattern | At build time in `[username].astro`: filter `apps.json` where `app.builder.username === params.username` | Embed full app data in `builders.json` | Avoids data duplication. The foreign key relationship already exists. `getStaticPaths` runs at build time so the filter cost is zero |
| Data expansion | Extend `apps.json` entries with `AppDetail` fields inline (description, screenshots, betaActive) | Separate `apps-detail.json` | Single source of truth per spec REQ-007. `AppDetail extends AppListItem` already exists in types — data just needs the fields added |

## Data Flow

```
Build Time (getStaticPaths)
═══════════════════════════

builders.json ──→ /builders/index.astro ──→ Grid of BuilderDirectoryCard
     │
     └──→ [username].astro ──→ getStaticPaths() maps each builder
              │
              └──→ apps.json.filter(a => a.builder.username === username)
                        └──→ Builder's apps section on profile

apps.json ──→ /apps/index.astro ──→ Grid of AppDirectoryCard
     │
     └──→ [slug].astro ──→ getStaticPaths() maps each app
              │
              └──→ builders.json.find(b => b.username === app.builder.username)
                        └──→ Builder info card on app detail
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/layouts/DirectoryLayout.astro` | Create | Wraps `BaseLayout`, adds breadcrumb nav + page title. Props: `title`, `description`, `breadcrumbs: {label, href}[]` |
| `src/pages/builders/index.astro` | Create | Listing page: imports `builders.json`, renders `FilterBar` + grid of `BuilderDirectoryCard` |
| `src/pages/builders/[username].astro` | Create | `getStaticPaths()` from `builders.json`. Hero (dark) + content (light) sections. Cross-refs apps |
| `src/pages/apps/index.astro` | Create | Listing page: imports `apps.json`, renders `FilterBar` + grid of `AppDirectoryCard` |
| `src/pages/apps/[slug].astro` | Create | `getStaticPaths()` from `apps.json` (cast as `AppDetail[]`). Hero (dark) + content (light). Cross-refs builder |
| `src/components/directory/BuilderDirectoryCard.astro` | Create | Light-bg card (`bg-surface-silver`), avatar, name, tagline, tier badge, location. Wrapped in `<a href="/builders/{username}">` |
| `src/components/directory/AppDirectoryCard.astro` | Create | Dark-bg card (`bg-surface-charcoal`), logo, name, tagline, builder name, category + status badges. Wrapped in `<a href="/apps/{slug}">` |
| `src/components/directory/FilterBar.astro` | Create | Static pill chips. Props: `filters: {label, value}[]`, `activeLabel?: string`. Uses `rounded-[50px] border-[#D1D1D1]` per spec |
| `src/components/ui/SocialLinks.astro` | Create | Renders icon links for github/twitter/linkedin/website/instagram. Props: `socials: Builder['socials']`, `class?` |
| `src/components/directory/Breadcrumbs.astro` | Create | Simple `nav > ol` breadcrumb. Props: `items: {label, href?}[]` |
| `src/data/builders.json` | Modify | Add 2 builders to reach 10 total (per REQ-007) |
| `src/data/apps.json` | Modify | Add 2 apps to reach 8 total. Add `description`, `screenshots`, `betaActive` fields to ALL entries (per REQ-007) |

## Interfaces / Contracts

```typescript
// DirectoryLayout props
interface DirectoryLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

// FilterBar props
interface FilterBarProps {
  filters: Array<{ label: string; value: string }>;
  activeLabel?: string; // visually highlighted (no JS)
}

// SocialLinks props — reuses existing Builder['socials'] type
interface SocialLinksProps {
  socials: Builder['socials'];
  class?: string;
}

// getStaticPaths pattern (both pages follow same shape)
// [username].astro
export async function getStaticPaths() {
  const builders = (await import('@/data/builders.json')).default as Builder[];
  return builders.map((b) => ({ params: { username: b.username }, props: { builder: b } }));
}

// [slug].astro
export async function getStaticPaths() {
  const apps = (await import('@/data/apps.json')).default as AppDetail[];
  return apps.map((a) => ({ params: { slug: a.slug }, props: { app: a } }));
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | All static paths generate without errors | `pnpm build` — if any JSON entry has missing required fields, Astro build fails |
| Visual | Design system compliance (zero border-radius on buttons, correct color roles) | Manual review against DESIGN.md checklist |
| Links | Cross-reference integrity (builder→apps, app→builder) | Verify every `builder.username` in `apps.json` exists in `builders.json` during review |

## Migration / Rollout

No migration required. All new pages — no existing routes affected. Data expansion is additive (new fields + new entries in existing JSON files).

## Open Questions

None — all decisions resolved from spec + existing codebase patterns.
