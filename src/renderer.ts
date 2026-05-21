import type { Game } from "./game";

export function render(game: Game): HTMLDivElement {
	const el = document.createElement("div");
	el.style.display = "flex";
	for (const _tile of game.tiles) {
		const tileEl = document.createElement("div");
		tileEl.className = "tile";
		el.appendChild(tileEl);
	}
	return el;
}
