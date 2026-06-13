# Edit weather cycle

In edit mode, the weather row gets + and – buttons to add/remove weather items. Clicking + appends a Fine (☀️) item. Clicking – removes the rightmost item, with a minimum of one.

## Acceptance criteria

**AC #1:** Given the page is in edit mode, when the + button next to the weather row is clicked, then a ☀️ icon appears at the right end of the weather sequence.

**AC #2:** Given the page is in edit mode with a weather sequence of more than one icon, when the – button next to the weather row is clicked, then the rightmost icon disappears from the sequence.

**AC #3:** Given the page is in edit mode with a weather sequence of exactly one icon, when the – button next to the weather row is clicked, then the sequence is unchanged.

**AC #4:** Given the page is in play mode, when the page renders, then no + or – buttons are visible near the weather row.
