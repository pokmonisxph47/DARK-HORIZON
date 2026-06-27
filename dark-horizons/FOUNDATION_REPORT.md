# FOUNDATION_REPORT.md — Milestone 0 Summary

**Date:** 2026-06-26
**Milestone:** M0 — Foundation Hardening
**Build status:** ✅ `npx tsc --noEmit` — zero errors
**Build status:** ✅ `npm run build` — clean production build
**Dev server:** ✅ `npm run dev` — HTTP 200 on all routes

---

## Files Created

| File | Purpose |
|---|---|
| `types/player.ts` | Shared `PlayerData`, `Rank`, `Pet`, `OreInventory`, `BallInventory` types |
| `types/mining.ts` | Re-exports `OreType`, `BallType`, `Ore` from `lib/mining` |
| `types/world.ts` | Re-exports `WorldZone`, `ZoneType`; defines `Layer` type for M2 |
| `constants/ranks.ts` | `RANK_ORDER`, `RANK_COLORS`, `hasRank()` — single canonical source |
| `constants/world.ts` | Re-exports world dimension constants from `lib/worldzones` |
| `contexts/PlayerContext.tsx` | `PlayerProvider` + `usePlayerContext()` — single Firestore read, globally shared |
| `firestore.rules` | Security rules: users can only read/write their own document |
| `PROJECT_MEMORY.md` | Living milestone state document for developers and AI assistants |
| `FOUNDATION_REPORT.md` | This file |
| `MASTER_PROJECT.md` | Engineering reference (created prior session) |
| `GAME_RULES.md` | Game design reference (created prior session) |

---

## Files Modified

| File | What Changed |
|---|---|
| `hooks/useAuth.ts` | Fixed `createdAt` to use `serverTimestamp()`; added `exotic: 0` to default balls; added `totalOresMined/totalPetsCaught/totalRolls: 0`; typed return value as `PlayerData \| null`; used `Rank` type |
| `app/layout.tsx` | Added `PlayerProvider` wrapping children; fixed import casing (`authcontext` → `AuthContext`) |
| `app/page.tsx` | Fixed import casing (`authcontext` → `AuthContext`) |
| `app/login/page.tsx` | Fixed import casing (`useauth` → `useAuth`) |
| `app/register/page.tsx` | Fixed import casing (`useauth` → `useAuth`) |
| `app/dashboard/page.tsx` | Replaced direct Firestore read with `usePlayerContext()`; removed duplicate `RANK_ORDER`/`hasRank()`; fixed `PlayerData` interface (removed phantom `berries` field, fixed `ores` type); corrected area rank requirements to match `GAME_RULES.md`; fixed imports to PascalCase |
| `app/dashboard/mining/page.tsx` | Replaced direct Firestore read with `usePlayerContext()`; removed duplicate `RANK_ORDER`/`hasRank()`; fixed imports to PascalCase; `onBallsCrafted` now calls `refreshPlayerData()` |
| `app/dashboard/world/page.tsx` | Replaced direct Firestore read with `usePlayerContext()`; fixed all import path casing (`worldmap` → `WorldMap`, etc.); computed `totalOres` from ores object before passing to HUD; renamed `ores` prop to `totalOres` |
| `components/Navbar.tsx` | Fixed import casing (`useauth` → `useAuth`) |
| `components/RankCard.tsx` | Replaced inline `RANK_COLORS` with import from `constants/ranks`; removed `"Awsunm"` key; changed `ores` prop type from `Record<string, number>` to `OreInventory` |
| `components/CraftingPanel.tsx` | Changed `onBallsCrafted` callback signature from `(newBalls) => void` to `() => void \| Promise<void>`; replaced inline type casts with typed `OreInventory`/`BallInventory`; removed dead code |
| `components/world/WorldHUD.tsx` | Replaced inline `RANK_COLORS` with import from `constants/ranks`; removed `"Awsunm"` key; renamed `ores: number` prop to `totalOres: number` |

---

## File Renames (Casing Normalization)

All performed with `git mv` through a temp name to work around Windows case-insensitive filesystem:

| Old (git-tracked) | New (normalized) | Why |
|---|---|---|
| `lib/WorldZones.ts` | `lib/worldzones.ts` | Utility files are lowercase |
| `app/dashboard/World/page.tsx` | `app/dashboard/world/page.tsx` | Next.js route dirs must be lowercase |
| `components/World/` (directory) | `components/world/` | Component subdirs use lowercase |
| `components/World/WorldHud.tsx` | `components/world/WorldHUD.tsx` | HUD is an acronym — all caps |
| `components/AreaCard.tsx` | `components/AreaCard.tsx` | Forced through temp to fix disk case |
| `components/CraftingPanel.tsx` | `components/CraftingPanel.tsx` | Forced through temp to fix disk case |
| `components/RankCard.tsx` | `components/RankCard.tsx` | Forced through temp to fix disk case |
| `contexts/AuthContext.tsx` | `contexts/AuthContext.tsx` | Forced through temp to fix disk case |
| `hooks/useAuth.ts` | `hooks/useAuth.ts` | Forced through temp to fix disk case |

