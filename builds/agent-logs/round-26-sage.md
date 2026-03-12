Looking at Luna's brief for Round 25, I need to create the angel investor contact moment with Jordan's mysterious VC knowledge coming through. Here's the content package:

```json
{
  "dialogue": {
    "jordan": {
      "day_4": [
        {
          "id": "jordan_angel_email_reaction",
          "trigger": "event",
          "text": "*Jordan's eyes narrow at your laptop screen* Alexandra Winters. Haven't seen that name in a while. She's legitimate - $47M AUM, 23 exits, 4.2x average return. But she only takes three meetings per quarter. Question is: why you, why now?",
          "player_responses": [
            {
              "id": "a",
              "text": "How do you know her track record so precisely?",
              "effect": {
                "jordan_relationship": 1
              }
            },
            {
              "id": "b", 
              "text": "Maybe our traction is better than we thought.",
              "effect": null
            },
            {
              "id": "c",
              "text": "Should I be worried about the timing?",
              "effect": null
            }
          ]
        },
        {
          "id": "jordan_angel_warnings",
          "trigger": "interact",
          "text": "Angels like Alexandra don't just write checks. They write terms. Liquidation preferences, board seats, pro rata rights on future rounds. She'll want 15-20% minimum. That math changes everything.",
          "player_responses": [
            {
              "id": "a",
              "text": "We need the capital to grow.",
              "effect": null
            },
            {
              "id": "b",
              "text": "How do you know so much about her deal structure?",
              "effect": {
                "jordan_relationship": 1
              }
            },
            {
              "id": "c",
              "text": "What would you do?",
              "effect": {
                "jordan_relationship": 1
              }
            }
          ]
        },
        {
          "id": "jordan_ecosystem_knowledge",
          "trigger": "walk_past",
          "text": "*Jordan stares at something on their phone* She invests through Meridian Ventures now. Different from her solo angel days. Means she's got LP pressure for bigger checks, faster timelines. That coffee shop meeting isn't casual.",
          "player_responses": [
            {
              "id": "a",
              "text": "You seem to know a lot about the VC world.",
              "effect": {
                "jordan_relationship": 1
              }
            },
            {
              "id": "b",
              "text": "Is that good or bad for us?",
              "effect": null
            }
          ]
        },
        {
          "id": "jordan_meeting_advice",
          "trigger": "interact", 
          "text": "Whatever track you choose for that meeting, she'll test you on the other two. Angels invest in founders, not just businesses. She'll want to see you can think beyond your lane. Just... be careful what you promise.",
          "player_responses": [
            {
              "id": "a",
              "text": "Sounds like you've been through this before.",
              "effect": {
                "jordan_relationship": 1
              }
            },
            {
              "id": "b",
              "text": "Any specific things to avoid?",
              "effect": null
            }
          ]
        }
      ]
    }
  }
}
```

```json
{
  "emails": {
    "day_4": [
      {
        "id": "angel_investor_outreach",
        "sender": "Alexandra Winters",
        "sender_company": "Meridian Ventures",
        "subject": "Interest in your B2B platform",
        "body": "Hello,\n\nYour company came across my desk through our deal flow, and I'm intrigued by your approach to the B2B productivity space. The market timing feels right, and early signals suggest you're building something customers actually want.\n\nI'm Alexandra Winters, Managing Partner at Meridian Ventures. We've backed 23 B2B companies over the past decade, with 4 exits above $50M. I typically only take three new meetings per quarter, but your profile warrants a conversation.\n\nI'll be in your area next week for a limited time. Would you be interested in meeting? I can offer three discussion tracks depending on your immediate focus:\n\n• **Go-to-Market Deep Dive** - Customer acquisition strategy, pricing optimization, sales process design\n• **Technical Architecture Review** - Product roadmap, scalability planning, competitive differentiation  \n• **Market Positioning Strategy** - Brand development, messaging framework, competitive landscape\n\nI prefer meeting at Grind Coffee on 3rd Street - neutral ground, excellent espresso, and the acoustics actually work for real conversation.\n\nLooking forward to learning more about what you're building.\n\nBest regards,\nAlexandra Winters\nManaging Partner, Meridian Ventures\n\nP.S. - I notice your burn rate math. Eighteen months is conservative. Most founders I back are thinking bigger by month six.",
        "requires_response": true,
        "emotional_intent": "destabilize"
      },
      {
        "id": "newsletter_saas_weekly", 
        "sender": "SaaS Weekly Digest",
        "sender_company": "",
        "subject": "This Week: Angel funding hits 3-year low 📉",
        "body": "THE SAAS WEEKLY DIGEST\n\n🔥 HOT TAKE: Angel funding volume down 34% YoY as investors 'wait for better opportunities'\n\n💰 FUNDING ROUNDUP:\n• Slack competitor raises $15M Series A\n• Marketing automation startup shuts down after burning $8M\n• European B2B giant acquires 3 US startups\n\n📊 MARKET INSIGHT: Average angel check size now $125K (up from $89K last year)\n\n🎯 QUOTE OF THE WEEK: 'Revenue cures all wounds. But it has to be recurring revenue.' - Alexandra Winters, Meridian Ventures\n\nRead more at saasweekly.com",
        "requires_response": false,
        "emotional_intent": "inform"
      },
      {
        "id": "mom_business_meeting",
        "sender": "Mom", 
        "sender_company": "",
        "subject": "Business meeting?",
        "body": "Sweetie,\n\nI had coffee with Mrs. Chen today and she mentioned that sometimes business people meet in coffee shops now instead of offices? She says it's very modern.\n\nIf you have any important meetings coming up, remember to:\n- Wear your nice shirt (the blue one)\n- Order something other than just black coffee\n- Sit up straight\n- Don't forget to eat lunch\n\nI believe in you! Dad says to 'negotiate from a position of strength' whatever that means.\n\nLove,\nMom\n\nP.S. - How do you know if someone is a good 'investor'? Asking for a friend.",
        "requires_response": false,
        "emotional_intent": "encourage"
      }
    ]
  }
}
```

```json
{
  "gazette_headlines": {
    "day_4": {
      "digest_format": true,
      "title": "The Startup Gazette - Daily Brief", 
      "date": "Week 4",
      "stories": [
        {
          "headline": "Angel Investment Volume Plummets 34% as Market Tightens",
          "summary": "Fewer angels writing checks, but check sizes increasing. 'Quality over quantity,' says Meridian Ventures partner."
        },
        {
          "headline": "Coffee Shop Meetings Replace Traditional VC Offices", 
          "summary": "83% of seed-stage deals now negotiated in casual settings. Grind Coffee reports 400% increase in 'investor meetings.'"
        },
        {
          "headline": "B2B Productivity Space Sees Wave of Consolidation",
          "summary": "Three acquisitions announced this week alone. Industry analysts predict 'winner-take-most' market dynamics emerging."
        },
        {
          "headline": "Burn Rate Reality Check: Most Startups Underfunded by 40%",
          "summary": "New study reveals entrepreneurs consistently underestimate 18-month cash needs. 'Hope is not a financial strategy,' warns CFO advisory firm."
        }
      ]
    }
  }
}
```
