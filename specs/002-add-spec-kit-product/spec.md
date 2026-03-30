# Feature Specification: Add spec-intelligence Product to AI Pioneers Portfolio

**Feature Branch**: `002-add-spec-kit-product`
**Created**: 2026-03-30
**Status**: Draft
**Input**: User description: "Ich würde gerne ein neues Produkt, ein neues Tool in das Sortiment aufnehmen. Bitte plane das, lese das ein und kopiere oder übertrage das in die AI-Pionist-Familie. Komplett alles, was dazu gehört. Vom Onboarding, konfigurisierbar, Nutzung, Homepage, Texte, alles mögliche, komplett abgedeckt. /Users/tobiasoberrauch/Repositories/ai/spec"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Product Discovery on Homepage (Priority: P1)

A visitor arrives at pioneers.ai and sees spec-intelligence displayed in the product grid alongside autoskill, code-adapt, and code-explore. The product card shows the name, tagline ("Turn feature descriptions into structured specs, plans, and tasks — visually"), category, status badge, and a brief description. Clicking the card takes the visitor to the product detail section with full information. If spec-intelligence is marked as featured, it appears on the homepage hero area.

**Why this priority**: The product grid on pioneers.ai is the primary discovery channel. Without it, spec-intelligence is invisible to potential users. This is the minimum viable integration.

**Independent Test**: Can be fully tested by loading the homepage and verifying the spec-intelligence card appears in the product grid with correct name, tagline, description, and links. Clicking the card navigates to product details.

**Acceptance Scenarios**:

1. **Given** the homepage loads, **When** the visitor scrolls to the product grid, **Then** a spec-intelligence card appears with name "spec-intelligence", tagline, description, language badge ("TypeScript"), install commands (npm and pip), and GitHub link.
2. **Given** spec-intelligence has `featured: true` in its YAML, **When** the homepage loads, **Then** the product appears in the featured products section above the full grid.
3. **Given** a visitor clicks the spec-intelligence product card, **When** the products page loads, **Then** the full feature list, install instructions, and links to GitHub and documentation are visible.

---

### User Story 2 - Introduction Blog Post (Priority: P1)

A developer reads the spec-intelligence introductory blog post on pioneers.ai/blog. The post explains the problem (manual spec-driven development is tedious, context gets lost between CLI runs, no visual overview of feature progress), introduces spec-intelligence as the solution, describes the three deployment options (web app, desktop app, shared UI library), shows the core workflows (create spec → clarify → plan → generate tasks → track on kanban), includes code/CLI examples, and links to the GitHub repo and install instructions.

**Why this priority**: Blog posts are the primary content marketing tool for new products. It establishes the narrative and provides SEO-friendly discovery. Without it, the product card alone lacks the depth needed to convert visitors to users.

**Independent Test**: Can be tested by navigating to the blog, finding the spec-intelligence post, and verifying it contains problem statement, product overview, workflow explanation, install instructions, and links to the repo.

**Acceptance Scenarios**:

1. **Given** the blog page loads, **When** the visitor looks at the post list, **Then** the spec-intelligence introduction post appears with title, date, author, description, and tags.
2. **Given** a visitor opens the blog post, **When** they read through it, **Then** the content covers: problem statement, product overview, key features (spec authoring, pipeline visualization, kanban tasks, clarification workflow), install instructions, and next steps.
3. **Given** the blog post is published, **When** a search engine crawls the site, **Then** the post's frontmatter description and tags provide accurate SEO metadata.

---

### User Story 3 - Product Data Configuration (Priority: P1)

A site maintainer adds spec-intelligence to the AI Pioneers portfolio by creating a single YAML file in `data/projects/`. The YAML follows the established schema (name, slug, tagline, description, status, github, language, install, featured, sort_order, category, features). Once the file is committed, Hugo auto-renders the product in the product grid and on the products page without any template changes.

**Why this priority**: The YAML-driven product data is the configuration backbone. All rendering (homepage, products page, product cards) depends on this file existing with the correct schema. This is the foundational integration step.

**Independent Test**: Can be tested by creating the YAML file, running `hugo server -D`, and verifying the product appears on the products page and homepage (if featured).

**Acceptance Scenarios**:

1. **Given** a `data/projects/spec-intelligence.yaml` file exists with all required fields, **When** `hugo server -D` is run, **Then** the product appears in the product grid on the products page.
2. **Given** the YAML has `featured: true` and a `sort_order` value, **When** the homepage loads, **Then** spec-intelligence appears in the featured products section at the correct position relative to other products.
3. **Given** the YAML contains a features list with 8+ items, **When** the product detail renders, **Then** all features are displayed as a bulleted list.

