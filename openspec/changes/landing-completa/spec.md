# Specification: Landing Completa

## Domain: landing-page & marketing-components

## ADDED Requirements

### Requirement: REQ-001: Hero Section

The system MUST render a dark Hero section at the top of the landing page.
- **Layout**: `bg-brand-black`, `min-h-screen` (or `min-h-[80vh]`), centered content.
- **Typography**: 
  - H1: `text-[56px]` desktop / `text-[40px]` tablet / `text-[32px]` mobile, `font-bold`, `leading-[0.95]`, `text-brand-white`.
  - Subtitle: `text-sm`, `text-text-muted`, `max-w-xl`, `leading-relaxed`.
- **Buttons**:
  - Super-primary CTA (Empezar ahora): `bg-brand-yellow`, `text-brand-black`, `font-bold`, `px-[15px] py-[10px]`, `min-w-[160px]`, `rounded-none`.
  - Ghost CTA (Explorar): `bg-transparent`, `border border-brand-white`, `text-brand-white`, `font-bold`, `px-[15px] py-[10px]`, `min-w-[160px]`, `rounded-none`.
- **Stats row**: 3 counters ("150+ Builders", "80+ Apps", "12 Países") with `text-brand-white font-bold` for numbers, and `text-text-muted` for labels.
- **Data Source**: Hardcoded numbers for stats.

#### Scenario: Full landing hero rendering
- GIVEN the user navigates to the index page
- WHEN the hero section is displayed
- THEN it uses `bg-brand-black` and features an H1 with `leading-[0.95]`
- AND the super-primary CTA uses `bg-brand-yellow` with 0px border-radius

#### Scenario: Responsive hero text scaling
- GIVEN the user views the hero section
- WHEN the viewport width changes from mobile to desktop
- THEN the H1 text size MUST scale from `text-[32px]` to `text-[56px]`

### Requirement: REQ-002: Builders Marquee

The system MUST render a light marquee section displaying builder profiles.
- **Layout**: `bg-brand-white`, `py-20` (80px) desktop / `py-12` mobile. Horizontal `overflow-x-auto` scroll for cards.
- **Typography**: 
  - H2: `text-[40px]` desktop / `text-[32px]` mobile, `font-bold`, `text-brand-black`, `leading-[0.95]`, `text-center`.
- **Component (BuilderCard)**:
  - Avatar: 48px round.
  - Name: `font-bold`, `text-sm`.
  - Tagline: `text-xs`, `text-text-muted`.
  - Tier badge.
- **Button**:
  - Ghost CTA: `border border-brand-black`, `text-brand-black`, `font-bold`, `rounded-none`.
- **Data Source**: Feeds from `src/data/builders.json`.

#### Scenario: Builder cards render from JSON
- GIVEN the builders.json file contains mock profiles
- WHEN the Builders Marquee section is rendered
- THEN it MUST iterate over builders and display a `BuilderCard` for each

### Requirement: REQ-003: Apps Showcase

The system MUST render a dark Apps Showcase section displaying community apps.
- **Layout**: `bg-brand-black`, `py-20`. Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- **Typography**:
  - H2: `text-[40px]`, `font-bold`, `text-brand-white`, `leading-[0.95]`.
- **Component (AppCard)**:
  - Background: `bg-surface-charcoal` (or `bg-brand-black` with border).
  - Logo: 40px.
  - Name: `font-bold`, `text-brand-white`.
  - Tagline: `text-sm`, `text-text-muted`.
  - Additional info: Builder name, category badge, status badge.
- **Button**:
  - Ghost CTA: `border border-brand-white`, `text-brand-white`, `rounded-none`.
- **Data Source**: Feeds from `src/data/apps.json`.

#### Scenario: App cards grid responsiveness
- GIVEN the user views the Apps Showcase section
- WHEN the viewport size changes
- THEN the layout MUST change from 1 column (mobile) to 2 columns (tablet) to 3 columns (desktop)

### Requirement: REQ-004: Why VibeCoders

The system MUST render a light value proposition section.
- **Layout**: `bg-brand-white`, `py-20`. Grid: `grid-cols-1 md:grid-cols-2 gap-8` (2x2 grid).
- **Typography**:
  - H2: `text-[40px]`, `font-bold`, `text-brand-black`.
