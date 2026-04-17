# Design: Landing Completa

## Technical Approach

Decompose the landing into 7 Astro section components in `src/components/landing/`, composed sequentially in `index.astro`. Each section is a self-contained `.astro` file receiving typed props from the page's frontmatter. Reusable primitives (`Badge`, `CTAButton`) live in `src/components/ui/`. Data flows top-down: `index.astro` imports JSON + `platformCTA`, passes slices to each section. No React islands needed — everything is static Astro.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| Section components location | `src/components/landing/` | Flat in `components/` | Groups 7 page-specific sections away from global UI (`Header`, `Footer`) |
| Reusable primitives | `src/components/ui/Badge.astro`, `CTAButton.astro` | Inline classes everywhere | Badge appears in builders (tier), apps (category, status); CTAButton has 3 variants (super-primary, primary, ghost) used across 5+ sections |
| Card components | Co-located with sections: `BuilderCard.astro`, `AppCard.astro` in `landing/` | Shared `components/cards/` | Cards are section-specific for now; extract to shared when directory pages need them |
| Marquee scroll | CSS `overflow-x-auto` with `flex-nowrap` | JS infinite scroll library | Spec calls for horizontal scroll, not infinite animation. Pure CSS. No JS deps |
| Section wrapper pattern | Shared `SectionWrapper.astro` with `variant` prop (`dark`/`light`) | Repeat bg/padding classes per section | Enforces chessboard alternation, consistent `py-20`/`py-12`, `max-w-[1440px]` container |
| Charlas data | Hardcoded array in `CharlasSection.astro` frontmatter | New JSON file | Spec explicitly says "NOT from content collections." Only 2-3 items, no reuse needed |
| Mock data expansion | Add 5 builders + 3 apps to existing JSON files | Create separate mock files | Same shape, same types. Keep single source per entity |

## Data Flow

```
index.astro (frontmatter)
  ├── import builders from '@/data/builders.json'
  ├── import apps from '@/data/apps.json'
  ├── import { platformCTA } from '@/lib/urls'
  │
  ├── <HeroSection />              ← hardcoded stats, platformCTA('hero')
  ├── <BuildersMarquee {builders} />  ← Builder[] slice (all)
  ├── <AppsShowcase {apps} />      ← AppListItem[] slice (all)
  ├── <WhyVibeCoders />            ← hardcoded 4 value blocks
  ├── <CharlasHighlight />         ← hardcoded 2-3 charla previews
  ├── <PricingPreview />           ← hardcoded plans, platformCTA('pricing')
  └── <FinalCTA />                 ← platformCTA('footer')
```

Each section receives only what it needs. `platformCTA` refs are generated at the page level and passed as `href` string props to `CTAButton`.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/index.astro` | Modify | Replace hero-only content with 7 section composition |
| `src/components/landing/SectionWrapper.astro` | Create | Shared section shell: `variant: 'dark'|'light'`, padding, max-width container |
| `src/components/landing/HeroSection.astro` | Create | Full-viewport hero with H1, subtitle, 2 CTAs, stats row |
| `src/components/landing/BuildersMarquee.astro` | Create | Light section, H2, horizontal scroll of `BuilderCard` |
| `src/components/landing/BuilderCard.astro` | Create | Avatar (48px round), name, tagline, tier badge |
| `src/components/landing/AppsShowcase.astro` | Create | Dark section, H2, responsive grid of `AppCard` |
| `src/components/landing/AppCard.astro` | Create | Logo (40px), name, tagline, builder, category badge, status badge |
| `src/components/landing/WhyVibeCoders.astro` | Create | Light section, H2, 2×2 grid of value blocks (icon + heading + desc) |
| `src/components/landing/CharlasHighlight.astro` | Create | Dark section, H2, 2-3 charla preview cards |
| `src/components/landing/PricingPreview.astro` | Create | Light section, H2, 2 plan cards (Free + Pro) |
| `src/components/landing/FinalCTA.astro` | Create | Dark section, centered H2 + subtitle + yellow CTA |
| `src/components/ui/Badge.astro` | Create | `variant: 'tier'|'category'|'status'`, text + bg color mapped per value |
| `src/components/ui/CTAButton.astro` | Create | `variant: 'super-primary'|'primary'|'ghost'`, `onDark: boolean`, `href`, `label` |
| `src/data/builders.json` | Modify | Expand from 3 → 8 builders (add 5 with diverse countries/tiers) |
| `src/data/apps.json` | Modify | Expand from 3 → 6 apps (add 3 with varied categories/statuses) |

**Totals**: 13 create, 3 modify, 0 delete.

## Interfaces / Contracts

```typescript
// SectionWrapper.astro Props
interface Props {
  variant: 'dark' | 'light';
  id?: string;           // for anchor links
  padding?: 'default' | 'hero' | 'generous'; // py-20 | min-h-screen | py-24
}

