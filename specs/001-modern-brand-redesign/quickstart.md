# Quickstart: Modern Brand Redesign

**Branch**: `001-modern-brand-redesign` | **Date**: 2026-03-10

## Prerequisites

- Hugo 0.147.0 extended (`hugo version` to verify)
- Git (on branch `001-modern-brand-redesign`)
- Modern browser with DevTools (Chrome recommended for Lighthouse)

## Development Workflow

### 1. Start Development Server

```bash
cd /Users/tobiasoberrauch/Repositories/aipioneers/aipioneers.github.io
git checkout 001-modern-brand-redesign
hugo server -D
```

Open `http://localhost:1313` — Hugo live-reloads on file changes.

### 2. Key Files to Edit

| File | What It Does |
|------|-------------|
| `static/css/style.css` | All visual styling — edit here first |
| `static/js/main.js` | Particle animation, scroll reveal, nav behavior |
| `layouts/partials/hero.html` | Homepage hero section (new file) |
| `layouts/partials/nav.html` | Navigation bar |
| `layouts/partials/footer.html` | Footer |
| `layouts/partials/project-card.html` | Product card component |
| `layouts/index.html` | Homepage layout |

### 3. Test Checklist

```bash
# Build production version
hugo --minify

# Run Lighthouse (requires Chrome and lighthouse CLI)
npx lighthouse http://localhost:1313 --output html --output-path ./lighthouse-report.html

# Check responsive at key breakpoints
# DevTools → Toggle Device Toolbar → 320px, 768px, 1024px, 1440px

# Test reduced motion
# DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce

# Test no JS
# DevTools → Settings → Debugger → Disable JavaScript
```

### 4. Design Token Reference

When implementing, use CSS custom properties consistently:

```css
/* Colors */
background: var(--bg);          /* #ffffff */
color: var(--fg);               /* #1d1d1f */
color: var(--fg-secondary);     /* #6e6e73 */
color: var(--accent);           /* #0071e3 — use sparingly */

/* Spacing */
padding: var(--space-md);       /* 1.5rem */
gap: var(--space-lg);           /* 3rem */
margin-bottom: var(--space-xl); /* 5rem */

/* Effects */
border-radius: var(--radius);   /* 12px */
box-shadow: var(--shadow-sm);   /* subtle resting shadow */
backdrop-filter: var(--nav-blur); /* frosted glass */

/* Animation */
transition: all var(--duration-fast) var(--ease-out);
```

### 5. Production Build & Deploy

```bash
# Build
hugo --minify

# Verify output
ls -la public/
# Should contain: index.html, css/, js/, products/, about/, blog/

# Commit and push (deploys automatically via GitHub Actions)
git add -A
git commit -m "Redesign: modern light brand"
git push origin 001-modern-brand-redesign
```

## Common Patterns

### Adding Scroll Reveal to an Element

```html
<div class="reveal">Content that animates in on scroll</div>
```

The `main.js` IntersectionObserver automatically detects `.reveal` elements and adds `.revealed` when visible.

### Staggered Grid Animation

```html
<div class="project-grid">
  <div class="reveal">Card 1</div>  <!-- animates first -->
  <div class="reveal">Card 2</div>  <!-- animates 100ms later -->
  <div class="reveal">Card 3</div>  <!-- animates 200ms later -->
</div>
```

CSS handles stagger via `transition-delay` on `.reveal:nth-child(n)`.

### Responsive Images (Future)

If product images are added later:

```html
<img src="{{ .image }}" alt="{{ .name }}" loading="lazy" decoding="async">
```

Always use `loading="lazy"` for below-fold images.
