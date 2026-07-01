# PET_ECOSYSTEM.md — Dark Horizons: Legends of Lost Kingdoms

> Pets are not collectibles. They are companions who happened to be in a world that broke.
> The player's job is to find them, understand them, and give them somewhere to belong.

---

## DESIGN PHILOSOPHY

The pet ecosystem in Dark Horizons is built on three principles:

1. **Discovery over grinding.** The best encounters come from being in the right place at the right time — not from farming the same spot for hours. Weather, time of day, rank, and location all intersect to create moments the player remembers.

2. **Every pet tells a story.** Each species has a reason for being where it is, a connection to the world's lore, and a personality suggested by its movement and idle animation.

3. **The collection is never complete.** There is always something new — a new biome, a weather combination the player hasn't tried, a Legendary they've never seen. The ecosystem should feel deep enough that even experienced players are occasionally surprised.

---

## RARITY TIERS

From GAME_RULES.md, verified and extended:

| Tier | Base Catch Rate | Population | Visual Indicator |
|---|---|---|---|
| Common | 60% | Abundant | Grey star |
| Uncommon | 35% | Frequent | Green star |
| Rare | 20% | Occasional | Blue star |
| Epic | 8% | Sparse | Purple star |
| Legendary | 2% | Extremely rare | Gold star |
| Shining | +10% on any tier | Variant of any | Sparkle effect on the star |

"Shining" variants are cosmetically distinct versions of any tier pet — brighter colors, shimmer effect on the sprite. They appear during Rainbow weather (see WEATHER_SYSTEM.md) and have unique name suffixes.

---

## CATCH MECHANICS

From GAME_RULES.md (battle before catch):

1. Player enters tall-grass zone or designated encounter area
2. Encounter chance: 15% per second while in the encounter zone
3. Encounter triggers: A pet appears and initiates a simplified battle sequence
4. After battle: Player selects a ball type to attempt the catch
5. Catch formula: `catch_chance = ball.base_rate * (1 - pet.rarity_modifier) * weather_modifier * time_modifier`

**Ball types and their base rates:**
- Standard Ball: 1.0× modifier
- Iron Ball (ore crafted): 1.4× modifier
- Crystal Ball (crystal ore crafted): 2.0× modifier
- Dark Ball (dark ore + specific recipe): 4.0× modifier
- Exotic Ball: Admin-only — guaranteed catch

---

## BIOME ENCOUNTER TABLES

### CASTLE GROVE (North Forest)
**Primary encounter zone for early-game players.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Woodland Sprite | Common | Any | Any |
| Forest Fox | Uncommon | Dawn, Dusk | Any |
| Tree Moth | Common | Night | Any |
| Bark Golem | Rare | Day | Clear |
| Dewdrop Fae | Uncommon | Morning | Rain |
| Crow Familiar | Rare | Any | Any |
| Ancient Sapling | Epic | Night | Any |
| Forest Guardian | Legendary | Night | Fog or Aurora |

### MINING CAVE
**Encounter zone for players who have reached the cave.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Cave Cricket | Common | Any | Any |
| Stone Mole | Common | Any | Any |
| Crystal Bat | Uncommon | Any | Any |
| Ore Serpent | Rare | Any | Any |
| Geode Crab | Rare | Midnight | Any |
| Dark Crawler | Epic | Midnight | Any |
| Crystal Golem | Epic | Any | Meteor Shower |
| Cavern Titan | Legendary | Midnight | Any |

### MOUNTAIN ZONE (Mid-game unlock)
**Requires Awesome rank. Harsh terrain, powerful pets.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Mountain Hawk | Common | Day | Clear, Cloudy |
| Stone Giant | Uncommon | Any | Any |
| Alpine Fox | Uncommon | Evening | Any |
| Thunder Hawk | Rare | Any | Storm |
| Peak Eagle | Rare | Day | Clear |
| Storm Elemental | Epic | Any | Storm |
| Mountain Spirit | Epic | Night | Aurora |
| Glacier Colossus | Legendary | Midnight | Any |

### SNOW BIOME (God rank unlock)
**Permanent snow region. Unique visuals and rare encounters.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Snow Hare | Common | Any | Any |
| Ice Sprite | Uncommon | Any | Any |
| Frost Fox | Uncommon | Evening, Night | Snow |
| Glacier Wolf | Rare | Night | Any |
| Snow Griffin | Rare | Morning | Clear |
| Ice Sculptor | Epic | Any | Any |
| Aurora Wisp | Legendary | Midnight | Aurora |
| Eternal Frost | Legendary | Any | Blood Moon + Snow |

### DESERT BIOME (Heavens rank unlock)
**Harsh, hot, no water. Different ruleset: encounters spawn in shade zones.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Sand Runner | Common | Day | Clear |
| Dust Sprite | Common | Any | Any |
| Desert Fox | Uncommon | Night | Any |
| Oasis Bird | Uncommon | Any | Rain |
| Sand Worm | Rare | Midday only | Clear |
| Mirage Hound | Rare | Day | Clear |
| Sphinx Cub | Epic | Day | Clear, Cloudy |
| Desert Phantom | Legendary | Night | Fog |

### SWAMP BIOME (God rank unlock)
**Dark, slow. Highest encounter density. Many nocturnal pets.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Bog Toad | Common | Any | Any |
| Swamp Sprite | Common | Any | Fog |
| Marsh Hound | Uncommon | Night | Any |
| Mud Golem | Uncommon | Any | Rain |
| Ghost Light | Rare | Night | Fog |
| Shadow Hound | Epic | Night | Fog |
| Bog Ancient | Epic | Any | Rain |
| Willow Wraith | Legendary | Midnight | Fog |

