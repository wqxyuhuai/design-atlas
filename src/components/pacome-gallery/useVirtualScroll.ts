import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export type VirtualScrollState = {
  target: number;
  current: number;
  velocity: number;
  dragDistance: number;
};

const WHEEL_MULTIPLIER = 0.0025;
const DRAG_X_MULTIPLIER = 0.006;
const DRAG_Y_MULTIPLIER = 0.003;

export function useVirtualScroll() {
  const scrollRef = useRef<VirtualScrollState>({ target: 0, current: 0, velocity: 0, dragDistance: 0 });
  const dragRef = useRef({ active: false, x: 0, y: 0, distance: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    scrollRef.current.target += event.deltaY * WHEEL_MULTIPLIER;
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, x: event.clientX, y: event.clientY, distance: 0 };
    scrollRef.current.dragDistance = 0;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.distance += Math.abs(dx) + Math.abs(dy);
    scrollRef.current.dragDistance = drag.distance;
    scrollRef.current.target += dx * DRAG_X_MULTIPLIER + dy * DRAG_Y_MULTIPLIER;
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.active && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.active = false;
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
