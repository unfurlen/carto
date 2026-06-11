# Should `applyMove` carry over all Game properties by default?

`Game.applyMove` constructs a new `Game` with incremented `moveCount` and
updated `player`, but carries forward `tiles` and (now) `weather`. Other
properties like `weather` were originally silently dropped — a bug only caught
visually, not by tests.

```ts
return new Game(
  this.tiles,
  new Player(nextRow, nextCol),
  this.moveCount + 1,
  // weather was missing here — defaulted to [Fine]
);
```

This suggests a broader question: when new properties are added to `Game`,
`applyMove` needs to be updated in parallel. There's no mechanism to catch
this — no test that verifies `applyMove` preserves all constructor-passed state.

Options to consider:
- A reflection-based test that checks all properties match after `applyMove`
- Make the constructor require explicit values for all properties (no defaults)
- Add a `copy` or `with` method that avoids enumerating properties

Flagged: 2026-06-11
