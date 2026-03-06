# Game Mechanics Design Doc — Round 26

## 1. Core Gameplay Loop

Round 26 adds a **pre-game onboarding loop** that gates entry to the main simulation:

`Title Screen → Name Entry → Intro Scene (Darren) → Class Select → Day 1`

This loop runs once per new game. Each state is a discrete phase with its own input handling and no backtracking once committed (pressing confirm locks in the choice — real startup energy).

## 2. Specific Mechanics to Implement

**Name Entry:** Keyboard-driven character grid (A–Z, 0–9, DEL, END). 12-char max, stored as `gameState.companyName`. Cursor blinks at 30-frame interval. CONFIRM disabled until at least 1 character entered.

**Intro Scene:** Darren delivers 4 lines of dialog via the existing dialog system. Line 4 — *"So... what is it you do again?"* — auto-triggers the class select state when dismissed. No player choice here; Darren talks, you listen.

**Class Select:** Three-panel popup rendered in a single draw call. Each card shows: class name, flavor text (1 line), PROS (+stat), CONS (-stat), pixel art icon (16x16 placeholder). Selecting a class sets `gameState.playerClass` and applies permanent multipliers to `productPerDay` and `customersPerSale`.

| Class | Product Mult | Customer Mult |
|---|---|---|
| Dev | +30% | -20% |
| Seller | -20% | +30% |
| Marketer | +15% | +15% |

## 3. Progression Gates

- Day 1 cannot start without a confirmed class selection
- Class selection cannot appear without completing the Darren scene
- Darren scene cannot appear without a non-empty company name

## 4. Difficulty Curve

Class choice is the first difficulty decision. Dev players will struggle to acquire customers early; Seller players will be cash-rich but product-starved. Marketer is the "I've never played this" pick — balanced but slightly slower on both axes. The curve diverges by Day 5.

## 5. Player Feedback Loops

- Name entry: each keystroke flashes the selected character tile
- Class hover: stats update in real-time as cursor moves between cards
- Class confirm: brief full-screen flash + sound cue before transitioning to Day 1

## 6. Engineered Fun Moment

After the player confirms their class, Darren delivers one final line — specific to their choice:

- **Dev:** *"Cool. I'll handle the business stuff."*
- **Seller:** *"Nice. I'll handle the technical stuff."*
- **Marketer:** *"Sure. I'll handle... the other stuff."*

This is the first joke that lands differently on repeat playthroughs. It's cheap to implement, replayable, and immediately sets Darren's comedic function for the whole game.