"use client";

import { memo } from "react";
import type { CSSProperties } from "react";

type DecorKind = "pine" | "oak" | "rock" | "flower" | "ruin" | "lantern";

interface DecorItem {
  id: string;
  kind: DecorKind;
  x: number;
  y: number;
  size: number;
  tone?: string;
}

interface TerrainPatch {
  id: string;
  className: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
}

const FORESTS: TerrainPatch[] = [
  { id: "north-wood", className: "terrain-forest", x: 80, y: 80, width: 520, height: 280, rotate: -8 },
  { id: "west-wood", className: "terrain-forest-dark", x: 40, y: 780, width: 620, height: 420, rotate: 4 },
  { id: "castle-grove", className: "terrain-forest", x: 720, y: 230, width: 360, height: 210, rotate: 10 },
];

const BEACHES: TerrainPatch[] = [
  { id: "south-beach", className: "terrain-beach", x: 0, y: 1290, width: 1450, height: 210 },
  { id: "east-beach", className: "terrain-beach", x: 1980, y: 620, width: 220, height: 820 },
];

const CLIFFS: TerrainPatch[] = [
  { id: "north-cliffs", className: "terrain-cliffs", x: 1360, y: 80, width: 760, height: 440, rotate: -4 },
  { id: "mine-cliffs", className: "terrain-cliffs-dark", x: 60, y: 360, width: 520, height: 360, rotate: 6 },
];

const GRASS_PATCHES: TerrainPatch[] = [
  { id: "meadow-1", className: "grass-variation grass-light", x: 580, y: 520, width: 260, height: 170 },
  { id: "meadow-2", className: "grass-variation grass-gold", x: 1130, y: 760, width: 300, height: 180, rotate: -12 },
  { id: "meadow-3", className: "grass-variation grass-dark", x: 520, y: 960, width: 360, height: 220, rotate: 8 },
  { id: "meadow-4", className: "grass-variation grass-light", x: 1240, y: 360, width: 230, height: 150, rotate: 14 },
];

const DECOR: DecorItem[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `pine-north-${i}`,
    kind: "pine" as const,
    x: 110 + ((i * 83) % 470),
    y: 110 + ((i * 47) % 230),
    size: 30 + (i % 5) * 5,
  })),
  ...Array.from({ length: 34 }, (_, i) => ({
    id: `oak-west-${i}`,
    kind: (i % 3 === 0 ? "pine" : "oak") as DecorKind,
    x: 80 + ((i * 91) % 550),
    y: 820 + ((i * 61) % 360),
    size: 28 + (i % 6) * 4,
  })),
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `castle-tree-${i}`,
    kind: "oak" as const,
    x: 760 + ((i * 59) % 330),
    y: 250 + ((i * 43) % 180),
    size: 24 + (i % 4) * 4,
  })),
  ...Array.from({ length: 26 }, (_, i) => ({
    id: `mountain-rock-${i}`,
    kind: "rock" as const,
    x: 1470 + ((i * 73) % 560),
    y: 160 + ((i * 67) % 300),
    size: 18 + (i % 5) * 6,
    tone: i % 2 === 0 ? "#8a8192" : "#b4a8bc",
  })),
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `mine-rock-${i}`,
    kind: "rock" as const,
    x: 130 + ((i * 57) % 360),
    y: 390 + ((i * 41) % 280),
    size: 16 + (i % 4) * 5,
    tone: i % 2 === 0 ? "#4f6475" : "#7592ad",
  })),
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `flower-${i}`,
    kind: "flower" as const,
    x: 520 + ((i * 97) % 820),
    y: 500 + ((i * 71) % 610),
    size: 8 + (i % 4),
    tone: ["#f8b4d9", "#fde68a", "#bfdbfe", "#c4b5fd"][i % 4],
  })),
  { id: "broken-arch", kind: "ruin", x: 1695, y: 905, size: 70 },
  { id: "roll-lantern-a", kind: "lantern", x: 1730, y: 955, size: 28 },
  { id: "roll-lantern-b", kind: "lantern", x: 2050, y: 1185, size: 28 },
  { id: "castle-lantern-a", kind: "lantern", x: 900, y: 280, size: 26 },
  { id: "castle-lantern-b", kind: "lantern", x: 1280, y: 280, size: 26 },
];

function patchStyle(patch: TerrainPatch) {
  return {
    left: patch.x,
    top: patch.y,
    width: patch.width,
    height: patch.height,
    transform: patch.rotate ? `rotate(${patch.rotate}deg)` : undefined,
  };
}

export const TerrainLayers = memo(function TerrainLayers() {
  return (
    <>
      {GRASS_PATCHES.map((patch) => (
        <div key={patch.id} className={patch.className} style={patchStyle(patch)} />
      ))}
      {FORESTS.map((patch) => (
        <div key={patch.id} className={patch.className} style={patchStyle(patch)} />
      ))}
      {BEACHES.map((patch) => (
        <div key={patch.id} className={patch.className} style={patchStyle(patch)} />
      ))}
      {CLIFFS.map((patch) => (
        <div key={patch.id} className={patch.className} style={patchStyle(patch)} />
      ))}
    </>
  );
});

export const WaterSystem = memo(function WaterSystem() {
  return (
    <>
      <div className="waterfall-sheet" style={{ left: 902, top: 370, width: 128, height: 230 }} />
      <div className="waterfall-mist" style={{ left: 850, top: 528, width: 230, height: 80 }} />
      <div className="river-body river-vertical" style={{ left: 878, top: 535, width: 205, height: 730 }} />
      <div className="river-body river-bend" style={{ left: 690, top: 1160, width: 410, height: 120 }} />
      <div className="shoreline" style={{ left: 0, top: 1285, width: 1450, height: 34 }} />
      <div className="shoreline shoreline-east" style={{ left: 1960, top: 610, width: 34, height: 800 }} />
    </>
  );
});

export const WalkingPaths = memo(function WalkingPaths() {
  return (
    <>
      <div className="world-path path-castle" />
      <div className="world-path path-west" />
      <div className="world-path path-south" />
      <div className="world-path path-east" />
      <div className="world-path path-mountain" />
      <div className="world-bridge bridge-north" />
      <div className="world-bridge bridge-south" />
    </>
  );
});

export const DecorativeObjects = memo(function DecorativeObjects() {
  return (
    <>
      {DECOR.map((item) => (
        <DecorObject key={item.id} item={item} />
      ))}
    </>
  );
});

function DecorObject({ item }: { item: DecorItem }) {
  const style = {
    left: item.x,
    top: item.y,
    width: item.size,
    height: item.size,
    "--decor-tone": item.tone,
  } as CSSProperties;

  if (item.kind === "pine") {
    return <div className="decor decor-pine" style={style} />;
  }
  if (item.kind === "oak") {
    return <div className="decor decor-oak" style={style} />;
  }
  if (item.kind === "rock") {
    return <div className="decor decor-rock" style={style} />;
  }
  if (item.kind === "flower") {
    return <div className="decor decor-flower" style={style} />;
  }
  if (item.kind === "ruin") {
    return <div className="decor decor-ruin" style={style} />;
  }
  return <div className="decor decor-lantern" style={style} />;
}
