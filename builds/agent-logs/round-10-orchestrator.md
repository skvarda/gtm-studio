# Orchestrator Brief — Round 10

## Status Assessment

Round 9's developer agent timed out. This means we likely have no new code from that round. Our priority is recovery: we need to ensure the build is stable, identify what state the codebase is in, and push forward with a focused, achievable set of deliverables. No ambitious new systems this round — we stabilize and ship what we have.

## Number One Priority: **Core Gameplay Loop Completion**

The player must be able to experience a full early-game cycle: start day → make a decision (hire someone OR build a feature) → see the result → end day → repeat. If this loop isn't fully functional yet, nothing else matters. Every agent should orient their work around making this loop feel complete and playable.

## Specific Deliverables This Round

**1. Day Cycle & Decision System (Critical)**
- The player starts each in-game day in the office. A simple menu presents 2-3 choices: "Work on Product," "Hire a Developer," "Hire a Salesperson," or "Go to Meeting." Each choice advances the day, updates resources (cash, product progress, revenue), and returns the player to the office. This is the skeleton everything else hangs on.

**2. HUD & Resource Display (High Priority)**
- The player needs to see their cash balance, burn rate, product completion %, and current team size on screen at all times. A simple top-bar or bottom-bar HUD with 16-bit styled icons and numbers. No fancy animations — just clear, readable information.

**3. First Hire Event (Medium Priority)**
- When the player chooses to hire for the first time, show a short pixel-art cutscene or dialogue box introducing the new team member. This is the first "moment" in the game and should feel rewarding. Keep it to 3-4 dialogue boxes max.

## Agent Direction

- **Artist**: Focus on office tilemap polish and HUD icon sprites (cash, team, product). Ensure the player character sprite has idle and walk-down animations complete.
- **Writer**: Write dialogue for the first hire event (developer and salesperson variants, 3-4 lines each). Write 2-3 short "start of day" flavor texts.
- **Musician**: Ensure we have a looping office BGM track and a short jingle for the hire event. Nothing new beyond that.
- **Developer**: Stabilize the build first. Verify the project compiles and runs. Then implement the day cycle state machine and HUD. Wire up the first hire event. Keep scope tight.
- **QA**: Once the build is up, test the full day loop end-to-end. File bugs on any broken transitions, missing assets, or resource calculation errors.
- **Designer**: Document the exact resource formulas (daily burn rate, revenue per customer, product progress per work day). Keep numbers simple for now — we'll balance later.

## Bugs & Quality

Since Round 9 timed out, do a full build health check before writing new code. If there are merge conflicts or broken imports from prior rounds, fix those first. Do not layer new features on a broken foundation.

---

*Orchestrator Round 10*