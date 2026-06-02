# Cautious agent for plan-first workflow
2026-06-02

## Status
Confirmed.

## Context
The base model's system prompt encourages proactivity (implementing, editing, running commands), which sometimes conflicts with the project's "discuss before acting" principle. Adding more rules to AGENTS.md was insufficient — the base prompt took priority.

## Decision
Create a dedicated `cautious` agent at `.opencode/agent/cautious.md` with a strict prompt: never act without explicit approval, propose before implementing, one step at a time. Set it as `default_agent` in `opencode.json`.

Agent prompts override the base system's proactivity instructions, so the cautious rules take effect.

## Consequences
- Model waits for explicit approval before writing code or running commands.
- Proposals are separate from implementation — no batching.
- Requires an opencode restart to pick up the agent change.
