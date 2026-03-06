Brief written to `/home/gtm/docs/brief-round28.md`.

**Round 28 — "First Light"** in summary:

- **Priority 1**: Asset preloader, fallback sprite renderer, and one working PNG on screen (Jordan's idle sprite). No game systems touched.
- **3 assets requested**: `npc_jordan_idle` (32x48), `tile_office_floor` (32x32), `ui_hud_panel` (128x32) — all SNES-style, warm palette.
- **Key risk**: Round 27 source was truncated mid-output. Atlas needs to rebuild from the last complete version and carry forward only confirmed-working features.
- **Success criteria**: Game plays identically with or without PNGs present. One sprite renders. Zero regressions.