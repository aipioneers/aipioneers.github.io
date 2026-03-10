# Tasks: Modern Brand Redesign

**Input**: Design documents from `/specs/001-modern-brand-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story. US5 (Navigation) promoted to Phase 3 because all pages depend on it. US2 (Responsive) placed after all components are built since it's cross-cutting.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Prepare directory structure and verify tooling

- [x] T001 Create `static/js/` directory for extracted and new JavaScript
- [x] T002 Verify Hugo 0.147.0 extended is installed (`hugo version`)

**Checkpoint**: Directory structure ready for implementation

---

## Phase 2: Foundational (Design System & Base Layout)

**Purpose**: Core design tokens, reset, and base layout that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define all CSS custom properties in `static/css/style.css` — color tokens (--bg, --bg-secondary, --bg-tertiary, --fg, --fg-secondary, --fg-tertiary, --accent, --accent-hover, --border, --border-light, --code-bg, badge colors), typography tokens (--font-sans system stack, --font-mono), spacing tokens (--space-xs through --space-2xl), shadow tokens (--shadow-sm, --shadow-md, --shadow-lg), effect tokens (--nav-blur, --radius, --radius-sm, --radius-lg), animation tokens (--ease-out, --ease-spring, --duration-fast, --duration-normal, --duration-slow). Use exact values from data-model.md.
- [x] T004 Write CSS reset and base element styles in `static/css/style.css` — box-sizing border-box, margin/padding reset, smooth scroll, body (font-family var(--font-sans), background var(--bg), color var(--fg), line-height 1.6, min-height 100vh, flex column), base link styles (color var(--fg) not accent — ultra-minimal), img max-width, list styles
- [x] T005 Write base typography styles in `static/css/style.css` — h1 (clamp(2.5rem, 5vw, 3.5rem), weight 700, tracking -0.02em, color var(--fg)), h2 (clamp(2rem, 4vw, 3rem), weight 600, tracking -0.02em), h3 (1.25rem, weight 600), body text (1.0625rem, line-height 1.65), code (font-family var(--font-mono), background var(--code-bg), padding, radius-sm), pre code (block, padding, border, overflow-x auto)
- [x] T006 [P] Update `layouts/partials/head.html` — add meta theme-color (#ffffff), update viewport meta, update OG title to "Pioneers", keep existing CSS link, add `<link rel="preconnect">` hints if needed, keep hugo.Generator
- [x] T007 [P] Update `layouts/_default/baseof.html` — remove all inline JavaScript (nav toggle + copyText function), add `<script src="/js/main.js" defer></script>` before closing body tag, keep partial includes (head, nav, content block, footer), ensure body has no dark-theme classes
- [x] T008 Write base layout CSS in `static/css/style.css` — .container (max-width 1200px, margin auto, padding 0 1.5rem), .content-narrow (max-width 720px, margin auto), main flex 1, .section (padding var(--space-xl) 0), .section-title (text-align center, margin-bottom var(--space-lg)), max-width 1440px guard for ultra-wide screens
- [x] T009 Add `prefers-reduced-motion` global rule in `static/css/style.css` — `@media (prefers-reduced-motion: reduce)` that disables all transitions and animations (transition-duration: 0.01ms, animation-duration: 0.01ms, animation-iteration-count: 1, scroll-behavior: auto)

**Checkpoint**: Foundation ready — light theme renders, design tokens active, base typography visible. User story implementation can begin.

---

## Phase 3: User Story 5 - Navigation and Wayfinding (Priority: P2, promoted — all pages depend on nav)

**Goal**: Minimal, elegant sticky navigation with "Pioneers" brand mark, frosted glass effect on scroll, mobile toggle

**Independent Test**: Load any page, verify nav shows "Pioneers" brand, scrolling triggers frosted glass effect, mobile menu opens/closes smoothly

### Implementation for User Story 5

- [x] T010 [US5] Rewrite `layouts/partials/nav.html` — "Pioneers" text logo (not "AI Pioneers"), horizontal nav-links from .Site.Menus.main, active state detection using `$currentPage`, mobile hamburger toggle button (accessible, aria-label), external link indicator for GitHub. Semantic HTML: `<nav>`, `<ul>`, `<li>`, `<a>`.
- [x] T011 [US5] Write navigation CSS in `static/css/style.css` — .nav (position sticky, top 0, z-index 100, background transparent, padding 0.75rem 0, transition background+shadow var(--duration-normal)), .nav.scrolled (background rgba(255,255,255,0.8), backdrop-filter var(--nav-blur), box-shadow var(--shadow-md)), @supports fallback for no backdrop-filter, .nav-logo (font-size 1.25rem, weight 700, color var(--fg), letter-spacing -0.02em), .nav-links (flex, gap 2rem, list-style none), .nav-links a (color var(--fg-secondary), font-size 0.9rem, transition color), .nav-links a:hover and a.active (color var(--fg)), .nav-toggle (hidden on desktop, hamburger icon)
- [x] T012 [US5] Implement nav scroll behavior in `static/js/main.js` — addEventListener on scroll throttled via requestAnimationFrame, add/remove .scrolled class on nav element when window.scrollY > 10, also implement mobile nav toggle (querySelector .nav-toggle click → toggle .open class on .nav-links)

**Checkpoint**: Navigation works on all pages — "Pioneers" brand visible, frosted glass on scroll, mobile menu toggles

---

## Phase 4: User Story 1 - First Impression on Homepage (Priority: P1) MVP

**Goal**: Full-viewport hero with 4 visual layers (particles, SVGs, gradient, typography+CTA), homepage sections with modern design

**Independent Test**: Load homepage at localhost:1313, verify full-viewport hero with animated particles, geometric SVGs, gradient wash, bold "Pioneers" headline, and CTA button. Scroll to see featured products and quickstart sections.

### Implementation for User Story 1

- [x] T013 [P] [US1] Create `layouts/partials/hero.html` — full-viewport `<section class="hero">` containing: (1) `<canvas id="hero-particles">` for particle animation, (2) inline SVG decorative elements (3-4 abstract geometric shapes: thin-stroke circles, dotted grid lines, diagonal accents, positioned absolutely, opacity 0.1-0.15, class="hero-decoration"), (3) gradient overlay div (class="hero-gradient"), (4) content div with: h1 "Pioneers" large bold headline, p.tagline using .Site.Params.description, single primary CTA `<a href="/products/" class="btn btn-primary">Explore our tools</a>`. Use Hugo template syntax for dynamic content.
- [x] T014 [US1] Write hero CSS in `static/css/style.css` — .hero (position relative, min-height 100vh, display flex, align-items center, justify-content center, overflow hidden, background var(--bg)), #hero-particles (position absolute, inset 0, z-index 1), .hero-decoration (position absolute, z-index 2, opacity 0.12, animation: gentle rotate/float 20-30s infinite linear), .hero-gradient (position absolute, inset 0, z-index 3, background: radial-gradient(ellipse at 50% 50%, rgba(0,113,227,0.03) 0%, transparent 70%)), .hero-content (position relative, z-index 4, text-align center, max-width 800px, padding var(--space-2xl) var(--space-md)), .hero h1 (font-size clamp(3rem,8vw,5.5rem), weight 700, tracking -0.03em, color var(--fg), margin-bottom var(--space-sm)), .hero .tagline (font-size clamp(1.1rem,2vw,1.35rem), color var(--fg-secondary), max-width 600px, margin auto auto var(--space-lg)), .btn-primary (display inline-block, padding 0.75rem 2rem, background var(--fg), color var(--bg), border-radius var(--radius), font-weight 600, transition all var(--duration-fast) var(--ease-out)), .btn-primary:hover (background var(--accent), transform translateY(-1px))
- [x] T015 [US1] Implement canvas particle system in `static/js/main.js` — class or IIFE that: gets canvas by id "hero-particles", sets size to parent dimensions, creates particle array (100 on desktop, 40 on mobile via window.innerWidth check), each particle has x/y/vx/vy/radius/opacity, draws dots with context.arc and fill rgba(0,0,0,0.06), animates via requestAnimationFrame, pauses when document is hidden (visibilitychange event), resizes on window resize (debounced), respects prefers-reduced-motion (skip animation, show static frame), caps devicePixelRatio at 2
- [x] T016 [US1] Rewrite `layouts/index.html` — `{{ define "main" }}`: (1) `{{ partial "hero.html" . }}`, (2) `<section class="section">` with featured products: section-title h2 "Our Tools" + p, .project-grid iterating .Site.Data.projects with featured filter using project-card partial, add class="reveal" on grid items, (3) `<section class="section bg-secondary">` with quickstart: centered box, h3, p, .code-block with onclick copy. Remove old hero markup entirely.
- [x] T017 [US1] Write homepage sections CSS in `static/css/style.css` — .bg-secondary (background var(--bg-secondary)), .project-grid (display grid, grid-template-columns repeat(auto-fill, minmax(340px, 1fr)), gap var(--space-md)), .quickstart (background var(--bg-tertiary), border-radius var(--radius-lg), padding var(--space-lg), max-width 600px, margin auto, text-align center), .code-block (background var(--bg), border 1px solid var(--border-light), border-radius var(--radius-sm), padding 0.8rem 1.25rem, font-family var(--font-mono), cursor pointer, transition border-color), .code-block:hover (border-color var(--accent)), .code-block.copied::after (content 'copied!', color var(--green))

**Checkpoint**: Homepage fully functional — hero with all 4 layers renders, particles animate, featured products display, quickstart works. This is the MVP.

---

## Phase 5: User Story 3 - Browsing Products (Priority: P2)

**Goal**: Elegant product cards with hover lift, clean install block, graceful missing-data handling

**Independent Test**: Navigate to /products/, verify cards display with name, badge, tagline, tags, install command, and links. Hover over card to see elevation animation. Test with a product missing install/url fields.

### Implementation for User Story 3

- [x] T018 [P] [US3] Rewrite `layouts/partials/project-card.html` — `<article class="project-card reveal">`: .project-card-header (h3.project-card-name with .name, span.badge with .status conditional classes), p.project-card-tagline with .tagline, .project-card-meta (range .language/.category → span.tag), conditional install block `{{ with .install }}` div.project-card-install with onclick="copyText(this, '{{ . }}')", .project-card-links with conditional `{{ with .url }}` and `{{ with .github }}` links. Omit sections entirely when data is missing.
- [x] T019 [US3] Write product card CSS in `static/css/style.css` — .project-card (background var(--bg), border 1px solid var(--border-light), border-radius var(--radius), padding var(--space-md), transition transform+shadow var(--duration-fast) var(--ease-out), box-shadow var(--shadow-sm)), .project-card:hover (transform translateY(-2px), box-shadow var(--shadow-md)), .project-card-header (flex, align-items center, gap 0.75rem, margin-bottom var(--space-sm)), .project-card-name (font-size 1.1rem, weight 600, color var(--fg)), .badge (inline-block, padding 0.15rem 0.5rem, radius-sm, font-size 0.7rem, weight 600, uppercase, tracking 0.05em), .badge-active (background rgba(45,164,78,0.1), color var(--green)), .badge-beta (background rgba(191,135,0,0.1), color var(--yellow)), .badge-planned (background rgba(0,113,227,0.1), color var(--blue)), .badge-archived (background rgba(110,110,115,0.1), color var(--gray)), .project-card-tagline (color var(--fg-secondary), font-size 0.9rem, margin-bottom var(--space-sm)), .tag (inline-block, padding 0.15rem 0.5rem, background var(--bg-tertiary), border-radius radius-sm, font-size 0.75rem, color var(--fg-tertiary)), .project-card-install (background var(--bg-tertiary), border 1px solid var(--border-light), radius-sm, padding 0.6rem 1rem, font-family var(--font-mono), font-size 0.85rem, cursor pointer, position relative), .project-card-links (flex, gap 1rem, margin-top var(--space-sm), a font-size 0.85rem color var(--accent))
- [x] T020 [US3] Update `layouts/products/list.html` — page-header with .Title and .Content, .project-grid iterating ALL site.Data.projects (not just featured), each using project-card partial, add class="reveal" wrapper or direct on cards, maintain sort_order via Hugo sort
- [x] T021 [US3] Write products page CSS in `static/css/style.css` — .page-header (padding var(--space-xl) 0 var(--space-lg), text-align center, border-bottom 1px solid var(--border-light), margin-bottom var(--space-lg)), .page-header p (color var(--fg-secondary), max-width 600px, margin var(--space-sm) auto 0)

**Checkpoint**: Products page renders with elevated cards, hover animations work, install copy works, missing fields handled gracefully

---

## Phase 6: User Story 4 - Reading Blog Content (Priority: P2)

**Goal**: Clean, distraction-free reading experience with optimal typography, light code blocks, clear hierarchy

**Independent Test**: Create a sample blog post with headings, paragraphs, code blocks, and lists. Verify reading column width (50-75 chars/line), line height, code block styling, and metadata display on both list and single views.

### Implementation for User Story 4

- [x] T022 [P] [US4] Rewrite `layouts/partials/blog-card.html` — `<article class="blog-item reveal">`: h3 with linked title (.Title), .blog-meta (time with .Date.Format "January 2, 2006" + {{ with .Params.author }} author), p.blog-excerpt with .Description or .Summary truncated, .blog-tags with range .Params.tags → span.tag
- [x] T023 [P] [US4] Write blog card/list CSS in `static/css/style.css` — .blog-list (list-style none, padding 0), .blog-item (padding var(--space-md) 0, border-bottom 1px solid var(--border-light)), .blog-item:last-child (border-bottom none), .blog-item h3 (margin-bottom var(--space-xs)), .blog-item h3 a (color var(--fg), transition color), .blog-item h3 a:hover (color var(--accent)), .blog-meta (font-size 0.85rem, color var(--fg-tertiary), margin-bottom var(--space-xs)), .blog-excerpt (font-size 0.95rem, color var(--fg-secondary)), .blog-tags (flex, gap var(--space-xs), margin-top var(--space-xs))
- [x] T024 [US4] Update `layouts/_default/list.html` — page-header with .Title, content-narrow wrapper, check if .Pages exists: if yes, iterate pages sorted by date desc using blog-card partial; if no, show .empty-state "No posts yet."
- [x] T025 [US4] Update `layouts/_default/single.html` — content-narrow wrapper, conditional: if blog section (.Section eq "blog") render .post-header (h1, .post-meta with date + author + tags), .post-content with .Content, .post-footer with back link; else render .page-content with h1 and .Content. Add class="reveal" to content sections.
- [x] T026 [US4] Write blog post typography CSS in `static/css/style.css` — .post-header h1 (font-size clamp(2rem,4vw,2.75rem), margin-bottom var(--space-xs)), .post-meta (color var(--fg-tertiary), font-size 0.9rem, margin-bottom var(--space-lg)), .post-content (line-height 1.8, font-size 1.0625rem), .post-content h2 (margin-top var(--space-lg), margin-bottom var(--space-sm), font-size 1.5rem), .post-content h3 (margin-top var(--space-md), font-size 1.25rem), .post-content blockquote (border-left 3px solid var(--border), padding-left var(--space-md), color var(--fg-secondary), margin var(--space-md) 0), .post-content pre code (background var(--bg-tertiary), border 1px solid var(--border-light), border-radius var(--radius-sm), padding var(--space-md), font-size 0.9rem, display block, overflow-x auto), .post-content code (background var(--bg-tertiary), padding 0.15rem 0.4rem, radius 3px, font-size 0.9em, border 1px solid var(--border-light)), .post-footer (margin-top var(--space-xl), padding-top var(--space-md), border-top 1px solid var(--border-light)), .empty-state (text-align center, padding var(--space-xl), color var(--fg-tertiary))

**Checkpoint**: Blog list page shows posts (or empty state), individual blog posts render with optimal typography and code blocks

---

## Phase 7: User Story 6 - Brand Consistency Across All Pages (Priority: P3)

**Goal**: Footer, About page, and 404 page all use the same design system — consistent colors, typography, spacing, animations

**Independent Test**: Visit About page, 404 page, and footer on any page. Verify they match the brand identity (light theme, black primary, sparse accent, consistent cards/spacing).

### Implementation for User Story 6

- [x] T027 [P] [US6] Rewrite `layouts/partials/footer.html` — `<footer class="footer">`: .container with .footer-grid (3 columns): col 1 "AI Pioneers" (full name) + .Site.Params.description + social links from .Site.Data.social, col 2 "Quick Links" with Products/About/Blog links, col 3 "Connect" with GitHub + PyPI from social.yaml. .footer-bottom with copyright `{{ now.Year }}` and "AI Pioneers".
- [x] T028 [P] [US6] Write footer CSS in `static/css/style.css` — .footer (border-top 1px solid var(--border-light), padding var(--space-xl) 0 var(--space-lg), margin-top auto, background var(--bg-secondary)), .footer-grid (display grid, grid-template-columns 2fr 1fr 1fr, gap var(--space-lg)), .footer h4 (font-size 0.85rem, text-transform uppercase, letter-spacing 0.05em, color var(--fg), margin-bottom var(--space-sm)), .footer p (color var(--fg-secondary), font-size 0.9rem), .footer-links (list-style none, padding 0), .footer-links a (color var(--fg-secondary), font-size 0.9rem, transition color), .footer-links a:hover (color var(--fg)), .footer-bottom (text-align center, padding-top var(--space-md), border-top 1px solid var(--border-light), color var(--fg-tertiary), font-size 0.85rem, margin-top var(--space-lg))
- [x] T029 [P] [US6] Update `layouts/404.html` — on-brand 404 page: baseof layout, .not-found section with centered content, h1 "404" (large, color var(--fg)), p "Page not found" (var(--fg-secondary)), `<a href="/" class="btn btn-primary">Back to home</a>`
- [x] T030 [US6] Write 404 and about-page CSS in `static/css/style.css` — .not-found (text-align center, padding var(--space-2xl) var(--space-md)), .not-found h1 (font-size 6rem, weight 700, color var(--fg), margin-bottom var(--space-xs)), .not-found p (color var(--fg-secondary), margin-bottom var(--space-lg)), .values-grid (display grid, grid-template-columns repeat(auto-fill, minmax(280px, 1fr)), gap var(--space-md), margin var(--space-lg) 0), .value-card (background var(--bg-tertiary), border 1px solid var(--border-light), border-radius var(--radius), padding var(--space-md), transition transform+shadow var(--duration-fast)), .value-card:hover (transform translateY(-2px), box-shadow var(--shadow-sm)), .value-card h3 (font-size 1rem, margin-bottom var(--space-xs)), .value-card p (color var(--fg-secondary), font-size 0.9rem, margin-bottom 0)

**Checkpoint**: All pages (homepage, products, blog, about, 404) share consistent visual language — footer, cards, typography, colors are cohesive

---

## Phase 8: User Story 2 - Responsive Mobile Experience (Priority: P1)

**Goal**: Fluid responsive layouts across all breakpoints, elegant mobile nav, touch-friendly targets, performant animations on mobile

**Independent Test**: Open site in DevTools responsive mode at 320px, 375px, 768px, 1024px, 1440px. Verify: single-column mobile layout, mobile nav opens/closes smoothly, touch targets >= 44px, hero particles reduced on mobile, no horizontal overflow.

### Implementation for User Story 2

- [x] T031 [US2] Write mobile nav CSS and slide-in menu styles in `static/css/style.css` — @media (max-width: 768px): .nav-links (display none, position fixed, top 0, right 0, height 100vh, width 280px, background var(--bg), flex-direction column, padding var(--space-xl) var(--space-md), gap var(--space-sm), box-shadow var(--shadow-lg), transform translateX(100%), transition transform var(--duration-normal) var(--ease-out)), .nav-links.open (display flex, transform translateX(0)), .nav-backdrop (position fixed, inset 0, background rgba(0,0,0,0.3), z-index 99, opacity 0, transition opacity), .nav-backdrop.visible (opacity 1), .nav-toggle (display block, min-width 44px, min-height 44px), .nav-links a (font-size 1.1rem, padding var(--space-xs) 0, min-height 44px, display flex, align-items center)
- [x] T032 [US2] Write responsive CSS for all breakpoints in `static/css/style.css` — @media (max-width: 768px): .hero h1 (font-size clamp(2.5rem,7vw,3.5rem)), .hero .tagline (font-size 1rem), .project-grid (grid-template-columns 1fr), .footer-grid (grid-template-columns 1fr), .values-grid (grid-template-columns 1fr), .hero-decoration (display none), .section (padding var(--space-lg) 0), .hero (min-height 90vh); @media (max-width: 480px): h1 (font-size 1.8rem), .container (padding 0 var(--space-sm)), .content-narrow (padding 0 var(--space-sm)); @media (min-width: 1440px): .container (max-width 1200px, centered)
- [x] T033 [US2] Implement mobile nav backdrop and close behavior in `static/js/main.js` — create backdrop div on toggle open, close nav on backdrop click, close nav on Escape key, trap focus within open nav for accessibility, prevent body scroll when nav is open (overflow hidden on body)
- [x] T034 [US2] Add hero mobile optimizations in `static/js/main.js` and `static/css/style.css` — in particle init: check window.innerWidth, if < 768 set particle count to 40 (vs 100 desktop), if < 480 set to 20; in CSS: hide .hero-decoration below 768px, simplify hero gradient on mobile, reduce hero min-height to 80vh on mobile

**Checkpoint**: Site is fully responsive — mobile nav slides in/out, all grids collapse to single column, hero is optimized for mobile, touch targets verified

---

## Phase 9: Scroll Animations & Interactions

**Purpose**: Enhancement layer — scroll reveal, hover effects, copy-to-clipboard feedback

- [x] T035 Implement IntersectionObserver scroll reveal in `static/js/main.js` — select all `.reveal` elements, create observer with threshold 0.1 and rootMargin "0px 0px -50px 0px", on intersect add `.revealed` class and unobserve, check prefers-reduced-motion first (if reduced: add .revealed to all immediately, skip observer)
- [x] T036 Write scroll reveal CSS in `static/css/style.css` — .reveal (opacity 0, transform translateY(30px), transition opacity var(--duration-slow) var(--ease-out) and transform var(--duration-slow) var(--ease-out)), .revealed (opacity 1, transform translateY(0)), staggered delays: .reveal:nth-child(2) (transition-delay 100ms), .reveal:nth-child(3) (transition-delay 200ms), .reveal:nth-child(4) (transition-delay 300ms), up to nth-child(6). prefers-reduced-motion override: .reveal (opacity 1, transform none, transition none)
- [x] T037 Write hover/focus interaction CSS in `static/css/style.css` — .btn (transition all var(--duration-fast) var(--ease-out)), .btn:focus-visible (outline 2px solid var(--accent), outline-offset 2px), a:focus-visible (outline 2px solid var(--accent), outline-offset 2px, border-radius 2px), .btn-secondary (background transparent, color var(--fg), border 1px solid var(--border), border-radius var(--radius), padding 0.6rem 1.5rem, weight 600), .btn-secondary:hover (border-color var(--fg), color var(--fg))
- [x] T038 Implement copy-to-clipboard function in `static/js/main.js` — global copyText(el, text) function: navigator.clipboard.writeText(text), add .copied class to el, setTimeout remove .copied after 2000ms, handle clipboard API failure gracefully (fallback to document.execCommand)

**Checkpoint**: Scroll animations fire on all .reveal elements, hover effects work on cards/buttons, copy-to-clipboard provides visual feedback

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements, config updates, and validation

- [x] T039 [P] Update `hugo.toml` — verify site title, update description if needed, ensure menu labels are correct, verify syntax highlighting style works with light theme (consider "github" or "monokailight" instead of "monokai")
- [x] T040 [P] Final `prefers-reduced-motion` audit in `static/css/style.css` — verify ALL animation/transition declarations have reduced-motion overrides, verify particle canvas skips animation, verify hero decorations don't animate, verify scroll reveal elements show immediately
- [x] T041 Verify production build by running `hugo --minify` — check that public/ contains all expected files (index.html, css/style.css, js/main.js, products/, about/, blog/), verify no build errors or warnings
- [x] T042 Visual smoke test with `hugo server -D` — visit all pages (homepage, /products/, /about/, /blog/, a 404 URL), verify consistent branding, no broken layouts, all interactive elements work (nav, copy, scroll animations)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US5 Navigation (Phase 3)**: Depends on Foundational — all pages need nav
- **US1 Homepage (Phase 4)**: Depends on Foundational + US5 nav — the MVP
- **US3 Products (Phase 5)**: Depends on Foundational + US5 nav — can run parallel with US4
- **US4 Blog (Phase 6)**: Depends on Foundational + US5 nav — can run parallel with US3
- **US6 Consistency (Phase 7)**: Depends on Foundational + US5 nav — can run parallel with US3/US4
- **US2 Responsive (Phase 8)**: Depends on ALL component phases (3-7) — applies responsive CSS to all built components
- **Animations (Phase 9)**: Depends on ALL component phases (3-7) — applies scroll/hover to all components
- **Polish (Phase 10)**: Depends on all previous phases

### User Story Dependencies

```
Setup (Phase 1)
  └── Foundational (Phase 2)
        └── US5 Navigation (Phase 3)
              ├── US1 Homepage (Phase 4) ← MVP STOP POINT
              ├── US3 Products (Phase 5) ─┐
              ├── US4 Blog (Phase 6) ─────┤ (can run in parallel)
              └── US6 Consistency (Phase 7)┘
                    └── US2 Responsive (Phase 8)
                          └── Animations (Phase 9)
                                └── Polish (Phase 10)
