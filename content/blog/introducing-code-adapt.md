---
title: "Introducing code-adapt: A CLI for the Adaptation Lifecycle"
date: 2026-03-24
author: "AI Pioneers"
description: "Tracking upstream changes manually is tedious and error-prone. code-adapt brings structure to the process — observe, analyze, assess, plan, implement, and contribute back, all from the terminal."
tags: ["release", "code-adapt", "cli"]
---

You maintain a project that depends on an upstream repository. A new security patch lands. Three PRs get merged. A release ships. You find out two weeks later, buried in a changelog you forgot to check.

This is the problem **code-adapt** solves.

## The Adaptation Lifecycle

Most teams handle upstream tracking informally — someone glances at a repo, maybe sets up a GitHub notification, and then manually figures out what changed and whether it matters. That works until it doesn't.

code-adapt introduces a structured lifecycle:

```
observed → analyzed → assessed → planned → implemented → validated → contributed → merged
```

Each stage has a clear purpose, and the CLI guides you through every transition.

## How It Works

### 1. Observe

Track what happened upstream — commits, pull requests, releases:

```bash
cadp observe my-upstream --since 7d
```

This fetches all changes from the last week and stores them locally as observations. No more manually browsing GitHub.

### 2. Analyze & Assess

Each change gets classified automatically — is it a security fix, a bugfix, a refactor, or a new feature? Then code-adapt evaluates relevance against your project's profile and policies:

```bash
cadp analyze pr-451
cadp assess pr-451 --against my-project
```

The assessment considers which modules are affected, how risky the change is, and suggests an action: adopt, adapt partially, monitor, or ignore.

### 3. Plan & Implement

For changes worth adopting, generate an adaptation plan with a concrete strategy:

```bash
cadp plan adaptation-001
cadp implement adaptation-001 --branch --open-pr
```

This creates the implementation branch, stubs out the files that need changes, and can even open a draft PR.

### 4. Learn

After each adaptation, record the outcome. Over time, code-adapt builds a feedback loop that makes future assessments more accurate:

```bash
cadp learn adaptation-001 --outcome success
```

## What's Under the Hood

code-adapt is built in Python with a few deliberate technical choices:

- **Pydantic v2** models enforce the state machine — you can't skip stages or make invalid transitions
- **Atomic file writes** (temp + rename) prevent corrupted state
- **All state lives in `.adapt/`** as YAML and JSON files, tracked in git — no external database, no server
- **Dual output** — every command produces rich terminal output for humans and `--json` for scripts and CI

## Install

```bash
pip install code-adapt
```

Or use the short alias:

```bash
cadp --help
```

Requires Python 3.11+ and a GitHub token (`gh auth login` or `GITHUB_TOKEN` env var).

## What's Next

This is v0.1.0 — the foundation. The lifecycle engine, classification, and assessment logic are solid. Coming next:

- Smarter assessment using downstream dependency graphs
- Batch observation across multiple upstreams
- Integration with code-explore for cross-project impact analysis

The source is on [GitHub](https://github.com/aipioneers/code-adapt). Feedback, issues, and contributions are welcome.
