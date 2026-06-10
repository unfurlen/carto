import { describe, expect, it } from "vitest";
import { Biome } from "./biome";
import {
  DEFAULT_GRID_SIZE,
  EmptyMapError,
  Game,
  PlayerOnUnvisitableTileError,
  PlayerOutOfBoundsError,
  UnevenRowsError,
} from "./game";
import { Move } from "./move";
import { Player } from "./player";
import { Tile } from "./tile";
import { Weather } from "./weather";

describe("Game", () => {
  it("defaults to a 3x3 grid", () => {
    const game = new Game();
    expect(game.rows).toBe(DEFAULT_GRID_SIZE);
    expect(game.columns).toBe(DEFAULT_GRID_SIZE);
    expect(game.tiles.flat()).toHaveLength(
      DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE,
    );
  });

  it("returns total tile count for the default 3x3 grid", () => {
    const game = new Game();
    expect(game.totalTiles).toBe(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE);
  });

  it("defaults each tile to grass biome", () => {
    const game = new Game();
    for (const row of game.tiles) {
      for (const tile of row) {
        expect(tile.biome).toBe(Biome.Grass);
      }
    }
  });

  it.each([
    { tiles: [[new Tile()]], rows: 1, cols: 1 },
    {
      tiles: [Array.from({ length: 10 }, () => new Tile())],
      rows: 1,
      cols: 10,
    },
    {
      tiles: Array.from({ length: 10 }, () => [new Tile()]),
      rows: 10,
      cols: 1,
    },
    {
      tiles: [
        [new Tile(), new Tile()],
        [new Tile(), new Tile()],
      ],
      rows: 2,
      cols: 2,
    },
  ])("constructs a $rows x $cols grid from tile array", ({
    tiles,
    rows,
    cols,
  }) => {
    const game = new Game(tiles);
    expect(game.rows).toBe(rows);
    expect(game.columns).toBe(cols);
  });

  it("throws UnevenRowsError for jagged rows", () => {
    const tiles = [[new Tile()], [new Tile(), new Tile()]];
    expect(() => new Game(tiles)).toThrow(UnevenRowsError);
  });

  it.each([
    { tiles: [] },
    { tiles: [[]] },
  ])("throws EmptyMapError for empty tile array", ({ tiles }) => {
    expect(() => new Game(tiles)).toThrow(EmptyMapError);
  });

  it("starts the player at the top-left tile", () => {
    const game = new Game();
    expect(game.player.row).toBe(0);
    expect(game.player.col).toBe(0);
  });

  it("places the player at a given starting position", () => {
    const tiles = [
      [new Tile(), new Tile()],
      [new Tile(), new Tile()],
    ];
    const game = new Game(tiles, new Player(1, 1));
    expect(game.player.row).toBe(1);
    expect(game.player.col).toBe(1);
  });

  it.each([
    { row: 5, col: 0 },
    { row: 0, col: 5 },
    { row: -1, col: 0 },
    { row: 0, col: -1 },
  ])("throws for out-of-bounds player at ($row, $col)", ({ row, col }) => {
    expect(() => new Game([[new Tile()]], new Player(row, col))).toThrow(
      PlayerOutOfBoundsError,
    );
  });

  it("throws when the player starts on a water tile", () => {
    const tiles = [[new Tile(Biome.Water)]];
    expect(() => new Game(tiles)).toThrow(PlayerOnUnvisitableTileError);
  });

  it("throws when a move lands on a water tile", () => {
    const tiles = [[new Tile(Biome.Grass), new Tile(Biome.Water)]];
    const game = new Game(tiles, new Player(0, 0));
    expect(() => game.applyMove(Move.East)).toThrow(
      PlayerOnUnvisitableTileError,
    );
  });

  describe("visited", () => {
    it("marks the starting tile as visited", () => {
      const game = new Game();
      expect(game.tiles[0][0].visited).toBe(true);
    });

    it("marks each move destination as visited", () => {
      const game = new Game();
      const moved = game.applyMove(Move.East);
      expect(moved.tiles[0][1].visited).toBe(true);
    });

    it("does not mark tiles outside the path", () => {
      const game = new Game();
      expect(game.tiles[1][0].visited).toBe(false);
    });
  });

  it.each([0, 1, 2])("has move count %i after %i move(s)", (n) => {
    const moves = [Move.East, Move.South, Move.West];
    let game = new Game();
    for (let i = 0; i < n; i++) game = game.applyMove(moves[i]);
    expect(game.moveCount).toBe(n);
  });

  describe("weather", () => {
    it("defaults weather to a single Fine", () => {
      const game = new Game();
      expect(game.weather).toEqual([Weather.Fine]);
    });
  });

  describe("won", () => {
    it("returns false when only the start tile is visited", () => {
      const game = new Game();
      expect(game.won).toBe(false);
    });

    it("returns false when some but not all tiles are visited", () => {
      const game = new Game();
      const moved = game.applyMove(Move.East);
      expect(moved.won).toBe(false);
    });

    it("returns true when a single grass tile is visited", () => {
      const game = new Game([[new Tile(Biome.Grass)]]);
      expect(game.won).toBe(true);
    });

    it("returns true after visiting all grass tiles in a grid with water", () => {
      const tiles = [
        [new Tile(Biome.Grass), new Tile(Biome.Water)],
        [new Tile(Biome.Grass), new Tile(Biome.Water)],
      ];
      let game = new Game(tiles);
      game = game.applyMove(Move.South);
      expect(game.won).toBe(true);
    });
  });
});