---

## Bugs Fixed

| Bug | Location | Fix |
|---|---|---|
| `"Awsunm"` typo | `constants/ranks.ts`, `RankCard.tsx`, `WorldHUD.tsx` | Corrected to `"Awesome"` everywhere |
| `"Pro"` rank (not in GAME_RULES) | `RANK_ORDER` | Removed — 6 canonical ranks now |
| `PlayerData.ores: number` | `dashboard/page.tsx`, `world/page.tsx` | Fixed to `OreInventory` (object type) |
| `berries` phantom field | `dashboard/page.tsx` | Removed — never existed in Firestore |
| `ores` prop mismatch on RankCard | `dashboard/page.tsx` | Was passing `number`, now passes `OreInventory` |
| `WorldHUDTop ores` rendered as `[object Object]` | `world/page.tsx` | Now passes computed `totalOres: number` |
| Wrong import casing breaks Linux | All pages and components | Fixed to match git-tracked PascalCase names |
| `components/World/` dir uppercase | git index | Renamed to lowercase via `git mv` |
| `app/dashboard/World/` dir uppercase | git index | Renamed to lowercase via `git mv` |
| `lib/WorldZones.ts` mixed case | git index | Renamed to `lib/worldzones.ts` |
| Duplicate `RANK_ORDER` constant | `dashboard/page.tsx`, `mining/page.tsx` | Both now import from `constants/ranks.ts` |
| Duplicate `RANK_COLORS` constant | `RankCard.tsx`, `WorldHUD.tsx` | Both now import from `constants/ranks.ts` |
| Duplicate `hasRank()` function | `dashboard/page.tsx`, `mining/page.tsx` | Both now import from `constants/ranks.ts` |
| Per-page Firestore reads | `dashboard/page.tsx`, `mining/page.tsx`, `world/page.tsx` | All replaced with `usePlayerContext()` |
| `createdAt` as ISO string | `hooks/useAuth.ts` | Fixed to `serverTimestamp()` |
| No Firestore security rules | (missing file) | `firestore.rules` created |
| Area unlock ranks not matching GAME_RULES | `dashboard/page.tsx` | Updated to match `GAME_RULES.md` |
| `1st Sea` required `"Pro"` | `dashboard/page.tsx` | Fixed to `"Awesome"` |
| `2nd Sea` required `"Awsunm"` | `dashboard/page.tsx` | Fixed to `"God"` |
| `3rd Sea` required `"God"` | `dashboard/page.tsx` | Fixed to `"Heavens"` |
| `Beast Sea` required `"Heavens"` | `dashboard/page.tsx` | Fixed to `"Over Heavens"` |
| `Dungeons` required `"Over Heavens"` | `dashboard/page.tsx` | Fixed to `"God"` |
| No shared `Pet` type | (missing) | Defined in `types/player.ts` |
| `pets` displayed as raw strings | `dashboard/page.tsx` | Now renders `pet.emoji + pet.name` |

---

## Remaining Issues

| Issue | Severity | Notes |
|---|---|---|
| `firestore.rules` not deployed | High | Must run `firebase deploy --only firestore:rules` before production |
| Dashboard area grid still present | Low | Scheduled for removal in M1 |
| `/dashboard/mining` page exists | Low | Scheduled for deletion in M4 |
| No `middleware.ts` route protection | Medium | Per-page auth guard still used; acceptable for M0 |
| Player position not persisted | Low | No `x`/`y` fields yet in Firestore schema — M2 work |
| `mineRandomOre()` is dead code | Low | Will be wired in M3 |
| `createdAt` mixed types in Firestore | Low | Legacy docs have ISO string; new docs have Timestamp; no UI reads this field |
| No `React.memo` on world components | Medium | Will cause re-render overhead at 60fps — add before M3 |

---

## Recommended Next Milestone

**Milestone 1 — Dashboard Simplification**

This is a small, well-scoped change that closes out the dashboard-as-lobby transformation.

**Steps:**
1. Delete the `AREAS` array and area grid JSX from `app/dashboard/page.tsx`
2. Delete `components/AreaCard.tsx`
3. The dashboard should then show only: RankCard + "Enter World" button + Pets section
4. Confirm `npm run build` passes
5. Update `MASTER_PROJECT.md` folder structure and `PROJECT_MEMORY.md` milestone status

**Estimated effort:** 30 minutes
**Risk:** Very low — purely subtractive change, no new code introduced

After M1, the project is clean enough to begin **Milestone 2 — Layer System**, which is the first truly additive milestone.

---

*Report generated: 2026-06-26*
