import { describe, expect, it } from "vitest";
import { Biome } from "./biome";
import {
  InvalidCurrStepError,
  InvalidMapCharacterError,
  InvalidMoveCharacterError,
  InvalidStartCharacterError,
  InvalidWeatherCharacterError,
  load,
} from "./loader";
import { Weather } from "./weather";

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

  it("loads a weather string from the URL", () => {
    const game = load("#weather=ffs");
    expect(game.weather).toEqual([Weather.Fine, Weather.Fine, Weather.Snow]);
  });

  it("throws InvalidWeatherCharacterError for unknown weather characters", () => {
    expect(() => load("#weather=fxs")).toThrow(InvalidWeatherCharacterError);
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

  it("loads a map containing a water tile", () => {
    const game = load("#map=gw;start=0,0");
    expect(game.tiles[0][1].biome).toBe(Biome.Water);
  });

  it("loads a map containing a marsh tile", () => {
    const game = load("#map=gm;start=0,0");
    expect(game.tiles[0][1].biome).toBe(Biome.Marsh);
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

  it.each([
    { currStep: "1", col: 2 },
    { currStep: "0", col: 1 },
  ])("applies only first $currStep moves", ({ currStep, col }) => {
    const game = load(`#start=1,1;moves=ee;currStep=${currStep}`);
    expect(game.player.col).toBe(col);
  });

  it.each([
    { currStep: "abc" },
    { currStep: "-1" },
    { currStep: "1.5" },
  ])("throws when currStep='$currStep' is not a valid count", ({
    currStep,
  }) => {
    expect(() => load(`#start=1,1;moves=e;currStep=${currStep}`)).toThrow(
      InvalidCurrStepError,
    );
  });

  it("throws when currStep exceeds moves length", () => {
    expect(() => load("#start=1,1;moves=ee;currStep=3")).toThrow(
      InvalidCurrStepError,
    );
  });
});
