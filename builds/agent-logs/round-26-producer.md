Scope doc written to `/home/gtm/docs/scope-round26.md`. Here's the summary:

**Build:** Name Entry → Darren Intro → Class Select. In that order, no parallelism — each gates the next.

**Cut:** Animated Darren walk-up (static is fine), mid-game class-triggered events (modifiers live now, events Round 27), backtracking (by design), name entry sound.

**Biggest risk:** The keydown listener for name entry must be state-scoped. A leaking input handler will silently break gameplay controls and show up late in QA. Flag this to the programmer as a day-one concern.