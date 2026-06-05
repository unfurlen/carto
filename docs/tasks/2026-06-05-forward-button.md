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
