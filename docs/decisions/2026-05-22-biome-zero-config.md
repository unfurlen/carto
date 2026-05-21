# Use Biome with zero config

**Date:** 2026-05-22

## Context

Needed linting and formatting to catch issues early.

## Decision

Use Biome with no config file. Single dependency for both linting and formatting. Zero-config works out of the box.

## Alternatives considered

- ESLint + Prettier — two deps, verbose flat config
- No linter — unknown unknowns
