export const Biome = { Grass: "grass" } as const;
export type Biome = (typeof Biome)[keyof typeof Biome];
