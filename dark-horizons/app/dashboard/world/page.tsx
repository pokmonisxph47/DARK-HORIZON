"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { useWorldMovement } from "@/hooks/useWorldMovement";
import WorldMap from "@/components/world/WorldMap";
import PlayerCharacter from "@/components/world/PlayerCharacter";
import MobileControls from "@/components/world/MobileControls";
import { WorldHUDTop, WorldHUDBottom } from "@/components/world/WorldHUD";
import { ZoneAnnouncementModal, MapOverviewModal } from "@/components/world/ZoneModal";
import {
  INTERACTIVE_ZONE_TYPES,
  PLAYER_SIZE,
  SPAWN_X,
  SPAWN_Y,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  type WorldZone,
  ZONES,
  isPointInZone,
} from "@/lib/worldzones";

interface ZoneModalState {
  icon: string;
  title: string;
  message: string;
  color: string;
  comingSoon?: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function WorldPage() {
  const { user, loading: authLoading } = useAuthContext();
  const { playerData, playerLoading } = usePlayerContext();
  const router = useRouter();

  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [zoneModal, setZoneModal] = useState<ZoneModalState | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    function update() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const movementPaused = zoneModal !== null || showMap;

  const { x, y, facing, isMoving, setMobileDirection } = useWorldMovement({
    startX: SPAWN_X,
    startY: SPAWN_Y,
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    playerSize: PLAYER_SIZE,
    paused: movementPaused,
  });

  const handleZoneEnter = useCallback(
    (zone: WorldZone) => {
      if (zone.type === "castle") {
        router.push("/dashboard");
        return;
      }
      setZoneModal({
        icon: zone.icon,
        title: zone.name,
        message: zone.description,
        color: zone.color,
        comingSoon: true,
      });
    },
    [router]
  );

  useEffect(() => {
    if (zoneModal || showMap) return;

    const found = ZONES.find(
      (zone) => INTERACTIVE_ZONE_TYPES.includes(zone.type) && isPointInZone(x, y, zone)
    );

    if (found && found.id !== activeZoneId) {
      setActiveZoneId(found.id);
      handleZoneEnter(found);
    } else if (!found && activeZoneId !== null) {
      setActiveZoneId(null);
    }
  }, [x, y, activeZoneId, zoneModal, showMap, handleZoneEnter]);

  if (authLoading || playerLoading || !playerData || viewport.width === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 float-anim">🗺️</div>
          <p className="text-purple-400 text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
            Charting the world...
          </p>
        </div>
      </div>
    );
  }

  const totalOres = Object.values(playerData.ores).reduce((sum, n) => sum + n, 0);

  const cameraX = clamp(x - viewport.width / 2, 0, Math.max(WORLD_WIDTH - viewport.width, 0));
  const cameraY = clamp(y - viewport.height / 2, 0, Math.max(WORLD_HEIGHT - viewport.height, 0));

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <WorldHUDTop
        rank={playerData.rank}
        zenCoins={playerData.zenCoins}
        totalOres={totalOres}
      />

      <WorldMap
        cameraX={cameraX}
        cameraY={cameraY}
        viewportWidth={viewport.width}
        viewportHeight={viewport.height}
        activeZoneId={activeZoneId}
      >
        <PlayerCharacter
          x={x}
          y={y}
          size={PLAYER_SIZE}
          facing={facing}
          isMoving={isMoving}
          username={playerData.username}
        />
      </WorldMap>

      <MobileControls onDirectionChange={setMobileDirection} />

      <WorldHUDBottom
        onInventory={() =>
          setZoneModal({
            icon: "🎒",
            title: "Inventory",
            message: "Your satchel is empty for now — gear and items arrive in a future update.",
            color: "#c9a84c",
            comingSoon: true,
          })
        }
        onMap={() => setShowMap(true)}
        onHomeCastle={() => router.push("/dashboard")}
      />

      {zoneModal && (
        <ZoneAnnouncementModal
          icon={zoneModal.icon}
          title={zoneModal.title}
          message={zoneModal.message}
          color={zoneModal.color}
          comingSoon={zoneModal.comingSoon}
          onClose={() => setZoneModal(null)}
        />
      )}

      {showMap && (
        <MapOverviewModal playerX={x} playerY={y} onClose={() => setShowMap(false)} />
      )}
    </div>
  );
}
