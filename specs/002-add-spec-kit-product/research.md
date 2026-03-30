# Research: Add spec-intelligence to AI Pioneers Portfolio

**Date**: 2026-03-30 | **Feature**: 002-add-spec-kit-product

## R1: Product YAML Schema Compliance

**Decision**: Use the exact same YAML fields as existing products — no new fields needed.

**Rationale**: The Hugo templates (`project-card.html`, `products/list.html`, `index.html`) reference a fixed set of fields: `name`, `slug`, `tagline`, `description`, `status`, `github`, `language`, `install`, `featured`, `sort_order`, `category`, `features` (array), plus optional `url` and `install_url`. All fields are strings except `features` (array of strings), `featured` (boolean), and `sort_order` (integer). The `install` field is a single string passed to a clipboard-copy function — it cannot hold multiple install commands.

**Alternatives considered**:
- Adding a new `install_alt` field for the pip command → Rejected: requires template changes, violating SC-004
- Using `install_url` for an alternate install page → Possible but `install_url` is not rendered in any template currently

**Resolution**: YAML `install` field holds `npm install spec-intelligence` (primary). The pip alternative is documented in the blog post and product description text.

## R2: Product Sort Order

**Decision**: `sort_order: 4` — spec-intelligence appears last in the product grid.

**Rationale**: Existing products: autoskill (1), code-adapt (2), code-explore (3). Adding at position 4 keeps the established order stable. The 4-column CSS grid wraps naturally at 768px breakpoint — a 4th card fits the desktop layout and wraps correctly on tablet/mobile.

**Alternatives considered**:
- Inserting at position 2 (after autoskill, before CLIs) → Rejected: disrupts existing visual order for returning visitors
- Using sort_order 0 (first position) → Rejected: autoskill is the flagship product

## R3: Blog Post Structure Pattern

**Decision**: Follow the exact structure of existing introduction posts: problem → solution → how it works (with subsections per feature) → install → what's next.

**Rationale**: Analyzing the three existing blog posts:
- `introducing-autoskill.md`: problem (procurement portals) → generalist skills overview → how it works (BrowserSkill, TerminalSkill) → memory → CLI → plugins → streaming → extraction → install → what's next
- `introducing-code-adapt.md`: problem (upstream tracking) → lifecycle → how it works (observe, analyze, plan, learn) → under the hood → install → what's next
- `hybrid-search-in-code-explore.md`: problem (finding projects) → two search engines → RRF fusion → degradation → pipeline → try it

Common pattern: 1-2 paragraph problem hook → product name in bold → feature walkthroughs with code blocks → install section → roadmap.

**Alternatives considered**:
- Tutorial-style post (step-by-step guide) → Rejected: doesn't match established tone; tutorial content belongs in quickstart
- Short announcement style → Rejected: existing posts are detailed technical introductions (80-200 lines)

## R4: Product Name and Branding

**Decision**: Use "spec-intelligence" as the canonical name everywhere. Display name in YAML: `spec-intelligence`.

**Rationale**: Clarified with user — the canonical name matches the npm package name `spec-intelligence`. This avoids confusion when users install via npm and see the package name. All website references use this exact name.

**Alternatives considered**:
- "spec-kit" (shorter) → Rejected by user in clarification session
- "Spec Intelligence" (title case) → Rejected: existing products use lowercase (autoskill, code-adapt, code-explore)

## R5: Dual Install Method

**Decision**: Primary install via `npm install spec-intelligence`, alternative via `pip install spec-intelligence`. YAML shows npm; blog post documents both.

**Rationale**: The product is built in TypeScript/Node.js (source repo: Next.js 14, Tauri 2, turbo monorepo). A Python wrapper package will be published to PyPI to match the existing AI Pioneers product family (all Python). The YAML `install` field supports only a single string, so npm is primary there. The blog post has space to document both installation paths.

**Alternatives considered**:
- pip-only → Rejected: misleading since the core product is Node.js
- npm-only → Rejected by user: wants both ecosystems supported

## R6: Content Tone and Language

**Decision**: English, direct developer-focused tone matching existing products. No marketing fluff.

**Rationale**: All existing products use the same voice: second person ("you"), present tense, short declarative sentences, technical terminology used naturally without over-explanation. Code examples are practical, not toy demos.

**Alternatives considered**: None — the existing tone is well-established and consistent.
