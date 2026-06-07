import type { Biome } from "./biome";
import type { Game } from "./game";
import {
  addRow,
  appendMove,
  back,
  clearMoves,
  forward,
  replaceStart,
  replaceTile,
  setPlaceStart,
  toggleEdit,
} from "./navigate";
import { parseParams } from "./params";

const BIOME_EMOJI: Record<Biome["value"], string> = {
  grass: "🌱",
  water: "🌊",
};

const BIOME_ATTR: Record<Biome["value"], string> = {
  grass: "grass",
  water: "water",
};

const BIOME_CYCLE: Biome["value"][] = ["grass", "water"];

const BIOME_CHAR: Record<Biome["value"], string> = {
  grass: "g",
  water: "w",
};

export function render(game: Game): HTMLDivElement {
  const params = parseParams(window.location.hash);
  const isEditMode = params.get("edit") === "true";
  const isPlaceStartMode = params.get("placeStart") === "true";
  const container = document.createElement("div");
  container.toggleAttribute("data-edit-mode", isEditMode);
  const header = document.createElement("div");
  header.dataset.header = "true";
  const resetBtn = document.createElement("div");
  resetBtn.textContent = "🔁";
  resetBtn.dataset.reset = "true";
  resetBtn.style.display = isEditMode ? "none" : "";
  resetBtn.addEventListener("click", () => {
    window.location.hash = clearMoves(window.location.hash);
  });
  header.appendChild(resetBtn);
  const counter = document.createElement("div");
  counter.textContent = `👣 ${game.moveCount}`;
  header.appendChild(counter);
  const editBtn = document.createElement("div");
  editBtn.textContent = "✏️";
  editBtn.dataset.editToggle = "true";
  editBtn.addEventListener("click", () => {
    window.location.hash = toggleEdit(window.location.hash);
  });
  header.appendChild(editBtn);
  container.appendChild(header);
  const el = document.createElement("div");
  el.dataset.grid = "true";
  el.toggleAttribute("data-won", game.won);
  el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
  for (const [r, row] of game.tiles.entries()) {
    for (const [c, tile] of row.entries()) {
      const tileEl = document.createElement("div");
      tileEl.dataset.tile = "true";
      tileEl.dataset.row = String(r);
      tileEl.dataset.col = String(c);
      tileEl.toggleAttribute("data-visited", tile.visited);
      tileEl.toggleAttribute(
        "data-player",
        r === game.player.row && c === game.player.col,
      );
      tileEl.toggleAttribute(
        "data-place-start",
        isPlaceStartMode && r === game.player.row && c === game.player.col,
      );
      tileEl.dataset.biome = BIOME_ATTR[tile.biome.value];
      tileEl.textContent = BIOME_EMOJI[tile.biome.value];
      tileEl.addEventListener("click", () => {
        if (isEditMode) {
          if (isPlaceStartMode) {
            if (tile.biome.visitable) {
              window.location.hash = replaceStart(window.location.hash, r, c);
            }
            return;
          }
          if (r === game.player.row && c === game.player.col) {
            window.location.hash = setPlaceStart(window.location.hash);
            return;
          }
          const nextValue =
            BIOME_CYCLE[
              (BIOME_CYCLE.indexOf(tile.biome.value) + 1) % BIOME_CYCLE.length
            ];
          window.location.hash = replaceTile(
            window.location.hash,
            r,
            c,
            BIOME_CHAR[nextValue],
          );
          return;
        }
        if (!tile.biome.visitable) return;
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
  container.appendChild(el);
  const addRowBtn = document.createElement("div");
  addRowBtn.textContent = "➕";
  addRowBtn.dataset.addRow = "true";
  addRowBtn.style.display = isEditMode ? "" : "none";
  addRowBtn.addEventListener("click", () => {
    window.location.hash = addRow(window.location.hash);
  });
  container.appendChild(addRowBtn);
  const navRow = document.createElement("div");
  navRow.dataset.navRow = "true";
  const backBtn = document.createElement("div");
  backBtn.textContent = "◀";
  backBtn.dataset.back = "true";
  backBtn.style.display = isEditMode ? "none" : "";
  backBtn.addEventListener("click", () => {
    window.location.hash = back(window.location.hash);
  });
  navRow.appendChild(backBtn);
  const forwardBtn = document.createElement("div");
  forwardBtn.textContent = "▶";
  forwardBtn.dataset.forward = "true";
  forwardBtn.style.display = isEditMode ? "none" : "";
  forwardBtn.addEventListener("click", () => {
    window.location.hash = forward(window.location.hash);
  });
  navRow.appendChild(forwardBtn);
  container.appendChild(navRow);
  return container;
}
