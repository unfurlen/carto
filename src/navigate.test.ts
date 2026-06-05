import { describe, expect, it } from "vitest";
import {
  appendMove,
  back,
  clearMoves,
  replaceStart,
  replaceTile,
  setPlaceStart,
  toggleEdit,
} from "./navigate";

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

  it("clears placeStart when exiting edit mode", () => {
    expect(toggleEdit("#edit=true;placeStart=true")).toBe("#");
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

describe("setPlaceStart", () => {
  it.each([
    { hash: "#edit=true", expected: "#edit=true;placeStart=true" },
    {
      hash: "#map=gg,gg;edit=true",
      expected: "#map=gg,gg;edit=true;placeStart=true",
    },
  ])("adds placeStart=true to $hash", ({ hash, expected }) => {
    expect(setPlaceStart(hash)).toBe(expected);
  });
});

describe("replaceStart", () => {
  it.each([
    {
      hash: "#edit=true;placeStart=true",
      row: 1,
      col: 2,
      expected: "#edit=true;start=1,2",
    },
    {
      hash: "#edit=true;placeStart=true;map=ggg,ggg,ggg",
      row: 0,
      col: 1,
      expected: "#edit=true;map=ggg,ggg,ggg;start=0,1",
    },
    {
      hash: "#edit=true;placeStart=true",
      row: 0,
      col: 0,
      expected: "#edit=true;start=0,0",
    },
  ])("sets start=($row,$col) and removes placeStart", ({
    hash,
    row,
    col,
    expected,
  }) => {
    expect(replaceStart(hash, row, col)).toBe(expected);
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

  it("removes currStep when appending a move", () => {
    expect(appendMove("#moves=n;currStep=1", "e")).toBe("#moves=ne");
  });

  it("discards undone moves beyond currStep before appending", () => {
    expect(appendMove("#start=0,0;moves=nesw;currStep=2", "e")).toBe(
      "#start=0,0;moves=nee",
    );
  });
});

describe("clearMoves", () => {
  it.each([
    { hash: "#start=0,0;moves=nesw", expected: "#start=0,0" },
    { hash: "#moves=nesw", expected: "#" },
    { hash: "#start=0,0", expected: "#start=0,0" },
  ])("clears moves from $hash", ({ hash, expected }) => {
    expect(clearMoves(hash)).toBe(expected);
  });

  it("removes currStep when clearing moves", () => {
    expect(clearMoves("#start=0,0;moves=nesw;currStep=3")).toBe("#start=0,0");
  });
});

describe("back", () => {
  it("decrements currStep", () => {
    expect(back("#start=0,0;moves=nesw;currStep=3")).toBe(
      "#start=0,0;moves=nesw;currStep=2",
    );
  });

  it("sets currStep to moves.length - 1 when currStep is absent", () => {
    expect(back("#start=0,0;moves=nesw")).toBe(
      "#start=0,0;moves=nesw;currStep=3",
    );
  });

  it("does nothing when currStep is 0", () => {
    expect(back("#start=0,0;moves=nesw;currStep=0")).toBe(
      "#start=0,0;moves=nesw;currStep=0",
    );
  });

  it("does nothing when no moves param exists", () => {
    expect(back("#start=0,0")).toBe("#start=0,0");
  });
});
