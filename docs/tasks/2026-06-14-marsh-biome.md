# Marsh biome — 2-step traversal, freezes in snow

URL char `m`. Marsh costs 2 moves in fine weather, 1 in snow. Displays 🟦 on brown; frozen marsh shows 🧊 with `data-frozen`. Included in edit mode biome cycle.

## Acceptance criteria

**AC #1:** Given a map string containing `m`, when loaded, the grid has a marsh tile at the corresponding position.

**AC #2:** Given a player adjacent to a marsh tile during non-snow weather, when `applyMove` moves onto it, then `moveCount` increases by 2.

**AC #3:** Given a player adjacent to a marsh tile during snow weather, when `applyMove` moves onto it, then `moveCount` increases by 1.

**AC #4:** Given a marsh tile rendered, the tile has a brown background.

**AC #5:** Given a marsh tile during non-snow weather, the tile displays 🟦 and has no `data-frozen`.

**AC #6:** Given a marsh tile during snow weather, the tile displays 🧊 and has `data-frozen`.

**AC #7:** Given a marsh tile in edit mode, clicking it cycles to the next biome (grass → water → marsh → grass...).

**AC #8:** Given the player on a marsh tile, `game.lost` returns `false`.

**AC #9:** Given a marsh tile, it is mappable (counts toward win condition).

## Design notes

- URL char: `m`
- Emoji: 🟦 on brown background (`#8B5E3C` or similar)
- Frozen marsh: 🧊 with `data-frozen`, same brown background
- `applyMove` logic becomes weather-aware for movement cost
- `BIOME_CYCLE` grows to `["grass", "water", "marsh"]`
- `BIOME_MAP` / `BIOME_CHAR` gain a `marsh` → `m` entry
- Marsh is safe (no lost state) and mappable (needed for win)
