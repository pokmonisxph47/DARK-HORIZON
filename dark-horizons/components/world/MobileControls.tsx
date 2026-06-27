"use client";

import { Direction } from "@/hooks/useWorldMovement";

interface MobileControlsProps {
  onDirectionChange: (dir: Direction, active: boolean) => void;
}

export default function MobileControls({ onDirectionChange }: MobileControlsProps) {
  return (
    <div className="md:hidden fixed bottom-24 left-4 z-40 select-none" style={{ touchAction: "none" }}>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-36 h-36">
        <div />
        <DPadButton dir="up" icon="▲" onDirectionChange={onDirectionChange} />
        <div />

        <DPadButton dir="left" icon="◀" onDirectionChange={onDirectionChange} />
        <div className="flex items-center justify-center text-xs opacity-30" style={{ color: "var(--gold)" }}>
          ⚔
        </div>
        <DPadButton dir="right" icon="▶" onDirectionChange={onDirectionChange} />

        <div />
        <DPadButton dir="down" icon="▼" onDirectionChange={onDirectionChange} />
        <div />
      </div>
    </div>
  );
}

function DPadButton({
  dir,
  icon,
  onDirectionChange,
}: {
  dir: Direction;
  icon: string;
  onDirectionChange: (dir: Direction, active: boolean) => void;
}) {
  function press() {
    onDirectionChange(dir, true);
  }
  function release() {
    onDirectionChange(dir, false);
  }

  return (
    <button
      aria-label={dir}
      onPointerDown={(e) => {
        e.preventDefault();
        press();
      }}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className="rounded-lg flex items-center justify-center text-lg active:scale-95 transition-transform"
      style={{
        background: "rgba(45, 27, 78, 0.75)",
        border: "1px solid rgba(167, 139, 250, 0.5)",
        color: "var(--gold-light)",
        boxShadow: "0 0 10px rgba(107, 33, 168, 0.35)",
      }}
    >
      {icon}
    </button>
  );
}