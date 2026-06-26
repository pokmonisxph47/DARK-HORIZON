# MASTER_PROJECT.md — Dark Horizons: Legends of Lost Kingdoms

> **RULE FOR ALL AI ASSISTANTS (Claude, Codex, Cursor, Copilot, etc.):**
> Read this file completely before making any code change.
> Do not modify app code, Firebase config, or `.env.local` unless explicitly instructed.
> Follow the world-first architecture principle on every decision.
> When in doubt, ask — do not assume and implement.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | Dark Horizons: Legends of Lost Kingdoms |
| **Type** | Browser-based RPG |
| **Status** | Active development — Milestone 0 in progress |
| **Repository** | Local git repo, branch: `main` |
| **Developer** | bharatpaints91-cell |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 14.2.35 |
| UI | React | 18 |
| Language | TypeScript (strict mode) | 5 |
| Styling | Tailwind CSS | 3.4.4 |
| Backend | Firebase Authentication | 10.12.2 |
| Database | Firebase Firestore | 10.12.2 |
| Fonts | Cinzel, Cinzel Decorative, Crimson Text | via Google Fonts |
| Package Manager | npm | — |
| Deployment | (TBD) | — |

**No additional UI libraries. No Redux. No React Query. No ORM.**
All data goes through Firebase directly via hooks and context.

---

## 3. Current Folder Structure

```
dark-horizons/
├── app/
│   ├── layout.tsx                  ← Root layout — wraps app with AuthProvider
│   ├── globals.css                 ← Global styles, CSS variables, animations
│   ├── page.tsx                    ← Landing page (/)
│   ├── login/
│   │   └── page.tsx                ← Login page (/login)
│   ├── register/
│   │   └── page.tsx                ← Register page (/register)
│   └── dashboard/
│       ├── page.tsx                ← Dashboard hub (/dashboard)
│       ├── mining/
│       │   └── page.tsx            ← Mining + crafting page [SCHEDULED FOR DELETION — M3]
│       └── world/
│           └── page.tsx            ← 2D world explorer — will become game shell
├── components/
│   ├── navbar.tsx                  ← Top navbar (used on dashboard hub only)
│   ├── rankcard.tsx                ← Player rank/stats card
│   ├── areacard.tsx                ← Area grid card [SCHEDULED FOR DELETION — M1]
│   ├── craftingpanel.tsx           ← Crafting UI [WILL MOVE to world modal — M4]
│   └── world/
│       ├── WorldMap.tsx            ← 2D world canvas renderer
│       ├── PlayerCharacter.tsx     ← Player sprite component
│       ├── MobileControls.tsx      ← Mobile D-pad
│       ├── WorldHUD.tsx            ← In-world HUD (top + bottom bars)
│       └── ZoneModal.tsx           ← Zone announcement + minimap modals
├── contexts/
│   └── authcontext.tsx             ← Firebase auth state (user, loading)
├── hooks/
│   ├── useauth.ts                  ← register, login, logout, getUserData
│   └── useWorldMovement.ts         ← WASD/arrow key movement + RAF loop
├── lib/
│   ├── firebase.ts                 ← Firebase app init, exports auth + db
│   ├── mining.ts                   ← Ore types, ball types, crafting recipes, mineRandomOre()
│   └── worldzones.ts               ← Zone definitions, collision detection, ambient particles
├── next.config.mjs                 ← Minimal Next.js config
├── tailwind.config.ts              ← Custom colors (gold, purple-deep, blue-abyss) + fonts
├── tsconfig.json                   ← Strict TypeScript, path alias @/* → ./*
├── postcss.config.js
└── package.json
```

### Planned additions (not yet created):
```
├── types/
│   ├── player.ts                   ← Shared PlayerData, Rank, Pet interfaces [M0]
│   ├── world.ts                    ← Layer, Zone, ZoneType interfaces [M0]
│   └── mining.ts                   ← OreType, BallType, Recipe types [M0]
├── constants/
│   ├── ranks.ts                    ← RANK_ORDER, rank colors, rank-up requirements [M0]
│   └── world.ts                    ← World dimensions, spawn point [M0]
├── contexts/
│   └── PlayerContext.tsx           ← Shared Firestore player data, update functions [M0]
├── middleware.ts                   ← Route protection (replaces per-page auth guards) [M0]
├── firestore.rules                 ← Firestore security rules [M0]
└── components/world/
    ├── layers/
    │   ├── OverworldLayer.tsx      ← Extracted overworld canvas [M2]
    │   ├── LayerShell.tsx          ← Sub-area wrapper with exit button [M2]
    │   ├── CaveLayer.tsx           ← Mining cave sub-world [M3]
    │   ├── CastleLayer.tsx         ← Castle interior sub-world [M4]
    │   └── ForestLayer.tsx         ← Pet catching forest sub-world [M5]
    └── modals/
        ├── CraftingModal.tsx       ← Crafting panel (moved from component) [M4]
        ├── PetEncounterModal.tsx   ← Pet battle + catch UI [M5]
        └── RollModal.tsx           ← Gacha roll UI [M6]
```

