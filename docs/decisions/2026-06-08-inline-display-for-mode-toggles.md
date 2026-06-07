# Inline display styles for edit-mode toggles

## Decision

Keep `style.display` inline in `renderer.ts` for buttons that toggle visibility between edit and play mode.

## Rationale

- The visibility logic is inherently dynamic (depends on `isEditMode`) — inline styles make this dependency explicit at the point of creation.
- The CSS alternative requires two rules per element (default + `[data-edit-mode]` override), adding noise without clarity benefit.
- No separation-of-concerns win: the renderer already owns DOM construction and event wiring; visibility is part of that construction, not a pure visual concern.

## Applies to

- `[data-back]`, `[data-forward]`, `[data-reset]` — hidden in edit mode
- `[data-add-row]` — shown only in edit mode
