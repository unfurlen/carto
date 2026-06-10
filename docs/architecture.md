# Carto — Architecture

## Overview

Carto is a tile-based grid exploration game. The entire application state is
driven by URL hash parameters. Every interaction updates the hash, which
triggers a full re-render via the `hashchange` event.

## Data flow

```
URL hash  ──>  load(hash)  ──>  Game  ──>  render(game)  ──>  DOM
   ▲                                                              │
   └────────────────── click handlers update hash ────────────────┘
```

1. User changes URL hash (or clicks the page) → `hashchange` event fires.
2. `main.ts` calls `load(hash)` from `loader.ts`.
3. `load()` parses hash params via `parseParams()`, validates them, and
   constructs a `Game` object (tiles, player, moves, weather, etc.).
4. `render(game)` in `renderer.ts` builds DOM elements from the Game.
5. Click handlers on DOM elements call functions in `navigate.ts` to update
   the URL hash, which triggers step 1 again.

## Modules

### `main.ts` (entry point)
- On load and `hashchange`, calls `load(hash)` then `render(game)`.
- Catches errors from `load()` and displays the error message in the app.

### `params.ts`
- Exports `parseParams(hash: string): Map<string, string>`.
- Splits hash string on `;` then `=` to produce key-value pairs.
- Used by `loader.ts` (and occasionally `renderer.ts`) to read URL state.

### `loader.ts`
- Exports `load(hash: string): Game` and error classes.
- Extracts `map`, `start`, `moves`, `currStep`, `weather` from params.
- Validates each param and throws descriptive errors for invalid values.
- Applies moves up to `currStep` to produce the final Game state.

### `game.ts`
- Core `Game` class. Default values (grid size, player position, weather, etc.)
  are assigned in the constructor when not provided.
  - `tiles: Tile[][]` — the grid
  - `player: Player` — current position
  - `moveCount: number` — number of moves applied
  - `weather: string` — weather cycle pattern (defaults to `"f"`)
- Computed properties: `rows`, `columns`, `totalTiles`, `won`.
- `applyMove(move)` returns a new Game with the move applied.
- Validates tile evenness, player bounds, and unvisitable tiles on construction.

### `renderer.ts`
- Exports `render(game: Game): HTMLDivElement`.
- Builds the full page DOM: header, grid, nav row, edit controls.
- Uses `data-*` attributes for CSS and test targeting.
- Click handlers delegate to `navigate.ts` or edit mode logic.

### `navigate.ts`
- Pure URL string manipulation functions (no DOM or game logic).
- Each function takes a hash string and returns the updated hash.
- Functions: `appendMove`, `back`, `forward`, `clearMoves`, `toggleEdit`,
  `replaceTile`, `replaceStart`, `setPlaceStart`, `addRow`, `addColumn`,
  `removeRow`, `removeColumn`, `replaceWeather`.

### `tile.ts`
- `Tile` class with `biome: Biome` and `visited: boolean`.

### `biome.ts`
- Biome constants (`Grass`, `Water`) with `value` and `visitable` properties.

### `player.ts`
- `Player` class with `row` and `col`.

### `move.ts`
- `Move` enum: `North`, `East`, `South`, `West`.

## URL parameters

| Param | Default | Example | Description |
|-------|---------|---------|-------------|
| `map` | 3×3 grass | `gwg,gwg,gwg` | Grid layout, comma-separated rows |
| `start` | `0,0` | `1,2` | Player start position `row,col` |
| `moves` | (empty) | `nese` | Move sequence (n/e/s/w) |
| `currStep` | moves length | `2` | How many moves are applied |
| `edit` | (absent) | `true` | Toggle edit mode |
| `placeStart` | (absent) | `true` | Toggle place-start mode |
| `weather` | `f` | `fsfs` | Weather cycle pattern (f=☀️, s=❄️) |

## Emoji legend

| Icon | Meaning |
|------|---------|
| 🌱 | Grass tile |
| 🌊 | Water tile |
| ☀️ | Sunny weather |
| ❄️ | Snowy weather |
| 👣 | Step counter |
| 🔁 | Reset button |
| ✏️ | Edit toggle |
| ◀ ▶ | Back/Forward nav |
| ➕ | Add row/column |
| ➖ | Remove row/column |

## Test structure

Tests live in `src/*.test.ts` alongside the modules they test. Vitest is the
test runner. Tests use `describe`/`it` blocks and follow the standard pattern.

- `game.test.ts` — Game construction, moves, visited tracking, win condition
- `loader.test.ts` — URL parsing, validation, error handling
- `renderer.test.ts` — DOM output, click behavior, attribute assertions
- `navigate.test.ts` — URL string manipulation
