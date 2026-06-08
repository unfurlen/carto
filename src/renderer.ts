import type { Biome } from "./biome";
import type { Game } from "./game";
import {
  addColumn,
  addRow,
  appendMove,
  back,
  clearMoves,
  forward,
  removeRow,
  replaceStart,
  replaceTile,
  setPlaceStart,
  toggleEdit,
} from "./navigate";
import { parseParams } from "./params";
import type { Tile } from "./tile";

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
  container.appendChild(renderHeader(game, isEditMode));
  container.appendChild(renderGridArea(game, isEditMode, isPlaceStartMode));
  container.appendChild(renderAddRowButton(isEditMode));
  container.appendChild(renderNavRow(isEditMode));
  return container;
}

function renderHeader(game: Game, isEditMode: boolean): HTMLElement {
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
  return header;
}

function renderGridArea(
  game: Game,
  isEditMode: boolean,
  isPlaceStartMode: boolean,
): HTMLElement {
  const el = document.createElement("div");
  el.dataset.grid = "true";
  el.toggleAttribute("data-won", game.won);
  el.style.gridTemplateColumns = `repeat(${game.columns}, 1fr)`;
  for (const [r, row] of game.tiles.entries()) {
    for (const [c, tile] of row.entries()) {
      el.appendChild(
        renderTile(tile, r, c, game, isEditMode, isPlaceStartMode),
      );
    }
  }
  const gridRow = document.createElement("div");
  gridRow.dataset.gridRow = "true";
  const removeRowBtn = document.createElement("div");
  removeRowBtn.textContent = "➖";
  removeRowBtn.dataset.removeRow = "true";
  removeRowBtn.style.display = isEditMode ? "" : "none";
  removeRowBtn.addEventListener("click", () => {
    window.location.hash = removeRow(window.location.hash);
  });
  gridRow.appendChild(removeRowBtn);
  gridRow.appendChild(el);
  const addColBtn = document.createElement("div");
  addColBtn.textContent = "➕";
  addColBtn.dataset.addColumn = "true";
  addColBtn.style.display = isEditMode ? "" : "none";
  addColBtn.addEventListener("click", () => {
    window.location.hash = addColumn(window.location.hash);
  });
  gridRow.appendChild(addColBtn);
  return gridRow;
}

function renderTile(
  tile: Tile,
  r: number,
  c: number,
  game: Game,
  isEditMode: boolean,
  isPlaceStartMode: boolean,
): HTMLElement {
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
    handleTileClick(tile, r, c, game, isEditMode, isPlaceStartMode);
  });
  return tileEl;
}

function handleTileClick(
  tile: Tile,
  r: number,
  c: number,
  game: Game,
  isEditMode: boolean,
  isPlaceStartMode: boolean,
): void {
  if (isEditMode) {
    handleEditTileClick(tile, r, c, game, isPlaceStartMode);
  } else {
    handlePlayTileClick(tile, r, c, game);
  }
}

function handleEditTileClick(
  tile: Tile,
  r: number,
  c: number,
  game: Game,
  isPlaceStartMode: boolean,
): void {
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
}

function handlePlayTileClick(
  tile: Tile,
  r: number,
  c: number,
  game: Game,
): void {
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
}

function renderAddRowButton(isEditMode: boolean): HTMLElement {
  const btn = document.createElement("div");
  btn.textContent = "➕";
  btn.dataset.addRow = "true";
  btn.style.display = isEditMode ? "" : "none";
  btn.addEventListener("click", () => {
    window.location.hash = addRow(window.location.hash);
  });
  return btn;
}

function renderNavRow(isEditMode: boolean): HTMLElement {
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
  return navRow;
}
