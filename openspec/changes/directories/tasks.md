# Tasks: Directories

## Phase 1: Data Expansion

- [x] 1.1 Expand `src/data/builders.json` — add 2 builders (reaching 10 total); each entry must include `username`, `name`, `tagline`, `bio`, `avatarUrl`, `location`, `tier`, `socials`, `stats`, `joinedAt`, `isPioneer`, `isVerified`, `availableForChat`
- [x] 1.2 Expand `src/data/apps.json` — add 2 apps (reaching 8 total); add `description` (string), `screenshots` (string[]), and `betaActive` (boolean) fields to ALL existing 6 entries AND the 2 new ones; every `builder.username` must match a username in `builders.json`

## Phase 2: Shared UI Components

- [x] 2.1 Create `src/components/ui/SocialLinks.astro` — accepts `socials: Builder['socials']` and optional `class`; renders `<a>` icon links for each truthy key (`github`, `twitter`, `linkedin`, `website`, `instagram`)
- [x] 2.2 Create `src/components/directory/Breadcrumbs.astro` — accepts `items: { label: string; href?: string }[]`; renders semantic `<nav><ol>` with separator between items; last item has no link
- [x] 2.3 Create `src/components/directory/FilterBar.astro` — accepts `filters: { label: string; value: string }[]` and optional `activeLabel`; renders pill chips with `rounded-[50px] border-[#D1D1D1]`; static/visual only, no JS

## Phase 3: Directory Cards

- [x] 3.1 Create `src/components/directory/BuilderDirectoryCard.astro` — wraps content in `<a href="/builders/{username}">`; displays avatar, name, tagline, tier `<Badge>`, location; background `bg-surface-silver`, `rounded-none`
- [x] 3.2 Create `src/components/directory/AppDirectoryCard.astro` — wraps content in `<a href="/apps/{slug}">`; displays logo, name, tagline, builder name, category + status `<Badge>`s; background `bg-surface-charcoal`, `rounded-none`

## Phase 4: DirectoryLayout

- [x] 4.1 Create `src/layouts/DirectoryLayout.astro` — composes `<BaseLayout>` internally (not extends); accepts `title`, `description?`, `breadcrumbs: { label, href? }[]`; renders `<Breadcrumbs>` + page title above `<slot />`; page surface defaults to `bg-brand-white`

## Phase 5: Listing Pages

- [x] 5.1 Create `src/pages/builders/index.astro` — imports `builders.json`; uses `DirectoryLayout` with breadcrumb `[{label:'Inicio',href:'/'},{label:'Builders'}]`; renders `<FilterBar>` + responsive grid of `<BuilderDirectoryCard>`; background `bg-brand-white`
- [x] 5.2 Create `src/pages/apps/index.astro` — imports `apps.json`; uses `DirectoryLayout` with breadcrumb `[{label:'Inicio',href:'/'},{label:'Apps'}]`; renders `<FilterBar>` + responsive grid of `<AppDirectoryCard>`; background `bg-brand-white`

## Phase 6: Detail Pages

- [x] 6.1 Create `src/pages/builders/[username].astro` — `getStaticPaths()` maps `builders.json` to `{ params: { username }, props: { builder } }`; hero section: `bg-brand-black text-brand-white`, headline `font-bold text-[56px] leading-[0.95]`; content section: `bg-brand-white`; includes stats, bio, `<SocialLinks>`, and cross-referenced apps grid; CTA uses `platformCTA('builder-profile', '/chat/${username}')` with `bg-brand-black text-brand-white rounded-none px-[15px] py-[10px] border-brand-black`
- [x] 6.2 Create `src/pages/apps/[slug].astro` — `getStaticPaths()` maps `apps.json as AppDetail[]` to `{ params: { slug }, props: { app } }`; hero section: `bg-brand-black text-brand-white`, headline `font-bold text-[56px] leading-[0.95]`; content section: `bg-brand-white`; displays `description`, `screenshots`, `techStack`, cross-referenced builder info; super-primary CTA uses `bg-[#EFDF00] text-[#000000] rounded-none px-[15px] py-[10px] border-[#EFDF00]`

## Phase 7: Verification

- [x] 7.1 Run `pnpm build` — confirm zero errors; all static paths from `builders.json` (10) and `apps.json` (8) must generate successfully
- [ ] 7.2 Manual review: verify `/builders` grid renders all 10 `BuilderDirectoryCard`s with correct `bg-surface-silver` and `rounded-none`; verify `/apps` grid renders all 8 `AppDirectoryCard`s with correct `bg-surface-charcoal`
- [x] 7.3 Manual review: navigate to `/builders/martinl` — confirm hero "Martín López" in white on black; CTA points to `https://app.vibecoders.la/chat/martinl?ref=builder-profile`
- [x] 7.4 Manual review: navigate to `/apps/facturai` — confirm hero "FacturAI" in white on black; super-primary CTA is Renault Yellow `#EFDF00`
- [x] 7.5 Cross-reference integrity check: every `builder.username` value in `apps.json` must exist in `builders.json`; every builder on `/builders/[username]` must show their correct apps
