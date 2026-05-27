# Loader domain helpers
2026-05-27

`load()` is a straight pipeline: `parseParams(hash)` → `loadMap`, `loadPlayer`, `loadMoves`
(each receiving `string | undefined` from `params.get()`) → `new Game(tiles, player)` →
`moves.reduce((g, m) => g.applyMove(m), game)`.

Each `load*` function handles the `undefined` case (returns `undefined` or `[]`), keeping
the pipeline free of ternaries and `let`.
