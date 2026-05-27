# Replay moves from URL

## Format
- `moves=nesw` — sequence of direction characters after start position
- n=up(row-1), e=right(col+1), s=down(row+1), w=left(col-1)
- Applies after start position (or from (0,0) default if no start given)
- Renders final player position only (no animation)
- All player actions are event-sourced, so `moves` covers movement, item use, etc.

## Acceptance criteria

```
AC #1: From (1,1): each direction — e→(1,2), s→(2,1), w→(1,0), n→(0,1)
AC #2: moves=ss from default → (2,0)
AC #3: OOB from default → error (moves=n)
AC #4: Invalid char from default → error (moves=nxsw)
```

## Worklog

| AC | Highlights / Exceptions |
|---|---|