---

## 4. World-First Architecture Rule

> **This is the most important architectural constraint in the project.**

**All gameplay happens inside the explorable world. The dashboard is a lobby only.**

Rules:
- After clicking "Enter World", the player should rarely need to leave the world.
- Every gameplay feature must be reachable by physically walking to a location.
- No gameplay feature gets its own `/dashboard/feature` route. Routes for features are forbidden.
- Gameplay is triggered by zone entry or pressing E near an interactive object.
- New areas open as **layers** rendered over the world canvas — not as page navigations.
- The world page (`/dashboard/world/page.tsx`) is the game shell. It never navigates away.

**The test:** Before implementing any feature, ask: *"How does the player reach this by walking?"*
If the answer is a menu item or a URL, the design is wrong.

### Layer System (target architecture):
```
World Page
│
├── activeLayer: "overworld"         ← Player walks freely, enters zones
├── activeLayer: "cave"              ← Mining — entered from Mining Zone
├── activeLayer: "castle-interior"   ← Crafting, NPCs — entered from Home Castle
├── activeLayer: "forest"            ← Pet catching — entered from Pet Zone
├── activeLayer: "roll-altar"        ← Rolling — entered from Roll Zone
├── activeLayer: "sea-{1|2|3|beast}" ← Entered from port zones (rank-gated)
└── activeLayer: "dungeon-{id}"      ← Entered from dungeon entrances (rank-gated)
```

Layers render over the overworld canvas. The overworld is never unmounted.
On exit, the player returns to overworld at the zone entry coordinates.

---

## 5. Firebase Data Model

### Collection: `users/{uid}`

```typescript
{
  uid:            string,           // Same as Firebase Auth UID
  username:       string,           // Display name (set on register)
  rank:           Rank,             // See GAME_RULES.md for rank list
  zenCoins:       number,           // Currency
  pets:           Pet[],            // Array of caught pets (see types/player.ts)
  ores: {
    stone:        number,
    iron:         number,
    crystal:      number,
    mystic:       number,
    dark:         number
  },
  balls: {
    basic:        number,
    iron:         number,
    crystal:      number,
    mystic:       number,
    dark:         number,
    exotic:       number            // Admin-only — never craftable by players
  },
  totalOresMined: number,           // Aggregate for rank-up checks [M7]
  totalPetsCaught: number,          // Aggregate for rank-up checks [M7]
  totalRolls:     number,           // Aggregate for rank-up checks [M7]
  x:              number,           // Last known overworld X position [M2]
  y:              number,           // Last known overworld Y position [M2]
  createdAt:      Timestamp,        // Firestore serverTimestamp()
  lastLogin:      Timestamp         // Updated on login [M7]
}
```

### Rules:
- Users can only read and write their own document (`request.auth.uid == userId`)
- No subcollections yet — all player data lives in the single user document
- `exotic` balls are NEVER craftable — they must be set directly in Firestore by an admin
- `createdAt` must use `serverTimestamp()`, never `new Date().toISOString()`

---

## 6. Authentication Flow

```
/register  →  createUserWithEmailAndPassword
           →  setDoc(users/{uid}, defaultPlayerData)
           →  router.push("/dashboard")

/login     →  signInWithEmailAndPassword
           →  router.push("/dashboard")

AuthContext  →  onAuthStateChanged listener
             →  provides { user, loading } to all pages

Protected   →  middleware.ts checks auth (target state)
routes      →  currently: per-page useEffect guard
```

**Never store tokens manually. Never bypass Firebase Auth.**

---

## 7. Current Working Features

- User registration (email + password + username) → Firestore doc creation
- User login / logout
- Auth-protected routing (redirect to /login if not authenticated)
- Landing page with hero section
- Dashboard with rank, zen coins, ore summary display
- Dashboard area grid with rank-gated lock/unlock (to be removed in M1)
- 2D world map rendering (WorldMap component)
- Player movement via WASD + arrow keys
- Camera follow system (world scrolls with player)
- Mobile D-pad controls
- Zone collision detection (8 zones defined)
- Zone entry announcement modal
- Minimap overview modal
- Ore inventory display
- Ball crafting UI with recipe validation
- Crafting writes to Firestore

---

## 8. Current Broken / Incomplete Features

