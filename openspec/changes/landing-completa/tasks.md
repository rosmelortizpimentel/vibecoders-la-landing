# Tasks: Landing Completa

## Phase 1: Foundation — UI Primitives & Data

- [x] 1.1 Create `src/components/ui/CTAButton.astro` — props: `variant: 'super-primary'|'primary'|'ghost'`, `onDark?: boolean`, `href: string`, `label: string`, `class?: string`. Apply correct Tailwind classes per variant; enforce `rounded-none` always.
- [x] 1.2 Create `src/components/ui/Badge.astro` — props: `variant: 'tier'|'category'|'status'`, `value: string`. Map value → bg/text color per design badge color table. `rounded-none`, `text-xs`, `font-bold`, `px-2 py-0.5`.
- [x] 1.3 Expand `src/data/builders.json` — add 5 new builders (`valentinag`, `diegom`, `luciab`, `andresp`, `marianaj`) following existing `Builder` interface shape. Total: 8 entries.
- [x] 1.4 Expand `src/data/apps.json` — add 3 new apps (`copywiz`, `fitlog-ai`, `docuflow`) following `AppListItem` interface. Total: 6 entries.
- [x] 1.5 Create `src/components/landing/SectionWrapper.astro` — props: `variant: 'dark'|'light'`, `id?: string`, `padding?: 'default'|'hero'|'generous'`. Maps to `bg-brand-black`/`bg-brand-white`, `py-20`/`min-h-screen`/`py-24`, `max-w-[1440px]` container.

## Phase 2: Section Components

- [x] 2.1 Create `src/components/landing/HeroSection.astro` — H1 responsive (`text-[32px] sm:text-[40px] md:text-[56px]`), `leading-[0.95]`, subtitle, 2 CTAs via `CTAButton` (`super-primary` + `ghost onDark`), stats row ("150+ Builders", "80+ Apps", "12 Países"). Accepts `heroCTA: string` prop.
- [x] 2.2 Create `src/components/landing/BuilderCard.astro` — avatar 48px round, `font-bold` name, `text-xs text-text-muted` tagline, `Badge variant="tier"`. Accepts `Pick<Builder, 'username'|'name'|'tagline'|'avatarUrl'|'tier'>`.
- [x] 2.3 Create `src/components/landing/BuildersMarquee.astro` — H2 (`text-[40px]`, centered), `overflow-x-auto flex flex-nowrap gap-4`, renders `BuilderCard` per builder. Ghost CTA via `CTAButton variant="ghost"`. Accepts `builders: Builder[]`.
- [x] 2.4 Create `src/components/landing/AppCard.astro` — logo 40px, `font-bold text-brand-white` name, `text-sm text-text-muted` tagline, builder name, `Badge variant="category"`, `Badge variant="status"`. Accepts `AppListItem`.
- [x] 2.5 Create `src/components/landing/AppsShowcase.astro` — H2 (`text-[40px] text-brand-white`), `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`, renders `AppCard` per app. Ghost CTA `onDark`. Accepts `apps: AppListItem[]`.
- [x] 2.6 Create `src/components/landing/WhyVibeCoders.astro` — H2 (`text-[40px] text-brand-black`), `grid grid-cols-1 md:grid-cols-2 gap-8`, 4 hardcoded value blocks (inline SVG icon + h3 `text-[24px] font-bold` + `text-sm text-brand-black/70` desc).
- [x] 2.7 Create `src/components/landing/CharlasHighlight.astro` — H2 + subtitle (`text-text-muted`), 2-3 hardcoded `CharlaPreviewCard` blocks (session badge, speaker name `font-bold`, topic, `bg-surface-charcoal` thumbnail placeholder). Ghost CTA `onDark`.
- [x] 2.8 Create `src/components/landing/PricingPreview.astro` — H2, 2 plan cards (Free: `border border-border`; Pro: `border-2 border-brand-yellow`). Free CTA: `CTAButton variant="primary"`. Pro CTA: `CTAButton variant="super-primary"`. Hardcoded feature lists. Accepts `pricingCTA: string`.
- [x] 2.9 Create `src/components/landing/FinalCTA.astro` — centered H2 (`text-[40px] font-bold text-brand-white leading-[0.95]`), subtitle `text-text-muted`, single `CTAButton variant="super-primary"`. Accepts `href: string`.

## Phase 3: Page Assembly

- [x] 3.1 Rewrite `src/pages/index.astro` — import all 7 section components, `builders.json`, `apps.json`, `platformCTA`. Generate `heroCTA = platformCTA('hero')`, `pricingCTA = platformCTA('pricing')`, `footerCTA = platformCTA('footer')`. Compose sections in chessboard order: Hero(dark) → Builders(light) → Apps(dark) → Why(light) → Charlas(dark) → Pricing(light) → FinalCTA(dark). Pass typed props to each section.

## Phase 4: Verification

- [x] 4.1 Run `astro check` — zero TypeScript errors; confirm JSON data matches `Builder` and `AppListItem` interfaces.
- [x] 4.2 Manual browser check — verify chessboard alternation (7 sections, correct bg colors in order).
- [x] 4.3 Manual check — all buttons have `rounded-none`, no border-radius exceptions.
- [x] 4.4 Manual check — grep for hardcoded `app.vibecoders.la` URLs; confirm all use `platformCTA()` with correct `ref` values (`hero`, `pricing`, `footer`).
- [x] 4.5 Manual responsive check — Hero H1 scales `32px → 40px → 56px`; Apps grid: 1-col → 2-col → 3-col.
