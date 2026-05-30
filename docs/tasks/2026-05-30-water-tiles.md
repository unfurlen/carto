# Unvisitable water tiles

## Acceptance criteria

```
AC #1: Given a map containing a water tile (`w`), when rendered, the water tile displays 🌊 and grass tiles display 🌾.
AC #2: Given a player on a grass tile adjacent to a water tile, when clicking the water tile, the URL does not change.
AC #3: Given a URL where the player's start position is a water tile, loading the game throws an error with a message explaining the player cannot start on an unvisitable tile.
AC #4: Given a map containing a water tile, when rendered, the water tile has a distinct background colour from grass tiles.
```

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| AC #1 | Water biome added (`Biome.Water`). Renders with 🌊. URL char `w` mapped in loader. Table test with grass. |
| AC #2 | Water click blocked via `!tile.biome.visitable`. Non-empty hash test (`#hello`). |
| AC #3 | `PlayerOnUnvisitableTileError` thrown by Game constructor when player is on water — covers both initial construction and `applyMove`. Refactored `applyMove` to remove pre-validation visited mutation. |
| AC #4 | `dataset.biome` set on all tiles. CSS `[data-biome="water"]` with blue background (#4a7ab5). Table test for data-biome attribute. |
| Refactor | `Biome` changed from string values to objects with `visitable` property. `BIOME_EMOJI`/`BIOME_ATTR` as `Map<Biome, ...>` in renderer. `tileAt` helper in tests. |---|