```

### Within Each User Story

- Template (HTML) tasks marked [P] can run parallel with CSS tasks
- CSS tasks within the same file are sequential (style.css sections)
- JS tasks depend on HTML providing the correct DOM selectors

### Parallel Opportunities

- **Phase 2**: T006 and T007 are parallel (different files: head.html, baseof.html)
- **Phase 4**: T013 [P] runs parallel with T014 (hero.html vs style.css)
- **Phase 5**: T018 [P] runs parallel with T019 (project-card.html vs style.css)
- **Phase 6**: T022 [P] and T023 [P] run parallel (blog-card.html vs style.css)
- **Phase 7**: T027, T028, T029 all run parallel (different files: footer.html, style.css, 404.html)
- **Phases 5, 6, 7**: Can run in parallel with each other (independent pages)

---

## Parallel Example: User Story 1 (Homepage)

```bash
# Step 1: Create hero template and hero CSS in parallel (different files)
Task: "Create hero.html partial with 4 visual layers in layouts/partials/hero.html"
Task: "Write hero CSS in static/css/style.css"

# Step 2: After hero template exists, implement JS (needs canvas element from T013)
Task: "Implement particle system in static/js/main.js"

# Step 3: Wire everything together
Task: "Rewrite index.html to use hero partial"
Task: "Write homepage sections CSS"
```

## Parallel Example: Products + Blog + Consistency (Phases 5-7)

```bash
# These three user stories can be worked in parallel after nav is done:
Task: "US3 — Rewrite product card + products page"
Task: "US4 — Rewrite blog card + blog/single pages"
Task: "US6 — Rewrite footer + 404 + about styling"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (design tokens, reset, base layout)
3. Complete Phase 3: US5 Navigation (needed for any page to look right)
4. Complete Phase 4: US1 Homepage (hero + featured products + quickstart)
5. **STOP and VALIDATE**: Load homepage — hero renders with all 4 layers, particles animate, nav has frosted glass, featured products show in grid, quickstart copy works
6. Deploy/demo if ready — homepage alone delivers the brand impact

