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
import type { PlayerData } from "@/types/player";

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
        setPlayerData(snap.data() as PlayerData);
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
      await updateDoc(doc(db, "users", user.uid), { ores, balls });
      setPlayerData((prev) => (prev ? { ...prev, ores, balls } : prev));
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
