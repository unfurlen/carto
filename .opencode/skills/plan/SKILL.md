---
name: plan
description: Define acceptance criteria and create task cards
---

> **STOP after each step.** After defining ACs, after any design decision,
> after creating the task file — stop and let the user confirm before proceeding.

## What I do

- Ask the user what the next task is
- Discuss and define acceptance criteria (Given/When/Then)
- Push back on vague or untestable criteria
- Define ACs in pure behavioral terms — no implementation details
- Create the task file at `docs/tasks/YYYY-MM-DD-description.md` with ACs and notes

## When to use me

Use this when starting a new task. The AI produces a task card with clear ACs — test writing and implementation are separate steps.

## Constraints

- Do not write tests or implementation — only the task card
- Do not look at source code or reference implementation details
- If the user proposes vague ACs, ask clarifying questions
