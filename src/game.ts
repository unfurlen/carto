import { Tile } from "./tile";

export class Game {
	readonly tiles: Tile[];

	constructor(tiles?: Tile[]) {
		this.tiles = tiles ?? [new Tile(), new Tile(), new Tile()];
	}
}
