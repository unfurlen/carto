# Forward button (redo)

## Acceptance criteria

```
AC #1: Clicking forward when currStep < moves.length increments currStep by 1.

AC #2: Clicking forward when currStep === moves.length is a no-op.

AC #3: Clicking forward when no currStep param exists is a no-op.

AC #4: Clicking forward when no moves param exists is a no-op.

AC #5: The forward button is hidden in edit mode (like back and reset).
```

## Design notes

- Always visible (same as back button), no-op at max.
- Button rendered below the grid, bottom right.
- `data-forward` attribute for the button element.
- `forward(hash)` function in navigate.ts — counterpart to `back()`.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| #1 | `forward()` increments currStep. Minimal — no guards beyond what the test required. |
| #2 | Added bounds check: no-op when `currStep >= moves.length`. |
| #3 | Added guard for absent `currStep` — early return before any moves lookup. |
| #4 | Guard on `moves === undefined` (same pattern as `back()`). Also covers `currStep` present but no moves. |
| #5 | Forward button rendered with `data-forward`, hidden in edit mode. Mirror of back button code. Click test was added out of order — broke red-green discipline. |

**Retrospective:** Red-green discipline slipped — wrote the click test after the implementation was already live. Also, the refactor skill was too narrowly scoped to new lines; updated it to also check for growing complexity in functions touched by the AC's changes.
