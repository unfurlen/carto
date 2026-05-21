import { Tile } from "./tile";

// biome-ignore lint/correctness/noUnusedFunctionParameters: correct interface for now
export function render(tile: Tile): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "tile";
	return el;
}

const tile = new Tile();
document.getElementById("app")?.appendChild(render(tile));