### Incremental Delivery

1. Setup + Foundational + Navigation → Skeleton ready
2. Add US1 Homepage → **MVP! Deploy/Demo** — brand impression established
3. Add US3 Products → Products page polished → Deploy
4. Add US4 Blog → Blog experience refined → Deploy
5. Add US6 Consistency → All pages cohesive → Deploy
6. Add US2 Responsive → Mobile experience perfected → Deploy
7. Add Animations → Polish layer → Deploy
8. Polish + Verify → Production ready

### Single Developer Strategy

Work sequentially in priority order:
1. Phases 1-4 (Setup → Foundation → Nav → Homepage) = MVP
2. Phase 5 (Products) → Phase 6 (Blog) → Phase 7 (Consistency)
3. Phase 8 (Responsive) → Phase 9 (Animations) → Phase 10 (Polish)

Each phase builds on the previous, commit after each.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks in same phase
- [Story] label maps task to specific user story for traceability
- All CSS tasks target `static/css/style.css` — append to appropriate section, do not overwrite previous sections
- All JS tasks target `static/js/main.js` — single file with modular functions
- Hugo template syntax: use `{{ }}` for Go templates, `{{ partial "name.html" . }}` for includes
- Design token values: reference `data-model.md` for exact hex codes, font stacks, and spacing values
- Commit after each task or logical group of tasks within a phase
