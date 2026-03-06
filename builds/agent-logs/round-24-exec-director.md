Brief written to `/home/gtm/docs/brief-round24.md`.

**Round 24 — "The Status Screen"** focuses on one thing: giving the player a proper in-game status menu. Key deliverables:

1. **Full status overlay** (ESC/M to open) showing cash, burn, MRR, runway, product level, customers, team roster, and AP remaining
2. **Menu navigation** with Resume and Exit to Title options using the existing cursor system
3. **Visual polish** — color-coded runway warnings, role-colored employee list, SNES-style panel layout

All built on top of the existing `menu`/`gameState` infrastructure without touching day pacing or the action menu system.