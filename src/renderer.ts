import { Biome } from "./biome";
import type { Game } from "./game";
import { appendMove } from "./navigate";

const BIOME_EMOJI: Record<Biome, string> = {
  grass: "🌾",
  water: "🌊",
};

export function render(game: Game): HTMLDivElement {
  const el = document.createElement("div");
  el.dataset.grid = "true";
  el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
  for (const [r, row] of game.tiles.entries()) {
    for (const [c, tile] of row.entries()) {
      const tileEl = document.createElement("div");
      tileEl.dataset.tile = "true";
      tileEl.dataset.row = String(r);
      tileEl.dataset.col = String(c);
      if (tile.visited) {
        tileEl.dataset.visited = "true";
      }
      if (r === game.player.row && c === game.player.col) {
        tileEl.dataset.player = "true";
      }
      tileEl.dataset.biome = tile.biome;
      tileEl.textContent = BIOME_EMOJI[tile.biome];
      tileEl.addEventListener("click", () => {
        if (tile.biome === Biome.Water) return;
        const dr = r - game.player.row;
        const dc = c - game.player.col;
        if (dr === -1 && dc === 0) {
          window.location.hash = appendMove(window.location.hash, "n");
        } else if (dr === 1 && dc === 0) {
          window.location.hash = appendMove(window.location.hash, "s");
        } else if (dr === 0 && dc === 1) {
          window.location.hash = appendMove(window.location.hash, "e");
        } else if (dr === 0 && dc === -1) {
          window.location.hash = appendMove(window.location.hash, "w");
        }
      });
      el.appendChild(tileEl);
    }
  }
  return el;
}
