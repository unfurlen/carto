import { describe, expect, it } from "vitest";
import { Game } from "./game";
import { render } from "./renderer";

describe("render", () => {
	it("renders a default 3x3 grid", () => {
		const game = new Game();
		const el = render(game);
		expect(el.children.length).toBe(9);
		expect((el.children[0] as HTMLElement).dataset.tile).toBe("true");
	});

	it("renders each tile with grass emoji", () => {
		const game = new Game();
		const el = render(game);
		for (const child of el.children) {
			expect((child as HTMLElement).textContent).toBe("🌾");
		}
	});

	it("marks only the top-left tile as the player tile", () => {
		const game = new Game();
		const el = render(game);
		expect((el.children[0] as HTMLElement).dataset.player).toBe("true");
		for (let i = 1; i < el.children.length; i++) {
			expect((el.children[i] as HTMLElement).dataset.player).toBeUndefined();
		}
	});
});
