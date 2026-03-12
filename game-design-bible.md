# SaaS Quest: Startup Simulator
## Game Design Bible v3.0

> *"You quit your job. You have $150,000 in angel money, a co-founder you met at a hackathon, and a dream to change the world. The co-founder mostly just drinks coffee and nods. The dream is a B2B SaaS platform. Welcome to the grind."*

---

## 0. CREATIVE NORTH STAR

> **This block is the irreducible vision of the game. Every agent receives it every round. If nothing else survives context limits, this must.**

SaaS Quest is a 16-bit cozy startup simulator that plays like Stardew Valley but instead of watering crops, you're building a SaaS company. The daily rhythm — check email, spend Action Points, watch the numbers, talk to your team — is designed to produce the same "one more day" addiction that makes you look up and realize it's 2 AM.

**Five pillars:**

1. **The Stardew Hook.** Daily loop structure, NPC relationships, seasonal cycles, cozy-but-strategic feel. The player should always want to see what tomorrow brings.
2. **Real Business Tension.** The burn clock never stops. Hiring, pricing, fundraising, and pivoting all have genuine tradeoffs with no correct answers. This is a business sim with teeth underneath the pixel art.
3. **Characters, Not Mechanics.** Jordan, Maya, Derek, Gina, Chad — these are people, not quest-givers. The humor comes from specificity and relatability. The gut-punches are earned.
4. **Jordan's Mystery.** The co-founder is the emotional spine of the game. Everything Jordan says foreshadows all four endgame paths simultaneously. The reveal should be a moment players remember.
5. **Warm, Funny, Then Gut-Punch.** The tone is Silicon Valley (the show) meets Stardew Valley meets Earthbound. Ten minutes of fun earns one serious moment.

**Art feel:** SNES-era pixel art — Stardew Valley's warmth, Chrono Trigger's interiors, Harvest Moon's cozy office spaces, Earthbound's quirky humor.

**Sound feel:** Chiptune. The apartment theme sounds like the first day of something. Jordan's ambient hum is slightly dissonant. Chad's notification sound should make your stomach tighten after the fifth time.

---

## 1. THE ELEVATOR PITCH

**SaaS Quest** is a 16-bit top-down startup simulation RPG in the spirit of Stardew Valley, Harvest Moon, and Pokémon — but instead of watering crops, you're building a SaaS company from a cramped co-working desk to... well, that depends on how you play. You might IPO and ring the bell at NASDAQ. You might become so profitable you buy a yacht. You might invest so hard in R&D that your technology literally creates a utopia. Or you might accumulate so much power that you effectively control the world.

Or you might run out of money in Month 3 because you hired a $180k engineer before you had a single customer.

Like Stardew Valley, this is a game about building something from nothing in a place full of characters you'll grow to love. The daily rhythm of checking your email, making decisions, talking to your team, and watching the numbers tick is designed to produce the same "one more day" addiction that makes you look up and realize it's 2 AM. But underneath the cozy pixel art is a real business simulation with genuine strategic depth — and a mystery co-founder who is definitely up to something.

**Genre:** Simulation RPG / Business Tycoon with narrative depth
**Art Style:** SNES-era pixel art (Stardew Valley / Chrono Trigger / Harvest Moon / Earthbound)
**Perspective:** Top-down 3/4 view
**Resolution:** 640×360 native, scaled 2× (1280×720 display), nearest-neighbor rendering
**Tile Size:** 32×32 pixels (20×11 visible tile grid)
**Platform:** HTML5 Canvas (browser-based, single-file deployment)
**Tone:** Warm, funny, occasionally gut-punching — like startup life itself

---

## 2. THE WORLD

### 2.1 Setting Overview

The game takes place in **Silicon Gorge**, a fictional tech hub that's one part San Francisco, one part Austin, one part "we got priced out of both and ended up here." The city is vibrant, slightly absurd, and full of characters who all think their startup is going to change the world.

The player moves between several key locations that unlock as the company grows:

### 2.2 Locations

**THE OFFICE (Home Base)**
Your office evolves as the company grows. This is where you spend most of your time.

