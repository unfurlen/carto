import { Biome, BiomeKind } from "./biome";

export class Tile {
	readonly biome: Biome;

	constructor() {
		this.biome = new Biome(BiomeKind.Grass);
	}
}
