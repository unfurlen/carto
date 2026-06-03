import { describe, expect, it } from "vitest";
import { appendMove, replaceTile, toggleEdit } from "./navigate";

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

  it.each([
    { hash: "#moves=nesw", expected: "#edit=true" },
    { hash: "#map=g,g;moves=e", expected: "#map=g,g;edit=true" },
  ])("clears moves when adding edit=true to $hash", ({ hash, expected }) => {
    expect(toggleEdit(hash)).toBe(expected);
  });
});

describe("replaceTile", () => {
  it.each([
    {
      hash: "#map=ggg,ggg,ggg",
      row: 0,
      col: 0,
      char: "w",
      expected: "#map=wgg,ggg,ggg",
    },
    {
      hash: "#map=ggg,ggg,ggg",
      row: 1,
      col: 1,
      char: "w",
      expected: "#map=ggg,gwg,ggg",
    },
    {
      hash: "#map=gg,gw;start=0,0",
      row: 1,
      col: 1,
      char: "g",
      expected: "#map=gg,gg;start=0,0",
    },
    {
      hash: "#edit=true",
      row: 0,
      col: 0,
      char: "w",
      expected: "#edit=true;map=wgg,ggg,ggg",
    },
  ])("replaces tile at ($row,$col) with $char", ({
    hash,
    row,
    col,
    char,
    expected,
  }) => {
    expect(replaceTile(hash, row, col, char)).toBe(expected);
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
