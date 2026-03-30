# Data Model: Add spec-intelligence to AI Pioneers Portfolio

**Date**: 2026-03-30 | **Feature**: 002-add-spec-kit-product

## Entity: Product Data File (spec-intelligence.yaml)

A YAML document in `data/projects/` that Hugo reads at build time to render product cards.

### Fields

| Field        | Type     | Required | Value                          |
|--------------|----------|----------|--------------------------------|
| name         | string   | yes      | `spec-intelligence`            |
| slug         | string   | yes      | `spec-intelligence`            |
| tagline      | string   | yes      | Short product pitch (~80 chars) |
| description  | string   | yes      | Full product description (~2-3 sentences) |
| status       | string   | yes      | `beta`                         |
| github       | string   | yes      | GitHub repo URL                |
| language     | string   | yes      | `TypeScript`                   |
| install      | string   | yes      | `npm install spec-intelligence` |
| featured     | boolean  | yes      | `true`                         |
| sort_order   | integer  | yes      | `4`                            |
| category     | string   | yes      | `Developer Tools`              |
| features     | string[] | yes      | 8+ feature descriptions        |

### Validation Rules

- `slug` must be unique across all files in `data/projects/`
- `sort_order` must be unique across all products
- `features` array must have at least 8 entries (per FR-011)
- `status` must be one of: `active`, `beta`, `preview` (matches CSS badge classes)
- `github` URL must be publicly accessible at publish time (per FR-012)

### Relationships

- Referenced by: `layouts/partials/project-card.html` (card rendering)
- Referenced by: `layouts/products/list.html` (product grid iteration)
- Referenced by: `layouts/index.html` (featured products filter: `{{ if .featured }}`)
- Sorted by: `sort_order` ascending in all listing contexts

## Entity: Blog Post (introducing-spec-intelligence.md)

A Markdown file in `content/blog/` with Hugo frontmatter.

### Frontmatter Fields

| Field       | Type     | Required | Value                                |
|-------------|----------|----------|--------------------------------------|
| title       | string   | yes      | Introduction post title              |
| date        | date     | yes      | Publication date (YYYY-MM-DD)        |
| author      | string   | yes      | `Pioneers`                           |
| description | string   | yes      | SEO description (~150 chars)         |
| tags        | string[] | yes      | Relevant tags (release, spec-intelligence, etc.) |

### Content Structure

1. Problem statement (1-2 paragraphs)
2. Product introduction (bold product name, overview)
3. Feature walkthroughs (subsections with code blocks, 3+ examples)
4. Install section (npm primary, pip alternative)
5. What's Next section (roadmap items)
6. GitHub link

### Relationships

- Listed by: `layouts/_default/list.html` (blog listing page)
- Rendered by: `layouts/_default/single.html` (individual post view)
- Cross-references: at least 2 other products (autoskill, code-adapt, or code-explore)
