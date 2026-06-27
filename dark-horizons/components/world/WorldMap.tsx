"use client";

import { ReactNode } from "react";
import { AMBIENT_PARTICLES, WORLD_HEIGHT, WORLD_WIDTH, WorldZone, ZONES } from "@/lib/worldzones";

interface WorldMapProps {
  cameraX: number;
  cameraY: number;
  viewportWidth: number;
  viewportHeight: number;
  activeZoneId: string | null;
  children?: ReactNode;
}

export default function WorldMap({
  cameraX,
  cameraY,
  viewportWidth,
  viewportHeight,
  activeZoneId,
  children,
}: WorldMapProps) {
  return (
    <div
      className="absolute top-0 left-0 overflow-hidden"
      style={{ width: viewportWidth, height: viewportHeight }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate(${-cameraX}px, ${-cameraY}px)`,
          backgroundColor: "#120a26",
          backgroundImage:
            "radial-gradient(ellipse at 15% 20%, rgba(107, 33, 168, 0.25) 0%, transparent 45%)," +
            "radial-gradient(ellipse at 85% 15%, rgba(30, 58, 138, 0.25) 0%, transparent 45%)," +
            "radial-gradient(ellipse at 50% 90%, rgba(13, 148, 136, 0.18) 0%, transparent 50%)," +
            "linear-gradient(180deg, rgba(26,10,46,1) 0%, rgba(10,15,46,1) 100%)",
        }}
      >
        {/* Subtle terrain grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient twinkling particles */}
        {AMBIENT_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: "var(--gold-light)",
              animation: `twinkle 3s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Zones */}
        {ZONES.map((zone) => (
          <ZoneTile key={zone.id} zone={zone} active={activeZoneId === zone.id} />
        ))}

        {/* Player + anything else injected by the parent */}
        {children}
      </div>
    </div>
  );
}

function ZoneTile({ zone, active }: { zone: WorldZone; active: boolean }) {
  const isScenic = zone.type === "scenic";

  return (
    <div
      className="absolute rounded-2xl"
      style={{
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
        background: isScenic
          ? `linear-gradient(135deg, ${zone.color}33 0%, ${zone.color}14 100%)`
          : `linear-gradient(135deg, ${zone.color}26 0%, rgba(15,10,30,0.6) 100%)`,
        border: `1.5px solid ${zone.color}${isScenic ? "55" : active ? "ee" : "99"}`,
        boxShadow: active
          ? `0 0 35px ${zone.color}99, inset 0 0 25px ${zone.color}33`
          : `0 0 18px ${zone.color}22, inset 0 0 15px rgba(0,0,0,0.25)`,
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-1 px-2 text-center">
        <span style={{ fontSize: Math.min(zone.width, zone.height) * 0.22 }}>{zone.icon}</span>
        <span
          className="text-xs md:text-sm font-bold tracking-wide uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: zone.color }}
        >
          {zone.name}
        </span>
      </div>
    </div>
  );
}