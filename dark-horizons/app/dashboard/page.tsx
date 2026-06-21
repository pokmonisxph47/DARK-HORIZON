"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mineRandomOre, ORE_DATA, OreType } from "@/lib/mining";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface PlayerOres {
  stone: number;
  iron: number;
  crystal: number;
  mystic: number;
  dark: number;
}

export default function MiningPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [ores, setOres] = useState<PlayerOres>({
    stone: 0,
    iron: 0,
    crystal: 0,
    mystic: 0,
    dark: 0,
  });
  const [lastMinedOre, setLastMinedOre] = useState<OreType | null>(null);
  const [miningInProgress, setMiningInProgress] = useState(false);
  const [message, setMessage] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Load player's ores from Firestore
  useEffect(() => {
    if (user) {
      const fetchOres = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setOres(
            data.ores || {
              stone: 0,
              iron: 0,
              crystal: 0,
              mystic: 0,
              dark: 0,
            }
          );
        }
        setDataLoading(false);
      };
      fetchOres();
    }
  }, [user]);

  // Mine an ore
  async function handleMine() {
    if (miningInProgress) return;
    setMiningInProgress(true);
    setMessage("");

    try {
      // 1. Roll a random ore
      const minedOreType = mineRandomOre();
      const oreName = ORE_DATA[minedOreType].name;
      const oreEmoji = ORE_DATA[minedOreType].emoji;

      // 2. Update local state
      setLastMinedOre(minedOreType);
      const newOres = { ...ores };
      newOres[minedOreType]++;
      setOres(newOres);

      // 3. Save to Firestore
      await updateDoc(doc(db, "users", user!.uid), {
        ores: newOres,
      });

      setMessage(`⛏️ Mined ${oreEmoji} ${oreName}!`);

      // Clear message after 2 seconds
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Mining error:", err);
      setMessage("Error saving ore. Try again.");
    } finally {
      setMiningInProgress(false);
    }
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-400">Loading mines...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar username="" />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1
            className="text-glow text-4xl font-bold mb-2"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
          >
            ⛏️ Mining Zone
          </h1>
          <p className="text-purple-400">Descend into ancient mines for rare ores</p>
        </div>

        {/* Mining Panel */}
        <div
          className="rounded-xl border border-purple-700/50 p-8 mb-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,10,46,0.9) 0%, rgba(45,27,78,0.8) 100%)",
            boxShadow: "0 0 40px rgba(107, 33, 168, 0.2)",
          }}
        >
          {/* Last mined display */}
          {lastMinedOre && (
            <div
              className="mb-6 p-4 rounded-lg text-center border border-purple-600/50"
              style={{ background: "rgba(147, 51, 234, 0.1)" }}
            >
              <div className="text-3xl mb-2">{ORE_DATA[lastMinedOre].emoji}</div>
              <p
                className="text-purple-300"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {ORE_DATA[lastMinedOre].name}
              </p>
            </div>
          )}

          {/* Mine button */}
          <button
            onClick={handleMine}
            disabled={miningInProgress}
            className="w-full btn-gold py-4 rounded-lg text-lg mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {miningInProgress ? "Mining..." : "Mine Ore"}
          </button>

          {/* Status message */}
          {message && (
            <div className="text-center text-purple-300 mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              {message}
            </div>
          )}
        </div>

        {/* Ore Inventory */}
        <div
          className="rounded-xl border border-purple-700/50 p-6 mb-8"
          style={{
            background: "rgba(26,10,46,0.7)",
          }}
        >
          <h2
            className="text-purple-300 text-lg mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            📦 Your Ores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(["stone", "iron", "crystal", "mystic", "dark"] as OreType[]).map(
              (oreType) => {
                const ore = ORE_DATA[oreType];
                return (
                  <div
                    key={oreType}
                    className="rounded-lg p-3 text-center border border-purple-800/30"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <div className="text-2xl mb-1">{ore.emoji}</div>
                    <div className="text-lg font-bold text-purple-300">
                      {ores[oreType]}
                    </div>
                    <div className="text-xs text-purple-500">{ore.name}</div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-purple-400 hover:text-purple-300 underline"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
