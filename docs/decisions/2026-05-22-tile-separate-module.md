# Tile class in its own module

**Date:** 2026-05-22

## Context

Needed a domain object for the game tile.

## Decision

Place the Tile class in `src/tile.ts` and import it from `src/main.ts`. Keeps the domain model separate from rendering logic.

## Alternatives considered

- Tile in main.ts — mixes concerns
