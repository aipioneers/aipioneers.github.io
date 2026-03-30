---
title: "Three Tools, One Ecosystem: How Pioneers Fits Together"
date: 2026-03-29
author: "Pioneers"
description: "code-explore finds knowledge across your projects. code-adapt tracks what's changing upstream. autoskill automates the rest. Here's how the three tools work together — and where the platform is headed."
tags: ["ecosystem", "vision", "platform", "code-explore", "code-adapt", "autoskill"]
---

We started with a simple observation: developers waste enormous amounts of time on three things that should be automated.

1. **Finding things** — which project had that auth pattern? Where's the Kubernetes config I wrote last year?
2. **Tracking changes** — an upstream dependency shipped a security patch three weeks ago and nobody noticed.
3. **Repeating manual work** — checking five supplier portals, running the same deployment commands, downloading invoices from the same three websites.

Each problem got its own tool. But the real power is how they connect.

## code-explore: The Knowledge Layer

Every workflow starts with knowing what you have. code-explore scans your repositories and builds a searchable knowledge base:

```bash
cex scan ~/Projects
cex search "JWT authentication middleware"
```

One command discovers git repos, detects 70+ programming languages, maps dependency trees, identifies architectural patterns, and generates AI summaries using a local Ollama model. Your code never leaves your machine.

Search combines three engines — SQLite fulltext for exact keyword matches, LanceDB vectors for semantic meaning, and pattern-based retrieval for architectural queries — fused with Reciprocal Rank Fusion. The result: you find the right project whether you remember the exact words or just the concept.

What makes this more than a fancy grep: **confidence scoring**. Every result tells you how reliable the match is. A project that matches on all three engines with high keyword density and recent activity scores higher than a stale partial match. You stop second-guessing and start building.

The latest additions push this further. Smart paragraph chunking splits documents into title-aware sections with TF-IDF scoring, so search results point you to the relevant *section*, not just the file. A heuristic reranker adds freshness boost and code quality signals on top. And the plugin system lets you extend the scanner with custom analysis passes.

## code-adapt: The Intelligence Layer

Knowing what you have is step one. Knowing what's *changing* around you is step two.

code-adapt watches upstream repositories and structures the response:

```bash
cadp observe my-upstream --since 7d
cadp analyze pr-451
cadp assess pr-451 --against my-project
cadp plan adaptation-001
```

The lifecycle is enforced: observe, analyze, assess, plan, implement, validate, contribute. You can't skip stages. State lives as YAML files in `.adapt/`, tracked in git alongside your code.

Auto-classification sorts every change — security fix, bugfix, refactor, or new feature — using regex heuristics. Relevance scoring weighs which modules are affected and how risky the change is. The output: a concrete recommendation. Adopt, adapt, monitor, or ignore.

The multi-provider support is worth highlighting. code-adapt works with GitHub, GitLab, Gitea, gitcode.com, and Codeberg — including self-hosted instances. If your dependencies live across providers (and increasingly they do), one CLI handles all of them.

The newest capability: **Xinchuang compliance scoring**. For teams operating in regulated markets, code-adapt can check your project's technology stack against approved lists — openEuler, OceanBase, KingBase, GaussDB, and others. This used to require manual audits. Now it's a command.

## autoskill: The Automation Layer

You've found the right project with code-explore. You've tracked the upstream changes with code-adapt. Now you need to actually *do* something — and that's where autoskill comes in.

autoskill is a generalist AI skill framework. Give it a task in natural language, and it figures out how to accomplish it:

```bash
# AI navigates a website, logs in, extracts data
autoskill run "check stock levels on supplier-a.com"

# AI generates and executes shell commands
autoskill run --skill terminal --target kubectl "list all pods in staging"
```

Two built-in skills ship today:

**BrowserSkill** handles web automation. No selectors, no XPath, no per-site configuration. The LLM observes the page, figures out the login flow, navigates to the right section, and extracts structured data. It handles CAPTCHAs and 2FA by pausing for human input. Live streaming lets you watch and intervene through Chrome DevTools Protocol.

**TerminalSkill** handles CLI automation. A two-layer safety system protects against destructive commands: keyword blocklist catches the obvious (`rm -rf /`, `DROP TABLE`), and an LLM risk assessment catches the subtle (piped chains, obfuscated deletion). New tools start in sandbox mode — the AI shows commands for review before executing. After three successful runs, it graduates to live mode.

The **universal memory system** is what makes autoskill more than a one-shot tool. Every execution stores what worked — navigation paths, command patterns, login flows, extraction strategies. The first run on a new application is exploratory. The second run is fast, because the AI already has the skill.

```
~/.autoskill/memory/
  browser/supplier-a.com.json
  terminal/kubectl.json
```

Memory is portable. Export to JSON, import on another machine, share with your team. Old browser-specific memories migrate automatically — no manual conversion.

And the **plugin system** makes autoskill extensible. Any Python class implementing `SkillInterface` can be a skill backend. Custom skills get the same memory, streaming, and safety infrastructure as built-in ones. Package as a pip-installable plugin, and it auto-appears in `autoskill skills`.

## How They Connect

The three tools are independently useful. But together, they form a loop:

**code-explore** builds understanding of your codebase. It knows what languages you use, which patterns you've adopted, where your dependencies live.

**code-adapt** watches the outside world. It detects when upstream repositories ship changes that matter to you — security patches, breaking changes, useful features.

**autoskill** takes action. It automates the repetitive parts — checking portals, running deployment scripts, extracting data from web applications that don't have APIs.

The planned integration tightens this loop further. code-adapt will use code-explore's index to understand cross-project impact when assessing upstream changes. autoskill will use code-explore to discover which projects need attention. The knowledge base becomes the connective tissue.

## Where We're Headed

The platform is expanding in two directions:

**For individuals**: the open-source tools keep getting better. More skill backends (desktop automation is next), smarter search, deeper analysis. Everything runs locally, everything is MIT licensed.

**For teams**: the Pioneers cloud platform adds collaboration. Shared skill memory across organizations. Team analytics with health scoring. AI-powered Q&A over your codebase. A plugin marketplace. Workflow orchestration. Enterprise features like SAML SSO and audit logging.

The core philosophy doesn't change: open-source tools that work offline, with a cloud layer for teams that need coordination. No lock-in. No black boxes.

## Get Started

All three tools install from PyPI:

```bash
pip install code-explore   # Scan and search your projects
pip install code-adapt     # Track upstream changes
pip install autoskill      # Automate with AI skills
```

The source is on [GitHub](https://github.com/aipioneers). Contributions welcome.
