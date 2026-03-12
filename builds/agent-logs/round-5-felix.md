# Design Spec: Day 1 Character Creation & Apartment Content

## Overview
This spec covers the character creation flow and initial apartment interactions for Day 1. The player starts in their cramped apartment with co-founder Jordan, must establish their role through natural dialogue, and explore their home base before the real work begins.

## Role System Definition

### Role Selection Mechanics
```json
{
  "role_selection": {
    "trigger": "first_jordan_interaction",
    "method": "dialogue_choice",
    "roles": {
      "seller": {
        "display_name": "The Closer",
        "description": "You live for the pitch, the demo, the handshake deal",
        "ap_modifiers": {
          "customer_outreach": -1,
          "sales_activities": -1,
          "development_tasks": +1,
          "marketing_campaigns": 0
        },
        "starting_stats": {
          "charisma": 8,
          "technical": 4,
          "creativity": 6
        }
      },
      "dev": {
        "display_name": "The Builder", 
        "description": "Code is poetry, bugs are blasphemy, ship fast and break things",
        "ap_modifiers": {
          "development_tasks": -1,
          "technical_research": -1,
          "customer_outreach": +1,
          "marketing_campaigns": +1
        },
        "starting_stats": {
          "technical": 9,
          "charisma": 4,
          "creativity": 6
        }
      },
      "marketer": {
        "display_name": "The Storyteller",
        "description": "Every feature needs a narrative, every user needs a journey",
        "ap_modifiers": {
          "marketing_campaigns": -1,
          "content_creation": -1,
          "development_tasks": +1,
          "customer_outreach": 0
        },
        "starting_stats": {
          "creativity": 8,
          "charisma": 7,
          "technical": 4
        }
      }
    }
  }
}
```

## Action Point System

### Day 1 AP Costs
```json
{
  "day1_activities": {
    "talk_to_jordan": {
      "base_cost": 0,
      "description": "Free conversation with co-founder"
    },
    "laptop_work_session": {
      "base_cost": 2,
      "role_modified": true,
      "description": "Deep work on the product",
      "outcomes": {
        "seller": "Customer research and outreach prep",
        "dev": "Core feature development",
        "marketer": "Brand and messaging foundation"
      }
    },
    "whiteboard_planning": {
      "base_cost": 1,
      "role_modified": false,
      "description": "Strategic planning and roadmap work"
    },
    "apartment_exploration": {
      "base_cost": 0,
      "description": "Getting familiar with your space"
    }
  }
}
```

## NPC Behavior: Jordan

### Position and Movement
```json
{
  "jordan_behavior": {
    "starting_position": {"x": 8, "y": 3},
    "facing": "down",
    "movement_pattern": "stationary_with_fidgets",
    "fidget_actions": [
      "typing_burst_3_seconds",
      "pause_and_think_2_seconds",
      "look_around_briefly",
      "stretch_and_return"
    ],
    "fidget_interval": "15-25_seconds"
  }
}
```

### Dialogue System
```json
{
  "jordan_dialogue": {
    "initial_interaction": {
      "trigger": "first_player_approach",
      "leads_to": "role_selection_conversation"
    },
    "role_selection_conversation": {
      "opener": "Been thinking about yesterday's conversation... we never really nailed down who's handling what. I mean, we both know I'm the numbers and systems person, but you... *looks up from laptop* You've got that hunger. Question is - what kind?",
      "choice_prompts": {
        "seller": "I want to be out there, talking to people, closing deals.",
        "dev": "I want to build. The product is everything.",
        "marketer": "I want to tell our story, create the narrative."
      },
      "responses": {
        "seller": "I figured. You've got that 'always be closing' energy. Good - someone needs to get us customers while I keep the lights on and the servers running. *grins* Don't promise features I can't build, yeah?",
        "dev": "Makes sense. You and code, it's like... *waves hand vaguely* ...a thing. Cool. I'll handle the business side - fundraising, operations, making sure we don't go broke. Just remember we need customers eventually, not just perfect code.",
        "marketer": "That's... actually perfect. I'm good with spreadsheets and infrastructure, but making people *care*? That's your magic. *taps laptop screen* I've got user analytics that need stories attached to them."
      }
    },
    "post_selection_dialogue": {
      "general": "So... first official day. Scary and exciting, right? *gestures around apartment* Not exactly Google's campus, but it's ours.",
      "follow_ups": [
        "Been sketching out some ideas on the whiteboard if you want to check it out.",
        "Laptop's all set up with our development environment. Ready when you are.", 
        "Coffee's fresh if you need fuel. We're gonna need it."
      ]
    }
  }
}
```

