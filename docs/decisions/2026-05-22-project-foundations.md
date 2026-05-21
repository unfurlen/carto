# Project foundations

**Date:** 2026-05-22

## Decisions

### MIT license
Standard permissive license. Simple, widely used, no restrictions on use.

### Bare HTML for Hello World
No framework, no build tool. Purpose was to publish a simple page on GitHub Pages. Adding a framework would be over-engineering for this step.

### GitHub Pages from root
Using `main` branch root as the Pages source. No GitHub Actions workflow needed for static content.

### Task log format
- `docs/tasks.md` — simple checklist of all tasks
- `docs/tasks/YYYY-MM-DD-description.md` — one file per task with details and workflow notes

### Decision records
- `docs/decisions/YYYY-MM-DD-title.md` — to capture rationale for significant choices
