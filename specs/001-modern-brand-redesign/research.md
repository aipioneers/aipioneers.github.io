# Research: Modern Brand Redesign

**Branch**: `001-modern-brand-redesign` | **Date**: 2026-03-10

## Research Tasks & Findings

### R1: Lightweight Particle Animation for Hero Background

**Decision**: Use a custom vanilla JS canvas particle system — no library.

**Rationale**: The hero requires an animated particle/dot background. Three options were evaluated:
1. **particles.js / tsParticles** — Popular but 40-80KB minified, adds a dependency, and is overkill for simple dot animation. Violates the "no JS frameworks" constraint.
2. **CSS-only animation** — Limited to a small number of animated elements. Cannot create the organic, flowing feel of hundreds of particles without severe performance issues from DOM elements.
3. **Custom canvas particle system** — ~100-150 lines of JS. Full control over particle count, behavior, and performance. Can be tuned for mobile (fewer particles) and paused when off-screen. Zero dependencies.

**Alternatives considered**: Three.js (far too heavy), Lottie (requires pre-made animations), CSS `@keyframes` with pseudo-elements (limited to ~20 elements before jank).

---

### R2: Scroll Reveal Animation Approach

**Decision**: Use `IntersectionObserver` API with CSS transitions — no library.

**Rationale**:
1. **AOS (Animate On Scroll)** — 14KB, adds CSS + JS dependency, heavy for what we need.
2. **GSAP ScrollTrigger** — Powerful but 25KB+, commercial licensing concerns, overkill.
3. **Native IntersectionObserver + CSS** — Zero bytes of library code. Browser support is universal (97%+). CSS handles the animation, JS only toggles a class. ~30 lines of JS.

**Implementation pattern**:
```
// Elements start with .reveal class (opacity: 0, translateY: 30px)
// IntersectionObserver adds .revealed class when in viewport
// CSS transition handles the animation
// prefers-reduced-motion: .reveal { opacity: 1; transform: none; }
```

**Alternatives considered**: Scroll-driven animations CSS spec (too new, ~60% browser support as of 2026), `scroll` event listener (poor performance, no throttle built-in).

---

### R3: Frosted Glass Navigation Best Practices

**Decision**: Use `backdrop-filter: blur()` with semi-transparent background, toggled on scroll via JS.

