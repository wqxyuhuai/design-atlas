import type { CSSProperties } from "react";
import type { EffectProps } from "../../../../types/effect";

function stringValue(value: EffectProps[string], fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function numberValue(value: EffectProps[string], fallback: number) {
  return typeof value === "number" ? value : fallback;
}

export function TextReveal(props: EffectProps) {
  const text = stringValue(props.text, "Design systems should feel inevitable.");
  const compact = stringValue(props.previewMode, "") === "card";
  const splitType = stringValue(props.splitType, "words");
  const staggerDelay = numberValue(props.staggerDelay, numberValue(props.delay, 90));
  const duration = numberValue(props.duration, 760);
  const ease = stringValue(props.ease, "ease-out");
  const blur = numberValue(props.blur, 10);
  const direction = stringValue(props.direction, "up");
  const directionOffset = {
    up: ["0px", "18px"],
    down: ["0px", "-18px"],
    left: ["18px", "0px"],
    right: ["-18px", "0px"]
  }[direction] ?? ["0px", "18px"];
  const segments =
    splitType === "characters"
      ? Array.from(text)
      : splitType === "lines"
        ? text.split(/\n+/)
        : text.split(" ");

  return (
    <div
      className={
        compact
          ? "flex h-full min-h-0 items-center justify-center bg-atlas-canvas p-5"
          : "flex h-full min-h-[260px] items-center justify-center bg-atlas-canvas p-8"
      }
    >
      <h2
        className={
          compact
            ? "max-w-[78%] text-balance text-center text-[clamp(1.45rem,1.7vw,2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-atlas-ink"
            : "max-w-2xl text-center text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-atlas-ink md:text-5xl"
        }
      >
        {segments.map((segment, index) => (
          <span
            key={`${segment}-${index}`}
            className="reveal-word inline-block"
            style={
              {
                "--reveal-delay": `${index * staggerDelay}ms`,
                "--reveal-duration": `${duration}ms`,
                "--reveal-ease": ease,
                "--reveal-blur": `${blur}px`,
                "--reveal-x": directionOffset[0],
                "--reveal-y": directionOffset[1]
              } as CSSProperties
            }
          >
            {segment === " " ? "\u00a0" : segment}
            {splitType === "words" && index < segments.length - 1 ? "\u00a0" : null}
            {splitType === "lines" && index < segments.length - 1 ? <br /> : null}
          </span>
        ))}
      </h2>
    </div>
  );
}
