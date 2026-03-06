# Round 24 Game Mechanics Design Doc — "The Status Screen"

## Core Gameplay Loop
The loop is unchanged — spend AP, end day, survive. Round 24 adds one new layer: **information literacy**. Players who check their status panel make better decisions. The panel is passive but its presence creates an implicit feedback cycle: act → check status → re-evaluate → act again.

## Specific Mechanics to Implement

**Status Panel (ESC or M)**
- Opens a full-screen SNES-style overlay drawn to the offscreen buffer in screen-space
- Two nav options: Resume (returns to play) and Exit to Title — cursor moves with arrow keys, confirm with Z/Enter
- Display rows: Cash, Daily Burn, MRR, Runway (days), Product Level, Customers, AP Remaining, Team Roster

**Runway Color Coding**
- Green: 30+ days
- Yellow: 10–29 days
- Red (flashing): 1–9 days
- This is the core feedback mechanic — players learn to fear red before they understand why

**Team Roster Row**
- Lists each hired employee by role, using role-distinct colors (dev = blue, sales = green)
- Shows "Co-Founder: ???" in gray — reinforces the mystery arc at zero cost

**AP Counter in Panel**
- Displays AP remaining for the current day, so players can cross-reference action cost before committing
- Replaces the need to memorize the HUD — teaches resource awareness

## Progression Gates
No new gates added. The status panel is always available. This is intentional — information should never be locked.

## Difficulty Curve
The panel makes early game *feel* harder because players can now see exactly how close to zero they are. Ignorance was a buffer. Knowledge creates tension without changing any numbers.

## Player Feedback Loops
- Open panel → see runway → close panel → hire or don't hire (decision is now informed)
- Red runway warning trains players to check burn rate before spending AP on product vs. sales
- Roster row showing "???" creates curiosity pressure that pays off in late-game co-founder reveal

## The Fun Moment to Engineer
**The 4-Day Runway Screenshot.** When runway hits 4 or fewer days, the red runway value pulses (alternating bright red / dark red on each render frame). The panel layout, the hoodie protagonist reflected in the numbers, the "Co-Founder: ???", and the blinking red — this is the shareable moment. Engineer the pulse so it's legible as a still image: one frame bright, one frame dim, not a blur.