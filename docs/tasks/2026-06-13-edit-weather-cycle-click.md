# Edit weather cycle — click icon to cycle

In edit mode, clicking a weather icon cycles it to the next weather type. Fine (☀️) → Snow (❄️) → Fine (☀️) etc.

## Acceptance criteria

**AC #1:** Given the page is in edit mode with multiple weather icons displayed, when a weather icon is clicked, then that icon cycles to the next weather type, the URL `weather` param updates to reflect the change, and other icons are unaffected.

**AC #2:** Given the page is in play mode with weather icons displayed, when a weather icon is clicked, then the URL does not change.

## Implementation notes

- Added `replaceWeather(hash, index, char)` in `navigate.ts` (follows `replaceTile` pattern, defaults weather to `"f"`).
- Added `WEATHER_CYCLE`/`WEATHER_CHAR` constants and a click handler on weather icons in `renderer.ts` — cycle logic mirrors biome cycling in `handleEditTileClick`.
- Weather icons only get click handlers in edit mode — play mode AC satisfied by omission.
- Reordered constants in renderer.ts to group all biome constants together and all weather constants together.

## Retro

- The refactor skill previously had a tendency to dismiss improvements as "not worth it". Updated the skill to push for actively finding improvements — the constant reordering was a tangible result of this change.
