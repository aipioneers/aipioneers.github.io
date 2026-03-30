# Quickstart: Add spec-intelligence to AI Pioneers Portfolio

**Date**: 2026-03-30 | **Feature**: 002-add-spec-kit-product

## Prerequisites

- Hugo 0.147.0 extended (already installed for the site)
- Access to `data/projects/` and `content/blog/` directories

## Step 1: Create Product YAML

Create `data/projects/spec-intelligence.yaml` with all required fields matching the schema defined in `data-model.md`. Use existing files (e.g., `autoskill.yaml`) as a reference for field format and tone.

## Step 2: Verify Product Rendering

```bash
hugo server -D
```

Open `http://localhost:1313` and verify:
- spec-intelligence appears in the featured products grid on the homepage
- spec-intelligence appears on the `/products/` page
- The product card shows correct name, tagline, status badge, features, install command, and GitHub link

## Step 3: Write Blog Post

Create `content/blog/introducing-spec-intelligence.md` with frontmatter and content following the structure pattern from existing posts (see research.md R3).

## Step 4: Verify Blog Post

With `hugo server -D` running, verify:
- Post appears on the `/blog/` listing page
- Post content renders correctly with code blocks, headings, and links
- Cross-references to other products link correctly

## Step 5: Build Check

```bash
hugo --minify
```

Verify clean build with no errors or warnings.

## Step 6: Deploy

Push to `main` branch. GitHub Actions auto-deploys to pioneers.ai.

## Verification Checklist

- [ ] Product card visible on homepage (featured grid)
- [ ] Product card visible on products page
- [ ] Blog post visible on blog listing
- [ ] Blog post content complete (problem, solution, features, install, roadmap)
- [ ] All links working (GitHub, cross-references)
- [ ] `hugo --minify` builds without errors
- [ ] No changes to `layouts/` directory
