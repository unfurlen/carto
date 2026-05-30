import { describe, expect, it } from "vitest";
import { Biome } from "./biome";
import { Game } from "./game";
import { Move } from "./move";
import { Player } from "./player";
import { render } from "./renderer";
import { Tile } from "./tile";

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

  it("marks the correct tile for a non-default player position", () => {
    const tiles = [
      [new Tile(), new Tile()],
      [new Tile(), new Tile()],
    ];
    const game = new Game(tiles, new Player(1, 1));
    const el = render(game);
    expect((el.children[3] as HTMLElement).dataset.player).toBe("true");
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
    const index = row * 3 + col;
    (el.children[index] as HTMLElement).click();
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
    const index = row * 3 + col;
    (el.children[index] as HTMLElement).click();
    expect(window.location.hash).toBe("#start=1,1");
  });

  it("gives the start tile a visited background when no moves are applied", () => {
    const game = new Game();
    const el = render(game);
    expect((el.children[0] as HTMLElement).dataset.visited).toBe("true");
  });

  it("gives visited tiles a visited background after moves", () => {
    const game = new Game();
    const moved = game.applyMove(Move.East);
    const el = render(moved);
    expect((el.children[1] as HTMLElement).dataset.visited).toBe("true");
  });

  it("does not give unvisited tiles a visited background", () => {
    const game = new Game();
    const moved = game.applyMove(Move.East);
    const el = render(moved);
    expect((el.children[4] as HTMLElement).dataset.visited).toBeUndefined();
  });

  it("renders a water tile with the water emoji", () => {
    const tiles = [[new Tile(Biome.Water)]];
    const game = new Game(tiles);
    const el = render(game);
    expect(el.children[0].textContent).toBe("🌊");
  });
});
