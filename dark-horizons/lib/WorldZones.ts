// World map dimensions and zone layout for the explorable overworld.
// Mining Zone / Pet Catching Area / Roll Area are STUBS in Milestone 1 —
// only Home Castle actually navigates anywhere. The others announce
// themselves so Milestone 2+ can wire in real systems without touching
// the movement/collision code.

export type ZoneType = "castle" | "mining" | "pets" | "roll" | "scenic";

export interface WorldZone {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: ZoneType;
  description: string;
}

// Total size of the world in pixels (unscaled "world space")
export const WORLD_WIDTH = 2200;
export const WORLD_HEIGHT = 1500;

export const PLAYER_SIZE = 36;

// Where the player spawns (just below the castle gates, outside the castle trigger zone)
export const SPAWN_X = 1100;
export const SPAWN_Y = 320;

export const ZONES: WorldZone[] = [
  {
    id: "home-castle",
    name: "Home Castle",
    icon: "🏰",
    x: 950,
    y: 60,
    width: 300,
    height: 200,
    color: "#c9a84c",
    type: "castle",
    description: "Your stronghold. Return here to manage your legend.",
  },
  {
    id: "mining-zone",
    name: "Mining Zone",
    icon: "⛏️",
    x: 140,
    y: 420,
    width: 320,
    height: 260,
    color: "#60a5fa",
    type: "mining",
    description: "Ancient mines filled with rare ores and forgotten treasures.",
  },
  {
    id: "pet-catching-area",
    name: "Pet Catching Area",
    icon: "🐾",
    x: 140,
    y: 980,
    width: 340,
    height: 280,
    color: "#34d399",
    type: "pets",
    description: "Magical creatures roam these woods, waiting to be tamed.",
  },
  {
    id: "roll-area",
    name: "Roll Area",
    icon: "🎲",
    x: 1760,
    y: 980,
    width: 300,
    height: 260,
    color: "#f472b6",
    type: "roll",
    description: "The mystic roll table. Fortune favors the bold.",
  },
  {
    id: "waterfall",
    name: "Waterfall",
    icon: "💧",
    x: 860,
    y: 420,
    width: 220,
    height: 150,
    color: "#22d3ee",
    type: "scenic",
    description: "A roaring cascade feeds the river below.",
  },
  {
    id: "river",
    name: "River",
    icon: "🌊",
    x: 880,
    y: 560,
    width: 180,
    height: 680,
    color: "#0d9488",
    type: "scenic",
    description: "Cool waters wind their way toward the seas.",
  },
  {
    id: "mountains",
    name: "Mountains",
    icon: "⛰️",
    x: 1620,
    y: 140,
    width: 480,
    height: 340,
    color: "#9c8aa5",
    type: "scenic",
    description: "Jagged peaks pierce the clouds in the distance.",
  },
  {
    id: "desert",
    name: "Desert",
    icon: "🏜️",
    x: 1500,
    y: 1180,
    width: 520,
    height: 280,
    color: "#e0ad6b",
    type: "scenic",
    description: "Endless dunes shimmer under a relentless sun.",
  },
];

// Interactive zones are the only ones that trigger an entry action
export const INTERACTIVE_ZONE_TYPES: ZoneType[] = ["castle", "mining", "pets", "roll"];

export function isPointInZone(px: number, py: number, zone: WorldZone): boolean {
  return px >= zone.x && px <= zone.x + zone.width && py >= zone.y && py <= zone.y + zone.height;
}

// Fixed (deterministic) ambient particle positions so server/client render the same markup
export const AMBIENT_PARTICLES = Array.from({ length: 40 }, (_, i) => {
  // Simple deterministic pseudo-random spread based on index
  const seedX = (i * 97) % WORLD_WIDTH;
  const seedY = (i * 53 + i * i) % WORLD_HEIGHT;
  const delay = (i % 10) * 0.4;
  const size = 2 + (i % 3);
  return { id: `p-${i}`, x: seedX, y: seedY, delay, size };
});