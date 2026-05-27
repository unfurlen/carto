# Domain primitives as const + type
2026-05-27

Supersedes `2026-05-24-biome-value-object.md` — Biome is now a const + type
(no class), matching the Move pattern.

Biome and Move use the same pattern: `export const X = { ... } as const` followed by
`export type X = (typeof X)[keyof typeof X]`. No class wrapper, no separate `Kind`/`Type`
suffix. The const provides named values (`Biome.Grass`, `Move.North`); the type is the
string union (`"grass"`, `"n" | "e" | "s" | "w"`).

Adding a new value means: add a key to the const, add a case to any switch over the type.
TypeScript enforces exhaustiveness.
