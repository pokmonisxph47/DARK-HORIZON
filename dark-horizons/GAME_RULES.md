# GAME_RULES.md — Dark Horizons: Legends of Lost Kingdoms

> This file defines the canonical rules for all gameplay systems.
> All AI assistants must read this file before implementing any gameplay mechanic.
> If code contradicts this file, the code is wrong — update the code, not this file.
> Only the developer may change game rules.

---

## 1. Core Gameplay Loop

```
Login
  └── Dashboard Hub (lobby)
        └── Enter World
              ├── Walk to Mining Zone → Enter Cave
              │     └── Mine ores → Exit cave with ores
              ├── Walk to Home Castle → Enter Interior
              │     └── Use crafting machine → Craft pet balls
              ├── Walk to Forest → Enter Forest
              │     └── Encounter wild pet → Battle → Catch with ball
              ├── Walk to Roll Altar
              │     └── Spend Zen Coins → Receive random reward
              ├── Walk to Port (rank-gated) → Sail to Sea
              │     └── Sea encounters → Loot → Zen Coins
              └── Walk to Dungeon Entrance (rank-gated)
                    └── Dungeon rooms → Boss → Rare loot
```

**The loop in one sentence:**
Mine → Craft Balls → Catch Pets → Battle with Pets → Earn Zen Coins → Roll → Rank Up → Unlock New Areas.

---

## 2. Rank Progression

Ranks are earned by meeting cumulative gameplay thresholds. Rank is never granted manually by the player — it is calculated automatically after any significant action.

| # | Rank Name | Unlock Requirement |
|---|---|---|
| 1 | **Noob** | Starting rank |
| 2 | **Awesome** | 50 ores mined + 3 pets caught |
| 3 | **God** | 200 ores mined + 10 pets caught + 5 rolls |
| 4 | **Heavens** | 500 ores mined + 25 pets caught + 15 rolls + 1st Sea cleared |
| 5 | **Over Heavens** | 1000 ores mined + 50 pets caught + 30 rolls + 2nd Sea cleared |
| 6 | **Dark Horizon** | 2500 ores mined + 100 pets caught + 50 rolls + Beast Sea cleared + 1 Dungeon cleared |

> **Note:** The old rank `"Awsunm"` was a typo. The correct rank name is `"Awesome"`.
> All code, Firestore documents, and UI must use `"Awesome"`.

### Rank-Up Rules:
- Rank-up is checked automatically after mining, catching, rolling, and sea/dungeon completion
- On rank-up, a celebratory modal is shown with the new rank badge
- Rank can never decrease
- Rank gates sea access, dungeon access, and overworld area lock/unlock

---

## 3. Area Unlocks by Rank

| Area | Rank Required | How to Reach |
|---|---|---|
| Home Castle | Noob (default) | Walk north on overworld |
| Mining Cave | Noob (default) | Walk to Mining Zone (west) |
| Pet Forest | Noob (default) | Walk to Forest Zone (south-west) |
| Roll Altar | Noob (default) | Walk to Roll Zone (east) |
| 1st Sea | Awesome | Walk to Port (south coast) |
| 2nd Sea | God | Walk to 2nd Port (south-east coast) |
| 3rd Sea | Heavens | Walk to 3rd Port (far east coast) |
| Beast Sea | Over Heavens | Walk to Beast Port (hidden) |
| Dungeons | God | Walk to Dungeon Entrance (north-east) |

Areas are locked visually in the overworld (grey zone with lock icon) until the required rank is reached.
Players can walk up to a locked zone but cannot enter it.

---

## 4. Mining System

Mining happens inside the **Mining Cave**, entered from the Mining Zone on the overworld.

### How Mining Works:
1. Player walks to a **Mining Node** (rock) inside the cave
2. Press **E** near a node to start mining
3. Mining takes **3 seconds** per strike (cooldown ring animation on node)
4. After the cooldown, `mineRandomOre()` is called and a random ore drops
5. A floating popup shows `+1 [Ore Name]` above the node
6. The ore is added to the player's Firestore document
7. `totalOresMined` counter increments by 1 (used for rank-up checks)

