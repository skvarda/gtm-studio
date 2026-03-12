# Art Direction Notes - Round 22: UI Polish

## Focus: Interface Elements & Visual Clarity

This round we're polishing the core UI elements that players interact with constantly. The game's manual day system and Action Point economy need clear, readable visual feedback.

### Key UI Elements to Develop:

**Dialogue System**
- Dialogue box frame: Dark panel with subtle warm amber border glow
- Should feel like a retro computer terminal but warmer
- Bottom-screen placement, doesn't obscure character interaction
- Typewriter text effect compatibility

**HUD Elements** 
- Action Point counter: Visual representation of 3 AP per day
- Should be immediately readable - amber dots/crystals that dim when spent
- Day/week indicator with warm numerical display
- MRR counter with dollar sign iconography

**Email/Dashboard UI**
- Morning email inbox panel styling
- List-style layout with warm dark background
- Unread/read state visual differentiation
- Consistent with overall SNES aesthetic

### Visual Consistency Goals:
- All UI uses established amber/teal palette
- Dark panels (#2D2D44) with amber (#D4A04A) highlights for interactives
- Avoid harsh lines - subtle glows and rounded corners where possible
- Readable at 2x scale (640x360 display)

### Character Priority:
Jordan's sprite is still needed for the apartment location. Co-founder character should have that "mysterious genius" vibe - glasses, slightly disheveled but thoughtful appearance.

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "ui_dialogue_box",
    "prompt": "16-bit pixel art dialogue box frame, SNES RPG style, dark blue-grey panel with warm amber border glow, bottom screen placement, retro computer terminal aesthetic but warmer, transparent background, clean pixelated edges",
    "subfolder": "ui",
    "target_width": 320,
    "target_height": 80,
    "force_regenerate": false,
    "style_notes": "Must be readable at 2x scale, warm glow effect around border, dark interior for text contrast"
  },
  {
    "asset_id": "ui_action_points_full",
    "prompt": "16-bit pixel art Action Points counter, SNES style, 3 glowing amber energy crystals or dots in a row, warm golden glow, dark background panel, energy meter aesthetic",
    "subfolder": "ui", 
    "target_width": 96,
    "target_height": 24,
    "force_regenerate": false,
    "style_notes": "Three distinct energy indicators, must read clearly as 'full' state"
  },
  {
    "asset_id": "ui_email_inbox_panel",
    "prompt": "16-bit pixel art email inbox UI panel, SNES computer interface style, dark blue-grey background with amber highlights, retro terminal aesthetic, list-style layout with line separators, warm amber accent colors",
    "subfolder": "ui",
    "target_width": 240,
    "target_height": 160,
    "force_regenerate": false,
    "style_notes": "Clean lines for text readability, warm tech aesthetic, consistent with dialogue box styling"
  },
  {
    "asset_id": "npc_jordan_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, co-founder tech genius, glasses, slightly messy brown hair, casual hoodie or sweater, thoughtful mysterious expression, warm amber and teal palette, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Mysterious but approachable genius archetype, glasses must read clearly at small size, slightly disheveled but thoughtful appearance"
  },
  {
    "asset_id": "ui_hud_panel",
    "prompt": "16-bit pixel art HUD panel background, SNES interface style, dark blue-grey panel with subtle warm amber border, top or side screen placement, clean rectangular frame with soft edges, retro game UI aesthetic",
    "subfolder": "ui",
    "target_width": 200,
    "target_height": 60,
    "force_regenerate": false,
    "style_notes": "Background panel for displaying game stats, consistent with dialogue box frame styling, space for text overlays"
  }
]
<!-- ASSET_REQUESTS_END -->
