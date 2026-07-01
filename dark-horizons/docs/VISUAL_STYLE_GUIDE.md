# VISUAL_STYLE_GUIDE.md — Dark Horizons: Legends of Lost Kingdoms

> The visual language of Dark Horizons is: warm but not soft, dark but not grim, beautiful but not safe.
> Every pixel is doing something. The world doesn't waste space.

---

## CORE VISUAL IDENTITY

**The Three-Word Summary:** Ancient. Alive. Threatened.

The world looks like it was once magnificent and still is — but there's something wrong with the eastern horizon. Players who pay attention to the visual design will understand the world's emotional state before reading a word of lore.

**Reference games (visual tone, not mechanics):**
- **Stardew Valley** — Warm palette, readable tiles, satisfying idle animations
- **Pokémon (early)** — Clear biome visual language, readable character sprites
- **Hollow Knight** — The way darkness is used: atmospheric, not menacing without cause
- **Hyper Light Drifter** — Silhouettes, light sources, world that feels larger than the screen

**What we are NOT:**
- Photorealistic (too heavy for browser)
- Chibi/super-deformed (too cute for the tone)
- Dark fantasy (too grim — this world has hope)
- Corporate fantasy (too clean — this world has history)

---

## COLOR SYSTEM

### Primary Palette — The Five Kingdom Colors

Each kingdom has a primary and secondary color. These appear on crests, banners, NPC clothing accents, and zone visual design.

| Kingdom | Primary | Secondary | Accent |
|---|---|---|---|
| Stonehaven | `#4A4A3A` (warm grey) | `#8B7355` (sandstone) | `#C4A962` (gold vein) |
| Verdania | `#2D5A27` (forest green) | `#7DBE6A` (leaf green) | `#B5D99C` (spring light) |
| Solara | `#D4A017` (deep gold) | `#FF9B21` (sunrise amber) | `#FFF3C0` (pale gold) |
| Aethermount | `#1A5276` (mountain blue) | `#5B9BD5` (sky blue) | `#C9DEEF` (ice blue) |
| Celestis | `#F5F5F0` (white stone) | `#D4CDE8` (pale violet) | `#FFFFFF` (pure white) |

### Terrain Palette

| Zone | Base Color | Accent | Shadow |
|---|---|---|---|
| Overworld Grass | `#5C8A3C` | `#7AC04F` | `#3D6027` |
| Castle Stone | `#8B8B7A` | `#AFAFAA` | `#5A5A4E` |
| River / Water | `#3D9DC4` | `#7ECCE8` | `#1A6B8A` |
| Sand / Desert | `#D4C07A` | `#E8D89B` | `#A89050` |
| Snow | `#E8EDF0` | `#FFFFFF` | `#B0C4CF` |
| Swamp | `#3D4F2C` | `#5A7040` | `#232D1A` |
| Mountain | `#6B5E4A` | `#9B8B73` | `#3D3529` |
| Cave | `#2A2035` | `#3D2F50` | `#1A1220` |

### The Dark Horizon Palette

The eastern horizon has its own color language. This is not "dark" in a generic way — it's a specific, named phenomenon.

- Base: `#0D0510` (deepest dark, almost purple-black)
- Mist: `#1A0D28` (dark violet haze)
- Edge glow: `#3D1A5A` (deep violet, visible at dawn when the horizon is briefly illuminated)
- Particle color: `#4A0E6B` (small dark particles drifting westward from the horizon)

The Dark Horizon particles appear on the eastern edge of the world map as ambient particles. They drift slowly westward — always westward.

### UI Palette

| Element | Color | Use |
|---|---|---|
| Primary action | `#C4A962` (Stonehaven gold) | Buttons, confirmations |
| Danger | `#8B0000` (deep red) | Blood Moon indicator, danger zones |
| Success | `#2D8B27` (Verdanian green) | Catch success, quest complete |
| Info | `#1A5276` (Aethermount blue) | Dialogue bubbles, hints |
| Disabled | `#5A5A5A` (neutral grey) | Locked content, unavailable options |
| Background dark | `#0A0510` | Modal overlays, dialogue backdrop |
| Background light | `#F0EAD6` | UI panels, inventory backgrounds |

---

## TYPOGRAPHY

