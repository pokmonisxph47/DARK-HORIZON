"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Direction = "up" | "down" | "left" | "right";

interface UseWorldMovementOptions {
  startX: number;
  startY: number;
  worldWidth: number;
  worldHeight: number;
  playerSize: number;
  speed?: number; // pixels per second
  paused?: boolean; // freeze movement (e.g. while a modal is open)
}

interface WorldMovementState {
  x: number;
  y: number;
  facing: "left" | "right";
  isMoving: boolean;
}

const KEY_MAP: Record<string, Direction> = {
  w: "up",
  arrowup: "up",
  s: "down",
  arrowdown: "down",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right",
};

export function useWorldMovement({
  startX,
  startY,
  worldWidth,
  worldHeight,
  playerSize,
  speed = 240,
  paused = false,
}: UseWorldMovementOptions) {
  const [state, setState] = useState<WorldMovementState>({
    x: startX,
    y: startY,
    facing: "right",
    isMoving: false,
  });

  const posRef = useRef({ x: startX, y: startY });
  const pressedRef = useRef<Set<Direction>>(new Set());
  const pausedRef = useRef(paused);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) {
      // Releasing all held keys avoids "stuck" movement once unpaused
      pressedRef.current.clear();
    }
  }, [paused]);

  // Keyboard listeners
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const dir = KEY_MAP[e.key.toLowerCase()];
      if (!dir) return;
      pressedRef.current.add(dir);
      e.preventDefault();
    }
    function handleKeyUp(e: KeyboardEvent) {
      const dir = KEY_MAP[e.key.toLowerCase()];
      if (!dir) return;
      pressedRef.current.delete(dir);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Movement loop
  useEffect(() => {
    function loop(time: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      let dx = 0;
      let dy = 0;
      if (!pausedRef.current) {
        const pressed = pressedRef.current;
        if (pressed.has("up")) dy -= 1;
        if (pressed.has("down")) dy += 1;
        if (pressed.has("left")) dx -= 1;
        if (pressed.has("right")) dx += 1;
      }

      const isMoving = dx !== 0 || dy !== 0;

      if (isMoving) {
        const length = Math.sqrt(dx * dx + dy * dy);
        const ndx = dx / length;
        const ndy = dy / length;
        const dist = speed * dt;
        const half = playerSize / 2;

        const nx = Math.min(Math.max(posRef.current.x + ndx * dist, half), worldWidth - half);
        const ny = Math.min(Math.max(posRef.current.y + ndy * dist, half), worldHeight - half);
        posRef.current = { x: nx, y: ny };
      }

      setState((prev) => ({
        x: posRef.current.x,
        y: posRef.current.y,
        facing: dx < 0 ? "left" : dx > 0 ? "right" : prev.facing,
        isMoving,
      }));

      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      lastTimeRef.current = null;
    };
  }, [worldWidth, worldHeight, playerSize, speed]);

  const setMobileDirection = useCallback((dir: Direction, active: boolean) => {
    if (active) pressedRef.current.add(dir);
    else pressedRef.current.delete(dir);
  }, []);

  return { ...state, setMobileDirection };
}