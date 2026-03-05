# SaaS Quest: Startup Simulator
## Game Design Bible v2.0

> *"You quit your job. You have $150,000 in angel money, a co-founder you met at a hackathon, and a dream to change the world. The co-founder mostly just drinks coffee and nods. The dream is a B2B SaaS platform. Welcome to the grind."*

---

## 1. THE ELEVATOR PITCH

**SaaS Quest** is a 16-bit top-down startup simulation RPG in the spirit of Stardew Valley, Harvest Moon, and Pokemon — but instead of watering crops, you're building a SaaS company from a cramped co-working desk to... well, that depends on how you play. You might IPO and ring the bell at NASDAQ. You might become so profitable you buy a yacht. You might invest so hard in R&D that your technology literally creates a utopia. Or you might accumulate so much power that you effectively control the world.

Or you might run out of money in Month 3 because you hired a $180k engineer before you had a single customer.

Like Stardew Valley, this is a game about building something from nothing in a place full of characters you'll grow to love. The daily rhythm of checking your email, making decisions, talking to your team, and watching the numbers tick is designed to produce the same "one more day" addiction that makes you look up and realize it's 2 AM. But underneath the cozy pixel art is a real business simulation with genuine strategic depth — and a mystery co-founder who is definitely up to something.

**Genre:** Simulation RPG / Business Tycoon with narrative depth
**Art Style:** SNES-era pixel art (Stardew Valley / Chrono Trigger / Harvest Moon / Earthbound)
**Perspective:** Top-down 3/4 isometric
**Resolution:** 320×224 native, scaled 3× with nearest-neighbor (crisp pixels)
**Platform:** HTML5 Canvas (browser-based, single-file deployment)
**Tone:** Warm, funny, occasionally gut-punching — like startup life itself

**Primary Design Inspirations:**
- **Stardew Valley** — The daily rhythm loop, NPC relationships and gift-giving, seasonal structure, "one more day" compulsion, discovery and secrets, the feeling that the world is alive and ticking whether you're watching or not
- **Harvest Moon** — Cozy management sim DNA, growing something from nothing, the satisfaction of steady progress
- **Pokemon** — Exploration, progression through a world that opens up, the joy of collecting and building a team
- **Earthbound** — Humor, heart, and a modern setting that uses pixel art to tell a story bigger than its graphics suggest

---

## 2. THE WORLD

### 2.1 Setting Overview

The game takes place in **Silicon Gorge**, a fictional tech hub that's one part San Francisco, one part Austin, one part "we got priced out of both and ended up here." The city is vibrant, slightly absurd, and full of characters who all think their startup is going to change the world.

Like Stardew Valley's Pelican Town, Silicon Gorge should feel like a real place with a real community. NPCs have lives, routines, and opinions. The coffee shop is busy in the morning and quiet at night. The conference center is packed during Demo Days and empty on off weeks. The world has a pulse.

The player moves between several key locations that unlock as the company grows:

### 2.2 Locations

**THE OFFICE (Home Base)**
Your office evolves as the company grows — like upgrading your farmhouse in Stardew Valley, but each stage reflects your company's success. This is where you spend most of your time.

