---
title: "Introducing autoskill: AI That Teaches Itself to Use Any Software"
date: 2026-03-28
author: "Pioneers"
description: "autoskill is a generalist AI skill framework with pluggable backends — BrowserSkill for web automation, TerminalSkill for CLI programs, and a universal memory layer that works across all skill types."
tags: ["release", "autoskill", "automation", "llm", "self-learning"]
---

Every procurement team knows the drill. You need to check prices on five supplier portals. Each has a different login flow, different navigation, different data layout. Someone writes a scraper. The portal changes. The scraper breaks. Repeat.

**autoskill** takes a fundamentally different approach: instead of hardcoding logic per application, it lets an LLM figure out how to use any software — the same way a human would.

## Generalist AI Skills

autoskill is a **pluggable skill framework**. The core idea: an AI that teaches itself to operate any program on your computer. Each type of software is a "skill backend" — and the same learning loop applies to all of them:

1. **Observe** — discover the interface
2. **Try** — attempt the task
3. **Remember** — persist what worked
4. **Improve** — use memory to work faster next time

Today autoskill ships with two built-in skills:

- **BrowserSkill** — web automation via the existing UniversalConnector
- **TerminalSkill** — AI learns to use CLI programs with adaptive safety

The architecture is open for more. A DesktopSkill for native UI control is planned next.

## How It Works

### BrowserSkill

The BrowserSkill wraps the **UniversalConnector** — an AI agent that receives a URL and credentials, then autonomously:

1. Figures out the login flow (username/password, SSO, multi-step)
2. Navigates to the right pages
3. Extracts structured data
4. Handles CAPTCHAs and 2FA by pausing for human input

No selectors. No XPath. No per-portal configuration.

```python
from autoskill import UniversalConnector, LLMConfig

connector = UniversalConnector(
    base_url="https://supplier.example.com",
    credentials={"username": "buyer", "password": "secret"},
    llm_config=LLMConfig(model="gpt-4o"),
)

await connector.authenticate()
products = await connector.fetch_products()
```

### TerminalSkill

The TerminalSkill teaches the AI to use CLI programs. Give it a task and a target tool, and it figures out the right commands:

```bash
autoskill run --skill terminal --target kubectl "list all pods in the staging namespace"
```

Safety is built in with two layers:

1. **Keyword blocklist** — instant detection of destructive commands (`rm -rf`, `DROP TABLE`, `kill -9`)
2. **LLM risk assessment** — catches piped/chained commands the blocklist might miss

New tools start in **sandbox mode** — commands are shown for review before execution. After 3 successful runs, the AI gains trust and can execute directly. Override with `--live` or `--sandbox`.

## Universal Skill Memory

Every skill shares the same memory system. The first run on a new application is exploratory — the LLM discovers how things work. autoskill remembers everything. The second run is fast because the agent already knows the "skill."

Memory is stored per skill type and target as JSON files:

```
~/.autoskill/memory/
  browser/
    supplier-a.com.json
    supplier-b.com.json
  terminal/
    kubectl.json
    docker.json
```

Each memory file tracks:

- **Hints** — learned patterns specific to the target (navigation paths, command flags, UI layouts)
- **Run count and success rate** — how much the AI has practiced
- **Learned patterns** — reusable knowledge across similar targets

Memory from existing browser automation migrates automatically — no manual conversion needed.

## Unified CLI

The `autoskill` CLI is the single entry point for all skills:

```bash
# Run a skill (auto-detects type from target)
autoskill run "check stock levels on supplier-a.com"

# Explicit skill selection
autoskill run --skill browser --target https://supplier.example.com "extract products"
autoskill run --skill terminal --target docker "list running containers"

# List available skills and plugins
autoskill skills
autoskill skills --plugins

# Manage skill memory
autoskill memory list
autoskill memory show browser supplier-a.com
autoskill memory export backup.json
autoskill memory import backup.json
```

The 24 procurement scenarios remain available as direct commands:

```bash
autoskill crawl --config portals.yml        # Extract products
autoskill stock --config portals.yml        # Check availability
autoskill prices --config portals.yml       # Monitor prices
autoskill invoices --config portals.yml     # Download invoices
autoskill order --config portals.yml        # Place orders
```

All scenarios run concurrently across multiple portals with configurable rate limiting, retries, and fault isolation.

## Plugin System

Add custom skills in under 50 lines. Any Python class implementing the `SkillInterface` protocol can be registered:

```python
from autoskill import SkillInterface, SkillResult, SkillMemory

class MyCustomSkill:
    @property
    def skill_type(self): return "my-tool"

    @property
    def display_name(self): return "My Tool"

    @property
    def description(self): return "Controls my custom tool"

    async def execute(self, task, target, *, memory=None, on_step=None):
        # Your skill logic here
        return SkillResult(success=True, data={}, steps_taken=1,
                          updated_hints={}, learned_patterns=[])

    async def close(self):
        pass
```

Register as an entry point in `pyproject.toml`:

```toml
[project.entry-points."autoskill.skills"]
my-tool = "my_package:MyCustomSkill"
```

Plugins are discovered automatically. Built-in skill names are protected — no plugin can override BrowserSkill or TerminalSkill.

## Live Streaming

autoskill streams browser sessions in real-time via Chrome DevTools Protocol. You can watch the AI work, and intervene when needed — click, type, scroll — directly through the stream.

This is essential for handling CAPTCHAs, 2FA prompts, or any situation where the AI pauses and asks for human input.

## Hybrid Extraction

Data extraction uses three methods and picks the best:

1. **Schema.org** — deterministic, free, instant (when the application provides structured markup)
2. **Schematron** — local LLM via Ollama for structured extraction from HTML
3. **LLM extraction** — full agent-based extraction as fallback

autoskill benchmarks all three, compares field coverage, and uses structured extraction whenever it's provably better than the LLM.

## Install

```bash
pip install autoskill
```

For the full CLI with all 24 procurement scenarios:

```bash
pip install "autoskill[scenarios]"
```

Requires Python 3.12+ and a supported LLM backend (OpenAI, Ollama, vLLM, or any OpenAI-compatible API).

## What's Next

- **DesktopSkill** — native UI control for desktop applications
- **Skill marketplace** — share and reuse learned skills across teams
- **Cloud orchestration** via the Pioneers platform
- **Shared skill memory** across organizations
- **Scheduled execution** with alerts and reporting

The source is on [GitHub](https://github.com/aipioneers/autoskill). Feedback, issues, and contributions are welcome.
