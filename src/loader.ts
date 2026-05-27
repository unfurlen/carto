import { Biome } from "./biome";
import { Game } from "./game";
import { Move } from "./move";
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

const BIOME_MAP: Record<string, Biome> = {
	g: Biome.Grass,
};

const MOVE_MAP: Record<string, Move> = {
	n: Move.North,
	e: Move.East,
	s: Move.South,
	w: Move.West,
};

export function load(hash: string): Game {
	const params = new Map<string, string>();
	const withoutHash = hash.startsWith("#") ? hash.slice(1) : hash;
	for (const segment of withoutHash.split(";")) {
		if (!segment) continue;
		const [key, ...rest] = segment.split("=");
		params.set(key, rest.join("="));
	}

	const startValue = params.get("start");
	let player: Player | undefined;
	if (startValue !== undefined) {
		if (!/^\d+,\d+$/.test(startValue)) {
			throw new InvalidStartCharacterError(startValue);
		}
		const parts = startValue.split(",");
		player = new Player(Number(parts[0]), Number(parts[1]));
	}

	const mapValue = params.get("map");
	const tiles =
		mapValue !== undefined
			? mapValue.split(",").map((row) =>
					Array.from(row).map((char) => {
						const biome = BIOME_MAP[char];
						if (!biome) throw new InvalidMapCharacterError(char);
						return new Tile(biome);
					}),
				)
			: undefined;

	const movesValue = params.get("moves");
	const moves: Move[] = movesValue
		? Array.from(movesValue).map((char) => MOVE_MAP[char])
		: [];

	const game = moves.reduce(
		(g, m) => g.applyMove(m),
		new Game(tiles, player),
	);

	return game;
}
