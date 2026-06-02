# Reset path on entering edit mode

## Acceptance criteria

```
AC #1: Clicking the pencil in play mode sets edit=true and removes the moves param from the URL.
```

## Design notes

- `toggleEdit` clears the `moves` param when entering edit mode.
- No effect when toggling back to play mode — moves stay cleared.
- The hashchange listener re-renders the game from the updated URL, which has no moves.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| AC #1 | `toggleEdit` deletes `moves` param when entering edit mode. 2 new test cases. |