**Rationale**: The "frosted glass" effect (like Apple's navbar) requires:
- `background: rgba(255, 255, 255, 0.8)` (or higher for readability)
- `backdrop-filter: saturate(180%) blur(20px)`
- Browser support: 95%+ (all modern browsers). Firefox requires no prefix since FF103+.
- Fallback: solid white background for the ~5% without support — achieved via `@supports not (backdrop-filter: blur(1px))`.

**Scroll behavior**: A `scroll` event listener (throttled via `requestAnimationFrame`) adds a `.scrolled` class to the nav when `scrollY > 10px`. This triggers the blur + shadow.

**Alternatives considered**: Solid background with shadow only (functional but not premium), JS-based blur (too expensive), position: fixed with no visual change (no scroll awareness).

---

### R4: Typography — System Fonts vs. Web Fonts

**Decision**: Use system font stack with SF Pro Display prioritized.

**Rationale**: The spec requires fonts that load in <100ms (FR-013) to avoid layout shift. System fonts load in 0ms — they're already on the device.

**Font stack**:
```
-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Helvetica, Arial, sans-serif
```

- **macOS/iOS**: SF Pro Display (Apple's actual font)
- **Windows**: Segoe UI (Microsoft's system font)
- **Linux/Android**: System default → Helvetica → Arial

This matches the Apple-style aesthetic directly on Apple devices and provides clean fallbacks elsewhere. No font files to download, zero layout shift, zero FOUT.

**Alternatives considered**: Inter (excellent but 90KB+ variable font, adds 50-100ms load), Helvetica Neue (not available on Windows), Google Fonts (network dependency, privacy concerns, CLS risk).

---

### R5: Hugo Pipes vs. Static Directory for Assets

**Decision**: Keep assets in `static/` — do not migrate to Hugo Pipes.

**Rationale**: Hugo Pipes (`assets/` directory) provides fingerprinting, minification, and SCSS compilation. However:
1. The project uses a single CSS file and a single JS file — no SCSS, no bundling needed.
2. Hugo's built-in minification via `hugo --minify` already minifies CSS and JS in the `static/` directory.
3. GitHub Actions deployment already runs `hugo --minify`.
4. Migrating to Hugo Pipes would change the template syntax (`{{ $style := resources.Get ... }}`) for minimal benefit.
5. Asset fingerprinting could be added later if caching issues arise.

**Alternatives considered**: Full Hugo Pipes migration (unnecessary complexity for 2 files), external build tool like esbuild (adds dependency, violates simplicity principle).

---

### R6: SVG Geometric Decoration Strategy

**Decision**: Inline SVG in the hero partial — lightweight abstract shapes (circles, lines, grids).

**Rationale**: The hero needs abstract geometric visual elements. Options:
1. **Inline SVG in template** — Zero network requests, can be styled with CSS, animatable, small footprint (~1-3KB). Positioning via CSS absolute.
2. **External SVG files** — Adds HTTP requests, harder to animate with CSS.
3. **CSS-generated shapes** — Limited to simple shapes, no complex geometry.
4. **Raster images (PNG/WebP)** — Heavy, not scalable, can't animate.

**Design approach**: 3-4 subtle geometric shapes (thin-stroke circles, dotted grid, diagonal lines) positioned absolutely behind the hero text. Low opacity (0.1-0.2) so they don't compete with typography. Animate with slow CSS transforms (rotate, scale) for gentle movement. Hidden on mobile (<768px) to save render cost.

**Alternatives considered**: Lottie animations (adds 50KB+ library), CSS `conic-gradient` patterns (limited), WebGL (overkill).

---

### R7: Color Accent Strategy for Ultra-Minimal Design

**Decision**: Use blue (#0071e3) as the single sparse accent, applied only to primary CTAs and key interactive links.

**Rationale**: The clarified direction is "neutral with black primary, subtle color accent only." To avoid a completely monochrome site (which can feel lifeless), a single accent color provides:
- Visual hierarchy for CTAs (the one thing you want users to click)
- Link discoverability (accessibility requirement — links must be distinguishable from text)
- Brand recognition (a consistent accent becomes memorable)

Apple uses blue sparingly in exactly this way. The accent appears on:
- Primary CTA button fills
- Inline text links (on hover or always, for accessibility)
- Active/selected navigation states
- Status badges (using the accent + opacity variants)

Everything else (headings, body, cards, borders) remains in the black/gray/white range.

**Alternatives considered**: No accent at all (accessibility concern — links must be visually distinct per WCAG), multiple accent colors (breaks ultra-minimal direction), gradient accents (too flashy for the aesthetic).

---

### R8: Performance Budget for Hero with All Visual Layers

**Decision**: Target <100KB total hero JS + CSS, lazy-initialize canvas after first contentful paint.

**Rationale**: The hero combines 4 visual layers (particles, SVGs, gradients, typography). Performance risk analysis:
- **Typography + CTA**: ~0KB extra (already in HTML)
- **CSS gradient wash**: ~0.5KB CSS, zero JS, GPU-composited
- **Inline SVG shapes**: ~2-3KB HTML, animatable via CSS transforms (GPU-composited)
- **Canvas particles**: ~4-5KB JS (minified), canvas rendering is efficient for hundreds of dots

**Total hero overhead**: ~7-8KB. Well within budget.

**Performance mitigations**:
1. Defer `main.js` with `defer` attribute — doesn't block first paint
2. Init particles only after `DOMContentLoaded`
3. Use `requestAnimationFrame` — pauses when tab is hidden
4. On mobile: reduce particle count from ~100 to ~40
5. `prefers-reduced-motion`: skip canvas animation entirely, show static gradient
6. Canvas renders at device pixel ratio capped at 2x to avoid 3x Retina overhead

**Alternatives considered**: Server-side pre-rendering of particle frame as image (static feel), WebGL (heavier initialization), CSS-only particles via `box-shadow` hack (limited and janky).
