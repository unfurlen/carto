# Render a row of tiles

## Acceptance criteria

```
Given a user visits index.html
When the page loads
Then it shows 3 tiles in a horizontal row
```

## Workflow notes

- "Status:" field dropped from task files — adds no value.
- `render` moved from main.ts to its own renderer.ts. Decision: separate rendering from application entry point.
- Game introduced as top-level domain object so render signature stays stable.
- Biome prefixed unused `tile` loop variable with `_` — acceptable for now since Tile is empty.
