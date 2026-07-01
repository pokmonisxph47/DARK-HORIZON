# CASTLE_DESIGN.md — Dark Horizons: Legends of Lost Kingdoms

> The castle is not a starting area. It is a living city that the player grows into.
> Early-game: confusing and large. Late-game: familiar and full.

---

## DESIGN PHILOSOPHY

The Home Castle is the world's anchor. It should feel like a place that existed before the player arrived and will exist after they leave. It has history, personality, and secrets. It grows with the player — not mechanically (new NPCs spawn), but experientially (the player understands more of what was already there).

**The castle never fully unlocks.** Even at Dark Horizon rank, there are sealed doors and unreachable towers. The world is older than the player.

---

## PHYSICAL LAYOUT

The castle occupies the northwest quadrant of the overworld map.

**Outer Boundary:** Approximately coordinates (680, 240) to (1140, 680) — encompassing the "castle-grove" forest and the full castle structure.

**World Map Coordinates (from lib/worldzones.ts):**
- Home Castle zone: x:790, y:230, w:140, h:120
- Castle Town zone: x:760, y:360, w:120, h:100

---

## ZONE 1 — HOME CASTLE (THE KEEP)

**Coordinates:** (790, 230) — width 140, height 120

**What it is:** The main castle structure. Stone towers, battlements, the great hall. The visual centerpiece of the world when seen from the south.

