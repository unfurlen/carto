# Game as top-level domain object

**Date:** 2026-05-22

## Context

The `render` function needs a stable signature that won't change as the game evolves. A single Tile parameter is too narrow.

## Decision

Introduce a `Game` class that owns the `tiles` array. `render(game: Game)` — the signature stays stable while Game's internals grow.

## Alternatives considered

- `render(tiles: Tile[])` — requires changing signature when Game gains more properties
