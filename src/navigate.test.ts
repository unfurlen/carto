import { describe, expect, it } from "vitest";
import { appendMove, toggleEdit } from "./navigate";

describe("toggleEdit", () => {
  it.each([
    { hash: "", expected: "#edit=true" },
    { hash: "#map=g,g", expected: "#map=g,g;edit=true" },
    { hash: "#edit=false", expected: "#edit=true" },
    { hash: "#edit=banana", expected: "#edit=true" },
  ])("adds edit=true to $hash", ({ hash, expected }) => {
    expect(toggleEdit(hash)).toBe(expected);
  });

  it.each([
    { hash: "#edit=true", expected: "#" },
    { hash: "#map=g,g;edit=true", expected: "#map=g,g" },
  ])("removes edit param from $hash", ({ hash, expected }) => {
    expect(toggleEdit(hash)).toBe(expected);
  });
});

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
    {
      hash: "#map=ggg,ggg,ggg;moves=ne",
      dir: "s",
      expected: "#map=ggg,ggg,ggg;moves=nes",
    },
  ])("appends $dir to existing hash $hash", ({ hash, dir, expected }) => {
    expect(appendMove(hash, dir)).toBe(expected);
  });
});
