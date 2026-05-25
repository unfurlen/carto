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

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| #1 start loads player | Straightforward — parsed `start=row,col`, constructed `Player`. |
| #2 out of bounds | Straightforward — `PlayerOutOfBoundsError` with position in message. |
| #3 malformed start | Needed `/^\d+,\d+$/` regex — split+parseInt silently accepted `1,2fds`. |
| #3 bug (start w/o map) | Loader returned early on absent `map` before parsing `start`. Fixed by refactoring to single `new Game()` call. |
| #4 no start → (0,0) | Already covered by existing tests. |
