# Per-AC micro-cycles (experiment)
2026-05-25

## Hypothesis
Implementing one AC at a time (red → green → refactor) reduces risk compared to batching all ACs through each phase. Smaller cycles mean tighter feedback, less concurrent WIP, and easier rollback if an approach proves wrong.

## How it works
1. Plan defines all ACs upfront (as before).
2. For each AC, in order: Red (write test) → Green (implement) → Refactor (improve).
3. After all ACs: Reflect (task-level retrospective).

## Notes
- The task card in `docs/tasks/` lists all ACs; we work through them one by one.
- Commit after each AC's refactor phase.
- Plan is the only phase that runs once per task. Red/green/refactor run per AC.
- This is experimental — revisit after a few tasks to decide if it stays.
