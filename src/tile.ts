import { Biome } from "./biome";

export class Tile {
  readonly biome: Biome;
  readonly visited: boolean;
  readonly flooded: boolean;

  constructor(biome?: Biome, visited?: boolean, flooded?: boolean) {
    this.biome = biome ?? Biome.Grass;
    this.visited = visited ?? false;
    this.flooded = flooded ?? false;
  }
}
