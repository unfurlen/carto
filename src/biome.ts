export const BiomeKind = { Grass: "grass" } as const;
export type BiomeKind = (typeof BiomeKind)[keyof typeof BiomeKind];

export class Biome {
	readonly kind: BiomeKind;

	constructor(kind: BiomeKind) {
		this.kind = kind;
	}
}
