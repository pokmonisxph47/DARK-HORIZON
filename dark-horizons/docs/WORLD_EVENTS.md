# WORLD_EVENTS.md — Dark Horizons: Legends of Lost Kingdoms

> Events are not scheduled content. They are things that happen to the world.
> The player's relationship to events should feel like discovery, not appointment.

---

## DESIGN PHILOSOPHY

World events in Dark Horizons fall into two categories:

**Emergent events** — generated from intersecting systems (weather + time + player actions). These are not scripted. They arise from the world's mechanics interacting. The player may not even realize they're in one.

**Scheduled events** — occur on real-world calendar logic (weekly Blood Moon, seasonal shifts). These are predictable, allowing players to prepare without being required to.

No event should feel mandatory. Missing an event should be disappointing — not punishing.

---

## TIER 1 — WEATHER-DRIVEN EVENTS

These events are triggered by weather states (see WEATHER_SYSTEM.md) and require no additional player action. They simply happen when the conditions align.

### EVENT: The Golden Hour

**Trigger:** Clear weather during the Morning phase's final 2 minutes
**Duration:** 2 minutes
**Frequency:** Every 40-minute cycle if Clear + Morning align

**What happens:**
- The entire overworld is bathed in gold-orange light
- Encounter rate: +15% for all diurnal pets
- Mining: +10% to all ore rates
- Visual: The Mirror Lake briefly reflects a perfect sunrise — usable as a "good photo spot" for future screenshot mechanic

**Player notification:** No announcement. The sky is visibly golden. That's the announcement.

---

### EVENT: The River Surge

**Trigger:** Rain weather lasting more than 15 minutes
**Duration:** While rain continues, plus 5 minutes after
**Frequency:** ~15% of all rain events are long enough to trigger

**What happens:**
- The river visual broadens (wider water CSS class activates)
- Waterfall sound increases to maximum volume
- Aquatic encounter rate in all river-adjacent zones: +40%
- The River Temple puzzle area becomes fully accessible (hint: the ghost lights lead more directly)

**Player notification:** Sound change is the tell. Alert players will notice the waterfall getting louder.

---

### EVENT: The Blood Moon Festival

**Trigger:** Blood Moon weather (weekly, server-scheduled)
**Duration:** 60 minutes
**Frequency:** Once per real-world week

**This is the biggest single event in the game.**

**Phase 1 — The Warning (15 minutes before):**
- The Roll Shrine begins glowing red
- Tal Rensh and Ravel Kost both take a specific position (Tal at the dock, Ravel at Dungeon 1) and won't move
- The Bell Tower rings once at the exact start of Blood Moon

**Phase 2 — The Moon (60 minutes):**
All Blood Moon effects from WEATHER_SYSTEM.md apply. Additionally:
- Every 10 minutes during Blood Moon, one random "rare event" triggers within the event:
  - The Shadowcrow appears at Crow Tower (Legendary, first 10 minutes)
  - The Dragon Skeleton's eyes glow and the Legendary Dragon encounter activates (minutes 10–20)
  - The Ancient Forest Guardian appears (minutes 20–30)
  - All five shrine Legendaries become active simultaneously (minutes 30–40)
  - The Dungeon 1 and 2 final floors have doubled Zen Coin drops (minutes 40–50)
  - The Oath Stone fully illuminates — reveals one piece of world lore regardless of crest count (minutes 50–60)