// CTAButton.astro Props
interface Props {
  variant: 'super-primary' | 'primary' | 'ghost';
  onDark?: boolean;       // flips ghost border/text color
  href: string;
  label: string;
  class?: string;         // extra classes
}

// Badge.astro Props
interface Props {
  variant: 'tier' | 'category' | 'status';
  value: string;          // 'founder' | 'pro' | 'free' | 'launched' | 'beta' | etc.
}

// BuilderCard — receives Pick<Builder, needed fields>
// AppCard — receives AppListItem directly
```

**Badge color map** (all `rounded-none`, `text-xs`, `font-bold`, `px-2 py-0.5`):

| variant | value | bg | text |
|---------|-------|-----|------|
| tier | founder | `bg-brand-yellow` | `text-brand-black` |
| tier | pro | `bg-surface-charcoal` | `text-brand-white` |
| tier | free | `bg-surface-silver` | `text-brand-black` |
| status | launched | `bg-brand-black` | `text-brand-white` |
| status | beta | `bg-surface-charcoal` | `text-brand-white` |
| category | * | `bg-surface-silver` | `text-brand-black` |

## Responsive Strategy

| Section | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|---------|----------------|--------------------|--------------------|
| Hero | `text-[32px]`, stacked CTAs, stacked stats | `text-[40px]`, row CTAs | `text-[56px]`, `min-h-screen` |
| Builders | `overflow-x-auto`, `py-12` | same scroll | `py-20`, wider cards |
| Apps | 1-col grid | 2-col grid | 3-col grid |
| Why | 1-col stack | 2×2 grid | 2×2 grid |
| Charlas | 1-col stack | 2-col | 2-3 col |
| Pricing | Stacked cards | Side by side | Side by side, max-w constrained |
| Final CTA | `text-[32px]` | `text-[40px]` | `text-[40px]`, `py-24` |

## Mock Data Expansion

**New builders** (5 additions, total 8):

| username | country | tier | key trait |
|----------|---------|------|-----------|
| `valentinag` | Colombia | pro | AI content creator |
| `diegom` | Chile | free | Student building first app |
| `luciab` | Uruguay | pro | Data science background |
| `andresp` | Perú | free | Mobile-first builder |
| `marianaj` | Argentina | founder | Serial entrepreneur |

**New apps** (3 additions, total 6):

| slug | category | status | builder |
|------|----------|--------|---------|
| `copywiz` | marketing | launched | `valentinag` |
| `fitlog-ai` | salud | beta | `andresp` |
| `docuflow` | productividad | building | `marianaj` |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | All 7 sections render, chessboard alternation | Manual browser check (no test runner yet) |
| Type safety | JSON data matches `Builder` / `AppListItem` types | TypeScript strict compilation — `astro check` |
| Links | All CTAs use `platformCTA()` with correct refs | Manual verification + grep for hardcoded URLs |

## Migration / Rollout

No migration required. Direct replacement of `index.astro` content. Rollback: revert to current single-hero layout.

## Open Questions

- None — spec and proposal are complete, all patterns are clear from existing codebase.
