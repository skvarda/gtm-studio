Written to `/home/gtm/docs/mechanics-round25.md`. Here's the summary:

---

**Core loop:** Talk decisions (free, asymmetric consequences) compound with AP decisions (gated, direct output). The player has two levers; learning to use both together is the skill ceiling for this round.

**Key mechanic details:**
- `interactionCount` per employee, reset in `endDay()` — clean, no edge cases
- Dev debuff at interaction 3+: `productivityMod = 0.70` on Build AP spend
- Sales buff at interaction 3+: `productivityMod = 1.30` on Sell AP spend
- Visual persistence: "..." / "!" sprite bubble stays up all day as reminder
- Co-founder: chair rotates one pixel on third interaction, nothing else, ever

**Difficulty insight:** The dev debuff punishes aimless clicking — a real player behavior. The sales buff rewards intentional social play. Neither is telegraphed with a warning label; cause-and-effect is the lesson.

**The fun moment:** Player accidentally spam-talks the salesperson, notices the output spike at day-end, and replays it deliberately the next day. Accident → strategy. That's the hook.