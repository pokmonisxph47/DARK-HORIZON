# WEATHER_SYSTEM.md — Dark Horizons: Legends of Lost Kingdoms

> Weather is not decoration. Every weather state changes what is possible in the world.
> Weather should make players think: "I should log in now" or "I should wait for this."

---

## DESIGN PHILOSOPHY

Weather occurs in real-time and affects the current overworld session. It transitions smoothly (not instant cuts). Players can see weather changing on the horizon before it arrives — a darkening sky, rising particles, shifting light quality.

Weather does not affect performance. All weather effects are CSS overlay animations on the world canvas. No additional rendering passes.

**Implementation path:** Weather is a CSS class on the world container. The current weather state is a React context value. Components read the weather context to adjust their behavior (encounter rates, visual overlays, etc.).

---

## WEATHER 1 — CLEAR (SUNNY)

**Frequency:** 40% base probability
**Duration:** 20–40 minutes real time

**Visuals:**
- Full brightness terrain and zone colors
- No overlay on the world canvas
- Shadows visible under trees (subtle CSS gradient under forest patches)
- The Mirror Lake reflects the blue sky

**Sound design:**
- Ambient birdsong (layered audio — high-frequency, organic, sporadic)
- Light wind in the grass
- Distant waterfall sound
- No weather-specific music layer — base overworld music only

**Gameplay effects:**
- Baseline encounter rates (no bonus or penalty)
- Mining: Normal ore rates
- Zen Coin earnings: Normal
- All biomes accessible

**Pet spawn changes:**
- Day/Sunny: Maximum diurnal pet activity. Hawks, foxes, woodland sprites active
- All standard encounters available
- Mirage Lake appears in the desert (collectible puzzle accessible)

**Resource bonuses:**
- None — Sunny is the baseline. Other weathers either boost or add restrictions.

---

## WEATHER 2 — CLOUDY (OVERCAST)

**Frequency:** 20% base probability
**Duration:** 15–30 minutes

**Visuals:**
- Sky overlay: Semi-transparent dark grey gradient across the top 30% of viewport
- Terrain colors desaturated slightly
- Zone marker glows slightly brighter to compensate
- Shadows under forests disappear

**Sound design:**
- Wind increases slightly (frequency and volume)
- Birdsong reduces by half
- Some birds go quiet entirely

**Gameplay effects:**
- Encounter rates: Unchanged
- Mining: +5% chance of Iron ore (clouds suppress magic ore detection but shift the distribution)
- Visual: Easier to see glowing collectibles (no sun glare)

**Pet spawn changes:**
- Crepuscular pets (foxes, owls) appear in the overworld scenic zones during Overcast day — they mistake the dim light for dusk
- Cloudy triggers the transition from day to dusk earlier in the cycle

**Resource bonuses:**
- Overcast + Walking through river zone: Increases Water Spirit encounter chance by 10%

---

## WEATHER 3 — RAIN

**Frequency:** 15% base probability
**Duration:** 10–25 minutes

**Visuals:**
- Rain particle system: Downward-moving vertical grey-blue particles, density: medium
- Screen shimmer overlay (water on lens effect — subtle CSS filter)
- Terrain darkens (wet ground effect — darker CSS class on terrain patches)
- Water zones (river, waterfall) animate with higher intensity — wider waterfall sheet, faster river particles
- Puddle reflections appear on paths

**Sound design:**
- Rain on leaves (soft crackle)
- Rain on stone (sharper tap)
- Waterfall roar increases
- Base overworld music slows BPM slightly and shifts to minor key variant

**Gameplay effects:**
- Player movement speed: -10% (soft ground, cautious walking)
- Encounter chance: +20% in all tall-grass and forest areas (pets emerge in rain)
- Mining stamina: Regenerates 1 point per 2 minutes (rain cools the cave exit, allowing partial rest)
- River encounter chance: +25% (fish creatures surface in rain)

**Pet spawn changes:**
- Aquatic pets emerge to all river-adjacent zones
- Bog Creatures appear at the swamp border
- Desert encounter rate: -50% (desert creatures shelter in the rain)
- Oasis: Rare water birds appear at the Oasis during Rain — unique encounter