---

### User Story 4 - Getting Started / Onboarding Content (Priority: P2)

A new user who discovered spec-intelligence on pioneers.ai wants to try it. They find clear onboarding instructions within the blog post or a dedicated section: install via npm, run the dev server, open the browser, create their first spec from a text description. The content covers both the web app (quickest start) and the desktop app (for local-first users). Configuration options (port, LLM model for plan/task generation) are documented.

**Why this priority**: Onboarding content converts interest into adoption. Without it, users may install but not successfully use the product. However, the product grid and blog post establish visibility first.

**Independent Test**: Can be tested by following the documented steps on a clean machine: install, configure, run, and create a first spec — all within 5 minutes.

**Acceptance Scenarios**:

1. **Given** a user reads the blog post or product description, **When** they follow the install instructions, **Then** they can install and run spec-intelligence (web) with 3 or fewer commands.
2. **Given** a user has spec-intelligence running locally, **When** they follow the "create your first spec" instructions, **Then** they can create a feature specification from a text description within 2 minutes.
3. **Given** a user wants to customize the setup, **When** they look for configuration documentation, **Then** they find information about port configuration, LLM backend selection, and project directory setup.

---

### User Story 5 - Consistent Brand Integration (Priority: P2)

The spec-intelligence product presentation on pioneers.ai matches the established visual identity and content tone of the existing products (autoskill, code-adapt, code-explore). The product card uses the same layout, the blog post follows the same structure as existing introduction posts, and the product description uses the same direct, technical-but-accessible writing style.

**Why this priority**: Brand consistency builds trust and signals a mature product family. Inconsistent styling or tone creates the impression of a fragmented organization.

