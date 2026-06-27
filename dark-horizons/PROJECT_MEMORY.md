# PROJECT_MEMORY.md — Dark Horizons

> Living document. Update this file at the end of every milestone.
> This is the first thing any AI assistant or returning developer should read.

---

## Current Milestone

**Milestone 0 — Foundation** ✅ COMPLETE

All foundation work is done. The project compiles cleanly, passes TypeScript strict-mode checks, and builds to production. The codebase is now safe to build features on top of.

---

## Completed Features

| Feature | Status | Notes |
|---|---|---|
| User registration | ✅ Working | `registerUser()` in `hooks/useAuth.ts` |
| User login / logout | ✅ Working | Firebase Auth, email + password |
| Auth state context | ✅ Working | `contexts/AuthContext.tsx` |
| Player data context | ✅ Working | `contexts/PlayerContext.tsx` — single Firestore read, shared globally |
| Landing page | ✅ Working | `/` — redirects logged-in users to `/dashboard` |
| Dashboard hub | ✅ Working | `/dashboard` — reads from PlayerContext, no direct Firestore |
| 2D world explorer | ✅ Working | `/dashboard/world` — WASD + arrow key movement, camera follow |
| Mobile D-pad controls | ✅ Working | Touch-friendly D-pad, hidden on desktop |
| Zone collision detection | ✅ Working | 8 zones, interactive types trigger modal on entry |
| Zone announcement modal | ✅ Working | Shows zone info + "coming soon" for stub zones |
| Minimap overview modal | ✅ Working | Shows all zones + player position dot |
| Crafting UI (stub page) | ✅ Working | `/dashboard/mining` — reads from PlayerContext, crafts balls |
| Shared types | ✅ Complete | `types/player.ts`, `types/mining.ts`, `types/world.ts` |
| Shared constants | ✅ Complete | `constants/ranks.ts`, `constants/world.ts` |
| Consistent file casing | ✅ Fixed | All files normalized — safe for Linux + GitHub CI |
| Firestore security rules | ✅ Written | `firestore.rules` — users can only read/write their own doc |

---

## Known Issues / Incomplete Features

| Issue | Priority | Milestone Fix |
|---|---|---|
| Mining gameplay | None — no UI to mine ores | M3 |
| Pet catching | None — no implementation | M5 |
| Roll system | None — no implementation | M6 |
| Rank progression | Rank stuck at "Noob" — no advancement trigger | M7 |
| Zen Coin economy | Displayed but never earned or spent | M6+ |
| Inventory modal | Stub only — shows "coming soon" | M4+ |
| Player position persistence | Always spawns at (1100, 320) — not saved to Firestore | M2 |
| Home Castle interaction | Zone entry navigates to dashboard instead of castle interior | M4 |
| Seas | No implementation | M8 |
| Dungeons | No implementation | M9 |
| `firestore.rules` not yet deployed | Rules file exists but must be deployed with Firebase CLI | Before launch |
| `createdAt` migration | Existing Firestore documents still have string `createdAt`. New registrations use `serverTimestamp()`. | Non-breaking — no UI reads this field |
| Dashboard area grid | Still shows area cards (M1 removes these) | M1 |
| `/dashboard/mining` page | Scheduled for deletion when crafting moves into castle (M4) | M4 |

---

## Recent Commits

| Hash | Message | What changed |
|---|---|---|
| `a833838` | world map movement working | Initial world movement system |
| `7b8e444` | pages Updated | Page updates |
| `c3f2245` | UPDATE OF PAGES DONE | Page updates |
| `8abe9ed` | working dashboard before mining system | Dashboard pre-mining |
| `c4de86d` | Remove Firebase values from .env.local.example | Security cleanup |

*(M0 foundation changes are staged but not yet committed as of this writing — commit when ready with message `[M0] Foundation: shared types, PlayerContext, file casing normalization`)*

---

## Current Architecture

```
app/
  layout.tsx              ← AuthProvider + PlayerProvider wrap entire app
  page.tsx                ← Landing (/)
  login/page.tsx          ← Login (/login)
  register/page.tsx       ← Register (/register)
  dashboard/
    page.tsx              ← Dashboard hub — reads from PlayerContext only
    mining/page.tsx       ← Crafting stub — scheduled deletion M4
    world/page.tsx        ← World explorer — game shell (future: layer host)

components/
  Navbar.tsx              ← Used on dashboard hub only
  RankCard.tsx            ← Player stats card
  AreaCard.tsx            ← Dashboard area grid (removed in M1)
  CraftingPanel.tsx       ← Crafting UI — moves to world modal in M4
  world/
    WorldMap.tsx          ← 2D world canvas
    PlayerCharacter.tsx   ← Player sprite
    MobileControls.tsx    ← Touch D-pad
    WorldHUD.tsx          ← In-world HUD bars
    ZoneModal.tsx         ← Zone announcement + minimap modals

contexts/
  AuthContext.tsx         ← { user, loading } from Firebase Auth
  PlayerContext.tsx       ← { playerData, playerLoading, updateOresAndBalls, refreshPlayerData }

hooks/
  useAuth.ts              ← registerUser, loginUser, logoutUser, getUserData
  useWorldMovement.ts     ← RAF-based WASD movement, returns { x, y, facing, isMoving }

lib/
  firebase.ts             ← Firebase app init, exports auth + db
  mining.ts               ← OreType, BallType, ORE_DATA, BALL_DATA, BALL_RECIPES, mineRandomOre()
  worldzones.ts           ← ZONES, WORLD_WIDTH/HEIGHT, SPAWN_X/Y, isPointInZone()

types/
  player.ts               ← PlayerData, Rank, Pet, OreInventory, BallInventory
  mining.ts               ← Re-exports from lib/mining
  world.ts                ← Re-exports from lib/worldzones, Layer type

constants/
  ranks.ts                ← RANK_ORDER, RANK_COLORS, hasRank()
  world.ts                ← Re-exports world dimension constants

firestore.rules           ← Firestore security rules (deploy separately)
MASTER_PROJECT.md         ← Engineering reference
GAME_RULES.md             ← Game design reference
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
  pets:            Pet[],   // empty array until M5
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
    exotic:        number,  // admin-only, never craftable
  },
  totalOresMined:  number,  // aggregate for rank-up (always 0 until M3)
  totalPetsCaught: number,  // aggregate for rank-up (always 0 until M5)
  totalRolls:      number,  // aggregate for rank-up (always 0 until M6)
  createdAt:       Timestamp | string,  // new: Firestore Timestamp; legacy: ISO string
}
```

**Note:** Existing documents registered before M0 will have `createdAt` as an ISO string. New registrations use `serverTimestamp()`. This field is not displayed in any UI so the mixed type causes no visible issue.

---

## Next Objective — Milestone 1: Dashboard Simplification

Remove the area grid from the dashboard. The dashboard becomes a pure lobby (stats + Enter World button). Areas are reached by walking in the world, not clicking cards on a page.

**Tasks:**
1. Remove `AREAS` array and area grid from `app/dashboard/page.tsx`
2. Delete `components/AreaCard.tsx`
3. Remove `AreaCard` import from dashboard page
4. Update `MASTER_PROJECT.md` folder structure to reflect deletion

**Files changed:** `app/dashboard/page.tsx`
**Files deleted:** `components/AreaCard.tsx`
**Rule:** Do not add any new feature — only remove the area grid.

---

*Last updated: 2026-06-26 — end of Milestone 0*
