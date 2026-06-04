# Edit start position

## Acceptance criteria

```
AC #1: In edit mode, tapping the current player tile enters "place start" mode — URL param placeStart=true is set.

AC #2: In place-start mode, tapping a visitable tile updates the start param in the URL and removes placeStart.

AC #3: In place-start mode, tapping a water tile is a no-op.

AC #4: In edit mode with place-start active, the player tile has a visual indicator.

AC #5: Tapping the pencil to exit edit mode while in place-start mode also clears placeStart.
```

## Design notes

- `replaceStart(hash, row, col)` helper in navigate.ts to update the `start` param.
- `placeStart=true` param in URL to track sub-mode; cleared on start placement or exiting edit mode.
- Visual indicator: CSS class (e.g., `data-place-start`) on the player tile when sub-mode is active.
- Tapping water in place-start mode is a no-op (same behaviour as biome cycling on water).

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| All 5 ACs | `setPlaceStart`/`replaceStart` in navigate.ts. `data-place-start` CSS with gold pulse animation. `toggleEdit` clears `placeStart`. |
