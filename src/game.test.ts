import { describe, expect, it } from "vitest";
import { BiomeKind } from "./biome";
import { Game } from "./game";

describe("Game", () => {
	it("defaults to a 3x3 grid", () => {
		const game = new Game();
		expect(game.rows).toBe(3);
		expect(game.columns).toBe(3);
		expect(game.tiles.flat()).toHaveLength(9);
	});

	it("returns total tile count for the default 3x3 grid", () => {
		const game = new Game();
		expect(game.totalTiles).toBe(9);
	});

	it("defaults each tile to grass biome", () => {
		const game = new Game();
		for (const row of game.tiles) {
			for (const tile of row) {
				expect(tile.biome.kind).toBe(BiomeKind.Grass);
			}
		}
	});
});
