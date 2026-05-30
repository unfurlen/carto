import { parseParams } from "./params";

export function appendMove(hash: string, direction: string): string {
	const params = parseParams(hash);
	const existing = params.get("moves") ?? "";
	params.set("moves", existing + direction);
	const entries = Array.from(params.entries())
		.map(([k, v]) => `${k}=${v}`)
		.join(";");
	return "#" + entries;
}
