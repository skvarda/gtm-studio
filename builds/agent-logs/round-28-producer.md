Scope doc written to `/home/gtm/docs/scope-round28.md`. Summary:

**Build:** Preloader → fallback renderer → Jordan sprite. In that order, no shortcuts.

**Cut:** Floor tiles (regression risk), HUD panel (truncated asset report, unconfirmed file), all animation, all game logic changes.

**Non-negotiable:** Game must be identical with zero PNGs present. Rebuild from verified source only — the truncated Round 27 output is the biggest risk this round, and that has to be resolved before a single line of asset code is written.