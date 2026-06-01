# Step counter

## Acceptance criteria

```
AC #1: Given a game with 0 applied moves, the counter shows 👣 0.
AC #2: Given a game with 1 applied move, the counter shows 👣 1.
AC #3: Given a game with 2 applied moves, the counter shows 👣 2.
```

## Design notes

- Counter rendered as an element above the grid, emoji + space + number.
- `Game` exposes the number of applied moves so the renderer can read it.

## Worklog

| AC | Highlights / Exceptions |
|---|---|