- **Stage 1 — "The Closet" (Days 1–60):** A cramped co-working desk. Two desks, a shared coffee machine, motivational poster that says "HUSTLE" (it's crooked). The mysterious co-founder sits across from you. There's a whiteboard with your roadmap on it (3 sticky notes). You can hear the startup next door arguing about their logo.

- **Stage 2 — "The Real Office" (Days 61–180):** You signed a lease! A proper room with 4-6 desks, a meeting area with a rug, a coffee machine that actually works, a window overlooking a parking lot. The whiteboard is bigger. There's a plant someone bought that's already dying.

- **Stage 3 — "The Floor" (Days 181–360):** An entire floor of a building. Engineering pod, sales bullpen, a glass-walled conference room called "The Fishbowl." A kitchen with a beer fridge. The plant has been replaced three times. There's a napping pod that nobody uses because everyone's too stressed.

- **Stage 4 — "The Campus" (Day 361+):** Multiple floors or buildings. A lobby with your logo on the wall. A cafe. A gym. The co-founder has his own office now with the door always closed. There are employees you don't recognize. You have an executive assistant. The original "HUSTLE" poster is framed.

**THE COFFEE SHOP — "Grind & Brew"**
Where you go to recruit, network, and overhear industry gossip. NPCs cycle through here on different days. The barista knows everyone's order and drops hints about the local scene.

- Recruiting conversations happen here
- Investor meetings (early stage) happen at the corner booth
- Random encounters with other founders, journalists, VCs
- You can buy coffee that gives temporary stat boosts (+Focus, +Charisma)

**THE CONFERENCE CENTER — "TechCrunch Pavilion"**
Unlocks around Day 90. Host of industry events, demo days, and conferences.

- Demo Day events (pitch to investors, win funding)
- Conference networking (meet enterprise clients)
- Competitor launch events (watch their product, steal ideas... or panic)
- Award ceremonies (Best Startup, Most Innovative, etc.)

**THE VC OFFICES — "Sand Hill East"**
Unlocks when you qualify for Series A. A sleek, intimidating building.

- Pitch meetings for funding rounds
- Board meetings (once you have investors)
- Running into other founders in the lobby who are either celebrating or crying

**THE UNIVERSITY — "State Tech"**
Unlocks mid-game. Source of interns, research partnerships, and talent.

- Hire interns (cheap but need management)
- Research partnerships (boost R&D significantly)
- Guest lectures (builds brand, attracts talent)
- Hackathon sponsorship events

**THE GOVERNMENT BUILDING**
Late game only. This is where regulatory and policy stuff happens.

- Lobby for favorable regulations
- Deal with compliance requirements
- Government contracts (huge revenue, soul-crushing paperwork)

---

## 3. THE CHARACTERS

### 3.1 The Player Character

**Name:** Player-chosen
**Default Look:** Hoodie, jeans, laptop bag, tired eyes, coffee in hand
**Background:** Someone who quit a comfortable BigCorp job to "make a dent in the universe." Has decent skills in their chosen domain and zero experience running a company. Idealistic but not naive — or maybe a little naive.

**Customization (at game start — Character Creation screen):**
- **Role:** Choose from **Seller**, **Dev**, or **Marketer** — affects starting stats, early dialogue options, which activities are most effective, and how Chad's first email reads
- **Motivation:** Choose "Change the World," "Get Rich," or "Prove Them Wrong" — affects which endgame paths feel most natural and unlocks unique dialogue

### 3.2 The Co-Founder — "Jordan"

The heart and comedic soul of the game. Jordan is your co-founder. You met at a hackathon six months ago. You built a prototype together over a weekend. Now you're co-founders of a company, and you're starting to realize you have no idea what Jordan actually does.

**Visual:** Glasses, messy dark hair, always has a mysterious smile. Sits at their desk typing furiously. Sometimes stares out the window. Sometimes you catch them reading a book about... theoretical physics? Or is that a cookbook?

**Sprite:** 32×48 pixels, SNES Stardew Valley style. Casual hoodie, round glasses, neutral-friendly expression, warm amber and teal palette. Glasses must be readable at sprite size.

**Behavioral Quirks:**
- When you walk past Jordan's desk, their screen minimizes instantly
- They take phone calls in whispered tones and step outside
- Their desk has increasingly weird objects on it (a Rubik's cube that's always solved, a jar of marbles, blueprints for... something)
- They occasionally say cryptic things: "The inflection point is closer than you think" or "Have you ever considered what happens after the singularity?"
- They order food delivery from restaurants that don't seem to exist on any app
- They never seem stressed about money, even when runway is 2 months

**Jordan's Idle Behavior — "The Minimize":**
When the player walks within 2 tiles of Jordan's desk, Jordan's screen flickers — a single frame where the colors change — before returning to normal. Jordan's head turns slightly toward the player and then back. Requires 3 animation frames: normal_typing → screen_flash → resume_typing_with_head_turn. The screen flash happens in exactly 1 frame (~33ms at 30fps). Players walk past Jordan's desk many times per day and can never see what was on the screen. This small obsessive detail plants the question early: what is Jordan working on?

**Jordan's Secret (Multiple Paths):**
Jordan's true nature depends on which endgame path the player pursues, revealing differently in each:

1. **IPO Path:** Jordan has been quietly filing patents and building IP that makes the company 10× more valuable than the player realized. At the IPO roadshow, the bankers are more excited about Jordan's portfolio than the product.

2. **Profit Path:** Jordan is revealed to have been running a hyper-efficient side operation — automating support, building internal tools, optimizing everything. They're the reason margins are so high. "I just like things to work," they shrug.

3. **R&D Utopia Path:** Jordan is a genuine once-in-a-generation scientific mind. The "weird research" was real research. They've been working on something that changes everything. The player's company was just the vehicle Jordan needed to fund it.

4. **World Domination Path:** Jordan has been building a shadow network of influence — connections to governments, other companies, research labs. They've been playing a longer game than anyone. "Did you really think this was just a SaaS company?" they ask, grinning.

### 3.3 Key NPCs

**MAYA CHEN — The First Employee**
Your first real hire (if you go the engineering route). Brilliant, loyal, and slightly overwhelmed. She'll stay with you through thick and thin, but she has a breaking point. If morale drops too low, she'll quit — and it hurts. She references inside jokes from the early days.

**DEREK "DEMO" WILLIAMS — The Sales Guy**
Your first sales hire (if you go the revenue route). Big energy, big promises. He's either your best asset or your worst nightmare. Sometimes he closes deals that engineering can't actually deliver. His desk has a gong on it. He hits it when he closes a deal.

**DR. PATRICIA OKAFOR — The Advisor**
A former exec at a Fortune 500 company who takes a liking to you. She gives advice in the form of stories about her own career. Her advice is always good but sometimes hard to hear. She appears at the coffee shop.

**VIK NAKAMURA — The VC**
Your Series A lead investor. Friendly, smart, and ruthless. He genuinely wants you to succeed, but he also needs a return. As the company grows, his "suggestions" become harder to ignore. Board meetings with Vik are a strategic mini-game.

**GINA — The Barista**
Knows everything. Drops gossip about competitors, market trends, and who's hiring/firing. A great source of early intelligence. She has strong opinions about your business model and she's usually right.

**CHAD THUNDERPITCH — The Rival Founder**
CEO of your main competitor. Went to Stanford. Has more funding than you. His product is worse but his marketing is better. You'll see him at events. He'll make passive-aggressive comments. Beating him is deeply satisfying.

---

## 4. CORE GAMEPLAY LOOP

### 4.1 The Day Cycle

Each "day" in the game represents roughly a week of real time. The player gets **5 Action Points (AP)** per day to spend on activities. Some activities cost 1 AP, some cost 2-3. The day has three phases:

**MORNING (Planning Phase)**
- Check email inbox (events, customer requests, investor updates)
- Review dashboard (MRR, cash, runway, product progress, team morale)
- Read the "Silicon Gorge Gazette" headline (world events that affect your business)
- Jordan says something cryptic or funny

**AFTERNOON (Action Phase)**
- Spend AP on activities (see Activity System below)
- Walk around the office and talk to team members
- Handle interrupts (fires, opportunities, random events)

**EVENING (Resolution Phase)**
- See results of the day's actions
- Revenue ticks in (or doesn't)
- Expenses deduct
- Team morale adjusts based on the day's events
- Occasionally get a late-night email that changes everything

### 4.2 The Activity System

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
- **Eavesdrop** — Sometimes you overhear things about competitors or market shifts.

**AT THE CONFERENCE (2-3 AP):**
- **Pitch** — Present to investors or at demo days. A dialogue mini-game.
- **Exhibit** — Show your product at a trade show. Costs money but generates leads.
- **Attend Talk** — Gain insights and random buffs.

### 4.3 The Hiring System

Your most important and most expensive decisions. Each hire is a named character with stats, personality, and a salary. You can't just hire generic "developers" — you hire *people.*

**Hiring Process:**
1. Post a job listing (costs 1 AP + money for job board)
2. Candidates appear over the next few days
3. Interview them at the coffee shop (1 AP each)
4. Each candidate has visible stats (skill, experience) and hidden traits (loyalty, ambition, quirkiness)
5. Make an offer. They might counter. They might ghost you.

**Employee Stats:**
- **Skill** (1-10): How good they are at their job
- **Speed** (1-10): How fast they work
- **Morale** (1-100): How happy they are. Below 30 and they start looking elsewhere.
- **Loyalty** (hidden): How much BS they'll tolerate before quitting
- **Ambition** (hidden): High ambition = great performance but they'll want promotions/raises
- **Quirkiness** (hidden): Affects random events. Quirky employees cause more chaos but also more innovation.

**Department Roles:**
- **Engineering:** Builds the product. More engineers = faster development, but diminishing returns (the mythical man-month is real)
- **Sales:** Generates revenue. More salespeople = more customers, but they need a product to sell
- **Marketing:** Generates leads for sales and builds brand. Force multiplier.
- **Customer Success:** Reduces churn. You'll ignore this role at first. You'll regret it.
- **Operations/HR:** Unlocks at 15+ employees. Handles admin. Boosts morale company-wide.

---

## 5. THE ECONOMY

### 5.1 Money

**Starting Capital:** $150,000 angel investment
**Currency Display:** Cash in bank, shown in HUD at all times. Turns yellow below 3 months runway. Turns red below 1 month.

**Revenue Model:**
- Customers pay Monthly Recurring Revenue (MRR)
- Different customer tiers: Starter ($49/mo), Pro ($199/mo), Enterprise ($999/mo)
- Customers churn (cancel). Churn rate depends on product quality, support quality, and competitor actions.
- Annual contracts available later (big cash bump but commitment)

**Expenses (Monthly):**
- Salaries (by far the biggest)
- Office rent (increases with office size)
- Software tools and infrastructure
- Marketing spend
- Coffee budget (surprisingly important for morale)

**Fundraising:**
- **Angel Round** (starting money): Already done. $150K.
- **Seed Round** (available ~Day 60-120): $500K-$2M. Requires traction.
- **Series A** (available ~Day 180-300): $5M-$15M. Requires strong metrics.
- **Series B+** (late game): $20M+. You're either flying or dying.
- Each round dilutes your ownership. This matters for the IPO endgame.

### 5.2 Key Metrics (The Dashboard)

The player's HUD shows critical business health at all times:

- **Cash:** Money in the bank right now
- **MRR:** Monthly Recurring Revenue
- **Runway:** Months until you're broke (Cash ÷ Monthly Burn)
- **Customers:** Total paying customers
- **Churn:** Monthly customer loss rate (shown as %)
- **Product Score:** Overall product quality (affects churn, sales, reviews)
- **Team Morale:** Average team happiness
- **Reputation:** How the market perceives you (affects hiring, sales, fundraising)

### 5.3 The Burn Clock

This is the tension engine of the entire game. Every day, money goes out. The runway counter is always ticking down. In the early game, this creates genuine anxiety — should you spend money on that hire, or conserve cash? Should you take that investor's term sheet even though the terms are bad?

The burn clock softens (but never disappears) as the company grows. Even at $10M ARR, a bad quarter can put you in a cash crunch.

---

## 6. PROGRESSION & MILESTONES

### 6.1 Company Stages

The game has distinct eras that change the feel, challenges, and available actions:

**ERA 1: "THE GARAGE" (Days 1-60)**
*Survive. Ship something. Get your first customer.*

- Just you and Jordan in a co-working space
- Build the MVP (minimum viable product)
- Find your first 3 customers manually (literally going to the coffee shop and pitching people)
- First critical decision: who do you hire first?
- Milestone: First paying customer (triggers a celebration cutscene — Jordan pops a $4 bottle of champagne)

**ERA 2: "THE PUSH" (Days 61-180)**
*Prove the business model. Find product-market fit.*

- Office upgrade to a real space
- Team of 3-8 people
- Navigating the chaos of early growth
- First customer complaint. First customer success story. First employee conflict.
- Product decisions that have long-term consequences
- Milestone: $10K MRR (a magic number that opens doors)

**ERA 3: "THE MACHINE" (Days 181-360)**
*Scale. Grow. Compete. Don't break.*

- Bigger office, more people, more complexity
- Hiring managers, not just individual contributors
- Competitors are attacking. Media is watching.
- Your first board meeting (if you took VC money)
- Culture starts mattering — you have to actively maintain it
- Milestone: $100K MRR (you're a "real company" now)

**ERA 4: "THE EMPIRE" (Day 361+)**
*Choose your destiny.*

- The endgame paths diverge here
- You're making decisions that affect not just your company but the industry
- Jordan's secret starts to surface
- The scale of events changes dramatically
- Milestone: Path-specific

### 6.2 Skill Trees (Player Progression)

As you gain experience, you unlock personal abilities in three branches:

**TECHNICAL LEADERSHIP**
- Faster coding / product development
- Better technical interviews (hire stronger engineers)
- Architectural insight (spot technical debt before it hurts)
- "10x CEO" (direct coding boosts are massive, but you're bottlenecking yourself)

**BUSINESS ACUMEN**
- Better pitch success rates
- Stronger negotiation (better deal terms, lower costs)
- Market prediction (see trends 30 days earlier)
- "The Oracle" (you can see what competitors will do next quarter)

**PEOPLE & CULTURE**
- Morale boost to all employees
- Reduced turnover
- Conflict resolution (handle team disputes without losing people)
- "The Magnet" (top talent actively seeks you out)

---

## 7. EVENTS & RANDOM ENCOUNTERS

This is where the game comes alive. Events fire based on day count, company stage, metrics, or pure randomness. They keep every playthrough feeling different.

### 7.1 Event Categories

**CRISES (Things that go wrong)**
- **"The Server's on Fire"** — Production goes down. Lose customers every hour you don't fix it. Do you: pull an all-nighter (morale hit), call in a favor from a friend (costs a relationship point), or hire an emergency contractor ($$)?
- **"The Glassdoor Review"** — A disgruntled ex-employee (or current employee?!) posts a scathing review. Recruiting gets harder. Do you respond publicly, investigate internally, or ignore it?
- **"The Cease & Desist"** — A big company says you're infringing their patent. Probably BS, but lawyers cost money. Fight, settle, or pivot?
- **"The Key Person Risk"** — Your best engineer gets an offer from Google. Do you counter-offer, let them go, or try to convince them to stay with equity?
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

**SEASONAL/TIMED**
- **"Demo Day"** — Annual event. Chance to pitch to a room full of investors. Success depends on metrics + pitch skill.
- **"Year-End Reviews"** — Every employee expects a raise. You can't afford to give everyone what they want. Choose carefully.
- **"The Holiday Party"** — Costs money but massive morale boost. Skip it and morale tanks. The co-founder always gives a weird toast.
- **"Tax Season"** — Surprise! You owe more than expected. Cash crunch.
- **"Summer Slowdown"** — Enterprise buyers go on vacation. Sales slow for 60 days. Plan accordingly.

### 7.2 The Email System

Every morning you get 2-5 emails. They're a mix of:
- Customer requests / complaints
- Team messages (morale indicators)
- Investor check-ins
- Spam (funny fake startup pitches: "Uber for Cats," "Blockchain-powered Toothbrush")
- Occasional story-critical messages
- Chad's emails (see Section 10)

Ignoring email has consequences. That customer complaint you didn't respond to? They churned. That investor email you forgot? They moved on.

---

## 8. THE FOUR ENDGAMES

Each endgame path has its own final act, climax, and ending sequence. The player's choices throughout the game naturally steer toward one, but there are key decision points that lock you in.

### 8.1 IPO GLORY

**Trigger Conditions:** $5M+ ARR, 3+ funding rounds completed, Board approves

**Final Act:** "The Roadshow"
- You fly to New York (new location unlocks: Wall Street)
- Series of investor presentations (pitch mini-games get intense)
- Media scrutiny increases
- Jordan reveals the patent portfolio that makes bankers drool
- Pricing the IPO: set it too high and it crashes day one. Too low and you leave money on the table.

**Climax:** The IPO bell-ringing ceremony. Your pixel character stands at NASDAQ. The ticker shows your stock price. The whole team is there. Jordan is wearing a suit for the first time ever.

**Ending:** Market cap based on your company's true fundamentals. The ending grades your IPO from "meme stock disaster" to "generational company." A montage of where everyone ends up.

### 8.2 PROFIT MACHINE

**Trigger Conditions:** $2M+ ARR, profitable for 4+ consecutive quarters, no VC debt

**Final Act:** "The Buyout Offers"
- Acquirers come knocking. Big numbers on the table.
- You can sell (happy ending but shorter) or keep building
- Jordan reveals they've been optimizing everything behind the scenes
- The company runs like a Swiss watch

**Climax:** The moment your bank account hits a number you never imagined possible. It's not a spectacle — it's a quiet Tuesday when you check the dashboard and realize you never have to worry about money again. Jordan is drinking coffee, reading a book. The office is calm. It's beautiful.

**Ending:** The "Quiet Giant" ending. You're not famous. You're not on magazine covers. But you built something real that prints money and employs hundreds of people who love their jobs. Ending grades based on profit margins and employee satisfaction.

### 8.3 R&D UTOPIA

**Trigger Conditions:** R&D investment >40% of revenue for 8+ quarters, Research score maxed, Jordan's research complete

**Final Act:** "The Breakthrough"
- Jordan's been working on something. You've been funding it without fully understanding it.
- A breakthrough happens. It's bigger than your company. It's bigger than your industry.
- The world changes. Your technology unlocks something: clean energy, disease cures, AGI, or some combination.
- You have to decide: patent it and profit, or open-source it and change the world?

**Climax:** A cinematic cutscene. Your little office, your scrappy team, your weird co-founder — they just changed the trajectory of human civilization. Jordan finally explains what they've been working on. It's emotional.

**Ending:** The world is better. Your company may or may not be huge, but that's not the point anymore. Ending grades based on how much you gave away vs. kept.

### 8.4 WORLD DOMINATION

**Trigger Conditions:** Market share >60%, acquired 3+ competitors, government contracts active, Reputation > 90

**Final Act:** "The Network"
- Jordan's connections come to light. They've been building alliances you didn't know about.
- Your product is everywhere. Governments depend on it. Competitors are gone.
- You face a choice at every turn: consolidate more power, or show restraint?
- Anti-trust regulators show up. Media turns hostile. Former allies become enemies.

**Climax:** You're in a room with world leaders. Your platform controls the flow of information and commerce for a billion people. Jordan is at the table with you, calm as ever. "This was always the plan," they say. "The question is: what do you do with it?"

**Ending:** The "Emperor" ending. Your company is the most powerful organization in the world. But are you a benevolent ruler or a tyrant? Ending grades based on how you wielded power throughout the game. Dark endings are possible here.

---

## 9. DIALOGUE & TONE

### 9.1 Writing Style

The game's writing should feel like a sharp comedy that occasionally hits you in the gut. Think: Silicon Valley (the show) meets Stardew Valley meets Earthbound.

**Rules for dialogue:**
- NPCs should feel like real people, not quest-givers
- Humor comes from specificity and relatability, not randomness
- Industry jargon is used but always as a joke or with a punchline
- Jordan's dialogue is always slightly off — never enough to be alarming, just enough to be intriguing
- The player never says anything cringe-worthy. They can be awkward, but never cringe.
- Every serious moment should be earned by 10 minutes of fun first

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

### 9.2 The Silicon Gorge Gazette

A daily in-game newspaper with 1-2 headlines. These provide world-building, foreshadowing, and comedy. Some affect gameplay, some are just flavor.

**Example Headlines:**
- "Local Startup Claims to Be 'Uber for Libraries,' Cannot Explain Why"
- "VC Firm Announces New Fund: '$100M For Companies That Understand AI, We'll Know It When We See It'"
- "Study Finds 99% of Startup Founders Would Do It Again, 98% Would Not Recommend It"
- "Thunderpitch Technologies Raises $50M at $500M Valuation, Product Still in Beta"
- "Co-Working Space Adds Fourth Craft Beer Tap, Removes All Meeting Rooms"
- "Annual Developer Salary Survey Finds Everyone Is Underpaid Except Everyone Else"

---

## 10. JORDAN'S EARLY DIALOGUE

These lines are canonical. They must appear in the game in this order. Each line foreshadows all four endgame paths simultaneously.

### Day 1

Jordan looks up from the laptop as the player enters the apartment for the first time after character creation.

> "I ran the numbers on the probability of two strangers meeting at a hackathon and deciding to start a company together. It's vanishingly small. Smaller than most people would guess. I find that reassuring."

**Foreshadowing:** IPO (quantitative rigor), Profit (loves systems), R&D (scientific mind), World Domination (expects improbable outcomes — might engineer them).

**Cannot be cut.** Establishes Jordan's character in one breath.

### Day 2

Jordan, without looking up from their screen:

> "Did you know most startups don't fail because they run out of money? They fail because the founders stop agreeing on what the company is for. The money is just how you keep score."

**Foreshadowing:** IPO (scoreboard), Profit (philosophy not metric), R&D (Jordan has a specific unspoken answer), World Domination (thinking about the meta-game).

**Cannot be cut.** First hint Jordan is thinking on a different level.

### Day 3

Jordan is standing at the whiteboard when the player arrives. There's a diagram that might be a network graph, a molecular structure, or an org chart. Jordan sees the player looking and erases it.

> "Sorry. Thinking out loud. How are you feeling about all this?"

**Foreshadowing:** IPO (org chart), Profit (process flow), R&D (molecular structure), World Domination (network graph).

**Cannot be cut.** Introduces a visual mystery (the diagram) and a relational shift (Jordan asking about feelings).

### Jordan Writing Style Guide

**Rule 1:** Jordan never uses startup jargon sincerely. No "disrupting," "synergy," "pivot" played straight. If Jordan uses these words, it's with audible irony.

**Rule 2:** Sentences alternate between short and specific. One sentence is 4–6 words. The next is 15–20 with a precise observation. Rhythm: punch, expand, punch.

**Rule 3:** Jordan answers direct questions with adjacent information. "Are you worried about money?" gets "The cash curve intersects the revenue curve at an interesting angle."

**Rule 4:** Jordan never expresses anxiety, frustration, or urgency. Their timescale is different. The calm should feel either reassuring or unsettling.

**Rule 5:** Jordan notices things the player hasn't mentioned. "You changed the font on the landing page. Good call." Never judgmental — just precise.

**Rule 6:** Jordan uses specific numbers where others use vague words. Not "a lot" — "approximately 340." Not "a while" — "about thirteen days."

**Rule 7:** Jordan's warmth is expressed through action, not words. Jordan doesn't say "I care about you." Jordan shows up early. Jordan already ordered coffee. Jordan quietly fixed a bug.

**Rule 8:** One line per conversation should be quotable out of context. Not as a fortune cookie — as something a real person might text a friend.

---

## 11. CHAD'S EMAILS

Chad Thunderpitch communicates primarily through email. His messages are devastatingly effective because they're technically generous — every sentence is a compliment or an offer. The damage is structural, not verbal.

### Chad's Day 1 Message — Seller Variant

**From:** Chad Thunderpitch
**Subject:** Quick note — exciting times ahead!

> Hey [Player Name], Heard through the grapevine you made the leap! Honestly, respect. I remember that feeling — the rush of finally going all-in. [...] I just closed our seed — $4.2M from Sequoia and a16z. Small round but we wanted to stay focused. Team of eleven so far. Four engineers, two of them ex-Google. It's moving fast. Anyway, just wanted to say congrats and welcome to the arena. Grab coffee sometime?

### Chad's Day 1 Message — Dev Variant

**From:** Chad Thunderpitch
**Subject:** Saw your GitHub. Quick thought.

> Solid architecture. Really clean separation of concerns. [...] We just locked down our seed ($4.2M, Sequoia + a16z) and we've got four PhDs on the eng team. [...] One thing I'd flag — and genuinely trying to be helpful here — distribution is where solo-technical founders usually hit the wall.

### Chad's Day 1 Message — Marketer Variant

**From:** Chad Thunderpitch
**Subject:** Love the landing page. Quick thought.

> The messaging is *tight*. Seriously — "the operating system for modern revenue teams" is a killer line. I almost wish I'd thought of it first. Almost. [...] We just brought on the former head of growth from Stripe, which has been a game-changer.

### Chad Writing Style Guide

**Rule 1:** Chad never insults directly. Every negative message is wrapped in a compliment. If you can point to a single mean sentence, it's written wrong.

**Rule 2:** Chad mentions his own resources within the first three sentences. Funding, team size, notable hires. Framed as context, not bragging.

**Rule 3:** Exactly one emoji per message, in the subject line or sign-off only. Maximum two exclamation marks per email. He is controlled.

**Rule 4:** Chad always offers something. Coffee, advice, introductions. The offers are real. That's what makes them devastating.

**Rule 5:** Chad never says "competitors." He says "similar space," "adjacent problems," "playing in similar territory." The implication: you're not big enough to compete with.

---

## 12. PROGRESSION PACING & DIFFICULTY

### 12.1 The Difficulty Curve

The game should feel like this:

**Days 1-30:** Exciting. Everything is new. The possibilities feel infinite. Low difficulty because there aren't many things to manage yet. But the burn clock looms.

**Days 30-90:** First crisis. The reality of running a business sets in. Cash is burning. The product isn't where you want it. Your first hire is great but also costs a lot. This is where bad playthroughs die.

**Days 90-180:** The growth puzzle. If you've survived, now you need to figure out how to actually scale. This is the most strategically complex phase. Every decision has ripple effects.

**Days 180-360:** The management challenge. You stop doing and start leading. The game shifts from "build the product" to "build the team that builds the product." New kinds of problems: culture, communication, politics.

**Days 360+:** The endgame ramp. The scale changes. Decisions are bigger. The comedy takes on darker undertones (power, responsibility, legacy). The game should feel like a different game than Day 1, but the foundations you built early still matter.

### 12.2 Replayability

Each playthrough should take 4-8 hours. The game is designed to be replayed because:

- Four distinct endgame paths with unique final acts
- Starting role choice (Seller/Dev/Marketer) changes early game dramatically
- Random events mean no two playthroughs feel the same
- Jordan's behavior is different each time (foreshadowing the relevant endgame)
- Different hiring strategies lead to wildly different stories
- Hidden achievements for weird/specific playthroughs (e.g., "Ship It Broken" — IPO with a product score below 30)

---

## 13. AUDIO & FEEL

### 13.1 Technical Architecture

All audio ships inside game.html as JavaScript. No external files, no CDN. Web Audio API with OscillatorNode and GainNode for chiptune synthesis. Pure synthesis keeps file size minimal. AudioContext must be created on first user interaction (browser autoplay policy). Initialize on the first click of character creation.

### 13.2 Music Direction

Full chiptune soundtrack. Distinct themes for each era and location:

**The Apartment Theme (Closet era):**
- Key: C major. Tempo: 95 BPM.
- Lead melody on square wave (25% duty cycle), harmony on triangle wave, bass on triangle wave one octave down, light pulse percussion.
- Feel: First day of something. Morning light. Coffee brewing. Excitement underneath calm. Think Stardew Valley's spring theme — gentle optimism with a hint of wistfulness.
- Duration: 32 bars (~80 seconds). Loop: bar 32 → bar 5 (skip intro on repeat).

**The WeWork Cubicle Theme (Push era):**
- Key: A minor (relative minor of apartment's C major — emotional shift from same pitch center). Tempo: 105 BPM.
- Same palette as apartment plus sawtooth wave pad. Busier bass line. Light hi-hat on eighth notes.
- Feel: The dream is the same but the stakes are real. Still fun but innocence is gone. Think Stardew Valley's fall theme.
- Duration: 48 bars (~110 seconds). Loop: bar 48 → bar 9.

**The Floor (Machine era):** Complex, layered. Things are happening. Slight tension underneath.
**The Campus (Empire era):** Epic. Orchestral chiptune. You made it (or you're about to fly too close to the sun).
**Coffee Shop:** Jazzy, chill. Lo-fi chiptune beats to network to.
**Crisis Events:** Percussion-heavy, urgent. The bass drops.
**Jordan's Theme:** Mysterious. Slightly off-key. Played when Jordan does something weird.
**Each Endgame:** Unique final track. IPO gets triumphant horns. Profit gets smooth jazz. R&D gets ethereal wonder. World Domination gets an ominous march that's somehow still a banger.

### 13.3 Sound Effects

**AP Spend Sound:** 200ms. Descending two-note chime (square wave). G5 to E5. Feels like placing a token — deliberate, satisfying, slightly weighty.

**Day End Chime:** 800ms. Three ascending notes (triangle wave). C4 → E4 → G4. Gentle reverb tail. "Another day done."

**Revenue Tick:** 150ms. Quick bright ping (square wave, high register). C6 with rapid tremolo. A coin landing in a jar.

**Jordan Ambient Hum:** Continuous 4-bar loop at 60 BPM. Very quiet triangle wave drone. Alternates C3 and C#3 every 2 bars. 15% of normal SFX volume. Plays only within 3 tiles of Jordan. The C/C# alternation is just dissonant enough to feel slightly off.

**Chad Notification Sound:** 300ms. Two-tone alert (sawtooth wave). B4 to F5 — a tritone. Quick attack, abrupt cutoff. No reverb. After 5–6 occurrences, the player's stomach should tighten slightly.

**Other sounds:** Cash register for revenue, "cha-ching" for deal close, sad trombone for customer loss, Derek's gong, keyboard clacking, coffee machine gurgling.

---

## 14. TECHNICAL NOTES FOR AGENTS

### 14.1 Art Direction (For Art Department)

- **Palette:** SNES-era, warm. Amber/teal primary with earth tones. Reference Stardew Valley's warmth, Chrono Trigger's interior palettes, Harvest Moon's cozy office spaces.
- **Character Sprites:** 32×48 pixels. 2.5 head-heights tall. Big expressive eyes. Simple readable silhouettes. No pure black outlines.
- **Tile Sprites:** 32×32 pixels. Top-down 3/4 view. Warm lighting. Visible texture.
- **UI Style:** Dark panels with subtle warm border. Amber accent on interactive elements.
- **Animation:** 2-4 frames per direction for walking. 2 frames for idle breathe. Personality expressed through idle animations (Jordan fidgets).
- **Resolution:** 640×360 native canvas, scaled 2× (1280×720 display). DPR correction applied. `image-rendering: pixelated` on canvas.
- **Rendering:** Y-sorted for depth. Tile-based with eased movement. Nearest-neighbor scaling.
- **Missing asset fallback:** Colored rectangles with NPC name label. The game must always run with zero PNG assets.

### 14.2 Game Design (For Game Designer Agent)

- **Core Loop:** Check email → Spend AP → Resolve day → Repeat
- **Always show:** Cash, MRR, Runway, Day, AP remaining
- **Never hide:** How close the player is to running out of money
- **Balance principle:** There should be no "correct" strategy, only tradeoffs
- **Starting cash:** $150,000 (this number is protected — do not change without explicit directive)
- **AP per day:** 5 (protected)
- **Three player roles:** Seller, Dev, Marketer (not "Engineer/Designer/Business")

### 14.3 Engine (For Engine Department)

- **Native resolution:** 640×360 at 2× scale (1280×720 display)
- **Tile size:** 32×32 pixels (20×11 visible grid)
- **DPR correction:** Required. Canvas dimensions must account for device pixel ratio.
- **Sprite rendering:** `imageSmoothingEnabled = false` for nearest-neighbor scaling
- **CSS:** `image-rendering: pixelated` on the canvas element
- **Audio:** Web Audio API synthesis only. No external audio files. See Section 13 for specs.
- **Single-file deployment:** Everything ships in one game.html. No external JS, CSS, or assets beyond embedded base64 PNGs.

### 14.4 Production (For Producer Agent)

**Build Priority Order:**
1. Core loop (AP system, day cycle, basic economy)
2. Office environment (walkable, interactable)
3. Character creation (role selection: Seller/Dev/Marketer)
4. Dialogue system (bottom-of-screen dialogue box)
5. Email system (morning phase)
6. Hiring system
7. Event system
8. NPC interactions + relationship meters
9. Endgame paths
10. Polish (animations, sound, juice)

Each build should be a playable, complete game — even if small. Never break what works to add something new.

---

## 15. WHAT MAKES THIS GAME SPECIAL

This game works because it's the intersection of three things people love:

1. **The cozy sim loop** — Stardew Valley proved that people will happily spend hundreds of hours managing a small operation, watching numbers go up, and building relationships with NPCs. That's exactly what running a startup feels like (on the good days). The "one more day" hook is the single most important design goal.

2. **The strategic depth** — Every decision matters and has second-order consequences. Hire fast and burn cash. Hire slow and miss the market. Take VC money and lose control. Bootstrap and grow slower. There are no right answers, only interesting choices.

3. **The story** — Jordan, Maya, Derek, the rival, the market, the dream. These aren't mechanics, they're people. And the endgame reveals recontextualize everything. When Jordan finally tells you what they've been doing, it should be a moment players remember.

Nobody has made this game before. Business sims exist, but they're spreadsheets with graphics. Cozy sims exist, but they don't have strategic depth. RPGs have great characters, but they don't simulate real business dynamics.

**SaaS Quest is all three at once.** And it's funny. And it's pixel art. And you can play it in a browser.

Let's build it.
