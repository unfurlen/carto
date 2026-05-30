export const Biome = { Grass: "grass", Water: "water" } as const;
export type Biome = (typeof Biome)[keyof typeof Biome];
