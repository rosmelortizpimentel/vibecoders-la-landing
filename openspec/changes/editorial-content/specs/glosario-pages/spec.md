# Glosario Pages Specification

## Purpose

Visualization of glossary term listings and individual term details.

## Requirements

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
