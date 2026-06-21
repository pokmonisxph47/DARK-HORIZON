interface RankCardProps {
  username: string;
  rank: string;
  zenCoins: number;
  ores: Record<string, number>;
}

const RANK_COLORS: Record<string, string> = {
  Noob: "#94a3b8",
  Pro: "#22c55e",
  Awsunm: "#3b82f6",
  God: "#f59e0b",
  Heavens: "#a855f7",
  "Over Heavens": "#ec4899",
  "Dark Horizon": "#ef4444",
};

export default function RankCard({ username, rank, zenCoins, ores }: RankCardProps) {
  const rankColor = RANK_COLORS[rank] || "#94a3b8";
  
  // Sum all ores (stone + iron + crystal + mystic + dark)
  const totalOres = Object.values(ores).reduce((sum, count) => sum + count, 0);

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
          ★ {rank}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat icon="🪙" label="Zen Coins" value={zenCoins} color="var(--gold)" />
        <Stat icon="⛏️" label="Total Ores" value={totalOres} color="#60a5fa" />
        <Stat icon="🎮" label="Pet Balls" value={0} color="#a855f7" />
      </div>
    </div>
  );
}

function Stat({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  return (
    <div
      className="rounded-lg p-3 text-center border border-purple-800/30"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-lg font-bold" style={{ color, fontFamily: "'Cinzel', serif" }}>
        {value}
      </div>
      <div className="text-xs text-purple-400">{label}</div>
    </div>
  );
}
