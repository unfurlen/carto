# Load player starting position from URL

## Acceptance criteria

```
Given a URL with start=row,col
When the game loads
Then the player appears at that position

Given a URL with start pointing outside the map
When the game loads
Then an error is shown

Given a URL with a malformed start value
When the game loads
Then an error is shown

Given a URL without start
When the game loads
Then the player starts at top-left
```

## Workflow notes

- Start the per-AC micro-cycle with AC #1.
- Format: `start=row,col` (e.g. `#map=ggg,ggg,ggg;start=1,2`).
- Row first, 0-indexed.
- Error messages use the "Failed to load map from URL:" prefix.
- Out of bounds: player position outside tile grid.
- Malformed: non-numeric, missing value, partial (`start=1`).
