# SOUND_DESIGN.md — Dark Horizons: Legends of Lost Kingdoms

> Sound design is the layer the player feels but rarely thinks about.
> When the sound is right, the world is real. When it's wrong, nothing else works.

---

## DESIGN PHILOSOPHY

Dark Horizons uses a layered audio approach. At any moment, the player is hearing:

1. **The world ambience** — background sounds that establish the location
2. **The music** — adapts to zone, time, and event
3. **The event layer** — weather, world events, encounters
4. **The UI layer** — feedback sounds for interactions

These layers are independent and additive. Adding a storm shouldn't mute the wildlife — it should layer over it. Music should never fully override ambient sound.

**The goal:** Players should be able to close their eyes and know what part of the world they're in.

---

## MUSIC SYSTEM

### Architecture

The music system uses layered tracks ("stems") rather than full songs. This allows smooth adaptation to game state without jarring crossfades.

**Stem structure:**
- **Base stem:** Always playing. Establishes the emotional tone of the current region.
- **Activity stem:** Overlaid when the player is actively doing something (mining, in an encounter zone).
- **Event stem:** Overlaid during events (Blood Moon, Aurora, Storm).
- **Time stem:** Subtle additions based on time of day.

Stems are mixed in real-time. Total mix never exceeds 3 simultaneous stems.

---

### OVERWORLD MUSIC TRACKS

#### 1. The World Theme (Default)
**Mood:** Nostalgic, open, gently melancholic
**Duration:** 8-minute loop
**Instrumentation:** Acoustic guitar, light strings, soft piano, very distant choir
**When:** Overworld, during Day phase, Clear or Cloudy weather, no events

This is the music players will hear most. It should be the kind of piece that players don't consciously hear for the first 20 minutes, then quietly find themselves humming. It should have space — silence is part of the melody.

**Regional variations (Activity stems added to World Theme base):**
- Forest variation: Light woodwind countermelody, more bird-like textures
- Mountain variation: Deeper strings, occasional brass accent, wider stereo field
- Coastal variation: Light xylophone, gentle percussion (like waves on rocks)
- Desert variation: Sparse, more space between notes, soft wind instrument texture

#### 2. The Morning Theme
**Mood:** Hope beginning, quiet energy
**Instrumentation:** Starts solo flute or harp over silence, strings join gradually
**When:** Morning phase only

#### 3. The Evening Theme
**Mood:** Reflection, warmth of things ending well
**Instrumentation:** Piano leads, strings support, volume lower than Day Theme
**When:** Evening phase only

#### 4. The Night Theme
**Mood:** Mystery, quiet wonder, presence of things unseen
**Instrumentation:** Piano alone, very sparse. Long silences. When strings enter: single cello, not section.
**When:** Night phase

#### 5. The Midnight Theme
**Mood:** The world held still. The old darkness listening.
**Instrumentation:** A single sustained tone (not melodic — more like a voice). Then 3-second silence at midnight. Then tone resumes.
**When:** Midnight phase

---

### EVENT MUSIC TRACKS

#### 6. The Storm Track
**Mood:** Urgency, power, exciting danger
**Instrumentation:** Percussion-driven, full brass, driving rhythm
**When:** Storm weather. Replaces World Theme entirely.

#### 7. The Blood Moon Track
**Mood:** Ancient, ceremonial, slightly wrong
**Instrumentation:** Deep drums, slow dark strings, occasional dissonant horn
**When:** Blood Moon weather. Replaces all other music.
**Note:** The Blood Moon Track should sound like something that has been played every Blood Moon for 300 years. Ritual. Known.

#### 8. The Fog Track
**Mood:** Silence and something in the silence
**Instrumentation:** Ambient pads, no clear melody, very low frequency foundation
**When:** Fog weather

#### 9. The Aurora Track
**Mood:** Sublime, vast, humbling
**Instrumentation:** Solo cello over rising strings. No percussion. 4-minute piece, not looped — plays through once, then holds a very quiet ambient tone until Aurora ends.
**When:** Aurora weather

