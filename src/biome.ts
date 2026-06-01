export const Biome = {
  Grass: { value: "grass", visitable: true },
  Water: { value: "water", visitable: false },
} as const;

export type Biome = (typeof Biome)[keyof typeof Biome];
