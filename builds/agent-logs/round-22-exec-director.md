Strategic brief written and saved to `/home/gtm/docs/brief-round22.md`.

**Summary of Round 22 direction:**

**Priority #1:** Fix day pacing. Days must last 45-60 seconds minimum, and the player — not a timer — controls when the day ends.

**Three features:**
1. **Visible day clock** (morning/afternoon/evening) that is cosmetic, not coercive — days never auto-end without player confirmation
2. **AP spending animations** to add rhythm and prevent instant action resolution
3. **Idle office ambiance** so employees do things while the player decides

**Root cause of the bug:** Likely a timer constant set too low or a frame-based counter advancing days in milliseconds instead of seconds. All agents are directed to audit and fix this before any other work.

*Signed: Executive Director, Round 22*