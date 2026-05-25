# Per-AC micro-cycles
2026-05-25

## Status
Confirmed — promoted from `docs/experiments/` after successful use across two tasks. Each AC cycle stayed small; issues were caught before accumulating.

## Context
The original workflow ran all ACs through each phase together (red for all, green for all, refactor for all). This created high concurrent WIP and made mid-task pivots costly.

## Decision
Run red → green → refactor per single AC, not per task. Plan still defines all ACs upfront.

## How it works
1. Plan defines all ACs upfront (as before).
2. For each AC, in order: Red (write test) → Green (implement) → Refactor (improve).
3. After all ACs: Reflect (task-level retrospective).

## Consequences
- Smaller cycles, tighter feedback, easier rollback.
- Commit after each AC's refactor phase.
- Plan runs once per task; red/green/refactor run per AC.