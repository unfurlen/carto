# Grid resize in edit mode

## Acceptance criteria

```
AC #1: In edit mode only, a ➕ appears below the grid. Clicking it adds a grass row at the bottom.

AC #2: In edit mode only, a ➕ appears to the right of the grid. Clicking it adds a grass column at the right.

AC #3: In edit mode only, a ➖ appears to the left of the last row. Clicking it removes the last row.

AC #4: In edit mode only, a ➖ appears above the last column. Clicking it removes the last column.

AC #5: Removing a row/column when at min size (1) is a no-op.

AC #6: Adding a row/column when at max size (100) is a no-op.
```

## Design notes

- Buttons only visible in edit mode.
- New tiles are grass.
- Min: 1×1, Max: 100×100.
- Emoji-only, no text.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| #1 | `addRow(hash)` appends a grass row. Follows `replaceTile` pattern (`params.get("map") ?? "ggg,ggg,ggg"`). Button rendered with `data-add-row`, visible only in edit mode. |
| #2 | `addColumn(hash)` appends grass to each row. Button rendered to right of grid via absolute positioning so it doesn't shift container width. `[data-grid-row]` wrapper added for layout. |
| #3 | `removeRow(hash)` pops last row. Button positioned to left of grid, centered on last row via `top: calc(100% - 30px); transform: translateY(-50%)`. |

**Retrospective:** Enabled TypeScript `strict: true` — caught 6 test calls passing an unused 2nd argument to `render()`, and forced the `addRow` no-map fallback to be properly tested instead of an uncovered branch. Consider starting new sessions more frequently for agent and skill freshness.
