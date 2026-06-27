# PROJECT_MEMORY.md - Dark Horizons

> Living document. Update this file at the end of every milestone.
> This is the first thing any AI assistant or returning developer should read.

---

## Current Milestone

**Milestone 2 - World Visual Upgrade** COMPLETE

The overworld has been upgraded from flat zone rectangles into a layered fantasy map with illustrated terrain, animated water, bridges, decorative objects, lighting, shadows, walking paths, smooth camera movement, and a custom walking player sprite. This milestone was visual-only: no gameplay, Firebase, authentication, PlayerContext, collision, or zone coordinate changes were made.

---

## Completed Features

| Feature | Status | Notes |
|---|---|---|
| User registration | Working | `registerUser()` in `hooks/useAuth.ts` |
| User login / logout | Working | Firebase Auth, email + password |
| Auth state context | Working | `contexts/AuthContext.tsx` |
| Player data context | Working | `contexts/PlayerContext.tsx` - single Firestore read, shared globally |
| Landing page | Working | `/` redirects logged-in users to `/dashboard` |
| Dashboard hub | Working | `/dashboard` reads from PlayerContext, no direct Firestore |
| Dashboard simplification | Complete | M1 complete - area grid removed, lobby shows player stats and world entry |
| 2D world explorer | Working | `/dashboard/world` - WASD + arrow key movement, camera follow |
| World visual upgrade | Complete | M2 complete - illustrated terrain, animated water, bridges, lighting, decor, smooth camera, and player walk animation |
| Mobile D-pad controls | Working | Touch-friendly D-pad, hidden on desktop |
| Zone collision detection | Working | 8 zones, interactive types trigger modal on entry |
| Zone announcement modal | Working | Shows zone info and "coming soon" for stub zones |
| Minimap overview modal | Working | Shows all zones and player position dot |
| Crafting UI (stub page) | Working | `/dashboard/mining` reads from PlayerContext, crafts balls |
| Shared types | Complete | `types/player.ts`, `types/mining.ts`, `types/world.ts` |
| Shared constants | Complete | `constants/ranks.ts`, `constants/world.ts` |
| Consistent file casing | Fixed | All files normalized - safe for Linux and GitHub CI |
| Firestore security rules | Written | `firestore.rules` - users can only read/write their own doc |

---

## Known Issues / Incomplete Features

| Issue | Priority | Milestone Fix |
|---|---|---|
| Mining gameplay | None - no UI to mine ores | M3 |
| Pet catching | None - no implementation | M5 |
| Roll system | None - no implementation | M6 |
| Rank progression | Rank stuck at "Noob" - no advancement trigger | M7 |
| Zen Coin economy | Displayed but never earned or spent | M6+ |
| Inventory modal | Stub only - shows "coming soon" | M4+ |
| Player position persistence | Always spawns at (1100, 320) - not saved to Firestore | Future layer/persistence work |
| Home Castle interaction | Zone entry navigates to dashboard instead of castle interior | M4 |
| Seas | No implementation | M8 |
| Dungeons | No implementation | M9 |
| `firestore.rules` not yet deployed | Rules file exists but must be deployed with Firebase CLI | Before launch |
| `createdAt` migration | Existing Firestore documents still have string `createdAt`. New registrations use `serverTimestamp()`. | Non-breaking - no UI reads this field |
| `/dashboard/mining` page | Scheduled for deletion when crafting moves into castle | M4 |

---

## Recent Commits

| Hash | Message | What changed |
|---|---|---|
| `a833838` | world map movement working | Initial world movement system |
| `7b8e444` | pages Updated | Page updates |
| `c3f2245` | UPDATE OF PAGES DONE | Page updates |
| `8abe9ed` | working dashboard before mining system | Dashboard pre-mining |
| `c4de86d` | Remove Firebase values from .env.local.example | Security cleanup |

---

## Current Architecture