**Phase 3 — The Aftermath:**
- Weather normalizes
- All NPCs return to normal schedule
- Petra Vine records the event in a Blood Moon log (collectible: how many Blood Moons have occurred since the player's first login)

---

### EVENT: Meteor Strike (Minor)

**Trigger:** Meteor Shower weather (see WEATHER_SYSTEM.md)
**Duration:** 10–15 minutes
**Frequency:** 2% base probability at night

**What happens:**
- 1–3 "impact sites" appear at random accessible locations on the map
- Each impact site is a small glowing crater with a Meteor Crystal collectible
- The Dragon Skeleton encounter activates at Landmark #41

**Special rare trigger:** 5% chance during a Meteor Shower that one meteor "lands" near the Mountain Zone — leaving a temporary "meteor pool" crater that spawns unique pets for 20 minutes.

---

## TIER 2 — TIME-LOCKED EVENTS

Events that occur based on the day/night cycle phase (see DAY_NIGHT_SYSTEM.md).

### EVENT: The Fairy Ring Window

**Trigger:** Night phase, specifically the 15-minute window in the middle of Night
**Duration:** 15 minutes
**Frequency:** Every 40-minute cycle

**What happens:**
- The Fairy Ring (Landmark #13) glows at full amber intensity
- Any player standing in the Fairy Ring during this window has a 30% chance of a Fairy Sprite encounter (Rare) per minute
- A Fairy Sprite encounter here is the highest-rate Rare encounter in the game — designed to reward players who know the schedule

**Player notification:** The ring glows visibly from a distance at night. Players learn to watch for it.

---

### EVENT: The Midnight Silence

**Trigger:** Exactly midnight in the cycle
**Duration:** 3 seconds
**Frequency:** Every 40-minute cycle

**What happens:**
- All ambient sound stops
- The waterfall sound stops
- 3 seconds of complete silence
- Then everything resumes

This is a moment, not an event. It is designed to be noticed and never explained. The only reward is noticing it.

---

### EVENT: The Stone Circle Alignment

**Trigger:** Aurora weather during Night phase
**Duration:** Duration of Aurora weather
**Frequency:** ~1% chance at night (Aurora probability)

**What happens:**
- The Stone Circle (Landmark #14) becomes fully active
- Any player who enters the Stone Circle receives one free standard roll from the Roll Shrine
- The Stone Circle's inner area shows a specific star pattern that matches a constellation in the Archive Vault (future collectible link)

---

## TIER 3 — PLAYER-TRIGGERED EVENTS

Events that require specific player actions to activate. They're always there — but the player must discover them.

### EVENT: The Wandering Merchant

**Trigger:** Player visits a specific combination of landmarks in one play session
**Duration:** The merchant is available for 20 minutes after activation
**Frequency:** Once per play session (session = continuous login)

**What triggers it:**
The player visits the Fisherman's Rest (Landmark #34), the Desert Oasis (Landmark #60), and the Crow Tower (Landmark #11) in any order within the same session. On visiting the third landmark, a notification appears: "A traveler has been spotted near the Southern Crossroads."

**What the Wandering Merchant offers:**
- 3 random rare items at 50% of normal Zen Coin cost
- One guaranteed Exotic-tier crafting material (not Exotic Ball — material only)
- One piece of lore that Dr. Solaine or Elder Maerik can contextualize

**Design intent:** Reward players who explore broadly in a session rather than farming one location.

---

### EVENT: The Arena Challenge

**Trigger:** Player attempts to enter the Titan's Arena exterior
**Duration:** Active while the player is near the Arena
**Frequency:** Once per player per week

**What triggers it:**
Approaching the Titan's Arena entrance triggers Vira Coldstone to stop her pacing and face the player. She issues a timed challenge: "Clear a dungeon in under 10 minutes. You have one hour."

**If the challenge is completed:**
- Vira opens a side door to the Arena interior (visual preview only — the Arena interior is future content)
- A unique collectible cosmetic is awarded

**If the challenge fails or is ignored:**
- Vira resumes pacing
- Challenge resets next week

---

### EVENT: The Graveyard Vigil

**Trigger:** Player visits the Miner's Grave (Landmark #22) during the Night phase on the seventh night of their in-game activity
**Duration:** 5 minutes
**Frequency:** Once per player

**What happens:**
An ambient animation plays: the name inscribed on the Miner's Grave briefly glows. No encounter. No reward. Aria Vayne, if spoken to afterward, mentions she saw a light near the mine last night.

This is one of the game's small unexplained moments. It does nothing mechanically. It exists to give the world weight.

---

## TIER 4 — SEASONAL / CALENDAR EVENTS

Events tied to real-world calendar dates. These transform the world's visual appearance and add limited-time content.

### EVENT: Harvest Moon Season

**Real-world dates:** October (one month per year)
**Duration:** Full month

**World changes:**
- Autumn color palette: Terrain shifts to orange, gold, and red tones
- Fallen leaves particle system added to all forest zones
- Harvest-themed decorations in Castle Town (Loryn puts up decorations — she seems reluctant but does it every year)
- Seasonal pet spawn: Harvest Sprite (Uncommon) appears in all forest areas
- Seasonal collectible: 10 Pumpkin Lanterns hidden across the world

**Special events during Harvest Moon Season:**
- Nightly "trick or treat" mechanic: Visit each NPC at night and receive a small item (candy, lore text, a small Zen Coin amount)
- The Crow Tower: During October, an additional crow sits at the top of the tower. It has gold eyes. No explanation.

---

### EVENT: The Solstice Festival

**Real-world dates:** Two weeks around December 21 and June 21
**Duration:** Two weeks each

**Winter Solstice World changes:**
- Snow weather probability increased to 40%
- Festival lights added to Castle Town (Grend installs them — grumbling — every year)
- Seasonal pet: Winter Lantern (Rare glow-type) appears in the Castle Grove
- Seasonal collectible: 5 Solstice Tokens hidden across the world (redeemable with Petra for a cosmetic reward)
- The Crystal Fountain: Cycles through winter colors slowly

**Summer Solstice World changes:**
- Clear weather probability increased to 70%
- Flower festival decorations in the Butterfly Garden (Landmark #16)
- Seasonal pet: Summer Sprite (Uncommon) appears near the river
- Extended "golden window" during morning — 4 minutes instead of 2
- The Mirror Lake: Reflection quality enhanced — shows something the player cannot see from the ground level

---

### EVENT: Dark Horizon Anniversary

**Real-world date:** One week per year (developer-set anniversary of game launch)
**Duration:** One week

**What happens:**
- The sky at the eastern horizon darkens for the entire week — a visual reminder of the event
- The Horizon Stone (Landmark #92) pulses once per hour rather than once per day
- All five Kingdom Crest locations pulse simultaneously — if the player is anywhere in the world, they can feel the direction of the nearest crest (haptic/audio cue)
- Elder Maerik adds a new entry to the archive that year — each anniversary reveals one more detail about what actually happened 300 years ago

**Lore significance:** The anniversary events are the primary mechanism for delivering the game's deepest story. One piece per year, over multiple years. The game's story doesn't have an ending — it has an ever-lengthening history.

---

## TIER 5 — COMMUNITY EVENTS (MULTIPLAYER, M10+)

These events require multiple players and are not available until multiplayer systems are implemented.

### EVENT: The World Boss

**Trigger:** 5+ players in the same zone during Blood Moon
**What happens:** A world boss appears at the Zone's center. All players fight together. Loot is split based on contribution. Boss drops are unique — not available through any other mechanic.

### EVENT: The Titan's Arena Raid

**Trigger:** Vira Coldstone accepts a team of 4–6 players simultaneously
**What happens:** The Arena opens. A unique dungeon-style raid with team-required mechanics. Fastest clear time is posted on the notice board.

### EVENT: The Legendary Hunt

**Trigger:** Server-wide, once per month
**What happens:** Three Legendary pets appear in unusual locations (not their normal biomes). Players race to find and catch them first. Each player can catch only one. After all three are caught, the hunt ends and the locations are revealed on the notice board for lore purposes.

---

## EVENT NOTIFICATION SYSTEM

The game does not spam notifications. Players learn about events through:

1. **Environmental tells** — The world changes visually before an event begins
2. **NPC dialogue** — NPCs hint at upcoming events in their daily dialogue
3. **The Notice Board** — Loryn's board lists scheduled events (Blood Moon schedule, seasonal dates)
4. **Discovery** — The Wandering Merchant and player-triggered events have no announcements

The rule: if you have to tell the player an event is special, make it more special. The event should announce itself.

---

*WORLD_EVENTS.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
