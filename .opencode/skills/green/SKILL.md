---
name: green
description: Implement to pass the red-phase tests (TDD green phase)
---

## What I do

- Read the failing tests from the red phase
- Write the minimum implementation to make them pass — no more, no less
- Review the written code for any branches not covered by tests, and any code not required by tests (YAGNI). Remove both before stopping.

## When to use me

Use this after the red phase for an AC is complete. The AI writes only enough code to satisfy the failing tests, then stops.

## Constraints

- Do not write code beyond what the tests require — no optional parameters, fallback values, or defensive logic unless a test covers that case
- Do not refactor — just make tests pass
- If a test cannot be satisfied without broader changes, flag it to the user
