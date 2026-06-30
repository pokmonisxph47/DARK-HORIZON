# WORLD_MASTER_PLAN.md — Dark Horizons: Legends of Lost Kingdoms

> **STATUS: PROPOSAL — NOT APPROVED**
> Do not modify any game files based on this document until the developer explicitly approves it.
> This is a pure design document. All coordinates, zone sizes, and zone names are proposals.

---

## 1. Design Philosophy

### Reference Games & What We Borrow

**Pet Simulator 99**
The world must have many visually distinct zones with clear rank-gated progression. Players should always have a "next zone" they can see but not yet enter. Every zone upgrade feels like opening a new chapter.
Application: Six ranks each unlock one or more new biomes. Later biomes have pets, ores, and loot unavailable anywhere else. The world grows with the player.

**Palworld (Exploration Only)**
The overworld should create curiosity through visual contrast. Mountains in one corner, snow beyond them, a river cutting through the center, swamp at the edge of a forest. Players explore because each direction looks different — not because a menu told them to go there.
Application: The 2200×1500 world has terrain that changes dramatically from corner to corner. A player standing at spawn can look north to the castle, west toward cliffs and forests, east toward open land and an altar, and south toward a shimmering river and distant beaches. All of that is visible and navigable on foot.

**The Legend of Zelda (World Flow)**
The overworld should be logically coherent. Forests grow near water. Mountains occupy one corner. The safe starting area is central. Dungeons are always destinations — you travel toward them through connected terrain. Discovering a path to a dungeon feels earned.
Application: Spawn is center-map. The castle anchors the north. The river divides east and west. Ports line the south coast. The three dungeons are at increasing distances from spawn — Dungeon 1 is in the foothills, Dungeon 2 is deeper in the northeast, Dungeon 3 requires crossing the snow biome.

**Pokémon (Catching Progression)**
Pet rarity should map to biome difficulty. Early areas (forest, meadow near spawn) have common pets. Harder-to-reach biomes (desert, mountains, snow) have rare and epic pets. Legendary pets appear only in the most remote or rank-gated areas (Beast Sea, Dungeon bosses).
Application: Common pets in forest and meadow. Rare pets in desert and swamp. Epic pets in mountains and snow. Legendary pets in Beast Sea and final dungeon only.

---

## 2. World Dimensions & Technical Reference

| Property | Value |
|---|---|
| World width | 2200 px |
| World height | 1500 px |
| Coordinate origin | Top-left (0, 0) |
| X direction | East (increases right) |
| Y direction | South (increases down) |
| Player spawn | (1100, 320) |
| Player size | 36 × 36 px |
| Zone interaction type | `WorldZone.type` in `lib/worldzones.ts` |
| Layer system | `types/world.ts` — `Layer` union type |

**Current zone types (existing):**
`"castle" | "mining" | "pets" | "roll" | "scenic"`

**New zone types needed (proposals):**
`"port" | "dungeon-entrance" | "npc-town" | "waystone" | "secret" | "raid" | "expansion"`

---

## 3. ASCII World Map

```
X:     0        440       880      1320      1760      2200
       ┌──────────────────────────────────────────────────────────┐
Y:   0 │[N.WOOD]          │ [CASTLE]  │ [N.CLIFFS] │ [SNOW BIOME]│
       │Forest(80,80)     │ (950,60)  │(1360,80)   │ (1720,0)    │
     80│520×280           │ 300×200   │ 760×440    │ 400×160     │
       │                  │[Castle    │            │[DUNGEON 3]  │
    160│                  │ Town]     │            │ (1920,180)  │
       │[MINE CLIFFS]     │(1260,70)  │            │             │
    240│(60,360)520×360   │           │[MOUNTAINS] │             │
       │                  │ ▼ SPAWN   │(1620,140)  │             │
    320│  ⛏️ MINING ZONE  │(1100,320) │ 480×340    │[DUNGEON 2]  │
       │  (140,420)       │[Waystone 1│            │ (1850,510)  │
    400│  320×260         │(1100,255)]│            │             │
       │                  │[WATERFALL]│            │[DUNGEON 1]  │
    480│[Castle           │(860,420)  │            │ (1770,430)  │
       │ Grove]           │ 220×150   │            │             │
    560│(720,230)         │ RIVER     │ Meadow     │[E.BEACH]    │
       │ 360×210          │(880,560)  │(1130,760)  │(1980,620)   │
    640│                  │ 180×680   │ 300×180    │ 220×820     │
       │                  │  ║ bridge │            │             │
    720│[MYSTIC FOREST]   │  ║        │[TITAN'S    │             │
       │(60,720) 280×240  │ [River    │ ARENA]     │             │
    800│                  │  Town]    │(1070,620)  │[ROLL SHRINE]│
       │                  │(700,810)  │ 300×200    │(1760,980)   │
    880│  🐾 PET FOREST   │  ║        │ (FUTURE)   │ 300×260     │
       │  (140,980)       │  ║        │            │[Waystone E] │
    960│  340×280         │  ║ bridge │            │(1800,1040)  │
       │[Waystone W]      │  ║        │[SWAMP]     │             │
   1040│(200,1000)        │  ╰─── bend│(500,1100)  │[DESERT]     │
       │                  │(690,1160) │ 340×200    │(1500,1180)  │
   1120│                  │ 410×120   │[COLOSSEUM] │ 520×280     │
       │                  │           │(480,1130)  │[Desert Town]│
   1200│                  │           │ 260×160    │(1540,1190)  │
       │                  │           │ (FUTURE)   │ 180×150     │
   1280│══════════════════════════════════════════════[BEAST PORT]│
       │        SOUTH BEACH (0,1290) 1450×210      │(2020,1050)  │
   1360│[PORT 1]  [Waystone H] [PORT 2]  [PORT 3]  │ 160×130    │
       │(320,1310)│ (560,1360) │(680,1310)│(1040,1305)│          │
   1440│ 180×140  │            │ 160×140  │ 160×140  │          │
       └──────────────────────────────────────────────────────────┘
```

**Legend:**
- `[NAME]` = new zone (proposal)
- Zone without brackets = existing zone
- `║` = river / water
- `══` = shoreline
- `▼` = spawn point
- Numbers = (x, y) coordinates

