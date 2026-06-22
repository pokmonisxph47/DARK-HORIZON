"use client";

interface WorldHUDTopProps {
  rank: string;
  zenCoins: number;
  ores: number;
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

export function WorldHUDTop({ rank, zenCoins, ores }: WorldHUDTopProps) {
  const rankColor = RANK_COLORS[rank] || "#94a3b8";

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-3 py-2 md:px-5 md:py-3 flex items-center justify-between gap-2 backdrop-blur-md"
      style={{
        background: "linear-gradient(180deg, rgba(10,5,20,0.85) 0%, rgba(10,5,20,0) 100%)",
      }}
    >
      <Pill icon="★" label={rank} color={rankColor} />
      <div className="flex items-center gap-2">
        <Pill icon="🪙" label={zenCoins.toLocaleString()} color="#c9a84c" />
        <Pill icon="⛏️" label={ores.toLocaleString()} color="#60a5fa" />
      </div>
    </div>
  );
}

function Pill({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold"
      style={{
        fontFamily: "'Cinzel', serif",
        color,
        background: "rgba(15, 10, 30, 0.75)",
        border: `1px solid ${color}66`,
        boxShadow: `0 0 12px ${color}33`,
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

interface WorldHUDBottomProps {
  onInventory: () => void;
  onMap: () => void;
  onHomeCastle: () => void;
}

export function WorldHUDBottom({ onInventory, onMap, onHomeCastle }: WorldHUDBottomProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-3 py-3 md:px-6 flex items-center justify-center gap-3 backdrop-blur-md border-t border-purple-800/40"
      style={{ background: "rgba(10, 5, 20, 0.85)" }}
    >
      <HudButton icon="🎒" label="Inventory" onClick={onInventory} />
      <HudButton icon="🗺️" label="Map" onClick={onMap} />
      <HudButton icon="🏰" label="Home Castle" onClick={onHomeCastle} accent />
    </div>
  );
}

function HudButton({
  icon,
  label,
  onClick,
  accent,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5"
      style={{
        fontFamily: "'Cinzel', serif",
        color: accent ? "var(--gold-light)" : "#c4b5fd",
        background: accent ? "rgba(201, 168, 76, 0.12)" : "rgba(107, 33, 168, 0.15)",
        border: accent ? "1px solid rgba(201, 168, 76, 0.5)" : "1px solid rgba(167, 139, 250, 0.35)",
      }}
    >
      <span>{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}