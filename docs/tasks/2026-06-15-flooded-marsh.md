# Flooded marsh — rain causes marsh tiles to flood when adjacent to water

During rain weather, marsh tiles adjacent to water (or already flooded marsh) become flooded. Flooded marsh acts like water (unsafe in fine weather) but remains mappable and shows 🌊. Flooding persists until a recede task is implemented. Edit mode ignores flooding entirely.

## Acceptance criteria

- [x] **AC #1:** Given a game where rain is the current weather and a marsh tile is horizontally or vertically adjacent to a water tile, the marsh tile is flooded.

- [x] **AC #2:** Given a game where rain is the current weather and a marsh tile has no water or flooded marsh neighbor, the marsh tile is not flooded.

- [x] **AC #3:** Given a game where rain is the current weather and a marsh tile is flooded (adjacent to water), when a move is applied that results in rain remaining the current weather, a marsh tile adjacent to the now-flooded marsh (but not to water) also becomes flooded.

- [x] **AC #4:** Given a game where rain is not the current weather, a marsh tile adjacent to water is not flooded.

- [x] **AC #5:** Given a flooded marsh tile rendered, the tile displays 🌊.

- [ ] **AC #6:** Given a player on a flooded marsh tile during fine weather, the game is lost.

- [ ] **AC #7:** Given a flooded marsh tile, it is mappable (counts toward win).

- [ ] **AC #8:** Given edit mode, a marsh tile adjacent to water is not flooded.

- [x] **AC #9:** Given a game where rain is the current weather and a marsh tile is two tiles from water (separated by another marsh tile), the marsh tile two tiles from water is not flooded — water spreads only one tile per pass.

## Progress

### Done
- AC #1, #2, #4, #9 — game logic (flood detection, no cascade in single pass)
- AC #3 — cascade flooding across subsequent rain moves (collect-then-apply pattern)
- AC #5 — renderer: 🌊 emoji, `data-flooded` attribute, CSS brown background
- `flooded` boolean on `Tile` (readonly), constructor accepts optional `flooded`
- `Game` constructor: `visitPlayerTile()` and `applyFlooding()` extracted as private methods
- Renderer uses `Biome` reference comparisons instead of string literals

### Remaining
- AC #6 — player on flooded marsh during fine = lost
- AC #7 — flooded marsh is mappable (already `mappable: true`, verify counts toward win)
- AC #8 — edit mode ignores flooding

## Design notes

- Flooding is a `flooded` boolean flag on marsh `Tile` instances, not a new biome.
- Computed fresh each time rain becomes the current weather: on initial game construction if `currentWeatherIndex` points to rain, and before each `applyMove` when rain is the weather at the current step before the move.
- Flooding algorithm: one pass — scan all marsh tiles, if a marsh is adjacent (N/E/S/W) to a water tile or already-flooded marsh tile, mark it flooded. Then apply all marks simultaneously (no cascading within the same pass).
- Flooded marsh: acts like water (safe: false in fine, safe: true in snow, cost: 1), but `mappable: true`.
- Persists across weather changes until a recede task handles cleanup.
- Rendered with 🌊 on brown background (`#8b5e3c`), `data-biome=marsh`, `data-flooded`.
- URL char still `m` — flooding is derived from weather + layout, not serialised.
- Edit mode: no flooding, regardless of weather.