---

## 4. Location Catalog

Each location entry answers: **why it exists, what gameplay happens there, which rank unlocks it, and which future milestone depends on it.**

---

### LOCATION 1 — Complete Overworld Layout

The overworld is a single continuous 2200 × 1500 world rendered on one canvas. It is never unloaded. All other gameplay layers (cave, forest, seas, dungeons) render on top of it and return the player to the overworld exit point on dismissal.

The overworld divides into four natural quadrants visible from spawn:
- **Northwest quadrant** (x: 0–1100, y: 0–750): Mining territory — cliffs, north forest, mining zone, castle grove, waterfall, river source
- **Southwest quadrant** (x: 0–1100, y: 750–1500): Forest and coast — pet forest, mystic forest, swamp, south beach, three ports
- **Northeast quadrant** (x: 1100–2200, y: 0–750): Mountains, snow, dungeons, and east coast
- **Southeast quadrant** (x: 1100–2200, y: 750–1500): Desert, roll shrine, beast port, colosseum

The player always spawns at the center of this grid — (1100, 320) — a deliberate Zelda design choice that puts the entire world within walking distance and frames the castle as the obvious first destination.

**Rank unlock:** Noob (the overworld is always accessible)
**Future milestone:** Layer system (M2 ✓ complete). Full zone wiring is M3–M9. Raid areas and expansion zones are M10+.

---

### LOCATION 2 — Home Castle

| Property | Value |
|---|---|
| Position | (950, 60) |
| Size | 300 × 200 |
| Zone type | `"castle"` |
| Layer | `"castle-interior"` |
| Status | Zone exists (EXISTING). Interior layer is M4. |

**Why it exists:** The castle is the player's home base and crafting hub. Every Zelda-style game has a safe anchor in the early area — the castle fills this role. Players walk north from spawn to reach it, making it the first destination and an instinctive place to return to.

**Gameplay:**
- Enter the castle interior to reach the Crafting Machine (press E near machine)
- Craft pet balls from mined ores
- Future: NPC blacksmith inside castle
- Future: Castle upgrades as player rank increases (visual change to castle exterior)
- Future: Armor storage and equip screen

**Rank unlock:** Noob (always accessible from spawn)
**Milestone dependency:** M4 (Castle Interior layer). Crafting currently lives on a stub dashboard page — M4 moves it here permanently.

---

### LOCATION 3 — Mining Cave

| Property | Value |
|---|---|
| Entrance zone | (140, 420) 320 × 260 |
| Zone type | `"mining"` |
| Layer | `"cave"` |
| Status | Zone exists (EXISTING). Cave layer is M3. |

