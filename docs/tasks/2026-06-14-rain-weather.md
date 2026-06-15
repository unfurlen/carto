# Rain weather type — load, render, edit cycle

Add rain as a weather type (URL char `r`, emoji 🌧️). No gameplay effects yet — just loading from URL, rendering, and cycling in edit mode. Weather cycle becomes `fine → snow → rain → fine`.

## Acceptance criteria

**AC #1:** Given a URL containing `weather=r`, when the game loads and renders, the weather icons include rain and the rain icon displays 🌧️.

**AC #2:** Given a game where rain is the current weather, when rendered, the rain weather icon has `data-weather-current`.

**AC #3:** Given edit mode, when clicking a weather icon repeatedly, it cycles through fine → snow → rain → fine.

## Design notes

- URL char: `r`
- Emoji: 🌧️
- Weather cycle: `["fine", "snow", "rain"]`
- No movement cost or biome interaction changes

## Reflection

- Switched from `npm test` to `npm run check` (coverage + lint + typecheck) as the verification step during TDD cycles — catches type/lint errors early. The red skill SKILL.md was updated accordingly.
- AC #2 was already covered by the existing generic `data-weather-current` test — no separate test needed.
- Adding a new weather type cascades through `Weather`, `Biome` (all weather-keyed properties), loader, and renderer constants. The type system enforces completeness, which is good but means the green phase for a single AC touches many files. Writing AC #3's test before implementing made sense since the type system forced updating WEATHER_CYCLE/WEATHER_CHAR alongside AC #1's changes.
