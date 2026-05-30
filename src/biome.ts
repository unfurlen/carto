export const Biome = {
  Grass: { visitable: true },
  Water: { visitable: false },
} as const;

export type Biome = (typeof Biome)[keyof typeof Biome];
