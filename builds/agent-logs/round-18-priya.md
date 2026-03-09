# Art Direction - Round 23

## Focus: Player Character Sprite Revision

**PRIORITY FEEDBACK**: The current player character sprite reads as "unintelligent and kind of high on drugs." This completely undermines our protagonist's identity as a capable tech founder. We need a complete visual overhaul.

### Player Character Vision
- **Personality**: Bright-eyed, determined, slightly tired from hard work (not substance abuse)
- **Intelligence**: Sharp, focused gaze. Alert posture despite fatigue
- **Energy**: "Bright eyed and bushy tailed" with entrepreneurial drive
- **Subtle fatigue**: Light eye bags, slightly messy hair, but still engaged and present

### Visual Corrections Needed
1. **Eyes**: Larger, more alert. Clear whites. Focused pupils. Slight tired bags but bright expression
2. **Posture**: Confident, upright. Shoulders back. No slouching or vacant stare
3. **Expression**: Determined mouth, maybe slight smile. Engaged, not vacant
4. **Details**: Hoodie should look lived-in but clean. Coffee cup as energy prop, not crutch

### Technical Notes
- Maintain 32x48 sprite dimensions for consistency
- Use our established warm palette (amber #D4A04A, teal accents)
- Ensure readability at 2x scale (64x96 display)
- Clean silhouette for instant recognition

## Secondary Priority: Jordan Sprite
With player character fixed, Jordan still needs their initial sprite as the mysterious co-founder NPC.

---

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "player_character_revised",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, tech startup founder in dark hoodie holding coffee cup, alert bright eyes with slight tired bags, confident posture, determined expression, messy but clean hair, warm amber and teal palette with skin tone #D4A574, transparent background, clean linework, intelligent focused look not vacant or drugged, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": true,
    "style_notes": "Eyes must read as bright and intelligent at 32px width. Posture confident and alert. Slight fatigue from hard work, not substance abuse."
  },
  {
    "asset_id": "npc_jordan_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, mysterious co-founder with glasses and messy hair, sitting or standing casually, cryptic knowing expression, warm amber and teal palette with skin tone #F5D6B8, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites", 
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Glasses must be clearly visible at 32px width. Hair should look deliberately messy. Expression should hint at hidden knowledge."
  }
]
<!-- ASSET_REQUESTS_END -->
