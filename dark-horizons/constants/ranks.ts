import type { Rank } from "@/types/player";

// Canonical rank order — Noob (lowest) to Dark Horizon (highest).
// "Awsunm" was a typo; the correct name is "Awesome".
// "Pro" is removed — it is not in GAME_RULES.md.
export const RANK_ORDER: Rank[] = [
  "Noob",
  "Awesome",
  "God",
  "Heavens",
  "Over Heavens",
  "Dark Horizon",
];

export const RANK_COLORS: Record<Rank, string> = {
  Noob: "#94a3b8",
  Awesome: "#3b82f6",
  God: "#f59e0b",
  Heavens: "#a855f7",
  "Over Heavens": "#ec4899",
  "Dark Horizon": "#ef4444",
};

/** Returns true if playerRank is equal to or higher than requiredRank. */
export function hasRank(playerRank: string, requiredRank: string): boolean {
  const pIdx = RANK_ORDER.indexOf(playerRank as Rank);
  const rIdx = RANK_ORDER.indexOf(requiredRank as Rank);
  // If either rank is unknown, treat as not having the rank.
  if (pIdx === -1 || rIdx === -1) return false;
  return pIdx >= rIdx;
}
