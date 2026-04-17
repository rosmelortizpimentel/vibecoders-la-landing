# Charlas Pages Specification

## Purpose

Visualization of live/recorded session listings and individual session details.

## Requirements

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
