"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePlayerContext } from "@/contexts/PlayerContext";
import Navbar from "@/components/Navbar";
import RankCard from "@/components/RankCard";
import CraftingPanel from "@/components/CraftingPanel";

// NOTE: This page is scheduled for deletion in Milestone 3.
// Crafting will move into the Home Castle interior world layer.
// It is kept here only until that milestone ships.

export default function MiningPage() {
  const { user, loading: authLoading } = useAuthContext();
  const { playerData, playerLoading, refreshPlayerData } = usePlayerContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || playerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 float-anim">⚔️</div>
          <p className="text-purple-400 text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
            Loading your legend...
          </p>
        </div>
      </div>
    );
  }

  if (!playerData || !user) return null;

  return (
    <div className="min-h-screen">
      <Navbar username={playerData.username} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <RankCard
          username={playerData.username}
          rank={playerData.rank}
          zenCoins={playerData.zenCoins}
          ores={playerData.ores}
          petCount={playerData.pets.length}
          balls={playerData.balls}
        />

        <CraftingPanel
          userId={user.uid}
          ores={playerData.ores}
          balls={playerData.balls}
          onBallsCrafted={async () => {
            // Re-sync PlayerContext after CraftingPanel writes to Firestore directly.
            await refreshPlayerData();
          }}
        />
      </main>
    </div>
  );
}
