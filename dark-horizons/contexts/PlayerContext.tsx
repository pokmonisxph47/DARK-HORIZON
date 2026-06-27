"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthContext } from "@/contexts/AuthContext";
import type { BallInventory, OreInventory, Pet, PlayerData, Rank } from "@/types/player";

interface PlayerContextType {
  playerData: PlayerData | null;
  playerLoading: boolean;
  /** Re-fetch player data from Firestore. Call after any write that PlayerContext doesn't own. */
  refreshPlayerData: () => Promise<void>;
  /** Write updated ores + balls to Firestore and sync context state. */
  updateOresAndBalls: (
    ores: PlayerData["ores"],
    balls: PlayerData["balls"]
  ) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType>({
  playerData: null,
  playerLoading: true,
  refreshPlayerData: async () => {},
  updateOresAndBalls: async () => {},
});

const DEFAULT_ORES: OreInventory = {
  stone: 0,
  iron: 0,
  crystal: 0,
  mystic: 0,
  dark: 0,
};

const DEFAULT_BALLS: BallInventory = {
  basic: 0,
  iron: 0,
  crystal: 0,
  mystic: 0,
  dark: 0,
  exotic: 0,
};

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizePlayerData(raw: Partial<PlayerData> & { uid?: unknown }): PlayerData {
  const rawOres = raw.ores ?? {};
  const rawBalls = raw.balls ?? {};

  return {
    uid: typeof raw.uid === "string" ? raw.uid : "",
    username: typeof raw.username === "string" ? raw.username : "Player",
    rank: (typeof raw.rank === "string" ? raw.rank : "Noob") as Rank,
    zenCoins: normalizeNumber(raw.zenCoins),
    pets: Array.isArray(raw.pets) ? (raw.pets as Pet[]) : [],
    ores: {
      ...DEFAULT_ORES,
      ...rawOres,
    },
    balls: {
      ...DEFAULT_BALLS,
      ...rawBalls,
    },
    totalOresMined: normalizeNumber(raw.totalOresMined),
    totalPetsCaught: normalizeNumber(raw.totalPetsCaught),
    totalRolls: normalizeNumber(raw.totalRolls),
    createdAt: raw.createdAt,
  };
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuthContext();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [playerLoading, setPlayerLoading] = useState(true);

  const fetchPlayerData = useCallback(async () => {
    if (!user) {
      setPlayerData(null);
      setPlayerLoading(false);
      return;
    }
    setPlayerLoading(true);
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setPlayerData(normalizePlayerData(snap.data() as Partial<PlayerData>));
      } else {
        setPlayerData(null);
      }
    } finally {
      setPlayerLoading(false);
    }
  }, [user]);

  // Fetch once when auth resolves or user changes.
  useEffect(() => {
    if (!authLoading) {
      fetchPlayerData();
    }
  }, [authLoading, fetchPlayerData]);

  const updateOresAndBalls = useCallback(
    async (ores: PlayerData["ores"], balls: PlayerData["balls"]) => {
      if (!user || !playerData) return;
      const normalizedOres = { ...DEFAULT_ORES, ...ores };
      const normalizedBalls = { ...DEFAULT_BALLS, ...balls };
      await updateDoc(doc(db, "users", user.uid), {
        ores: normalizedOres,
        balls: normalizedBalls,
      });
      setPlayerData((prev) =>
        prev ? { ...prev, ores: normalizedOres, balls: normalizedBalls } : prev
      );
    },
    [user, playerData]
  );

  return (
    <PlayerContext.Provider
      value={{
        playerData,
        playerLoading,
        refreshPlayerData: fetchPlayerData,
        updateOresAndBalls,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
