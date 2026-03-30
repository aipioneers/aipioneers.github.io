# Tasks: Add spec-intelligence to AI Pioneers Portfolio

**Branch**: `002-add-spec-kit-product` | **Date**: 2026-03-30
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Phase 1: Setup

**Goal**: Gather reference materials for consistent product integration.

- [ ] T001 [P] Read existing product YAML files as reference: `data/projects/autoskill.yaml`, `data/projects/adapt.yaml`, `data/projects/code-explore.yaml`
- [ ] T002 [P] Read existing blog posts for structure reference: `content/blog/introducing-autoskill.md`, `content/blog/introducing-code-adapt.md`, `content/blog/hybrid-search-in-code-explore.md`
- [ ] T003 [P] Read source repository for accurate feature descriptions: `/Users/tobiasoberrauch/Repositories/ai/spec/CLAUDE.md`, `/Users/tobiasoberrauch/Repositories/ai/spec/specs/001-spec-kit-ui/spec.md`, `/Users/tobiasoberrauch/Repositories/ai/spec/packages/ui/package.json`

## Phase 2: Product Data — US3 (P1)

**Goal**: Create the product YAML file so spec-intelligence appears in the Hugo product grid.
**Independent Test**: Run `hugo server -D` and verify the product card renders on homepage and products page.

- [ ] T004 [US3] Create product data file at `data/projects/spec-intelligence.yaml` with all required fields per data-model.md: name (`spec-intelligence`), slug (`spec-intelligence`), tagline, description, status (`beta`), github (`https://github.com/aipioneers/spec-intelligence`), language (`TypeScript`), install (`npm install spec-intelligence`), featured (`true`), sort_order (`4`), category (`Developer Tools`), and features list (8+ items derived from source repo capabilities — spec authoring, pipeline visualization, kanban tasks, clarification workflow, plugin/extension system, desktop app, i18n, cross-artifact analysis)

## Phase 3: Homepage Verification — US1 (P1)

**Goal**: Confirm spec-intelligence renders correctly on homepage and products page.
**Independent Test**: Visual comparison of spec-intelligence card with existing product cards.

- [ ] T005 [US1] Run `hugo server -D` and verify spec-intelligence product card appears in the featured products grid on the homepage at `http://localhost:1313`
- [ ] T006 [P] [US1] Verify spec-intelligence appears on the products page at `http://localhost:1313/products/` with full feature list, install command, and GitHub link
- [ ] T007 [P] [US1] Verify sort_order places spec-intelligence after code-explore (position 4) and the 4-card grid renders correctly on desktop and mobile viewports

## Phase 4: Introduction Blog Post — US2 (P1)

**Goal**: Write the introduction blog post covering all content requirements (FR-004 through FR-010), including onboarding content (US4) and cross-product references (US6).
**Independent Test**: Navigate to `/blog/`, find the post, verify all content sections present with working code examples and links.

- [ ] T008 [US2] Create blog post at `content/blog/introducing-spec-intelligence.md` with frontmatter: title ("Introducing spec-intelligence: A Visual Interface for Spec-Driven Development"), date (2026-03-30), author ("Pioneers"), description (~150 chars SEO summary), tags (["release", "spec-intelligence", "developer-tools", "spec-driven-development"])
- [ ] T009 [US2] Write problem statement section (1-2 paragraphs): the pain of managing specifications manually, context loss between CLI sessions, no visual overview of feature progress across a project
- [ ] T010 [US2] Write product overview section: introduce **spec-intelligence** in bold, describe it as a visual interface for the full spec-driven development lifecycle (specify → clarify → plan → tasks → implement), mention web app + desktop app deployment modes
- [ ] T011 [US2] Write feature walkthrough sections with at least 3 code/CLI examples (FR-006): (1) creating a spec from text description, (2) viewing the pipeline status, (3) generating and managing tasks on a kanban board. Include subsection headings for each feature.
- [ ] T012 [US2] [US4] Write install section with dual install commands (FR-005): primary `npm install spec-intelligence` with quick-start steps (install → `npm run dev` → open browser), alternative `pip install spec-intelligence` for Python users. Include configuration section covering port selection, LLM backend (Ollama), and project directory setup (FR-010)
- [ ] T013 [US2] [US6] Write at least 2 cross-references to other AI Pioneers products (FR-007): (1) mention code-adapt for tracking upstream changes to dependencies used in spec'd features, (2) mention code-explore for analyzing codebases that specs are written for. Each reference includes product name, integration description, and link.
- [ ] T014 [US2] Write "What's Next" roadmap section: upcoming features like shared team workspaces, CI/CD integration for automated spec validation, marketplace for spec templates. Include GitHub link at the end.

## Phase 5: Brand Consistency Review — US5 (P2)

**Goal**: Verify spec-intelligence presentation matches established visual and content standards.
**Independent Test**: Side-by-side comparison of spec-intelligence card and blog post with existing products.

- [ ] T015 [US5] Review `data/projects/spec-intelligence.yaml` description and tagline tone against `data/projects/autoskill.yaml` — verify same direct, developer-focused style with no marketing fluff. Adjust if needed.
- [ ] T016 [US5] Review blog post structure against `content/blog/introducing-autoskill.md` and `content/blog/introducing-code-adapt.md` — verify same pattern: problem → solution → features with code → install → roadmap. Adjust if needed.
- [ ] T017 [P] [US5] Verify product card HTML renders with identical structure and CSS classes as existing cards (same `project-card` component, same `badge-beta` class, same `project-card-features` list)

## Phase 6: Polish & Validation

**Goal**: Final build verification and quality checks.

- [ ] T018 Run `hugo --minify` and verify clean build with zero errors or warnings in `data/projects/spec-intelligence.yaml` and `content/blog/introducing-spec-intelligence.md`
- [ ] T019 Verify zero changes exist in the `layouts/` directory (SC-004 — no template modifications)
- [ ] T020 [P] Verify all links in blog post and YAML are valid: GitHub repo URL, cross-reference links to other product blog posts, install commands are syntactically correct

## Dependencies

```text
Phase 1 (Setup)
  └── Phase 2 (YAML — US3)
       ├── Phase 3 (Verify — US1)
       └── Phase 4 (Blog Post — US2, US4, US6)
            └── Phase 5 (Brand Review — US5)
                 └── Phase 6 (Polish)
```

- US3 (YAML) is the foundation — must complete before US1 (verify) and US2 (blog post references product)
- US1 (verify) and US2 (blog post) can execute in parallel after US3
- US4 (onboarding) and US6 (cross-references) are embedded in US2 tasks
- US5 (brand review) requires both YAML and blog post to exist
- Phase 6 (polish) is the final gate

## Parallel Execution Opportunities

| Tasks     | Why Parallel                                        |
|-----------|-----------------------------------------------------|
| T001-T003 | Independent reference reads, no shared state        |
| T006-T007 | Independent verification checks on running server   |
| T005 + T008-T014 | Verification and blog writing can overlap after YAML exists |
| T015-T017 | Independent review tasks on different artifacts     |
| T019-T020 | Independent validation checks                       |

## Implementation Strategy

**MVP (User Story 1 + 3)**: Create `spec-intelligence.yaml` → verify product renders on homepage and products page. This is the minimum to make spec-intelligence visible on pioneers.ai. Achievable with tasks T001-T007.

**Full Delivery**: MVP + blog post (T008-T014) + brand review (T015-T017) + polish (T018-T020). The blog post is the bulk of the content work.

**Estimated scope**: 20 tasks across 6 phases. ~200 lines of new content across 2 files.
