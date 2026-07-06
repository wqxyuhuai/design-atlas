import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export type VirtualScrollState = {
  target: number;
  current: number;
  velocity: number;
  wheelDirection: 1 | -1;
  dragDistance: number;
};

const EASING = 0.1;
const WHEEL_MULTIPLIER = 0.00015;
const MIN_WHEEL_SPEED = 0.002;
const TARGET_DECAY = 0.9;
const MAX_TARGET = 2;
const DRAG_THRESHOLD = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useVirtualScroll() {
  const scrollRef = useRef<VirtualScrollState>({
    target: 0,
    current: 0,
    velocity: 0,
    wheelDirection: 1,
    dragDistance: 0
  });
  const dragRef = useRef({
    active: false,
    dragging: false,
    startX: 0,
    lastX: 0,
    lastY: 0,
    distance: 0,
    velocityX: 0
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      rafId = window.requestAnimationFrame(tick);
      if (document.hidden) return;

      const scroll = scrollRef.current;
      scroll.velocity += (scroll.target - scroll.velocity) * EASING;
      scroll.current += scroll.velocity;

      if (Math.abs(scroll.target) < MIN_WHEEL_SPEED) {
        scroll.target = scroll.wheelDirection * MIN_WHEEL_SPEED;
      }

      scroll.target *= TARGET_DECAY;
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const scroll = scrollRef.current;
    scroll.target = clamp(scroll.target + event.deltaY * WHEEL_MULTIPLIER, -MAX_TARGET, MAX_TARGET);
    scroll.wheelDirection = event.deltaY > 0 ? 1 : -1;
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button, a")) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      dragging: false,
      startX: event.clientX,
      lastX: event.clientX,
      lastY: event.clientY,
      distance: 0,
      velocityX: 0
    };
    scrollRef.current.dragDistance = 0;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const totalX = event.clientX - drag.startX;
    const deltaX = event.clientX - drag.lastX;
    const deltaY = event.clientY - drag.lastY;
    drag.distance += Math.abs(deltaX) + Math.abs(deltaY);
    scrollRef.current.dragDistance = drag.distance;

    if (!drag.dragging && Math.abs(totalX) > DRAG_THRESHOLD) {
      drag.dragging = true;
    }

    if (drag.dragging) {
      event.preventDefault();
      const motion = -deltaX * 0.5;
      const scroll = scrollRef.current;
      scroll.target = clamp(scroll.target - motion * 0.003, -MAX_TARGET, MAX_TARGET);
      scroll.wheelDirection = motion < 0 ? 1 : -1;
      drag.velocityX = motion;
    }

    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.dragging) {
      const scroll = scrollRef.current;
      scroll.target = clamp(scroll.target - drag.velocityX * 0.002, -MAX_TARGET, MAX_TARGET);
    }

    drag.active = false;
    drag.dragging = false;
    drag.velocityX = 0;
    setIsDragging(false);
  }, []);

  return {
    scrollRef,
    isDragging,
    handlers: {
      onWheel: handleWheel,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag
    }
  };
}
