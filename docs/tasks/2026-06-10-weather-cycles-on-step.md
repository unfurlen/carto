# Weather cycles on each step

## Acceptance criteria

**AC #1:** Given a multi-char `weather` string and no moves, when the page renders, then the first weather icon is highlighted.

**AC #2:** Given a multi-char `weather` string with `moves` applied, when the page renders, then the weather icon at `moveCount % weather.length` is highlighted — including wrapping back to index 0 after exceeding the array length.

## Design notes

- Highlight = a `data-weather-current` attribute on the active icon, styled to stand out.
- The current weather index is derived from `moveCount % weather.length` on the Game object.
- Full weather sequence is still displayed; only the active icon changes visually.

## Retrospective

### Outcomes

- Added `currentWeatherIndex` getter to `Game` (`moveCount % weather.length`).
- `renderWeather` sets `data-weather-current` via `toggleAttribute` on the matching icon.
- CSS styles the active icon with a golden outline (`#b8860b`) and lighter background.
- Added parameterized tests for `Game.currentWeatherIndex` and a single renderer test confirming it respects the game value.

### Key decisions

- Weather index logic lives on Game, not the renderer (separation of concerns).
- Renderer test kept minimal — just confirms `data-weather-current` maps to `currentWeatherIndex`.
- Followed existing conventions: `toggleAttribute`, golden `#b8860b` accent.

### Friction

- `applyMove` silently dropped `weather` — bug found visually, not by tests. This is a recurring risk whenever new properties are added to Game.
- Started with a standalone AC #1 test and a parameterized AC #2 set, but collapsed into one parameterized set when they tested the same path.
- Had to circle back to add CSS styling — the attribute alone doesn't highlight anything.
- Created `docs/questions/applymove-property-carryover.md` to track the `applyMove` gap.
