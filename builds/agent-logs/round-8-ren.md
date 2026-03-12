# Scoped Integration Plan — Round 8

## 1. What Goes In (Priority Order)

### FOUNDATION (Round 4 Atlas Engine)
Start with `/home/gtm/saas-quest.html` as base — this has all core systems working.

### CRITICAL PATH — Character Creation Replacement
1. **Remove card-based role selection screen** — Delete `characterCreation` state entirely
2. **Wire Jordan dialogue into apartment** — Add role selection through Jordan's `jordan_role_question` dialogue
3. **Add choice UI to dialogue system** — Minimal 3-option picker (arrow keys + Enter)
4. **Update roles to Seller/Dev/Marketer** — Replace Hacker/Designer/Hustler in `getRoleData()`
5. **Wire role stats** — Map to engine's 5-stat system (sales/dev/marketing/hustle/focus)

### DAY 1 CONTENT INTEGRATION  
6. **Jordan Day 1 dialogue** — Add `jordan_morning_greeting`, `jordan_runway_response`, `jordan_chad_email_reaction`
7. **Chad introduction email** — Add to Day 1 email inbox with "fellow founder" content
8. **Laptop/whiteboard interactions** — Add `laptop_dashboard_first_look`, `whiteboard_revenue_math` 
9. **Mom support email** — Add emotional counterpoint to Chad's email

### ART ASSETS (with fallbacks)
10. **Asset loader with graceful degradation** — Try to load 5 PNG files, fallback to fillRect if missing
11. **Integration test** — Load Jordan idle sprite, apartment tiles, laptop sprite

## 2. What Gets Cut or Deferred

### DEFERRED
- **AP cost modifiers per role** — Felix's design spec includes role-based AP costs, but directive says defer until activities are rebalanced
- **Player response dialogue choices** — Story content has branching responses, but current engine only supports linear dialogue. Add minimal choice UI for role selection only
- **Gazette formatting** — Keep as simple text dump in emails, don't build newsletter renderer
- **Jordan relationship tracking** — Sage's content has relationship effects but no game system exists yet
- **Walk_past dialogue triggers** — Requires proximity detection system that doesn't exist

### CUT ENTIRELY  
- **Startup Gazette as separate system** — Include headlines as regular email instead
- **Enhanced apartment interactions beyond laptop/whiteboard** — Keep scope minimal
- **Character sprite preview in role selection** — No UI space in dialogue flow

## 3. Unresolved Cross-Department References

### WARNINGS
- **Art asset availability** — Round 7 generated 5 PNGs but files may not exist on disk. Must implement robust fallback to programmatic sprites
- **Stat schema mismatch** — Felix uses 3 stats (charisma/technical/creativity), engine uses 5 stats (sales/dev/marketing/hustle/focus). Mapping required
- **Day 1 vs Day 2 transition** — Story treats Day 1 as tutorial without full day cycle, but engine expects normal day flow. Need to disable AP/activities on Day 1

## 4. The ONE Thing This Integration MUST Accomplish

**Complete playable flow from title screen to Day 2 morning in under 3 minutes:**

```
Title → Name Entry → Apartment → Talk to Jordan → Pick Role → 
Check Laptop → Read Chad Email → End Day → Day 2 Begins
```

If a player can't complete this entire sequence without crashes, black screens, or getting stuck, the integration fails. Everything else is secondary to this one continuous, working flow.

**Success Test:** Human player opens HTML, completes full flow, sees "Day 2" splash screen. No console errors. No input deadlocks.
