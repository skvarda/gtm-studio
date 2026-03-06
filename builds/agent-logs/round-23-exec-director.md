## Round 23 Brief: "Make It Feel Alive"

**Situation:** The Round 22 build was lost (truncated, never saved to disk). We're building on the stable Round 9 codebase. The reported day pacing bug was a false alarm — days are already player-controlled.

**Priority One: Office life and game feel.** The game works but feels static. This round brings the world to life.

**Three features:**
1. **Idle animations** — breathing bobs, typing co-founder, employee fidgets, flickering monitors. Simple 1-2px sprite shifts on timers.
2. **AP spending feedback** — screen flash, floating "+1 Product" text, terminal processing beat. Makes each action feel weighty.
3. **Cosmetic day clock** — Morning/Afternoon/Evening tied to AP spending (3 AP = 3 phases). Window tint shifts. Never auto-ends the day.

**Key directive to all agents:** Build on the existing 1744-line Round 9 file. Do not start from scratch. The day system is correct — do not add timers or auto-advance.

Brief saved to `/home/gtm/docs/brief-round23.md`.