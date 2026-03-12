Let me assess the current state of the build before writing the directive.

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "ls -la /home/gtm/*.html /home/gtm/docs/ 2>/dev/null"}</tool_input>
</tool_call>
<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "cat /home/gtm/docs/studio-state.json 2>/dev/null || echo 'no studio state file'"}</tool_input>
</tool_call>
<tool_call>
<tool_name>Glob</tool_name>
<tool_input>{"pattern": "/home/gtm/docs/**/*.md"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "ls -la /home/gtm/saas-startup-simulator.html 2>/dev/null && wc -l /home/gtm/saas-startup-simulator.html 2>/dev/null; ls -la /home/gtm/game.html 2>/dev/null && wc -l /home/gtm/game.html 2>/dev/null"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "ls -la /home/gtm/src/ 2>/dev/null || ls -la /home/gtm/build/ 2>/dev/null || echo 'no src or build dirs'"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "find /home/gtm -maxdepth 2 -name '*.html' -newer /home/gtm/saas-startup-simulator.html 2>/dev/null; find /home/gtm -maxdepth 2 -name '*.js' 2>/dev/null"}</tool_input>
</tool_call>

Let me also check what the round 10 rejection looked like and any briefs.

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "ls -t /home/gtm/docs/*.md | head -10"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/docs/brief-round22.md", "offset": 0, "limit": 50}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "for f in /home/gtm/docs/*.md; do echo \"=== $f ===\"; head -5 \"$f\"; echo; done"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 0, "limit": 80}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 1700, "limit": 50}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "wc -l /home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "grep -n 'function\\|gameState\\|titleScreen\\|drawPlayer\\|drawMap\\|handleInput\\|endDay\\|actionPoints\\|AP\\|MRR\\|employee' /home/gtm/saas-startup-simulator.html | head -60"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/docs/game-design.md", "offset": 0, "limit": 100}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/docs/narrative-design.md", "offset": 0, "limit": 100}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"command": "cat /home/gtm/docs/art-direction.md 2>/dev/null | head -80"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "cat /home/gtm/docs/art-direction.md 2>/dev/null | head -80; echo '---'; cat /home/gtm/docs/technical-spec.md 2>/dev/null | head -80"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "grep -c 'function ' /home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>

Now let me scan the actual game for key systems to understand what's working and what's missing.

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "grep -n 'function ' /home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 0, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 200, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 400, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 600, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 800, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 1000, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 1200, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 1400, "limit": 200}</tool_input>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"file_path": "/home/gtm/saas-startup-simulator.html", "offset": 1600, "limit": 145}</tool_input>
</tool_call>

Good, I now have a full picture of the codebase. Let me also check for any other builds or department output files.

<tool_call>
<tool_name>Bash</tool_name>
<tool_input>{"command": "find /home/gtm -maxdepth 3 -name '*.html' -o -name '*.js' -o -name '*.json' 2>/dev/null | grep -v node_modules | grep -v '.claude'"}</tool_input>
</tool_call>

Now I have the full picture. Let me write the Integration Directive.

<tool_call>
<tool_name>Write</tool_name>
<tool_input>{"file_path": "/home/gtm/docs/directive-round11.md", "content": "# Integration Directive — Round 11\n**Director:** Vivian Cross\n**Type:** Integration (assemble-latest)\n**Date:** 2026-03-09\n\n---\n\n## Situation Assessment\n\nThree consecutive integration rounds (8, 9, 10) have been **rejected**. No department rounds have shipped since Round 10. We have ONE deliverable: `saas-startup-simulator.html` (1744 lines). No separate department output files exist — everything lives in that single file.\n\nThe game IS functional. It has:\n- Title screen, office map (20x15 tilemap), player movement\n- 16px tile rendering at 320x224 native, scaled 3x\n- Action Point system (3 AP/day), manual day transitions via menu\n- Employee hiring (devs/sales), product/customer/MRR tracking\n- Dialog system, NPC interactions (Jordan co-founder), menu system\n- Day-end summary, game over (bankruptcy), win condition ($50K MRR)\n- Email system with morning briefings\n- Sound effects via oscillator\n\nSince there are **no new department outputs to merge**, this round's job is to stabilize, fix, and upgrade the existing build against the game vision spec.\n\n---\n\n## 1. Priority Order\n\nSince this is an assemble-latest with no new department files, priority is **fix and align the existing build to the game vision**:\n\n1. **Resolution & Scale** — Vision says 640x360 native at 2x scale. Current build is 320x224 at 3x. Update to 640x360 native, 2x scale (1280x720 output). This gives us more screen real estate for UI.\n\n2. **AP System** — Vision says 5 AP per day. Current build has 3. Update to 5 AP.\n\n3. **Day Structure** — Vision spec: Morning (email/dashboard), Afternoon (spend AP), Evening (results). Current build has email + menu but no clear phase structure. Add morning/afternoon/evening phases.\n\n4. **Economy** — Vision says customers at $49-$999/mo tiers, fundraising with dilution. Current build has flat $49/customer. Add tier variety and ownership/dilution tracking.\n\n5. **Named NPCs** — Vision names Maya Chen (first dev hire), Derek Williams (sales gong), Gina (barista), Chad Thunderpitch (rival). Current build has generic employees and Jordan. Add at least Maya and Derek as named first-hires.\n\n6. **Endgame Paths** — Vision lists 4 endings (IPO Glory, Profit Machine, R&D Utopia, World Domination). Current build has simple MRR threshold win. Stub the 4 paths.\n\n---\n\n## 2. Known Conflicts to Watch\n\n- **Resolution change (320x224 → 640x360)** will break ALL tile rendering, sprite positions, UI layouts, and font sizes. This is the highest-risk change. Every `drawPlayer`, `drawNPC`, `drawMap`, `drawHUD`, `drawMenu`, `drawDialog` function must be updated.\n- **AP change (3→5)** may unbalance economy — more actions per day = faster growth. May need to adjust hire costs or customer acquisition rates.\n- **Tilemap** is currently 20x15 at 16px tiles (320x240 coverage). At 640x360 we'd need 40x22.5 tiles at 16px, or keep 16px tiles with a larger map and camera/viewport, or move to 32px tiles (20x11.25 — awkward). **Recommend: 16px tiles with 40x23 map and keep full-screen render (no scrolling camera yet).**\n- **Day pacing** — the Round 22 brief flagged days going too fast (1-2 sec). Manual day transitions should be preserved. No auto-timers.\n\n---\n\n## 3. Quality Bar\n\nThis integration ships if and only if:\n\n- [ ] Game launches to title screen without errors\n- [ ] Canvas renders at 640x360 native (1280x720 displayed)\n- [ ] Player moves on map, collides with walls, interacts with NPCs\n- [ ] 5 AP per day, all spendable via menu actions\n- [ ] Day ends only when player chooses (manual transition)\n- [ ] MRR/cash/product/customers track correctly across days\n- [ ] At least one dialog with Jordan works\n- [ ] Day-end summary displays and player can advance\n- [ ] Game over triggers on $0 cash\n- [ ] No console errors during normal play loop\n- [ ] Game is playable for at least 10 in-game days without breaking\n\n**Hard reject if:** Resolution is wrong, AP count is wrong, days auto-advance, or any JS error on load.\n\n---\n\n## 4. Deferred Work\n\nCarry forward to future rounds:\n\n- **Gina the barista NPC** and coffee shop location\n- **Chad Thunderpitch** rival encounters and competitive mechanics\n- **Fundraising/dilution** system (stub ownership tracking but full fundraising is deferred)\n- **4 endgame paths** beyond stubs (full branching narrative)\n- **Sound/music** improvements (current oscillator beeps are placeholder)\n- **Scrolling camera** for larger maps\n- **Save/load** system\n- **Co-founder Jordan mystery arc** (narrative beats from Round 17 docs)\n\n---\n\n## 5. The ONE Thing This Integration MUST Accomplish\n\n**Upgrade the canvas to 640x360 native resolution with 5 AP per day, and have the core gameplay loop (move → interact → spend AP → end day → repeat) working cleanly at the new resolution without any errors.**\n\nThree rejected integrations in a row means we've been trying to do too much. This round is about getting the foundation RIGHT at the correct resolution and AP count. Everything else is secondary. If the game runs clean at 640x360 with 5 AP and the core loop works, we ship it. Period.\n\n---\n\n*Signed: Vivian Cross, Executive Director, GTM Studio*\n*\"Stop decorating the house and fix the foundation.\"*\n"}</tool_input>
</tool_call>

---

# Integration Directive — Round 11

**Three rejected integrations.** That stops now.

The problem is clear: no new department outputs exist to merge. The entire game lives in `saas-startup-simulator.html` (1744 lines). It works, but it doesn't match the vision spec on resolution, AP count, or day structure.

## The ONE thing this round MUST accomplish:

**Upgrade to 640x360 native resolution + 5 AP/day, with the core loop (move → interact → spend AP → end day → repeat) running clean. No errors.**

## Priority order:
1. Resolution: 320x224 → 640x360 native, 2x scale
2. AP: 3 → 5 per day
3. Day phases: morning/afternoon/evening structure
4. Named NPCs: Maya Chen (dev), Derek Williams (sales) as first hires
5. Economy tiers and ownership tracking (stub only)
6. Endgame path stubs

## Biggest risk:
The resolution change touches every rendering function. This is a full-canvas rewrite of all draw calls. It's the reason I'm saying: **do the resolution first, verify it renders, then layer everything else on top.**

## Quality bar:
Game must launch, render at 640x360, support 5 AP with manual day transitions, play 10+ days without errors. Hard reject on wrong resolution, wrong AP count, auto-advancing days, or JS errors on load.

## Deferred:
Gina, Chad Thunderpitch, fundraising system, full endgame branching, scrolling camera, save/load, Jordan mystery arc.

Full directive written to `docs/directive-round11.md`.

*Stop decorating the house and fix the foundation.*
