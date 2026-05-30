import { Biome } from "./biome";

export class Tile {
	readonly biome: Biome;
	visited: boolean;

	constructor(biome?: Biome, visited?: boolean) {
		this.biome = biome ?? Biome.Grass;
		this.visited = visited ?? false;
	}
}
