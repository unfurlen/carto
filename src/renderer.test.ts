import { beforeEach, describe, expect, it } from "vitest";
import { Biome } from "./biome";
import { Game } from "./game";
import { Move } from "./move";
import { Player } from "./player";
import { render } from "./renderer";
import { Tile } from "./tile";
import { Weather } from "./weather";

function tileAt(grid: HTMLElement, row: number, col: number): HTMLElement {
  return grid.querySelector(
    `[data-row="${row}"][data-col="${col}"]`,
  ) as HTMLElement;
}

describe("render", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders a default 3x3 grid", () => {
    const game = new Game();
    const container = render(game);
    const grid = container.querySelector("[data-grid]") as HTMLElement;
    expect(grid.children.length).toBe(9);
    expect((grid.children[0] as HTMLElement).dataset.tile).toBe("true");
  });

  it("renders each tile with grass emoji", () => {
    const game = new Game();
    const container = render(game);
    const grid = container.querySelector("[data-grid]") as HTMLElement;
    for (const child of grid.children) {
      expect((child as HTMLElement).textContent).toBe("🌱");
    }
  });

  it("marks only the top-left tile as the player tile", () => {
    const game = new Game();
    const container = render(game);
    const grid = container.querySelector("[data-grid]") as HTMLElement;
    expect((grid.children[0] as HTMLElement).hasAttribute("data-player")).toBe(
      true,
    );
    for (let i = 1; i < grid.children.length; i++) {
      expect((grid.children[i] as HTMLElement).dataset.player).toBeUndefined();
    }
  });

  it("marks the correct tile for a non-default player position", () => {
    const tiles = [
      [new Tile(), new Tile()],
      [new Tile(), new Tile()],
    ];
    const game = new Game(tiles, new Player(1, 1));
    const el = render(game);
    expect(tileAt(el, 1, 1).hasAttribute("data-player")).toBe(true);
    for (let i = 0; i < el.children.length; i++) {
      if (i !== 3) {
        expect((el.children[i] as HTMLElement).dataset.player).toBeUndefined();
      }
    }
  });

  const center = [
    [new Tile(), new Tile(), new Tile()],
    [new Tile(), new Tile(), new Tile()],
    [new Tile(), new Tile(), new Tile()],
  ];

  it.each([
    { row: 0, col: 1, move: "n" },
    { row: 1, col: 2, move: "e" },
    { row: 2, col: 1, move: "s" },
    { row: 1, col: 0, move: "w" },
  ])("clicking tile $move of player at (1,1) appends $move", ({
    row,
    col,
    move,
  }) => {
    window.location.hash = "#start=1,1";
    const game = new Game(center, new Player(1, 1));
    const el = render(game);
    tileAt(el, row, col).click();
    expect(window.location.hash).toBe(`#start=1,1;moves=${move}`);
  });

  it.each([
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
  ])("clicking tile ($row,$col) of player at (1,1) does not change the URL", ({
    row,
    col,
  }) => {
    window.location.hash = "#start=1,1";
    const game = new Game(center, new Player(1, 1));
    const el = render(game);
    tileAt(el, row, col).click();
    expect(window.location.hash).toBe("#start=1,1");
  });

  it("gives the start tile a visited background when no moves are applied", () => {
    const game = new Game();
    const el = render(game);
    expect(tileAt(el, 0, 0).hasAttribute("data-visited")).toBe(true);
  });

  it("gives visited tiles a visited background after moves", () => {
    const game = new Game();
    const moved = game.applyMove(Move.East);
    const el = render(moved);
    expect(tileAt(el, 0, 1).hasAttribute("data-visited")).toBe(true);
  });

  it("does not give unvisited tiles a visited background", () => {
    const game = new Game();
    const moved = game.applyMove(Move.East);
    const el = render(moved);
    expect(tileAt(el, 1, 1).dataset.visited).toBeUndefined();
  });

  it.each([
    { biome: Biome.Grass, emoji: "🌱", name: "grass" },
    { biome: Biome.Water, emoji: "🌊", name: "water" },
  ])("renders a $name tile with the $name emoji", ({ biome, emoji }) => {
    const tiles = [[new Tile(Biome.Grass), new Tile(biome)]];
    const game = new Game(tiles);
    const el = render(game);
    expect(tileAt(el, 0, 1).textContent).toBe(emoji);
  });

  it.each([
    { biome: Biome.Grass, expected: "grass", name: "grass" },
    { biome: Biome.Water, expected: "water", name: "water" },
  ])("sets data-biome on a $name tile", ({ biome, expected }) => {
    const tiles = [[new Tile(Biome.Grass), new Tile(biome)]];
    const game = new Game(tiles);
    const el = render(game);
    expect(tileAt(el, 0, 1).dataset.biome).toBe(expected);
  });

  it("shows 👣 1 after one move", () => {
    const game = new Game([[new Tile(), new Tile()]]);
    const el = render(game.applyMove(Move.East));
    expect(el.textContent).toContain("👣 1");
  });

  it("does not change the URL when clicking an adjacent water tile", () => {
    window.location.hash = "#hello";
    const game = new Game([[new Tile(Biome.Grass), new Tile(Biome.Water)]]);
    const el = render(game);
    tileAt(el, 0, 1).click();
    expect(window.location.hash).toBe("#hello");
  });

  it("sets data-won on the grid when all visitable tiles are visited", () => {
    const game = new Game([[new Tile(Biome.Grass)]]);
    const container = render(game);
    const grid = container.querySelector("[data-grid]") as HTMLElement;
    expect(grid.hasAttribute("data-won")).toBe(true);
  });

  it("does not set data-won when not all visitable tiles are visited", () => {
    const game = new Game([[new Tile(Biome.Grass), new Tile(Biome.Grass)]]);
    const container = render(game);
    const grid = container.querySelector("[data-grid]") as HTMLElement;
    expect(grid.dataset.won).toBeUndefined();
  });

  it("sets edit=true in URL when edit toggle is clicked", () => {
    const container = render(new Game());
    const btn = container.querySelector("[data-edit-toggle]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toContain("edit=true");
  });

  it("adds data-edit-mode when URL contains edit=true", () => {
    window.location.hash = "#edit=true";
    const container = render(new Game());
    expect(container.hasAttribute("data-edit-mode")).toBe(true);
  });

  it("does not add data-edit-mode when URL has no edit param", () => {
    window.location.hash = "";
    const container = render(new Game());
    expect(container.hasAttribute("data-edit-mode")).toBe(false);
  });

  it.each([
    { hash: "#edit=false" },
    { hash: "#edit=banana" },
  ])("does not add data-edit-mode for $hash", ({ hash }) => {
    window.location.hash = hash;
    const container = render(new Game());
    expect(container.hasAttribute("data-edit-mode")).toBe(false);
  });

  it("cycles biome when clicking a tile in edit mode", () => {
    window.location.hash = "#map=gg;edit=true";
    const container = render(new Game([[new Tile(), new Tile()]]));
    const tile = container.querySelector(
      "[data-row='0'][data-col='1']",
    ) as HTMLElement;
    tile.click();
    expect(window.location.hash).toContain("map=gw");
  });

  it("adds placeStart=true when clicking the player tile in edit mode", () => {
    window.location.hash = "#edit=true";
    const game = new Game([[new Tile(), new Tile()]]);
    const container = render(game);
    const playerTile = container.querySelector("[data-player]") as HTMLElement;
    playerTile.click();
    expect(window.location.hash).toContain("placeStart=true");
  });

  it("sets start position and exits place-start mode when clicking a visitable tile", () => {
    window.location.hash = "#edit=true;placeStart=true;map=gg,gg";
    const game = new Game([[new Tile(), new Tile()]]);
    const container = render(game);
    tileAt(container, 0, 1).click();
    expect(window.location.hash).toContain("start=0,1");
    expect(window.location.hash).not.toContain("placeStart");
  });

  it("does not change the URL when clicking a water tile in place-start mode", () => {
    window.location.hash = "#edit=true;placeStart=true";
    const game = new Game([[new Tile(Biome.Grass), new Tile(Biome.Water)]]);
    const container = render(game);
    tileAt(container, 0, 1).click();
    expect(window.location.hash).toBe("#edit=true;placeStart=true");
  });

  it("adds data-place-start to the player tile when place-start mode is active", () => {
    window.location.hash = "#edit=true;placeStart=true";
    const container = render(new Game([[new Tile(), new Tile()]]));
    const playerTile = container.querySelector("[data-player]") as HTMLElement;
    expect(playerTile.hasAttribute("data-place-start")).toBe(true);
  });

  it("does not add data-place-start when place-start mode is not active", () => {
    window.location.hash = "#edit=true";
    const container = render(new Game([[new Tile(), new Tile()]]));
    const playerTile = container.querySelector("[data-player]") as HTMLElement;
    expect(playerTile.hasAttribute("data-place-start")).toBe(false);
  });

  it("clears placeStart when the edit toggle is clicked in place-start mode", () => {
    window.location.hash = "#edit=true;placeStart=true";
    const container = render(new Game());
    const btn = container.querySelector("[data-edit-toggle]") as HTMLElement;
    btn.click();
    expect(window.location.hash).not.toContain("placeStart");
    expect(window.location.hash).not.toContain("edit=true");
  });

  it("clears moves when the reset button is clicked", () => {
    window.location.hash = "#start=0,0;moves=nesw";
    const container = render(new Game());
    const btn = container.querySelector("[data-reset]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toContain("start=0,0");
    expect(window.location.hash).not.toContain("moves");
  });

  it("renders a reset button in play mode", () => {
    window.location.hash = "";
    const container = render(new Game());
    const btn = container.querySelector("[data-reset]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the reset button in edit mode", () => {
    window.location.hash = "#edit=true";
    const container = render(new Game());
    const btn = container.querySelector("[data-reset]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("shows the back button when not in edit mode", () => {
    window.location.hash = "";
    const container = render(new Game());
    const btn = container.querySelector("[data-back]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the back button in edit mode", () => {
    window.location.hash = "#edit=true";
    const container = render(new Game());
    const btn = container.querySelector("[data-back]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("decrements currStep when the back button is clicked", () => {
    window.location.hash = "#start=0,0;moves=nesw;currStep=3";
    const container = render(new Game());
    const btn = container.querySelector("[data-back]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toContain("currStep=2");
  });

  it("shows the forward button when not in edit mode", () => {
    window.location.hash = "";
    const container = render(new Game());
    const btn = container.querySelector("[data-forward]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the forward button in edit mode", () => {
    window.location.hash = "#edit=true";
    const container = render(new Game());
    const btn = container.querySelector("[data-forward]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("increments currStep when the forward button is clicked", () => {
    window.location.hash = "#start=0,0;moves=nesw;currStep=2";
    const container = render(new Game());
    const btn = container.querySelector("[data-forward]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toContain("currStep=3");
  });

  it("shows an add-row button in edit mode", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-add-row]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the add-row button in play mode", () => {
    const container = render(new Game());
    const btn = container.querySelector("[data-add-row]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("adds a grass row when the add-row button is clicked", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-add-row]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toBe("#edit=true;map=ggg,ggg,ggg,ggg");
  });

  it("shows an add-column button in edit mode", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-add-column]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the add-column button in play mode", () => {
    const container = render(new Game());
    const btn = container.querySelector("[data-add-column]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("adds a grass column when the add-column button is clicked", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-add-column]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toBe("#edit=true;map=gggg,gggg,gggg");
  });

  it("shows a remove-row button in edit mode", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-remove-row]") as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.style.display).not.toBe("none");
  });

  it("hides the remove-row button in play mode", () => {
    const container = render(new Game());
    const btn = container.querySelector("[data-remove-row]") as HTMLElement;
    expect(btn.style.display).toBe("none");
  });

  it("removes the last row when the remove-row button is clicked", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-remove-row]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toBe("#edit=true;map=ggg,ggg");
  });

  it("shows a remove-column row in edit mode", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const row = container.querySelector("[data-remove-col-row]") as HTMLElement;
    expect(row).toBeTruthy();
    expect(row.style.display).not.toBe("none");
  });

  it("hides the remove-column row in play mode", () => {
    const container = render(new Game());
    const row = container.querySelector("[data-remove-col-row]") as HTMLElement;
    expect(row.style.display).toBe("none");
  });

  it("removes the last column when the remove-column button is clicked", () => {
    window.location.hash = "#edit=true;map=ggg,ggg,ggg";
    const container = render(new Game());
    const btn = container.querySelector("[data-remove-column]") as HTMLElement;
    btn.click();
    expect(window.location.hash).toBe("#edit=true;map=gg,gg,gg");
  });

  it("renders a ☀️ weather icon at the top when weather defaults to 'f'", () => {
    window.location.hash = "";
    const container = render(new Game());
    const icons = container.querySelectorAll("[data-weather-icon]");
    expect(icons.length).toBe(1);
    expect(icons[0].textContent).toBe("☀️");
  });

  it("renders ☀️ and ❄️ icons in sequence for a multi-character weather pattern", () => {
    window.location.hash = "";
    const game = new Game([[new Tile()]], new Player(0, 0), 0, [
      Weather.Fine,
      Weather.Snow,
      Weather.Fine,
      Weather.Snow,
    ]);
    const container = render(game);
    const icons = container.querySelectorAll("[data-weather-icon]");
    expect(icons.length).toBe(4);
    expect(icons[0].textContent).toBe("☀️");
    expect(icons[1].textContent).toBe("❄️");
    expect(icons[2].textContent).toBe("☀️");
    expect(icons[3].textContent).toBe("❄️");
  });
});
