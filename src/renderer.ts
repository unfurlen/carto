import type { Game } from "./game";

const BIOME_EMOJI: Record<string, string> = {
	grass: "🌾",
};

export function render(game: Game): HTMLDivElement {
	const el = document.createElement("div");
	el.style.display = "grid";
	el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
	el.style.width = "fit-content";
	for (const row of game.tiles) {
		for (const tile of row) {
			const tileEl = document.createElement("div");
			tileEl.className = "tile";
			tileEl.textContent = BIOME_EMOJI[tile.biome.kind];
			el.appendChild(tileEl);
		}
	}
	return el;
}
