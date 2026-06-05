# Back button with step-based URL

## Acceptance criteria

```
AC #1: Clicking back when currStep is present decrements it.

AC #2: Clicking back when currStep is absent sets currStep to max(0, moves.length - 1).

AC #3: Clicking back when currStep is 0 is a no-op.

AC #4: Clicking back when no moves param exists is a no-op.

AC #5: When currStep is absent from the URL, all moves from motions are applied.

AC #6: When currStep is present, only the first currStep moves are applied.

AC #7: When currStep value is invalid (NaN, negative, not an integer, or greater than moves.length), loading throws an error.

AC #8: The back button is hidden in edit mode (like reset).
```

## Design notes

- `currStep` is optional; defaults to `moves.length` when not in URL (backward compatible).
- `moves` is never truncated — back just decrements currStep.
- Enables future forward/redo button.
- Back button hidden in edit mode (like reset).
- Button rendered below the grid, bottom left.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| #1–#4 | `back()` function with guard, inline logic (no `prevStep` helper). Guard on `moves === undefined` keeps branches clean. |
| #5–#6 | Loader respects `currStep` via `moves.slice(0, step)`. Absent = all moves, present = first N. |
| #7 | `InvalidCurrStepError` + `loadCurrStep` validator (non-negative integer ≤ moves.length). |
| #8 | Back button hidden in edit mode — one-line `display` toggle matching reset pattern. |

**Retrospective:** Should commit after each AC refactor phase (as specified in the workflow) instead of batching. Both sides dropped the ball here — noted for next task.
