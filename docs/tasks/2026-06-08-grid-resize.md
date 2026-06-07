# Grid resize in edit mode

## Acceptance criteria

```
AC #1: In edit mode, a ➕ below the grid adds a grass row at the bottom.

AC #2: In edit mode, a ➕ to the right of the grid adds a grass column at the right.

AC #3: In edit mode, a ➖ to the left of the last row removes it.

AC #4: In edit mode, a ➖ above the last column removes it.

AC #5: Removing a row/column when at min size (1) is a no-op.

AC #6: Adding a row/column when at max size (100) is a no-op.
```

## Design notes

- Buttons only visible in edit mode.
- New tiles are grass.
- Min: 1×1, Max: 100×100.
- Emoji-only, no text.
