# IMPLEMENTATION_ORDER.md — Dark Horizons: Legends of Lost Kingdoms

> This document translates the World Bible into an engineering roadmap.
> It is ordered by dependency and impact, not by excitement.

---

## CURRENT STATE (AS OF WORLD BIBLE CREATION)

**Completed milestones:**
- M0: Foundation — Auth, PlayerContext, Firebase schema, shared types ✅
- M1: Dashboard — Lobby, stats display, "Enter World" button ✅
- M2: World Visual Upgrade — Terrain layers, animated water, bridges, lighting, walk animation ✅

**Current systems working:**
- Player position (x, y) updates in Firestore
- Zone detection via `isPointInZone()`
- 8 zones rendering on the world map
- Water system (waterfall, river, river bend, shorelines)
- Walking paths and decorative objects
- Ambient particles
- Player rank data model

**What exists but needs content:**
- The world map renders zones but most zones are empty of NPCs, encounters, and interactions
- The layer system exists but only `overworld` is meaningfully used

---

## PRINCIPLES FOR IMPLEMENTATION ORDER

1. **Systems before content.** Build the weather system before adding snow pets. Build the NPC framework before writing NPC dialogue.
2. **Player-visible progression first.** Features that advance rank and feel impactful come before ambient features (sound, collectibles).
3. **Never break existing functionality.** Every new feature goes into new components/files unless MASTER_PROJECT.md specifies an existing file.
4. **Design documents are not requirements.** The World Bible is the vision. The developer decides scope per milestone.

---

## MILESTONE 3 (M3) — NPC FRAMEWORK + FIRST NPCS

**Goal:** Players can talk to NPCs. The world feels inhabited.

**Priority order within M3:**

### Step 1: NPC Framework (System)
- `types/npc.ts`: NPC interface (id, name, position, schedule, dialogueTree, zoneId)
- `contexts/NPCContext.tsx`: NPC state management, current phase check for schedule
- `components/world/NPCSprite.tsx`: NPC rendering on the world map
- `components/ui/DialogueModal.tsx`: Dialogue UI (name, text, response options)

No dialogue content yet. Just the plumbing.

### Step 2: Aria Vayne (NPC 1)
- Position: Castle Gate (850, 340) approx
- Morning/Day/Evening schedule
- 5 dialogue trees: Greeting, Castle intro, World hint, Rank explanation, Farewell
- This validates the entire NPC framework

### Step 3: Day/Night Cycle (System)
- `contexts/TimeContext.tsx`: TimeState interface, cycle timer
- Phase calculation: `(Date.now() - cycleStartTimestamp) % CYCLE_DURATION_MS`
- CSS class on world container: `time-morning`, `time-day`, etc.
- Lighting overlay: The ambient overlay color changes with phase

**No music yet.** Time system only affects lighting and NPC visibility.

### Step 4: Remaining M3 NPCs
After Aria is working: add Cass Orin, Grend Voss, and Loryn Ashvale (the NPCs who have gameplay-essential roles in M4 content).

**M3 deliverable:** Players can walk to NPCs and talk to them. Time of day affects which NPCs are present. Loryn's notice board shows placeholder quest content.

---

## MILESTONE 4 (M4) — QUEST SYSTEM + PROGRESSION

**Goal:** Players have things to do. There are goals. The rank system advances.

**Priority order within M4:**

### Step 1: Quest Framework (System)
- `types/quest.ts`: Quest interface (id, title, description, objectives, rewards, prerequisiteRank)
- `contexts/QuestContext.tsx`: Active quest, completion tracking
- `lib/quests.ts`: Quest definitions

### Step 2: First Quest Arc (Aria's Tutorial)
3 quests from Aria that:
1. Walk the player to the Castle Town (learn movement)
2. Talk to Grend Voss (learn NPC interaction)
3. Find a hidden chest in the castle grounds (learn exploration)

### Step 3: Rank Progression
- Connect quest completion to rank advancement
- Rank unlock triggers: visual feedback, Elder Maerik acknowledgment
- Area unlocks: Mountain Zone and Cave unlock at Awesome rank (zone tiles change to accessible state)

### Step 4: Daily Quest System
- Loryn's notice board: 3 daily quests
- Reset at midnight (server time)
- Simple objectives: "Visit zone X", "Talk to NPC Y", "Walk N tiles"

**M4 deliverable:** New players have a guided first session. Existing players have daily goals. Rank progression works.

---

## MILESTONE 5 (M5) — PET ENCOUNTER SYSTEM

**Goal:** The core gameplay loop (walk → encounter → catch) works.

**Priority order within M5:**

### Step 1: Encounter Zone Framework (System)
- `types/encounter.ts`: EncounterZone interface, Pet encounter interface
- `lib/encounters.ts`: Encounter table definitions per zone
- `contexts/EncounterContext.tsx`: Active encounter state

### Step 2: Encounter Detection
- When player is in a designated encounter zone: 15% chance per second of encounter
- Dead-time prevention: If 5 minutes without encounter, boost rate temporarily

