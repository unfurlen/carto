import { Player } from "./player";
import { Tile } from "./tile";

export const DEFAULT_GRID_SIZE = 3;

export class EmptyMapError extends Error {
	constructor() {
		super("Failed to construct game: map data is empty");
	}
}

export class UnevenRowsError extends Error {
	constructor() {
		super("Failed to construct game: map rows have uneven lengths");
	}
}

export class Game {
	readonly tiles: Tile[][];
	readonly player: Player;

	get rows(): number {
		return this.tiles.length;
	}

	get columns(): number {
		return this.tiles[0].length;
	}

	get totalTiles(): number {
		return this.tiles.reduce((sum, row) => sum + row.length, 0);
	}

	constructor(tiles?: Tile[][]) {
		this.player = new Player(0, 0);
		if (tiles) {
			if (tiles.length === 0) {
				throw new EmptyMapError();
			}
			const firstLen = tiles[0].length;
			if (firstLen === 0) {
				throw new EmptyMapError();
			}
			if (tiles.some((row) => row.length !== firstLen)) {
				throw new UnevenRowsError();
			}
			this.tiles = tiles;
		} else {
			this.tiles = this.defaultGrid();
		}
	}

	private defaultGrid(): Tile[][] {
		return Array.from({ length: DEFAULT_GRID_SIZE }, () =>
			Array.from({ length: DEFAULT_GRID_SIZE }, () => new Tile()),
		);
	}
}
