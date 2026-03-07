Now I have enough context. Here's the brief:

---

# GTM Studio — Strategic Brief, Round 29

**Codename:** "What's Your Name, Founder?"

## #1 Priority: Player Name Entry Screen

The studio owner's directive is clear — **add a name creation screen at game start**. Before the player enters the office, before any gameplay begins, we need a clean, SNES-style name entry screen where the player types (or selects) their founder name. This name persists throughout the game and appears in dialog, HUD, and any narrative moments. This is the single most important deliverable this round.

## Features to Implement

**1. Name Entry Screen (MUST SHIP)**
- New game state: `nameEntry`, inserted between `titleScreen` and `play`
- SNES-style text input: show a pixel-art keyboard grid the player navigates with arrow keys, or accept direct keyboard typing (preferred for PC — simpler, faster). Max 12 characters.
- Display the player's hoodie-wearing sprite next to the input field for personality.
- Confirm with Enter/Z. Store in a `playerName` variable. Default fallback: "Alex" if somehow empty.
- The name should appear in dialog boxes (replace any hardcoded "you"/"founder" references), the HUD, and day-end summaries.

**2. Welcome Dialog Integration**
- After name entry, transition to the office with a short personalized welcome dialog: *"Welcome to the office, {name}. Your angel funding just hit the account. $120K to change the world... or at least ship v1."*
- This replaces any existing intro text and ties the name into the fiction immediately.

**3. Round 28 Codebase Stabilization**
- The Round 28 output was truncated mid-asset-preloader. The downstream build agent must start from the **Round 9 stable build** (`saas-startup-simulator.html`) as the canonical base, not the broken Round 28 fragment.
- Preserve all existing systems: manual day transitions, AP system, employee hiring, game states, the full PAL palette, and tile map architecture.

## Direction to Downstream Agents

- **Build Agent:** Base your work on `/home/gtm/saas-startup-simulator.html` (Round 9, ~1744 lines). Do NOT use the truncated Round 28 output. Add the `nameEntry` state and wire it into the existing state machine between `titleScreen` and `play`.
- **Art/UI Agent:** The name entry screen should match the existing SNES palette (PAL object). Dark background, green accent border (`PAL.dialogBdr`), cream text (`PAL.dialogTxt`). Keep it simple — a bordered input area, blinking cursor, player sprite.
- **Narrative Agent:** Update all dialog strings to use the player's name variable. Grep for hardcoded player references and parameterize them.
- **QA Agent:** Test the full flow: title → name entry → gameplay. Verify name persists across day transitions, dialogs, and game over. Test empty input, max length, and special characters.
- **All Agents:** Do not add asset preloading, external image dependencies, or network calls. This is a single-file, self-contained HTML game. All rendering is procedural via canvas.

## Bugs to Fix
- **Round 28 regression:** The asset preloader pattern (external PNGs) breaks the single-file architecture. Strip it entirely if any trace remains.
- **Day pacing (standing issue from Round 22):** Confirm day transitions are still manual and player-controlled. No auto-timers.

---

*Signed,*
**Executive Director, Round 29**
GTM Studio