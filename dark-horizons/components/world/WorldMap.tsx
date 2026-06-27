"use client";

import { memo, ReactNode } from "react";
import type { CSSProperties } from "react";
import { AMBIENT_PARTICLES, WORLD_HEIGHT, WORLD_WIDTH, WorldZone, ZONES } from "@/lib/worldzones";
import { DecorativeObjects, TerrainLayers, WalkingPaths, WaterSystem } from "@/components/world/WorldDecor";

interface WorldMapProps {
  cameraX: number;
  cameraY: number;
  viewportWidth: number;
  viewportHeight: number;
  activeZoneId: string | null;
  children?: ReactNode;
}

function WorldMap({
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
      <div className="world-vignette pointer-events-none" />
      <div
        className="absolute top-0 left-0 world-canvas"
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate3d(${-cameraX}px, ${-cameraY}px, 0)`,
        }}
      >
        <div className="terrain-base" />
        <TerrainLayers />
        <WaterSystem />
        <WalkingPaths />
        <DecorativeObjects />

        {AMBIENT_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="ambient-light pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size + 4,
              height: p.size + 4,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {ZONES.map((zone) => (
          <ZoneTile key={zone.id} zone={zone} active={activeZoneId === zone.id} />
        ))}

        <div className="map-lighting pointer-events-none" />
        {children}
      </div>
    </div>
  );
}

export default memo(WorldMap);

const ZoneTile = memo(function ZoneTile({ zone, active }: { zone: WorldZone; active: boolean }) {
  const isScenic = zone.type === "scenic";

  return (
    <div
      className={`zone-marker ${active ? "zone-marker-active" : ""} ${isScenic ? "zone-marker-scenic" : ""}`}
      style={{
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
        "--zone-color": zone.color,
      } as CSSProperties}
    >
      <div className="zone-marker-glow" />
      <div className="zone-label">
        <span className="zone-icon">{zone.icon}</span>
        <span className="zone-name">{zone.name}</span>
      </div>
    </div>
  );
});
