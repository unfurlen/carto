# Renderer in its own module

**Date:** 2026-05-22

## Context

The `render` function was originally in `main.ts`. As the game grows, `main.ts` should only handle app entry (bootstrap), not rendering logic.

## Decision

Move `render` to `src/renderer.ts`. Keeps rendering separate from application setup.

## Alternatives considered

- Keep in main.ts — mixes concerns as the codebase grows
