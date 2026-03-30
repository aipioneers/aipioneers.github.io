# AI Pioneers — Brand Guide

## Brand Identity

**Name**: AI Pioneers
**Short form**: Pioneers
**URL**: pioneers.ai
**GitHub**: github.com/aipioneers

**Mission**: We build open-source tools that help developers harness the power of AI in their daily work. The best developer tools are transparent, fast, and work offline — no cloud lock-in, no data leaving your machine.

**Tagline**: Open-source AI developer tools

**Elevator pitch**: Building open-source tools that help developers work with AI.

---

## Core Values

| Value | Meaning |
|-------|---------|
| **Open Source First** | Every tool is open source. Transparency builds trust. |
| **Local & Private** | Code stays on your machine. Tools work offline with local AI models. |
| **Developer Experience** | Tools should be fast, intuitive, and get out of your way. |
| **Community Driven** | Build what developers need. Contributions and feedback welcome. |

---

## Logo

The logo is a wordmark: **Pioneers** set in the system sans-serif font stack at 700 weight with tight letter-spacing (-0.03em). No icon, no symbol — the name is the mark.

**Usage rules**:
- Always display "Pioneers" in the primary text color or white on dark backgrounds
- Minimum size: 16px
- Maintain breathing room: at least 1em clear space on all sides
- Never stretch, rotate, or add effects to the wordmark

**Text rendering**:
```
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif
font-weight: 700
font-size: 1.3rem (navigation), clamp(3.5rem, 10vw, 7rem) (hero)
letter-spacing: -0.03em
```

---

## Color Palette

### Primary

| Name | Hex | Usage |
|------|-----|-------|
| **Accent Blue** | `#0071e3` | Primary CTA, links, interactive elements |
| **Accent Hover** | `#0077ed` | Hover state for accent blue |

### Foreground

| Name | Hex | Usage |
|------|-----|-------|
| **Primary** | `#1d1d1f` | Headings, body text, wordmark |
| **Secondary** | `#6e6e73` | Descriptions, subtitles, meta text |
| **Tertiary** | `#86868b` | Timestamps, labels, muted text |

### Background

| Name | Hex | Usage |
|------|-----|-------|
| **White** | `#ffffff` | Page background, cards |
| **Secondary** | `#fafafa` | Alternating sections |
| **Tertiary** | `#f5f5f7` | Code blocks, badges, inputs |

### Semantic

| Name | Hex | Usage |
|------|-----|-------|
| **Green** | `#2da44e` | Active status, success, checkmarks |
| **Yellow** | `#bf8700` | Beta status, warnings |
| **Border** | `#d2d2d7` | Card borders, dividers |
| **Border Light** | `#e8e8ed` | Subtle separators, table rows |

### Color rules
- Use accent blue sparingly — only for primary actions and interactive elements
- Never use accent blue for large background areas
- Text on white backgrounds must meet WCAG AA contrast (4.5:1 minimum)
- Avoid introducing new colors; the palette is intentionally restrained

---

## Typography

### Font Stacks

**Sans-serif** (all UI text):
```
-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif
```

**Monospace** (code, terminal, technical):
```
"SF Mono", "Fira Code", "Cascadia Code", "Consolas", monospace
```

### Type Scale

| Element | Size | Weight | Letter-spacing | Line-height |
|---------|------|--------|----------------|-------------|
| Hero title | clamp(3.5rem, 10vw, 7rem) | 700 | -0.04em | 1.0 |
| H1 | clamp(2.5rem, 5vw, 3.5rem) | 700 | -0.025em | 1.15 |
| H2 | clamp(2rem, 4vw, 3rem) | 600 | -0.02em | 1.15 |
| H3 | 1.25rem | 600 | — | 1.15 |
| H4 | 1rem | 600 | — | 1.15 |
| Body | 1rem | 400 | — | 1.6 |
| Blog content | 1.0625rem | 400 | — | 1.8 |
| Small / meta | 0.85rem | 400 | — | 1.6 |
| Code inline | 0.9em | 400 | — | — |

### Typography rules
- Headings use negative letter-spacing for a tight, modern feel
- Body text is set at 1.6 line-height for readability
- Blog posts use 1.8 line-height for comfortable long-form reading
- Never use more than two weight levels in a single component (e.g. 600 + 400)
- Monospace is reserved for code — never use it for UI labels or headings

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 0.5rem (8px) | Tight gaps, badge padding |
| `sm` | 1rem (16px) | Standard element spacing |
| `md` | 1.5rem (24px) | Component padding, grid gaps |
| `lg` | 3rem (48px) | Section inner spacing |
| `xl` | 6rem (96px) | Section padding |
| `2xl` | 10rem (160px) | Hero padding |

**Layout constraints**:
- Max content width: 1200px
- Narrow content (blog): 720px
- Always center content with auto margins

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 10px | Code blocks, inputs, small cards |
| Default | 16px | Cards, modals |
| `lg` | 24px | Featured cards, sections |
| Pill | 980px | Buttons, badges, tags |

---

## Shadows

