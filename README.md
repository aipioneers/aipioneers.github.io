# pioneers.ai

The website for [AI Pioneers](https://pioneers.ai) — open-source AI developer tools.

## Local Development

```bash
# Install Hugo (macOS)
brew install hugo

# Start dev server
hugo server -D

# Open in browser
open http://localhost:1313
```

## Adding a Project

Create a YAML file in `data/projects/`:

```yaml
name: my-tool
slug: my-tool
tagline: "Short description of the tool."
status: active    # active | beta | planned | archived
url: "https://mytool.pioneers.ai"
github: "https://github.com/aipioneers/my-tool"
language: Python
install: "pip install my-tool"
featured: true
sort_order: 10
category: "CLI Tools"
```

## Adding a Blog Post

```bash
hugo new blog/my-post.md
# Edit content/blog/my-post.md
# Set draft: false when ready
```

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions to GitHub Pages.

## License

MIT
