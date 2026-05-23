import { describe, expect, it } from "vitest";
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
});
