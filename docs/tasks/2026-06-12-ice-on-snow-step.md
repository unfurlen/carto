# Ice on snow step

Water is only traversable without penalty when the current weather is snow (frozen/ice).

## Acceptance criteria

**AC #1:** Given the player is on a water tile and the current weather is snow, when `game.lost` is checked, then it returns `false`.

**AC #2:** Given the player is on a water tile and the current weather is not snow, when `game.lost` is checked, then it returns `true`.

**AC #3:** Given the player is on a grass tile, when `game.lost` is checked, then it returns `false` regardless of the current weather.

**AC #4:** Given the current weather is snow, when a water tile is rendered, then it has a `data-frozen` attribute.

**AC #5:** Given the current weather is not snow, when a water tile is rendered, then it does not have a `data-frozen` attribute.

## Design notes

- Pure Game-level change — the `lost` getter needs to account for `currentWeatherIndex` and the weather array.
- No renderer changes needed: `data-lost` and click-blocking already read `game.lost`.
- No biome changes needed — `visitable` and `mappable` stay as-is.
- Water is still always walkable (AC #1 of the previous task) — this task only affects whether being on water triggers the lost state.

## Retrospective

### Outcomes

- Replaced flat `visitable` on `Biome` with per-weather `safe` properties and top-level `mappable`
  - `mappable` is weather-independent — win condition never changes with weather
  - `safe` is weather-dependent — the `lost` getter is now a pure weather-keyed lookup
- Added `data-frozen` attribute and CSS styling for water tiles during snow weather
- Updated test descriptions from "visitable" to "mappable" to match the new domain model

### Key decisions

- **Domain logic belongs in the biome, not the game.** The `lost` getter was the right place to trigger the question, but the answer (`!== Weather.Snow`) leaked weather knowledge into Game. Moved to per-weather properties declared in each biome descriptor.
- **`data-frozen` over emoji swap.** Keeping 🌊 consistent avoids confusing the player — the biome emoji communicates the tile type, not the weather condition.
- **`npx` considered harmful.** Switched to `npm run <script>` for all project commands to avoid unnecessary downloads and reduced security surface. Documented in AGENTS.md.

### What improved

- AGENTS.md gained two notes: prefer `lint:write` over manual formatting, and prefer `npm run` over `npx`.
- Biome is now extensible — adding a new weather type means declaring per-weather properties in each biome, with zero Game-level changes.
