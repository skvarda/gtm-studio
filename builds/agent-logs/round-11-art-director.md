# Art Direction — Round 11 Visual Spec

## 1. CSS Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--event-border` | `#D4382A` | Event popup border (red alert, distinct from dialog's `#3B4994`) |
| `--event-bg` | `#1A1028` | Event popup fill, darker than standard dialog |
| `--event-highlight` | `#F5C542` | Event title text, choice hover state |
| `--milestone-gold` | `#E8A835` | Completed milestone icon fill |
| `--milestone-grey` | `#4A4A5A` | Locked milestone icon fill |
| `--cofounder-text` | `#7EC8A0` | Co-founder dialogue tint (distinguish from generic NPC white) |

Existing palette (`#3B4994` dialog blue, `#2D2136` bg, `#E8E8E8` body text) remains untouched.

## 2. Pixel Art Notes

No new sprites. The event popup reuses the existing dialog box renderer but swaps border color to `--event-border` and draws a 16x16 **alert icon** (exclamation mark in a triangle, 2-color, `#D4382A` + `#F5C542`) in the top-left corner of the popup. Render at native 320x224, no sub-pixel cheating. All icon work uses the existing 16x16 tile grid. Milestone icons are 8x8 glyphs — star shape, filled gold when earned, grey outline when locked. Draw them in a row, max 4 icons, no anti-aliasing.

## 3. UI / HUD Specs

**Event popup**: Same dimensions as dialog box. Red border (2px at native res). Title line rendered in `--event-highlight`, body in `--body-text`. Choice options use the existing menu selector arrow.

**Milestone bar**: Sits below the AP counter on the HUD. Four 8x8 stars in a horizontal row, 2px gap. Tooltip on hover is out of scope — milestones are labeled only when earned via a one-line dialog flash.

**Font**: Continue using the existing bitmap font renderer. No new typefaces.

## 4. Animation Priorities

Single priority: **event popup entrance**. Slide the popup up from the bottom of the screen over 6 frames (~100ms at 60fps). No easing — linear slide, SNES-authentic. Dialog dismiss is instant (match existing behavior). No animation work on milestones; they simply snap from grey to gold.

## 5. Visual Gag

When the "Co-founder spotted at a competitor's office" event fires, the co-founder NPC sprite in the office is temporarily replaced with a **poorly drawn cardboard cutout** — same silhouette but flat single-color fill (`#2D2136`) with two white dots for eyes. He returns to normal next morning. No tooltip, no explanation. Players will notice.