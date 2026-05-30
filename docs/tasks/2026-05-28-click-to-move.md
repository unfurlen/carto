# Click-to-move player

## Acceptance criteria

```
AC #1: Given a cardinally-adjacent tile, when clicked, the URL appends the move.
AC #2: Given a tile that is not cardinally-adjacent (including the player's own tile), when clicked, the URL does not change.
```

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| #1 | `navigate.ts` — `appendMove` using shared `parseParams`. `renderer.ts` — click handler with `data-row`/`data-col`, direction computation. Coverage tooling added. Refactor: `parseParams` extracted to `src/params.ts`, shared between `loader.ts` and `navigate.ts`. |