## Interactable Objects

### Laptop Station
```json
{
  "laptop_interaction": {
    "position": {"x": 6, "y": 4},
    "ap_cost": 2,
    "role_modified": true,
    "interaction_text": {
      "seller": "Time to dive into customer research. Who are we building for, and how do we reach them?",
      "dev": "The core product won't build itself. Let's get our hands dirty with some real code.",
      "marketer": "Brand identity, messaging, positioning - let's figure out how to tell our story."
    },
    "outcomes": {
      "seller": {
        "immediate": "Customer persona research complete",
        "stat_gain": "+1 charisma",
        "unlocks": "customer_outreach_day2"
      },
      "dev": {
        "immediate": "MVP feature framework established", 
        "stat_gain": "+1 technical",
        "unlocks": "feature_development_day2"
      },
      "marketer": {
        "immediate": "Brand foundation and messaging doc",
        "stat_gain": "+1 creativity", 
        "unlocks": "content_strategy_day2"
      }
    }
  }
}
```

### Whiteboard Station  
```json
{
  "whiteboard_interaction": {
    "position": {"x": 10, "y": 6},
    "ap_cost": 1,
    "role_modified": false,
    "interaction_text": "The whiteboard is covered in Jordan's neat handwriting - user flow diagrams, revenue projections, and a few question marks. Time to add your perspective.",
    "outcome": {
      "immediate": "Strategic roadmap session complete",
      "effect": "Unlocks day 2 planning decisions",
      "jordan_response": "Nice additions. We're starting to think like a real company."
    }
  }
}
```

## Game State Updates Required

### New Game State Entries
```json
{
  "player_additions": {
    "role": "string - set during character creation",
    "name": "string - always 'The Player' for now", 
    "stats": {
      "charisma": "number - social/sales effectiveness",
      "technical": "number - development/product capability", 
      "creativity": "number - marketing/innovation power"
    },
    "position": {
      "location": "apartment",
      "x": 5,
      "y": 5
    }
  },
  "jordan_additions": {
    "dialogue_state": "string - tracks conversation progress",
    "last_fidget_time": "timestamp",
    "role_reaction_given": "boolean - prevents dialogue loops"
  },
  "apartment_additions": {
    "laptop_used_today": "boolean",
    "whiteboard_used_today": "boolean", 
    "character_creation_complete": "boolean"
  }
}
```

## System Dependencies

⚠️ **Critical Dependencies** (must be implemented this sprint):
- `dialogue_system` - Core NPC conversation mechanics
- `canvas_rendering` - Visual display of apartment and characters
- `tile_movement` - Player navigation in apartment
- `npc_interaction` - Jordan's fidget behaviors and responses

⚠️ **Future Dependencies** (flag for later sprints):
- `email_inbox` - Day 2 customer outreach unlocks
- `hiring_system` - Future employee recruitment
- `location_transitions` - Moving beyond apartment

## Economy Balance Check

### Day 1 Financial Impact
```json
{
  "day1_economics": {
    "starting_cash": 150000,
    "daily_burn": 0,
    "revenue": 0,
    "notes": "No cash flow impact on Day 1 - pure character setup",
    "runway_effect": "No change to runway calculation"
  }
}
```

## Success Metrics

Player should complete Day 1 with:
- Role selected and understood
- 3-5 AP spent on meaningful activities
- Jordan relationship established (dialogue_state: "post_character_creation")
- Clear sense of daily rhythm and apartment as home base
- Excited anticipation for Day 2 expanded activities

The tone should hit Luna's target: "The Beginning of Something" - oriented, connected, motivated, and grounded.