### Stamina:
- Player has **20 stamina** per cave session
- Each mine strike costs **1 stamina**
- Stamina does not regenerate inside the cave
- When stamina reaches 0, the player can no longer mine and must exit
- Stamina resets fully on next cave entry (no persistence between sessions)

### Mining Nodes:
- 3 mining nodes are placed inside the cave
- Each node has a visual health indicator
- Nodes do not deplete permanently — they reset every cave entry

---

## 5. Ore Types

| Ore | Rarity | Drop Rate | Emoji | Color |
|---|---|---|---|---|
| Stone | Common | 50% | 🪨 | Grey |
| Iron | Uncommon | 30% | 🔩 | Silver |
| Crystal | Rare | 15% | 💎 | Cyan |
| Mystic | Epic | 4% | 🔮 | Purple |
| Dark | Legendary | 1% | ⬛ | Dark |

Drop rates are weighted random. A single mine strike produces exactly 1 ore.

---

## 6. Pet Ball Types

Balls are used to catch wild pets. Higher-tier balls have better catch rates.

| Ball | Emoji | Catch Rate Multiplier | How to Obtain |
|---|---|---|---|
| Basic Ball | ⚪ | 1.0x | Craft (recipe below) |
| Iron Ball | ⚙️ | 1.5x | Craft |
| Crystal Ball | 🔵 | 2.5x | Craft |
| Mystic Ball | 🟣 | 4.0x | Craft |
| Dark Ball | ⚫ | 7.0x | Craft |
| **Exotic Ball** | 🌟 | **100% catch rate** | **Admin only — never craftable** |

### Exotic Ball Rule:
- The Exotic Ball has a guaranteed 100% catch rate on any pet, including legendary pets.
- It is **never obtainable through crafting, rolling, or any in-game mechanic**.
- It can only be added directly to a player's Firestore document by an admin.
- No UI button, recipe, or code path should ever grant an Exotic Ball to a player.
- This is a special admin/event reward only.

---

## 7. Crafting System

Crafting happens at the **Crafting Machine** inside the **Home Castle interior**.

### Recipes:

| Ball to Craft | Ingredients Required |
|---|---|
| Basic Ball | 5x Stone |
| Iron Ball | 2x Stone + 3x Iron |
| Crystal Ball | 3x Iron + 2x Crystal |
| Mystic Ball | 2x Crystal + 1x Mystic |
| Dark Ball | 2x Mystic + 1x Dark |

### Crafting Rules:
- Player must be inside the castle and near the crafting machine
- Press **E** to open the crafting menu
- If the player does not have the required ores, the craft button is disabled
- Successful craft: ores are deducted and ball count is incremented — single Firestore write
- No partial crafting — either the player has all ingredients or cannot craft
- No crafting queue — craft one ball at a time

---

## 8. Pet Catching System

Pet catching happens in the **Forest**, entered from the Pet Catching Zone on the overworld.

### Encounter Trigger:
- Walking through **tall grass zones** inside the forest triggers random encounters
- Encounter chance: **15% per second** while the player is inside a tall grass zone
- Encounters pause player movement and open the Pet Battle + Catch Modal

### Pet Battle Before Catching:

Before the player can throw a ball, they must battle the wild pet. This is required for all pets.

**Battle rules:**
- Player's active pet attacks the wild pet automatically (if player has a pet)
- If the player has no pet, they can only attempt to flee or throw a ball directly (with a catch rate penalty)
- Battle is turn-based and simplified: each turn, the player chooses **Attack**, **Throw Ball**, or **Flee**
- **Attack:** Reduces wild pet's HP (makes it easier to catch — lower HP = higher catch rate modifier)
- **Throw Ball:** Attempts a catch. Catch success depends on ball type, pet rarity, and wild pet's current HP
- **Flee:** Ends the encounter, no catch, no penalty
- If the wild pet faints (HP = 0), it **cannot be caught** — the encounter ends automatically with a small Zen Coin reward

