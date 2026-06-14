# Marsh biome — 2-step traversal, freezes in snow

URL char `m`. Marsh costs 2 moves in fine weather, 1 in snow. Displays 🌿 on brown; frozen marsh shows 🧊 with `data-frozen`. Included in edit mode biome cycle.

**Status: ✅ Complete** (commits ff8f2b0, f4fad3f, e98f95c, d32710a)

## Acceptance criteria

- [x] **AC #1:** Given a map string containing `m`, when loaded, the grid has a marsh tile at the corresponding position.
- [x] **AC #2:** Given a player adjacent to a marsh tile during non-snow weather, when `applyMove` moves onto it, then `moveCount` increases by 2.
- [x] **AC #3:** Given a player adjacent to a marsh tile during snow weather, when `applyMove` moves onto it, then `moveCount` increases by 1.
- [x] **AC #4:** Given a marsh tile rendered, the tile has a brown background.
- [x] **AC #5:** Given a marsh tile during non-snow weather, the tile displays 🌿 and has no `data-frozen`.
- [x] **AC #6:** Given a marsh tile during snow weather, the tile displays 🧊 and has `data-frozen`.
- [x] **AC #7:** Given a marsh tile in edit mode, clicking it cycles to the next biome (grass → water → marsh → grass...).
- [x] **AC #8:** Given the player on a marsh tile, `game.lost` returns `false`.
- [x] **AC #9:** Given a marsh tile, it is mappable (counts toward win condition).

## Design notes

- URL char: `m`
- Fine emoji: 🌿, frozen emoji: 🧊
- Background: `#8b5e3c` (applied only on `[data-visited]`, same as grass pattern)
- Unvisited marsh greys out via `grayscale(100%)` filter (same as all unvisited tiles)
- `applyMove` logic uses biome's per-weather `cost` — no marsh-specific branching in Game
- `BIOME_CYCLE`: `["grass", "water", "marsh"]`
- `BIOME_CHAR` has `marsh: "m"`
- Marsh is safe (`safe: true` in both weathers) and mappable (`mappable: true`)
