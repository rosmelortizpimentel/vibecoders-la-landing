# Delta Specs: editorial-content

## Blog Pages Specification

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

## Charlas Pages Specification

### Requirement: Charlas Listing Page
The system MUST display a grid of sessions on the `/charlas` route.
#### Scenario: User visits charlas index
- GIVEN the user navigates to `/charlas`
- WHEN the page loads
- THEN it MUST display published sessions sorted by `sessionNumber` descending
- AND it MUST NOT display sessions where `draft` is true
- AND it MUST use the `DirectoryLayout`

### Requirement: Charla Layout
The system MUST render individual sessions on `/charlas/[slug]` using a new `CharlaLayout`.
#### Scenario: User views a session
- GIVEN the user navigates to a valid session URL
- WHEN the page renders
- THEN it MUST use `CharlaLayout` with a dark Hero section (`#000000`)
- AND it MUST embed a video placeholder (YouTube lite style) if `videoUrl` or `videoEmbedId` exists
- AND all text MUST use tuteo ("asiste", "mira", "únete")
- AND platform CTAs MUST use `?ref=charla-post`

### Requirement: Charlas Content Assets
The system MUST include 8 complete MDX session files.
#### Scenario: Content generation
- GIVEN the build process runs
- WHEN Astro parses `src/content/charlas/`
- THEN it MUST find exactly 8 valid MDX files matching the `charlas` collection schema

## Glosario Pages Specification

### Requirement: Glosario Listing Page
The system MUST display an alphabetical or categorized grid of terms on `/glosario`.
#### Scenario: User visits glosario index
- GIVEN the user navigates to `/glosario`
- WHEN the page loads
- THEN it MUST display published terms sorted alphabetically
- AND it MUST use the `DirectoryLayout`

### Requirement: Glosario Detail Page
The system MUST render individual term definitions on `/glosario/[slug]`.
#### Scenario: User views a term
- GIVEN the user navigates to a valid term URL
- WHEN the page renders
- THEN it MUST display the `term`, `acronym` (if present), and the parsed MDX content
- AND it MUST display `relatedTerms` as links if present
- AND the text MUST use neutral Spanish (tuteo)

### Requirement: Glosario Content Assets
The system MUST include 15 complete MDX glossary terms.
#### Scenario: Content generation
- GIVEN the build process runs
- WHEN Astro parses `src/content/glosario/`
- THEN it MUST find exactly 15 valid MDX files matching the `glosario` collection schema
