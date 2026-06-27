import { RANK_COLORS } from "@/constants/ranks";
import type { BallInventory, OreInventory } from "@/types/player";

interface RankCardProps {
  username: string;
  rank: string;
  zenCoins: number;
  ores?: Partial<OreInventory> | null;
  petCount: number;
  balls?: Partial<BallInventory> | null;
}

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

const BALL_LABELS: Record<keyof BallInventory, string> = {
  basic: "Basic",
  iron: "Iron",
  crystal: "Crystal",
  mystic: "Mystic",
  dark: "Dark",
  exotic: "Exotic",
};

export default function RankCard({
  username,
  rank,
  zenCoins,
  ores,
  petCount,
  balls,
}: RankCardProps) {
  const rankColor = RANK_COLORS[rank as keyof typeof RANK_COLORS] ?? "#94a3b8";
  const safeOres = { ...DEFAULT_ORES, ...(ores ?? {}) };
  const safeBalls = { ...DEFAULT_BALLS, ...(balls ?? {}) };
  const totalOres = Object.values(safeOres).reduce((sum, count) => sum + count, 0);
  const totalBalls = Object.values(safeBalls).reduce((sum, count) => sum + count, 0);

  return (
    <div
      className="rounded-xl border p-6 mb-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(26,10,46,0.9) 0%, rgba(45,27,78,0.8) 100%)",
        borderColor: rankColor,
        boxShadow: `0 0 25px ${rankColor}33, inset 0 0 25px rgba(0,0,0,0.3)`,
      }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-2xl"
        style={{ background: rankColor }}
      />

      <h2
        className="text-2xl md:text-3xl font-bold mb-1"
        style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-light)" }}
      >
        {username}
      </h2>

      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm text-purple-400" style={{ fontFamily: "'Cinzel', serif" }}>
          Rank:
        </span>
        <span
          className="text-sm font-bold px-3 py-0.5 rounded-full border"
          style={{
            color: rankColor,
            borderColor: rankColor,
            background: `${rankColor}18`,
            fontFamily: "'Cinzel', serif",
          }}
        >
          {rank}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Zen Coins" value={zenCoins} color="var(--gold)" />
        <Stat label="Total Ores" value={totalOres} color="#60a5fa" />
        <Stat label="Pets" value={petCount} color="#34d399" />
        <Stat label="Pet Balls" value={totalBalls} color="#a855f7" />
      </div>

      <div
        className="mt-5 rounded-lg border border-purple-800/30 p-4"
        style={{ background: "rgba(0,0,0,0.22)" }}
      >
        <h3
          className="mb-3 text-xs uppercase tracking-widest text-purple-400"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Ball Inventory
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {(Object.keys(BALL_LABELS) as Array<keyof BallInventory>).map((ballType) => (
            <div
              key={ballType}
              className="rounded border border-purple-800/30 px-3 py-2 text-center"
              style={{ background: "rgba(26,10,46,0.5)" }}
            >
              <div className="text-sm font-semibold text-purple-200">{safeBalls[ballType]}</div>
              <div className="text-xs text-purple-500">{BALL_LABELS[ballType]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="rounded-lg p-3 text-center border border-purple-800/30"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="text-lg font-bold" style={{ color, fontFamily: "'Cinzel', serif" }}>
        {value}
      </div>
      <div className="text-xs text-purple-400">{label}</div>
    </div>
  );
}
