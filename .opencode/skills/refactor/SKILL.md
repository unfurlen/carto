---
name: refactor
description: TDD refactor phase — improve design without changing behavior
---

> **STOP after each proposal.** After identifying an improvement, present it
> to the user and wait for discussion. Do not propose a second change until
> the first is resolved.

## What I do

- Read the current code and tests
- Actively look for design improvements — naming, duplication, structure, organization, separation of concerns
- Check for growing complexity in functions or modules touched by the AC's changes — not just the new lines in isolation, but how they affect the surrounding code
- Propose each change to the user for discussion
- After all proposals are resolved, suggest the user verify the AC works in the browser before moving on

## Mindset

This phase is about **finding improvements**. Don't dismiss something as "not worth it"
— the whole point is to clean things up. Small things matter: constant ordering,
grouping related declarations, naming consistency, extracting duplication.
If there's something to improve, propose it.

## When to use me

Use this after the green phase for an AC is complete. The AI identifies
improvements and proposes them for discussion, then implements after approval.

## Constraints

- Do not make changes without discussion — propose first
- Do not suggest changes that add or remove behavior
- Do not skip the refactor phase — always find something to improve
