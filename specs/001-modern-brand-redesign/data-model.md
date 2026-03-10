# Data Model: Modern Brand Redesign

**Branch**: `001-modern-brand-redesign` | **Date**: 2026-03-10

## Overview

This is a static site redesign — there is no traditional database. The "data model" describes the design system entities (CSS custom properties, component contracts) and the Hugo data structures that drive the templates.

## Entity: Design System Tokens

The design system is the central data entity. All visual decisions flow from these tokens, defined as CSS custom properties in `:root`.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#ffffff` | Page background |
| `--bg-secondary` | `#fafafa` | Alternating section backgrounds |
| `--bg-tertiary` | `#f5f5f7` | Card surfaces, code blocks |
| `--fg` | `#1d1d1f` | Primary text |
| `--fg-secondary` | `#6e6e73` | Secondary text, descriptions |
| `--fg-tertiary` | `#86868b` | Captions, metadata, timestamps |
| `--accent` | `#0071e3` | Primary CTA, key links |
| `--accent-hover` | `#0077ed` | Accent hover state |
| `--border` | `#d2d2d7` | Card borders, dividers |
| `--border-light` | `#e8e8ed` | Subtle separators |
| `--code-bg` | `#f5f5f7` | Code block background |
| `--green` | `#2da44e` | Active/success badges |
| `--yellow` | `#bf8700` | Beta/warning badges |
| `--blue` | `#0071e3` | Planned/info badges |
| `--gray` | `#6e6e73` | Archived badges |

### Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | System font stack (SF Pro, Segoe UI, Helvetica, Arial) | All text |
| `--font-mono` | SF Mono, Fira Code, Cascadia Code, Consolas | Code blocks, install commands |
| `--text-hero` | `clamp(3rem, 8vw, 5.5rem)` / 700 / -0.03em | Hero headline |
| `--text-h2` | `clamp(2rem, 4vw, 3rem)` / 600 / -0.02em | Section headings |
| `--text-h3` | `1.25rem` / 600 | Card titles, subheadings |
| `--text-body` | `1.0625rem` / 400 / 1.65 line-height | Body content |
| `--text-caption` | `0.875rem` / 400 | Metadata, dates, tags |
| `--text-code` | `0.9rem` / monospace | Inline and block code |

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.5rem` (8px) | Tight gaps (tag margins, badge padding) |
| `--space-sm` | `1rem` (16px) | Standard element spacing |
| `--space-md` | `1.5rem` (24px) | Card padding, section inner spacing |
| `--space-lg` | `3rem` (48px) | Section gaps |
| `--space-xl` | `5rem` (80px) | Major section separators |
| `--space-2xl` | `8rem` (128px) | Hero padding, page-level spacing |

### Shadow & Effect Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Subtle card resting state |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Card hover, nav scrolled |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.12)` | Elevated elements, modals |
| `--nav-blur` | `saturate(180%) blur(20px)` | Frosted nav background |
| `--radius` | `12px` | Cards, buttons |
| `--radius-sm` | `8px` | Tags, badges, small elements |
| `--radius-lg` | `20px` | Hero elements, large containers |

### Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy interactions |
| `--duration-fast` | `150ms` | Hover, focus, small interactions |
| `--duration-normal` | `300ms` | Nav transitions, toggles |
| `--duration-slow` | `600ms` | Scroll reveal, hero entrance |

## Entity: Product (Hugo Data)

**Source**: `data/projects/*.yaml` — unchanged from current structure.

| Field | Type | Required | Usage in Redesign |
|-------|------|----------|-------------------|
| `name` | string | Yes | Card title |
| `slug` | string | Yes | URL construction |
| `tagline` | string | Yes | Card description |
| `status` | enum: active, beta, planned, archived | Yes | Badge color + label |
| `url` | string | No | Website link (hidden if absent) |
| `github` | string | No | GitHub link (hidden if absent) |
| `language` | string | No | Technology tag |
| `install` | string | No | Install command block (hidden if absent) |
| `featured` | boolean | No | Shown on homepage (default: false) |
| `sort_order` | integer | No | Display ordering |
| `category` | string | No | Category tag |

**Edge case handling**: If `install` is empty, the install block is omitted from the card (not shown as empty). If `url` or `github` are empty, those links are hidden. If `status` is "archived", the card uses muted styling.

## Entity: Social Link (Hugo Data)

**Source**: `data/social.yaml` — unchanged.

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `url` | string | Yes |

## Entity: Navigation Item (Hugo Config)

**Source**: `hugo.toml` `[menu.main]` — label update only.

| Field | Current | After Redesign |
|-------|---------|----------------|
| Logo text | "AI Pioneers" | "Pioneers" |
| Menu items | Home, Products, About, Blog, GitHub | Same structure, updated styling |

## Component Contracts

### Hero Component (`hero.html`)

**Inputs**: None (self-contained, uses site params)
**Renders**: Full-viewport section with 4 layers
**Requires**: `main.js` loaded for particle animation
**Degrades**: Without JS → static gradient + typography only

### Product Card (`project-card.html`)

**Inputs**: Product data object (from `data/projects/*.yaml`)
**Renders**: Elevated card with name, badge, tagline, tags, install, links
**Handles**: Missing `install`, `url`, `github` fields gracefully

### Blog Card (`blog-card.html`)

**Inputs**: Hugo page object (from `content/blog/*.md`)
**Renders**: Title, date, author, excerpt, tags
**Handles**: Missing description (falls back to summary), missing tags (hidden)

### Navigation (`nav.html`)

**Inputs**: `hugo.toml` menu items, current page URL
**Renders**: Sticky nav with "Pioneers" brand, menu items, mobile toggle
**States**: Default (transparent), scrolled (frosted glass + shadow), mobile open