### Step 3: Battle + Catch UI
- `components/ui/EncounterModal.tsx`: Pet display, ball selection, catch attempt
- Catch formula implementation
- Success/fail animations

### Step 4: Pet Storage
- Connect to existing `pets` field in `users/{uid}`
- Pet box UI (view all caught pets)
- Active pet companion (follows the player on world map)

### Step 5: Dr. Mira Solaine (NPC 4)
- Position: River Town area (1180, 600) approx
- Encounter advice dialogues (time + weather tips)
- Pet appraisal (stat grade display)
- Quest: Bring 3 specimens she hasn't seen

### Step 6: First Biome Encounter Tables
Implement encounter tables for:
- Castle Grove (early-game, Common/Uncommon)
- Cave interior (mid-game, Common/Rare)

**M5 deliverable:** Players can catch pets. The core loop is playable.

---

## MILESTONE 6 (M6) — WEATHER SYSTEM

**Goal:** The world changes dynamically. Every play session is different.

**Priority order within M6:**

### Step 1: Weather Framework (System)
- `types/weather.ts`: WeatherType union, WeatherState interface
- Firestore: `world/weather` document (server authority)
- `contexts/WeatherContext.tsx`: Weather state consumer
- CSS class system on world container

### Step 2: First Weather States
Implement in priority order (gameplay impact first):
1. Clear (baseline — already implied by current state)
2. Rain (encounter boost, visible particles)
3. Storm (encounter boost, lightning flash)
4. Blood Moon (weekly event — most impactful, validates the system)

### Step 3: Remaining Weather States
After the four above are working:
5. Cloudy
6. Fog
7. Snow
8. Meteor Shower
9. Rainbow
10. Aurora

### Step 4: Weather × Encounter Integration
- Weather modifiers applied to encounter formula
- Weather-exclusive pet encounters enabled

### Step 5: Weather × Time Integration
- Blood Moon only at night (validation of the combined system)
- Aurora only at night (second validation)
- Rainbow only post-Rain (third validation)

**M6 deliverable:** Weather changes the world visually and mechanically. Blood Moon is the first scheduled world event.

---

## MILESTONE 7 (M7) — COMMERCE + CRAFTING

**Goal:** Zen Coins have uses. Mining has purpose. The economy works.

**Priority order within M7:**

### Step 1: Mining System (Full Implementation)
- Cave encounter zone: Mining nodes (Stone, Iron, Crystal, Mystic, Dark)
- Stamina system: 20 stamina, 3 nodes, 3-second cooldown
- Ore drop rates per GAME_RULES.md
- Connection to `ores` field in `users/{uid}`

### Step 2: Crafting Framework
- `types/crafting.ts`: Recipe interface
- `lib/recipes.ts`: Ball crafting recipes, armor recipes
- `components/ui/CraftingModal.tsx`: Recipe selection, material cost, craft result

### Step 3: Merchant Shop (Cass Orin)
- Shop modal from Cass dialogue
- First inventory: Navigation compass, fog lamp, bait bundles, mystery crate

### Step 4: Blacksmith Shop (Grend Voss)
- Armor crafting: First tier armor (ore cost)
- Equipment display on player sprite
- Armor stat bonuses

### Step 5: Zen Coin Sources
Ensure all primary Zen Coin earning methods are implemented:
- Quest completion rewards
- Mining (ore sell price)
- Daily chest finds
- Weather event bonuses

**M7 deliverable:** The economy is live. Mining → ore → crafting/selling → Zen Coins → shop items.

---

## MILESTONE 8 (M8) — SEA LAYERS + DUNGEONS

**Goal:** End-game content is reachable. The world has depth.

**Priority order within M8:**

### Step 1: Sea Layer Framework
- New layer type implementation: `sea-1`, `sea-2`, `sea-3`, `sea-beast`
- `components/world/SeaMap.tsx`: Sea layer rendering (different visual than overworld)
- Sea encounter tables (Sea 1 first)
- Tal Rensh (NPC 7): Port 1 location, voyage briefing

### Step 2: Sea 1 Content
- Encounter table: Sea 1 pets (Uncommon-Rare)
- Sea weather interactions
- Port 1 departure mechanic

### Step 3: Dungeon Framework
- New layer type: `dungeon-{string}`
- `components/world/DungeonMap.tsx`: Floor-based rendering
- Floor navigation (up/down stairs)
- Ravel Kost (NPC 5): Dungeon 1 entrance

### Step 4: Dungeon 1 Content
- Iron Vaults: 5 floors, Iron ore aesthetic
- Floor-specific encounter tables
- Boss encounter on Floor 5
- Dungeon loot (Zen Coins, dungeon relics)

### Step 5: Collectibles System (Foundation)
- `contexts/CollectiblesContext.tsx`: Track found collectibles per category
- Petra Vine (NPC 11): Collector's building
- First collectible categories: Hidden chests, relics
- Trophy Room in castle: Empty display cases ready

**M8 deliverable:** Players can sail seas and clear dungeons. Collectible system has foundation.

