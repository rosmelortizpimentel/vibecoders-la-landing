# Blog Pages Specification

## Purpose

Visualization of blog article listings and individual article details.

## Requirements

### Requirement: Blog Listing Page

The system MUST display a grid of blog articles on the `/blog` route using the `DirectoryLayout`.

#### Scenario: User visits blog index

- GIVEN the user navigates to `/blog`
- WHEN the page loads
- THEN it MUST display published articles sorted by `publishedAt` descending
- AND it MUST NOT display articles where `draft` is true
- AND it MUST use the `DirectoryLayout` with a white background (`#FFFFFF`)

### Requirement: Blog Post Layout

The system MUST render individual articles on `/blog/[slug]` using a new `BlogLayout`.

#### Scenario: User views an article

- GIVEN the user navigates to a valid article URL
- WHEN the page renders
- THEN it MUST use `BlogLayout` with a dark Hero section (Absolute Black `#000000`) and light content area
- AND the typography MUST use `NouvelR`
- AND all user-facing text MUST use tuteo ("lee", "descubre", "únete")
- AND CTAs MUST redirect to `https://app.vibecoders.la?ref=blog-post`

### Requirement: Blog Content Assets

The system MUST include 5 complete MDX blog articles.

#### Scenario: Content generation

- GIVEN the build process runs
- WHEN Astro parses `src/content/blog/`
- THEN it MUST find exactly 5 valid MDX files matching the `blog` collection schema
