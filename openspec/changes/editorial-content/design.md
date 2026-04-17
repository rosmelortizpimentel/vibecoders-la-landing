# Design: Editorial Content Pages (Blog, Charlas, Glosario)

## Technical Approach

Astro Content Collections already have schemas defined in `content.config.ts`. We use `getCollection()` for listings (filtering `draft !== true`) and `getEntry()` / `getStaticPaths()` for detail pages. Two new layouts (`BlogLayout`, `CharlaLayout`) extend `BaseLayout` following the dark-hero/light-content pattern from `[username].astro`. Glosario detail uses `DirectoryLayout` (simpler). MDX rendering uses `<Content />` from Astro's `render()` with `@tailwindcss/typography` prose classes.

## Architecture Decisions

| Decision | Choice | Alternative | Rationale |
|----------|--------|-------------|-----------|
| Typography plugin | `@tailwindcss/typography` v4 (CSS import) | Hand-rolled prose styles | Standard, maintains consistency, TW v4 uses `@import` not `plugins[]` |
| Layout for blog/charla detail | New `BlogLayout` + `CharlaLayout` extending `BaseLayout` | Single shared `ArticleLayout` | Spec demands different hero compositions (video embed vs author card) |
| Glosario detail layout | Reuse `DirectoryLayout` | New `GlosarioLayout` | Simple page, no hero needed — follow existing pattern |
| Video embed | Static YouTube lite placeholder (`<img>` + play overlay linking to `videoUrl`) | Actual `<iframe>` embed | Spec says "placeholder style"; avoids third-party JS; privacy-friendly |
| MDX body container | `max-w-prose` (65ch) with TW typography `prose` class | Custom `max-w-[72ch]` | `max-w-prose` is the standard Tailwind token for readable line length |
| Card components | New `BlogCard`, `CharlaCard`, `GlosarioCard` in `src/components/editorial/` | Reuse `AppDirectoryCard` | Different data shapes; editorial cards need cover image, reading time, tags |
| Prose color customization | Override prose defaults via `prose-headings:text-brand-black prose-a:text-brand-blue` | Custom CSS | Follows TW utility-first convention; no extra CSS files |

## Data Flow

```
Content Collections (MDX in src/content/{blog,charlas,glosario}/)
        │
        ▼
getCollection('blog', filter) ──→ Listing Page (DirectoryLayout)
        │                               │
        │                         BlogCard grid
        ▼
getStaticPaths() ──→ [slug].astro ──→ BlogLayout
        │                                │
  entry.render() ──→ <Content />    ──→ prose container
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/layouts/BlogLayout.astro` | Create | Dark hero (title, author, date, tags, reading time) + light prose body |
| `src/layouts/CharlaLayout.astro` | Create | Dark hero (title, speaker card, session badge) + video + light body |
| `src/components/editorial/BlogCard.astro` | Create | Cover image, title, description, author, date, tags, reading time |
| `src/components/editorial/CharlaCard.astro` | Create | Thumbnail, session number badge, speaker, title, topics |
| `src/components/editorial/GlosarioCard.astro` | Create | Term, acronym, short definition, category badge |
| `src/components/editorial/SpeakerCard.astro` | Create | Avatar, name, role, bio, social links — used in CharlaLayout |
| `src/components/editorial/VideoEmbed.astro` | Create | YouTube lite placeholder: thumbnail + play SVG overlay + link |
| `src/components/editorial/TagList.astro` | Create | Flex-wrap list of `Badge` components for tags/topics |
| `src/components/editorial/RelatedTerms.astro` | Create | Links to related glosario terms |
| `src/pages/blog/index.astro` | Create | Listing with `getCollection('blog')`, DirectoryLayout, BlogCard grid |
| `src/pages/blog/[slug].astro` | Create | Detail with `getStaticPaths`, BlogLayout, `<Content />` |
| `src/pages/charlas/index.astro` | Create | Listing with `getCollection('charlas')`, DirectoryLayout, CharlaCard grid |
| `src/pages/charlas/[slug].astro` | Create | Detail with `getStaticPaths`, CharlaLayout, `<Content />` |
| `src/pages/glosario/index.astro` | Create | Listing with `getCollection('glosario')`, DirectoryLayout, GlosarioCard grid |
| `src/pages/glosario/[slug].astro` | Create | Detail with `getStaticPaths`, DirectoryLayout, `<Content />`, RelatedTerms |
| `src/content/blog/*.mdx` | Create (5) | Replace placeholder — real articles in neutral Spanish (tuteo) |
| `src/content/charlas/*.mdx` | Create (8) | Replace placeholder — real session content in tuteo |
| `src/content/glosario/*.mdx` | Create (15) | Replace placeholder — real glossary terms in tuteo |
| `src/styles/globals.css` | Modify | Add `@import "tailwindcss/typography"` for prose classes |
| `package.json` | Modify | Add `@tailwindcss/typography` dependency |

## Interfaces / Contracts

```typescript
// BlogLayout Props
interface BlogLayoutProps {
  title: string;
  description: string;
  author: { name: string; username: string; avatarUrl?: string };
  publishedAt: Date;
  tags: string[];
  readingTime?: number;
  cover?: string;
}

// CharlaLayout Props
interface CharlaLayoutProps {
  title: string;
  tagline: string;
  sessionNumber: number;
  speaker: {
    name: string; username?: string; role: string; bio: string;
    avatarUrl?: string; linkedinUrl?: string; twitterUrl?: string; websiteUrl?: string;
  };
  recordedAt: Date;
  videoUrl?: string;
  videoEmbedId?: string;
  topics: string[];
}

// VideoEmbed Props
interface VideoEmbedProps {
  videoUrl?: string;
  videoEmbedId?: string;
  title: string;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | All 28 MDX files parse without errors | `astro check` + `astro build` |
| Schema | Frontmatter matches Zod schemas | Build will fail on mismatch — the schema IS the test |
| Visual | Layouts match design system (0px radius, chessboard, prose) | Manual review after build |
| Content | No voseo in any MDX file | `grep -r "construí\|empezá\|mostrá\|unite\|escalá\|elegí\|probá"` on `src/content/` |

## Migration / Rollout

No migration required. Delete existing `placeholder.mdx` files in each collection directory and replace with real MDX files. Rollout is atomic with the deploy.

## Open Questions

- [x] `@tailwindcss/typography` for TW v4: uses `@import "tailwindcss/typography"` in CSS (not plugin config) — confirmed for TW v4
- [ ] Cover images for blog posts: use placeholder gradient divs or generate OG-style images? → Decision: use colored gradient placeholder divs with title text for MVP (no external images needed)
