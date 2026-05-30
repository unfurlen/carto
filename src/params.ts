export function parseParams(hash: string): Map<string, string> {
  const params = new Map<string, string>();
  const withoutHash = hash.startsWith("#") ? hash.slice(1) : hash;
  for (const segment of withoutHash.split(";")) {
    if (!segment) continue;
    const [key, ...rest] = segment.split("=");
    params.set(key, rest.join("="));
  }
  return params;
}
