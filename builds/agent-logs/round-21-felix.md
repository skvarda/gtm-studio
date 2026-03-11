# Design Spec: Days 2-3 Content
**SaaS Quest: Startup Simulator**  
**Round Priority:** days_2_3_content  
**Designer:** Felix Park  
**Target:** Story content for game days 2-3

---

## 1. Mechanical Definitions

### Action Point Economy (Days 2-3)

```json
{
  "daily_ap": 5,
  "activity_costs": {
    "laptop_work": {
      "base_cost": 2,
      "role_modifiers": {
        "dev": -1,
        "seller": +1, 
        "marketer": 0
      },
      "description": "Coding, planning, technical work"
    },
    "whiteboard_planning": {
      "base_cost": 1,
      "role_modifiers": {
        "dev": 0,
        "seller": 0,
        "marketer": 0
      },
      "description": "Strategic planning, brainstorming"
    },
    "jordan_conversation": {
      "base_cost": 0,
      "role_modifiers": {
        "dev": 0,
        "seller": 0,
        "marketer": 0
      },
      "description": "Free relationship building"
    },
    "email_check": {
      "base_cost": 0,
      "role_modifiers": {
        "dev": 0,
        "seller": 0,
        "marketer": 0
      },
      "description": "Quick email review, part of laptop work"
    }
  }
}
```

### Economy Progression (Days 2-3)

```json
{
  "day_2": {
    "starting_cash": 150000,
    "daily_burn": 0,
    "monthly_burn_base": 2000,
    "mrr": 0,
    "runway_months": 75,
    "burn_anxiety_level": "low"
  },
  "day_3": {
    "starting_cash": 150000,
    "daily_burn": 0,
    "monthly_burn_base": 2000,
    "mrr": 0,
    "runway_months": 75,
    "burn_anxiety_level": "medium",
    "new_concepts_introduced": ["burn_rate_dashboard", "runway_calculation"]
  }
}
```

### Relationship & Mystery Tracking

```json
{
  "jordan_relationship": {
    "starting_level": 0,
    "day_2_target": 2,
    "day_3_target": 4,
    "mystery_arc_progress": {
      "day_2": "hint_1_dropped",
      "day_3": "hint_2_dropped", 
      "cryptic_level": "subtle"
    }
  }
}
```

---

## 2. Interaction Flows

### Jordan Interaction Flow

```
Player walks within 1 tile of Jordan
↓
Auto-trigger contextual dialogue (no AP cost)
  - Morning: "How's the energy today?"
  - Afternoon: "Making progress on that thing?"
  - Evening: "Day's almost over. Feeling it?"
↓
Player can choose to continue conversation
  - "Yeah, let's chat" → Opens conversation menu
  - "Just passing by" → End interaction
↓
Conversation Menu (2-3 options per day):
  Day 2: ["About the product", "About money", "About you"]
  Day 3: ["Burn rate worry", "Chad's email", "What aren't you telling me?"]
↓
Each conversation choice affects relationship (+1) and mystery progress
```

### Laptop Interaction Flow

```
Player walks to laptop position
↓
Interaction prompt: "Use laptop? (Costs AP based on role)"
↓
Laptop Menu:
  - Check Email (Free, part of session)
  - Dashboard (Free, part of session) 
  - Code/Plan (2 AP, role modified)
  - Research Competition (1 AP)
↓
Email shows:
  Day 2: Chad follow-up, 1 venture email
  Day 3: Chad escalation, burn rate reminder from bank
↓
Dashboard shows:
  Day 2: Basic metrics (all zeros, but structure visible)
  Day 3: Burn rate calculation, runway timer introduced
```

### Whiteboard Interaction Flow

```
Player walks to whiteboard
↓
Interaction prompt: "Use whiteboard? (1 AP)"
↓
Planning Interface:
  - Review startup vision
  - Plan next steps
  - Worry about competition (Day 3)
↓
Provides mental clarity buff: +1 to next laptop session effectiveness
```

---

## 3. NPC Behavior Rules

### Jordan Positioning & Animation

```json
{
  "jordan_behavior": {
    "default_position": [8, 3],
    "facing_direction": "down",
    "animation_state": "typing",
    "movement_pattern": "stationary",
    "interaction_radius": 1,
    "availability": {
      "morning": "always",
      "afternoon": "always", 
      "evening": "always"
    }
  }
}
```

### Jordan Dialogue Rules

**Day 2 Dialogue Pool:**
```json
{
  "day_2_conversations": {
    "about_product": {
      "trigger": "player_choice",
      "relationship_effect": +1,
      "mystery_hint": "subtle_doubt",
      "sample_line": "You know what you're building, right? Sometimes the obvious thing isn't the right thing."
    },
    "about_money": {
      "trigger": "player_choice", 
      "relationship_effect": +1,
      "mystery_hint": "financial_awareness",
      "sample_line": "150k sounds like a lot until you realize what runway actually means. Good thing we're... careful."
    },
    "about_you": {
      "trigger": "player_choice",
      "relationship_effect": +1, 
      "mystery_hint": "background_mystery",
      "sample_line": "Me? I'm just here to help. Like I always am. Like I always have been."
    }
  }
}
```

