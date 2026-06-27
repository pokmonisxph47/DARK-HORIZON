"use client";

import { memo } from "react";

interface PlayerCharacterProps {
  x: number;
  y: number;
  size: number;
  facing: "left" | "right";
  isMoving: boolean;
  username: string;
}

function PlayerCharacter({ x, y, size, facing, isMoving, username }: PlayerCharacterProps) {
  return (
    <div
      className="absolute z-30 pointer-events-none"
      style={{
        width: size,
        height: size * 1.2,
        left: x - size / 2,
        top: y - size * 0.82,
      }}
    >
      <div
        className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full"
        style={{
          fontFamily: "'Cinzel', serif",
          color: "var(--gold-light)",
          background: "rgba(10, 5, 20, 0.62)",
          border: "1px solid rgba(201, 168, 76, 0.45)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        }}
      >
        {username}
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -2,
          width: size * 0.78,
          height: size * 0.2,
          background: "rgba(15, 10, 22, 0.55)",
          filter: "blur(3px)",
        }}
      />

      <div
        className={`player-sprite ${isMoving ? "player-sprite-walking" : ""}`}
        style={{
          width: size,
          height: size * 1.12,
          transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        <div className="player-cape" />
        <div className="player-head" />
        <div className="player-body" />
        <div className="player-arm player-arm-left" />
        <div className="player-arm player-arm-right" />
        <div className="player-leg player-leg-left" />
        <div className="player-leg player-leg-right" />
        <div className="player-staff" />
      </div>
    </div>
  );
}

export default memo(PlayerCharacter);
