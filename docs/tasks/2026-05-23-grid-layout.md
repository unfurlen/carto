# Render tiles in a CSS grid

## Acceptance criteria

```
Given a new game
When it is rendered
Then the user sees a 3x3 grid of tiles
```

## Status

- Red phase: tests written and approved ✅
- Green phase: implementation complete, all tests pass ✅
- Lint: clean ✅

## Decisions

- Game stores tiles as `Tile[][]` (2D array). `rows` and `columns` are computed getters from the array shape. Total tiles accessed via `.flat()`.
- Renderer uses CSS grid with `grid-template-columns: repeat(N, 1fr)` for the grid layout.
- Tests check business logic (`rows`, `columns`, total tile count) and rendering output (child count, class name) separately.

## Workflow notes

- In the AI's first attempt at defining ACs, it read the source code and included implementation-specific details. The user corrected this: a BA defining ACs should work purely from user intent and behavioral outcomes, not from implementation. This principle is now captured in `.opencode/skills/task/SKILL.md`.
- Created `red` and `green` skills splitting the TDD cycle into two separate, loadable skill files.
- Test skill renamed from `test` to `red`. Created `green` skill for implementation phase.
- Skills not registering in system prompt is an ongoing friction point — requires session restart to pick up new skills.
