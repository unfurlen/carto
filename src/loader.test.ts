import { describe, expect, it } from "vitest";
import {
  InvalidMapCharacterError,
  InvalidMoveCharacterError,
  InvalidStartCharacterError,
  load,
} from "./loader";

describe("Loader", () => {
  it("loads default game when hash is empty", () => {
    const game = load("");
    expect(game.rows).toBe(3);
    expect(game.columns).toBe(3);
  });

  it("loads default game when map param is missing", () => {
    const game = load("#unknown=something");
    expect(game.rows).toBe(3);
    expect(game.columns).toBe(3);
  });

  it("allows trailing semicolon in hash", () => {
    const game = load("#map=g;");
    expect(game.rows).toBe(1);
    expect(game.columns).toBe(1);
  });

  it("ignores unknown params", () => {
    const game = load("#map=g,g;unknown=something");
    expect(game.rows).toBe(2);
    expect(game.columns).toBe(1);
  });

  it.each([
    { url: "#map=g", rows: 1, cols: 1 },
    { url: "#map=gggggggggg", rows: 1, cols: 10 },
    { url: "#map=g,g,g,g,g,g,g,g,g,g", rows: 10, cols: 1 },
    { url: "#map=ggggg,ggggg,ggggg,ggggg,ggggg", rows: 5, cols: 5 },
  ])("loads a $rows x $cols grass grid", ({ url, rows, cols }) => {
    const game = load(url);
    expect(game.rows).toBe(rows);
    expect(game.columns).toBe(cols);
  });

  it("throws InvalidMapCharacterError for unknown characters", () => {
    expect(() => load("#map=gx")).toThrow(InvalidMapCharacterError);
  });

  it("loads the player starting position from the URL", () => {
    const game = load("#map=ggg,ggg,ggg;start=1,1");
    expect(game.player.row).toBe(1);
    expect(game.player.col).toBe(1);
  });

  it("loads game when only start is provided", () => {
    const game = load("#start=1,1");
    expect(game.rows).toBe(3);
    expect(game.columns).toBe(3);
    expect(game.player.row).toBe(1);
    expect(game.player.col).toBe(1);
  });

  it.each([
    { url: "#map=g;start=abc" },
    { url: "#map=g;start=1" },
    { url: "#map=g;start=1,2fds" },
  ])("throws for malformed start value", ({ url }) => {
    expect(() => load(url)).toThrow(InvalidStartCharacterError);
  });

  it.each([
    { moves: "e", row: 1, col: 2 },
    { moves: "s", row: 2, col: 1 },
    { moves: "w", row: 1, col: 0 },
    { moves: "n", row: 0, col: 1 },
  ])("moves $moves from (1,1) to ($row,$col)", ({ moves, row, col }) => {
    const game = load(`#start=1,1;moves=${moves}`);
    expect(game.player.row).toBe(row);
    expect(game.player.col).toBe(col);
  });

  it("moves ss from default to (2,0)", () => {
    const game = load("#moves=ss");
    expect(game.player.row).toBe(2);
    expect(game.player.col).toBe(0);
  });

  it("throws InvalidMoveCharacterError for invalid move characters", () => {
    expect(() => load("#moves=esx")).toThrow(InvalidMoveCharacterError);
  });
});