**Independent Test**: Can be tested by comparing the spec-intelligence product card and blog post side-by-side with existing products, verifying identical card layout, similar post structure (problem → solution → how it works → install → what's next), and consistent writing tone.

**Acceptance Scenarios**:

1. **Given** the spec-intelligence product card renders, **When** compared to the autoskill card, **Then** both use identical HTML structure, CSS classes, and visual layout (name, tagline, description, features, install, GitHub link).
2. **Given** the spec-intelligence blog post is published, **When** compared to the autoskill and code-adapt introduction posts, **Then** the structure follows the same pattern: problem statement, product overview, feature walkthroughs with code examples, install section, what's next section.
3. **Given** the product description text, **When** evaluated for tone, **Then** it uses the same direct, jargon-appropriate, developer-focused style as existing product descriptions.

---

### User Story 6 - Cross-Product Ecosystem Linking (Priority: P3)

The spec-intelligence product page and blog post reference related AI Pioneers products where relevant. For example, the post mentions that tasks generated by spec-intelligence can be tracked with code-adapt for upstream dependencies, and that code-explore can analyze codebases that specs are written for. These cross-references strengthen the ecosystem narrative and help users discover complementary tools.

**Why this priority**: Ecosystem linking increases product discovery and retention. However, it's supplementary — each product must stand on its own first.

**Independent Test**: Can be tested by reading the spec-intelligence blog post and verifying that at least 2 cross-references to other AI Pioneers products exist with contextually appropriate descriptions.

**Acceptance Scenarios**:

1. **Given** the spec-intelligence blog post, **When** a reader encounters a cross-reference to another product, **Then** the reference includes the product name, a one-sentence description of the integration point, and a link to the product page or blog post.
2. **Given** the spec-intelligence product YAML, **When** the product detail renders, **Then** the description or features section naturally references the broader AI Pioneers ecosystem.

---

### Edge Cases

- What happens if the YAML file has a slug that conflicts with an existing product? → Hugo will render both products; the slug must be unique. Validation happens at review time before merging.
- What happens if the blog post date is in the future? → Hugo treats future-dated posts as drafts by default. Posts should use the actual publish date or the `-D` flag during development.
- What happens if the GitHub repository is private or doesn't exist yet? → The product card still renders, but the GitHub link leads to a 404. The YAML should only include the `github` field when the repo is public.
- How does the product grid handle a 4th featured product on narrow screens? → The existing CSS grid is responsive and wraps at 768px. Four featured products may need the `sort_order` field adjusted to control visual priority.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Site MUST include a product data file (`data/projects/spec-intelligence.yaml`) with all required fields matching the established schema: name, slug, tagline, description, status (`beta`), github, language, install, featured, sort_order, category, and features list.
- **FR-002**: The spec-intelligence product MUST appear in the product grid on the products page without any template modifications — rendered automatically from the YAML data.
- **FR-003**: When marked as featured, spec-intelligence MUST appear on the homepage alongside existing featured products, respecting the `sort_order` for positioning.
- **FR-004**: Site MUST include an introduction blog post for spec-intelligence at `content/blog/introducing-spec-intelligence.md` with frontmatter (title, date, author, description, tags) and content covering: problem statement, product overview, core workflows, key features, install instructions, and roadmap.
- **FR-005**: The blog post MUST include working install commands for both ecosystems: `npm install spec-intelligence` (primary, TypeScript/Node.js) and `pip install spec-intelligence` (alternative, Python wrapper). Desktop app install is documented as a secondary option.
- **FR-006**: The blog post MUST include at least 3 code/CLI examples demonstrating key workflows (creating a spec, viewing the pipeline, managing tasks).
- **FR-007**: The blog post MUST include at least 2 cross-references to other AI Pioneers products (autoskill, code-adapt, or code-explore) with contextually relevant descriptions of how they complement spec-intelligence.
- **FR-008**: All product text (YAML description, tagline, blog post) MUST be written in English, matching the direct, developer-focused tone of existing products.
- **FR-009**: The product YAML MUST set the `category` field to a value consistent with the product type (e.g., "Developer Tools" or "Productivity").
- **FR-010**: The blog post MUST describe configuration options for the product: port selection, LLM backend, and project directory setup.
- **FR-011**: The product features list in the YAML MUST contain at least 8 distinct features that accurately represent the product's capabilities.
- **FR-012**: All links in the blog post and product data (GitHub, install URLs) MUST point to valid, publicly accessible resources at the time of publishing.

### Key Entities

- **Product Data File**: A YAML document in `data/projects/` that defines a product's metadata, description, features, and display properties for the Hugo site.
- **Blog Post**: A Markdown file in `content/blog/` with frontmatter metadata and content that introduces a product to the audience.
- **Product Card**: A visual component on the products page and homepage that renders product data from YAML into the site's grid layout.
- **Cross-Reference**: An inline mention of another AI Pioneers product within a blog post or product description, linking related tools in the ecosystem.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can discover spec-intelligence on the homepage within 10 seconds of page load, visible in the featured products grid without scrolling past the fold on desktop viewports.
- **SC-002**: Visitors can find and read the introduction blog post within 2 clicks from the homepage (homepage → blog → post).
- **SC-003**: Users can go from reading the blog post to having spec-intelligence installed and running locally by following documented steps in under 5 minutes.
- **SC-004**: The product data file integrates with the existing Hugo build without any template or layout file modifications — zero changes to `layouts/` files.
- **SC-005**: The spec-intelligence product card visually matches the layout and styling of existing product cards (autoskill, code-adapt, code-explore) with no visible inconsistencies.
- **SC-006**: The blog post follows the same structural pattern as existing introduction posts: problem (1-2 paragraphs) → solution overview → detailed feature walkthroughs → install → what's next.
- **SC-007**: All cross-references to other AI Pioneers products include working links that resolve to the correct product pages or blog posts.
- **SC-008**: The spec-intelligence blog post ranks among the 4 most recent posts on the blog listing page upon publication.

## Clarifications

### Session 2026-03-30

- Q: Canonical product name — "spec-kit" vs "spec-intelligence" (source npm package name)? → A: spec-intelligence. Use "spec-intelligence" consistently across website, YAML slug, blog post, and all references.
- Q: Install method — npm only (TypeScript product) vs pip only (match existing Python products) vs both? → A: Both. Primary install via `npm install spec-intelligence`, with `pip install spec-intelligence` as an alternative Python wrapper/CLI package. Blog post and YAML document both methods.
- Q: Product status badge — beta, active, or preview? → A: beta. Functional but pre-1.0, matching autoskill's status.

## Assumptions

- The existing Hugo product template (`layouts/products/list.html` and `layouts/partials/project-card.html`) renders products from any YAML file in `data/projects/` without modification. No new template fields are required beyond the existing schema.
- The AI Pioneers GitHub organization will host the spec-intelligence repository publicly at `github.com/aipioneers/spec-intelligence` before or at the time of publishing.
- The product name on the website will be "spec-intelligence" to match the npm package name and maintain consistency between the website and install experience.
- Install instructions will offer both `npm install spec-intelligence` (primary) and `pip install spec-intelligence` (alternative Python wrapper), documented side by side in the blog post and YAML.
- The desktop app (Tauri) is mentioned as a secondary option; the web app is the primary onboarding path.
- The blog post date will be set to the actual publication date, not backdated.
- The spec-intelligence product source code at `/Users/tobiasoberrauch/Repositories/ai/spec` is the canonical reference for features, architecture, and capabilities.
