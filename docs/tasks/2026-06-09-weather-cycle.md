# Weather cycle display

## Acceptance criteria

**AC #1:** Given no `weather` param, when the page renders, then a single ☀️ icon is displayed at the top of the page (defaults to `f`).

**AC #2:** Given a valid `weather` string (e.g. `fsfs`), when the page renders, then each character is shown as its corresponding icon in sequence at the top of the page (`f` → ☀️, `s` → ❄️).

**AC #3:** Given a `weather` string containing an unknown character (e.g. `fxs`), when the page renders, then an error is displayed.

## Design notes

- Read-only display (no click interaction yet).
- No progression tie-in to moves/steps yet.
- Row sits at the top of the page, above all other UI.
- Emoji-only, no text labels.

## Worklog

| AC | Highlights / Exceptions |
|---|---|---|
| #1 | Created `Weather` domain object (`src/weather.ts`) following `Biome`/`Move` pattern. Game stores `weather: Weather[]` defaulting to `[Weather.Fine]`. Renderer maps `Weather.Fine` → ☀️ via `WEATHER_EMOJI`. Weather icons styled as small centered tiles with dark background and shadow. |
| #2 | Added `Weather.Snow`. Game constructor accepts 4th param `weather?: Weather[]`. Loader parses `weather` URL param via `WEATHER_MAP` and `loadWeather()`. Renderer maps `snow` → ❄️. |
| #3 | Added `InvalidWeatherCharacterError` following `InvalidMapCharacterError` pattern. `loadWeather` throws on unknown chars. |

**Retrospective:** Created `docs/architecture.md` (referenced from `AGENTS.md`) because a new agent session struggled to quickly grasp the full project architecture — module responsibilities, data flow, URL params, and conventions.
