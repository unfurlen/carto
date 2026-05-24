# Throw on errors, do not return result types
2026-05-24

All layers (domain, loader, etc.) throw on invalid input or state. No result/discriminated union types at layer boundaries. The top-level handler (main.ts) catches and renders the error message.

Rationale: the codebase is small with one catch point. Result types add boilerplate without meaningful benefit. If the project grows to many layers, we can revisit.
