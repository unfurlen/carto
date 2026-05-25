# Data attributes for tile state
2026-05-25

Tile state is communicated via `data-` attributes on tile elements, not CSS class names.

- `dataset.tile = "true"` marks a tile element (replaces `className = "tile"`)
- `dataset.player = "true"` marks the tile containing the player
- Future state (biome type, explored/blocked, entity presence) also gets `data-` attributes

CSS targets tile elements via attribute selectors: `[data-tile] { }`, `[data-player] { }`.

This separates concerns: data attributes carry game state, CSS attributes style based on that state. No mixing of presentation classes and state flags in a single className string.
