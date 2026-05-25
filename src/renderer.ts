import type { BiomeKind } from "./biome";
import type { Game } from "./game";

const BIOME_EMOJI: Record<BiomeKind, string> = {
	grass: "🌾",
};

export function render(game: Game): HTMLDivElement {
	const el = document.createElement("div");
	el.style.display = "grid";
	el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
	el.style.width = "fit-content";
	const playerIndex = game.player.row * game.columns + game.player.col;
	let index = 0;
	for (const row of game.tiles) {
		for (const tile of row) {
			const tileEl = document.createElement("div");
			tileEl.dataset.tile = "true";
			if (index === playerIndex) {
				tileEl.dataset.player = "true";
			}
			tileEl.textContent = BIOME_EMOJI[tile.biome.kind];
			el.appendChild(tileEl);
			index++;
		}
	}
	return el;
}