| Level | Value | Usage |
|-------|-------|-------|
| `sm` | 0 1px 3px rgba(0,0,0,0.06) | Cards at rest |
| `md` | 0 4px 16px rgba(0,0,0,0.08) | Elevated cards, premium tier |
| `lg` | 0 12px 40px rgba(0,0,0,0.12) | Cards on hover |
| `xl` | 0 20px 60px rgba(0,0,0,0.15) | Mobile nav panel |

---

## Motion

### Easing Curves

| Name | Value | Usage |
|------|-------|-------|
| **Out** | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Hover transitions |
| **Apple** | cubic-bezier(0.42, 0, 0.58, 1) | Fades, gradient pulses |
| **Spring** | cubic-bezier(0.34, 1.56, 0.64, 1) | Button press feedback |
| **Content reveal** | cubic-bezier(0.16, 1, 0.3, 1) | Scroll reveals, card lifts |

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| Fast | 200ms | Hover color changes, button states |
| Normal | 400ms | Navigation transitions, fades |
| Slow | 800ms | Content reveals, hero text |
| Slower | 1200ms | Hero title entrance |

### Animation principles
- Every transition uses an easing curve — never use `linear`
- Scroll-reveal elements enter with blur(6px) + translateY(40px) + scale(0.98), then resolve to clarity
- Stagger child elements by 80ms increments
- Respect `prefers-reduced-motion`: disable all animations, show content immediately
- Navigation uses backdrop-filter blur for a frosted glass effect

---

## Components

### Buttons

**Primary** (accent blue, white text, pill shape):
- Hover: scale(1.04) + shadow
- Active: scale(0.98)
- Focus: 2px accent outline, 3px offset

**Outline** (transparent, border, pill shape):
- Hover: darker border
- Used for secondary actions

**Text** (no background, accent color, arrow suffix):
- Hover: arrow shifts right 4px
- Used for "learn more" style links

### Cards
- White background, light border, 16px radius
- Hover: translateY(-4px) + large shadow
- Content padding: 1.5rem
- Feature lists use small blue dots (6px) as bullets

### Code Blocks
- Background: tertiary (#f5f5f7)
- Border: 1px light border
- Radius: 10px
- Click-to-copy with "click to copy" / "copied!" feedback
- Terminal previews: dark background (#1d1d1f), green prompt, gray output

### Badges
- Pill shape (980px radius)
- Tiny uppercase text (0.7rem, 600 weight, 0.04em tracking)
- Colors: green for "active", yellow for "beta", blue for "planned", gray for "archived"

---

## Products

| Product | CLI Name | Tagline | Status |
|---------|----------|---------|--------|
| code-explore | `cex` | Your codebase, searchable in seconds. | Active |
| code-adapt | `cadp` | Never miss an upstream change again. | Active |
| autoskill | `autoskill` | AI that teaches itself to use any software. | Beta |

**Install pattern**: All three install from PyPI:
```
pip install code-explore
pip install code-adapt
pip install autoskill
```

---

## Voice & Tone

### Personality
- **Direct**: Lead with what it does, not what it is. Say "Scan hundreds of repos" not "A powerful CLI tool that enables..."
- **Technical but accessible**: Write for developers, not marketers. Use concrete examples over abstract benefits.
- **Confident, not arrogant**: "Works offline" not "The industry's first offline-capable..."
- **Concise**: One sentence where competitors use a paragraph.

### Writing rules
- Use active voice: "code-explore scans your repos" not "your repos are scanned by code-explore"
- Use second person: "your code", "your team", not "the user's code"
- CLI commands are set in monospace and include realistic examples
- Feature descriptions start with a verb: "Scan", "Track", "Automate", "Detect"
- Avoid buzzwords: say "local AI" not "edge intelligence", say "track changes" not "change management lifecycle"
- No exclamation marks in product copy
- Blog posts can be longer-form and more conversational, but still favor precision over filler

### Messaging hierarchy

**Level 1 — What we do**:
Building open-source tools that help developers work with AI.

**Level 2 — How it works**:
Three Python CLIs, one ecosystem. Search across hundreds of projects, track what's changing upstream, and automate the work that shouldn't be manual.

**Level 3 — Why it matters**:
Everything runs locally, everything is MIT licensed, everything works offline.

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| > 1440px | Large desktop (max-width cap at 1200px) |
| 769px – 1440px | Desktop (default) |
| 481px – 768px | Tablet (single-column grids, hidden decorations, mobile nav) |
| ≤ 480px | Mobile (compact padding, smaller type) |

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use the system font stack | Install or reference custom web fonts |
| Keep backgrounds white or near-white | Use dark mode, gradients, or colored backgrounds |
| Use accent blue for interactive elements only | Use accent blue for headings or large surfaces |
| Show real CLI examples in code blocks | Use placeholder text or mock output |
| Respect reduced motion preferences | Rely on animation to convey information |
| Write "Pioneers" as the brand name | Write "AI Pioneers" in navigation or logo |
| Use pill-shaped buttons | Use square or sharp-cornered buttons |
| Keep the design minimal and spacious | Add decorative elements, icons, or illustrations |
