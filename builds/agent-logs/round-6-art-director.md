# Visual Direction — SaaS Startup Simulator

## 1. Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Floor Wood Light | `#D4A574` | Primary floor tile |
| Floor Wood Dark | `#B8895A` | Floor tile alt/shadow |
| Wall Base | `#8B9BB4` | Office walls |
| Wall Highlight | `#A8B8D0` | Wall top edge, depth |
| Desk Surface | `#6B5B4E` | Desks, shelves |
| Desk Edge | `#4A3F35` | Furniture outlines/shadow |
| Skin Tone | `#F0C8A0` | Character faces/hands |
| Hoodie Blue | `#4A6FA5` | Player founder |
| Cofound Gray | `#5C5C6E` | Co-founder suit |
| Dev Green | `#5A8C5A` | Developer hire shirt |
| Sales Red | `#B85450` | Salesperson tie |
| HUD Black | `#1A1A2E` | HUD background |
| HUD Accent | `#E8C547` | Cash numbers, highlights |
| Danger Red | `#D94040` | Low cash warning |
| Window Sky | `#7EC8E3` | Skyline window backdrop |
| Outline | `#2C2137` | Universal sprite outlines |

## 2. Pixel Art Style

All sprites drawn at **16x16 base** scaled 3x to canvas. 2-pixel dark outlines on all characters. Tiles are **16x16**, grid-locked. Dithering for shadows — checkerboard pattern only, no gradients. Max **4 colors per sprite** (SNES sprite limits). Top-down 3/4 view: show tops of heads, front of desks.

## 3. HUD & UI

HUD pinned top of screen: `HUD Black` bar, 32px tall. Stats in **monospace pixel font** rendered via canvas (hand-drawn glyphs, no external fonts). Layout left-to-right: `DAY 014 | $487,200 | BURN $2K/day | MRR $0 | TEAM 1`. Cash in `HUD Accent`; flashes `Danger Red` below $50K. Dialog boxes: bottom-screen RPG style, `HUD Black` with 2px `#FFFFFF` border, text appears character-by-character at 30ms/char.

## 4. Animation Priorities

1. **Player walk cycle** — 2 frames per direction (8 total), 200ms toggle
2. **Dialog text crawl** — character-by-character reveal
3. **Cash tick pulse** — HUD cash briefly scales up each day tick
4. **Co-founder idle** — 2-frame subtle shift every 3 seconds (he's "working")

## 5. Easter Egg

**The Whiteboard** — it displays a barely-legible doodle that reads "PIVOT?" with increasingly frantic underlines. Each time you interact with it, a new absurd pivot idea appears: "Uber for Spreadsheets," "Blockchain Salad," "AI-Powered Silence." Pure decoration, pure startup trauma.

---

*~310 words. All rendering is canvas-native, zero external assets. The Developer owns implementation.*