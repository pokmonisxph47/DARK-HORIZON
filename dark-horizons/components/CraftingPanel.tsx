"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BALL_DATA, BALL_RECIPES, BallType, OreType, ORE_DATA, canCraftBall } from "@/lib/mining";

interface CraftingPanelProps {
  userId: string;
  ores: Record<OreType, number>;
  balls: Record<BallType, number>;
  onBallsCrafted: (newBalls: Record<BallType, number>) => void;
}

export default function CraftingPanel({
  userId,
  ores,
  balls,
  onBallsCrafted,
}: CraftingPanelProps) {
  const [craftingInProgress, setCraftingInProgress] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCraft(ballType: BallType) {
    if (craftingInProgress || !canCraftBall(ballType, ores)) return;

    setCraftingInProgress(true);
    setMessage("");

    try {
      // Deduct ores from player
      const recipe = BALL_RECIPES[ballType];
      const newOres = { ...ores };
      for (const oreType of Object.keys(recipe) as OreType[]) {
        newOres[oreType] -= recipe[oreType];
      }

      // Add ball to inventory
      const newBalls = { ...balls };
      newBalls[ballType]++;

      // Save to Firestore
      await updateDoc(doc(db, "users", userId), {
        ores: newOres,
        balls: newBalls,
      });

      // Update local state
      onBallsCrafted(newBalls);
      setMessage(`✨ Crafted ${BALL_DATA[ballType].name}!`);

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Crafting error:", err);
      setMessage("Error crafting. Try again.");
    } finally {
      setCraftingInProgress(false);
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Ore Inventory Summary */}
      <div
        className="rounded-xl border border-purple-700/50 p-6"
        style={{ background: "rgba(26,10,46,0.7)" }}
      >
        <h3
          className="text-purple-300 text-lg mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ⛏️ Ore Inventory
        </h3>
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

      {/* Pet Ball Maker */}
      <div
        className="rounded-xl border border-purple-700/50 p-6"
        style={{ background: "rgba(26,10,46,0.7)" }}
      >
        <h3
          className="text-purple-300 text-lg mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          🎮 Pet Ball Maker
        </h3>

        {message && (
          <div className="mb-4 p-3 rounded-lg text-center text-purple-300 bg-purple-900/30 border border-purple-700/50">
            {message}
          </div>
        )}

        <div className="space-y-3">
          {(["basic", "iron", "crystal", "mystic", "dark"] as BallType[]).map(
            (ballType) => {
              const ballInfo = BALL_DATA[ballType];
              const recipe = BALL_RECIPES[ballType];
              const canCraft = canCraftBall(ballType, ores);
              const cost = Object.entries(recipe)
                .filter(([, amount]) => amount > 0)
                .map(
                  ([oreType, amount]) =>
                    `${amount} ${ORE_DATA[oreType as OreType].name}`
                )
                .join(" + ");

              return (
                <button
                  key={ballType}
                  onClick={() => handleCraft(ballType)}
                  disabled={!canCraft || craftingInProgress}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    canCraft
                      ? "border-purple-600/60 hover:border-purple-400 hover:bg-purple-900/20 cursor-pointer"
                      : "border-gray-700/40 opacity-50 cursor-not-allowed"
                  }`}
                  style={{
                    background: canCraft
                      ? "rgba(45,27,78,0.7)"
                      : "rgba(15,10,30,0.7)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{ballInfo.emoji}</span>
                        <span
                          className="text-purple-300 font-bold"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {ballInfo.name}
                        </span>
                      </div>
                      <div className="text-xs text-purple-500">{cost}</div>
                    </div>
                    <div
                      className="text-right"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      <div className="text-2xl font-bold text-purple-300">
                        {balls[ballType]}
                      </div>
                      <div className="text-xs text-purple-600">owned</div>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Ball Inventory */}
      <div
        className="rounded-xl border border-purple-700/50 p-6"
        style={{ background: "rgba(26,10,46,0.7)" }}
      >
        <h3
          className="text-purple-300 text-lg mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ⚪ Ball Inventory
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(["basic", "iron", "crystal", "mystic", "dark"] as BallType[]).map(
            (ballType) => {
              const ballInfo = BALL_DATA[ballType];
              return (
                <div
                  key={ballType}
                  className="rounded-lg p-3 text-center border border-purple-800/30"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <div className="text-2xl mb-1">{ballInfo.emoji}</div>
                  <div className="text-lg font-bold text-purple-300">
                    {balls[ballType]}
                  </div>
                  <div className="text-xs text-purple-500">{ballInfo.name}</div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