### EAST COAST / BEACHES
**Accessible from early game. Sea-adjacent encounter table.**

| Pet | Rarity | Time Condition | Weather Condition |
|---|---|---|---|
| Shore Crab | Common | Day | Any |
| Tide Sprite | Common | Any | Any |
| Sea Gull | Uncommon | Morning, Day | Clear |
| Coral Fish | Uncommon | Any | Rain |
| Starfish Golem | Rare | Night | Any |
| Wave Rider | Rare | Any | Storm |
| Sea Phantom | Epic | Night | Storm |
| Harbor Titan | Legendary | Night | Blood Moon |

### SEA LAYERS (Sea 1 / 2 / 3 / Beast)
**Unlocked by rank and quest. Sea-exclusive pets.**

Sea 1 pets: Calm-water species, Uncommon maximum common on-world
Sea 2 pets: Rare minimum, sea creature aesthetics
Sea 3 pets: Epic minimum, ancient ocean creatures
Beast Sea: Legendary-only, no standard encounters

---

## PET EVOLUTION TIERS

From GAME_RULES.md plus expansion:

All pets have three tiers. Tier 1 is the caught form. Tier 2 requires specific materials. Tier 3 requires Tier 2 plus a rare catalyst.

**Generic evolution path:**
- Tier 1 → Tier 2: 50 Stone Ore + 25 Iron Ore + 100 Zen Coins
- Tier 2 → Tier 3: 50 Crystal Ore + 10 Mystic Ore + 500 Zen Coins
- Special pets (Legendary): Tier 3 requires 1 Dark Ore + 1000 Zen Coins

**Evolution visual change:** Each tier changes the pet's sprite — it grows larger, more detailed, and gains elemental visual effects (a Forest Fox gains a more complex tail pattern; a Crystal Bat gets larger wings with crystal veins).

**Dr. Solaine's role:** She identifies which of the player's pets are "exceptional specimens" — pets with slightly higher than average base stats. Worth knowing before investing in evolution.

---

## PET BEHAVIOR IN THE WORLD

Pets accompany the player on the world map. A maximum of one pet is displayed (the player's "active" companion). Visual design:

- Small sprite following 1–2 tiles behind the player
- Idle animation when player stands still: the pet looks around, sits, or does a species-specific idle
- Rare animation: Every 2–5 minutes of standing still, the pet does a unique "personality" animation
- Player enters a tall-grass zone: The pet becomes more alert (ears up, eyes wider — the encounter zone visual cue)

**Pet personality archetypes:**
- Curious: Looks at off-screen things, approaches the camera
- Loyal: Stays very close to the player, sits when the player stops
- Proud: Walks with head up, ignores camera
- Playful: Small bouncing motion, spins occasionally
- Ancient: Slow, deliberate, dignified. Bows slightly at shrines.

---

## LEGENDARY PET ENCOUNTERS — DETAILED DESIGN

Legendaries don't just appear when the encounter triggers. They announce themselves.

**Pre-encounter behavior:**
- The pet appears at the edge of the encounter zone
- It observes the player for 3–5 seconds
- Ambient sound shifts (the area goes slightly quieter)
- The encounter trigger: The Legendary either approaches the player or disappears and the player must chase it to the correct position
- If the player moves too quickly: The Legendary vanishes and doesn't reappear for 10 minutes

**Catch attempt behavior:**
- Standard catch formula but the Legendary has a visible "resistance" — the ball shakes three times before settling
- If the catch fails: The Legendary retreats but doesn't despawn — it stays in the zone for a second attempt (reduced rate)
- After two failed attempts: The Legendary leaves for 15 minutes

**The five shrine Legendaries (see LANDMARKS.md #80–84):**
Each is tied to a specific shrine location. Encounter only possible after completing the shrine's environmental puzzle. Once caught, the shrine's glow dims — it remembers the catch.

---

## PET STORAGE SYSTEM

From GAME_RULES.md: Pets are stored in `users/{uid}` as an array in the `pets` field.

**Expanded design for PET_ECOSYSTEM:**
- Maximum active team: 6 pets (stored locally for quick access)
- Pet box: Unlimited additional storage (Firestore array)
- Pet display: In the player profile, the 6-team is shown with tiers and rarity stars
- Pet trading: Reserved for multiplayer milestone (M10+)

**Dr. Solaine's Appraisal system (implementation M8+):**
Each pet has hidden stat modifiers (±20% on base stats). Dr. Solaine's appraisal reveals these as a letter grade (S/A/B/C/D). Players can choose to release D-grade pets for a small Zen Coin refund.

---

## PET ECOSYSTEM HEALTH DESIGN

The ecosystem should feel inhabited rather than mechanical. Design constraints:

1. **No dominant spawn location.** The best pets should be spread across biomes so players visit the whole world.
2. **No single optimal strategy.** Weather + time combinations reward players who vary their play sessions.
3. **Dead time avoidance.** If a player has been walking for 5+ minutes without an encounter, the encounter rate temporarily increases (max 3 minutes of boosted rate, then resets). Players should never feel like nothing is happening.
4. **The surprise encounter.** Roughly 1% of all encounters are "misplaced" — a species that normally spawns in a different biome appears somewhere unexpected. These are always higher rarity and are tracked as unique entries in Dr. Solaine's compendium.

---

*PET_ECOSYSTEM.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
