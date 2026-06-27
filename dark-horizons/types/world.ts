// Re-export world types from lib so consumers can import from either place.
export type { WorldZone, ZoneType } from "@/lib/worldzones";

// Sub-area layers for the world-first architecture (Milestone 2+).
export type Layer =
  | "overworld"
  | "cave"
  | "castle-interior"
  | "forest"
  | "roll-altar"
  | `sea-${"1" | "2" | "3" | "beast"}`
  | `dungeon-${string}`;
