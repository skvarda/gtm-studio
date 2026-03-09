<tool_call>
<tool_name>Read</tool_name>
<tool_input>{"path": "/home/gtm/saas-startup-simulator.html", "start": 1, "end": 100}</tool_input>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<tool_input>{"pattern": "dialogue|email|jordan|whiteboard|laptop", "path": "/home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<tool_input>{"pattern": "endDay|dayEnd|action.*point", "path": "/home/gtm/saas-startup-simulator.html"}</tool_input>
</tool_call>

Based on my analysis of the current game state and available story content, here's my **Scoped Integration Plan**:

## INTEGRATION SCOPE - ROUND 22

### 1. What Goes In (Priority Order)

1. **Jordan NPC Basic Interaction** - Position Jordan at (8,3) facing down with idle typing animation
2. **Core Dialogue System** - Implement basic dialogue UI and Jordan's 2 day-1 conversations 
3. **Laptop Dashboard Interaction** - Add laptop interactable with first-look dialogue
4. **Whiteboard Math Interaction** - Add whiteboard interactable with revenue math dialogue
5. **Email Inbox Foundation** - Basic email UI displaying Chad's competitive email and Mom's support email

### 2. What Gets Cut/Deferred

- **Gazette Headlines** - DEFERRED (requires separate news UI system, low priority for Day 1 gameplay)
- **Complex Email Response System** - CUT (emails marked as no response required)
- **Jordan Advanced AI Behaviors** - CUT (idle typing animation sufficient for this round)
- **Multi-day Dialogue Progression** - DEFERRED (focus on Day 1 content only)

### 3. Unresolved Cross-Department References

⚠️ **ART DEPENDENCY**: No sprites provided for Jordan NPC, laptop, or whiteboard - will use placeholder colored rectangles
⚠️ **DESIGN DEPENDENCY**: Action Point costs not specified for interactions - defaulting to 0 AP for dialogue, 1 AP for laptop/whiteboard

### 4. The ONE Thing This Integration MUST Accomplish

**Establish the core interaction loop**: Player can walk to NPCs/objects, trigger dialogue with choices, and feel the weight of starting a company through Jordan's anxiety and the stark dashboard numbers.

This creates the foundation emotional experience while keeping scope tight enough to ship a working Day 1 experience.

Ready to implement. Shall I proceed with integration?
