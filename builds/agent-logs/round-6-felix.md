# Design Spec: Day 1 Character Creation & Apartment Setup

## Overview
Day 1 is character creation + world introduction, not a full day cycle. Player selects role, explores apartment, checks first emails, and prepares for Day 2 when the real gameplay begins.

## Role Selection & Modifiers

### Role Options & Identity
```json
{
  "roles": {
    "seller": {
      "display_name": "Sales Leader",
      "description": "You close deals and talk to customers",
      "personality": "Confident, people-focused, revenue-driven"
    },
    "dev": {
      "display_name": "Technical Founder", 
      "description": "You build the product and handle the code",
      "personality": "Analytical, detail-oriented, product-focused"
    },
    "marketer": {
      "display_name": "Growth Hacker",
      "description": "You drive awareness and user acquisition", 
      "personality": "Creative, data-driven, experiment-happy"
    }
  }
}
```

### AP Cost Modifiers (For Future Days)
```json
{
  "role_modifiers": {
    "seller": {
      "sales_calls": 1,
      "customer_support": 1,
      "networking": 1,
      "coding": -1,
      "content_creation": -1,
      "product_design": -1
    },
    "dev": {
      "coding": 1,
      "product_design": 1,
      "technical_research": 1,
      "sales_calls": -1,
      "marketing_campaigns": -1,
      "networking": -1
    },
    "marketer": {
      "content_creation": 1,
      "marketing_campaigns": 1,
      "social_media": 1,
      "coding": -1,
      "sales_calls": -1,
      "technical_research": -1
    }
  }
}
```

## Interaction Flows

### Jordan Role Selection Flow
**Trigger:** Player talks to Jordan for the first time
**Dependencies:** `dialogue_system` (not implemented)

```json
{
  "jordan_role_selection": {
    "initial_dialogue": "Hey! Ready to make this official? I've been thinking about our roles. What feels right to you?",
    "role_prompts": {
      "seller": "\"I want to focus on customers and revenue.\"",
      "dev": "\"I want to build the best product possible.\"", 
      "marketer": "\"I want to grow our user base and brand.\""
    },
    "confirmation_dialogue": {
      "seller": "Perfect! You'll handle sales and customer relationships. I'll focus on operations and strategy.",
      "dev": "Great choice! You focus on the technical vision, I'll handle the business side.",
      "marketer": "Awesome! You drive growth and awareness, I'll manage everything else."
    },
    "post_selection": "Alright, we're official co-founders now. Check the laptop for our first emails!"
  }
}
```

### Laptop Interaction Flow
**Trigger:** Player interacts with laptop
**Dependencies:** `email_inbox`, `pixel_font_renderer`

**Pre-Role Selection:** "Set up your role with Jordan first"
**Post-Role Selection:** Opens email inbox with 3 messages

### Whiteboard Interaction Flow  
**Trigger:** Player interacts with whiteboard
**Dependencies:** `dialogue_system`

```json
{
  "whiteboard_interactions": {
    "pre_role": "Empty whiteboard. Time to fill it with ideas.",
    "post_role": {
      "seller": "Jordan's notes: 'Target market: B2B SaaS, $49-999 MRR, focus on SMBs'",
      "dev": "Jordan's notes: 'Tech stack: React/Node, mobile-first, 99.9% uptime'", 
      "marketer": "Jordan's notes: 'Growth channels: Content, SEO, partnerships, viral loops'"
    }
  }
}
```

## Email Inbox Content

