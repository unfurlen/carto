# Weather cycle display

## Acceptance criteria

**AC #1:** Given no `weather` param, when the page renders, then a single ☀️ icon is displayed at the top of the page (defaults to `f`).

**AC #2:** Given a valid `weather` string (e.g. `fsfs`), when the page renders, then each character is shown as its corresponding icon in sequence at the top of the page (`f` → ☀️, `s` → ❄️).

**AC #3:** Given a `weather` string containing an unknown character (e.g. `fxs`), when the page renders, then an error is displayed.

## Design notes

- Read-only display (no click interaction yet).
- No progression tie-in to moves/steps yet.
- Row sits at the top of the page, above all other UI.
- Emoji-only, no text labels.
