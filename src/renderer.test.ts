import { describe, expect, it } from "vitest";
import { Game } from "./game";
import { render } from "./renderer";
import { Tile } from "./tile";

describe("render", () => {
	it("renders 3 tiles in a container", () => {
		const game = new Game([new Tile(), new Tile(), new Tile()]);
		const el = render(game);
		expect(el.tagName).toBe("DIV");
		expect(el.children.length).toBe(3);
		expect((el.children[0] as HTMLElement).className).toBe("tile");
	});
});
