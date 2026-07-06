import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import "./LiquidTypographyLink.css";

export type LiquidTypographyLinkProps = {
  title: string;
  index?: string;
  href?: string;
  openLabel?: string;
  className?: string;
  onHoverChange?: (isHovering: boolean) => void;
  onClick?: () => void;
};

type MotionState = {
  active: boolean;
  mouseX: number;
  mouseY: number;
  targetMouseX: number;
  targetMouseY: number;
  labelX: number;
  labelY: number;
  targetLabelX: number;
  targetLabelY: number;
  strength: number;
  targetStrength: number;
  opacity: number;
  targetOpacity: number;
  lastX: number;
  lastY: number;
};

const sliceDirections = [-1.35, 1.05, -0.7, 1.68, -1.18, 0.74, -1.9, 1.28, -0.82, 0.48];

function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function LiquidTypographyLink({
  title,
  index,
  href,
  openLabel = "OPEN",
  className = "",
  onHoverChange,
  onClick
}: LiquidTypographyLinkProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const sliceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const phaseTimerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const motionRef = useRef<MotionState>({
    active: false,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    labelX: 0,
    labelY: 0,
    targetLabelX: 0,
    targetLabelY: 0,
    strength: 0,
    targetStrength: 0,
    opacity: 0,
    targetOpacity: 0,
    lastX: 0,
    lastY: 0
  });
  const [phase, setPhase] = useState<"entering" | "idle" | "exiting">("entering");

  const slices = useMemo(
    () =>
      sliceDirections.map((direction, sliceIndex) => {
        const top = sliceIndex * 10;
        return {
          direction,
          top,
          bottom: 100 - top - 10,
          enterX: `${direction * 34}px`,
          enterReboundX: `${direction * -5.44}px`,
          exitPullX: `${direction * -6.16}px`,
          exitX: `${direction * 28}px`
        };
      }),
    []
  );

  const writeMotionStyles = useCallback(() => {
    const node = rootRef.current;
    const motion = motionRef.current;
    if (!node) return;

    node.style.setProperty("--mouse-x", `${motion.mouseX.toFixed(2)}px`);
    node.style.setProperty("--mouse-y", `${motion.mouseY.toFixed(2)}px`);
    node.style.setProperty("--label-x", `${motion.labelX.toFixed(2)}px`);
    node.style.setProperty("--label-y", `${motion.labelY.toFixed(2)}px`);
    node.style.setProperty("--liquid-strength", motion.strength.toFixed(3));
    node.style.setProperty("--liquid-opacity", motion.opacity.toFixed(3));

    sliceRefs.current.forEach((slice, sliceIndex) => {
      if (!slice) return;
      const direction = sliceDirections[sliceIndex] ?? 0;
      const wave = Math.sin(sliceIndex * 1.7);
      slice.style.setProperty("--slice-x", `${(motion.strength * direction * 1.12).toFixed(2)}px`);
      slice.style.setProperty("--slice-y", `${(motion.strength * wave * 0.035).toFixed(2)}px`);
      slice.style.setProperty("--slice-skew", `${(motion.strength * direction * 0.22).toFixed(2)}deg`);
      slice.style.setProperty("--slice-scale-x", (1 + Math.abs(direction) * motion.strength * 0.0048).toFixed(3));
    });
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const motion = motionRef.current;
    if (document.hidden) {
      stopLoop();
      return;
    }

    motion.mouseX += (motion.targetMouseX - motion.mouseX) * 0.16;
    motion.mouseY += (motion.targetMouseY - motion.mouseY) * 0.16;
    motion.labelX += (motion.targetLabelX - motion.labelX) * 0.18;
    motion.labelY += (motion.targetLabelY - motion.labelY) * 0.18;
    motion.strength += (motion.targetStrength - motion.strength) * 0.2;
    motion.opacity += (motion.targetOpacity - motion.opacity) * 0.18;

    if (!motion.active) {
      motion.targetStrength *= 0.78;
    } else {
      motion.targetStrength *= 0.965;
    }

    writeMotionStyles();

    const stillMoving =
      motion.active ||
      motion.opacity > 0.01 ||
      motion.targetOpacity > 0.01 ||
      motion.strength > 0.05 ||
      motion.targetStrength > 0.05;

    if (stillMoving) {
      rafRef.current = window.requestAnimationFrame(tick);
    } else {
      stopLoop();
    }
  }, [stopLoop, writeMotionStyles]);

  const startLoop = useCallback(() => {
    if (rafRef.current === null && !reducedMotionRef.current) {
      rafRef.current = window.requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion();
    const node = rootRef.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      motionRef.current.mouseX = rect.width / 2;
      motionRef.current.mouseY = rect.height / 2;
      motionRef.current.targetMouseX = rect.width / 2;
      motionRef.current.targetMouseY = rect.height / 2;
      motionRef.current.labelX = rect.width / 2;
      motionRef.current.labelY = rect.height * 0.78;
      motionRef.current.targetLabelX = rect.width / 2;
      motionRef.current.targetLabelY = rect.height * 0.78;
      writeMotionStyles();
    }

    phaseTimerRef.current = window.setTimeout(() => {
      setPhase("idle");
    }, reducedMotionRef.current ? 0 : 940);

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (phaseTimerRef.current !== null) {
        window.clearTimeout(phaseTimerRef.current);
      }
    };
  }, [stopLoop, writeMotionStyles]);

  const updatePointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (!isFinePointer() || reducedMotionRef.current) return;

    const node = rootRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);
    const motion = motionRef.current;
    const dx = event.clientX - motion.lastX;
    const dy = event.clientY - motion.lastY;
    const velocity = clamp(Math.sqrt(dx * dx + dy * dy), 0, 120);

    motion.active = true;
    motion.targetMouseX = x;
    motion.targetMouseY = y;
    motion.targetLabelX = clamp(x + 20, 24, rect.width - 24);
    motion.targetLabelY = rect.height * 0.78;
    motion.targetStrength = clamp((velocity / 120) * 62, 0, 62);
    motion.targetOpacity = 1;
    motion.lastX = event.clientX;
    motion.lastY = event.clientY;

    startLoop();
  }, [startLoop]);

  const handlePointerEnter = useCallback((event: PointerEvent<HTMLElement>) => {
    const motion = motionRef.current;
    motion.lastX = event.clientX;
    motion.lastY = event.clientY;
    onHoverChange?.(true);
    updatePointer(event);
  }, [onHoverChange, updatePointer]);

  const handlePointerLeave = useCallback(() => {
    const motion = motionRef.current;
    motion.active = false;
    motion.targetOpacity = 0;
    motion.targetStrength = 0;
    onHoverChange?.(false);
    startLoop();
  }, [onHoverChange, startLoop]);

  const replayTransition = useCallback(() => {
    if (reducedMotionRef.current) return;

    if (phaseTimerRef.current !== null) {
      window.clearTimeout(phaseTimerRef.current);
    }

    setPhase("exiting");
    phaseTimerRef.current = window.setTimeout(() => {
      setPhase("entering");
      phaseTimerRef.current = window.setTimeout(() => {
        setPhase("idle");
      }, 940);
    }, 560);
  }, []);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    onClick?.();
    if (!href || onClick) {
      event.preventDefault();
    }

    const node = rootRef.current;
    if (node && !isFinePointer()) {
      const rect = node.getBoundingClientRect();
      const motion = motionRef.current;
      motion.targetMouseX = rect.width / 2;
      motion.targetMouseY = rect.height / 2;
      motion.targetStrength = 18;
      motion.targetOpacity = 1;
      motion.active = false;
      startLoop();
      window.setTimeout(() => {
        motion.targetOpacity = 0;
        motion.targetStrength = 0;
        startLoop();
      }, 150);
    }

    replayTransition();
  }, [href, onClick, replayTransition, startLoop]);

  const rootClassName = [
    "liquidTypographyLink",
    `liquidTypographyLink--${phase}`,
    className
  ].filter(Boolean).join(" ");

  const content = (
    <>
      <span className="liquidTypographyLink__textFrame">
        <span className="liquidTypographyLink__textStack" aria-hidden="true">
          <span className="liquidTypographyLink__titleWrap">
            <span className="liquidTypographyLink__baseText">{title}</span>
            <span className="liquidTypographyLink__hoverEraseMask" />
            <span className="liquidTypographyLink__liquidLayer">
              {slices.map((slice, sliceIndex) => (
                <span
                  key={sliceIndex}
                  ref={(node) => {
                    sliceRefs.current[sliceIndex] = node;
                  }}
                  className="liquidTypographyLink__liquidSlice"
                  style={
                    {
                      "--slice-top": `${slice.top}%`,
                      "--slice-bottom": `${slice.bottom}%`,
                      "--enter-x": slice.enterX,
                      "--enter-rebound-x": slice.enterReboundX,
                      "--exit-pull-x": slice.exitPullX,
                      "--exit-x": slice.exitX
                    } as CSSProperties
                  }
                >
                  {title}
                </span>
              ))}
            </span>
          </span>
          {index ? <span className="liquidTypographyLink__index">{index}</span> : null}
        </span>
      </span>
      <span className="liquidTypographyLink__openLabel" aria-hidden="true">
        {openLabel}
      </span>
    </>
  );

  const sharedProps = {
    className: rootClassName,
    onClick: handleClick,
    onPointerEnter: handlePointerEnter,
    onPointerMove: updatePointer,
    onPointerLeave: handlePointerLeave,
    "aria-label": index ? `${title} ${index}` : title
  };

  if (href) {
    return (
      <a
        {...sharedProps}
        ref={(node) => {
          rootRef.current = node;
        }}
        href={href}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={(node) => {
        rootRef.current = node;
      }}
      type="button"
    >
      {content}
    </button>
  );
}
