// Ore types and rarity system
export type OreType = "stone" | "iron" | "crystal" | "mystic" | "dark";
export type BallType = "basic" | "iron" | "crystal" | "mystic" | "dark";

export interface Ore {
  name: string;
  emoji: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
}

export const ORE_DATA: Record<OreType, Ore> = {
  stone: {
    name: "Stone Ore",
    emoji: "🪨",
    rarity: "Common",
  },
  iron: {
    name: "Iron Ore",
    emoji: "⚙️",
    rarity: "Uncommon",
  },
  crystal: {
    name: "Crystal Ore",
    emoji: "💎",
    rarity: "Rare",
  },
  mystic: {
    name: "Mystic Ore",
    emoji: "✨",
    rarity: "Epic",
  },
  dark: {
    name: "Dark Ore",
    emoji: "⚫",
    rarity: "Legendary",
  },
};

// Mining drop chances (must add up to 100)
export const MINING_WEIGHTS: Record<OreType, number> = {
  stone: 50,
  iron: 30,
  crystal: 15,
  mystic: 4,
  dark: 1,
};

// Crafting recipes: what ores are needed to craft each ball
export const BALL_RECIPES: Record<BallType, Record<OreType, number>> = {
  basic: {
    stone: 5,
    iron: 0,
    crystal: 0,
    mystic: 0,
    dark: 0,
  },
  iron: {
    stone: 2,
    iron: 3,
    crystal: 0,
    mystic: 0,
    dark: 0,
  },
  crystal: {
    stone: 0,
    iron: 3,
    crystal: 2,
    mystic: 0,
    dark: 0,
  },
  mystic: {
    stone: 0,
    iron: 0,
    crystal: 2,
    mystic: 1,
    dark: 0,
  },
  dark: {
    stone: 0,
    iron: 0,
    crystal: 0,
    mystic: 2,
    dark: 1,
  },
};

export const BALL_DATA: Record<BallType, { name: string; emoji: string; color: string }> = {
  basic: {
    name: "Basic Ball",
    emoji: "⚪",
    color: "#94a3b8",
  },
  iron: {
    name: "Iron Ball",
    emoji: "🔩",
    color: "#60a5fa",
  },
  crystal: {
    name: "Crystal Ball",
    emoji: "🔮",
    color: "#3b82f6",
  },
  mystic: {
    name: "Mystic Ball",
    emoji: "🌟",
    color: "#a855f7",
  },
  dark: {
    name: "Dark Ball",
    emoji: "🖤",
    color: "#ef4444",
  },
};

// Mine a random ore based on rarity weights
export function mineRandomOre(): OreType {
  const roll = Math.random() * 100;
  let cumulative = 0;

  const oreOrder: OreType[] = ["dark", "mystic", "crystal", "iron", "stone"];
  for (const oreType of oreOrder) {
    cumulative += MINING_WEIGHTS[oreType];
    if (roll < cumulative) {
      return oreType;
    }
  }

  return "stone"; // fallback
}

// Check if player has enough ores to craft a ball
export function canCraftBall(
  ballType: BallType,
  playerOres: Record<OreType, number>
): boolean {
  const recipe = BALL_RECIPES[ballType];
  for (const oreType of Object.keys(recipe) as OreType[]) {
    if (playerOres[oreType] < recipe[oreType]) {
      return false;
    }
  }
  return true;
}
