# Biome cycling in edit mode

## Acceptance criteria

```
AC #1: In edit mode, clicking a tile cycles its biome to the next biome in the cycle (Grass → Water → ...).
AC #2: In edit mode, clicking a tile does not move the player (no move appended to URL).
AC #3: Clicking a tile in edit mode updates the map in the URL to reflect the new biome.
```

## Design notes

- Cycle order matches the `BIOME_CYCLE` array in the renderer (extensible for future biomes).
- A `replaceTile(hash, row, col, char)` helper in `navigate.ts` parses the `map` param, swaps the character at the given position, and returns the updated hash.
- A `BIOME_CHAR` lookup maps biome values back to URL characters (reverse of the loader's `BIOME_MAP`).
- In edit mode, tile click handler cycles the biome and updates the URL; the player movement handler is bypassed.
- URL is the source of truth — hashchange re-renders with the new tile.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
| AC #1, #2, #3 | `replaceTile` in navigate.ts with `"ggg,ggg,ggg"` default via `??`. `BIOME_CYCLE`/`BIOME_CHAR` in renderer. Edit mode click handler cycles biome and returns early to skip movement. |