**Resource bonuses:**
- Crystal ore drop rate: +8% (rain enhances crystal formation detection)
- Wishing Pool: Coins in pool increase after rain (visual only, but collectible yield improves)

---

## WEATHER 4 — STORM

**Frequency:** 8% base probability
**Duration:** 8–15 minutes

**Visuals:**
- Heavy rain particles (high density, diagonal — wind-driven)
- Lightning flash effect: Brief full-screen white flash every 30–90 seconds
- Thunder visual: Screen trembles slightly after lightning
- All zone marker glows pulsing (electrical interference)
- Crow Tower birds all lift at first lightning strike

**Sound design:**
- Heavy rain (loud, constant)
- Thunder (deep, physical-feeling)
- Wind howl
- Base music replaced entirely by a Storm Track: percussion-heavy, urgent

**Gameplay effects:**
- Roll Shrine: Premiums rolls get +1 bonus item during storms (fate is active in electrical weather)
- Sea voyages: Cannot be started during storms — ports are sealed (rough water)
- Encounter rate: +35% everywhere (creatures flee the storm into player paths)
- Mining stamina: Instantly refills at cave entrance (storm coolness)
- Player visibility: Reduced (some distant landmarks obscured)

**Pet spawn changes:**
- Storm Elementals (Epic) — appear in the mountain zone only during storms
- Thunder Hawks (Rare) — appear near the Hanging Cliff during storms
- Sea creatures push inland (all coastal zones get aquatic pet encounters during storms)

**Resource bonuses:**
- Mystic ore rate: +15% (Mystic ore responds to electrical fields)
- Roll Shrine: One guaranteed additional common-tier item per premium roll during storm

---

## WEATHER 5 — FOG

**Frequency:** 7% base probability
**Duration:** 20–45 minutes

**Visuals:**
- Dense white-grey fog overlay: 60% opacity starting from left/right edges, building toward center
- Visibility cone: Player can see clearly for ~200px in all directions. Beyond that: fading into fog
- Zone markers invisible until within 150px
- Landmarks invisible beyond 300px
- Minimap: Zone labels hidden (minimap still shows player position)