#### 10. The Snow Track (overlay)
**Mood:** Peaceful, isolated, beautiful
**Instrumentation:** Slow piano, sparse strings. Applied as an overlay to existing tracks.
**When:** Snow weather (adds to the existing ambient track rather than replacing)

---

### DUNGEON MUSIC TRACKS

#### 11. Dungeon 1 — The Iron Vaults
**Mood:** Tense exploration, contained danger
**Instrumentation:** Low strings, cautious percussion, dripping water sounds incorporated as rhythm

#### 12. Dungeon 2 — The Crystal Labyrinth
**Mood:** Disorientation, alien beauty, deeper fear
**Instrumentation:** High strings, inverted chord progressions, crystal bell textures

#### 13. Dungeon 3 — The Dark Citadel
**Mood:** Very old, very cold, something that knows you're there
**Instrumentation:** Drone foundation, a melody in a minor key that almost resolves — then doesn't. Over and over.

#### 14. Dungeon Boss Encounter
**Mood:** Immediate danger, full focus
**Instrumentation:** Full orchestra, driving tempo, builds throughout encounter
**Duration:** Loops. Increases in energy if encounter goes past 5 minutes.

---

### SEA MUSIC TRACKS

#### 15. Sea 1 — First Voyage
**Mood:** Wonder, adventure, the horizon is possibility
**Instrumentation:** Oceanic — steel drums, light percussion, bright strings

#### 16. Sea 2 — Deeper Waters
**Mood:** Respect, the ocean is larger than expected
**Instrumentation:** Lower register, more strings, less percussion

#### 17. Sea 3 — Ancient Lanes
**Mood:** History, the old trade routes remember the ships that used to travel them
**Instrumentation:** Solo flute over very slow, deep strings

#### 18. The Beast Sea
**Mood:** Something is here that is not here for us
**Instrumentation:** Almost silent. Occasional very deep bass note. Long pauses.

---

## AMBIENT SOUND LIBRARY

### Zone Ambience

Each zone has a base ambient loop that defines its character.

| Zone | Primary Sounds | Secondary | Special |
|---|---|---|---|
| Overworld (open) | Wind in grass, distant birdsong | Rustling | — |
| Castle exterior | Wind around stone, crows | Distant bell (faint) | Bell strike on Blood Moon |
| Castle interior | Interior silence, fireplace crackle | Stone echo | — |
| Castle Town | Town bustle, distant NPC chatter | Cart wheels | Market sounds in day |
| Forest | Dense birdsong, leaf rustle | Owl at night | Rain amplified on leaves |
| Cave | Dripping water, deep silence | Crystal resonance | Mining strikes |
| River | Water flow, waterfall roar | Frog calls at night | Louder in rain |
| Waterfall | Roaring water | Spray mist sound | Even louder at night |
| Desert | Dry wind, sand hiss | Hawk calls | Intense silence at midday |
| Snow | Wind, deep cold quiet | Ice creak | Snow crunch underfoot |
| Swamp | Frog choir, bog bubble | Mosquito drone | Ghost Light hum |
| Mountain | Altitude wind, rock falls | Eagle calls | Thunder approach in storm |
| Sea | Waves, hull creak | Distant horn | Storm surge |

### Time-of-Day Ambient Adjustments

| Phase | Sound Adjustment |
|---|---|
| Morning | Birds at maximum, transition from night calls to day calls |
| Day | Full ambient, all sounds at base level |
| Evening | Day birds fade, evening birds emerge, wolf call at phase end |
| Night | Night insects, owl hoots, footstep sounds louder (silence amplifies them) |
| Midnight | Near silence. Wind reduced. The world holds its breath. |

### Weather Ambient Layers (added on top of zone ambience)

