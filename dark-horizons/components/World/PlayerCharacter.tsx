"use client";

interface PlayerCharacterProps {
  x: number;
  y: number;
  size: number;
  facing: "left" | "right";
  isMoving: boolean;
  username: string;
}

export default function PlayerCharacter({ x, y, size, facing, isMoving, username }: PlayerCharacterProps) {
  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
        transition: "left 0.03s linear, top 0.03s linear",
      }}
    >
      {/* Name tag */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full"
        style={{
          fontFamily: "'Cinzel', serif",
          color: "var(--gold-light)",
          background: "rgba(10, 5, 20, 0.6)",
          border: "1px solid rgba(201, 168, 76, 0.4)",
        }}
      >
        {username}
      </div>

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -4,
          width: size * 0.7,
          height: size * 0.22,
          background: "rgba(0,0,0,0.45)",
          filter: "blur(2px)",
        }}
      />

      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 16px rgba(167, 139, 250, 0.55)",
        }}
      />

      {/* Sprite */}
      <div
        className={isMoving ? "walk-bounce" : ""}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.62,
          transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
        }}
      >
        🧙
      </div>
    </div>
  );
}