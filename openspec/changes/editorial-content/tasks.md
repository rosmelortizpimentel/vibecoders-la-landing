# Tasks: editorial-content

## Phase 1: Infrastructure

- [x] **T1.1** Install `@tailwindcss/typography` via pnpm
  - `pnpm add @tailwindcss/typography`
  - Add `@plugin "@tailwindcss/typography"` to `src/styles/globals.css` after the `@import "tailwindcss"` line
  - **Deviation**: TW v4 uses `@plugin` directive, not `@import "tailwindcss/typography"` as the design.md assumed
  - Files: `package.json`, `pnpm-lock.yaml`, `src/styles/globals.css`

- [x] **T1.2** Create `BlogLayout.astro`
  - Extends `BaseLayout` (same pattern as `[username].astro`)
  - Props: `title`, `description`, `author`, `publishedAt`, `tags`, `readingTime?`, `cover?`
  - Dark hero section (`bg-brand-black`): title (56px→32px mobile, font-bold, leading-[0.95], text-brand-white), author row (avatar + name + date), reading time, TagList
  - Light content section (`bg-brand-white`): `<div class="max-w-prose mx-auto">` with `prose` class wrapping `<slot />`
  - CTA at bottom: `CTAButton` primary → `platformCTA('blog-post')`
  - Breadcrumbs: Inicio → Blog → {title}
  - Files: `src/layouts/BlogLayout.astro`

- [x] **T1.3** Create `CharlaLayout.astro`
  - Extends `BaseLayout`
  - Props: `title`, `tagline`, `sessionNumber`, `speaker`, `recordedAt`, `videoUrl?`, `videoEmbedId?`, `topics`, `resources`, `timestamps`
  - Dark hero: session badge, title, tagline, SpeakerCard, VideoEmbed (if video exists)
  - Light content section: prose-wrapped `<slot />`, resources list, timestamps list
  - CTA: `CTAButton` primary → `platformCTA('charla-post')`
  - Breadcrumbs: Inicio → Charlas → {title}
  - Files: `src/layouts/CharlaLayout.astro`

## Phase 2: Components

- [x] **T2.1** Create `BlogCard.astro`
  - Props match blog schema fields (title, description, slug, author, publishedAt, tags, cluster, readingTime, cover)
  - Card: `bg-surface-silver p-0 rounded-none hover:shadow-soft` (follows AppDirectoryCard pattern)
  - Cover area (gradient placeholder `bg-brand-black h-40`), content area with title (font-bold text-base), description (text-sm line-clamp-2), author row, date, reading time
  - Links to `/blog/{slug}`
  - Files: `src/components/editorial/BlogCard.astro`

- [x] **T2.2** Create `CharlaCard.astro`
  - Props match charlas schema (title, slug, sessionNumber, speaker, tagline, topics, thumbnail, recordedAt)
  - Dark card (`bg-surface-charcoal`) matching CharlasHighlight pattern
  - Session badge, thumbnail placeholder (play icon SVG), speaker name, title, topics as badges
  - Links to `/charlas/{slug}`
  - Files: `src/components/editorial/CharlaCard.astro`

- [x] **T2.3** Create `GlosarioCard.astro`
  - Props: term, slug, acronym?, shortDefinition, category
  - Light card (`bg-surface-silver p-6 rounded-none`)
  - Term as heading (font-bold), acronym in parentheses if present, shortDefinition (text-sm), category Badge
  - Links to `/glosario/{slug}`
  - Files: `src/components/editorial/GlosarioCard.astro`

- [x] **T2.4** Create `SpeakerCard.astro`
  - Props: speaker object from charlas schema
  - Avatar (48px circle), name (font-bold), role (text-sm text-text-muted), bio (text-sm), social links using `SocialLinks` component pattern
  - Used inside CharlaLayout hero (white text on dark bg)
  - Files: `src/components/editorial/SpeakerCard.astro`

