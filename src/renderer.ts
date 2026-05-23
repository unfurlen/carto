import type { Game } from "./game";

export function render(game: Game): HTMLDivElement {
	const el = document.createElement("div");
	el.style.display = "grid";
	el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
	el.style.width = "fit-content";
	for (const row of game.tiles) {
		for (const _tile of row) {
			const tileEl = document.createElement("div");
			tileEl.className = "tile";
			el.appendChild(tileEl);
		}
	}
	return el;
}