**Day 3 Dialogue Pool:**
```json
{
  "day_3_conversations": {
    "burn_rate_worry": {
      "trigger": "after_dashboard_view",
      "relationship_effect": +1,
      "mystery_hint": "inside_knowledge", 
      "sample_line": "2k a month isn't much. Unless you know what I know about what's coming."
    },
    "chad_email": {
      "trigger": "after_email_check",
      "relationship_effect": +1,
      "mystery_hint": "competitor_knowledge",
      "sample_line": "Chad's company... interesting approach. Reminds me of something I've seen before."
    },
    "what_arent_you_telling_me": {
      "trigger": "player_choice",
      "relationship_effect": +2,
      "mystery_hint": "direct_deflection",
      "sample_line": "What makes you think I'm not telling you something? I'm here, aren't I? Just like we planned."
    }
  }
}
```

---

## 4. New Game State Entries

### Extended Player State

```json
{
  "player_state_additions": {
    "burn_rate_awareness": 0,
    "chad_threat_level": 1,
    "jordan_suspicion": 0,
    "daily_stress_level": "low"
  }
}
```

### Jordan NPC Extensions

```json
{
  "jordan_extensions": {
    "mystery_arc": {
      "current_phase": "subtle_hints",
      "hints_revealed": [],
      "relationship_gates": {
        "2": "unlock_financial_conversation",
        "4": "unlock_background_questions",
        "6": "unlock_direct_confrontation"
      }
    },
    "dialogue_state": {
      "conversations_had_today": [],
      "topics_unlocked": [],
      "cryptic_responses_given": 0
    }
  }
}
```

### Email System State

```json
{
  "email_inbox": {
    "day_2_emails": [
      {
        "sender": "Chad Thunderpitch",
        "sender_company": "CompeteSync", 
        "subject": "Following up on our chat",
        "content": "Hope you're settling in well! Just curious - what vertical are you targeting first? Always looking to compare notes with fellow entrepreneurs.",
        "threat_level": "low",
        "hidden_intent": "intelligence_gathering"
      }
    ],
    "day_3_emails": [
      {
        "sender": "Chad Thunderpitch",
        "sender_company": "CompeteSync",
        "subject": "Market research opportunity", 
        "content": "Hey! My team's doing some market analysis. Mind if I send over a quick survey? Always good to understand what other startups are prioritizing.",
        "threat_level": "medium",
        "hidden_intent": "competitive_intelligence"
      },
      {
        "sender": "Silicon Valley Bank",
        "sender_company": "SVB",
        "subject": "Account activity reminder",
        "content": "Just a friendly reminder that your startup account shows $150k balance with current monthly expenses of ~$2k. Need help with cash flow planning?",
        "threat_level": "none",
        "purpose": "burn_rate_anxiety_trigger"
      }
    ]
  }
}
```

### Dashboard Metrics (Day 3 Introduction)

```json
{
  "dashboard_metrics": {
    "day_3_new_sections": {
      "burn_rate_tracker": {
        "monthly_burn": 2000,
        "runway_months": 75,
        "cash_remaining": 150000,
        "anxiety_trigger": true
      },
      "competition_watch": {
        "chad_company_activity": "medium",
        "market_movement": "active", 
        "threat_assessment": "monitor"
      }
    }
  }
}
```

---

## 5. System Dependencies

**Required for Implementation:**
- ✅ **NPC Dialogue System** - Core for Jordan interactions
- ✅ **Email Inbox System** - Chad escalation requires email functionality  
- ✅ **Dashboard UI System** - Burn rate anxiety needs dashboard display
- ✅ **AP Tracking System** - All activities require AP management
- ✅ **Relationship Tracking** - Jordan mystery arc needs relationship states

**Nice to Have (can work around):**
- ❓ **Buff/Debuff System** - For whiteboard mental clarity bonus
- ❓ **Notification System** - For new email alerts
- ❓ **Animation System** - Enhanced Jordan typing animation

---

## 6. Success Metrics

Content succeeds if by end of Day 3:
1. **Burn Rate Anxiety**: Player has seen runway calculation and feels time pressure
2. **Jordan Mystery**: Player has 2+ mystery hints and questions Jordan's transparency  
3. **Chad Threat**: Player views Chad as competitive intelligence gatherer, not friendly peer
4. **AP Economy**: Player feels meaningful choices about how to spend daily AP
5. **Relationship Depth**: Jordan feels like real character with hidden depths, not exposition NPC

**Failure State:** If player still feels "everything's fine, no pressure" after Day 3, tension building has failed.