- **Component (ValueBlock)**:
  - Icon: 24px, `text-brand-black`, using simple SVG inline or unicode (no external lib).
  - Heading: h3, `text-[24px] font-bold`.
  - Description: `text-sm`, `text-brand-black/70`.
- **Data Source**: Hardcoded content.

#### Scenario: Value blocks 2x2 grid layout
- GIVEN the Why VibeCoders section is rendered on desktop
- WHEN the 4 value blocks are displayed
- THEN they MUST form a 2x2 grid using `md:grid-cols-2`

### Requirement: REQ-005: Charlas Highlight

The system MUST render a dark section highlighting community talks.
- **Layout**: `bg-brand-black`, `py-20`.
- **Typography**:
  - H2: `text-[40px]`, `font-bold`, `text-brand-white`.
  - Subtitle: `text-sm`, `text-text-muted`.
- **Component (CharlaPreviewCard)**:
  - 2-3 preview cards.
  - Session number badge.
  - Speaker name: `font-bold`.
  - Topic title.
  - Thumbnail placeholder: `bg-surface-charcoal`.
- **Button**:
  - Ghost CTA: `border border-brand-white`, `text-brand-white`, `rounded-none`.
- **Data Source**: Hardcoded mock data (NOT from content collections).

#### Scenario: Charlas cards use hardcoded data
- GIVEN the Charlas Highlight section
- WHEN it renders
- THEN it MUST use local hardcoded data instead of Astro content collections

### Requirement: REQ-006: Pricing Preview

The system MUST render a light pricing preview section.
- **Layout**: `bg-brand-white`, `py-20`. Flex or grid, stacked on mobile.
- **Typography**:
  - H2: `text-[40px]`, `font-bold`, `text-brand-black`.
- **Component (PlanCard Free)**:
  - Background: `bg-brand-white`.
  - Border: `border border-border`.
  - Price: "Gratis".
  - Feature list: 5-6 items with checkmarks.
  - CTA "Empezar gratis": Primary black button (`bg-brand-black`, `text-brand-white`, `rounded-none`).
- **Component (PlanCard Pro)**:
  - Background: `bg-brand-white`.
  - Border: `border-2 border-brand-yellow` (highlighted).
  - Price: "$29.90/año".
  - Feature list: 5-6 items.
  - CTA "Ser Pro": Super-primary yellow button (`bg-brand-yellow`, `text-brand-black`, `rounded-none`) — allowed here as only yellow CTA in viewport.
- **Data Source**: Hardcoded content.

#### Scenario: One yellow CTA per viewport rule validation
- GIVEN the Pricing Preview section
- WHEN the "Ser Pro" card is rendered
- THEN it MUST be the ONLY button in this section using `bg-brand-yellow` to adhere to design rules

### Requirement: REQ-007: Final CTA

The system MUST render a dark final call-to-action section.
- **Layout**: `bg-brand-black`, `py-24` (generous padding). Centered content.
- **Typography**:
  - H2: `text-[40px]` desktop, `font-bold`, `text-brand-white`, `leading-[0.95]`.
  - Subtitle: `text-sm`, `text-text-muted`.
- **Button**:
  - Super-primary CTA: `bg-brand-yellow`, `text-brand-black`, `rounded-none`, centered.
- **Data Source**: Hardcoded text.

#### Scenario: Final CTA uses tracking param
- GIVEN the Final CTA section
- WHEN the super-primary CTA link is generated
- THEN it MUST use `platformCTA()` with the appropriate ref param (e.g. `platformCTA('footer')`)

### Global/Cross-Section Requirements

#### Scenario: Chessboard alternation (dark-light-dark-light-dark-light-dark)
- GIVEN the full landing page is assembled in `index.astro`
- WHEN the sections are rendered in order
- THEN they MUST strictly alternate background colors: Hero(dark) -> Builders(light) -> Apps(dark) -> Why(light) -> Charlas(dark) -> Pricing(light) -> FinalCTA(dark)

#### Scenario: Zero border-radius on all buttons/CTAs
- GIVEN any interactive button or CTA across all 7 sections
- WHEN rendered
- THEN it MUST have 0px border-radius explicitly set or inherited

#### Scenario: All CTA links use platformCTA
- GIVEN any button directing users to the platform (login/signup)
- WHEN the href is constructed
- THEN it MUST use the `platformCTA()` helper to append correct `?ref=` params