### Day 1 Email Messages
```json
{
  "day1_emails": [
    {
      "id": "david_chen_intro",
      "sender": "David Chen <david@angelcorp.vc>",
      "subject": "Welcome to the journey!",
      "body": "Congrats on getting started! Remember, we believe in your vision. Monthly check-ins start next week. Make us proud! - David\n\nP.S. My daughter Maya just graduated from Stanford CS. She might be interested in joining you soon.",
      "timestamp": "Day 1, 9:15 AM"
    },
    {
      "id": "rebecca_martinez_legal",
      "sender": "Rebecca Martinez <rbecca@startuplegal.com>",
      "subject": "Incorporation docs ready",
      "body": "Your Delaware C-Corp is officially filed! Stock certificates attached. 70/30 split as discussed, with 20% equity pool for employees. Invoice for $2,500 legal fees attached.\n\nNext: Set up your cap table and employee agreements.\n- Rebecca",
      "timestamp": "Day 1, 10:22 AM"
    },
    {
      "id": "chad_introduction", 
      "sender": "Chad Thunderpitch <chad@disruptivelabs.io>",
      "subject": "Heard about your little project 😎",
      "body": "Word travels fast in the Valley! Heard you got some angel money. Cute! \n\nJust launched DisruptiveLabs with $2M seed. We're building the FUTURE of SaaS. Maybe we can grab coffee sometime and I can show you how it's done.\n\nStay scrappy! 🚀\n- Chad\n\nP.S. Hope you're not in our space. That would be... awkward.",
      "timestamp": "Day 1, 11:45 AM"
    }
  ]
}
```

### Startup Gazette Headlines
```json
{
  "startup_gazette_day1": {
    "headline": "Angel Funding Reaches Record $2.1B in Q1",
    "articles": [
      "• TechCrunch acquired by Amazon for $1.2B",
      "• New Y Combinator batch features 127 startups",  
      "• Remote work tools see 300% growth year-over-year",
      "• Venture capital firms launch 15 new funds this month",
      "• SaaS valuations hit all-time highs amid digital transformation"
    ],
    "weather": "Partly cloudy with a chance of disruption. High: 72°F",
    "inspirational_quote": "\"The best time to plant a tree was 20 years ago. The second best time is now.\" - Ancient startup proverb"
  }
}
```

## NPC Behavior Rules

### Jordan
```json
{
  "jordan_behavior": {
    "default_position": {"x": 6, "y": 4},
    "sprite_state": "npc_jordan_idle",
    "dialogue_triggers": {
      "first_interaction": "role_selection_flow",
      "post_role_selection": "encouragement_pool",
      "laptop_reminder": "Check those emails! Our investors are already reaching out."
    },
    "movement_pattern": "stationary",
    "facing_direction": "south"
  }
}
```

## Economy State

### Day 1 Numbers
- **Cash:** $150,000 (unchanged, no expenses yet)
- **Monthly Burn:** $0 (no employees, no office)
- **MRR:** $0 
- **Legal Fees:** $2,500 (paid from angel funding)
- **Runway:** Undefined until burn rate established

### Starting Expenses
```json
{
  "day1_expenses": {
    "legal_incorporation": 2500,
    "remaining_cash": 147500,
    "note": "Incorporation fee paid immediately, reflected in cash"
  }
}
```

## New Game State Entries

### Required Additions
```json
{
  "player_additions": {
    "name": "Co-Founder", 
    "role": "selected_during_day1"
  },
  "game_state_additions": {
    "email_inbox": {
      "unread_count": 3,
      "messages": "day1_emails_array"
    },
    "tutorial_flags": {
      "role_selected": false,
      "laptop_checked": false,
      "whiteboard_viewed": false
    },
    "day1_complete": false
  }
}
```

## Dependencies & System Requirements

### Critical Dependencies
- **dialogue_system:** Role selection, NPC interactions, whiteboard text
- **email_inbox:** Laptop interaction, message display  
- **pixel_font_renderer:** Email text, dialogue text
- **canvas_rendering:** Basic apartment display
- **npc_interaction:** Jordan dialogue triggers

### This Sprint Implementation
Focus on role selection flow and basic interactions. Email system can be placeholder text until inbox UI is built.

### Success Criteria
- Player completes role selection
- Basic apartment exploration works
- Jordan provides role-appropriate feedback  
- Emails accessible via laptop (even if UI is basic)
- Game state ready for Day 2 transition

**Economy Balance Check:** ✅ $147.5K remaining after incorporation provides solid runway for early hiring and operations.
