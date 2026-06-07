import { parseParams } from "./params";

export function appendMove(hash: string, direction: string): string {
  const params = parseParams(hash);
  const existing = params.get("moves") ?? "";
  const step = params.has("currStep")
    ? Number(params.get("currStep"))
    : existing.length;
  params.set("moves", existing.slice(0, step) + direction);
  params.delete("currStep");
  return hashOf(params);
}

export function toggleEdit(hash: string): string {
  const params = parseParams(hash);
  if (params.get("edit") === "true") {
    params.delete("edit");
    params.delete("placeStart");
  } else {
    params.set("edit", "true");
    params.delete("moves");
  }
  return hashOf(params);
}

export function replaceTile(
  hash: string,
  row: number,
  col: number,
  char: string,
): string {
  const params = parseParams(hash);
  const map = params.get("map") ?? "ggg,ggg,ggg";
  const rows = map.split(",");
  const chars = rows[row].split("");
  chars[col] = char;
  rows[row] = chars.join("");
  params.set("map", rows.join(","));
  return hashOf(params);
}

export function setPlaceStart(hash: string): string {
  const params = parseParams(hash);
  params.set("placeStart", "true");
  return hashOf(params);
}

export function replaceStart(hash: string, row: number, col: number): string {
  const params = parseParams(hash);
  params.set("start", `${row},${col}`);
  params.delete("placeStart");
  return hashOf(params);
}

export function clearMoves(hash: string): string {
  const params = parseParams(hash);
  params.delete("moves");
  params.delete("currStep");
  return hashOf(params);
}

export function back(hash: string): string {
  const params = parseParams(hash);
  const moves = params.get("moves");
  if (moves === undefined) return hash;
  const currStep = params.has("currStep")
    ? Math.max(0, Number(params.get("currStep")) - 1)
    : moves.length - 1;
  params.set("currStep", String(currStep));
  return hashOf(params);
}

export function forward(hash: string): string {
  const params = parseParams(hash);
  if (!params.has("currStep")) return hash;
  const moves = params.get("moves");
  if (moves === undefined) return hash;
  const currStep = Number(params.get("currStep"));
  if (currStep >= moves.length) return hash;
  params.set("currStep", String(currStep + 1));
  return hashOf(params);
}

export function addRow(hash: string): string {
  const params = parseParams(hash);
  const map = params.get("map") ?? "ggg,ggg,ggg";
  const rows = map.split(",");
  const cols = rows[0].length;
  params.set("map", `${map},${"g".repeat(cols)}`);
  return hashOf(params);
}

export function addColumn(hash: string): string {
  const params = parseParams(hash);
  const map = params.get("map") ?? "ggg,ggg,ggg";
  const rows = map.split(",").map((r) => `${r}g`);
  params.set("map", rows.join(","));
  return hashOf(params);
}

function hashOf(params: Map<string, string>): string {
  const entries = Array.from(params.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join(";");
  return `#${entries}`;
}
