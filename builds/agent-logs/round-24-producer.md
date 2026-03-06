Scope doc written to `/home/gtm/docs/scope-round24.md`.

**Summary of calls:**

- **Build 3 things**: status overlay panel (medium), menu nav/exit flow (low), color-coded visual polish (low). Total complexity is low-medium — this is achievable in one round.
- **Cut**: churn risk indicator (no backing mechanic), save/load, transitions, anything that touches gameplay.
- **Biggest risk**: ESC key conflicts and palette gaps (`PAL.devColor`, `PAL.salesColor`, `PAL.shadow`) — the implementation agent needs to audit those in the source before writing rendering code, not after.

The round is tightly scoped. The only way it blows up is if the implementation agent starts adding features that aren't wired to real data.