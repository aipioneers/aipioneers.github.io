# Implementation Plan: Modern Brand Redesign

**Branch**: `001-modern-brand-redesign` | **Date**: 2026-03-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-modern-brand-redesign/spec.md`

## Summary

Complete visual rebrand of the AI Pioneers Hugo site from a dark GitHub-style theme to a light, Apple-inspired, ultra-minimal design. The brand mark shifts to "Pioneers" with a neutral black-and-white palette and sparse color accents. The homepage gets a full-viewport layered hero (typography + animated accents + geometric SVGs + particle background). All pages receive scroll animations, a frosted-glass sticky nav, and responsive mobile-first layouts. No new dependencies — pure CSS + vanilla JS within Hugo's static site architecture.

## Technical Context

**Language/Version**: Hugo 0.147.0 extended (Go templates), CSS3, vanilla JavaScript (ES6+)
**Primary Dependencies**: None — custom theme, no external CSS/JS frameworks
**Storage**: N/A (static site, data in YAML files under `data/`)
**Testing**: Manual visual testing + Lighthouse CLI + browser DevTools responsive mode
**Target Platform**: Web (GitHub Pages), all modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Static website (Hugo SSG)
**Performance Goals**: Lighthouse 90+ mobile, <2s interactive, 60fps animations
**Constraints**: No JS frameworks, system fonts preferred, GitHub Pages hosting (no server-side), Hugo template language only
**Scale/Scope**: 7 layout templates, 5 partials, 1 CSS file (~900 lines), 4 content pages, 1 product

## Constitution Check

*No constitution.md found in `.specify/memory/`. Gate passes by default — no constraints to validate.*

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-brand-redesign/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
hugo.toml                          # Config — update site params, menu labels
content/
├── _index.md                      # Homepage — no changes needed
├── about/_index.md                # About — no changes needed
├── blog/_index.md                 # Blog listing — no changes needed
└── products/_index.md             # Products — no changes needed

layouts/
├── _default/
│   ├── baseof.html                # MODIFY: new JS (IntersectionObserver, particles, nav scroll)
│   ├── list.html                  # MODIFY: updated markup for blog list
│   └── single.html                # MODIFY: updated markup for blog post / page
├── partials/
│   ├── head.html                  # MODIFY: add preconnect, meta theme-color, structured data
│   ├── nav.html                   # REWRITE: frosted-glass sticky nav, "Pioneers" brand mark
│   ├── footer.html                # REWRITE: new brand-consistent footer layout
│   ├── project-card.html          # REWRITE: elevated card design with hover animations
│   ├── blog-card.html             # REWRITE: clean card/list design
│   └── hero.html                  # NEW: full-viewport layered hero partial
├── products/
│   └── list.html                  # MODIFY: updated section markup
├── 404.html                       # MODIFY: on-brand 404
└── index.html                     # REWRITE: new homepage with hero partial + sections

static/
├── css/
│   └── style.css                  # REWRITE: complete new design system (~1000-1200 lines)
├── js/
│   └── main.js                    # NEW: scroll animations, particle canvas, nav behavior
└── images/
    └── (no changes)

data/
├── projects/code-explore.yaml     # No changes
└── social.yaml                    # No changes
```

**Structure Decision**: The existing Hugo structure is clean and appropriate. No new directories needed except `static/js/` for the extracted JavaScript (currently inline in baseof.html). The hero becomes its own partial for reuse and clarity. All other changes are in-place modifications.

## Design System Specification

### Color Tokens

```
--bg:              #ffffff        (white base)
--bg-secondary:    #fafafa        (subtle section alternation)
--bg-tertiary:     #f5f5f7        (card backgrounds, code blocks)
--fg:              #1d1d1f        (primary text — near-black)
--fg-secondary:    #6e6e73        (secondary text — muted gray)
--fg-tertiary:     #86868b        (captions, metadata)
--accent:          #0071e3        (sparse accent — links, key CTAs only)
--accent-hover:    #0077ed        (accent hover state)
--border:          #d2d2d7        (subtle borders)
--border-light:    #e8e8ed        (lighter dividers)
--shadow-sm:       0 1px 3px rgba(0,0,0,0.08)
--shadow-md:       0 4px 12px rgba(0,0,0,0.08)
--shadow-lg:       0 8px 30px rgba(0,0,0,0.12)
--nav-blur:        saturate(180%) blur(20px)
--radius:          12px
--radius-sm:       8px
--radius-lg:       20px
```

### Typography Scale

```
--font-sans:       -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Helvetica, Arial, sans-serif
--font-mono:       'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace

Hero headline:     clamp(3rem, 8vw, 5.5rem), weight 700, tracking -0.03em
Section headline:  clamp(2rem, 4vw, 3rem), weight 600, tracking -0.02em
Card title:        1.25rem, weight 600
Body:              1.0625rem (17px), weight 400, line-height 1.65
Caption:           0.875rem, weight 400
Code:              0.9rem, monospace
```

### Spacing System

```
--space-xs:   0.5rem    (8px)
--space-sm:   1rem      (16px)
--space-md:   1.5rem    (24px)
--space-lg:   3rem      (48px)
--space-xl:   5rem      (80px)
--space-2xl:  8rem      (128px)
```

### Animation Tokens

