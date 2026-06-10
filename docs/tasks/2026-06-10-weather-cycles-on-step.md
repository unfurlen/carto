# Weather cycles on each step

## Acceptance criteria

**AC #1:** Given a multi-char `weather` string and no moves, when the page renders, then the first weather icon is highlighted.

**AC #2:** Given a multi-char `weather` string with `moves` applied, when the page renders, then the weather icon at `moveCount % weather.length` is highlighted — including wrapping back to index 0 after exceeding the array length.

## Design notes

- Highlight = a `data-weather-current` attribute on the active icon, styled to stand out.
- The current weather index is derived from `moveCount % weather.length` on the Game object.
- Full weather sequence is still displayed; only the active icon changes visually.
