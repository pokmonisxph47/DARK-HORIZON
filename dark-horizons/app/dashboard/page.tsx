"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePlayerContext } from "@/contexts/PlayerContext";
import Navbar from "@/components/Navbar";
import RankCard from "@/components/RankCard";

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
          <div className="text-5xl mb-4 float-anim">DH</div>
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
          petCount={playerData.pets.length}
          balls={playerData.balls}
        />

        <Link
          href="/dashboard/world"
          className="btn-gold w-full flex items-center justify-center gap-3 py-5 rounded-xl text-xl mb-4 shadow-xl"
        >
          Enter the World
        </Link>

        <div className="mb-8 flex justify-center">
          <Link
            href="/dashboard/mining"
            className="rounded-lg border border-purple-700/60 px-4 py-2 text-sm text-purple-300 transition-colors hover:border-purple-400 hover:text-purple-100"
            style={{ fontFamily: "'Cinzel', serif", background: "rgba(26,10,46,0.55)" }}
          >
            Mining Test Page
          </Link>
        </div>

        <div
          className="mt-8 p-5 rounded-xl border border-purple-800/40"
          style={{ background: "rgba(26,10,46,0.7)" }}
        >
          <h3
            className="text-purple-300 mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Your Pets ({playerData.pets.length})
          </h3>
          {playerData.pets.length === 0 ? (
            <p className="text-purple-600 text-sm italic">
              You have no pets yet. Walk to the forest in the world to find one.
            </p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {playerData.pets.map((pet, i) => (
                <span
                  key={`${pet.id}-${i}`}
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