| Weather | Added Sounds |
|---|---|
| Rain | Rainfall on terrain (grass vs stone vs water have different sounds), water drips |
| Storm | Heavy rain, thunder (distance variable), wind howl, lightning crack |
| Fog | Complete ambient silence — fog absorbs all sound. Footsteps only. |
| Snow | Muffled everything, soft snow crunch on footsteps |
| Blood Moon | Wildlife completely silent. Only drums. |
| Aurora | Sustained resonance (not quite a sound — more like the air vibrating) |

---

## UI SOUND DESIGN

### Interaction Sounds

| Action | Sound |
|---|---|
| Open menu | Soft stone slide |
| Close menu | Stone settle |
| Button confirm | Clear tone (Aethermount bell quality) |
| Button cancel | Lower, duller tone |
| Zone entry | Brief chime (zone-type specific) |
| NPC dialogue open | Character-specific tone (see below) |
| Item received | Light sparkle |
| Zen Coin spend | Light clink |
| Quest complete | Warm chord (strings) |
| Rank up | Full chord + bell (major key, 3 seconds) |

### NPC Voice Tones

Each NPC has a distinct "voice tone" — a short musical sound that plays when their dialogue opens. Not voice acting — a personality through sound.

| NPC | Tone | Description |
|---|---|---|
| Aria Vayne | Quick ascending flute | Curious, quick |
| Cass Orin | Warm low woodwind | Friendly, unhurried |
| Grend Voss | Single low drum | Solid, no-nonsense |
| Dr. Solaine | Rapid piano notes | Rapid thought |
| Ravel Kost | No tone. Silence, then a low string note. | Deliberate, slightly unsettling |
| Loryn Ashvale | Crisp bell | Efficient |
| Tal Rensh | Ship bell in distance | Always far away, always steady |
| Elder Maerik | Deep, resonant tone (like a large book closing) | Patient, old |
| Vira Coldstone | Sharp brass note | Ready for anything |
| Jed Farren | Bright whistle | Excited, outdoorsy |
| Petra Vine | Light chime | Precise, delighted |

### Pet System Sounds

| Event | Sound |
|---|---|
| Encounter triggered | Low rumble + the pet's species sound |
| Catch attempt | Ball sound (bounce, spin) |
| Successful catch | Triumph tone (tier-appropriate volume) |
| Failed catch | Low "miss" tone |
| Pet released | Sad but resolved chord |
| Legendary encounter | Silence for 2 seconds. Then the full encounter sound. |

---

## MINING SYSTEM SOUNDS

The mining sequence has its own sound design:

- **Swing:** Pickaxe strike sound (ore-type specific)
  - Stone: Dull thud
  - Iron: Ring of metal on ore
  - Crystal: Crystalline crack
  - Mystic: Harmonic resonance, brief
  - Dark: Low, unpleasant frequency — slightly wrong

- **Node depletion:** Crumbling sound + small cave-echo

- **Stamina depleted:** A soft groan (not the player — the cave itself seems to settle)

- **Stamina recovered:** Nothing. The silence is the recovery. Sounds start again when the player re-enters.

---

## VOLUME AND MIX GUIDELINES

**Hierarchy by priority:**
1. UI feedback (highest priority — never masked)
2. Event music (Blood Moon, Storm tracks)
3. Zone ambience
4. Standard music
5. Ambient particles

**Dynamic range:**
- Blood Moon music: Full volume
- Standard world music: 70% max
- Ambience: 50% max
- Particle sounds: 30% max

**The mix should always have headroom** — when something important happens (Blood Moon, Legendary encounter, rank up), it should sound significantly more significant than the baseline.

---

## ACCESSIBILITY — AUDIO

**Player controls:**
- Master volume
- Music volume (independent)
- SFX volume (independent)
- Ambience volume (independent)

**Visual sound indicators:** For accessibility (deaf/hard-of-hearing players), critical sound events have visual equivalents:
- Blood Moon start: Screen flash + red overlay (not just the bell sound)
- Storm lightning: Visual flash (not just thunder)
- Encounter trigger: Visual aura around player (not just the rumble sound)
- Quest complete: Visual banner (not just the chord)

---

*SOUND_DESIGN.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