- **Stage 1 — "The Closet" (Year 1, Q1–Q2):** A cramped co-working desk. Two desks, a shared coffee machine, motivational poster that says "HUSTLE" (it's crooked). The mysterious co-founder sits across from you. There's a whiteboard with your roadmap on it (3 sticky notes). You can hear the startup next door arguing about their logo. *Decoratable:* You can add small items to your desk — a plant, a bobblehead, a framed photo. They don't do anything. Or do they?

- **Stage 2 — "The Real Office" (Year 1, Q3–Q4):** You signed a lease! A proper room with 4-6 desks, a meeting area with a rug, a coffee machine that actually works, a window overlooking a parking lot. The whiteboard is bigger. There's a plant someone bought that's already dying. *Decoratable:* Choose what goes on the walls. A neon sign? A mission statement? A dartboard with your competitor's logo?

- **Stage 3 — "The Floor" (Year 2):** An entire floor of a building. Engineering pod, sales bullpen, a glass-walled conference room called "The Fishbowl." A kitchen with a beer fridge. The plant has been replaced three times. There's a napping pod that nobody uses because everyone's too stressed. *Decoratable:* The kitchen, lounge area, and conference room can be customized. These choices affect morale.

- **Stage 4 — "The Campus" (Year 3+):** Multiple floors or buildings. A lobby with your logo on the wall. A cafe. A gym. The co-founder has his own office now with the door always closed. There are employees you don't recognize. You have an executive assistant. The original "HUSTLE" poster is framed. *Decoratable:* Full campus customization. Your choices here reflect and reinforce your endgame path.

**THE COFFEE SHOP — "Grind & Brew"**
The equivalent of Stardew Valley's Saloon — the social hub of the game. This is where relationships are built, gossip is heard, and deals are made over flat whites.

- Recruiting conversations happen here
- Investor meetings (early stage) happen at the corner booth
- Random encounters with other founders, journalists, VCs
- You can buy coffee that gives temporary stat boosts (+Focus, +Charisma)
- **NPCs rotate on a weekly schedule** — Gina is always here. Dr. Okafor is here Tuesday and Thursday mornings. Vik stops by Friday afternoons. Chad Thunderpitch shows up randomly and takes the best table.
- The menu changes seasonally (pumpkin spice in Q4, cold brew in Q3)
- **Late night visits (after 10 PM)** reveal a different crowd — stressed founders, night-owl engineers, and occasionally Jordan, reading something by lamplight

**THE CONFERENCE CENTER — "TechCrunch Pavilion"**
Unlocks around Day 90. Host of industry events, demo days, and conferences.

- Demo Day events (pitch to investors, win funding)
- Conference networking (meet enterprise clients)
- Competitor launch events (watch their product, steal ideas... or panic)
- Award ceremonies (Best Startup, Most Innovative, etc.)
- **Seasonal events:** Q1 has the industry kickoff conference. Q3 has the big annual expo. Q4 has the awards gala.

**THE VC OFFICES — "Sand Hill East"**
Unlocks when you qualify for Series A. A sleek, intimidating building.

- Pitch meetings for funding rounds
- Board meetings (once you have investors)
- Running into other founders in the lobby who are either celebrating or crying
- **Vik's schedule:** He's here Monday-Wednesday. Thursday he's at a board meeting elsewhere. Friday he's at the coffee shop "being accessible."

**THE UNIVERSITY — "State Tech"**
Unlocks mid-game. Source of interns, research partnerships, and talent.

- Hire interns (cheap but need management)
- Research partnerships (boost R&D significantly)
- Guest lectures (builds brand, attracts talent)
- Hackathon sponsorship events
- **Seasonal:** Intern season is Q2-Q3. Career fairs are Q1 and Q4. Campus is quiet in summer.

**THE GOVERNMENT BUILDING**
Late game only. This is where regulatory and policy stuff happens.

- Lobby for favorable regulations
- Deal with compliance requirements
- Government contracts (huge revenue, soul-crushing paperwork)

**SECRET LOCATIONS**
Like Stardew's Secret Woods or Skull Cavern, Silicon Gorge has hidden areas that reward exploration and curiosity:

- **Jordan's Workshop** — Discovered by following Jordan after hours. A cluttered room in the basement of the building. What's on those whiteboards? You can't quite read them at first. As your relationship with Jordan increases, more becomes visible.
- **The Rooftop** — Accessible if you find the key (hidden in a specific desk drawer after a specific event). Beautiful pixel-art skyline. Going here at sunset restores morale. Occasionally, an NPC appears here for a heart-to-heart conversation.
- **The Server Room** — Behind a locked door in Office Stage 3+. Interacting with it reveals your actual tech stack (and its terrifying state). Easter eggs hidden in the server names.
- **The Founder's Graveyard** — A small park with benches, each engraved with the name of a failed startup. Visited late game, it's a quiet moment of reflection. One bench is blank. It's yours, if you fail.

---

## 3. THE CHARACTERS

### 3.1 The Player Character

**Name:** Player-chosen
**Default Look:** Hoodie, jeans, laptop bag, tired eyes, coffee in hand
**Background:** Software engineer who quit a comfortable BigCorp job to "make a dent in the universe." Has decent technical skills and zero business experience. Idealistic but not naive — or maybe a little naive.

**Customization (at game start):**
- **Background:** Choose from Engineer, Designer, or Business — affects starting stats, early dialogue options, and which employees you can recruit first
- **Motivation:** Choose "Change the World," "Get Rich," or "Prove Them Wrong" — affects which endgame paths feel most natural and unlocks unique dialogue
- **Appearance:** Basic pixel-art customization — hair color, skin tone, hoodie color. Purely cosmetic, but it's your character. The tired eyes are non-negotiable.

### 3.2 The Co-Founder — "Jordan"

The heart and comedic soul of the game. Jordan is your co-founder. You met at a hackathon six months ago. You built a prototype together over a weekend. Now you're co-founders of a company, and you're starting to realize you have no idea what Jordan actually does.

Jordan is the game's equivalent of Stardew Valley's most mysterious NPC — except they live in your office. Building your relationship with Jordan is one of the most rewarding (and strange) threads in the game.

**Visual:** Glasses, messy hair, always has a mysterious smile. Sits at their desk typing furiously. Sometimes stares out the window. Sometimes you catch them reading a book about... theoretical physics? Or is that a cookbook?

**Schedule:**
- Morning: At their desk, typing. Screen minimizes if you get too close.
- Afternoon: Occasionally disappears for 1-2 hours. "Had a meeting." With whom? They don't say.
- Evening: Sometimes found at the coffee shop late at night. Sometimes found in Jordan's Workshop (if discovered). Sometimes just... not anywhere you can find.
- **Quarterly pattern:** Jordan gets progressively weirder each quarter. By Year 2, their desk looks like a conspiracy theorist's wall.

**Behavioral Quirks:**
- When you walk past Jordan's desk, their screen minimizes instantly
- They take phone calls in whispered tones and step outside
- Their desk has increasingly weird objects on it (a Rubik's cube that's always solved, a jar of marbles, blueprints for... something)
- They occasionally say cryptic things: "The inflection point is closer than you think" or "Have you ever considered what happens after the singularity?"
- They order food delivery from restaurants that don't seem to exist on any app
- They never seem stressed about money, even when runway is 2 months
- **Gift responses are unpredictable:** Give them coffee, they say "I've already had seven." Give them a book on management, they laugh. Give them a hard drive, they look at you with genuine surprise: "How did you know I needed one of these?"

**Jordan's Secret (Multiple Paths):**
Jordan's true nature depends on which endgame path the player pursues, revealing differently in each:

1. **IPO Path:** Jordan has been quietly filing patents and building IP that makes the company 10× more valuable than the player realized. At the IPO roadshow, the bankers are more excited about Jordan's portfolio than the product.

2. **Profit Path:** Jordan is revealed to have been running a hyper-efficient side operation — automating support, building internal tools, optimizing everything. They're the reason margins are so high. "I just like things to work," they shrug.

3. **R&D Utopia Path:** Jordan is a genuine once-in-a-generation scientific mind. The "weird research" was real research. They've been working on something that changes everything. The player's company was just the vehicle Jordan needed to fund it.

4. **World Domination Path:** Jordan has been building a shadow network of influence — connections to governments, other companies, research labs. They've been playing a longer game than anyone. "Did you really think this was just a SaaS company?" they ask, grinning.

### 3.3 Key NPCs

Every NPC has a **relationship meter** (displayed as hearts, like Stardew Valley), a **weekly schedule**, **gift preferences**, and **story arcs** that unfold as you deepen the relationship. At key heart levels, cutscene events trigger that reveal backstory and deepen the narrative.

**MAYA CHEN — The First Employee**
Your first real hire (if you go the engineering route). Brilliant, loyal, and slightly overwhelmed. She'll stay with you through thick and thin, but she has a breaking point.

- **Schedule:** Office 9-6 on weekdays. Coffee shop Saturday mornings. Home otherwise.
- **Heart events:** At 2 hearts, she tells you about her previous job and why she left. At 4 hearts, she shows you a side project she's been working on — it's brilliant. At 6 hearts, she confides she's getting recruiter emails from Google. At 8 hearts, she tells you this is the best job she's ever had. At 10 hearts, she refuses to leave even if morale hits zero: "I was here before we had a coffee machine. I'm not leaving now."
- **Loves:** Mechanical keyboards, specialty coffee, being asked her opinion in product meetings
- **Hates:** Being micromanaged, broken CI pipelines, when Derek hits the gong before 9 AM

**DEREK "DEMO" WILLIAMS — The Sales Guy**
Your first sales hire (if you go the revenue route). Big energy, big promises. He's either your best asset or your worst nightmare.

- **Schedule:** Office 7-7 (first in, always selling). Gym before work. Sports bar Friday nights.
- **Heart events:** At 2 hearts, he reveals he used to sell cars. At 4 hearts, you learn he has impostor syndrome. At 6 hearts, he asks for honest feedback on his pitching. At 8 hearts, he brings in the biggest deal of the company's life. At 10 hearts, he turns down a VP role at a competitor: "I close deals for people I believe in."
- **Loves:** Closing deals (obviously), protein shakes, being publicly praised
- **Hates:** Price discounting, long engineering timelines, being told "that's not technically possible"

**DR. PATRICIA OKAFOR — The Advisor**
A former exec at a Fortune 500 company who takes a liking to you. She gives advice in the form of stories about her own career. Her advice is always good but sometimes hard to hear.

- **Schedule:** Coffee shop Tuesday and Thursday mornings. Conference center during events. Otherwise off-screen.
- **Heart events:** At 2 hearts, she tells you about the startup she almost joined 20 years ago. At 4 hearts, she introduces you to a contact who changes your business. At 6 hearts, she tells you the hardest decision she ever made. At 8 hearts, she offers to join your board. At 10 hearts, she tells you: "You remind me of me. That's both a compliment and a warning."
- **Loves:** Prepared questions, coachability, quarterly reports that show learning
- **Hates:** Excuses, founders who don't listen, bad coffee

**VIK NAKAMURA — The VC**
Your Series A lead investor. Friendly, smart, and ruthless. He genuinely wants you to succeed, but he also needs a return. As the company grows, his "suggestions" become harder to ignore. Board meetings with Vik are a strategic mini-game.

- **Schedule:** Sand Hill East Monday-Wednesday. Coffee shop Friday afternoons. Board meetings quarterly.
- **Heart events:** At 2 hearts, he tells you about his worst investment. At 4 hearts, he gives you real talk about your burn rate — and he's right. At 6 hearts, he goes to bat for you with his partners when the board gets nervous. At 8 hearts, he makes a crucial introduction that changes the endgame. At 10 hearts, at the very end, he says: "I've funded 47 companies. Yours is the one I'll tell my grandkids about."
- **Loves:** Clean metrics, honest updates (even bad news), founders who execute
- **Hates:** Surprises in board meetings, missed forecasts, spin

**GINA — The Barista**
Knows everything. Drops gossip about competitors, market trends, and who's hiring/firing. A great source of early intelligence. She has strong opinions about your business model and she's usually right.

- **Schedule:** Grind & Brew, always. She IS the coffee shop.
- **Heart events:** At 2 hearts, she starts giving you your order without asking. At 4 hearts, she tells you which VC just walked in and what mood they're in. At 6 hearts, she reveals she has an MBA and chose to be a barista. At 8 hearts, she becomes a secret weapon — she's overheard your competitor's entire strategy and tells you everything. At 10 hearts, she invests in your company with her own savings. It's the most meaningful check you ever receive.
- **Loves:** Good tippers, people who ask about her day, anyone who orders something other than a flat white
- **Hates:** People on speakerphone, founders who treat her like furniture, oat milk (she stocks it but she has opinions)

**CHAD THUNDERPITCH — The Rival Founder**
CEO of your main competitor. Went to Stanford. Has more funding than you. His product is worse but his marketing is better. You'll see him at events. He'll make passive-aggressive comments.

- **Schedule:** Conference events, coffee shop (randomly, always takes the best table), Demo Days. Shows up at your office once to "say hi" (he's scouting).
- **Heart events (yes, even the villain):** At 2 hearts, he makes a grudging compliment. At 4 hearts, he admits his investors are pressuring him. At 6 hearts, you share a drink at a conference and he's almost human. At 8 hearts, he proposes a partnership (is it genuine? or a trap?). At 10 hearts... he offers to merge. The terms are actually fair. This is a real choice.
- **Loves:** Nothing you give him (he returns everything with a condescending note)
- **Hates:** Your existence

---

## 4. THE CALENDAR & SEASONAL RHYTHM

### 4.1 Time Structure

Like Stardew Valley's seasonal calendar, SaaS Quest organizes time around **fiscal quarters** rather than days on a featureless timeline. This gives the game rhythmic texture — each quarter *feels* different.

**Each in-game year = 4 quarters × 13 weeks = 52 days (1 day ≈ 1 week)**
**Each quarter = 13 days**
**Each day has:** Morning (planning) → Afternoon (action) → Evening (resolution)

The game lasts approximately 3 in-game years (156 days), though endgame paths can extend or compress this.

### 4.2 Quarterly Rhythm

**Q1 — "NEW YEAR, NEW ROADMAP" (Winter → Spring)**
*The quarter of planning, budgets, and fresh starts.*

- Employees are energized (morale boost at Q1 start)
- Budget season: allocate spending for the quarter
- Fundraising window opens (VCs have new fund money to deploy)
- Industry kickoff conference at TechCrunch Pavilion
- Tax season hits mid-Q1 (surprise cash crunch possible)
- **Weather/Vibe:** Cold mornings, coffee consumption doubles. The office feels focused.
- **Jordan behavior:** Makes annual predictions. They're oddly specific and oddly correct.

**Q2 — "THE GRIND" (Spring → Summer)**
*The quarter of execution. Heads down, ship product, close deals.*

- Intern season begins (cheap help but management overhead)
- Enterprise buying picks up (budget allocated, people spending it)
- Competitor activity increases (everyone's executing their Q1 plans)
- Midyear reviews and raises — tough conversations
- Demo Day (major funding event)
- **Weather/Vibe:** Longer days. Derek starts wearing short sleeves. Someone suggests standing desks.
- **Jordan behavior:** More phone calls than usual. More disappearances. Desk objects multiply.

**Q3 — "THE LONG SUMMER" (Summer → Fall)**
*The quarter of survival and strategy.*

- Summer Slowdown: enterprise buyers go on vacation. Sales drop 20-30% for 6-8 weeks
- The Slowdown is a trap — inexperienced founders panic and cut costs. Smart founders use the breathing room to invest in product
- University partnerships available (school is back)
- Late Q3: the market wakes back up. If you built during the slowdown, you're positioned to crush Q4
- **Weather/Vibe:** Hot. The AC in the office is inadequate. Someone brings in a desk fan. Morale dips slightly. Ice cream truck appears outside (buy for team = morale boost).
- **Jordan behavior:** Quieter. More staring out the window. If you talk to them, they say: "I think we're close." Close to what? "Yes."

**Q4 — "THE SPRINT" (Fall → Winter)**
*The quarter of deals, celebrations, and reckoning.*

- Enterprise deals explode — companies spending "use it or lose it" budget
- Revenue spike (if your product and sales team are ready)
- Holiday party (mandatory fun, genuine morale event)
- Year-end reviews and bonuses
- Annual awards at the Conference Center
- End-of-year reflection cutscene
- **Weather/Vibe:** Holiday decorations appear in the office. Someone hangs lights. Jordan wears a Santa hat once and never explains it. Q4 Friday afternoons have a specific warm, golden light in the office.
- **Jordan behavior:** Gives everyone a gift. Each gift is weirdly personal and exactly right. Nobody knows how Jordan knew.

### 4.3 The One-More-Day Hook

Every single day must end with a reason to play tomorrow. This is the fundamental Stardew Valley design principle that makes the game addictive. The evening resolution phase should always include at least one "open thread":

- "A candidate you really liked will get back to you tomorrow with their decision"
- "The enterprise deal you've been working for 3 weeks goes to committee tomorrow"
- "Derek says he has 'huge news' but won't tell you until morning"
- "Your product launch is tomorrow — reviews will start coming in"
- "Jordan left something on your desk with a note: 'Open this tomorrow.'"
- "An email arrives at 11:47 PM — subject line: 'We need to talk.' It's from your biggest customer."
- "The Silicon Gorge Gazette just published their annual Top 10 Startups list. Results tomorrow morning."

The player should never go to bed in-game without thinking: "I need to see what happens next."

---

## 5. CORE GAMEPLAY LOOP

### 5.1 The Day Cycle

Each "day" in the game represents roughly a week of real time. The player gets **5 Action Points (AP)** per day to spend on activities. Like Stardew Valley's energy system, running out of AP should feel like "I wish I had more time today" — not punishment. It should make you excited for tomorrow.

Some activities cost 1 AP, some cost 2-3. The day has three phases:

**MORNING (Planning Phase)**
- Check email inbox (events, customer requests, investor updates)
- Review dashboard (MRR, cash, runway, product progress, team morale)
- Read the "Silicon Gorge Gazette" headline (world events that affect your business)
- Jordan says something cryptic or funny
- **Check the calendar:** See what's coming this quarter. Are there events, deadlines, seasonal shifts approaching?

**AFTERNOON (Action Phase)**
- Spend AP on activities (see Activity System below)
- Walk around the office and talk to team members (free — talking doesn't cost AP)
- Give gifts to NPCs (free — one per NPC per day, Stardew-style)
- Handle interrupts (fires, opportunities, random events)

**EVENING (Resolution Phase)**
- See results of the day's actions
- Revenue ticks in (or doesn't)
- Expenses deduct
- Team morale adjusts based on the day's events
- **The hook:** One or more cliffhangers, teasers, or promises for tomorrow
- Occasionally get a late-night email that changes everything
- **Optional late-night exploration:** After the day "ends," you can still walk around the world. The coffee shop is different at night. The office is empty. Jordan might be somewhere unexpected. There are things to discover that only exist after dark.

### 5.2 The Activity System

Activities are how you spend your day. You physically walk to a location or interact with an object to trigger them.

**AT YOUR DESK (1-2 AP each):**
- **Code** — Increase product progress. More effective early game when you're the only dev. Decreasingly effective as the team grows (you should be delegating).
- **Email** — Handle customer support, respond to leads, answer investor questions. Boring but necessary. Ignoring email has consequences.
- **Research** — Study competitors, read industry reports, explore new tech. Fills your "Insight" meter which unlocks strategic options.
- **Plan** — Set priorities for the team. Increases team effectiveness for the next few days.

**AT THE WHITEBOARD (2 AP):**
- **Product Planning** — Design new features. Choices branch: do you build what customers are asking for, or what you believe they'll need?
- **Pivot Planning** — Available when things are going poorly. Redesign the product direction. Risky but sometimes necessary.

**AT THE COFFEE SHOP (1-3 AP):**
- **Recruit** — Interview candidates. Quality depends on your reputation and what you can afford to pay.
- **Network** — Meet VCs, advisors, potential customers. Builds relationship meters.
- **Eavesdrop** — Sometimes you overhear things about competitors or market shifts. More effective at night.

**AT THE CONFERENCE (2-3 AP):**
- **Pitch** — Present to investors or at demo days. A dialogue mini-game.
- **Exhibit** — Show your product at a trade show. Costs money but generates leads.
- **Attend Talk** — Gain insights and random buffs.

### 5.3 The Gift System

Like Stardew Valley, you can give one gift per NPC per day. Gifts build relationships and reveal character.

**How it works:**
- You acquire items throughout the game: specialty coffee, books, gadgets, snacks, office supplies, weird things Jordan leaves lying around
- Each NPC has loved, liked, neutral, and disliked gifts
- A loved gift = +3 hearts. A disliked gift = -2 hearts and a memorable response.
- **Birthday system:** Each NPC has a birthday once per year. Gifts on birthdays are worth 3× hearts. Forgetting a close NPC's birthday costs hearts.
- Items can be bought at the coffee shop, ordered online (email), or found through exploration

**Gift discovery is part of the fun.** You learn what people like through dialogue, observation, and experimentation. Maya mentions she misses her old mechanical keyboard? That's a hint. Derek has a protein shake on his desk every morning? That's a hint. Jordan... Jordan is impossible to figure out. Their reactions never make sense. Until the endgame, when they all suddenly do.

### 5.4 The Hiring System

Your most important and most expensive decisions. Each hire is a named character with stats, personality, and a salary. You can't just hire generic "developers" — you hire *people.*

**Hiring Process:**
1. Post a job listing (costs 1 AP + money for job board)
2. Candidates appear over the next few days
3. Interview them at the coffee shop (1 AP each)
4. Each candidate has visible stats (skill, experience) and hidden traits (loyalty, ambition, quirkiness)
5. Make an offer. They might counter. They might ghost you.
6. **New hire arrival:** They show up at the office with a box of stuff. They're nervous. You get to pick their desk. This moment should feel personal.

**Employee Stats:**
- **Skill** (1-10): How good they are at their job
- **Speed** (1-10): How fast they work
- **Morale** (1-100): How happy they are. Below 30 and they start looking elsewhere.
- **Loyalty** (hidden): How much BS they'll tolerate before quitting
- **Ambition** (hidden): High ambition = great performance but they'll want promotions/raises
- **Quirkiness** (hidden): Affects random events. Quirky employees cause more chaos but also more innovation.
- **Relationship** (hearts): Your personal bond with this employee. Higher = better performance, unique events, loyalty during crises.

**Department Roles:**
- **Engineering:** Builds the product. More engineers = faster development, but diminishing returns (the mythical man-month is real)
- **Sales:** Generates revenue. More salespeople = more customers, but they need a product to sell
- **Marketing:** Generates leads for sales and builds brand. Force multiplier.
- **Customer Success:** Reduces churn. You'll ignore this role at first. You'll regret it.
- **Operations/HR:** Unlocks at 15+ employees. Handles admin. Boosts morale company-wide.

---

## 6. THE ECONOMY

### 6.1 Money

**Starting Capital:** $150,000 angel investment
**Currency Display:** Cash in bank, shown in HUD at all times. Turns yellow below 3 months runway. Turns red below 1 month. Turns green when profitable (the first time this happens should feel like seeing your first gold star crop in Stardew).

**Revenue Model:**
- Customers pay Monthly Recurring Revenue (MRR)
- Different customer tiers: Starter ($49/mo), Pro ($199/mo), Enterprise ($999/mo)
- Customers churn (cancel). Churn rate depends on product quality, support quality, and competitor actions.
- Annual contracts available later (big cash bump but commitment)
- **Seasonal revenue patterns:** Q4 enterprise buying spree, Q3 summer slowdown, Q1 new budget season

**Expenses (Monthly):**
- Salaries (by far the biggest)
- Office rent (increases with office size)
- Software tools and infrastructure
- Marketing spend
- Coffee budget (surprisingly important for morale)
- **Quarterly events:** Holiday party, team offsites, conference tickets — optional but consequential

**Fundraising:**
- **Angel Round** (starting money): Already done. $150K.
- **Seed Round** (available ~Year 1 Q2-Q4): $500K-$2M. Requires traction.
- **Series A** (available ~Year 2): $5M-$15M. Requires strong metrics.
- **Series B+** (Year 3+): $20M+. You're either flying or dying.
- Each round dilutes your ownership. This matters for the IPO endgame.

### 6.2 Key Metrics (The Dashboard)

The player's HUD shows critical business health at all times:

- **Cash:** Money in the bank right now
- **MRR:** Monthly Recurring Revenue
- **Runway:** Months until you're broke (Cash ÷ Monthly Burn)
- **Customers:** Total paying customers
- **Churn:** Monthly customer loss rate (shown as %)
- **Product Score:** Overall product quality (affects churn, sales, reviews)
- **Team Morale:** Average team happiness
- **Reputation:** How the market perceives you (affects hiring, sales, fundraising)
- **Quarter/Year:** Current position in the calendar (e.g., "Y1 Q3 · Week 8")

### 6.3 The Burn Clock

This is the tension engine of the entire game. Every day, money goes out. The runway counter is always ticking down. In the early game, this creates genuine anxiety — should you spend money on that hire, or conserve cash? Should you take that investor's term sheet even though the terms are bad?

The burn clock softens (but never disappears) as the company grows. Even at $10M ARR, a bad quarter can put you in a cash crunch. The seasonal revenue patterns make this worse — you can be profitable in Q4 and burning cash in Q3.

---

## 7. RELATIONSHIPS & SOCIAL SYSTEM

### 7.1 The Heart System

Every NPC in the game has a relationship meter displayed as hearts (0-10), directly inspired by Stardew Valley. Relationships are the emotional core of the game — they're what make you care about your decisions.

**How hearts increase:**
- Daily conversation (+1 per day, per NPC — just walking up and talking to someone builds the relationship slowly)
- Gifts (loved: +3, liked: +1, disliked: -2)
- Heart events (triggered at specific heart levels, completing them gives a big boost)
- Decisions that align with their values (+1 to +3)
- Remembering what they told you (dialogue choices that reference past conversations)

**How hearts decrease:**
- Ignoring them (no conversation for 7+ days: -1 per week)
- Making decisions they oppose (-1 to -3)
- Company-wide morale crises affect everyone
- Giving disliked gifts
- Choosing their rival in a conflict (e.g., siding with Derek over Maya in a disagreement)

**Why hearts matter:**
- **Employees:** Higher hearts = better performance, higher loyalty, unique abilities unlocked, they stay during crises
- **Advisors:** Higher hearts = better advice, more introductions, board support
- **Investors:** Higher hearts = better terms, more patience, follow-on funding
- **Rivals:** Even Chad has a heart track. It doesn't make him less of a rival, but it changes the endgame options available.
- **Gina:** Higher hearts = better intel, earlier warnings, and eventually, the most meaningful investment you'll receive

### 7.2 NPC Schedules

Every major NPC has a weekly routine, inspired by Stardew Valley's schedule system. Learning these routines is part of understanding Silicon Gorge as a place.

- **Monday:** Vik is at Sand Hill East. Maya works late. Derek is on the phones all day. Dr. Okafor is unreachable.
- **Tuesday:** Dr. Okafor is at the coffee shop in the morning. Jordan disappears at 2 PM.
- **Wednesday:** Chad Thunderpitch is sometimes spotted at the conference center. Good day to recruit — more candidates at the coffee shop.
- **Thursday:** Board meeting day (if applicable). Dr. Okafor at coffee shop again. Derek plays pickup basketball at lunch.
- **Friday:** Vik at the coffee shop. Team morale events (happy hours, etc.). Jordan works later than anyone. Late-night coffee shop crowd is best on Fridays.
- **Weekend:** Office is empty. Coffee shop is available. Some NPCs appear in new locations — you might run into Maya at a bookstore, or Derek at the gym. These encounters feel organic and build relationships.

### 7.3 Heart Events (Cutscenes)

At specific heart levels, scripted events trigger. These are the emotional backbone of the game — the moments you remember.

Every heart event is a mini-story with a choice. The choice always matters, either deepening or changing the relationship. Some examples beyond the per-NPC events listed in Section 3:

- **"The Late Night" (any employee, 5 hearts):** You both end up working late. They open up about their life outside work. You can listen, share something about yourself, or change the subject. Listening is always the right answer, but the game never tells you that.
- **"The Offer" (any employee, 7 hearts):** They got a competing job offer. This isn't a crisis event — it's a heart event. The way you handle it depends on your relationship, and high-heart employees give you a chance to counter that low-heart employees don't.
- **"The Confession" (Jordan, 8 hearts):** Jordan almost tells you what they're working on. Almost. They open their mouth, reconsider, and say: "Not yet. But soon." This scene should make the player desperate to reach 10 hearts.

---

## 8. PROGRESSION & MILESTONES

### 8.1 Company Stages

The game has distinct eras that change the feel, challenges, and available actions. Like Stardew Valley's years, each era transforms the game:

**ERA 1: "THE GARAGE" (Year 1, Q1–Q2)**
*Survive. Ship something. Get your first customer.*

- Just you and Jordan in a co-working space
- Build the MVP (minimum viable product)
- Find your first 3 customers manually (literally going to the coffee shop and pitching people)
- First critical decision: who do you hire first?
- Milestone: First paying customer (triggers a celebration cutscene — Jordan pops a $4 bottle of champagne)
- **Stardew equivalent:** Your first spring. Everything is new. You're planting seeds you don't fully understand yet.

**ERA 2: "THE PUSH" (Year 1, Q3–Q4)**
*Prove the business model. Find product-market fit.*

- Office upgrade to a real space
- Team of 3-8 people
- Navigating the chaos of early growth
- First customer complaint. First customer success story. First employee conflict.
- Product decisions that have long-term consequences
- Milestone: $10K MRR (a magic number that opens doors)
- **Stardew equivalent:** Your first summer/fall. The farm is taking shape. You start seeing the system.

**ERA 3: "THE MACHINE" (Year 2)**
*Scale. Grow. Compete. Don't break.*

- Bigger office, more people, more complexity
- Hiring managers, not just individual contributors
- Competitors are attacking. Media is watching.
- Your first board meeting (if you took VC money)
- Culture starts mattering — you have to actively maintain it
- Milestone: $100K MRR (you're a "real company" now)
- **Stardew equivalent:** Year 2. The farm runs itself in parts. New areas unlock. The game's depth reveals itself.

**ERA 4: "THE EMPIRE" (Year 3+)**
*Choose your destiny.*

- The endgame paths diverge here
- You're making decisions that affect not just your company but the industry
- Jordan's secret starts to surface
- The scale of events changes dramatically
- Milestone: Path-specific
- **Stardew equivalent:** Late game / Perfection. The player has mastered the systems and is now choosing what kind of legacy to build.

### 8.2 Skill Trees (Player Progression)

As you gain experience, you unlock personal abilities in three branches:

**TECHNICAL LEADERSHIP**
- Faster coding / product development
- Better technical interviews (hire stronger engineers)
- Architectural insight (spot technical debt before it hurts)
- "10x CEO" (direct coding boosts are massive, but you're bottlenecking yourself)

**BUSINESS ACUMEN**
- Better pitch success rates
- Stronger negotiation (better deal terms, lower costs)
- Market prediction (see trends a quarter earlier)
- "The Oracle" (you can see what competitors will do next quarter)

**PEOPLE & CULTURE**
- Morale boost to all employees
- Reduced turnover
- Conflict resolution (handle team disputes without losing people)
- "The Magnet" (top talent actively seeks you out — candidates appear without job postings)

---

## 9. EVENTS & RANDOM ENCOUNTERS

This is where the game comes alive. Events fire based on day count, company stage, metrics, season, or pure randomness. They keep every playthrough feeling different.

### 9.1 Event Categories

**CRISES (Things that go wrong)**
- **"The Server's on Fire"** — Production goes down. Lose customers every hour you don't fix it. Do you: pull an all-nighter (morale hit), call in a favor from a friend (costs a relationship point), or hire an emergency contractor ($)?
- **"The Glassdoor Review"** — A disgruntled ex-employee (or current employee?!) posts a scathing review. Recruiting gets harder. Do you respond publicly, investigate internally, or ignore it?
- **"The Cease & Desist"** — A big company says you're infringing their patent. Probably BS, but lawyers cost money. Fight, settle, or pivot?
- **"The Key Person Risk"** — Your best engineer gets an offer from Google. Do you counter-offer, let them go, or try to convince them to stay with equity? (If your heart level is high enough, you get a bonus option: have an honest conversation.)
- **"The Pivot Panic"** — Your biggest customer churns. Three more follow. Your product isn't working for anyone. Time to pivot? Or double down?

**OPPORTUNITIES (Things that could go right)**
- **"The Inbound Whale"** — A Fortune 500 company emails asking about an enterprise deal. This could be a game-changer, or it could consume all your resources for 6 months and then ghost you.
- **"The TechCrunch Article"** — A journalist wants to profile your company. Great exposure, but they might ask hard questions about your burn rate.
- **"The Acqui-hire Offer"** — A bigger company offers to buy you. The money's decent but the dream dies. This can be tempting when runway is low.
- **"The Hackathon Win"** — You enter a hackathon and win. Boost to reputation, a small cash prize, and a cool trophy for the office.

**ABSURD (The humor layer)**
- **"The Ping Pong Table Debate"** — Your sales team wants a ping pong table. Engineering says it's a waste of money. This becomes a three-day office-wide debate that tanks morale until you resolve it. (The correct answer is a foosball table. Nobody expects the foosball table.)
- **"Jordan's Fish"** — Jordan brings a fish tank to the office. It's enormous. Nobody asked for this. The fish are... exotic. One of them might be illegal? Morale goes up slightly. Jordan names the fish after your competitors.
- **"The Motivational Speaker"** — An employee books a motivational speaker without asking. He shows up. He's terrible. But somehow the team loves it. +5 morale. -$2,000.
- **"The Intern Incident"** — Your intern pushes to production. On a Friday. Before a long weekend. The fix requires someone who's already in an Uber to the airport.
- **"The Rebranding Discussion"** — Someone suggests renaming the company. The discussion takes 4 hours and accomplishes nothing, but team bonding improves.
- **"Competitive Intelligence"** — You're at a conference and accidentally end up in your competitor's closed-door session. Do you stay? Do you report what you heard? Do you pretend to be asleep?
- **"The Email That Was Meant for Slack"** — An employee accidentally sends a spicy internal opinion to a customer. Damage control time.
- **"The Office Dog"** — Someone brings their dog to the office. Productivity drops 20%. Morale increases 40%. Repeat offenses create a policy debate.
- **"Jordan's Delivery"** — A package arrives for Jordan. It's huge. It takes two people to carry it to their desk. It hums faintly. Jordan says "thank you" and asks everyone to stop looking at it.

**SEASONAL/QUARTERLY**
- **"Demo Day" (Q2)** — Annual event. Chance to pitch to a room full of investors. Success depends on metrics + pitch skill.
- **"Year-End Reviews" (Q4)** — Every employee expects a raise. You can't afford to give everyone what they want. Choose carefully.
- **"The Holiday Party" (Q4)** — Costs money but massive morale boost. Skip it and morale tanks. The co-founder always gives a weird toast. Each year, the toast gets weirder and more specific. By Year 3, it's either deeply moving or deeply alarming, depending on your endgame path.
- **"Tax Season" (Q1)** — Surprise! You owe more than expected. Cash crunch.
- **"Summer Slowdown" (Q3)** — Enterprise buyers go on vacation. Sales slow for 6-8 weeks. Plan accordingly.
- **"New Year's Resolution Email" (Q1, Day 1)** — Jordan sends a company-wide email with their "resolutions for the company." They're strangely prophetic. Save them. You'll want to re-read them at end of year.
- **"Anniversary" (Annual)** — The company's founding anniversary. Triggers a cutscene montage of the year's highlights. Genuinely emotional. A "how far we've come" moment.

### 9.2 The Email System

Every morning you get 2-5 emails. They're a mix of:
- Customer requests / complaints
- Team messages (morale indicators)
- Investor check-ins
- Spam (funny fake startup pitches: "Uber for Cats," "Blockchain-powered Toothbrush," "We've disrupted condiments")
- Occasional story-critical messages
- **Seasonal spam:** Q4 gets "end of year deal!" emails. Q1 gets "new year, new CRM!" emails. These are just flavor, but they're funny.

Ignoring email has consequences. That customer complaint you didn't respond to? They churned. That investor email you forgot? They moved on. That email from Jordan marked "URGENT - DO NOT OPEN UNTIL TOMORROW"? Opening it early changes something. What? You'll have to replay to find out.

### 9.3 The Silicon Gorge Gazette

A daily in-game newspaper with 1-2 headlines. These provide world-building, foreshadowing, and comedy. Some affect gameplay, some are just flavor. The Gazette is your window into the world outside your company.

**Example Headlines:**
- "Local Startup Claims to Be 'Uber for Libraries,' Cannot Explain Why"
- "VC Firm Announces New Fund: '$100M For Companies That Understand AI, We'll Know It When We See It'"
- "Study Finds 99% of Startup Founders Would Do It Again, 98% Would Not Recommend It"
- "Thunderpitch Technologies Raises $50M at $500M Valuation, Product Still in Beta"
- "Co-Working Space Adds Fourth Craft Beer Tap, Removes All Meeting Rooms"
- "Annual Developer Salary Survey Finds Everyone Is Underpaid Except Everyone Else"
- "Mystery Co-Founder Spotted at [Location]; Claims to Be 'Taking a Walk'" *(only appears if you've been investigating Jordan)*
- "Local Barista Wins 'Most Overqualified Employee' Award for Third Consecutive Year" *(appears if Gina is at 6+ hearts)*

---

## 10. THE FOUR ENDGAMES

Each endgame path has its own final act, climax, and ending sequence. The player's choices throughout the game naturally steer toward one, but there are key decision points that lock you in.

### 10.1 IPO GLORY

**Trigger Conditions:** $5M+ ARR, 3+ funding rounds completed, Board approves

**Final Act:** "The Roadshow"
- You fly to New York (new location unlocks: Wall Street)
- Series of investor presentations (pitch mini-games get intense)
- Media scrutiny increases
- Jordan reveals the patent portfolio that makes bankers drool
- Pricing the IPO: set it too high and it crashes day one. Too low and you leave money on the table.

**Climax:** The IPO bell-ringing ceremony. Your pixel character stands at NASDAQ. The ticker shows your stock price. The whole team is there. Jordan is wearing a suit for the first time ever.

**Ending:** Market cap based on your company's true fundamentals. The ending grades your IPO from "meme stock disaster" to "generational company." A montage of where everyone ends up — based on your heart levels with each NPC. High hearts = they thrived. Low hearts = they left.

### 10.2 PROFIT MACHINE

**Trigger Conditions:** $2M+ ARR, profitable for 4+ consecutive quarters, no VC debt

**Final Act:** "The Buyout Offers"
- Acquirers come knocking. Big numbers on the table.
- You can sell (happy ending but shorter) or keep building
- Jordan reveals they've been optimizing everything behind the scenes
- The company runs like a Swiss watch

**Climax:** The moment your bank account hits a number you never imagined possible. It's not a spectacle — it's a quiet Tuesday when you check the dashboard and realize you never have to worry about money again. Jordan is drinking coffee, reading a book. The office is calm. It's beautiful.

**Ending:** The "Quiet Giant" ending. You're not famous. You're not on magazine covers. But you built something real that prints money and employs hundreds of people who love their jobs. Ending grades based on profit margins and employee satisfaction. The montage shows each employee's life — the happier they are, the more their scenes glow.

### 10.3 R&D UTOPIA

**Trigger Conditions:** R&D investment >40% of revenue for 8+ quarters, Research score maxed, Jordan's relationship at 10 hearts

**Final Act:** "The Breakthrough"
- Jordan's been working on something. You've been funding it without fully understanding it.
- A breakthrough happens. It's bigger than your company. It's bigger than your industry.
- The world changes. Your technology unlocks something: clean energy, disease cures, a new computing paradigm, or some combination.
- You have to decide: patent it and profit, or open-source it and change the world?

**Climax:** A cinematic cutscene. Your little office, your scrappy team, your weird co-founder — they just changed the trajectory of human civilization. Jordan finally explains what they've been working on. It's emotional. The Stardew Valley community center moment — the world transforms around you.

**Ending:** The world is better. Your company may or may not be huge, but that's not the point anymore. Ending grades based on how much you gave away vs. kept. If you open-source everything, the final scene is the Founder's Graveyard park — except now it's a garden. The blank bench has your name on it. It reads: "They built something that mattered."

### 10.4 WORLD DOMINATION

**Trigger Conditions:** Market share >60%, acquired 3+ competitors, government contracts active, Reputation > 90

**Final Act:** "The Network"
- Jordan's connections come to light. They've been building alliances you didn't know about.
- Your product is everywhere. Governments depend on it. Competitors are gone.
- You face a choice at every turn: consolidate more power, or show restraint?
- Anti-trust regulators show up. Media turns hostile. Former allies become enemies.

**Climax:** You're in a room with world leaders. Your platform controls the flow of information and commerce for a billion people. Jordan is at the table with you, calm as ever. "This was always the plan," they say. "The question is: what do you do with it?"

**Ending:** The "Emperor" ending. Your company is the most powerful organization in the world. But are you a benevolent ruler or a tyrant? Ending grades based on how you wielded power throughout the game. Dark endings are possible here. The NPCs you had high hearts with may forgive you. The ones you didn't... won't.

### 10.5 SECRET ENDING — "THE GARDEN"

**Trigger Conditions:** Max hearts with every NPC. Company is profitable but modest. You chose "kindness" at every major fork. Jordan's relationship at 10 hearts. Found the Founder's Graveyard.

The rarest ending. No empire, no IPO, no world domination. Just... a really good company with really happy people, run by someone who chose relationships over growth every single time.

**Climax:** It's a normal Tuesday. You arrive at the office. Everyone's there. The coffee is good. Maya shows you something cool she built. Derek closes a deal and hits the gong softly, for once. Jordan smiles at you — a real smile, not the mysterious one. "I think," they say, "this is exactly what I hoped it would be."

**Ending:** The credits roll over a montage of ordinary days. It's the most beautiful ending in the game because it earns its simplicity. Some players will think it's the "bad" ending. They're wrong.

---

## 11. DIALOGUE & TONE

### 11.1 Writing Style

The game's writing should feel like a sharp comedy that occasionally hits you in the gut. Think: Silicon Valley (the show) meets Stardew Valley meets Earthbound.

**Rules for dialogue:**
- NPCs should feel like real people, not quest-givers
- Humor comes from specificity and relatability, not randomness
- Industry jargon is used but always as a joke or with a punchline
- Jordan's dialogue is always slightly off — never enough to be alarming, just enough to be intriguing
- The player never says anything cringe-worthy. They can be awkward, but never cringe.
- Every serious moment should be earned by 10 minutes of fun first
- **Stardew principle:** Characters should say different things based on heart level, time of day, season, and what's happening in the game. A Maya at 2 hearts talks differently than a Maya at 8 hearts.

**Sample Dialogue:**

*[Player walks past Maya's desk]*
**Maya:** "Hey, so that feature we shipped yesterday? I got an email from a customer who said, and I quote, 'this changed my life.' They sell industrial fans."
**Player options:**
- (A) "Incredible. We're changing the fan industry."
- (B) "Did they... say what about their life changed?"
- (C) "Ship faster. More lives to change."

*[Derek closes a deal]*
**Derek:** *[hits gong]* "LADIES AND GENTLEMEN, ANOTHER ONE! $4,800 ARR!"
**Maya (from across the room):** "Derek, it's 8 AM."
**Derek:** "THE MARKET DOESN'T SLEEP, MAYA!"

*[Jordan, unprompted, while player walks by]*
**Jordan:** "Fun fact: the probability of any two companies having the same burn rate on the same day is remarkably low. And yet."
**Player:** "...are you okay?"
**Jordan:** "Perfectly fine. Oh, I ordered a plant."

*[Gina, at 6 hearts, morning]*
**Gina:** "Your usual? Also, the guy in the corner booth? That's the new partner at Sequoia. He's been here three days in a row. Ordered a pour-over every time. That means he's evaluating deals, not networking. You should talk to him between his second and third cup. That's when he's most receptive."
**Player:** "...how do you know all this?"
**Gina:** "I make coffee. People forget I have ears."

*[Maya, at 8 hearts, after a crisis]*
**Maya:** "Remember when the office was just two desks and a whiteboard with three sticky notes on it?"
**Player options:**
- (A) "We've come a long way."
- (B) "I miss those days sometimes."
- (C) "Those sticky notes are still on the whiteboard."
**Maya (if C):** "...oh my god, they are. We should probably update the roadmap."

---

## 12. DISCOVERY & SECRETS

### 12.1 The Hidden Layer

Like Stardew Valley's hidden mechanics (the Junimo hut, the wizard's tower, the secret notes), SaaS Quest has a discovery layer that rewards curious players.

**Hidden Achievements:**
- **"Ship It Broken"** — IPO with a product score below 30
- **"The Introvert"** — Complete the game without ever visiting the coffee shop
- **"Paper Clip Maximizer"** — Reach $100M ARR with only 3 employees
- **"Jordan Knows"** — Find all of Jordan's hidden desk objects and bring them one that completes a set
- **"The Barista Investor"** — Get Gina to invest in your company
- **"One of Us"** — Get Chad Thunderpitch to 10 hearts and merge the companies
- **"Speedrun"** — IPO in under 8 in-game quarters
- **"The Graveyard Shift"** — Visit every location after midnight
- **"Inbox Zero"** — Respond to every email for an entire year
- **"Culture Fit"** — Maintain team morale above 80 for 4 consecutive quarters

**Secret Notes:**
Found randomly when interacting with objects, a system of cryptic notes appears throughout the game. Some are practical ("The vending machine in the conference center has a secret menu — press B twice"), some are narrative ("I found this under Jordan's desk: a receipt for a one-way plane ticket to Geneva. Dated next Tuesday."), and some are meta ("Dear player: if you're reading this, you've been playing for more than 3 hours. Please drink some water.")

**Jordan's Desk Objects (Collectible Thread):**
Throughout the game, new objects appear on Jordan's desk. Each one is a hint about the endgame. Collecting them all (by finding corresponding objects in the world and placing them nearby) triggers a unique cutscene where Jordan explains — not everything, but *something*.

### 12.2 New Game+ Elements

After completing one ending, subsequent playthroughs include:
- A letter from "a friend" at the start with advice that subtly references your previous playthrough
- Jordan occasionally breaks the fourth wall with comments that only make sense if you've played before
- One new NPC who didn't exist in the first playthrough: a quiet person at the coffee shop who asks strange questions about what you'd do differently "if you could start over"
- The Gazette includes one headline per quarter that references events from your previous playthrough

---

## 13. AUDIO & FEEL

### 13.1 Music Direction

Full chiptune soundtrack, following the Stardew Valley principle of distinct tracks for every location and season. The music should be good enough to listen to outside the game.

**Location themes:**
- **The Closet:** Plucky, hopeful, slightly nervous. Like the first day of school but you're an adult. Acoustic guitar-style chiptune.
- **The Real Office:** Confident. Getting into a groove. A bit of swagger. Adds bass.
- **The Floor:** Complex, layered. Things are happening. Slight tension underneath. Full arrangement.
- **The Campus:** Epic. Orchestral chiptune. You made it (or you're about to fly too close to the sun).
- **Coffee Shop:** Jazzy, chill. Lo-fi chiptune beats to network to. The best track in the game.
- **Coffee Shop (Late Night):** Same melody, slower tempo, minor key variations. Intimate. A little melancholy.

**Seasonal themes (layered on top of location):**
- **Q1 (Winter→Spring):** Clean, hopeful, ascending melodies. New beginnings.
- **Q2 (Spring→Summer):** Energetic, building momentum. The tempo picks up.
- **Q3 (Summer):** Laid back but with an underlying tension. Heat haze. A slight slowness to everything.
- **Q4 (Fall→Winter):** Rich, warm, full. The most complex arrangements. Holiday variations appear in the final weeks.

**Event themes:**
- **Crisis Events:** Percussion-heavy, urgent. The bass drops.
- **Jordan's Theme:** Mysterious. Slightly off-key. Played when Jordan does something weird. Gets more elaborate each year.
- **Heart Event Theme:** Soft, emotional. Piano chiptune. Different variations for different NPCs.
- **Each Endgame:** Unique final track. IPO gets triumphant horns. Profit gets smooth jazz. R&D gets ethereal wonder. World Domination gets an ominous march that's somehow still a banger. The Garden ending gets a gentle reprise of every NPC's theme woven together.

### 13.2 Sound Effects

Every interaction should have a satisfying sound:
- Menu select: crisp click
- Cash register sound when revenue comes in
- "Cha-ching!" when a deal closes
- A sad trombone when you lose a customer
- Derek's gong (actual gong sound)
- Keyboard clacking when you code
- Coffee machine gurgling
- Jordan's desk: mysterious ambient hum
- Gift accepted: warm chime (loved gift = sparkle, disliked gift = flat note)
- Heart level up: ascending arpeggio
- Seasonal transition: wind chime / bell / birds / snowfall depending on quarter
- Day end: a gentle "close the laptop" sound that becomes associated with anticipation

---

## 14. PROGRESSION PACING & DIFFICULTY

### 14.1 The Difficulty Curve

**Year 1, Q1-Q2 (Days 1-26):** Exciting. Everything is new. The possibilities feel infinite. Low difficulty because there aren't many things to manage yet. But the burn clock looms. *Like Stardew Valley's first spring — overwhelming but forgiving.*

**Year 1, Q3-Q4 (Days 27-52):** First crisis. The reality of running a business sets in. Cash is burning. The product isn't where you want it. Your first hire is great but also costs a lot. This is where bad playthroughs die. *Like Stardew's first winter — you realize how much you should have prepared.*

**Year 2 (Days 53-104):** The growth puzzle. If you've survived, now you need to figure out how to actually scale. This is the most strategically complex phase. Every decision has ripple effects. *Like Stardew's Year 2 — the game reveals its depth.*

**Year 3 (Days 105-156):** The endgame ramp. The scale changes. Decisions are bigger. The comedy takes on darker undertones (power, responsibility, legacy). The game should feel like a different game than Day 1, but the foundations you built early still matter. *Like Stardew's perfection tracker — you're choosing what kind of legacy to build.*

### 14.2 Replayability

Each playthrough should take 4-8 hours. The game is designed to be replayed because:

- Five distinct endgame paths (four main + the secret Garden ending) with unique final acts
- Starting choice (Engineer/Designer/Business) changes early game dramatically
- Random events mean no two playthroughs feel the same
- Jordan's behavior is different each time (foreshadowing the relevant endgame)
- Different hiring strategies lead to wildly different stories
- NPC relationships can go completely differently based on your choices
- Hidden achievements for weird/specific playthroughs
- New Game+ elements that change the experience
- Seasonal events you might have missed the first time
- The Gazette headlines are partially randomized — different world each time

---

## 15. TECHNICAL NOTES FOR AGENTS

### 15.1 Art Direction (For Art Director Agent)

- **Palette:** Stardew Valley-inspired warmth with SNES-era clarity. Rich, saturated colors that shift with the seasons. Q1 is cool blues and fresh greens. Q2 is warm gold and bright green. Q3 is deep amber and dusty teal. Q4 is warm reds, golds, and cozy browns. Reference Stardew Valley's interior palettes and Chrono Trigger's warm office spaces.
- **Sprite Size:** 16×24 for characters, 16×16 for tiles
- **Animation:** 2-4 frames per direction for walking. Idle animations are critical for personality (Jordan should fidget, Maya should type, Derek should gesture while talking, Gina should wipe the counter).
- **Resolution:** 320×224 native canvas, scaled 3× (960×672 display)
- **Rendering:** Y-sorted for depth. Tile-based with eased movement.
- **Seasonal details:** Office window shows different weather/lighting per quarter. Decorations change. NPC clothing changes subtly with seasons.

### 15.2 Game Design (For Game Designer Agent)

- **Core Loop:** Wake up → Check email → Check calendar → Spend AP → Talk to people → Give gifts → Resolve day → The Hook → Repeat
- **Always show:** Cash, MRR, Runway, Day, AP remaining, Quarter/Year
- **Never hide:** How close the player is to running out of money
- **Balance principle:** There should be no "correct" strategy, only tradeoffs
- **Stardew principle:** Every system should be discoverable through play, not tutorials. Show, don't tell. The player should learn that gifts matter by noticing an NPC's reaction, not from a popup.
- **One-more-day principle:** Every evening must include at least one unresolved thread that pulls the player into tomorrow.

### 15.3 Production (For Producer Agent)

**Build Priority Order:**
1. Core loop (AP system, day cycle, basic economy, quarterly calendar)
2. Office environment (walkable, interactable, evolving)
3. NPC system (schedules, dialogue, heart meters)
4. Hiring system
5. Gift system
6. Event system (crises, opportunities, absurd, seasonal)
7. Dialogue system with branching and heart-level variations
8. Endgame paths
9. Discovery layer (secrets, achievements, hidden areas)
10. Polish (animations, sound, seasonal effects, juice)

Each build should be a playable, complete game — even if small. Never break what works to add something new. Like Stardew Valley's development: ConcernedApe built the farm loop first, then NPCs, then events, then polish.

---

## 16. WHAT MAKES THIS GAME SPECIAL

This game works because it's the intersection of four things people love:

1. **The Stardew Valley loop** — The daily rhythm of wake up, make decisions, talk to people, watch the numbers tick, and go to bed thinking "one more day." Nobody has applied this loop to building a startup before. It fits perfectly, because running a startup literally feels like this.

2. **The cozy sim world** — Harvest Moon and Stardew Valley proved that people will happily spend hundreds of hours in a small place, watching numbers go up, and building relationships with NPCs. That's exactly what running a startup feels like (on the good days). The office is your farm. Your employees are your crops. The harvest is revenue.

3. **The strategic depth** — Every decision matters and has second-order consequences. Hire fast and burn cash. Hire slow and miss the market. Take VC money and lose control. Bootstrap and grow slower. There are no right answers, only interesting choices. The seasonal rhythm adds another layer — you can't just grind, you have to plan around the calendar.

4. **The story** — Jordan, Maya, Derek, the rival, the market, the dream. These aren't mechanics, they're people. The heart system means you care about them as individuals, not just as resources. And the endgame reveals recontextualize everything. When Jordan finally tells you what they've been doing, it should be a moment players remember — like Stardew's community center restoration, but for your entire understanding of the game.

Nobody has made this game before. Business sims exist, but they're spreadsheets with graphics. Cozy sims exist, but they don't have strategic depth. RPGs have great characters, but they don't simulate real business dynamics. Stardew Valley has the perfect loop, but nobody has transported it from a farm to a startup office.

**SaaS Quest is all of it at once.** And it's funny. And it's pixel art. And you can play it in a browser. And the barista has an MBA.

Let's build it.
