---
title: "Introducing spec-intelligence: A Visual Interface for Spec-Driven Development"
date: 2026-03-30
author: "Pioneers"
description: "spec-intelligence gives you a visual interface for the full spec-driven development lifecycle — from feature description to structured specification, implementation plan, and kanban task board. Web app, desktop app, or CLI — your specs stay as Markdown files."
tags: ["release", "spec-intelligence", "developer-tools", "spec-driven-development"]
---

You're building a feature. You write a spec in Markdown. You run a CLI command to generate a plan. Another command for tasks. You switch to your editor to review, then back to the terminal. Somewhere between the third file and the fifth command, you lose track of which requirements are covered, which clarifications are still open, and what the overall progress looks like.

**spec-intelligence** gives you one place to see all of it.

## Spec-Driven Development, Visually

spec-intelligence is a **visual interface for the full spec-driven development lifecycle**. The same structured process — specify, clarify, plan, generate tasks, implement — but with a UI that shows you where every feature stands:

1. **Specify** — write a feature description, get a structured spec
2. **Clarify** — resolve ambiguities through guided dialogs
3. **Plan** — generate an implementation plan with architecture decisions
4. **Tasks** — break the plan into a kanban board with dependencies
5. **Implement** — track progress as tasks move across the board

Every artifact is a Markdown file in your repo. The UI reads and writes them directly — no database, no server state, no lock-in.

## How It Works

### Specification Authoring

Start with a text description of what you want to build. spec-intelligence generates a structured specification with user stories, functional requirements, acceptance scenarios, and success criteria:

```bash
# From the CLI
npx spec-intelligence create "Add user authentication with OAuth2 and email/password"

# Or open the web UI and type the same description into the "New Feature" form
```

The editor is hybrid — structured forms for defined sections (requirements, acceptance scenarios, success criteria) and inline Markdown editing for free-text content. Switch to full-document mode when you want to see the raw spec.

### Pipeline Visualization

Every feature shows its lifecycle as a visual pipeline. You see immediately which phase you're in, what's blocking, and what's next:

```
  ✅ Specify  →  ✅ Clarify  →  🔄 Plan  →  ⏳ Tasks  →  ⏳ Implement
```

Click any phase to jump to the corresponding artifact. Blocked phases show why — missing prerequisites are highlighted, not hidden.

### Kanban Task Board

Plans break down into tasks displayed on a drag-and-drop kanban board. Tasks are grouped by implementation phase (Setup → Foundation → User Stories → Polish), with dependency arrows showing what blocks what:

```
┌─────────┐  ┌──────────────┐  ┌─────────┐
│  Todo   │  │ In Progress  │  │  Done   │
├─────────┤  ├──────────────┤  ├─────────┤
│ T005 ●──┤  │ T003 [P]     │  │ T001 ✓  │
│ T006    │  │ T004         │  │ T002 ✓  │
│ T007 ●──┤  │              │  │         │
└─────────┘  └──────────────┘  └─────────┘
                                ● = dependency
                               [P] = parallelizable
```

Drag a task to update its status. The underlying `tasks.md` file updates automatically. Parallel-execution markers (`[P]`) and dependency arrows help you plan which tasks your team can work on simultaneously.

### Interactive Clarification

Specifications often contain ambiguous requirements. spec-intelligence highlights `[NEEDS CLARIFICATION]` markers inline and opens a guided dialog:

- See the context around the ambiguity
- Choose from suggested options with impact descriptions
- Or type a custom answer

The clarification replaces the marker in the spec and logs the decision with a timestamp. No more "what did we decide about auth?" six weeks later.

## Configuration

spec-intelligence works with local LLMs for plan and task generation. Configure via environment or the UI settings panel:

```bash
# Port (default: 3333)
PORT=3333 npx spec-intelligence dev

# LLM backend for plan/task generation (requires Ollama running locally)
OLLAMA_MODEL=glm-4.7-flash npx spec-intelligence dev

# Point to your project directory
SPEC_DIR=./my-project npx spec-intelligence dev
```

The web app runs on `localhost:3333` by default. The desktop app (built with Tauri) gives you the same interface with native file system access — no server needed.

## Works With Your Existing Tools

spec-intelligence reads and writes the same Markdown files that CLI tools produce. If you've been using the spec-kit CLI, your existing specs, plans, and tasks work immediately — open the UI and they're all there.

This also means specs created in the UI work with [code-adapt](https://github.com/aipioneers/code-adapt) for tracking upstream changes to dependencies referenced in your plans. And [code-explore](https://github.com/aipioneers/code-explore) can index and search across all your spec'd projects — find "which feature introduced the auth middleware" in seconds.

## Install

The primary install is via npm:

```bash
npm install spec-intelligence
npx spec-intelligence dev
```

For Python users, a wrapper package is also available:

```bash
pip install spec-intelligence
spec-intelligence dev
```

The desktop app is available as a standalone download from the [GitHub releases page](https://github.com/aipioneers/spec-intelligence/releases).

Requires Node.js 20+ (npm) or Python 3.12+ (pip). LLM features (plan/task generation) require [Ollama](https://ollama.ai) running locally.

## What's Next

- **Team workspaces** — shared project views with role-based access
- **CI/CD integration** — validate specs automatically on pull requests
- **Template marketplace** — share and reuse spec templates across teams
- **Deeper code-adapt integration** — auto-assess upstream changes against your active specs

The source is on [GitHub](https://github.com/aipioneers/spec-intelligence). Feedback, issues, and contributions are welcome.
