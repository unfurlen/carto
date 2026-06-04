import { parseParams } from "./params";

export function appendMove(hash: string, direction: string): string {
  const params = parseParams(hash);
  const existing = params.get("moves") ?? "";
  params.set("moves", existing + direction);
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

function hashOf(params: Map<string, string>): string {
  const entries = Array.from(params.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join(";");
  return `#${entries}`;
}