### Catch Rate Formula:
```
catchChance = (ball.multiplier * rarityFactor * hpFactor) clamped to [0.05, 0.95]

rarityFactor:
  Common:    1.0
  Uncommon:  0.7
  Rare:      0.4
  Epic:      0.2
  Legendary: 0.05

hpFactor: (wildPet.maxHP - wildPet.currentHP) / wildPet.maxHP * 0.5 + 0.5
  (ranges from 0.5 at full HP to 1.0 at near-faint)

Exotic Ball overrides formula: always 1.0 (100% success)
```

### On Successful Catch:
- Pet is added to `players.pets[]` in Firestore
- `totalPetsCaught` increments by 1
- Rank-up check is triggered

---

## 9. Biomes

The overworld and sub-areas contain distinct biomes. Each biome has unique pets, encounters, and visual themes.

| Biome | Location | Unique Pets | Special Features |
|---|---|---|---|
| **Forest** | Pet Forest sub-area | Wood sprites, foxes, owls | Tall grass triggers encounters |
| **River / Waterfall** | Scenic overworld zone | Water spirits, fish creatures | Encounter trigger when entering river zone |
| **Desert** | Scenic overworld zone (south-east) | Sand golems, scorpion beasts | Rare crystal ore deposits |
| **Mountain** | Scenic overworld zone (north-east) | Stone giants, eagles | Mystic ore more common |
| **Volcano** | Future area (M8+) | Fire elementals, lava beasts | Dark ore more common |
| **Beast Sea** | Sea layer (Over Heavens rank) | Sea monsters, kraken spawn | Legendary pet encounters only |

### Biome Rules:
- Each biome has its own pet encounter table (different pets appear in different biomes)
- Pet rarity distribution varies by biome (e.g. Desert has more Rare, Mountain has more Epic)
- Biome visuals are distinct — no two biomes share the same tileset or color palette
- Scenic zones in the overworld are walkable but the encounter system only triggers inside sub-area layers

---

## 10. Pet Rarity System

| Rarity | Colour | Encounter Rate | Description |
|---|---|---|---|
| Common | Grey | 50% | Basic pets, low stats, easy to catch |
| Uncommon | Green | 28% | Slightly stronger pets |
| Rare | Blue | 15% | Notable pets with unique abilities |
| Epic | Purple | 6% | Powerful pets, hard to catch |
| Legendary | Gold | 1% | Extremely powerful, near-impossible to catch without high-tier balls |

### Pet Rules:
- Each pet has: `id`, `name`, `emoji`, `rarity`, `biome`, `maxHP`, `attack`, `caughtAt` timestamp
- A player can own unlimited pets (no storage cap in early milestones)
- Duplicate pets are allowed (same species caught multiple times)
- Pets are stored as an array in the Firestore player document
- Active pet (used in battles) is the first pet in the array, or player-selectable (future feature)

---

## 11. Armor System

> **Status: Planned (post-M7). Not yet implemented.**

Players can equip armor pieces that provide passive stat bonuses.

### Armor Slots:
- Head
- Chest
- Legs
- Boots
- Accessory (ring or amulet)

### Armor Tiers (aligned with ranks):
| Tier | Name | Unlock |
|---|---|---|
| 1 | Traveller's Gear | Noob |
| 2 | Iron Plate | Awesome |
| 3 | Crystal Mail | God |
| 4 | Mystic Robes | Heavens |
| 5 | Shadow Armour | Over Heavens |
| 6 | Dark Horizon Set | Dark Horizon |

### Armor Rules:
- Armor is found as loot in dungeons and seas — not craftable
- Armor provides bonuses to: mining speed, catch rate, Zen Coin multiplier, dungeon damage
- Only one piece per slot can be equipped at a time
- Armor is stored in Firestore under `players.armor` (not yet in schema — added when implemented)

---

## 12. Zen Coins Economy

Zen Coins are the primary in-game currency.

### Earning Zen Coins:
| Source | Amount |
|---|---|
| Mining (per ore found) | +2 to +20 (scales with ore rarity) |
| Catching a pet | +10 to +100 (scales with pet rarity) |
| Sea encounter win | +50 to +500 |
| Dungeon room cleared | +100 to +1000 |
| Daily login bonus | +50 (future feature) |
| Wild pet faints without catch | +5 (consolation) |

