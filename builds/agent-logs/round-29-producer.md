# Round 29 Scope & Prioritization Doc
**Codename: "What's Your Name, Founder?"**

---

## Build This Round (Top 3)

**1. Name Entry Screen** — *Complexity: Low-Medium*
New `nameEntry` game state between `titleScreen` and `play`. Direct keyboard input (printable ASCII 32–126), backspace, Enter to confirm. Max 12 chars, blinking cursor, player sprite rendered via canvas. Store in `playerName`, default `"Alex"` if empty. This is the entire point of Round 29.

**2. Welcome Dialog Integration** — *Complexity: Low*
One personalized dialog on first entry to office: *"Welcome to the office, {name}. Your angel funding just hit the account..."* Wire `playerName` into existing dialog system. Replace any hardcoded "founder"/"you" references in dialogs and HUD.

**3. Round 28 Regression Fix** — *Complexity: Low*
Strip any asset preloader / external PNG dependency that leaked from Round 28. Rebuild from `saas-startup-simulator.html` (Round 9 stable). Single-file, no network calls, no external assets.

---

## Cut / Defer

- **SNES keyboard grid navigation** — defer indefinitely. Direct typing is faster and sufficient for PC.
- **`ui_nameentry_panel` Iris asset** — cut. All rendering is procedural canvas. External PNGs break the architecture.
- **Name persistence across save slots** — not in scope. No save system exists yet.
- **Mid-game name references** — defer full grep/replace pass. Nail the intro dialog; document the rest for Round 30.

---

## Non-Negotiables

- Single-file HTML output
- Manual day transitions preserved — no auto-timers introduced
- `playerName` visible in HUD by end of round

---

## Known Risks

- State machine wiring: `nameEntry` must cleanly exit to `play` without edge cases on empty input or fast-clicking Enter on title screen.
- Cursor blink tied to frame count — confirm it doesn't drift if player idles.