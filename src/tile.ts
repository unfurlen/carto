import { Biome, BiomeKind } from "./biome";

export class Tile {
	readonly biome: Biome;

	constructor(biome?: Biome) {
		this.biome = biome ?? new Biome(BiomeKind.Grass);
	}
}
