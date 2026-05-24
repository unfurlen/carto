import { Biome, BiomeKind } from "./biome";
import { Game } from "./game";
import { Tile } from "./tile";

export class InvalidMapCharacterError extends Error {
	readonly char: string;

	constructor(char: string) {
		super(`Failed to load map from URL: unknown biome code '${char}'`);
		this.char = char;
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

	const mapValue = params.get("map");
	if (mapValue === undefined) {
		return new Game();
	}

	const rows = mapValue.split(",");
	const tiles: Tile[][] = rows.map((row) =>
		Array.from(row).map((char) => {
			const kind = BIOME_MAP[char];
			if (!kind) throw new InvalidMapCharacterError(char);
			return new Tile(new Biome(kind));
		}),
	);

	return new Game(tiles);
}
