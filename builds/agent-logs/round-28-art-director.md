# Art Direction — Round 28: "First Light"

## 1. CSS Color Palette

The canonical SNES palette for this project. All sprites, tiles, and UI must draw from these values. No off-palette colors.

```css
:root {
  /* Background / Shadows */
  --col-void:        #1a1a2e;   /* deep navy, window bg */
  --col-shadow:      #2e2e4a;   /* tile shadow/depth */

  /* Office Warm Neutrals */
  --col-floor-dark:  #8b6f47;   /* hardwood dark */
  --col-floor-mid:   #a8845a;   /* hardwood mid */
  --col-floor-light: #c4a26e;   /* hardwood highlight */
  --col-wall:        #d4c5a9;   /* off-white plaster */
  --col-wall-accent: #b8a48c;   /* wall shadow band */

  /* Character / NPC */
  --col-skin:        #f5c78e;   /* warm peach */
  --col-hair-dark:   #2c1a0e;   /* near-black brown */
  --col-hoodie:      #4a7c7e;   /* muted teal */
  --col-hoodie-shad: #2d5557;   /* hoodie shadow */
  --col-denim:       #5b7fa6;   /* jeans blue */

  /* UI / HUD */
  --col-hud-bg:      #1c2b3a;   /* dark slate panel */
  --col-hud-border:  #4e8098;   /* teal trim */
  --col-hud-text:    #e8dcc8;   /* warm cream */
  --col-hud-accent:  #f4a836;   /* amber highlight */
  --col-hud-danger:  #d94f4f;   /* cash burn red */
  --col-hud-good:    #6abf69;   /* revenue green */
}
```

---

## 2. Pixel Art Style Notes

**Constraints:** SNES 4-color-per-sprite-layer discipline. No more than 16 colors per tile or character sheet. Dithering permitted for gradients — 50% checkerboard only, no ordered/blue-noise.

**Characters (Jordan, Co-Founder, NPCs):**
- 32×48 base. 2px black outline on all silhouettes.
- Shading: 3-step max (base, shadow, highlight). Light source upper-left.
- Eyes: 2×2 pixels, whites visible only for "talking" or "surprised" frames.
- Proportions: Harvest Moon SD ratio — head is ~40% of total height. No neck.
- Hoodie draw order: body block → pocket detail → cuffs last.

**Tiles (Floor, Walls, Furniture):**
- 32×32 master tiles, internally divided into four 16×16 quadrants for engine flexibility.
- Floor planks run horizontal. Plank lines every 8px. Alternating dark/mid tone per plank.
- No tile should use pure black `#000000` — use `--col-shadow` for deepest values.
- Edge tiles get a 1px darker border on south and east edges (faux isometric depth).

---

## 3. UI and HUD Specs

**HUD Panel (`ui_hud_panel`, 128×32):**
- Background: `--col-hud-bg` fill, 2px `--col-hud-border` inset border, 1px `--col-void` outer border.
- Top-left corner: 3×3 pixel "rivet" dots in `--col-hud-accent`. Classic SNES panel corner motif.
- Text zone: 4px internal padding. Icons left-aligned, values right-aligned.

**Fonts:**
- Primary: Press Start 2P (8px, CSS @font-face or Google Fonts). All caps only.
- Secondary/small: 5×7 custom bitmap font for inline values (damage numbers, day counter).
- No antialiasing anywhere — `image-rendering: pixelated` on all canvas and img elements.

**Dialog boxes:** 3px border radius (SNES convention), dark bg + cream text, animated ellipsis on "waiting for input."

---

## 4. Animation Priorities

1. **Jordan idle** — 2-frame breathe cycle (shoulders shift 1px down, hair 1px up). 500ms loop.
2. **Floor tile** — static. No animation needed Round 28.
3. **HUD pulse** — cash value blinks `--col-hud-danger` when runway < 30 days. CSS `@keyframes` blink, no canvas needed.
4. **Defer:** walk cycles, desk interactions, co-founder. Round 29 earliest.

---

## 5. Visual Gag / Easter Egg

The co-founder's monitor, when the player gets close enough to read it in a later round, displays a single line of terminal output:

```
$ git blame everything
```

Blame points to the player's character name. No further explanation given.

---

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "npc_jordan_idle",
    "prompt": "16-bit pixel art character sprite, SNES Harvest Moon and Chrono Trigger style, young tech founder with messy dark brown hair and round glasses, wearing a muted teal hoodie and blue jeans, neutral friendly expression, facing forward, warm amber skin tone, transparent background, 2px black outline, clean flat shading with 3-tone depth, retro nostalgic feel, SD proportions with large head, inspired by Harvest Moon 64 and Stardew Valley character design",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Warm peach skin (#f5c78e), teal hoodie (#4a7c7e), dark brown hair (#2c1a0e). Harvest Moon SD proportions — head ~40% of height. Light source upper-left. Max 16 colors total."
  },
  {
    "asset_id": "tile_office_floor",
    "prompt": "16-bit pixel art top-down floor tile, SNES Harvest Moon style, warm hardwood plank flooring, horizontal planks every 8 pixels, alternating amber and tan tones, subtle wood grain texture, 2-tone dithering for depth, seamlessly tileable, retro nostalgic feel, inspired by Harvest Moon 64 and EarthBound interior environments",
    "subfolder": "tiles",
    "target_width": 32,
    "target_height": 32,
    "force_regenerate": false,
    "style_notes": "Floor colors: dark #8b6f47, mid #a8845a, light #c4a26e. No pure black. South and east edges 1px darker for faux isometric depth. Must tile seamlessly."
  },
  {
    "asset_id": "ui_hud_panel",
    "prompt": "16-bit pixel art UI HUD panel, SNES RPG style, dark slate background with teal border trim, small amber rivet dots in corners, clean retro interface aesthetic, inspired by Final Fantasy VI and Chrono Trigger menu panels, game UI element, no text",
    "subfolder": "ui",
    "target_width": 128,
    "target_height": 32,
    "force_regenerate": false,
    "style_notes": "BG #1c2b3a, border #4e8098 (2px inset), outer border #1a1a2e (1px), corner rivets #f4a836 at 3x3px. Sharp pixel corners, no antialiasing."
  }
]
<!-- ASSET_REQUESTS_END -->