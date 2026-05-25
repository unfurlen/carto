import { Biome, BiomeKind } from "./biome";
import { Game } from "./game";
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

const BIOME_MAP: Record<string, BiomeKind> = {
	g: BiomeKind.Grass,
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
						const kind = BIOME_MAP[char];
						if (!kind) throw new InvalidMapCharacterError(char);
						return new Tile(new Biome(kind));
					}),
				)
			: undefined;

	return new Game(tiles, player);
}
