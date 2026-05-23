---
name: red
description: Write tests before implementation (TDD red phase)
---

## What I do

- Read the ACs from the task file
- Write test code that satisfies the ACs
- Confirm the new test(s) fail as expected
- Follow best unit test patterns:
  - One assertion concern per test
  - Tests are independent of each other
  - Test names describe the scenario and expected outcome
  - Tests describe behavior, not implementation
  - Edge cases and boundary conditions are covered
  - No interdependence between tests

## When to use me

Use this to write tests from ACs. The AI produces test code only — running, verifying, and implementing are separate steps.

## Constraints

- Do not write implementation code — only tests
- Do not modify existing tests unless explicitly asked
- If the ACs are already satisfied by existing behavior, flag it to the user
- Follow existing project conventions (vitest, describe/it blocks, etc.)
