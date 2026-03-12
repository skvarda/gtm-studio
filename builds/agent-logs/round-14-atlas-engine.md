## Build Report: AP_SYSTEM_EMAIL_INBOX

### What Changed (complete rebuild)
- **canvas_rendering**: 640x360 native, 2x CSS scale, DPR correction via initCanvas()
- **pixel_font_renderer**: Bitmap font drawText() — zero use of fillText() anywhere. Full A-Z, 0-9, punctuation
- **hud_display**: Top 24px bar with Day, Phase, Cash (comma-formatted), MRR, Runway, AP diamond pips, Era
- **day_cycle**: Three phases (morning→afternoon→evening), player-controlled transitions, no auto-timers
- **action_point_system**: 5 AP/day, 7 actions (code_feature 2AP, fix_bugs 1AP, sales_call 2AP, cold_email 1AP, post_on_hn 1AP, nap 1AP, end_day 0AP). getAP/spendAP/canAfford/resetAP all implemented
- **email_inbox**: 30+ email templates with day ranges, unique tracking, 2-4 emails per morning. Must read all before advancing. Left panel list + right panel detail. Day 1 mandatory Jordan welcome email
- **economy_tick**: Weekly burn from monthly, $99 avg customer revenue, 3% churn, bug accumulation, runway calculation

### What Was Cut
- No tile movement, no rooms, no NPCs, no sprites — this is systems-only per Marcus's directive
- No email choices/effects (structure supports it but no choice emails defined yet)
- No title screen — boots straight into Day 1 per spec
- Employee hiring not yet in actions (no hire action) — placeholder for future rounds

### What's Fragile
- Economy balance: $2K/day base burn = $8K/month = $2K/week. At $150K cash with no revenue, runway is ~75 weeks. May need tuning
- Email pool: 30+ templates but some repeat (non-unique emails). Pool will feel thin after ~20 days
- Churn at 3% per customer per tick — with very few customers early on, it rarely fires but can feel random later
- Cash formatting: negative cash displays as -$X,XXX which works but could look odd at edge cases

### Recommendations for Next Round
- Add title screen and character creation (role selection affects starting stats)
- Implement tile_movement and location system (apartment, office, cafe, street)
- Add NPC sprites and dialogue system
- Expand email pool with choice-based emails that affect game state
- Add hire action to build team
- Consider adding product milestones that unlock new actions
- Balance pass on economy numbers once core loop is tested