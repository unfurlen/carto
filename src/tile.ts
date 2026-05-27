import { Biome } from "./biome";

export class Tile {
	readonly biome: Biome;

	constructor(biome?: Biome) {
		this.biome = biome ?? Biome.Grass;
	}
}
