# Game Mechanics Design Doc — Round 29
**Codename: "What's Your Name, Founder?"**

---

## 1. Core Gameplay Loop

Title Screen → **Name Entry** → Personalized Welcome Dialog → Office (existing loop). The round's addition is a pre-game identity beat, not a mid-loop change. The core AP-spend cycle is unchanged.

---

## 2. Specific Mechanics to Implement

**Name Entry State (`nameEntry`)**
- Direct keyboard typing, no grid navigation. Keydown listener captures printable ASCII (32–126). Backspace deletes. Enter confirms.
- Max 12 characters. Input renders with blinking cursor (toggle every 30 frames at 60fps).
- Player hoodie sprite drawn at canvas left (~80px from left, centered vertically). Input box drawn at center-right with `PAL.dialogBdr` border, `PAL.dialogTxt` text.
- Empty confirm defaults to `"Alex"`.

**`playerName` Variable**
- Declared at top-level scope, initialized `""`. Set on confirm.
- Passed into all dialog strings via template interpolation: `` `Welcome, ${playerName}.` ``
- Appears in: welcome dialog, HUD nameplate (top bar), day-end summary header, game over screen.

---

## 3. Progression Gates

Name entry is the single new gate. Player cannot enter `play` state without passing through `nameEntry`. No other gates added this round — scope is locked.

---

## 4. Difficulty Curve

Unchanged. This round adds zero mechanical difficulty. The identity hook lowers perceived friction in early game by making the player feel ownership faster, which may improve retention into mid-game where difficulty ramps.

---

## 5. Player Feedback Loops

- **Typing feedback:** each keystroke appends the character visually — immediate response.
- **Cursor blink:** signals the system is waiting for input, not frozen.
- **Confirm flash:** brief palette invert on the input box for 1 frame on Enter — confirms the action registered.
- **Name surfacing:** first dialog line reads the name back immediately — closes the loop and rewards the identity investment.

---

## 6. The Fun Moment to Engineer

The welcome dialog pause. After Enter is pressed, hold on a black screen for 18 frames, then fade the office in with the dialog: *"Welcome to the office, [name]. Your angel funding just hit the account. $120K to change the world... or at least ship v1."*

That 18-frame breath is the moment the player realizes this is *their* startup. Engineer it intentionally — don't skip straight to gameplay.