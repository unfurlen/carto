# Add field biome with emoji rendering

## Status

- Red phase: tests written and confirmed failing ✅
- Green phase: implementation complete, all tests pass ✅
- Refactor: BIOME_EMOJI type tightened to Record<BiomeKind, string> ✅
- Reflect: completed ✅

## Acceptance criteria

```
Given the default game
When it is rendered
Then each tile shows the grass biome emoji
```

## Workflow notes

- The AI initially proposed ACs referencing "new tile" and "specified biome" — implementation-level thinking. The user corrected: ACs must describe what the user sees, not how tiles are constructed.
- During green phase, the AI wrote unneeded code: optional constructor parameter on Tile (`biome?: Biome`) and a fallback emoji (`?? "?"`) in the renderer. Neither was tested. The user caught both and removed them. The green skill was updated with an explicit constraint: "no optional parameters, fallback values, or defensive logic unless a test covers that case."
