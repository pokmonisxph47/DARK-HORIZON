import type { OreType, BallType } from "@/lib/mining";

export type Rank =
  | "Noob"
  | "Awesome"
  | "God"
  | "Heavens"
  | "Over Heavens"
  | "Dark Horizon";

export type PetRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export interface Pet {
  id: string;
  name: string;
  emoji: string;
  rarity: PetRarity;
  biome: string;
  maxHP: number;
  attack: number;
  caughtAt: string;
}

export type OreInventory = Record<OreType, number>;
export type BallInventory = Record<BallType | "exotic", number>;

export interface PlayerData {
  uid: string;
  username: string;
  rank: Rank;
  zenCoins: number;
  pets: Pet[];
  ores: OreInventory;
  balls: BallInventory;
  totalOresMined: number;
  totalPetsCaught: number;
  totalRolls: number;
  createdAt?: string | { seconds: number; nanoseconds: number };
}
