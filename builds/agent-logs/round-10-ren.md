Let me check the current state of the main build to understand what's implemented.

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<path>/home/gtm/saas-startup-simulator.html</path>
<start_line>1</start_line>
<end_line>100</end_line>
</parameters>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<parameters>
<path>/home/gtm/saas-startup-simulator.html</path>
<pattern>// === SYSTEMS|function.*\(|class.*\{</pattern>
</parameters>
</tool_call>

<tool_call>
<tool_name>Grep</tool_name>
<parameters>
<path>/home/gtm/saas-startup-simulator.html</path>
<pattern>dialogue|email|jordan|laptop|whiteboard</pattern>
</parameters>
</tool_call>

## SCOPED INTEGRATION PLAN - Round 24

### 1. WHAT GOES IN (Priority Order)

**Phase 1 - Critical Path to Playable Demo**
1. **Character Creation Screen** - Player selects role (seller/dev/marketer) to unlock basic gameplay
2. **Apartment Scene Rendering** - Basic tile-based apartment with Jordan NPC positioned at (8,3)
3. **Core Interaction System** - Click-to-interact with laptop, whiteboard, Jordan
4. **Basic Dialogue Framework** - Simple text display + response selection for Jordan conversations

**Phase 2 - Content Integration**  
5. **Day 1 Laptop Interaction** - Dashboard dialogue from story state
6. **Day 1 Whiteboard Interaction** - Revenue math dialogue from story state
7. **Day 1 Jordan Conversations** - Both email reaction and customer anxiety dialogues

### 2. WHAT GETS CUT/DEFERRED

**DEFERRED - Too Complex for Integration Round:**
- **Email System** - Complex UI system, no visual mockups available
- **Gazette Headlines** - Secondary content system, not core gameplay  
- **Multiple Dialogue Triggers** - "walk_past" vs "interact" complexity
- **Player Response Effects** - Relationship system not yet implemented

**DEFERRED - Missing Dependencies:**
- **All Art Assets** - Art state shows empty, need placeholder sprites
- **Advanced NPC Behaviors** - "typing_with_occasional_pause" needs animation system
- **Action Point Consumption** - Core systems not ready for resource management

### 3. UNRESOLVED CROSS-DEPARTMENT REFERENCES

⚠️ **ART BLOCKERS:**
- Jordan NPC sprite (using placeholder colored rectangle)
- Apartment tileset (using colored grid)
- Laptop/whiteboard interactable sprites (using colored squares)

⚠️ **SYSTEMS GAPS:**
- No canvas rendering system implemented yet
- No tile movement system for player navigation  
- No asset preloader for future sprite integration

### 4. THE ONE THING THIS INTEGRATION MUST ACCOMPLISH

**Enable the Character Creation → Apartment → First Interaction gameplay loop.**

Player must be able to:
1. Select a role and enter the game
2. See the apartment environment with Jordan
3. Click on at least ONE interactable (laptop) and get dialogue
4. End the interaction and return to apartment view

This creates the foundational interaction pattern for all future content while proving the core game loop works.

---

**INTEGRATION SCOPE: 4 hours max. Ship a playable character creation + basic apartment interaction, defer everything that requires new systems or missing art assets.**
