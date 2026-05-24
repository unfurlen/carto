import { describe, expect, it } from "vitest";
import { BiomeKind } from "./biome";
import { DEFAULT_GRID_SIZE, EmptyMapError, Game, UnevenRowsError } from "./game";
import { Tile } from "./tile";

describe("Game", () => {
	it("defaults to a 3x3 grid", () => {
		const game = new Game();
		expect(game.rows).toBe(DEFAULT_GRID_SIZE);
		expect(game.columns).toBe(DEFAULT_GRID_SIZE);
		expect(game.tiles.flat()).toHaveLength(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE);
	});

	it("returns total tile count for the default 3x3 grid", () => {
		const game = new Game();
		expect(game.totalTiles).toBe(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE);
	});

	it("defaults each tile to grass biome", () => {
		const game = new Game();
		for (const row of game.tiles) {
			for (const tile of row) {
				expect(tile.biome.kind).toBe(BiomeKind.Grass);
			}
		}
	});

	it.each([
		{ tiles: [[new Tile()]], rows: 1, cols: 1 },
		{ tiles: [Array.from({ length: 10 }, () => new Tile())], rows: 1, cols: 10 },
		{ tiles: Array.from({ length: 10 }, () => [new Tile()]), rows: 10, cols: 1 },
		{
			tiles: [
				[new Tile(), new Tile()],
				[new Tile(), new Tile()],
			],
			rows: 2,
			cols: 2,
		},
	])("constructs a $rows x $cols grid from tile array", ({ tiles, rows, cols }) => {
		const game = new Game(tiles);
		expect(game.rows).toBe(rows);
		expect(game.columns).toBe(cols);
	});

	it("throws UnevenRowsError for jagged rows", () => {
		const tiles = [[new Tile()], [new Tile(), new Tile()]];
		expect(() => new Game(tiles)).toThrow(UnevenRowsError);
	});

	it("throws EmptyMapError for empty tile array", () => {
		expect(() => new Game([])).toThrow(EmptyMapError);
	});
});
