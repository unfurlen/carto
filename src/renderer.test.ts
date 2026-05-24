import { describe, expect, it } from "vitest";
import { Game } from "./game";
import { render } from "./renderer";

describe("render", () => {
	it("renders a default 3x3 grid", () => {
		const game = new Game();
		const el = render(game);
		expect(el.children.length).toBe(9);
		expect((el.children[0] as HTMLElement).className).toBe("tile");
	});

	it("renders each tile with grass emoji", () => {
		const game = new Game();
		const el = render(game);
		for (const child of el.children) {
			expect((child as HTMLElement).textContent).toBe("🌾");
		}
	});
});