**Sound design:**
- Complete silence. No birds. No wind. No waterfall.
- Footstep sounds louder and more distinct (they're the only sounds)
- Occasional distant sound — impossible to identify, direction unclear

**Gameplay effects:**
- Navigation: Players must navigate by memory and landmark proximity
- Encounter rate: +40% in swamp (swamp creatures thrive in fog)
- Encounter rate: +10% everywhere else
- Mining: Unaffected (cave has no fog)
- Dungeon entrances: Glow strongly visible through fog — easier to find

**Pet spawn changes:**
- Swamp pets appear in forest-adjacent zones during fog (they follow the fog from the swamp)
- Shadow Hounds (Epic swamp pet) — overworld appearance chance during fog
- Undead Spirits appear at the graveyard-adjacent landmarks (Miner's Grave, War Memorial Wall)
- Fog uniquely enables the Dead Willow's Legendary encounter (Willow Wraith)

**Resource bonuses:**
- Secret areas: All hidden zones temporarily visible as a faint glow through the fog
- Ghost Lights in the swamp: More active during fog — lead more clearly toward River Temple

---

## WEATHER 6 — SNOW

**Frequency:** 5% base probability (increases to 25% when in Snow Biome zone)
**Duration:** 15–30 minutes
**Note:** Snow weather in the overworld is different from the permanent snow of the snow biome. Overworld snow is a weather event.

**Visuals:**
- Snow particle system: Slow downward drift of white particles (larger than rain, slower)
- Terrain hue shifts blue-white in grassy areas
- Trees gain white cap CSS class
- Waterfall's mist zone gets ice particle addition
- Bridges show frost texture overlay

**Sound design:**
- Wind is muffled (snowfall absorbs sound)
- Footstep sounds softer
- Music: Slow, melodic piano-and-strings layer added to base overworld music

**Gameplay effects:**
- Player movement: -5% (snow underfoot)
- Mining stamina: Recovers 2 points per minute outside the cave
- Desert encounter rate: 0% (desert creatures go underground completely)
- Roll Shrine: Standard rolls get +1 bonus item (snow is considered lucky in Solaran tradition)

**Pet spawn changes:**
- Ice creatures from the snow biome appear in the mountain zone
- A unique overworld-only Snow Wisp (Uncommon) appears only during snow weather in the castle grove
- Fairy Ring (landmark): Snow during Fairy Ring hours triggers a rare event — the ring glows under snow and a Snow Sprite appears (unique timing encounter)

**Resource bonuses:**
- Stone ore rate: +10% (cold contracts rock, exposing more ore veins)
- All waystones: Crystal visual upgrade during snow (enhanced visual feedback)

---

## WEATHER 7 — METEOR SHOWER

**Frequency:** 2% base probability, always at night
**Duration:** 10–15 minutes

**Visuals:**
- Streaks of light moving from upper-right to lower-left across the sky layer
- Each meteor leaves a brief fade trail (CSS animation)
- Occasional large meteor: brighter, longer trail, brief ground-level flash
- If the large meteor "hits" near the Titan's Arena zone: a dust cloud effect appears

**Sound design:**
- Faint whistling as meteors pass
- Occasional deep impact sound for large meteors
- Music: Celestial track — ethereal, spacious, choir elements

**Gameplay effects:**
- Rare resource event: 1–3 "meteor crystals" appear on the ground at random positions (collectible one-time, despawn when weather ends)
- Roll Shrine: Legendary encounter token dropped at 3× normal rate
- Mining cave: Two bonus nodes appear temporarily inside the cave (additional ore capacity for the duration)

**Pet spawn changes:**
- Cosmic pets (future expansion — Sky Archipelago type) appear during Meteor Shower
- Crystal Golems (mountain zone) get a +50% encounter rate boost
- The Dragon Skeleton (Landmark #41): During Meteor Shower, the eye sockets glow — Legendary Dragon pet encounter triggers here

**Resource bonuses:**
- Dark ore rate: +20% for duration of meteor shower (meteor energy temporarily activates dark ore veins)
- Meteor Crystals: 3 guaranteed collectibles placed at random accessible locations

---

## WEATHER 8 — BLOOD MOON

**Frequency:** Once per real-world week (fixed time schedule, server-determined)
**Duration:** 60 minutes
**Note:** This is the most significant weather event. Players should feel the world change.

**Visuals:**
- Sky color: Deep blood red replacing the normal night sky
- All ambient light tinted dark crimson
- Zone markers glow with red instead of their normal color
- The Crow Tower birds lift and circle for the entire event
- Scarecrow Field (Landmark #44): One scarecrow moves during Blood Moon
- Mirror Lake: Reflects not the sky but the player's maximum power level
- All five Eternal Lamps burn red
- The lanterns in the swamp's Lantern Graveyard burn red

**Sound design:**
- The Bell Tower rings once — audible from everywhere in the world
- Base music replaced with Blood Moon Track: Intense, driving, ancient-feeling drums with deep strings
- All ambient wildlife sound stops immediately at Blood Moon start

**Gameplay effects:**
- Encounter rate: +100% everywhere (doubled)
- All rare and epic pet encounter rates: +50% on top of that
- Legendary pets: 3× normal appearance chance
- Mining: All ore types shift up one rarity tier (Stone → Iron, Iron → Crystal, Crystal → Mystic, Mystic → Dark — distribution temporary)
- Roll Shrine: Legendary encounter tokens for both standard and premium rolls guaranteed
- Sea voyages: Banned — ports sealed (seas are unstable during Blood Moon)
- Dungeon entrance interaction: The sealed Colosseum trembles as if something inside is active

**Pet spawn changes:**
- Night-only and shadow-type pets appear in all biomes
- Shadowcrow (unique Legendary) — appears at the Crow Tower once during Blood Moon
- Dragon Skeleton Legendary encounter activates
- Forest: Ancient Forest Guardian appears in the Guardian Tree clearing
- All five shrine Legendary encounter triggers are active simultaneously

**Resource bonuses:**
- Everything is elevated during Blood Moon
- Zen Coin earnings: +100% for all sources during the event
- The Oath Stone's final slot glows during Blood Moon — if the player is Dark Horizon rank, it activates a lore reveal

---

## WEATHER 9 — RAINBOW

**Frequency:** 3% base probability, always immediately after Rain or Storm ends
**Duration:** 5–10 minutes (short but memorable)

**Visuals:**
- A rainbow arc visible across the top of the sky
- All terrain returns to full saturation with enhanced brightness
- Water zones sparkle with additional reflection particles
- The Crystal Fountain in Castle Town cycles colors faster

**Sound design:**
- Brief triumphant musical sting as rainbow appears
- Then gentlest overworld music variant — the most peaceful version
- Birdsong returns at maximum volume

**Gameplay effects:**
- All catch rates: +10% (legendary catch rate floor raised from 0.05 to 0.10)
- Crystal ore rate: +15%
- Zen Coin earnings: +25%

**Pet spawn changes:**
- Rainbow Sprite (unique Rare) — appears only during Rainbow weather, in the butterfly garden area
- All pets encountered during Rainbow have +10% chance of being "shining" variant (cosmetic difference — brighter coloring, unique name suffix)

**Resource bonuses:**
- The Wishing Pool (Landmark #38): Rainbow alignment with the pool doubles the Coin-throw reward (1-in-5 instead of 1-in-10 for doubling)
- Hidden chests: Any undiscovered hidden chest has its location briefly suggested by a rainbow particle cluster above it

---

## WEATHER 10 — AURORA

**Frequency:** 1% base probability, only at night
**Duration:** 20–40 minutes

**Visuals:**
- Rippling curtains of colored light in the sky: green, cyan, purple, gold
- The lights are animated — moving slowly in wave patterns
- All glowing objects in the world (lanterns, waystones, Crystal Fountain) pulse in sync with the aurora
- The Snow Biome's Sky Mirror (Landmark #68) reflects the aurora perfectly
- The Star Circle in the north forest activates: moonlight alignment triggers at the stone circle

**Sound design:**
- All normal ambient sounds replaced with a single held tone — not music, but the sound of the world resonating
- The main music is replaced with a 4-minute piece featuring a solo instrument (proposed: cello or solo violin) against a slow, rising string arrangement

**Gameplay effects:**
- The Stone Circle (north forest, Landmark #14) activates: any player in the stone circle during Aurora gets a once-per-aurora bonus roll (free roll, standard tier)
- Flying pets gain +20% stats for the duration (future mechanic)
- All legendary pet encounters: +100% chance (they appear twice as often)
- Dungeon 3: The Citadel entrance glows during Aurora — its lore text changes to reference the aurora as a sign

**Pet spawn changes:**
- Aurora Wisp (unique Legendary) — appears only during Aurora weather, anywhere in the snow biome or mountain zone
- Celestial Butterfly (unique Epic) — appears only during Aurora at the Butterfly Garden
- All sky and aerial pets: double appearance rate

**Resource bonuses:**
- Dark ore rate: +25% during Aurora (the same energy that causes Aurora enhances dark ore)
- Mystic ore: +20%
- All Waystones: Fast travel is free (no Zen Coin cost if using the proposed cost system) during Aurora

---

## WEATHER SYSTEM IMPLEMENTATION NOTES

**State management:**
```typescript
type WeatherType =
  | "sunny" | "cloudy" | "rain" | "storm"
  | "fog" | "snow" | "meteor-shower"
  | "blood-moon" | "rainbow" | "aurora"

interface WeatherState {
  current: WeatherType;
  startedAt: number;          // timestamp
  endsAt: number;             // timestamp
  transitionProgress: number; // 0–1
}
```

**CSS class pattern:**
```
<div className={`world-canvas weather-${currentWeather}`}>
```

Each weather type applies a `.weather-*` class to the world canvas that activates the appropriate overlay, particle, and color-filter CSS.

**Encounter rate modifier:**
Weather modifiers are multiplicative with base encounter rates. Each weather exports an `encounterModifier` value that the encounter system multiplies against the base 15%-per-second chance.

**Server authority:**
Weather state is server-determined (stored in Firestore as a world-level document) so all players experience the same weather simultaneously. Client uses the server state and does not generate weather locally.

---

*WEATHER_SYSTEM.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
