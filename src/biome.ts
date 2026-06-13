export const Biome = {
  Grass: {
    value: "grass",
    mappable: true,
    fine: { safe: true },
    snow: { safe: true },
  },
  Water: {
    value: "water",
    mappable: false,
    fine: { safe: false },
    snow: { safe: true },
  },
} as const;

export type Biome = (typeof Biome)[keyof typeof Biome];
