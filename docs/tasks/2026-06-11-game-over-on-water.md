# Game over on entering water

## Acceptance criteria

**AC #1:** Given a water tile adjacent to the player, when the player clicks it, then the move succeeds (player enters the water tile).

**AC #2:** Given the player is on a water tile, when rendered, then the grid has `data-lost` and clicking any tile does not move the player.

## What changed

### AC #1
- Removed `PlayerOnUnvisitableTileError` class and its constructor guard entirely — any tile can now be walked on.
- Removed the `visitable` check in `handlePlayTileClick`.
- Removed the unused `tile` parameter from `handlePlayTileClick`.
- Existing tests: removed `"throws when the player starts on a water tile"`, replaced `"throws when a move lands on a water tile"` with `"applies a move onto a water tile"`, replaced the renderer test for clicking water to expect the URL to change.

### AC #2
- Added `game.lost` getter — true when the player's tile has `visitable: false` (water).
- Added `MovingWhenLostError` — thrown when `applyMove` is called while lost.
- Added `data-lost` attribute on the grid element and a check in `handleTileClick` to block play-mode clicks when lost.
- Added CSS: red box-shadow on the grid, muted red (`rgba(204, 0, 0, 0.6)`) outline on the player tile.

### Kept for the future
- `visitable` property remains (at some point a `mappable` property may be needed to distinguish walkable biomes from win-condition biomes, e.g. frozen water).
- `won` getter still uses `visitable` — water with `visitable: false` is already excluded from the win condition.
