# Is the renderer doing too much?

The renderer (`src/renderer.ts`) handles player movement logic — deciding which adjacent tiles the player can move to based on click position:

```ts
const dr = r - game.player.row;
const dc = c - game.player.col;
if (dr === -1 && dc === 0) {
  window.location.hash = appendMove(window.location.hash, "n");
} else if (dr === 1 && dc === 0) {
  window.location.hash = appendMove(window.location.hash, "s");
} ...
```

This is game logic leaking into the view layer. Currently acceptable — the game model is simple and the movement rules are trivial. Worth splitting out if/when movement gets more complex (e.g., pathfinding, constraints, validation).

Flagged: 2026-06-05