| Feature | Status | Milestone Fix |
|---|---|---|
| Actual mining gameplay | No UI to mine — `mineRandomOre()` is dead code | M3 |
| Pet catching | No UI, no logic | M5 |
| Roll system | No UI, no logic | M6 |
| Rank progression | Always "Noob" — no advancement trigger | M7 |
| Zen Coin economy | Displayed but never earned or spent | M6+ |
| Inventory modal | Stub button only | M4+ |
| Home Castle interaction | Zone entry does nothing meaningful | M4 |
| Player position persistence | Always spawns at (1100, 320) | M2 |
| Seas (1st–3rd, Beast) | No implementation | M8 |
| Dungeons | No implementation | M9 |
| Firestore security rules | Unknown — no rules file in repo | M0 |
| `"Awsunm"` typo in rank list | Should be `"Awesome"` | M0 |
| Shared types | No `types/` directory — types duplicated | M0 |
| `createdAt` stored as string | Must be `serverTimestamp()` | M0 |
| Per-page Firestore reads | Each page re-fetches player data | M0 |

---

## 9. Milestone Roadmap

| # | Name | Goal | Key Deliverables |
|---|---|---|---|
| **M0** | Foundation | Types, context, security | `types/`, `PlayerContext`, `middleware.ts`, `firestore.rules`, fix rank typo |
| **M1** | Dashboard Simplification | Dashboard becomes lobby only | Remove area grid, delete `areacard.tsx` |
| **M2** | Layer System | World page can switch layers | `LayerShell`, `OverworldLayer`, position persistence |
| **M3** | Mining Cave | First real gameplay loop | `CaveLayer`, `useMining`, mining nodes, ore drops |
| **M4** | Castle Interior & Crafting | Crafting in world | `CastleLayer`, `CraftingModal`, E-to-interact system |
| **M5** | Pet Forest | Pet catching gameplay | `ForestLayer`, `PetEncounterModal`, pet battle system |
| **M6** | Roll Altar | Gacha mechanic | `RollModal`, Zen Coin spending, reward table |
| **M7** | Rank Progression | Ranks actually advance | `rankup.ts`, aggregate tracking, `RankUpModal` |
| **M8** | Seas & Ports | Sea travel unlocked by rank | Port zones, `SeaLayer`, sea encounter tables |
| **M9** | Dungeons | Endgame content | Dungeon entrances, `DungeonLayer`, combat system |

---

## 10. Git Workflow

- **Branch:** `main` is the working branch during early development
- **Commits:** One commit per completed feature or milestone step
- **Message format:** `[M{number}] short description of what changed`
- **Examples:**
  - `[M0] Add shared types and fix Awsunm typo`
  - `[M3] Implement cave layer with mining nodes`
- **Do not commit:** `.env.local`, secrets, node_modules
- **Do not force-push main** without explicit instruction

---

## 11. AI Coding Rules

These rules apply to Claude, Codex, Cursor, Copilot, and any other AI assistant working on this project.

### Always:
- Read `MASTER_PROJECT.md` and `GAME_RULES.md` before writing any code
- Follow the world-first architecture rule — gameplay goes in world layers, not new pages
- Use the shared types from `types/` once they exist (M0)
- Read player data from `PlayerContext` once it exists (M0) — never fetch Firestore directly inside page components
- Use `serverTimestamp()` for all date/time fields
- Write TypeScript with no `any` types
- Keep component files under ~200 lines — split if larger
- Use `React.memo` on all world layer child components (they re-render at 60fps)

### Never:
- Create a new `/dashboard/feature` route for gameplay features
- Write Firestore reads inside page `useEffect` hooks (use `PlayerContext`)
- Store secrets or API keys in code
- Use `new Date().toISOString()` for Firestore timestamps
- Use `any` in TypeScript
- Skip `firestore.rules` validation
- Grant the `exotic` ball through crafting — it is admin-only
- Modify `.env.local`
- Amend published commits without instruction

### When unsure:
- Do not implement — ask the developer first
- Reference this file and `GAME_RULES.md` to resolve ambiguity

---

## 12. Color & Design System

| Token | Hex | Usage |
|---|---|---|
| `gold` | `#c9a84c` | Primary accent, borders, buttons |
| `gold-light` | `#f0d080` | Text glows, highlights |
| `blue-abyss` | `#0a0f2e` | Page backgrounds |
| `purple-deep` | `#1a0a2e` | Panel backgrounds |
| `purple-mid` | `#2d1b4e` | Card backgrounds |

**Fonts:**
- Headlines: `Cinzel Decorative`
- Titles/labels: `Cinzel`
- Body/descriptions: `Crimson Text`

**Key CSS utility classes (in `globals.css`):**
- `.btn-gold` — shimmer-animated gold button
- `.text-glow` — gold text shadow
- `.float-anim` — floating idle animation
- `.walk-bounce` — player walking animation
- `.locked-overlay` — diagonal stripe pattern for locked areas

---

*Last updated: 2026-06-26*
*Author: bharatpaints91-cell*
