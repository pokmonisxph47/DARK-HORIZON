"use client";

import { ReactNode } from "react";
import { WORLD_HEIGHT, WORLD_WIDTH, ZONES } from "@/lib/worldzones";

function ModalShell({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(5, 2, 12, 0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-purple-700/50 p-6 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(26,10,46,0.97) 0%, rgba(45,27,78,0.92) 100%)",
          boxShadow: "0 0 50px rgba(107, 33, 168, 0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface ZoneAnnouncementModalProps {
  icon: string;
  title: string;
  message: string;
  color: string;
  comingSoon?: boolean;
  onClose: () => void;
}

export function ZoneAnnouncementModal({
  icon,
  title,
  message,
  color,
  comingSoon,
  onClose,
}: ZoneAnnouncementModalProps) {
  return (
    <ModalShell onClose={onClose}>
      <div className="text-5xl mb-3">{icon}</div>
      <h2
        className="text-xl font-bold mb-2 tracking-wide"
        style={{ fontFamily: "'Cinzel Decorative', serif", color }}
      >
        {title}
      </h2>
      <p className="text-purple-300 text-sm mb-1 leading-relaxed">{message}</p>
      {comingSoon && (
        <p className="text-purple-500 text-xs italic mb-4">A future update will bring this area to life.</p>
      )}
      <button
        onClick={onClose}
        className="mt-4 w-full btn-gold py-2.5 rounded-lg text-sm"
      >
        Continue Exploring
      </button>
    </ModalShell>
  );
}

interface MapOverviewModalProps {
  playerX: number;
  playerY: number;
  onClose: () => void;
}

export function MapOverviewModal({ playerX, playerY, onClose }: MapOverviewModalProps) {
  const MAP_W = 280;
  const MAP_H = (WORLD_HEIGHT / WORLD_WIDTH) * MAP_W;
  const scale = MAP_W / WORLD_WIDTH;

  return (
    <ModalShell onClose={onClose}>
      <h2
        className="text-lg font-bold mb-4 tracking-widest uppercase"
        style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)" }}
      >
        🗺️ World Map
      </h2>
      <div
        className="relative mx-auto rounded-lg border border-purple-700/50 overflow-hidden"
        style={{ width: MAP_W, height: MAP_H, background: "rgba(10,5,20,0.6)" }}
      >
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            className="absolute rounded-sm"
            style={{
              left: zone.x * scale,
              top: zone.y * scale,
              width: Math.max(zone.width * scale, 4),
              height: Math.max(zone.height * scale, 4),
              background: `${zone.color}55`,
              border: `1px solid ${zone.color}`,
            }}
            title={zone.name}
          />
        ))}
        {/* Player marker */}
        <div
          className="absolute rounded-full"
          style={{
            left: playerX * scale - 3,
            top: playerY * scale - 3,
            width: 6,
            height: 6,
            background: "#fff",
            boxShadow: "0 0 8px #a78bfa, 0 0 4px #fff",
          }}
        />
      </div>
      <p className="text-purple-400 text-xs mt-3">The glowing dot marks your position.</p>
      <button onClick={onClose} className="mt-4 w-full btn-gold py-2.5 rounded-lg text-sm">
        Close Map
      </button>
    </ModalShell>
  );
}