**Buildings visible from outside:**
- The Great Hall (main castle body — arched doorways, Dark Ore reinforced walls)
- The Bell Tower (north tower — the bell heard during Blood Moon)
- The Library Tower (east tower — Elder Maerik's domain)
- The Watch Tower (south tower — highest point, visible from everywhere)
- The Throne Room (upper keep — sealed until M9)

**Ground level elements:**
- The Castle Gate (Aria's primary location — the archway entrance from the south)
- The Courtyard (open area between gate and keep — player spawn proximity)
- The Knight's Garden (east side — statues of the five kingdom champions, one missing its arm)
- The Moat (dry — a perfect defensive channel, now a walking path with planters)
- The Oath Stone (center of the courtyard — circular stone with slots for five Kingdom Crests)

**Interior spaces (layer: castle-interior):**
- The Great Hall: Large central room, long tables, the five kingdom banners
- The Library: Floor-to-ceiling shelves, rolling ladders, Maerik's chair
- The Trophy Room: Collectibles display — see COLLECTIBLES.md
- The Throne Room: Sealed. Throne visible through iron bars. Something is sitting in it that is very hard to see clearly.
- The Dungeon Level: Not dungeon content — the castle's basement. Old storage, a few secrets.

**Landmark connections:**
- Bell Tower (#1)
- The Oath Stone (#2)
- The Knight's Garden (#7)
- The Sundial (#8)
- The Trophy Room (#9)
- The Archive Vault (#10)

---

## ZONE 2 — CASTLE TOWN

**Coordinates:** (760, 360) — width 120, height 100

**What it is:** The settlement that grew up around the castle over 300 years. Shops, homes, the notice board, the fountain. A lived-in town.

**Districts:**

### The Market Quarter (north side of town)
- Cass Orin's stall — the Merchant
- The empty stalls (future shops — the player can see the stalls, unoccupied)
- The Announcement Board (Loryn Ashvale's notice board)
- The Town Well (functional — players can interact for lore)

### The Crafting Quarter (west side)
- Grend Voss's Forge and Workshop — the Blacksmith
- The Material Storage (behind the forge — ore display visual)
- The Tool Wall (visual only — an entire wall of specialized tools)
- The Testing Yard (small outdoor area where Grend tests work)

### The Civic Quarter (east side)
- The Collector's Building — Petra Vine
- The Quest Hall — Loryn Ashvale (indoor version, for weather)
- The Archive Annex (overflow from the castle library — less important documents)

### The Residential Quarter (south side)
- Small houses, lights in windows at night
- The Resident Cat (ambient — just walks around, no interaction)
- The Alehouse (visual only, no interior — but the sign has been updated to indicate it "opens soon")
- The Square with the Crystal Fountain

**The Crystal Fountain:**
Central feature of Castle Town. Blue-white glowing water. Changes color with weather (gold in evening, red in Blood Moon, blue in aurora). Players can:
- Throw a Zen Coin (Wishing Pool mechanic — see COLLECTIBLES.md)
- Read the inscription (lore about the five kingdoms)
- Observe the color for weather/time state hints

---

## CASTLE INTERIOR LAYERS

The castle-interior layer activates when the player enters any castle building. The layer is distinguished from the overworld by:
- Darker ambient lighting (torchlight, not sky)
- Different sound design (interior acoustics, no wind)
- No weather effects
- NPC AI restricted to indoor movement patterns

**Room designs:**

### The Great Hall
A long rectangular room. Five long tables (one per kingdom) set for a meal that has not been eaten for 300 years. The plates are clean — someone has been maintaining this room. Flags of all five kingdoms hang from the ceiling. At the far end: the entrance to the Throne Room (sealed).

**Interaction points:**
- The Tables: Each table has a place card from the Dark Horizon event. Collectible lore.
- The Chandelier: Lit by itself. Made of Dark Ore. No one knows how it stays lit.
- The Stained Glass (east wall): Depicts the Dark Horizon event. Not accurate — it was made by someone who wasn't there.

### The Library
Largest interior space. Tall ceilings, multiple levels of shelves accessed by rolling ladders. Elder Maerik's chair is in the center. A fire burns in the fireplace — the only fire in the castle that is not Dark Ore (it's ordinary wood; Elder Maerik prefers ordinary things).

**Interaction points:**
- Shelves: Specific books are interactable — each one leads to a collectible journal entry
- The Rolling Ladder: Players can climb the ladder to reach upper shelves (future interaction)
- The Sealed Section: A section behind a locked iron gate. Elder Maerik has the key. He opens it in M9.
- The Map Table: A large table with a partial map of the world as it was 300 years ago

### The Trophy Room
A room connected to the Great Hall. When COLLECTIBLES.md is implemented, this room fills with the player's found items. Empty shelves and display cases at the start. Fills over time.

---

## CASTLE PROGRESSION BY RANK

### Noob / Awesome Rank
- Castle exterior accessible
- Castle Town fully accessible
- Great Hall entrance visible but dark inside
- Library accessible (Elder Maerik at his chair)
- Throne Room sealed

### God Rank
- Great Hall becomes accessible (first interior)
- The Trophy Room opens (collectibles start filling)
- One sealed stall in Market Quarter opens (Cass's expanded inventory)

### Heavens Rank
- Upper floors of Bell Tower accessible
- Library's upper levels accessible
- Knight's Garden restoration questline begins (Grend)

### Over Heavens Rank
- The Throne Room bars: something moves inside. No access.
- Castle basement accessible (Dungeon Level)
- The Archive Vault's outer chamber opens (inner chamber M9)

### Dark Horizon Rank
- The Sealed Section of the Library opens
- The Throne Room... the bars appear to be open, but the room is very dark.
- The Oath Stone activates if all five crests are found

---

## CASTLE ARCHITECTURAL IDENTITY

**Material language:**
- Exterior: Grey stone blocks with Dark Ore veins (visible as subtle dark lines in the stone)
- Interior: Warm brown stone, torchlight, tapestries
- Floors: Flagstone — each stone slightly different, suggesting hundreds of years of individual placement
- Doors: Heavy oak reinforced with Stonehaven iron

**Visual signature:** The castle's silhouette is recognizable from anywhere in the northern half of the world. The Bell Tower is the tallest structure. The Watch Tower's light (a perpetual flame, Dark Ore-powered) is visible at night from even the southern beaches.

**Color palette:**
- Stone: #8B8B7A (warm grey)
- Dark Ore veins: #1A0A2E (very dark purple-black)
- Torchlight: #FF9B21 (warm amber)
- Castle banners: Five colors — one per kingdom (Stonehaven: deep grey; Verdania: forest green; Solara: gold; Aethermount: sky blue; Celestis: white)

---

## CASTLE AMBIENCE DESIGN

**Sounds:**
- Wind around the towers (haunting, low frequency)
- The Bell Tower bell (audible for 10 seconds after Blood Moon start)
- Interior fire crackle (Great Hall, Library)
- Distant crows (ambient, from Crow Tower)
- Footsteps on stone (distinct from grass/dirt outdoor footsteps)

**Ambient animations:**
- Castle banners moving in wind
- Crows circling the Bell Tower
- The Watch Tower flame flickering
- Castle guards (visual only — two armored figures at the gate, no dialogue)
- Pigeons on the battlements
- Ivy growing on the east wall (animated growth for seasonal events — future)

---

## THE SEALED THRONE ROOM — DESIGN INTENT

This is the single most important location in the castle. It must never fully reveal its contents until M9.

**What the player can see through the bars:**
- A throne, ornate, in the center of a dark room
- Something sitting in the throne — a silhouette. Not quite the shape of a person.
- If the player watches for more than 10 seconds without moving: the silhouette's head turns toward them. Then the game continues normally.

**What Aria says if asked:** "I haven't gone in there. I'm not going in there."

**What Elder Maerik says if asked:** "The Throne Room was sealed the day after the Dark Horizon event. I have been here my whole life. I have never opened it."

**What it contains (M9 reveal only):**
The last King of the combined five kingdoms — who did not survive the Dark Horizon event but has not left either. This is not horror. It is grief. He is waiting.

---

*CASTLE_DESIGN.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
