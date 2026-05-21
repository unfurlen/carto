import { describe, expect, it } from "vitest";
import { render } from "./main";
import { Tile } from "./tile";

describe("render", () => {
	it('renders a tile as a div with class "tile"', () => {
		const tile = new Tile();
		const el = render(tile);
		expect(el.tagName).toBe("DIV");
		expect(el.className).toBe("tile");
	});
});
