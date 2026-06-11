import { Move } from "./move";
import { Player } from "./player";
import { Tile } from "./tile";
import { Weather } from "./weather";

export const DEFAULT_GRID_SIZE = 3;

export class EmptyMapError extends Error {
  constructor() {
    super("Failed to construct game: map data is empty");
  }
}

export class UnevenRowsError extends Error {
  constructor() {
    super("Failed to construct game: map rows have uneven lengths");
  }
}

export class PlayerOutOfBoundsError extends Error {
  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    super(
      `Failed to construct game: player starting position (${row}, ${col}) is out of bounds`,
    );
    this.row = row;
    this.col = col;
  }
}

export class PlayerOnUnvisitableTileError extends Error {
  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    super(
      `Failed to construct game: player is on an unvisitable tile at (${row}, ${col})`,
    );
    this.row = row;
    this.col = col;
  }
}

export class Game {
  readonly tiles: Tile[][];
  readonly player: Player;
  readonly moveCount: number;
  readonly weather: Weather[];

  get rows(): number {
    return this.tiles.length;
  }

  get columns(): number {
    return this.tiles[0].length;
  }

  get totalTiles(): number {
    return this.tiles.reduce((sum, row) => sum + row.length, 0);
  }

  get currentWeatherIndex(): number {
    return this.moveCount % this.weather.length;
  }

  get won(): boolean {
    return this.tiles.every((row) =>
      row.every((tile) => !tile.biome.visitable || tile.visited),
    );
  }

  constructor(
    tiles?: Tile[][],
    player?: Player,
    moveCount?: number,
    weather?: Weather[],
  ) {
    this.player = player ?? new Player(0, 0);
    this.moveCount = moveCount ?? 0;
    this.weather = weather ?? [Weather.Fine];
    if (tiles) {
      if (tiles.length === 0) {
        throw new EmptyMapError();
      }
      const firstLen = tiles[0].length;
      if (firstLen === 0) {
        throw new EmptyMapError();
      }
      if (tiles.some((row) => row.length !== firstLen)) {
        throw new UnevenRowsError();
      }
      this.tiles = tiles;
    } else {
      this.tiles = this.defaultGrid();
    }
    if (
      this.player.row < 0 ||
      this.player.row >= this.tiles.length ||
      this.player.col < 0 ||
      this.player.col >= this.tiles[0].length
    ) {
      throw new PlayerOutOfBoundsError(this.player.row, this.player.col);
    }
    const playerTile = this.tiles[this.player.row][this.player.col];
    if (!playerTile.biome.visitable) {
      throw new PlayerOnUnvisitableTileError(this.player.row, this.player.col);
    }
    playerTile.visited = true;
  }

  applyMove(move: Move): Game {
    const { row, col } = this.player;
    let nextRow = row;
    let nextCol = col;
    switch (move) {
      case Move.North:
        nextRow--;
        break;
      case Move.East:
        nextCol++;
        break;
      case Move.South:
        nextRow++;
        break;
      case Move.West:
        nextCol--;
        break;
    }
    return new Game(
      this.tiles,
      new Player(nextRow, nextCol),
      this.moveCount + 1,
      this.weather,
    );
  }

  private defaultGrid(): Tile[][] {
    return Array.from({ length: DEFAULT_GRID_SIZE }, () =>
      Array.from({ length: DEFAULT_GRID_SIZE }, () => new Tile()),
    );
  }
}