---

## MILESTONE 9 (M9) — ENDGAME + LORE CLIMAX

**Goal:** The story resolves. Players who have completed everything get an ending.

**Priority order within M9:**

### Step 1: Full Collectibles
- All 9 collectible categories implemented
- Elder Maerik's journal page system
- The 50th journal page event
- Kingdom Crests (all 5 locations)

### Step 2: Oath Stone Activation
- Crest placement interaction
- The world event when all 5 crests are placed
- Elder Maerik, Aria, Tal Rensh walkup animation

### Step 3: Remaining Dungeons
- Dungeon 2 (Crystal Labyrinth): 7 floors
- Dungeon 3 (Dark Citadel): 9 floors
- Ravel Kost full quest arc

### Step 4: The Throne Room
- Dark Horizon rank unlock
- Throne Room entry mechanic
- The ending sequence (developer determines specifics — design document intentionally leaves this open)

### Step 5: All Remaining NPCs
- Vira Coldstone (Arena Master)
- Jed Farren (Explorer, roaming)
- Elder Maerik full quest arc
- All NPC quest arcs completed

**M9 deliverable:** The game is completable. Players can achieve Dark Horizon rank and experience the story's conclusion.

---

## SYSTEM IMPLEMENTATION CHECKLIST

### Systems by milestone and file target:

| System | Milestone | Primary Files |
|---|---|---|
| NPC Framework | M3 | `types/npc.ts`, `contexts/NPCContext.tsx`, `components/world/NPCSprite.tsx` |
| Dialogue UI | M3 | `components/ui/DialogueModal.tsx` |
| Day/Night Cycle | M3 | `contexts/TimeContext.tsx`, CSS classes |
| Quest Framework | M4 | `types/quest.ts`, `contexts/QuestContext.tsx`, `lib/quests.ts` |
| Rank Progression UI | M4 | `components/ui/RankModal.tsx` |
| Encounter System | M5 | `types/encounter.ts`, `contexts/EncounterContext.tsx`, `lib/encounters.ts` |
| Catch UI | M5 | `components/ui/EncounterModal.tsx` |
| Pet Companion Sprite | M5 | `components/world/PetCompanion.tsx` |
| Weather System | M6 | `types/weather.ts`, `contexts/WeatherContext.tsx`, CSS classes |
| Weather Particles | M6 | `components/world/WeatherOverlay.tsx` |
| Mining System | M7 | `components/ui/MiningModal.tsx`, `lib/mining.ts` |
| Crafting System | M7 | `types/crafting.ts`, `lib/recipes.ts`, `components/ui/CraftingModal.tsx` |
| Shop UI | M7 | `components/ui/ShopModal.tsx` |
| Sea Layer | M8 | `components/world/SeaMap.tsx`, new Layer types |
| Dungeon Layer | M8 | `components/world/DungeonMap.tsx`, new Layer types |
| Collectibles System | M8 | `contexts/CollectiblesContext.tsx`, `components/ui/TrophyRoom.tsx` |
| Oath Stone | M9 | `components/world/OathStone.tsx`, Firestore world event |

---

## FILES NEVER TO MODIFY (from MASTER_PROJECT.md constraints)

These files are foundational. Changes require explicit developer decision:
- `contexts/PlayerContext.tsx` — Player auth and data model
- Firebase security rules
- `.env.local` — Environment secrets
- `lib/worldzones.ts` — Only add new zones; do not rename or remove existing zones

---

## WORLD ZONE ADDITIONS (ordered by milestone)

New zones should be added to `lib/worldzones.ts` in this order, confirming no coordinate conflicts with existing zones before each addition:

| Milestone | Zone | Coordinates (proposed) | ZoneType |
|---|---|---|---|
| M3 | River Town (Fisher's Rest) | x:1050, y:550, w:110, h:80 | `scenic` |
| M4 | North Forest Encounter | x:420, y:120, w:160, h:120 | `pets` |
| M5 | Pet Forest | x:100, y:850, w:130, h:100 | `pets` |
| M5 | Tall Grass Fields | x:1050, y:750, w:140, h:100 | `pets` |
| M6 | Mountain Zone | x:1600, y:150, w:200, h:250 | `mining` (scenic subtype) |
| M6 | Swamp | x:200, y:900, w:170, h:180 | `scenic` |
| M7 | Desert | x:1400, y:850, w:250, h:280 | `scenic` |
| M7 | Snow Biome | x:1400, y:100, w:250, h:250 | `scenic` |
| M8 | Port 1 (Sunrise Dock) | x:1900, y:500, w:100, h:100 | `scenic` |
| M8 | Dungeon 1 Entrance | x:1750, y:390, w:80, h:80 | `dungeon` |
| M9 | Port 2 (Midnight Harbour) | x:1900, y:950, w:100, h:100 | `scenic` |
| M9 | Dungeon 2 + 3 | x:1780, y:750 and x:750, y:1350 | `dungeon` |

---

*IMPLEMENTATION_ORDER.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