**Display font:** Cinzel Decorative (already imported)
- Use: Zone names, NPC names, major UI headers
- Size: Never below 16px for display use
- Color: Kingdom-appropriate or `#C4A962` for "general game world" text
- Never all-lowercase for Cinzel Decorative — it breaks the typographic intent

**Body font:** System serif stack (`Georgia, 'Times New Roman', serif`)
- Use: Dialogue text, item descriptions, lore entries
- Optimal reading size: 14–16px
- Line height: 1.6 for body text (readability in long lore entries)

**UI font:** System sans-serif stack
- Use: Stats, numbers, UI labels, tooltips
- Optimal reading size: 12–14px
- Use tabular-nums variant for numbers that change (Zen Coins, ore counts)

**Hierarchy:**
```
Zone Name (Cinzel, 24px, gold)
  NPC Name (Cinzel, 18px, kingdom color)
    Dialogue (Georgia, 14px, #E8E0D0)
      Tooltip (System sans, 12px, #B0A888)
```

---

## ZONE VISUAL LANGUAGE

Each zone type has a visual signature that communicates its identity before the player reads the name.

### Castle Zone
- Stone tile ground
- Warm amber torchlight from sconces
- Dark Ore vein details in stone (subtle dark lines)
- Moss on older walls
- Kingdom banners visible from exterior

### Forest Zone
- Dappled light through canopy (CSS light patches)
- Grass darker than overworld (more shade)
- Mushroom patches at tree bases
- Spider webs in upper corners
- Undergrowth obscuring the far edges (depth illusion)

### Mining Zone
- Rock face walls
- Ore node sparkle (type-dependent color)
- Torch light on stone
- Rail track visual detail (wooden ties, iron rails)
- Dust particle system

### Desert Zone
- Sand texture (dune shadows CSS gradient)
- Heat shimmer effect (subtle CSS animation on far objects)
- Cacti clusters at zone boundaries
- Dried bones ambient detail
- Oasis: Dramatic contrast — blue water, green palms, surrounded by warm sand

### Snow Zone
- Pure white ground with subtle blue shadow
- Snow particle drift (permanent, unlike weather snow which is heavier)
- Ice crystal formations at edges
- Frozen water (static, lighter blue than river water)
- Aurora particle layer at night (ambient, not Aurora weather)

### Swamp Zone
- Dark ground (deep olive green)
- Fog particle system at knee-height
- Dead tree silhouettes at zone edges
- Ghost light particles (amber, slow-moving)
- Lily pads on dark water patches

---

## PLAYER CHARACTER DESIGN

**Current state (M2):** Walking animation with directional sprites. 4 directions, animated walk cycle.

**Visual goals for future milestones:**
- Rank-based appearance changes: Each rank tier has a visual upgrade to the player sprite
  - Noob: Plain clothes
  - Awesome: Kingdom crest visible on clothing
  - God: Glowing trim on clothing
  - Heavens: Particle trail while walking
  - Over Heavens: Ambient glow around character
  - Dark Horizon: The character's shadow doesn't quite match their movement

**Active pet companion:** Small sprite following behind, species-specific

**Equipment visibility:** Armor items show on the character sprite (future M7+)

---

## PARTICLE SYSTEM DESIGN

Particles are CSS animations positioned absolutely within zone containers. They should suggest — not dominate. The world is the primary visual.

### Core particle types:

**Ambient particles (always on):**
- Castle: Dust motes (very subtle, slow drift)
- Forest: Falling leaves (seasonal), light speckles through canopy
- Mine: Ore dust (color-coded to nearest ore node)
- River: Water spray (near waterfall), downstream ripples
- Snow: Permanent light snow drift (different from weather snow)
- Swamp: Low fog wisps

**Zone-specific particles:**
- Roll Shrine: Fate particles (golden, spiral inward to the altar)
- Fairy Ring: Amber sparkles (slow orbit around ring)
- Crystal Fountain: Water light refractions (animated colored spots)
- Eternal Lamps: Warm light halos (CSS box-shadow + opacity pulse)
- Dark Horizon edge: Small dark particles drifting west

**Event particles:**
- Blood Moon: Red mist, upward-drifting crimson particles
- Aurora: Curtain ripple (SVG/CSS wave animation in sky layer)
- Meteor Shower: CSS keyframe diagonal streaks
- Rainbow: Prismatic shimmer on water surfaces

---

## LIGHTING MODEL

