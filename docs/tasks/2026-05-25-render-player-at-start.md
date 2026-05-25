# Render player at default starting position

## Acceptance criteria

```
Given a freshly loaded game
When the grid is displayed
Then only the top-left tile shows the player indicator
```

## Workflow notes

- One AC — implement, test, refactor, then done.
- Player visual indicator: golden border on the tile (CSS outline).
- Player starts at (row 0, column 0) — top-left.
- Player occupies exactly one tile.
