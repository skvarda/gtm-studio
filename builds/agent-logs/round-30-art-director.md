---

# Round 30 Visual Direction — "The Finish Line"

**Art Director | SaaS Startup Simulator**

---

## 1. CSS Color Palette

Core SNES-era system palette — warm, readable, slightly desaturated for that phosphor-glow feel.

```
/* Base Environment */
--bg-void:        #0D0D1A   /* canvas letterbox black */
--bg-floor:       #C8B88A   /* warm beige office carpet */
--bg-wall-light:  #E8D8B0   /* cream wall, top-face tiles */
--bg-wall-dark:   #9A8A6A   /* wall shadow, depth face */
--bg-desk:        #7A5C3A   /* medium oak desk brown */

/* UI Chrome */
--ui-panel:       #1C2B3A   /* dark navy dialog box */
--ui-border:      #4A8FBF   /* mid blue border/frame */
--ui-highlight:   #F0C040   /* gold accent, HP-bar style */
--ui-text:        #F0EAD6   /* warm off-white body text */
--ui-subtext:     #8AAABB   /* muted teal secondary text */

/* HUD Status */
--hud-green:      #48C060   /* cash positive / success */
--hud-red:        #D03050   /* danger / burn rate / loss */
--hud-amber:      #E08820   /* warning / mid state */
--hud-blue:       #3888D8   /* AP pips / info */

/* Victory Screen (NEW Round 30) */
--vic-gold:       #FFD700   /* champion header text */
--vic-green:      #30C870   /* MRR reached glow */
--vic-bg:         #0A1E0A   /* deep forest win backdrop */
--vic-star:       #FFFAAA   /* confetti / sparkle dots */
```

---

## 2. Pixel Art Style Notes

**Perspective:** Top-down 3/4. Walls have a lit top face and a shadowed front face — two separate tile variants, never blended.

**Tile grid:** 16×16 native, scaled 3× to 48px display. No sub-pixel alignment. Everything snaps.

**Character sprites (32×48):** Large head-to-body ratio, Harvest Moon proportions. Three frames of idle breathing animation (frame 0 → frame 1 → frame 0 → frame 2, loop). Shadow is a flat dark ellipse, not a sprite.

**Outlines:** 1px hard black border on all characters and interactive objects. No anti-aliasing — `imageSmoothingEnabled = false` is non-negotiable.

**Desk objects:** Monitors glow with a 1-pixel inner blue rect on the screen face. Coffee mugs are 8×8 tile decoration, no animation.

**Co-founder Jordan (victory reveal):** Same idle sprite but add a subtle "stand up" frame — shoulders shift up, chin lifts. One extra frame, triggered only on victory.

---

## 3. UI & HUD Specs

**Dialog box:** 4px border in `--ui-border`, filled `--ui-panel`, 2px inner shadow line in `--vic-gold` for key moments (victory, events). Positioned bottom 25% of canvas.

**Pixel font:** 5×7 bitmapped uppercase, 1px letter spacing. No system fonts rendered on canvas. Use the existing pixel font renderer — do not substitute.

**HUD bar (top strip):** 8px tall. Left: DAY counter. Center: MRR in green. Right: CASH in green/amber/red depending on runway. AP pips are 6×6 filled squares.

**Victory screen layout:**
- Full canvas overlay, `--vic-bg` fill
- `--vic-gold` header: `YOU SHIPPED IT` (large, centered, top third)
- Jordan's quote in `--ui-text`, dialog box style, mid-canvas
- Stats block: Day / MRR / Cash / Team / Customers — right-justified two-column
- `[R] RESTART` prompt blinking at 500ms in `--vic-star`

**Random event popup:** Re-use dialog box. Add a 2px `--hud-amber` border variant for neutral/mixed events, `--hud-green` for positive, `--hud-red` for negative.

---

## 4. Animation Priorities

1. **Victory confetti** — highest priority. 20–30 pixel dots, `--vic-star` and `--vic-green`, fall from top at varied speeds. 2px squares, no physics, linear descent, wrap when off-screen.
2. **Jordan stand-up frame** — single frame swap on victory trigger, holds indefinitely.
3. **Event popup slide** — dialog box translates up 8px over 6 frames from off-screen bottom. Simple lerp.
4. **HUD MRR counter tick** — when MRR increases, flash `--vic-gold` for 3 frames, return to `--hud-green`.
5. **Idle breathing** (existing, maintain) — don't break during victory transition.

---

## 5. Visual Gag / Easter Egg

**The Pivot Button.** Hidden in the corner of the co-founder's desk: a tiny 8×8 red button sprite labeled `PIVOT` in 3px text. If the player walks up and interacts with it, Jordan says: *"Don't touch that."* Nothing else happens. The button is always there. It never does anything. It is the co-founder's only strong opinion.

---

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "ui_victory_overlay_bg",
    "prompt": "16-bit pixel art full-screen victory background, SNES era style inspired by Chrono Trigger end-screen and Harvest Moon seasonal celebration, deep forest green gradient backdrop (#0A1E0A to #1A3A1A), scattered gold star confetti pixel dots, warm retro nostalgic glow, subtle scanline texture, no characters, clean flat pixel art, trophy or laurel pixel motif in corner",
    "subfolder": "ui",
    "target_width": 320,
    "target_height": 224,
    "force_regenerate": false,
    "style_notes": "Must feel triumphant but cozy — SNES win screen energy, not flashy. Deep green with gold accents."
  },
  {
    "asset_id": "npc_jordan_victory",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, character with messy dark hair and round glasses, casual hoodie, standing tall with a surprised-but-pleased expression, slight upward shoulder shift and chin raised, facing forward, warm amber and teal palette, transparent background, clean 1px black outline, retro nostalgic feel, Harvest Moon and Chrono Trigger character proportions, celebrating pose",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "This is Jordan's victory reveal frame — same base design as idle but standing taller, slightly proud expression. Must match idle sprite palette exactly."
  },
  {
    "asset_id": "tile_pivot_button",
    "prompt": "16-bit pixel art desk prop sprite, SNES style, tiny red button on a small panel base, labeled with pixel text, warm retro office aesthetic, clean linework, 1px black outline, transparent background, Harvest Moon item sprite feel, subtle gloss highlight on button top",
    "subfolder": "tiles",
    "target_width": 16,
    "target_height": 16,
    "force_regenerate": false,
    "style_notes": "Easter egg prop. Should look mildly ominous but cute. Red button, gray panel base. Harvest Moon object sprite scale."
  }
]
<!-- ASSET_REQUESTS_END -->