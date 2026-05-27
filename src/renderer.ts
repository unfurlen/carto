import type { Biome } from "./biome";
import type { Game } from "./game";

const BIOME_EMOJI: Record<Biome, string> = {
	grass: "🌾",
};

export function render(game: Game): HTMLDivElement {
	const el = document.createElement("div");
	el.style.display = "grid";
	el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
	el.style.width = "fit-content";
	for (const [r, row] of game.tiles.entries()) {
		for (const [c, tile] of row.entries()) {
			const tileEl = document.createElement("div");
			tileEl.dataset.tile = "true";
			if (r === game.player.row && c === game.player.col) {
				tileEl.dataset.player = "true";
			}
			tileEl.textContent = BIOME_EMOJI[tile.biome];
			el.appendChild(tileEl);
		}
	}
	return el;
}
