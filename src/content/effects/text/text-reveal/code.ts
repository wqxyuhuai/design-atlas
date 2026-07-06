export const code = `import type { CSSProperties } from "react";

interface TextRevealProps {
  text?: string;
  splitType?: "words" | "characters" | "lines";
  duration?: number;
  staggerDelay?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  blur?: number;
}

export function TextReveal({
  text = "Design systems should feel inevitable.",
  splitType = "words",
  duration = 760,
  staggerDelay = 90,
  ease = "ease-out",
  direction = "up",
  blur = 10
}: TextRevealProps) {
  const offsets = {
    up: ["0px", "18px"],
    down: ["0px", "-18px"],
    left: ["18px", "0px"],
    right: ["-18px", "0px"]
  }[direction];
  const segments =
    splitType === "characters"
      ? Array.from(text)
      : splitType === "lines"
        ? text.split(/\\n+/)
        : text.split(" ");

  return (
    <h2>
      {segments.map((segment, index) => (
        <span
          key={\`\${segment}-\${index}\`}
          className="reveal-word"
          style={{
            "--reveal-delay": \`\${index * staggerDelay}ms\`,
            "--reveal-duration": \`\${duration}ms\`,
            "--reveal-ease": ease,
            "--reveal-blur": \`\${blur}px\`,
            "--reveal-x": offsets[0],
            "--reveal-y": offsets[1]
          } as CSSProperties}
        >
          {segment === " " ? "\\u00a0" : segment}
          {splitType === "words" && index < segments.length - 1 ? "\\u00a0" : null}
          {splitType === "lines" && index < segments.length - 1 ? <br /> : null}
        </span>
      ))}
    </h2>
  );
}

/* CSS
.reveal-word {
  display: inline-block;
  opacity: 0;
  filter: blur(var(--reveal-blur));
  transform: translate3d(var(--reveal-x), var(--reveal-y), 0);
  animation: reveal-in var(--reveal-duration) var(--reveal-ease, ease-out) forwards;
  animation-delay: var(--reveal-delay);
}
@keyframes reveal-in {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0);
  }
}
*/`;
