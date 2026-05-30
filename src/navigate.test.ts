import { describe, expect, it } from "vitest";
import { appendMove } from "./navigate";

describe("appendMove", () => {
	it.each([
		{ hash: "", dir: "n", expected: "#moves=n" },
		{ hash: "", dir: "e", expected: "#moves=e" },
		{ hash: "", dir: "s", expected: "#moves=s" },
		{ hash: "", dir: "w", expected: "#moves=w" },
	])("appends $dir to empty hash", ({ hash, dir, expected }) => {
		expect(appendMove(hash, dir)).toBe(expected);
	});

	it.each([
		{ hash: "#moves=n", dir: "e", expected: "#moves=ne" },
		{ hash: "#start=0,0", dir: "s", expected: "#start=0,0;moves=s" },
		{ hash: "#moves=n;start=0,0", dir: "e", expected: "#moves=ne;start=0,0" },
		{ hash: "moves=n", dir: "e", expected: "#moves=ne" },
		{ hash: "#map=ggg,ggg,ggg;moves=ne", dir: "s", expected: "#map=ggg,ggg,ggg;moves=nes" },
	])("appends $dir to existing hash $hash", ({ hash, dir, expected }) => {
		expect(appendMove(hash, dir)).toBe(expected);
	});
});
