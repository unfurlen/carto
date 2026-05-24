# Load map from URL hash parameter

## Acceptance criteria

```
Given a URL with a valid map parameter
When the game loads
Then the grid matches the map data regardless of shape (1x1, 1x100, 100x1, etc.)

Given a URL without a map parameter
When the game loads
Then the default 3x3 grass grid is shown

Given a URL with invalid map data
When the game loads
Then a human-readable error message is displayed describing the issue

Given a URL with an empty map value
When the game loads
Then a descriptive error is shown

Given a URL with map data that ends with ";"
When the game loads
Then the grid matches the map data as if the ";" were not present
```

## Workflow notes

- Edge/negative cases captured in ACs when they describe user-verifiable outcomes. User-facing data (like URL content) is acceptable in ACs — implementation internals are not.

## Notes

- Map embedded in URL hash: `carto/#map=ggg,ggg,ggg`
- Commas separate rows, each character is a tile code
- 3x3 grid = `ggg,ggg,ggg` (3 rows of 3 tiles)
- 1x10 grid = `gggggggggg` (1 row of 10 tiles)
- 10x1 grid = `g,g,g,g,g,g,g,g,g,g` (10 rows of 1 tile each)
- `pos` and other future params are ignored when present
- Biome codes defined per-biome task (grass = `g`)
- Error cases to handle: unknown biome code, jagged/uneven rows, empty map data
- Error messages should be specific about what's wrong (e.g. "Unknown biome code 'x'" not just "invalid map")
