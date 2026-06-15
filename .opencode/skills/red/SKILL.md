---
name: red
description: Write tests before implementation (TDD red phase)
---

> **STOP after each step.** After reading the AC, after writing tests, after
> confirming they fail — stop and let the user confirm before proceeding.

## What I do

- Read one AC from the task file
- Write test code that satisfies that AC
- Confirm the new test(s) fail as expected by running `npm run check` (coverage + lint + typecheck)
- Follow best unit test patterns:
  - One assertion concern per test
  - Tests are independent of each other
  - Test names describe the scenario and expected outcome
  - Tests describe behavior, not implementation
  - Edge cases and boundary conditions are covered
  - No interdependence between tests

## When to use me

Use this to write tests for one AC. The AI produces test code only — running, verifying, and implementing are separate steps.

## Constraints

- **Do not write any implementation code** — tests only, nothing else.
- **Do not think about or plan implementation.** Don't consider how the code will work — only focus on writing good tests that describe the desired behavior.
- **When in doubt, ask the user.** Don't assume — if you're unsure about structure, conventions, or how to test something, flag it and get direction before writing code.
- Do not modify existing tests unless explicitly asked.
- If the ACs are already satisfied by existing behavior, flag it to the user.
- Follow existing project conventions (vitest, describe/it blocks, etc.).
