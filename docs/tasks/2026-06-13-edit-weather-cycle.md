# Edit weather cycle

In edit mode, the weather row gets + and – buttons to add/remove weather items. Clicking + appends a Fine (☀️) item. Clicking – removes the rightmost item, with a minimum of one.

## Acceptance criteria

- [x] **AC #1:** Given the page is in edit mode, when the + button next to the weather row is clicked, then a ☀️ icon appears at the right end of the weather sequence.
- [x] **AC #2:** Given the page is in edit mode with a weather sequence of more than one icon, when the – button next to the weather row is clicked, then the rightmost icon disappears from the sequence.
- [x] **AC #3:** Given the page is in edit mode with a weather sequence of exactly one icon, when the – button next to the weather row is clicked, then the sequence is unchanged.
- [x] **AC #4:** Given the page is in play mode, when the page renders, then no + or – buttons are visible near the weather row.

## Implementation notes

- Added `addWeather` and `removeWeather` functions in `navigate.ts` — append `f` to the weather param / remove the last character (no-op when length ≤ 1)
- Added ➖ (left) and ➕ (right) buttons inside `[data-weather]` rendered by `renderWeather()`, visible only in edit mode
- Pulled weather row out of the game container into a sibling inside a `[data-game]` wrapper so the weather row stays centered in the viewport even when wider than the grid
- Weather buttons styled consistently with other edit buttons (cursor, drop-shadow, no text selection)
- Gap between weather row items increased from 4px to 8px

## Retro

AI agents consistently forget to run lint/typecheck/coverage before calling work done. Added `npm run check` script and updated `AGENTS.md` to make final verification a single, non-optional step.
