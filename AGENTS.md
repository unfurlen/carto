# AI Interaction Principles

1. **Discuss before acting** — propose a plan and get approval before executing. Don't jump into writing files or running commands without outlining the approach first.

2. **Prefer the simplest solution** — avoid over-engineering. Don't add excessive structure, nesting, or boilerplate. Start minimal and add complexity only when needed.

3. **Collaborate on reflection** — when reviewing a task or workflow outcome, ask the user for their observations first. Don't fabricate lessons or assume what the user thinks.

4. **Smallest steps** — work in minimal increments. One change at a time, verify before proceeding. No batching of independent edits or silent multi-step sequences.

5. **Explicit uncertainty** — if confidence in a decision is below ~90%, flag it and ask before acting. Don't commit to a path unless confident or explicitly directed.

## Task workflow

### Before coding
1. Create `docs/tasks/YYYY-MM-DD-description.md`
2. Define acceptance criteria (Given/When/Then) with the user and record them in the task file

### During coding
3. Capture decisions in `docs/decisions/` as they come up
4. Update the task log when you hit friction or make progress

### After coding
5. Run `npm run lint`
6. Prompt the user to verify the work (real confirmation — open in browser, manual check)
7. Discuss observations with the user
8. Work on improvements
9. Update `docs/tasks.md` checklist
10. Commit
