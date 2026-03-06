Done. `docs/art-direction-round17.md` is written.

**Summary of what this round's art doc does:**

- **Locks the palette** — every legal hex value is listed in one block. Anything outside it is a bug. No new colors added.
- **Enforces rendering rules** — 320x224 native, integer pixels, `imageSmoothingEnabled = false`, no `drawImage`.
- **Carries forward all Round 16 UI specs** unchanged, with explicit enforcement callouts for the Developer (font sizes, box dimensions, title screen save indicator).
- **Ranks animations 1-5** with exact frame counts so the Developer doesn't improvise or skip any.
- **Adds one small visual gag** — the floppy disk tooltip, a fourth-wall quip that costs ~8 lines of code and one flag.

The Developer has a single canonical color reference and zero ambiguity on visual targets.