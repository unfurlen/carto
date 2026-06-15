export const Biome = {
  Grass: {
    value: "grass",
    mappable: true,
    fine: { safe: true, cost: 1 },
    snow: { safe: true, cost: 1 },
    rain: { safe: true, cost: 1 },
  },
  Water: {
    value: "water",
    mappable: false,
    fine: { safe: false, cost: 1 },
    snow: { safe: true, cost: 1 },
    rain: { safe: false, cost: 1 },
  },
  Marsh: {
    value: "marsh",
    mappable: true,
    fine: { safe: true, cost: 2 },
    snow: { safe: true, cost: 1 },
    rain: { safe: true, cost: 2 },
  },
} as const;

export type Biome = (typeof Biome)[keyof typeof Biome];