- [x] **T2.5** Create `VideoEmbed.astro`
  - Props: `videoUrl?`, `videoEmbedId?`, `title`
  - If `videoEmbedId`: show YouTube thumbnail (`https://img.youtube.com/vi/{id}/hqdefault.jpg`) with play overlay SVG, wrapped in `<a>` linking to full video URL
  - If only `videoUrl`: show dark placeholder box with play icon linking to URL
  - If neither: don't render
  - Aspect ratio: `aspect-video` (16:9)
  - Files: `src/components/editorial/VideoEmbed.astro`

- [x] **T2.6** Create `TagList.astro`
  - Props: `tags: string[]`, `variant?: 'category' | 'topic'`
  - Renders flex-wrap row of `Badge` components (variant="category")
  - Reuses existing Badge component
  - **Deviation**: Badge component only accepts `'tier' | 'category' | 'status'` so `topic` maps to `category` internally
  - Files: `src/components/editorial/TagList.astro`

- [x] **T2.7** Create `RelatedTerms.astro`
  - Props: `terms: string[]`, `currentSlug: string`
  - Renders links to `/glosario/{slug}` for each related term
  - Slug derived from term name (kebab-case, lowercase, remove accents)
  - Files: `src/components/editorial/RelatedTerms.astro`

## Phase 3: MDX Content

> ALL content MUST use neutral Spanish (tuteo). NO voseo. Review: "construye" not "construí", "empieza" not "empezá", "únete" not "unite".

- [x] **T3.1** Create 5 blog posts in `src/content/blog/`
  - Deleted `placeholder.mdx`
  - Created: `que-es-vibe-coding.mdx`, `mejores-herramientas-ia-2026.mdx`, `de-idea-a-mvp-con-ia.mdx`, `arquitectura-limpia-con-ia.mdx`, `comunidad-vs-soledad-builder.mdx`
  - Files: `src/content/blog/*.mdx` (5 files)

- [x] **T3.2** Create 8 charlas in `src/content/charlas/`
  - Deleted `placeholder.mdx`
  - Created: `automatizacion-n8n.mdx`, `supabase-para-builders.mdx`, `diseno-ui-con-ia.mdx`, `deployar-en-vercel.mdx`, `testing-con-ia.mdx`, `claude-code-en-practica.mdx`, `monetizar-tu-saas.mdx`, `lovable-en-produccion.mdx`
  - Files: `src/content/charlas/*.mdx` (8 files)

- [x] **T3.3** Create 15 glosario terms in `src/content/glosario/`
  - Deleted `placeholder.mdx`
  - Created: `vibe-coding.mdx`, `prompt-engineering.mdx`, `llm.mdx`, `agente-ia.mdx`, `rag.mdx`, `fine-tuning.mdx`, `cursor.mdx`, `lovable.mdx`, `mvp.mdx`, `ci-cd.mdx`, `edge-functions.mdx`, `token.mdx`, `alucinacion-ia.mdx`, `context-window.mdx`, `no-code.mdx`
  - Files: `src/content/glosario/*.mdx` (15 files)

## Phase 4: Pages

- [x] **T4.1** Create `src/pages/blog/index.astro`
  - Uses `DirectoryLayout` (title: "Blog", breadcrumbs: Inicio → Blog)
  - `getCollection('blog')` filtered by `draft !== true`, sorted by `publishedAt` desc
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Renders `BlogCard` for each post
  - Files: `src/pages/blog/index.astro`

- [x] **T4.2** Create `src/pages/blog/[slug].astro`
  - `getStaticPaths()` from `getCollection('blog')` filtered by `!draft`
  - Renders `BlogLayout` passing frontmatter as props
  - Uses `render(entry)` (Astro 6 API) → `<Content />` inside layout slot
  - Files: `src/pages/blog/[slug].astro`

