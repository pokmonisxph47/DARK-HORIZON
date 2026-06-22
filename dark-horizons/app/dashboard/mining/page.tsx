"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authcontext";
import { getUserData } from "@/hooks/useauth";
import Navbar from "@/components/navbar";
import RankCard from "@/components/rankcard";
import AreaCard from "@/components/areacard";
import CraftingPanel from "@/components/craftingpanel";

interface PlayerData {
  username: string;
  rank: string;
  zenCoins: number;
  ores: Record<string, number>;
  balls: Record<string, number>;
  pets: string[];
}

const RANK_ORDER = ["Noob", "Pro", "Awsunm", "God", "Heavens", "Over Heavens", "Dark Horizon"];

function hasRank(playerRank: string, requiredRank: string): boolean {
  return RANK_ORDER.indexOf(playerRank) >= RANK_ORDER.indexOf(requiredRank);
}

const AREAS = [
  {
    name: "Pet Catching Area",
    icon: "🐾",
    description: "Venture into the wild to catch magical creatures and build your pet collection.",
    requiredRank: "Noob",
    href: "/dashboard/pet-catching",
  },
  {
    name: "Mining Zone",
    icon: "⛏️",
    description: "Descend into ancient mines filled with rare ores and forgotten treasures.",
    requiredRank: "Noob",
    href: "/dashboard/mining",
  },
  {
    name: "Roll Area",
    icon: "🎲",
    description: "Test your luck and fate at the mystic roll table. Fortune favors the bold.",
    requiredRank: "Noob",
    href: "/dashboard/roll",
  },
  {
    name: "1st Sea",
    icon: "🌊",
    description: "Sail the outer waters of the Mystic Seas. Adventure awaits beyond the horizon.",
    requiredRank: "Pro",
    href: "/dashboard/1st-sea",
  },
  {
    name: "2nd Sea",
    icon: "🌀",
    description: "The deeper currents hold stronger monsters and greater rewards.",
    requiredRank: "Awsunm",
    href: "/dashboard/2nd-sea",
  },
  {
    name: "3rd Sea",
    icon: "🔱",
    description: "Ancient maritime gods rule these treacherous waters. Only the worthy survive.",
    requiredRank: "God",
    href: "/dashboard/3rd-sea",
  },
  {
    name: "Beast Sea",
    icon: "🐉",
    description: "The legendary sea where colossal beasts from legend roam freely.",
    requiredRank: "Heavens",
    href: "/dashboard/beast-sea",
  },
  {
    name: "Dungeons",
    icon: "🏰",
    description: "Sealed ruins of the Lost Kingdoms, filled with relics and ultimate challenges.",
    requiredRank: "Over Heavens",
    href: "/dashboard/dungeons",
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Load player data from Firestore
  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) setPlayerData(data as PlayerData);
        setDataLoading(false);
      });
    }
  }, [user]);

  if (loading || dataLoading) {
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
                onClick={() => router.push(area.href)}
              />
            );
          })}
        </div>

        <div className="mt-8 p-5 rounded-xl border border-purple-800/40"
          style={{ background: "rgba(26,10,46,0.7)" }}>
          <h3
            className="text-purple-300 mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            🐾 Your Pets ({playerData.pets.length})
          </h3>
          {playerData.pets.length === 0 ? (
            <p className="text-purple-600 text-sm italic">
              You have no pets yet. Visit the Pet Catching Area to find one!
            </p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {playerData.pets.map((pet, i) => (
                <span key={i} className="bg-purple-900/50 border border-purple-700 rounded-full px-3 py-1 text-sm text-purple-300">
                  {pet}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Crafting Panel */}
        <CraftingPanel
          userId={user!.uid}
          ores={playerData.ores}
          balls={playerData.balls}
          onBallsCrafted={(newBalls) => {
            setPlayerData({
              ...playerData,
              balls: newBalls,
            });
          }}
        />
      </main>
    </div>
  );
}
