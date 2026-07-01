# FUTURE_EXPANSIONS.md — Dark Horizons: Legends of Lost Kingdoms

> This document captures what the world could become — not what it will be.
> Every idea here is a possibility. The developer decides which possibilities become real.

---

## EXPANSION PHILOSOPHY

Dark Horizons is designed to grow. The current world (2200×1500 world map) is the foundation, but the game's architecture should never close a door on future expansion. The milestone system (M0–M9) covers the initial game. Expansions listed here are post-M9 content — optional, additive, and designed to not require changes to the foundational architecture.

**Expansion criteria:**
1. Must be reachable by walking from the existing world (world-first architecture)
2. Must introduce new player progression without invalidating existing progression
3. Must add to the lore without contradicting it
4. Must be implementable without modifying the foundational systems (Auth, PlayerContext, Firebase schema)

---

## EXPANSION 1 — THE SKY ARCHIPELAGO

**Concept:** An island chain accessible by air. Players with a flying mount (or a specific pet in their party) can lift off from the Mountain Zone's highest peak and reach a cluster of floating islands.

**World connection:** The Sky Archipelago is visible as distant shapes in the clouds from the Mountain Zone summit (LANDMARK #50 area). Players can see it before they can reach it. This creates goal-visibility — the player knows it's there.

**New content:**
- 5 floating islands, each with unique terrain (crystal, cloud-stuff, ancient ruins, living garden, void edge)
- 10 sky-exclusive pet species
- New ore type: Sky Crystal (lightest ore, extremely rare, floats)
- New weather condition: Sky Storm (specific to Archipelago — doesn't affect overworld)
- 3 new NPCs: The Cloudkeeper, The Sky Scholar, The Lost Balloonist
- New dungeon: The Sky Tower (vertical dungeon — going up instead of down)

**World map change:** A region of the map north of the Snow Biome becomes accessible (currently reserved in the zone layout).

**Lore connection:** The Sky Archipelago is what's left of Aethermount — their city was carried upward during the Dark Horizon event. The Aethermount scholars are still up there. They've been waiting.

---

## EXPANSION 2 — MULTIPLAYER WORLD (M10)

**Concept:** Other players appear on the shared world map. This is the biggest single expansion.

**Architecture requirements:**
- Real-time Firestore listener for other player positions
- Player position updates (throttled — not real-time, 2-second intervals)
- Ghost-mode for approaching players (fade in when close)
- Player name display
- Zone capacity limit (max 20 players per zone area — prevents overcrowding)

**New content:**
- Player profile viewing (inspect another player's stats)
- Trading system (pet and item trades)
- World Boss events (see WORLD_EVENTS.md Tier 5)
- The Titan's Arena (multiplayer raid — see CASTLE_DESIGN.md and WORLD_EVENTS.md)
- Guild system (groups of up to 20 players)
- Cooperative quests (Loryn has a new tab: "Party Quests")

**Coordinates reserved (from WORLD_MASTER_PLAN.md):**
Guild Hall: (940, 420) | Player Housing: (480, 200)–(680, 400) | Trading Post: (840, 480)

**Lore connection:** The world has been getting less empty. Other people found their way to the castle. The NPCs acknowledge this — Loryn has been preparing the Party Quest board for a long time.

---

## EXPANSION 3 — THE NORTHERN TERRITORIES

**Concept:** Beyond the Snow Biome's current boundary, the world continues north. An expedition mechanic opens previously inaccessible territory.

**World connection:** At the northernmost point of the Snow Biome, there's a mountain pass (Landmark: The Frosted Gate) that appears permanently blocked by an ice formation. At Over Heavens rank, Grend Voss offers to forge an instrument capable of shattering the ice.

**New content:**
- 3 new zones: The Tundra Wastes, The Deep Glacier, The Pale Fortress (Celestis ruins)
- Ice dungeon: The Pale Fortress (Dungeon 4)
- 8 new ice-type pet species (Legendary-tier minimum encounter rate)
- New crafting tier: Pale Iron (stronger than Dark Ore for specific uses)
- NPC: The Last Celestian (not human — something older, preserved in ice)
- Collectible: The Celestis Chronicle (50-page book written before the Dark Horizon event)

**Lore connection:** Celestis was the kingdom closest to whatever caused the Dark Horizon event. The Pale Fortress holds the answer to what actually happened — Elder Maerik has been looking for this location for 40 years.

---

## EXPANSION 4 — THE DEEP SEAS (Beast Sea Content)

**Concept:** The Beast Sea, currently the most dangerous sea layer, becomes fully playable content with an underwater exploration mechanic.

**World connection:** Tal Rensh, after completing her questline, reveals that there is a way to descend into the Beast Sea — not on a ship, but with a specific piece of equipment (the Submersible Pearl, found in the Beast Sea's coastal ruins).

**New content:**
- Underwater layer (new Layer type: "deep-sea")
- 5 underwater zones (coral, trench, ancient ruin, bioluminescent field, the pit)
- 15 deep-sea exclusive pet species (all Epic or Legendary)
- New resource: Abyss Ore (not for standard crafting — used only for deep-sea specific items)
- NPC: The Oracle of the Deep (not a person — a pet that is very old and communicates in patterns)
- Dungeon: The Sunken Archive of Solara (Dungeon 5) — Solara's entire library sank during the Dark Horizon event

**Lore connection:** The Sunken Archive contains the Solaran perspective on the Dark Horizon event — the only kingdom that saw it coming. Cass Orin was trying to find this. He knew.

---

## EXPANSION 5 — PLAYER HOUSING

**Concept:** Players can claim and customize a home in the world.

**World connection:** The area west of the Castle Town (currently a "residential quarter" visual element) has empty buildings with "Available" signs. After completing a certain number of quests, Loryn offers the player ownership of one.

**Coordinates reserved:** (480, 200)–(680, 400) per WORLD_MASTER_PLAN.md

**New content:**
- 3 home sizes (1-room, 3-room, 6-room)
- Furniture crafting system (uses ores and collected materials)
- Home collectible display (subset of Trophy Room — personal version)
- Pet habitat (some pets prefer to live at home rather than follow)
- Visitor mechanic (other players can visit homes in Expansion 2 world)
- Home portal: Fast-travel to any previously visited Waystone

**Lore connection:** The residential quarter has been empty since the Dark Horizon event. The previous owners left notes on their doors. The notes are collectibles.

---

## EXPANSION 6 — THE DARK HORIZON (Endgame)

**Concept:** The player can finally travel to the eastern horizon — the Dark Horizon itself.

This is not a place. It is an event horizon. The world ends at its edge and something is on the other side.

**Access requirement:** Dark Horizon rank, all 5 Kingdom Crests placed in the Oath Stone, all 50 Journal Pages delivered, the 50th page's mystery resolved.

**What is there:**
The game does not reveal this in the design document. This information is held by the developer. The lore documents (WORLD_BIBLE.md) contain the setup. The conclusion belongs to the story, not the design.

**What the game can say:**
- The Horizon Stone (Landmark #92) becomes a portal at this stage
- Tal Rensh, Ravel Kost, and Aria Vayne are all at the stone when the player arrives
- Elder Maerik is not there — he left a note

The note says one sentence. The sentence changes based on how many Blood Moons the player has witnessed. The developer decides what it says.

---

## TECHNICAL EXPANSION CONSIDERATIONS

### World Map Expansion
The current world is 2200×1500. Coordinates are absolute. Expansion areas should use coordinates outside this range:
- Sky Archipelago: y-coordinate range -500 to 0 (above current map)
- Northern Territories: y-coordinate range -800 to -500
- Beast Sea depths: A separate coordinate space (different Layer type)

The world renderer should be tested for coordinate ranges outside the current map dimensions before any expansion is built.

### New Layer Types
Current Layers: `"overworld" | "cave" | "castle-interior" | "forest" | "roll-altar" | "sea-1/2/3/beast" | "dungeon-{string}"`

Proposed new layers for expansions:
- `"sky-archipelago"` — floating island rendering
- `"deep-sea"` — underwater rendering
- `"void-edge"` — the Dark Horizon interior (if it has one)

### Firebase Schema Extension
No expansion should require changes to the base `users/{uid}` document structure. New expansion content should use:
- Subcollections: `users/{uid}/expansions/{expansionId}`
- World-level documents: `world/skyArchipelago`
- Separate Firestore collections for expansion-specific data

The base schema (uid, username, rank, zenCoins, pets, ores, balls, position, stats) must never be modified for expansion compatibility. Extensions only.

---

## EXPANSION PRIORITY ORDER (RECOMMENDED)

1. **Multiplayer (M10)** — Highest impact, highest demand, architecture-required for everything else
2. **Player Housing (M11)** — High retention driver, community feature
3. **The Sky Archipelago (M12)** — New exploration content, builds on existing systems
4. **The Northern Territories (M13)** — Lore climax setup content
5. **The Deep Seas (M14)** — Major content expansion, requires new layer system
6. **The Dark Horizon (M15)** — The endgame. Only when the world is ready.

---

*FUTURE_EXPANSIONS.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
