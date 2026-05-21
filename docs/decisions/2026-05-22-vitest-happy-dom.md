# Use Vitest + happy-dom for testing

**Date:** 2026-05-22

## Context

Needed a test runner for TDD (test-first development).

## Decision

Use Vitest with happy-dom environment. Vitest integrates natively with Vite. happy-dom is lighter than jsdom and sufficient for DOM rendering tests.

## Alternatives considered

- Jest — separate config, slower
- Vitest + jsdom — heavier
