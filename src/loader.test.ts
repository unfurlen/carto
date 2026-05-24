import { describe, expect, it } from "vitest";
import { Loader, InvalidMapCharacterError } from "./loader";

describe("Loader", () => {
	it("loads default game when hash is empty", () => {
		const game = Loader.load("");
		expect(game.rows).toBe(3);
		expect(game.columns).toBe(3);
	});

	it("loads default game when map param is missing", () => {
		const game = Loader.load("#unknown=something");
		expect(game.rows).toBe(3);
		expect(game.columns).toBe(3);
	});

	it("allows trailing semicolon in hash", () => {
		const game = Loader.load("#map=g;");
		expect(game.rows).toBe(1);
		expect(game.columns).toBe(1);
	});

	it("ignores unknown params", () => {
		const game = Loader.load("#map=g,g;unknown=something");
		expect(game.rows).toBe(2);
		expect(game.columns).toBe(1);
	});

	it.each([
		{ url: "#map=g", rows: 1, cols: 1 },
		{ url: "#map=gggggggggg", rows: 1, cols: 10 },
		{ url: "#map=g,g,g,g,g,g,g,g,g,g", rows: 10, cols: 1 },
		{ url: "#map=ggggg,ggggg,ggggg,ggggg,ggggg", rows: 5, cols: 5 },
	])("loads a $rows x $cols grass grid", ({ url, rows, cols }) => {
		const game = Loader.load(url);
		expect(game.rows).toBe(rows);
		expect(game.columns).toBe(cols);
	});

	it("throws InvalidMapCharacterError for unknown characters", () => {
		expect(() => Loader.load("#map=gx")).toThrow(InvalidMapCharacterError);
	});


});
