Written to `docs/scope-round17.md`. Here's the summary:

**BUILD (3 items):**
1. **Build consolidation** (HIGH) -- Merge everything into one working `game.html` from the Round 9 base. Kill the stale files.
2. **Victory states & stats screen** (MEDIUM) -- Four endgame paths, tint overlay, co-founder stand-up, stats reveal.
3. **localStorage save/load** (LOW-MEDIUM) -- Auto-save at day end, "Continue (Day X)" on title screen.

**CUT:**
- Purple monitor easter egg (defer to R18 -- viral moment is worthless if the game doesn't run)
- Floppy disk tooltip gag (cut entirely)
- Day-end summary line and milestone toasts (defer -- polish, not structure)

**Key risk:** The two codebases use different coordinate systems. Round 9 (320x224 native) is the only valid base. Round 7's `game.html` is dead code. The developer should not attempt to merge it.