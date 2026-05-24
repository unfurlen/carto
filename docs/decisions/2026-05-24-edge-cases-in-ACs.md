# Edge and negative cases in acceptance criteria
2026-05-24

Edge cases and negative cases belong in acceptance criteria when they describe behavior with a user-verifiable outcome. Specific data (e.g. "1x100", "100x1") is fine to include when it's user-facing — data the user controls, like URL content.

The rule is: ACs should not reference implementation internals (code structure, class names, method signatures). They can reference user-facing data, input formats, and observable outcomes.
