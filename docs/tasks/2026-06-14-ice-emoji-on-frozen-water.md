# Ice emoji on frozen water tiles

When snow weather is active, water tiles show 🧊 instead of 🌊.

## Acceptance criteria

**AC #1:** Given a water tile during snow weather, when rendered, the tile displays 🧊.

**AC #2:** Given a water tile during fine weather, when rendered, the tile displays 🌊.

## Design notes

- The existing `data-frozen` attribute on water tiles during snow weather can drive the emoji choice.
- Only the renderer's `renderTile` function needs to change — the emoji lookup becomes weather-aware.

## Implementation notes

- `BIOME_EMOJI` restructured from `Record<value, string>` to `Record<value, string | Record<Weather["value"], string>>` — biome entries can be a static string or a weather-keyed map.
- `renderTile` uses `typeof` to handle both cases: plain strings pass through, maps are indexed by current weather.
- `data-frozen` attribute logic remains separate (CSS concern, not emoji).
