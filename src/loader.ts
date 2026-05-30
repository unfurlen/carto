import { Biome } from "./biome";
import { Game } from "./game";
import { Move } from "./move";
import { parseParams } from "./params";
import { Player } from "./player";
import { Tile } from "./tile";

export class InvalidMapCharacterError extends Error {
  readonly char: string;

  constructor(char: string) {
    super(`Failed to load map from URL: unknown biome code '${char}'`);
    this.char = char;
  }
}

export class InvalidStartCharacterError extends Error {
  constructor(value: string) {
    super(`Failed to load map from URL: invalid start value '${value}'`);
  }
}

export class InvalidMoveCharacterError extends Error {
  readonly char: string;

  constructor(char: string) {
    super(`Failed to load moves: unknown move character '${char}'`);
    this.char = char;
  }
}

const BIOME_MAP: Record<string, Biome> = {
  g: Biome.Grass,
};

const MOVE_MAP: Record<string, Move> = {
  n: Move.North,
  e: Move.East,
  s: Move.South,
  w: Move.West,
};

function loadMap(value?: string): Tile[][] | undefined {
  if (value === undefined) return undefined;
  return value.split(",").map((row) =>
    Array.from(row).map((char) => {
      const biome = BIOME_MAP[char];
      if (!biome) throw new InvalidMapCharacterError(char);
      return new Tile(biome);
    }),
  );
}

function loadPlayer(value?: string): Player | undefined {
  if (value === undefined) return undefined;
  if (!/^\d+,\d+$/.test(value)) {
    throw new InvalidStartCharacterError(value);
  }
  const parts = value.split(",");
  return new Player(Number(parts[0]), Number(parts[1]));
}

function loadMoves(value?: string): Move[] {
  if (value === undefined) return [];
  return Array.from(value).map((char) => {
    const move = MOVE_MAP[char];
    if (!move) throw new InvalidMoveCharacterError(char);
    return move;
  });
}

export function load(hash: string): Game {
  const params = parseParams(hash);

  const tiles = loadMap(params.get("map"));
  const player = loadPlayer(params.get("start"));
  const moves = loadMoves(params.get("moves"));

  const game = moves.reduce((g, m) => g.applyMove(m), new Game(tiles, player));

  return game;
}