```
--ease-out:        cubic-bezier(0.25, 0.46, 0.45, 0.94)
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1)
--duration-fast:   150ms
--duration-normal: 300ms
--duration-slow:   600ms

Scroll entrance:   translateY(30px) → translateY(0), opacity 0 → 1, duration-slow
Hover lift:        translateY(-2px) + shadow-md → shadow-lg, duration-fast
Nav scroll:        transparent → white/80% + blur, duration-normal
```

## Implementation Phases

### Phase A: Design System Foundation (CSS Custom Properties + Reset)
- Define all CSS custom properties (colors, typography, spacing, animation, shadows)
- Write CSS reset and base element styles
- Set up responsive breakpoint mixins via media queries
- Add `prefers-reduced-motion` global override
- **Files**: `static/css/style.css` (first ~200 lines)

### Phase B: Core Layout Components
- Navigation bar: frosted-glass sticky, "Pioneers" wordmark, scroll-aware shadow
- Footer: new 3-column layout with "AI Pioneers" full name, organized links
- Base layout: `baseof.html` — updated `<head>`, body structure, JS loading
- `head.html` partial: meta theme-color (#ffffff), preconnect hints, OG updates
- **Files**: `layouts/partials/nav.html`, `layouts/partials/footer.html`, `layouts/partials/head.html`, `layouts/_default/baseof.html`, `static/css/style.css` (layout sections)

### Phase C: Homepage Hero
- New `hero.html` partial with 4 visual layers:
  1. Canvas element for particle/dot animation (JS-powered)
  2. SVG geometric shapes (abstract, decorative)
  3. Gradient wash overlay (CSS)
  4. Typography + CTA (foreground, always readable)
- Hero JavaScript: lightweight particle system on `<canvas>`, responsive, pauses off-screen
- Graceful degradation: static gradient background if JS disabled
- Mobile: simplified particles (fewer dots), no SVG decoration below 768px
- **Files**: `layouts/partials/hero.html`, `layouts/index.html`, `static/js/main.js`, `static/css/style.css` (hero section)

### Phase D: Page Templates & Components
- Product card: elevated white card, subtle shadow, hover lift animation, clean install block
- Blog card: minimal list or card design, clear metadata hierarchy
- Products list page: section header + responsive grid
- Blog list page: header + post list with empty state
- Single page/post: optimized reading column (max 720px), light code blocks, clear headings
- About page: value cards with consistent styling
- 404 page: on-brand, helpful navigation
- **Files**: `layouts/partials/project-card.html`, `layouts/partials/blog-card.html`, `layouts/products/list.html`, `layouts/_default/list.html`, `layouts/_default/single.html`, `layouts/404.html`, `static/css/style.css` (component sections)

### Phase E: Scroll Animations & Interactions
- IntersectionObserver-based scroll reveal (vanilla JS)
- CSS classes: `.reveal` (initial hidden state) → `.revealed` (animated in)
- Staggered animation for grid items (nth-child delay)
- Hover animations for cards, buttons, links
- Mobile nav: slide-in menu with backdrop
- Copy-to-clipboard: updated visual feedback
- **Files**: `static/js/main.js`, `static/css/style.css` (animation sections)

### Phase F: Responsive & Polish
- Mobile-first responsive refinements at 320px, 768px, 1024px, 1440px
- Touch target verification (44px minimum)
- `prefers-reduced-motion` testing — all animations disabled
- Typography fine-tuning (line length, spacing)
- Cross-browser testing matrix
- Lighthouse audit and optimization
- **Files**: `static/css/style.css` (media queries), all layout files (minor tweaks)

### Phase G: Config & Metadata Updates
- `hugo.toml`: update site description, nav labels if needed
- `layouts/partials/head.html`: meta theme-color, updated OG images
- Verify deployment pipeline works with new `static/js/main.js`
- **Files**: `hugo.toml`, `layouts/partials/head.html`

## File Change Matrix

| File | Action | Phase | Complexity |
|------|--------|-------|------------|
| `static/css/style.css` | REWRITE | A-F | High |
| `static/js/main.js` | CREATE | C, E | Medium |
| `layouts/partials/hero.html` | CREATE | C | Medium |
| `layouts/partials/nav.html` | REWRITE | B | Medium |
| `layouts/partials/footer.html` | REWRITE | B | Low |
| `layouts/partials/head.html` | MODIFY | B, G | Low |
| `layouts/partials/project-card.html` | REWRITE | D | Medium |
| `layouts/partials/blog-card.html` | REWRITE | D | Low |
| `layouts/_default/baseof.html` | MODIFY | B | Low |
| `layouts/index.html` | REWRITE | C | Medium |
| `layouts/products/list.html` | MODIFY | D | Low |
| `layouts/_default/list.html` | MODIFY | D | Low |
| `layouts/_default/single.html` | MODIFY | D | Low |
| `layouts/404.html` | MODIFY | D | Low |
| `hugo.toml` | MODIFY | G | Low |

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Hero particle canvas hurts Lighthouse score | High | Lazy-init canvas after first paint, limit particle count, use `requestAnimationFrame` with visibility check, test with Lighthouse before merging |
| System fonts look different across OS | Medium | Use font stack with fallbacks, test on macOS + Windows + Linux/Android |
| Inline JS removal breaks copy functionality | Low | Extract to `main.js` early, test clipboard API across browsers |
| Blog posts with complex markdown break new typography | Medium | Test with sample posts containing tables, code blocks, images, nested lists |
| SVG geometric decorations slow render | Low | Use simple paths, avoid filters, lazy-load below fold |

## Complexity Tracking

No constitution violations — no tracking needed.