### Spending Zen Coins:
| Use | Cost |
|---|---|
| Standard Roll (at Roll Altar) | 100 coins |
| Premium Roll (at Roll Altar) | 500 coins |
| NPC Shop items (future) | Varies |
| Sea voyage fuel (future) | Varies |

### Roll Rewards:
| Reward | Tier | Roll Type |
|---|---|---|
| Small ore bundle | Common | Standard |
| Ball bundle | Common | Standard |
| Pet encounter token | Uncommon | Standard |
| Large ore bundle | Rare | Standard or Premium |
| Rare pet encounter token | Rare | Premium only |
| Zen Coin bonus (2x spin) | Uncommon | Either |
| Legendary encounter token | Legendary | Premium only |

### Rules:
- Zen Coins can never go below 0 (client and server must validate before spending)
- No player-to-player trading in current design
- Zen Coins are not a real-money currency — no IAP in current scope

---

## 13. Seas and Dungeons Progression

### Seas

Seas are entered by walking to a **Port Zone** on the overworld and setting sail. Each sea is a sub-layer with a nautical theme, encounters, and loot.

| Sea | Rank Required | Encounter Difficulty | Unique Pets | Notes |
|---|---|---|---|---|
| 1st Sea | Awesome | Easy | Sea birds, dolphins, small fish creatures | Tutorial sea, teaches sea mechanics |
| 2nd Sea | God | Medium | Coral creatures, sirens, storm elementals | Introduces weather events |
| 3rd Sea | Heavens | Hard | Ancient sea serpents, ghost ships | Rare armor loot |
| Beast Sea | Over Heavens | Extreme | Krakens, leviathans, elder sea dragons | Legendary pets only, massive coin rewards |

### Sea Rules:
- Seas are time-gated encounters: the player sails and encounters appear over time
- Combat in seas is automatic (active pet fights), player selects moves
- Winning an encounter gives loot (coins, ores, occasional ball drop)
- Losing an encounter returns the player to the port (no permanent penalty in early design)
- Sea progress is not saved between sessions (seas reset each entry)

---

### Dungeons

Dungeons are entered through **Dungeon Entrances** placed in the overworld. Each dungeon is a multi-room layer with a boss at the end.

| Dungeon | Rank Required | Floors | Boss | Loot |
|---|---|---|---|---|
| Ruins of the Lost Kingdom | God | 3 floors | Ancient Knight | Crystal/Mystic ores, armour tier 3 |
| Forgotten Sanctum | Heavens | 5 floors | Shadow Priest | Mystic/Dark ores, armour tier 4 |
| Citadel of Dark Horizons | Dark Horizon | 7 floors | Dark Overlord | Dark ores, armour tier 6, legendary pet encounter |

### Dungeon Rules:
- Dungeons are cleared floor-by-floor — the player fights rooms of enemies
- Each floor has 3–5 encounter rooms and 1 treasure room
- The treasure room gives guaranteed loot before the next floor
- Losing in a dungeon room exits the player back to the dungeon entrance (floor resets)
- Clearing a dungeon boss counts toward `totalDungeonsCleared` (rank-up check)
- Dungeons have a cooldown before they can be re-entered: 24 hours (future feature)

---

## 14. World Map Coordinates Reference

| Zone | Approx X | Approx Y | Type |
|---|---|---|---|
| Home Castle | 950 | 60 | Interactive |
| Mining Zone | 140 | 420 | Interactive |
| Pet Catching Area | 140 | 980 | Interactive |
| Roll Area | 1760 | 980 | Interactive |
| Waterfall | 860 | 420 | Scenic |
| River | 880 | 560 | Scenic |
| Mountains | 1620 | 140 | Scenic |
| Desert | 1500 | 1180 | Scenic |
| Player Spawn | 1100 | 320 | Spawn point |

World dimensions: **2200 × 1500 pixels**

---

*Last updated: 2026-06-26*
*Author: bharatpaints91-cell*
