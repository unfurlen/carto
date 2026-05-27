# Biome as data-only value object
2026-05-24

Superseded by `2026-05-27-domain-primitives-const-plus-type.md` —
Biome is now a const + type (no class), matching the Move pattern.

Biome is a data-only value object. Behavior belongs in external effect systems (fire propagation, flood simulation, weather), not on the biome itself.

```ts
const BiomeKind = { Grass: "grass", Water: "water" } as const;
type BiomeKind = (typeof BiomeKind)[keyof typeof BiomeKind];

class Biome {
  readonly kind: BiomeKind;
  readonly traversable: boolean;
  readonly moveCost: number;
}
```

The const object pattern provides compile-time feedback (`biome.kind === BiomeKind.Grass`) without runtime overhead. Emoji and display mapping is a rendering concern — the Renderer decides how to visually represent a biome kind.

Tile holds a reference to its Biome instance. The Game interface stays stable as new biomes and biome properties are added.