The world uses a three-layer lighting system:

**Layer 1 — Terrain (base):** The terrain's own colors and shadows. These are the zone's "natural" light.

**Layer 2 — Ambient overlay:** A semi-transparent color wash applied to the entire world canvas. Changes with time of day and weather.
- Morning: `rgba(255, 160, 50, 0.15)` — warm gold wash
- Day: `rgba(255, 255, 200, 0.05)` — almost nothing, just slight warmth
- Evening: `rgba(200, 100, 20, 0.2)` — orange wash
- Night: `rgba(20, 20, 50, 0.4)` — blue-dark overlay
- Midnight: `rgba(5, 5, 20, 0.55)` — near-black overlay
- Blood Moon: `rgba(80, 0, 0, 0.3)` — red wash over night dark

**Layer 3 — Point lights:** Individual light sources rendered as radial gradients.
- Torches: `rgba(255, 140, 0, 0.4)` radial, 80px radius
- Zone markers: Colored radial, 40px radius
- Eternal Lamps: `rgba(255, 200, 50, 0.35)` radial, 120px radius
- Lantern Path: Warm amber radials, 60px radius each

The combination of these three layers creates the impression of a fully-lit world without expensive rendering.

---

## ANIMATION PRINCIPLES

**The speed rule:** Fast animations communicate urgency or danger. Slow animations communicate peace, age, or mystery. Most of the world should be slow.

**Easing:** All world-state transitions use `ease-in-out`. Abrupt cuts are never used in the world layer (only in UI confirmation dialogs).

**Idle animation density:** Any given screen should have at least 3 and no more than 8 active animations visible at once. Too few = static. Too many = distracting.

**The principle of secondary motion:** When one thing moves, related things react.
- Tree in wind → leaves scatter
- Player walks through forest → ambient bird flutters away (CSS position animation)
- Blood Moon → all lanterns dim briefly, then burn red

**Character animation states:**
- Idle: Subtle breathing cycle (small y-axis oscillation)
- Walking: 4-frame walk cycle per direction
- Encounter: Character stops, turns toward encounter
- Mining: Swing animation (future)
- Interacting with NPC: Character faces NPC

---

## ZONE TRANSITION DESIGN

When a player crosses from one zone to another:
- No loading screen (world is continuous)
- Ambient sound cross-fades over 2 seconds
- Music may change (zone-specific variations)
- Visual: Terrain type changes at boundary

**Zone boundary design principle:** Zones should have soft edges wherever possible. The forest doesn't stop at a hard line — there are trees on both sides of the "border," with the density decreasing. The cave entrance is a visual arch, not a tile boundary. The desert begins with sand patches in the grassland before full sand.

Hard borders only appear where the world physics demand them (cliff edges, water boundaries, sealed gates).

---

## ICONOGRAPHY

**Zone icons (currently in lib/worldzones.ts):**
Each zone type has an emoji icon used in the zone marker UI. Proposed extensions:

| Zone Type | Current Icon | Rationale |
|---|---|---|
| castle | 🏰 | Recognizable, distinctive |
| mining | ⛏️ | Industry, function |
| pets | 🐾 | Immediately communicates encounter |
| roll | 🎲 | Fate, chance |
| scenic | 🌿 | Natural, passive |
| dungeon | ⚔️ | (proposed) Danger, combat |
| sea-port | ⚓ | (proposed) Maritime |
| merchant | 💰 | (proposed) Trade |
| shrine | ✨ | (proposed) Magic, rare |
| ruins | 🏛️ | (proposed) History, lore |

**Design rule:** Icons should be readable at 16px. No icons that rely on fine detail. Emojis are provisional — custom pixel-art icons are the long-term goal.

---

## ACCESSIBILITY

**Color contrast:** All UI text meets WCAG AA standard (4.5:1 contrast ratio minimum).

**Color-only information:** Never communicate state through color alone. Zone type icons + color. Rarity tier stars + visual sparkle effects.

**Animation:** Provide a reduced-motion option. The world's core gameplay should be fully playable with all ambient animations disabled.

**Font size:** Minimum body text 14px. All interactive UI elements minimum 44×44px tap target.

---

*VISUAL_STYLE_GUIDE.md v1.0 — PROPOSAL ONLY*
*Status: AWAITING DEVELOPER APPROVAL*
