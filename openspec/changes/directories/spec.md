# Directories Specification

## Purpose
Implement public directories for Builders (`/builders`) and Apps (`/apps`) to showcase the community.

## 1. Directory Layout & Reusable Components

### REQ-001: DirectoryLayout Component
The system MUST provide a `DirectoryLayout` extending `BaseLayout`.
- It MUST include breadcrumb navigation.
- The page surface MUST default to `bg-brand-white`.

#### Scenario: Viewing a directory page
- GIVEN the user navigates to `/builders`
- WHEN the layout renders
- THEN breadcrumbs display the path
- AND the background is `bg-brand-white`

### REQ-002: Reusable UI Components
The system MUST provide:
- `FilterBar`: A visual UI filter using pill-shaped chips (`rounded-[50px] border-[#D1D1D1]`).
- `SocialLinks`: External social URLs rendered as icons.
- Cards: `BuilderDirectoryCard` and `AppDirectoryCard` using `bg-surface-silver` or `bg-surface-charcoal` with `rounded-none`.

#### Scenario: FilterBar styling
- GIVEN the `FilterBar` component
- WHEN it renders
- THEN filter chips have `rounded-[50px]`

## 2. Builders Directory (`/builders`)

### REQ-003: Builders Listing Page
The system MUST provide `/builders` displaying a responsive grid.
- Background MUST be `bg-brand-white`.
- It MUST use `FilterBar` for visual filtering.
- Items MUST be rendered using `BuilderDirectoryCard`.

#### Scenario: Viewing builders grid
- GIVEN the user visits `/builders`
- WHEN the page loads
- THEN a grid of `BuilderDirectoryCard` is displayed

## 3. Builder Profile (`/builders/[username]`)

### REQ-004: Builder Profile Page
The system MUST generate static pages at `/builders/[username]` using `getStaticPaths()` from `builders.json`.
- The hero MUST use `bg-brand-black` and `text-brand-white`.
- The hero headline MUST use `font-bold text-[56px] leading-[0.95]`.
- The content section MUST alternate to `bg-brand-white`.
- It MUST display stats, bio, social links, and the builder's apps.
- The CTA MUST point to `platformCTA('builder-profile', '/chat/${username}')` using a primary button (`bg-brand-black text-brand-white rounded-none px-[15px] py-[10px] border-brand-black`).

#### Scenario: Navigating to builder profile
- GIVEN builder `martinl` is in `builders.json`
- WHEN the user visits `/builders/martinl`
- THEN the hero displays "Martín López" in white text on black
- AND the CTA points to `https://app.vibecoders.la/chat/martinl?ref=builder-profile`

## 4. Apps Directory (`/apps`)

### REQ-005: Apps Listing Page
The system MUST provide `/apps` displaying a responsive grid.
- Background MUST be `bg-brand-white`.
- It MUST use `FilterBar` for visual filtering.
- Items MUST be rendered using `AppDirectoryCard`.

#### Scenario: Viewing apps grid
- GIVEN the user visits `/apps`
- WHEN the page loads
- THEN a grid of `AppDirectoryCard` is displayed

## 5. App Detail (`/apps/[slug]`)

### REQ-006: App Detail Page
The system MUST generate static pages at `/apps/[slug]` using `getStaticPaths()` from `apps.json`.
- The hero MUST use `bg-brand-black` and `text-brand-white`.
- The hero headline MUST use `font-bold text-[56px] leading-[0.95]`.
- The content section MUST alternate to `bg-brand-white`.
- It MUST display `description`, `screenshots`, `techStack`, builder info, and links.
- The super-primary CTA MUST use Renault Yellow (`bg-[#EFDF00] text-[#000000] rounded-none px-[15px] py-[10px] border-[#EFDF00]`).

#### Scenario: Navigating to app detail
- GIVEN app `facturai` is in `apps.json`
- WHEN the user visits `/apps/facturai`
- THEN the hero displays "FacturAI" in white text on black
- AND the super-primary CTA is Renault Yellow

## 6. Data Expansion

### REQ-007: JSON Data Requirements
The system MUST expand static JSON data.
- `builders.json` MUST contain 10 builders.
- `apps.json` MUST contain 8 apps.
- `apps.json` entries MUST include `AppDetail` fields (`description`, `screenshots`, `betaActive`).

#### Scenario: Static paths generation
- GIVEN the build runs
- WHEN `getStaticPaths()` reads `apps.json`
- THEN it successfully maps `description` and `screenshots`