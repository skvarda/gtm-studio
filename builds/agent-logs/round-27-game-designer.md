# Round 27 Game Mechanics Design Doc — "Sound & Scanlines"

---

## 1. Core Gameplay Loop

No loop changes this round — the existing AP-gated daily cycle is untouched. The loop *feels* different because every interaction now has an audio signature. The rhythm of the game becomes literal: players internalize the day's pace through sound cues rather than watching a counter. Audio transforms a UI into a language.

---

## 2. Specific Mechanics to Implement

**Audio State Machine** — `AudioManager` tracks current game state and routes to the correct track. On state transition (title → play, play → dayEnd), crossfade in ≤200ms. No overlapping loops — stop old track before starting new.

**AP Denial Feedback** — When a player tries an action with 0 AP, play the negative buzz AND briefly flash the AP counter red (2 frames). Double-feedback: audio + visual. Players stop misclicking within one session.

**Day-End Stinger Gate** — The day-end jingle plays *before* the summary screen populates. 2-second stinger gives the player a beat to absorb the transition. Summary text fades in after jingle completes.

**Mute Toggle (M key)** — Instantly silences all audio. Mute state stored in a session variable. A small speaker icon (8×8 px, corner of HUD) shows muted/unmuted state using existing palette colors.

---

## 3. Progression Gates

None added this round. Audio is unconditional — all players hear all tracks from day one. This is a polish round, not a content round.

---

## 4. Difficulty Curve

Audio subtly communicates pressure. Gameplay BGM loop is unchanged regardless of cash position — but this creates an interesting tension: the breezy office chiptune playing while you're one week from bankruptcy hits differently than when you're flush. The *contrast* does the work.

---

## 5. Player Feedback Loops

| Action | Audio Cue | Visual Cue |
|---|---|---|
| Hire employee | Cash register ding | Dialog box |
| Menu open | Soft blip | Menu renders |
| Confirm action | Chime | State updates |
| No AP | Negative buzz | AP counter flashes |
| Day end | 2s stinger | Summary fades in |
| Victory | Ascending fanfare | Existing victory screen |

---

## 6. The Fun Moment to Engineer

**The First Hire.** When the player hires their first employee — dev or sales — the cash register SFX fires, the hire dialog closes, and the new sprite appears on the office floor. For exactly that one frame, the breezy gameplay BGM is still playing. The absurdity lands: you just spent $8,000 of your angel round on a person, and the music couldn't care less. That tonal collision — consequence-free chiptune scoring a high-stakes decision — is the game's voice. Engineer that moment to feel effortless, because the humor lives in the gap.