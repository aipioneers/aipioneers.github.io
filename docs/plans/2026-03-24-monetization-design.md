# Monetization Design: AI Pioneers Cloud

## Summary

The open-source CLIs (code-explore, code-adapt) remain free and fully functional locally. An optional cloud backend (`api.pioneers.ai`) extends them with hosted AI, team sync, and a web dashboard (`app.pioneers.ai`). Monetization happens through tiered subscriptions.

## Pricing Tiers

| | Free | Pro ($12/mo) | Team ($8/seat/mo, 3+) | Enterprise (custom) |
|---|---|---|---|---|
| CLI (local, unlimited) | ✓ | ✓ | ✓ | ✓ |
| Cloud projects | 50 | Unlimited | Unlimited | Unlimited |
| Hosted AI models | — | ✓ | ✓ | ✓ |
| Dashboard | Read-only | Full | Full | Full |
| Adaptation alerts | — | Email | Email + Slack | Custom |
| Team index | — | — | ✓ | ✓ |
| Adaptation board | — | — | ✓ | ✓ |
| SSO | GitHub | GitHub | GitHub + Google | SAML/OIDC |
| Support | Community | Email | Priority | SLA + Dedicated |
| Self-hosted | — | — | — | ✓ |

Reverse trial: 14 days Pro/Team for free on signup.

## CLI Integration

### Authentication

`pioneers login` opens GitHub OAuth flow, stores token in `~/.pioneers/credentials.json`.

### Cloud Backend Mode

```bash
cex config set backend cloud    # Search via api.pioneers.ai
cex config set backend local    # Default, unchanged behavior
```

When `backend=cloud` + valid token: CLI sends requests to `api.pioneers.ai` for search and index sync. Scan always runs locally.

### Freemium Nudge

After `cex scan` (no cloud account):
```
✓ 47 projects indexed locally.
Tip: Share this index with your team → pioneers.ai/teams
```

After `cadp observe` (no cloud account):
```
✓ 12 upstream changes observed.
Tip: Get alerts for upstream changes → pioneers.ai/pro
```

Once per session, non-blocking.

## Cloud Backend Architecture

### API: `api.pioneers.ai`

FastAPI service with three responsibilities:

1. **Hosted Search** — same hybrid search logic, stronger embedding models, no Ollama required
2. **Index Sync** — CLI pushes project metadata (name, language, deps, patterns, summary) on scan. No source code ever.
3. **Adaptation Feed** — observations and assessments synced for team visibility

### Tech Stack

- FastAPI (Python, matches existing projects)
- PostgreSQL + pgvector (replaces SQLite + LanceDB in cloud)
- GitHub OAuth for auth
- Stripe for billing
- Fly.io or Railway for deployment

### Data Flow

```
CLI (local)                          Cloud
─────────                            ─────
cex scan ~/Projects
  → local analysis
  → local index
  → if backend=cloud:
     POST /api/projects/sync   →    PostgreSQL + pgvector

cex search "auth"
  → if backend=cloud:
     GET /api/search?q=auth    →    Hybrid Search (pgvector + FTS)
  → if backend=local:
     local SQLite + LanceDB
```

**Privacy guarantee:** Cloud never receives source code. Only metadata: project name, path, languages, dependencies, patterns, AI summary, tags.

## Dashboard: `app.pioneers.ai`

Next.js web app using the same API as the CLI.

### All Tiers
- Project overview grid with filters (language, framework, pattern)
- Hybrid search with faceted navigation
- Project detail: language distribution, dependency graph, patterns, AI summary

### Pro
- Adaptation timeline (upstream changes with status)
- Alert configuration (repos, relevance thresholds)
- Analytics (scan trends, project growth)

### Team
- Team index (merged index across all members)
- Adaptation board (kanban: observed → assessed → merged, assignees)
- Activity feed (who scanned/assessed/implemented what)
- Member management (invitations, roles: Admin/Member/Viewer)

## Website Pages

### `pioneers.ai/teams`
Conversion page: hero, three feature blocks (shared knowledge base, upstream tracking, CLI integration), pricing table, FAQ (data privacy, self-hosting, cancellation).

### `pioneers.ai/pricing`
Four-column comparison: Free / Pro (Popular badge) / Team (14-day trial badge) / Enterprise (Contact us). Full feature matrix.

### Navigation
Add "Pricing" to main nav between "Products" and "About".
