# Round 11 Scope & Prioritization

## BUILD

**1. Day-End Random Event System**
Core loop addition: 14-event pool, 60% fire chance per day-end, weighted random selection with state guards, binary/triple choices with cash/MRR/progress consequences. Events fire after AP spend, before burn deduction. Single event popup reusing dialog/menu system with a tinted border.
**Complexity: High** — touches day cycle, dialog system, menu system, game state. ~300-400 lines.

**2. Milestone System (Lite)**
4 milestones with threshold triggers (MRR $500, Product 50%, 3 employees, Day 15). Track in game state, display as simple checklist on HUD. No gating of actions or events — just visual progression markers.
**Complexity: Low** — state checks + HUD rendering. ~60-80 lines.

**3. Co-founder Context Dialogue**
8-10 lines keyed to game state brackets (low cash, high MRR, first hire, no employees, etc.). Replace current static dialog with a state-aware picker.
**Complexity: Low** — data + one selection function. ~50-60 lines.

## CUT / DEFER

- **Milestones gating actions or unlocking event types** — defer to Round 12. Adds coupling complexity for minimal payoff right now.
- **Event popup distinct art/icon area** — reuse existing dialog box as-is with a color tint. No new frame design.
- **Audio hooks for events** — explicitly deferred per brief.
- **Three-choice events beyond what the menu already supports** — if menu handles 3 items cleanly, keep. If not, cap at 2 choices. Don't refactor the menu system.

## NON-NEGOTIABLES

- Events must respect state guards (no "employee poached" with 0 employees)
- All choice branches must resolve cleanly back into the day cycle — no stuck states
- Existing systems (hiring, terminal, game over) pass regression
- Event outcomes must not bankrupt the player on Day 1-3

## KNOWN RISKS

- Event balance: too punishing = unfun, too gentle = ignorable. Err toward gentle, tune later.
- Dialog system may need minor tweaks for longer event text. Budget time for this.
- 14 events is a lot of content to wire in one round. If tight, ship 10, backlog 4.