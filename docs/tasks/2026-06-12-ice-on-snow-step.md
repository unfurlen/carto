# Ice on snow step

Water is only traversable without penalty when the current weather is snow (frozen/ice).

## Acceptance criteria

**AC #1:** Given the player is on a water tile and the current weather is snow, when `game.lost` is checked, then it returns `false`.

**AC #2:** Given the player is on a water tile and the current weather is not snow, when `game.lost` is checked, then it returns `true`.

**AC #3:** Given the player is on a grass tile, when `game.lost` is checked, then it returns `false` regardless of the current weather.

## Design notes

- Pure Game-level change — the `lost` getter needs to account for `currentWeatherIndex` and the weather array.
- No renderer changes needed: `data-lost` and click-blocking already read `game.lost`.
- No biome changes needed — `visitable` and `mappable` stay as-is.
- Water is still always walkable (AC #1 of the previous task) — this task only affects whether being on water triggers the lost state.
