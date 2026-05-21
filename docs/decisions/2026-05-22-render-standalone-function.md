# render as standalone function

**Date:** 2026-05-22

## Context

Needed a way to render a Tile to the DOM.

## Decision

`render(tile)` is a standalone exported function in `src/main.ts`, not a method on Tile. Separates the rendering concern from the domain model.

## Alternatives considered

- Tile.render() method — couples rendering to the domain
