import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { placeholderImagesForEffect } from "../../../../data/placeholderImages";
import type { EffectProps } from "../../../../types/effect";

type Position = "top" | "bottom" | "left" | "right";
type Curve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";

const curveFunctions: Record<Curve, (progress: number) => number> = {
  linear: (progress) => progress,
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress) => progress * progress,
  "ease-out": (progress) => 1 - Math.pow(1 - progress, 2),
  "ease-in-out": (progress) =>
    progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
};

function numberValue(value: EffectProps[string], fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function stringValue<T extends string>(value: EffectProps[string], fallback: T, allowed: readonly T[]) {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : fallback;
}

function booleanValue(value: EffectProps[string], fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function gradientDirection(position: Position) {
  return {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right"
  }[position];
}

const placeholderImages = placeholderImagesForEffect(6, 8);

export function GradualBlur(props: EffectProps) {
  const position = stringValue(props.position, "top", ["top", "bottom", "left", "right"]);
  const curve = stringValue(props.curve, "linear", ["linear", "bezier", "ease-in", "ease-out", "ease-in-out"]);
  const strength = numberValue(props.strength, 5);
  const heightRem = numberValue(props.heightRem, 6);
  const widthRem = numberValue(props.widthRem, 8);
  const divCount = Math.max(1, Math.round(numberValue(props.divCount, 4)));
  const opacity = numberValue(props.opacity, 1);
  const zIndex = numberValue(props.zIndex, 20);
  const exponential = booleanValue(props.exponential, false);
  const animated = booleanValue(props.animated, false);
  const hoverIntensity = numberValue(props.hoverIntensity, 1);
  const [hovered, setHovered] = useState(false);

  const layers = useMemo(() => {
    const increment = 100 / divCount;
    const currentStrength = hovered ? strength * hoverIntensity : strength;
    const curveFn = curveFunctions[curve] ?? curveFunctions.linear;

    return Array.from({ length: divCount }, (_, index) => {
      const layer = index + 1;
      const progress = curveFn(layer / divCount);
      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * divCount + 1) * currentStrength;
      const p1 = Math.round((increment * layer - increment) * 10) / 10;
      const p2 = Math.round(increment * layer * 10) / 10;
      const p3 = Math.round((increment * layer + increment) * 10) / 10;
      const p4 = Math.round((increment * layer + increment * 2) * 10) / 10;
      const stops = [`transparent ${p1}%`, `black ${p2}%`];

      if (p3 <= 100) stops.push(`black ${p3}%`);
      if (p4 <= 100) stops.push(`transparent ${p4}%`);

      return {
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        maskImage: `linear-gradient(${gradientDirection(position)}, ${stops.join(", ")})`,
        WebkitMaskImage: `linear-gradient(${gradientDirection(position)}, ${stops.join(", ")})`
      } satisfies CSSProperties;
    });
  }, [curve, divCount, exponential, hovered, hoverIntensity, position, strength]);

  const overlayStyle = useMemo<CSSProperties>(() => {
    const isVertical = position === "top" || position === "bottom";
    const style: CSSProperties = {
      position: "absolute",
      pointerEvents: hoverIntensity > 1 ? "auto" : "none",
      opacity,
      zIndex,
      transition: animated ? "opacity 0.3s ease-out" : undefined
    };

    if (isVertical) {
      style.height = `${heightRem}rem`;
      style.width = "100%";
      style[position] = 0;
      style.left = 0;
      style.right = 0;
    } else {
      style.width = `${widthRem}rem`;
      style.height = "100%";
      style[position] = 0;
      style.top = 0;
      style.bottom = 0;
    }

    return style;
  }, [animated, heightRem, hoverIntensity, opacity, position, widthRem, zIndex]);

  return (
    <div className="relative h-full min-h-[260px] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#100f17,#050506)]" />
      <div className="preview-grid absolute inset-0 opacity-50" />
      <div className="relative h-full overflow-y-auto px-8 py-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto grid max-w-3xl gap-8 pb-24">
          {placeholderImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative h-56 overflow-hidden rounded-[24px] border border-white/[0.16] bg-atlas-surface2 shadow-[0_30px_90px_rgb(0_0_0_/_0.36)] ring-1 ring-black/40 ${
                index % 2 === 0 ? "w-[76%]" : "ml-auto w-[68%]"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(90deg,rgb(255_255_255_/_0.08),transparent_44%,rgb(0_0_0_/_0.28))] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.16)]" />
            </div>
          ))}
        </div>
      </div>
      <div
        className="isolate"
        style={overlayStyle}
        onMouseEnter={hoverIntensity > 1 ? () => setHovered(true) : undefined}
        onMouseLeave={hoverIntensity > 1 ? () => setHovered(false) : undefined}
      >
        <div className="relative h-full w-full pointer-events-none">
          {layers.map((style, index) => (
            <div key={index} className="absolute inset-0" style={style} />
          ))}
        </div>
      </div>
    </div>
  );
}