**Why it exists:** Mining is the root of the entire resource loop — ores → balls → catch pets → rank up. The cave must be reachable early and feel like a journey (it's in the western cliffs, requiring the player to cross from spawn). Mine cliffs at (60, 360) visually frame the entrance with dark rocky terrain.

**Gameplay inside cave layer:**
- 3 mining nodes (rocks) placed across the cave floor
- Press E near a node to mine — 3-second cooldown ring animation
- Stamina system: 20 strikes per session, resets on exit
- `mineRandomOre()` called after each strike — drops Stone (50%), Iron (30%), Crystal (15%), Mystic (4%), Dark (1%)
- Floating `+1 [Ore]` popup above each node
- Ore added to Firestore, `totalOresMined` incremented
- Rank-up check triggered after mining

**Rank unlock:** Noob (always accessible)
**Milestone dependency:** M3 (Mining Cave). Current code has `mineRandomOre()` as dead code — M3 wires it to the cave layer.

---

### LOCATION 4 — Forests

The world has four distinct forest zones serving different purposes.

#### 4A — North Forest (Visual / Scenic)
| Position | (80, 80) | Size | 520 × 280 |
|---|---|---|---|
| Zone type | `"scenic"` | Status | EXISTING visual terrain |

Decorative conifer forest in the northwest corner. No gameplay. Frames the mining cliffs visually and creates the feeling of a wild northern wilderness. Players walk through it to reach the mining zone. No zone marker, no entry trigger.

**Rank unlock:** Noob (walkable, no interaction)
**Milestone dependency:** None — pure visual. WorldDecor already renders it.

#### 4B — Castle Grove (Visual / Scenic)
| Position | (720, 230) | Size | 360 × 210 |
|---|---|---|---|
| Zone type | `"scenic"` | Status | EXISTING visual terrain |

A cultivated garden grove just south of the castle walls. Gives the castle surroundings a lived-in, maintained feel. Oak trees and lanterns placed in this area (see WorldDecor.tsx). No gameplay currently. Future: An NPC or hidden chest placed inside the grove.

**Rank unlock:** Noob
**Milestone dependency:** M4 (optional — NPC could be added here during castle interior milestone)

#### 4C — Pet Forest (Gameplay Entry Point)
| Position | (140, 980) | Size | 340 × 280 |
|---|---|---|---|
| Zone type | `"pets"` → becomes `"forest-entrance"` | Layer | `"forest"` |
| Status | Zone exists (EXISTING). Forest layer is M5. |

The southwest corner forest entry. Visually supported by the large west-wood terrain patch (40, 780, 620×420). Walking into the Pet Catching Area opens the "forest" layer — a dedicated sub-world with tall grass encounter zones, oak canopy, and wandering pet sprites.

**Gameplay inside forest layer:**
- Walking through tall grass zones triggers pet encounters at 15% per second
- Encounter pauses movement, opens Pet Battle + Catch Modal
- Battle system: Attack / Throw Ball / Flee
- Common pets: Wood sprites, foxes, owls, meadow sprites
- Legendary encounter (rare): Ancient Forest Guardian (1% chance)

**Rank unlock:** Noob (accessible from the start)
**Milestone dependency:** M5 (Pet Forest). Entire catch system is M5.

#### 4D — Mystic Forest (NEW — Scenic / Future Encounter Zone)
| Position | (60, 720) | Size | 280 × 240 |
|---|---|---|---|
| Zone type | `"scenic"` initially, `"pets"` at M8 | Status | NEW — not in current worldzones.ts |

A darker, fog-covered forest zone between the mining area and the pet forest, filling the visual gap at x=0–340, y=720–960. Uses a `terrain-forest-dark` class (already in WorldDecor) so it is visually distinct from the Pet Forest. Currently decorative — players can walk through it.

Future (M8): This becomes a secondary pet encounter zone with God-rank pets (bog creatures, shadow foxes, undead familiars) that share the biome with the nearby Swamp.

**Why it exists now:** The west side of the world has a bare gap between the mine cliff visuals and the west forest visuals. Filling it with a darker forest makes the world feel continuous rather than patchy. It also sets up future encounter content without requiring a redesign.

**Rank unlock:** Noob (walkable, no interaction until M8)
**Milestone dependency:** M8 (second encounter zone expansion, co-developed with Swamp gameplay)

---

### LOCATION 5 — River Network

The river is the spine of the world — it divides the western gameplay zones from the eastern ones and creates natural crossing points that guide player routing.

#### River System Components:
| Segment | Position | Size | Status |
|---|---|---|---|
| Waterfall source | (902, 370) | 128 × 230 | EXISTING visual |
| Waterfall mist | (850, 528) | 230 × 80 | EXISTING visual |
| River main body | (878, 535) | 205 × 730 | EXISTING visual |
| River bend (west) | (690, 1160) | 410 × 120 | EXISTING visual |
| North bridge | visual near (870, 650) | — | EXISTING visual |
| South bridge | visual near (780, 1140) | — | EXISTING visual |
| South shoreline | (0, 1285) | 1450 × 34 | EXISTING visual |

**Why it exists:** Rivers are natural world dividers. The river prevents players from ignoring the left/right split of the world and forces them to use bridge crossing points — a classic Zelda navigation tool. Crossing the river from west to east is a small moment of discovery.

**Gameplay:** Currently scenic. Future (M5+): Walking into the river zone triggers aquatic pet encounters. Water spirits, fish creatures, and river sprites appear at the river-enter interaction point.

**Rank unlock:** Noob (fully walkable over bridges)
**Milestone dependency:** M5 (river encounter trigger — add a `"scenic-water"` zone type with encounter capability). River-zone pet table is unique — not shared with forest or swamp.

---

### LOCATION 6 — Waterfalls

#### 6A — Main Waterfall (EXISTING)
| Position | (860, 420) | Size | 220 × 150 |
|---|---|---|---|
| Zone type | `"scenic"` | Status | EXISTING |

The primary waterfall, visually rendered as an animated sheet of water falling from a high cliff into the river. The zone marker triggers an announcement modal describing it as the source of the river.

Future (M5): The waterfall zone becomes a rare encounter point — approaching it close enough triggers a low-chance encounter with Water Spirit pets (Uncommon to Rare tier).

#### 6B — Hidden Cascade (NEW — Secret)
| Position | (890, 360) | Size | 60 × 60 |
|---|---|---|---|
| Zone type | `"secret"` | Status | NEW |

A small hidden zone tucked behind the main waterfall visual. Walking into the waterfall area from the east at close range discovers this secret. It does not appear on the minimap until found. No zone label visible — the player must walk into it.

**Gameplay:** Discovering the Hidden Cascade triggers a one-time loot event: a guaranteed Crystal ore drop and an encounter with a rare Water Fox pet (unique to this location). After first discovery, it resets every 24 hours for a lower-rarity resource drop.

**Why it exists:** Secret spots behind waterfalls are a hallmark of Zelda-style exploration. Reward for curiosity-driven movement.

**Rank unlock:** No rank gate — but physically reachable only by approaching the waterfall from the correct angle (the zone rectangle is small and positioned behind the waterfall visual).
**Milestone dependency:** M5 (coded when waterfall encounters are implemented)

---

### LOCATION 7 — Mountains

| Position | (1620, 140) | Size | 480 × 340 |
|---|---|---|---|
| Zone type | `"scenic"` initially | Status | EXISTING |

The northeast mountain range is the dominant landmark visible from spawn when looking northeast. Visually rendered as cliffs and rock formations using `terrain-cliffs` CSS (1360, 80, 760×440). The mountain zone covers the entire northeast plateau.

**Why it exists:** Mountains provide natural world edges and serve as the gateway to three key late-game features — the Snow Biome beyond them, two dungeon entrances within them, and a hidden Mountain Waystone.

**Gameplay (current):** Scenic. Players can walk into the mountain zone.
**Gameplay (M7+):** The mountain zone becomes a dedicated encounter biome with unique pets — Stone Giants (Epic), Mountain Eagles (Rare), Crystal Golems (Epic). Mystic ore deposits appear as visual objects in the mountain terrain that the player can interact with (separate from the Mining Cave ore system — these are surface nodes with lower yield).

**Rank unlock:** Noob (walkable). Mountain pet encounters: God rank (M7).
**Milestone dependency:** M7 (rank progression milestone adds mountain as the first post-God encounter zone). M9 (Dungeon 1 entrance is inside the mountain boundary).

---

### LOCATION 8 — Desert

| Position | (1500, 1180) | Size | 520 × 280 |
|---|---|---|---|
| Zone type | `"scenic"` initially | Status | EXISTING |

The southeastern desert occupies the bottom-right quadrant of the world. Visually rendered with warm sand-tone CSS. Connects naturally to the east beach on its right edge.

**Why it exists:** The desert gives the southeast corner a distinct identity. The distance from spawn (approximately 600px east, 860px south) makes it a destination for mid-game players. Pet rarity and ore yield here is higher than in the forest.

**Gameplay:**
- Current: Scenic
- God+ (M7): Walking into the desert triggers pet encounters. Sand Golems (Rare), Scorpion Beasts (Epic), Desert Sorcerers (Rare). Rare Crystal ore surface nodes.
- Desert Town NPC (see Location 16) provides a resting point inside this zone.
- High ambient Zen Coin earn rate compared to forest (offset by the journey required to get here)

**Rank unlock:** Noob (walkable). Pet encounters: God rank.
**Milestone dependency:** M7 (desert encounter table). Desert Town: M8.

---

### LOCATION 9 — Snow Biome (NEW)

| Position | (1720, 0) | Size | 400 × 160 |
|---|---|---|---|
| Zone type | `"scenic"` initially | Status | NEW — requires new terrain CSS class |
| Access | Walk north through Mountains (y < 140 inside mountain x-range) |

The snow biome occupies the far northern strip of the world, behind and above the mountain range. On the world map it appears as an unreachable-looking white zone until the player reaches Heavens rank — at that point a "mountain pass" path opens through the north cliff wall.

**Why it exists:** A snow biome is a classic milestone biome — the moment you unlock the snow area feels like entering a completely different world. Visually, white terrain against the dark rock of the mountains creates a striking color contrast visible from the northeast corner of the overworld.

**Gameplay:**
- Ice Wolves (Rare), Frost Birds (Uncommon), Snow Sprites (Common), Glacier Colossus (Legendary — appears only here and in Beast Sea)
- Dark ore drops slightly more common here (2% instead of 1% for mining nodes if a cave branch is added here in M8+)
- Slipping mechanic (future): players move slightly faster in snow, making encounter avoidance harder
- Dungeon 3 entrance is located in the eastern section of the snow biome

**Rank unlock:** Heavens (rank 4) — the mountain pass zone entry is rank-gated
**Milestone dependency:** M9 (Snow Biome activated with Dungeon 3 content and Heavens progression)

---

### LOCATION 10 — Swamp (NEW)

| Position | (500, 1100) | Size | 340 × 200 |
|---|---|---|---|
| Zone type | `"scenic"` initially, `"pets"` at M8 | Status | NEW — requires new terrain CSS class |
| Access | Walk south from Pet Forest or east from the river bend |

The swamp occupies the zone where the river bends westward before reaching the south beach. It sits between the base of the west forest and the river delta — a geographically logical position for marshy terrain to develop. The terrain requires a `terrain-swamp` CSS class (deep green-grey, with murky overlay and dead-tree decor).

**Why it exists:** The gap between the Pet Forest and the south beach is currently bare. The swamp fills it visually and creates a progression step between the Pet Forest (Noob content) and the Ports (Awesome+ content). It gives God-rank players a reason to revisit the southwest part of the map.

**Gameplay (M8):**
- Entering the swamp while at God rank triggers encounters with Bog Creatures (Uncommon), Undead Spirits (Rare), Toxic Toads (Common), Shadow Hounds (Epic)
- Mystic ore surface nodes (same mechanic proposed for mountains — low-yield surface find)
- River Shrine: A small interactable object inside the swamp rewards players with a small Zen Coin drop once per session (lore: a spirit offering)

**Rank unlock:** Noob (walkable, visual only). Pet encounters: God rank.
**Milestone dependency:** M8 (second encounter zone expansion)

---

### LOCATION 11 — Beaches

#### 11A — South Beach (EXISTING)
| Position | (0, 1290) | Size | 1450 × 210 |
|---|---|---|---|
| Zone type | `"scenic"` | Status | EXISTING visual terrain |

The south coast spans most of the bottom of the world. Three ports are distributed along it. The shoreline visual (0, 1285, 1450×34) marks the water edge.

**Gameplay:** Scenic until M8. Future: Beach-specific Common pets (Sea Crabs, Sand Birds) accessible without a port ticket. The beach also serves as a visual reward for players who first travel south — seeing the ocean from shore creates scale.

**Rank unlock:** Noob (walkable from any route south)
**Milestone dependency:** M8 (port and sea layer milestone adds beach encounter trigger)

#### 11B — East Beach (EXISTING)
| Position | (1980, 620) | Size | 220 × 820 |
|---|---|---|---|
| Zone type | `"scenic"` | Status | EXISTING visual terrain |

The eastern coastal strip runs along the far-right side of the world from y=620 to y=1440. The Beast Port is located on this coast. Dungeon 2 is near the top of this coast. The east beach is the world's most isolated shore — reaching it requires traveling the full width of the world.

**Why this matters:** The east coast isolation is intentional. Dungeon 2 and the Beast Port being accessible only from the east forces players to travel into unfamiliar territory. The journey to the east coast is itself part of the progression feel.

**Rank unlock:** Noob (walkable). Beast Port: Over Heavens.
**Milestone dependency:** M8 (Beast Port and Beast Sea)

---

### LOCATION 12 — Ports

Four ports are distributed along the coastline, each gating a different sea. Ports are interactive zones. Walking into a port zone at the correct rank triggers the sail confirmation modal, which transitions the player to the sea layer.

#### Port 1 — Sunrise Dock (NEW)
| Position | (320, 1310) | Size | 180 × 140 |
|---|---|---|---|
| Zone type | `"port"` | Layer | `"sea-1"` |
| Rank required | Awesome |

The first port — close to the west side of the south beach, easily discovered when exploring south. Small wooden dock visual with a single ship icon. Enters 1st Sea.

**Why here:** Close enough to reach naturally during early game (Awesome is the second rank). Players will see the port before they have the rank to enter it, which creates a clear progression goal.

**Gameplay:** Enters sea-1 layer. Tutorial sea — introduces sea mechanics, weather patterns, and sea creature encounters.

#### Port 2 — Storm Harbor (NEW)
| Position | (680, 1310) | Size | 160 × 140 |
|---|---|---|---|
| Zone type | `"port"` | Layer | `"sea-2"` |
| Rank required | God |

Mid-south-beach, near where the River exits to sea. Larger dock than Port 1, with a weathered industrial appearance suggesting harder seas ahead.

**Gameplay:** Enters sea-2 layer. Introduces weather events (storms, fog). Coral Creatures (Uncommon), Sirens (Rare), Storm Elementals (Epic).

#### Port 3 — Tempest Quay (NEW)
| Position | (1040, 1305) | Size | 160 × 140 |
|---|---|---|---|
| Zone type | `"port"` | Layer | `"sea-3"` |
| Rank required | Heavens |

Center-south beach, near the river bend exit. Naval-themed — this port is clearly larger and more fortified than the earlier two.

**Gameplay:** Enters sea-3 layer. Ancient sea serpents, ghost ships. Rare armor loot drops.

#### Port 4 — Abyssal Dock (Beast Port) (NEW)
| Position | (2020, 1050) | Size | 160 × 130 |
|---|---|---|---|
| Zone type | `"port"` | Layer | `"sea-beast"` |
| Rank required | Over Heavens |

Hidden on the east coast — players must travel to the far right edge of the world to find it. It does not appear on the minimap until visited. A haunting, dark port with crumbling stone docks and no NPC signage. Finding it feels like discovering something the world didn't want you to find.

**Gameplay:** Enters sea-beast layer. Legendary pets only. Massive Zen Coin rewards. Krakens, Leviathans, Elder Sea Dragons. This sea does not reset on death — it has a 24-hour lockout mechanic (proposed).

**Rank unlock:** Over Heavens (rank 5)
**Milestone dependency:** All ports are M8.

---

### LOCATION 13 — Roll Shrine

| Position | (1760, 980) | Size | 300 × 260 |
|---|---|---|---|
| Zone type | `"roll"` | Layer | `"roll-altar"` |
| Status | EXISTING |

The Roll Altar is placed in the eastern half of the world, requiring a deliberate journey east from spawn. This placement is intentional — it prevents players from accidentally rolling before they have Zen Coins to spend, but it's reachable at Noob rank.

**Why it exists:** Gacha mechanics create engagement loops. Walking to the Roll Shrine makes the roll feel like a ritual — an action worth taking, not an idle button press. Visually framed by a broken arch ruin and two lanterns in WorldDecor.tsx (already placed).

**Gameplay (M6):**
- Enter the roll-altar layer (press E near the altar)
- Standard Roll: 100 Zen Coins — ore bundles, ball bundles, pet encounter tokens
- Premium Roll: 500 Zen Coins — rare pet encounter tokens, Zen Coin bonus spins, Legendary encounter tokens
- Animated gacha pull modal
- `totalRolls` counter incremented — used for rank-up checks

**Rank unlock:** Noob (reachable immediately, but useless without Zen Coins)
**Milestone dependency:** M6

---

### LOCATION 14 — Dungeon Entrances

Three dungeon entrances are distributed across the northeast quadrant of the world — all physically inside or adjacent to the mountain zone. All entrances become visible at God rank (the first dungeon rank requirement), but the inner dungeons gate themselves individually.

#### Dungeon 1 — Ruins of the Lost Kingdom (NEW)
| Position | (1770, 430) | Size | 180 × 140 |
|---|---|---|---|
| Zone type | `"dungeon-entrance"` | Layer | `"dungeon-ruins"` |
| Rank required | God |

Located at the southeastern foothills of the mountain range — reachable by walking east from spawn and then north into the mountains. Stone arch entrance with overgrown vines.

**Gameplay:** 3 floors. Boss: Ancient Knight. Loot: Crystal/Mystic ores, Armor Tier 3 (Crystal Mail). Each floor has 3–5 encounter rooms + 1 treasure room.
**Why here:** The most accessible dungeon. God is the third rank — players will have explored the west thoroughly before reaching this area.

#### Dungeon 2 — Forgotten Sanctum (NEW)
| Position | (1850, 510) | Size | 160 × 130 |
|---|---|---|---|
| Zone type | `"dungeon-entrance"` | Layer | `"dungeon-sanctum"` |
| Rank required | Heavens |

Deeper in the northeast — just south of the mountain range and west of the east coast. Requires players to navigate through the mountain terrain before they can access it. Ornate stone doorway with faded runes.

**Gameplay:** 5 floors. Boss: Shadow Priest. Loot: Mystic/Dark ores, Armor Tier 4 (Mystic Robes). Shadow magic encounter themes.

#### Dungeon 3 — Citadel of Dark Horizons (NEW)
| Position | (1920, 180) | Size | 160 × 130 |
|---|---|---|---|
| Zone type | `"dungeon-entrance"` | Layer | `"dungeon-citadel"` |
| Rank required | Dark Horizon |

The most remote dungeon — located inside the Snow Biome in the far northeast. Players must: (1) reach Heavens rank to unlock the mountain pass to the snow, (2) then reach Dark Horizon rank to open the citadel entrance. The entrance appears as a massive iron gate embedded in a cliff face.

**Gameplay:** 7 floors. Boss: Dark Overlord. Loot: Dark ores, Armor Tier 6 (Dark Horizon Set), guaranteed Legendary pet encounter token. This is the endgame.

**Milestone dependency:** All dungeon entrances are M9. Dungeon 3 layer completion is the final story milestone.

---

### LOCATION 15 — Sea Transitions

Sea transitions are triggered from Port zones (Location 12). Each port is a sea transition point. On entering a qualifying port at the correct rank, a confirmation modal appears ("Set sail?"). Confirming activates the corresponding sea layer.

| Port | Layer | Transition Feel |
|---|---|---|
| Port 1 (320, 1310) | `"sea-1"` | Calm water intro, gentle wave sounds |
| Port 2 (680, 1310) | `"sea-2"` | Storm clouds form on entry |
| Port 3 (1040, 1305) | `"sea-3"` | Ancient nautical fog |
| Abyssal Dock (2020, 1050) | `"sea-beast"` | Darkness and deep ocean ambience |

Sea layers are implemented as self-contained encounter environments. The overworld is never unmounted — returning from the sea takes the player back to the port zone. The Layer type in `types/world.ts` already declares `sea-1`, `sea-2`, `sea-3`, and `sea-beast`.

**Milestone dependency:** M8

---

### LOCATION 16 — NPC Towns

NPC towns are interactive zones where players can speak to NPCs for shops, lore, and quest breadcrumbs. All towns are visually distinct from castle and gameplay zones — they use a `"npc-town"` zone type with warm lighting decor.

#### Town 1 — Merchant Quarter (NEW)
| Position | (1260, 70) | Size | 200 × 160 |
|---|---|---|---|
| Zone type | `"npc-town"` | Rank | Noob |

East of the Home Castle, just inside the mountain-zone boundary. A small market with 3 NPCs: a traveling Merchant (future shop for Zen Coin purchases), a Blacksmith (lore about armor tiers), and a Chronicle Keeper (explains rank progression and game history).

**Why here:** Players discover this town on their first eastward walk from the castle — it sets up future shop systems without implementing them yet. The NPCs can say "I'll have wares soon, traveller" in early milestones, making the town a placeholder that feels intentional.

**Milestone dependency:** M4 (shell town with dialogue). M7 (merchant opens shop when rank economy is implemented).

#### Town 2 — Fisher's Rest (NEW)
| Position | (700, 810) | Size | 200 × 160 |
|---|---|---|---|
| Zone type | `"npc-town"` | Rank | Awesome |

On the west bank of the river, between the Mystic Forest and the Pet Forest. A riverside inn village with a dock aesthetic. NPC: Innkeeper (restores stamina between cave sessions — future feature). River Guide (gives hints about swamp pets and hidden cascade).

**Why here:** Players traveling between the Pet Forest and the ports naturally pass through this area. The town rewards that travel with a rest point and lore.

**Milestone dependency:** M5 (introduced when the forest and swamp area becomes active)

#### Town 3 — Sandstone Market (NEW)
| Position | (1540, 1190) | Size | 180 × 150 |
|---|---|---|---|
| Zone type | `"npc-town"` | Rank | God |
| Located inside | Desert zone (1500, 1180) |

A desert trading post — the southernmost town, accessible only after reaching God rank and traveling deep into the southeast. An oasis aesthetic: sandstone walls, palm-style decor, vibrant fabrics.

NPC: Desert Trader (trades desert-specific items for Zen Coins), Cartographer (fills in the minimap for any unexplored zones the player has not yet walked to — a quality-of-life feature). 

**Why here:** God-rank players have seen most of the early world. The Desert Market is a reward for exploration — it's deep enough in the southeast to feel like a discovery.

**Milestone dependency:** M8

---

### LOCATION 17 — Fast Travel Locations (Waystones)

Waystones are glowing obelisk objects placed at key map locations. A player who steps onto a waystone "binds" it. Pressing a dedicated fast-travel UI button opens a world map showing all discovered waystones — the player selects one to warp.

All waystones are small (50×50 px) and share a single zone type: `"waystone"`.

| # | Name | Position | Size | Rank |
|---|---|---|---|---|
| W1 | Castle Waystone | (1095, 255) | 50 × 50 | Noob — auto-unlocked at first login |
| W2 | Forest Waystone | (200, 1000) | 50 × 50 | Noob — found near Pet Forest entrance |
| W3 | East Waystone | (1800, 1040) | 50 × 50 | Awesome — near Roll Shrine |
| W4 | Harbor Waystone | (560, 1360) | 50 × 50 | Awesome — on the south beach between Port 1 and Port 2 |
| W5 | Mountain Waystone | (1730, 320) | 50 × 50 | God — inside mountain zone, near Dungeon 1 approach path |

**Why they exist:** Without fast travel, late-game players will spend most of their session walking across a 2200×1500 world rather than playing. Waystones solve this. Limiting waystone count to 5 (Zelda-style) means players still make intentional routing decisions — they don't teleport everywhere.

Fast travel is only to discovered waystones. Players must first walk to each one. This preserves the exploration reward while eliminating repeat grind travel.

**Milestone dependency:** M7 (fast travel unlocked alongside rank progression as a QoL system). The waystone objects and UI are M7 scope.

---

### LOCATION 18 — Future Raid Areas

Raid areas are reserved zones for future multiplayer or wave-combat content. They are placed on the world map now as visual placeholders — stone arenas with "coming soon" styling and no entry trigger. This prevents redesigning the world when raids are implemented.

#### Raid Area 1 — Titan's Arena (NEW)
| Position | (1070, 620) | Size | 300 × 200 |
|---|---|---|---|
| Zone type | `"raid"` (future) | Rank | Dark Horizon (future) |

Center-east of the world, in the open meadow area east of the river. A massive circular stone colosseum visible from the river crossing. At current milestone scope: a scenic zone with a "Sealed" banner. Future: Wave-based raid combat with a Titan boss requiring multiple players (or very strong pets).

**Why here:** Center-east placement means players see this arena early in the game when exploring east from spawn. The sealed colosseum builds curiosity and a sense of a larger world. The location is logistically central — accessible from the river path or from the Roll Shrine direction.

#### Raid Area 2 — Ancient Colosseum (NEW)
| Position | (480, 1130) | Size | 260 × 160 |
|---|---|---|---|
| Zone type | `"raid"` (future) | Rank | Over Heavens (future) |

South-center, between the river bend and the south beach, near the Swamp. A crumbling arena embedded in the swamp vegetation. Future: Group monster hunts with swamp-themed enemies and rare loot tables.

**Why here:** Placing a raid zone near the Swamp biome ties raid content to an already late-game zone. Players who discover the Swamp will also see this locked colosseum, reinforcing that the southwest has depth.

**Milestone dependency:** M10+ (post-launch). The zone rectangles should be added to `worldzones.ts` early so the world map renders them, but they require no implementation until M10.

---

### LOCATION 19 — Secret Areas

Secret areas are not shown on the minimap until discovered. They have no visible zone label above them (zone marker is suppressed for type `"secret"`). They reward curiosity-driven exploration.

#### Secret 1 — Hidden Cascade Cave
| Position | (890, 360) | Size | 60 × 60 |
|---|---|---|---|
| Zone type | `"secret"` | Rank | None — discoverable at Noob |
| Trigger | Walk east into the waterfall from close range |

A tiny cave opening behind the main waterfall. One-time discovery reward: guaranteed Crystal ore + Water Fox pet encounter (Rare, unique to this location). After first discovery, resets daily for a lower-rarity ore drop. No zone label. Not visible on minimap until first entry.

#### Secret 2 — Sunken River Temple
| Position | (710, 1200) | Size | 80 × 60 |
|---|---|---|---|
| Zone type | `"secret"` | Rank | Awesome (to reach the area on foot) |
| Trigger | Walk into the river bend zone from the south |

A submerged temple entrance at the river bend. Discovery triggers a brief "you feel a cold draft from below" zone announcement before opening a small encounter with a River Spirit (Rare pet, unique). Once per day reset for a small Zen Coin cache.

#### Secret 3 — Summit Peak
| Position | (1960, 60) | Size | 140 × 120 |
|---|---|---|---|
| Zone type | `"secret"` | Rank | Over Heavens (snow biome must be unlocked) |
| Location | Inside the snow biome, far northeast |

The highest point of the world. A one-time loot chest at the mountain summit containing a large ore bundle (100 Dark ore), a premium roll token, and a permanent passive buff (proposed: +5% catch rate forever). The player can view a "World Overview" that shows the entire map from above — a cinematic moment unlocked by reaching the summit.

#### Secret 4 — Eastern Cove
| Position | (2080, 1000) | Size | 120 × 100 |
|---|---|---|---|
| Zone type | `"secret"` | Rank | None — but physically requires traveling the full east coast |
| Location | Behind the east beach cliffs, far southeast |

A hidden coastal alcove accessible only by pressing against the far-right wall of the world and finding the correct gap in the cliff visual. A weathered chest respawns every 48 hours containing: a random ball bundle, a small Zen Coin cache, and rarely (5%) an encounter token for the east coast's rarest pet.

**Milestone dependency:** All secrets are M5–M6 scope (coded alongside encounter and reward systems). Their zone rectangles can be pre-added to `worldzones.ts` in M3 so the architecture is ready.

---

### LOCATION 20 — Future Expansion Zones

Expansion zones are reserved areas that are blocked in the current world but exist on the map as visual "sealed" borders. They signal that the world has more to it — and prevent the need for a map redesign when expansion content ships.

#### Expansion Zone A — The Void Reaches (Southern Sea)
| Implied position | South of y=1500 |
|---|---|
| Concept | A cosmic deep-sea realm with void-themed enemies |
| Rank | Post-Dark Horizon (a 7th rank, not yet designed) |

The south beach shoreline (y=1285) currently terminates the playable world. In the expansion, a fifth sea port opens below Port 2 on the south beach, entering a fifth sea with an entirely different visual language — dark space-like void ocean with celestial sea monsters.

No coordinates needed now because it is beyond the current world boundary. The existing port infrastructure (Port 1–3) follows the same pattern, so Port 5 is straightforward to add.

#### Expansion Zone B — Sky Archipelago (Above Mountains)
| Implied position | North of y=0 within mountain x-range |
|---|---|
| Concept | Floating islands accessible by flying mount (post-launch mount system) |
| Rank | Post-Dark Horizon |

The mountain peaks visually suggest height. A flying mount system (far future — post-M9) allows players to ascend from the mountain summit (Secret 3) to floating sky islands visible in the world background. Sky pets, air encounters, and sky-themed armor.

**Implementation note:** Add a `"locked-expansion"` CSS class to a visual overlay at y=0, x=1620–2200 that shows faint floating island silhouettes — purely decorative until expansion ships. This is a one-line CSS addition to WorldDecor.

#### Expansion Zone C — Underground Network
| Concept | A connected cave system below all existing layers |
|---|---|
| Access | Hidden entrances inside the Mining Cave and inside Dungeon 1 |

A second underground tier connecting the Mining Cave, a new Deep Mine, and a secret passage to Dungeon 1. Pet types would be entirely underground — crystal creatures, cave bats, rock leviathans.

This expansion builds on the existing cave layer (`"cave"`) without modifying it — a `"deep-cave"` layer type is added, accessed from inside the existing cave layer.

---

## 5. Progression Flow Summary

This is how a player naturally moves through the world from Noob to Dark Horizon.

```
NEW PLAYER
└── Spawn (1100, 320)
    ├── Walk north → Home Castle (Noob) → learn crafting exists
    │     └── Discover Castle Town to the east → see merchant stalls
    ├── Walk west → Mining Zone (Noob) → mine first ores
    │     └── Walk back to Castle → craft first Basic Ball
    ├── Walk southwest → Pet Forest (Noob) → first pet encounter → catch first pet
    │     └── Discover Forest Waystone
    ├── Walk east → Roll Shrine (Noob) → spend first Zen Coins
    │     └── Discover East Waystone

→ AWESOME RANK UNLOCKED (50 ores + 3 pets)
    ├── South beach coast opens → Port 1 (Sunrise Dock) → first sea voyage
    ├── Castle Waystone fast-travel system unlocks
    ├── Walk east toward mountains → see the sealed dungeon arch from distance
    ├── River Town (Fisher's Rest) discovered on the way south

→ GOD RANK UNLOCKED (200 ores + 10 pets + 5 rolls)
    ├── Port 2 opens → Storm Harbor → sea-2
    ├── Dungeon 1 (Ruins of the Lost Kingdom) entrance opens in mountains
    │     └── First armor drops → equip armor
    ├── Desert becomes encounter zone → Sandstone Market
    ├── Mountain Waystone discovered
    ├── Swamp begins encounter drops (Mystic ore surface nodes)

→ HEAVENS RANK UNLOCKED (500 ores + 25 pets + 15 rolls + 1st Sea cleared)
    ├── Port 3 (Tempest Quay) opens
    ├── Mountain pass opens → Snow Biome discovered
    │     └── Summit Peak secret accessible
    ├── Dungeon 2 (Forgotten Sanctum) opens in northeast

→ OVER HEAVENS RANK UNLOCKED (1000 ores + 50 pets + 30 rolls + 2nd Sea cleared)
    ├── Beast Port discovered on east coast → sea-beast (Legendary pets only)
    ├── Titan's Arena and Ancient Colosseum show "coming soon" signs

→ DARK HORIZON RANK UNLOCKED (2500 ores + 100 pets + 50 rolls + Beast Sea + 1 Dungeon)
    ├── Dungeon 3 (Citadel of Dark Horizons) opens in snow biome
    ├── Dark Horizon Set armor available as dungeon 3 loot
    └── Legendary pet Glacier Colossus available (snow + Dungeon 3)

ENDGAME / EXPANSION
    └── World sealed zones begin hinting expansion content (floating islands, void sea)
```

---

## 6. New Zone Types Required

The current `ZoneType` union in `lib/worldzones.ts` is:
```typescript
export type ZoneType = "castle" | "mining" | "pets" | "roll" | "scenic";
```

**Proposed extension (add when implementing each milestone):**
```typescript
export type ZoneType =
  | "castle"
  | "mining"
  | "pets"
  | "roll"
  | "scenic"
  | "port"               // M8 — sea transition trigger
  | "dungeon-entrance"   // M9 — dungeon entry trigger
  | "npc-town"           // M4 — NPC interaction hub
  | "waystone"           // M7 — fast travel obelisk
  | "secret"             // M5 — hidden, no minimap until found
  | "raid"               // M10+ — future raid area (sealed)
  | "expansion"          // M10+ — future expansion sealed zone
```

---

## 7. New Terrain Classes Required

New zones need CSS classes added to `app/globals.css` and `WorldDecor.tsx`. These are for visual only — they do not affect collision or zone logic.

| Class | Used by | Visual |
|---|---|---|
| `terrain-snow` | Snow Biome | White gradient, crystalline overlay |
| `terrain-swamp` | Swamp | Dark green-grey, murky fog overlay |
| `terrain-desert-town` | Desert Town | Sandstone, heat shimmer |
| `terrain-npc-town` | All NPC towns | Warm lamplight tone |
| `zone-waystone` | Waystone zones | Glowing purple obelisk |
| `zone-raid-sealed` | Raid areas (sealed) | Stone arena with "sealed" lock overlay |
| `zone-expansion-sealed` | Expansion zones | Dark mist with faint silhouette |

---

## 8. Coordinate Quick Reference

| Location | x | y | w | h | Rank | Status |
|---|---|---|---|---|---|---|
| Home Castle | 950 | 60 | 300 | 200 | Noob | EXISTING |
| Mining Zone | 140 | 420 | 320 | 260 | Noob | EXISTING |
| Pet Catching Area | 140 | 980 | 340 | 280 | Noob | EXISTING |
| Roll Shrine | 1760 | 980 | 300 | 260 | Noob | EXISTING |
| Waterfall | 860 | 420 | 220 | 150 | Noob | EXISTING scenic |
| River | 880 | 560 | 180 | 680 | Noob | EXISTING scenic |
| Mountains | 1620 | 140 | 480 | 340 | Noob | EXISTING scenic |
| Desert | 1500 | 1180 | 520 | 280 | Noob | EXISTING scenic |
| Snow Biome | 1720 | 0 | 400 | 160 | Heavens | NEW |
| Swamp | 500 | 1100 | 340 | 200 | Noob/God | NEW |
| Mystic Forest | 60 | 720 | 280 | 240 | Noob/God | NEW |
| Castle Town | 1260 | 70 | 200 | 160 | Noob | NEW |
| River Town | 700 | 810 | 200 | 160 | Awesome | NEW |
| Desert Town | 1540 | 1190 | 180 | 150 | God | NEW |
| Port 1 (Sunrise Dock) | 320 | 1310 | 180 | 140 | Awesome | NEW |
| Port 2 (Storm Harbor) | 680 | 1310 | 160 | 140 | God | NEW |
| Port 3 (Tempest Quay) | 1040 | 1305 | 160 | 140 | Heavens | NEW |
| Beast Port (Abyssal) | 2020 | 1050 | 160 | 130 | Over Heavens | NEW |
| Dungeon 1 (Ruins) | 1770 | 430 | 180 | 140 | God | NEW |
| Dungeon 2 (Sanctum) | 1850 | 510 | 160 | 130 | Heavens | NEW |
| Dungeon 3 (Citadel) | 1920 | 180 | 160 | 130 | Dark Horizon | NEW |
| Waystone 1 (Castle) | 1095 | 255 | 50 | 50 | Noob | NEW |
| Waystone 2 (Forest) | 200 | 1000 | 50 | 50 | Noob | NEW |
| Waystone 3 (East) | 1800 | 1040 | 50 | 50 | Awesome | NEW |
| Waystone 4 (Harbor) | 560 | 1360 | 50 | 50 | Awesome | NEW |
| Waystone 5 (Mountain) | 1730 | 320 | 50 | 50 | God | NEW |
| Hidden Cascade | 890 | 360 | 60 | 60 | None | NEW secret |
| Sunken River Temple | 710 | 1200 | 80 | 60 | Awesome | NEW secret |
| Summit Peak | 1960 | 60 | 140 | 120 | Over Heavens | NEW secret |
| Eastern Cove | 2080 | 1000 | 120 | 100 | None | NEW secret |
| Titan's Arena | 1070 | 620 | 300 | 200 | Dark Horizon+ | NEW raid |
| Ancient Colosseum | 480 | 1130 | 260 | 160 | Over Heavens+ | NEW raid |

---

## 9. Implementation Order

These zones should be added to `worldzones.ts` in milestone order. Do not add all zones at once — only add zones when their milestone is in scope. This keeps the codebase clean and prevents stub zones from confusing players before their content exists.

| Milestone | Zones to add |
|---|---|
| M3 (Mining Cave) | Hidden Cascade (secret, no gameplay yet) |
| M4 (Castle Interior) | Castle Town (NPC shell), Waystone 1 |
| M5 (Pet Forest) | Mystic Forest, Hidden Cascade (active), Sunken River Temple, Waystone 2 |
| M6 (Roll Altar) | Eastern Cove (active) |
| M7 (Rank Progression) | Waystone 3, Waystone 4, Waystone 5, Mountain Waystone system |
| M8 (Seas & Ports) | Port 1–3, Beast Port, Swamp, River Town, Desert Town, Raid areas (sealed) |
| M9 (Dungeons) | Dungeon 1–3 entrances, Snow Biome, Summit Peak |
| M10+ | Expansion zone overlays |

---

*Version: 1.0 — PROPOSAL*
*Author: Claude (design proposal for developer approval)*
*Date: 2026-06-30*
*Based on: MASTER_PROJECT.md, GAME_RULES.md, PROJECT_MEMORY.md, FOUNDATION_REPORT.md, M2_WORLD_VISUAL_REPORT.md, lib/worldzones.ts, components/world/WorldDecor.tsx*
*Status: AWAITING DEVELOPER APPROVAL — do not implement*
