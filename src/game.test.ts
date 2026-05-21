import { describe, expect, it } from "vitest";
import { Game } from "./game";

describe("Game", () => {
	it("defaults to 3 tiles", () => {
		const game = new Game();
		expect(game.tiles).toHaveLength(3);
	});
});