```text
app/
  layout.tsx              <- AuthProvider + PlayerProvider wrap entire app
  page.tsx                <- Landing (/)
  login/page.tsx          <- Login (/login)
  register/page.tsx       <- Register (/register)
  dashboard/
    page.tsx              <- Dashboard lobby - reads from PlayerContext only
    mining/page.tsx       <- Crafting stub - scheduled deletion M4
    world/page.tsx        <- World explorer - game shell (future: layer host)

components/
  Navbar.tsx              <- Used on dashboard hub only
  RankCard.tsx            <- Player stats and inventory summary card
  AreaCard.tsx            <- Legacy area card, currently unused after M1
  CraftingPanel.tsx       <- Crafting UI - moves to world modal in M4
  world/
    WorldMap.tsx          <- 2D world canvas
    WorldDecor.tsx        <- Visual terrain, water, bridges, paths, and decorative map objects
    PlayerCharacter.tsx   <- Player sprite
    MobileControls.tsx    <- Touch D-pad
    WorldHUD.tsx          <- In-world HUD bars
    ZoneModal.tsx         <- Zone announcement + minimap modals

contexts/
  AuthContext.tsx         <- { user, loading } from Firebase Auth
  PlayerContext.tsx       <- { playerData, playerLoading, updateOresAndBalls, refreshPlayerData }

hooks/
  useAuth.ts              <- registerUser, loginUser, logoutUser, getUserData
  useWorldMovement.ts     <- RAF-based WASD movement, returns { x, y, facing, isMoving }

lib/
  firebase.ts             <- Firebase app init, exports auth + db
  mining.ts               <- OreType, BallType, ORE_DATA, BALL_DATA, BALL_RECIPES, mineRandomOre()
  worldzones.ts           <- ZONES, WORLD_WIDTH/HEIGHT, SPAWN_X/Y, isPointInZone()

types/
  player.ts               <- PlayerData, Rank, Pet, OreInventory, BallInventory
  mining.ts               <- Re-exports from lib/mining
  world.ts                <- Re-exports from lib/worldzones, Layer type

constants/
  ranks.ts                <- RANK_ORDER, RANK_COLORS, hasRank()
  world.ts                <- Re-exports world dimension constants

firestore.rules           <- Firestore security rules (deploy separately)
MASTER_PROJECT.md         <- Engineering reference
GAME_RULES.md             <- Game design reference
M1_DASHBOARD_REPORT.md    <- Milestone 1 report
M2_WORLD_VISUAL_REPORT.md <- Milestone 2 visual upgrade report
```

---

## Current Firebase Schema

```typescript
// Collection: users/{uid}
{
  uid:             string,
  username:        string,
  rank:            "Noob" | "Awesome" | "God" | "Heavens" | "Over Heavens" | "Dark Horizon",
  zenCoins:        number,
  pets:            Pet[],
  ores: {
    stone:         number,
    iron:          number,
    crystal:       number,
    mystic:        number,
    dark:          number,
  },
  balls: {
    basic:         number,
    iron:          number,
    crystal:       number,
    mystic:        number,
    dark:          number,
    exotic:        number,
  },
  totalOresMined:  number,
  totalPetsCaught: number,
  totalRolls:      number,
  createdAt:       Timestamp | string,
}
```

**Note:** Existing documents registered before M0 will have `createdAt` as an ISO string. New registrations use `serverTimestamp()`. This field is not displayed in any UI so the mixed type causes no visible issue.

---

## Completed Objective - Milestone 1: Dashboard Simplification

The area grid has been removed from the dashboard. The dashboard is now a pure lobby with player stats, ball inventory, a large Enter World button, and a small Mining Test Page link. Areas are reached by walking in the world, not clicking cards on a page.

**Tasks completed:**
1. Removed `AREAS` array and area grid from `app/dashboard/page.tsx`
2. Removed `AreaCard` import from dashboard page
3. Kept `components/AreaCard.tsx` in place because deletion was not required for M1
4. Updated dashboard summary to show username, rank, Zen Coins, total ores, pet count, and ball inventory

**Files changed:** `app/dashboard/page.tsx`, `app/dashboard/mining/page.tsx`, `components/RankCard.tsx`, `PROJECT_MEMORY.md`, `M1_DASHBOARD_REPORT.md`
**Files deleted:** None
**Next objective:** Completed by the M2 visual upgrade; original layer-system work remains available as a future architecture task.

---

## Completed Objective - Milestone 2: World Visual Upgrade

The existing overworld was visually transformed while preserving the current gameplay shell. The map now uses layered CSS terrain, forest and cliff regions, beaches, animated river and waterfall elements, bridges, walking paths, environmental decor, shadows, lighting overlays, smoother camera interpolation, and a custom animated player sprite.

**Tasks completed:**
1. Replaced flat map background with illustrated terrain layers
2. Added forests, cliffs, mountains, beaches, grass variation, paths, bridges, rocks, flowers, ruins, and lanterns
3. Added animated river and waterfall visuals
4. Added ambient lighting, shadows, vignette, and glow effects
5. Added smooth camera interpolation in `/dashboard/world`
6. Replaced emoji player display with a CSS-built walking character
7. Kept collision logic and zone coordinates unchanged

**Files changed:** `app/dashboard/world/page.tsx`, `app/globals.css`, `components/world/WorldMap.tsx`, `components/world/PlayerCharacter.tsx`, `components/world/WorldDecor.tsx`, `PROJECT_MEMORY.md`, `M2_WORLD_VISUAL_REPORT.md`
**Files deleted:** None
**Next objective:** Milestone 3 - Mining Cave.

---

*Last updated: 2026-06-27 - end of Milestone 2 visual upgrade*
