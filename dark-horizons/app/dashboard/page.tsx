"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { hasRank } from "@/constants/ranks";
import Navbar from "@/components/Navbar";
import RankCard from "@/components/RankCard";
import AreaCard from "@/components/AreaCard";
import type { Rank } from "@/types/player";

// Game areas — rank requirements match GAME_RULES.md exactly.
const AREAS: { name: string; icon: string; description: string; requiredRank: Rank }[] = [
  {
    name: "Pet Catching Area",
    icon: "🐾",
    description: "Venture into the wild to catch magical creatures and build your pet collection.",
    requiredRank: "Noob",
  },
  {
    name: "Mining Zone",
    icon: "⛏️",
    description: "Descend into ancient mines filled with rare ores and forgotten treasures.",
    requiredRank: "Noob",
  },
  {
    name: "Roll Area",
    icon: "🎲",
    description: "Test your luck and fate at the mystic roll table. Fortune favors the bold.",
    requiredRank: "Noob",
  },
  {
    name: "1st Sea",
    icon: "🌊",
    description: "Sail the outer waters of the Mystic Seas. Adventure awaits beyond the horizon.",
    requiredRank: "Awesome",
  },
  {
    name: "2nd Sea",
    icon: "🌀",
    description: "The deeper currents hold stronger monsters and greater rewards.",
    requiredRank: "God",
  },
  {
    name: "3rd Sea",
    icon: "🔱",
    description: "Ancient maritime gods rule these treacherous waters. Only the worthy survive.",
    requiredRank: "Heavens",
  },
  {
    name: "Beast Sea",
    icon: "🐉",
    description: "The legendary sea where colossal beasts from legend roam freely.",
    requiredRank: "Over Heavens",
  },
  {
    name: "Dungeons",
    icon: "🏰",
    description: "Sealed ruins of the Lost Kingdoms, filled with relics and ultimate challenges.",
    requiredRank: "God",
  },
];

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthContext();
  const { playerData, playerLoading } = usePlayerContext();
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

  if (!playerData) return null;

  return (
    <div className="min-h-screen">
      <Navbar username={playerData.username} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <RankCard
          username={playerData.username}
          rank={playerData.rank}
          zenCoins={playerData.zenCoins}
          ores={playerData.ores}
        />

        <Link
          href="/dashboard/world"
          className="btn-gold w-full flex items-center justify-center gap-3 py-4 rounded-xl text-lg mb-8 shadow-xl"
        >
          🗺️ Enter the World
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-purple-800 to-transparent" />
          <h2
            className="text-purple-300 text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ✦ Game Areas ✦
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-purple-800 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AREAS.map((area) => {
            const isLocked = !hasRank(playerData.rank, area.requiredRank);
            return (
              <AreaCard
                key={area.name}
                name={area.name}
                icon={area.icon}
                description={area.description}
                isLocked={isLocked}
                requiredRank={isLocked ? area.requiredRank : undefined}
                onClick={() => alert(`${area.name} — enter from the world map!`)}
              />
            );
          })}
        </div>

        <div
          className="mt-8 p-5 rounded-xl border border-purple-800/40"
          style={{ background: "rgba(26,10,46,0.7)" }}
        >
          <h3
            className="text-purple-300 mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            🐾 Your Pets ({playerData.pets.length})
          </h3>
          {playerData.pets.length === 0 ? (
            <p className="text-purple-600 text-sm italic">
              You have no pets yet. Walk to the forest in the world to find one!
            </p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {playerData.pets.map((pet, i) => (
                <span
                  key={i}
                  className="bg-purple-900/50 border border-purple-700 rounded-full px-3 py-1 text-sm text-purple-300"
                >
                  {pet.emoji} {pet.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
