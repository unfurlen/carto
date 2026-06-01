# Win condition: visit all visitable tiles

## Acceptance criteria

```
AC #1: Given a game where not all visitable tiles have been visited, the game is not won.
AC #2: Given a game where all visitable tiles have been visited, the game is won.
AC #3: When the game is in a won state, the grid has a CSS visual effect indicating the win.
```

## Design notes

- Game exposes a `won` property (boolean) — domain logic, not in renderer.
- The renderer sets a data attribute on the grid container when `game.won` is true.
- CSS targets `[data-won]` for the visual effect.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| All 3 ACs | `Game.won` getter, `data-won` attribute, CSS golden glow. Refactored 3 if-block dataset assignments to `toggleAttribute` alongside. |
