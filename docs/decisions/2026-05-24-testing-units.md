# Testing units
2026-05-24

We test at clear interface boundaries:

- **Game** — business logic (grid, tile count, etc.)
- **Render** — visual output (DOM structure, content, styling)
- **Load** (future) — data loading and parsing

These are the only interfaces we test against. Internal details (Tile shape, Game internals) are tested only through these public interfaces.
