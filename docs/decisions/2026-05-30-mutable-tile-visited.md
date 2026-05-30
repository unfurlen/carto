# Mutable `visited` on Tile
2026-05-30

`Tile.visited` is mutable (not `readonly`) — the constructor and `applyMove` set
it directly by assignment, replacing the earlier immutable approach that cloned
the tile array on each move.

**Rationale:** Game instances are ephemeral — `applyMove` returns a new Game and
the previous one is discarded. There is no game-history feature that would
require preserving past tile state, so the immutability overhead (array map +
tile clone on every move) provided no real benefit. Direct mutation keeps the
code simple without introducing shared-state bugs.
