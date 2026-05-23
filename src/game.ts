import { Tile } from "./tile";

export class Game {
	readonly tiles: Tile[][];

	get rows(): number {
		return this.tiles.length;
	}

	get columns(): number {
		return this.tiles[0].length;
	}

	get totalTiles(): number {
		return this.tiles.reduce((sum, row) => sum + row.length, 0);
	}

	constructor() {
		this.tiles = this.defaultGrid();
	}

	private defaultGrid(): Tile[][] {
		return [
			[new Tile(), new Tile(), new Tile()],
			[new Tile(), new Tile(), new Tile()],
			[new Tile(), new Tile(), new Tile()],
		];
	}
}
