# Reset button

## Acceptance criteria

```
AC #1: Clicking the reset button clears the moves param from the URL.

AC #2: The reset button is hidden when edit mode is active.
```

## Design notes

- Button placed in the header, left of the step counter.
- One-click reset, no confirmation (browser back navigation can undo).
- Hidden via `display: none` when edit mode is active.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| All 2 ACs | `clearMoves` in navigate.ts. Reset button 🔁 in header, `display: none` in edit mode. |