- [x] **T4.3** Create `src/pages/charlas/index.astro`
  - Uses `DirectoryLayout` (title: "Charlas", breadcrumbs: Inicio → Charlas)
  - `getCollection('charlas')` filtered, sorted by `sessionNumber` desc
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Renders `CharlaCard` for each session
  - Files: `src/pages/charlas/index.astro`

- [x] **T4.4** Create `src/pages/charlas/[slug].astro`
  - `getStaticPaths()` from `getCollection('charlas')` filtered by `!draft`
  - Renders `CharlaLayout` passing frontmatter + speaker, video props
  - `render(entry)` (Astro 6 API) → `<Content />` inside layout slot
  - Files: `src/pages/charlas/[slug].astro`

- [x] **T4.5** Create `src/pages/glosario/index.astro`
  - Uses `DirectoryLayout` (title: "Glosario", breadcrumbs: Inicio → Glosario)
  - `getCollection('glosario')` filtered, sorted alphabetically by `term`
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
  - Renders `GlosarioCard` for each term
  - Files: `src/pages/glosario/index.astro`

- [x] **T4.6** Create `src/pages/glosario/[slug].astro`
  - `getStaticPaths()` from `getCollection('glosario')` filtered by `!draft`
  - Uses `DirectoryLayout` (breadcrumbs: Inicio → Glosario → {term})
  - Renders `<Content />` inside `max-w-prose prose` container
  - Displays `acronym`, `shortDefinition`, `category` Badge, `RelatedTerms`
  - CTA: `CTAButton` ghost → `platformCTA('glosario-term')`
  - Files: `src/pages/glosario/[slug].astro`

## Phase 5: Verification

- [x] **T5.1** Run `astro check` — zero errors (0 errors, 0 warnings, 229 hints)
- [x] **T5.2** Run `astro build` — 52 pages built successfully
- [x] **T5.3** Grep all `src/content/` for voseo forms — zero matches
- [ ] **T5.4** Visual review: listings render card grids, details render prose, CTAs point to `app.vibecoders.la?ref=*`
- [x] **T5.5** Verify zero `border-radius` on any button/CTA in new components — confirmed (rounded-full only on avatar circles, not buttons)

## Dependency Graph

```
T1.1 ─────────────────────────────┐
T1.2 ──┐                          │
T1.3 ──┤                          │
       │                          │
T2.1 ──┤ (needs T1.2 for layout)  │
T2.2 ──┤ (needs T1.3 for layout)  │
T2.3 ──┤                          │
T2.4 ──┤ (used by T1.3)           │
T2.5 ──┤ (used by T1.3)           │
T2.6 ──┤ (used by T1.2, T1.3)    │
T2.7 ──┤                          │
       │                          │
T3.1 ──┤ (independent of phases)  │
T3.2 ──┤                          │
T3.3 ──┤                          │
       │                          │
T4.1 ──┤ (needs T2.1 + T3.1)     │
T4.2 ──┤ (needs T1.2 + T3.1)     │
T4.3 ──┤ (needs T2.2 + T3.2)     │
T4.4 ──┤ (needs T1.3 + T3.2)     │
T4.5 ──┤ (needs T2.3 + T3.3)     │
T4.6 ──┤ (needs T2.7 + T3.3)     │
       │                          │
T5.* ──┘ (all previous complete)  │
       ◄──────────────────────────┘
```

## Execution Recommendation

**Optimal apply order**: T1.1 → (T2.1–T2.7 + T1.2 + T1.3 parallel) → (T3.1–T3.3 parallel) → (T4.1–T4.6 parallel) → T5.*

Split into 3–4 sdd-apply passes:
1. **Pass 1**: T1.1 + T1.2 + T1.3 + T2.1–T2.7 (infrastructure + components)
2. **Pass 2**: T3.1 + T3.2 + T3.3 (all MDX content — this is the biggest pass)
3. **Pass 3**: T4.1–T4.6 (all pages)
4. **Pass 4**: T5.* (verification)
