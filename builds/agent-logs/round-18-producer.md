# Round 18 Scope & Prioritization

## BUILD (3 items, priority order)

**1. Victory States & End Screen**
Check four conditions at day-end: IPO ($50k cash + 50 customers), Profit Machine (3 consecutive profitable days), R&D Utopia (product level 10), World Domination (100 customers + 10 employees). On trigger: freeze game, tinted overlay, stats box, "NEW GAME" button. Add `profitStreak` counter (increment if revenue > expenses, else reset).
- **Complexity: Medium.** ~60 lines. Four predicates, one overlay renderer, one stats screen.

**2. localStorage Save/Load**
Auto-save at day-end: `{day, cash, customers, productLevel, team, profitStreak}`. Title screen shows "Continue (Day X)" if save exists. Load restores state. Save icon flash in HUD (reuse existing sprite flash pattern).
- **Complexity: Low.** ~30 lines. JSON serialize/deserialize, one title screen branch.

**3. Purple Monitor Easter Egg**
After Day 15, co-founder's desk gets second monitor with purple flicker. Interact triggers one-time meta-dialog. Boolean flag `easterEggSeen`.
- **Complexity: Trivial.** ~10 lines.

## CUT / DEFER

- **Co-founder standing sprite** — defer to art polish round. Seated sprite is fine for victory screen.
- **Line-by-line stat reveal animation** — defer. Show stats all at once. Animation is polish.
- **Any new game systems** — no market events, no new hire types, no balance tuning.

## Non-Negotiables

1. **File completeness.** `</script></body></html>` must exist. Build from `saas-startup-simulator.html`. Target 700 lines max. If approaching limits, cut easter egg first, then save/load.
2. **One coordinate system.** 320x224 native, 16px tiles, 3x scale. No 32px references.
3. **Employee X-offset fix.** `i * 1` pixel offset per hired employee.

## Known Risks

- **Truncation** — the only risk that matters. Mitigation: developer compresses aggressively, closes file early if needed. Victory states ship before save/load. Easter egg is first to cut.
- **profitStreak logic** — requires tracking previous day's net. Must initialize correctly on load.