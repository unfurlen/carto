import { Biome } from "./biome";
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

export class MovingWhenLostError extends Error {
  constructor() {
    super("Failed to apply move: game is lost");
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
      row.every((tile) => !tile.biome.mappable || tile.visited),
    );
  }

  get lost(): boolean {
    const biome = this.tiles[this.player.row][this.player.col].biome;
    const weatherKey = this.weather[this.currentWeatherIndex].value;
    return !biome[weatherKey].safe;
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
    this.tiles = tiles ?? this.defaultGrid();
    if (this.tiles.length === 0) {
      throw new EmptyMapError();
    }
    const firstLen = this.tiles[0].length;
    if (firstLen === 0) {
      throw new EmptyMapError();
    }
    if (this.tiles.some((row) => row.length !== firstLen)) {
      throw new UnevenRowsError();
    }
    if (
      this.player.row < 0 ||
      this.player.row >= this.tiles.length ||
      this.player.col < 0 ||
      this.player.col >= this.tiles[0].length
    ) {
      throw new PlayerOutOfBoundsError(this.player.row, this.player.col);
    }

    this.visitPlayerTile();
    this.applyFlooding();
  }

  applyMove(move: Move): Game {
    if (this.lost) throw new MovingWhenLostError();
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
    const cost =
      this.tiles[nextRow][nextCol].biome[
        this.weather[this.currentWeatherIndex].value
      ].cost;
    return new Game(
      this.tiles,
      new Player(nextRow, nextCol),
      this.moveCount + cost,
      this.weather,
    );
  }

  private defaultGrid(): Tile[][] {
    return Array.from({ length: DEFAULT_GRID_SIZE }, () =>
      Array.from({ length: DEFAULT_GRID_SIZE }, () => new Tile()),
    );
  }

  private visitPlayerTile(): void {
    const tile = this.tiles[this.player.row][this.player.col];
    this.tiles[this.player.row][this.player.col] = new Tile(
      tile.biome,
      true,
      tile.flooded,
    );
  }

  private applyFlooding(): void {
    if (this.weather[this.currentWeatherIndex] !== Weather.Rain) return;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const tile = this.tiles[r][c];
        if (tile.biome !== Biome.Marsh) continue;
        if (this.hasWaterNeighbor(r, c)) {
          this.tiles[r][c] = new Tile(tile.biome, tile.visited, true);
        }
      }
    }
  }

  private hasWaterNeighbor(r: number, c: number): boolean {
    const neighbors = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];
    for (const [nr, nc] of neighbors) {
      if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.columns) {
        if (this.tiles[nr][nc].biome === Biome.Water) return true;
      }
    }
    return false;
  }
}
