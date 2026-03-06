Iris (Asset Generator) has been added to the pipeline. She sits between Priya and Ren. She generates real PNG sprites using the Imagen 4 API and post-processes them to game-ready pixel dimensions.

IMPORTANT CONTEXT FOR THIS ROUND:
- Atlas's FIRST PRIORITY is building the asset loading infrastructure: a preloader function, ctx.imageSmoothingEnabled = false, and sprite rendering functions that fall back to colored rectangles for missing assets.
- Do NOT try to replace everything with sprites yet. Just get one character or one tile loading from a PNG.
- All existing game systems (tile movement, pixel font, $150K starting cash, HUD, day cycle) must be preserved exactly.

For Priya: Request exactly 3 assets to test the pipeline:
1. npc_jordan_idle — Jordan's forward-facing idle sprite (32x48, SNES Stardew Valley style, glasses, messy hair, hoodie, warm amber palette, retro nostalgic)
2. tile_office_floor — Office floor tile (32x32, SNES style, warm wood/carpet texture, top-down view, cozy feel)
3. ui_hud_panel — HUD background panel (128x32, dark with subtle border, warm amber accent, matches game aesthetic)

This is a test of the art pipeline. Keep scope minimal. Ship something that loads assets without breaking the game.