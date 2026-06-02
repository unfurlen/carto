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
  } else {
    params.set("edit", "true");
  }
  return hashOf(params);
}

function hashOf(params: Map<string, string>): string {
  const entries = Array.from(params.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join(";");
  return `#${entries}`;
}
