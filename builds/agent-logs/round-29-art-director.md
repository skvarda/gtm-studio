# GTM Studio — Art Direction Spec, Round 29
**Codename:** "What's Your Name, Founder?"

---

## 1. CSS Color Palette

All values pulled directly from the existing PAL object — no new colors introduced.

| Token | Hex | Usage |
|---|---|---|
| `PAL.dialogBg` | `#1a1a2e` | Name entry screen background |
| `PAL.dialogBdr` | `#4ec94e` | Outer border, cursor blink color |
| `PAL.dialogTxt` | `#f0e6c8` | Input text, labels |
| `PAL.dialogShadow` | `#0a0a1a` | Drop shadow, border inset |
| `PAL.uiAccent` | `#f0a030` | "ENTER YOUR NAME" header label |
| `PAL.uiBg` | `#16213e` | Input field fill |
| `PAL.playerHoodie` | `#5a7abf` | Founder sprite hoodie (existing) |

---

## 2. Pixel Art Style Notes

- **Grid:** 16px base tile, all UI elements snap to 8px increments
- **Sprites:** 32x48px founder sprite, same idle frame used on title screen — no new animation required this round, reuse existing asset
- **Border:** Double-pixel SNES dialog box border — 2px outer `#4ec94e`, 1px inner `#0a0a1a` gap, 2px inner `#f0e6c8` line
- **Input field:** 96px wide × 16px tall, cream background `#f0e6c8`, dark text `#1a1a2e`
- **Cursor:** Solid 2px × 12px vertical bar, blinks at 500ms interval using `PAL.dialogBdr`
- **No anti-aliasing.** `image-rendering: pixelated` everywhere. Canvas scaling at 3× (960×672 display)

---

## 3. UI & HUD Specs

- **Font:** Existing monospace pixel font, 8px cap height, all-caps header, mixed case input
- **Layout:** Centered panel, ~240px wide × 96px tall. Founder sprite floats 8px left of panel
- **Header:** "ENTER YOUR NAME" in `PAL.uiAccent`, 1px letter-spacing
- **Subtext:** "MAX 12 CHARS · ENTER TO CONFIRM" in `PAL.dialogTxt` at reduced opacity (draw at 60% alpha)
- **HUD integration:** `playerName` renders in top-left HUD replacing static "FOUNDER" label, same 8px font

---

## 4. Animation Priorities

1. **Cursor blink** — highest priority, must feel snappy (500ms on/off)
2. **Screen transition** — reuse existing fade-to-black between `nameEntry` → `play`
3. **Founder sprite** — single idle frame only; breathing bob animation is stretch goal, skip this round
4. **Welcome dialog** — standard typewriter scroll at existing dialog speed

---

## 5. Visual Gag / Easter Egg

If the player types **"STEVE"**, **"ELON"**, or **"MARK"** — the welcome dialog appends a single deadpan line:

> *"...Bold choice of name. The board will have opinions."*

No mechanical effect. Pure flavor. One conditional string check.

---

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "ui_nameentry_panel",
    "prompt": "16-bit pixel art UI panel, SNES Harvest Moon style, dark navy background with double-pixel green border frame, cream colored empty text input field inside, retro game dialog box aesthetic, clean pixel linework, warm nostalgic palette with deep navy #1a1a2e background and green #4ec94e border accent, no text or characters inside the frame, inspired by Pokemon and Chrono Trigger name entry screens",
    "subfolder": "ui",
    "target_width": 240,
    "target_height": 96,
    "force_regenerate": false,
    "style_notes": "Must feel like a classic SNES RPG name entry panel — clean, minimal, no gradients"
  }
]
<!-- ASSET_REQUESTS_END -->