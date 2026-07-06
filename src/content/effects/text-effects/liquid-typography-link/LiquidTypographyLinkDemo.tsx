import { LiquidTypographyLink } from "../../../../components/effects/LiquidTypographyLink";
import type { EffectProps } from "../../../../types/effect";

const demoItems = [
  "LIQUID TYPOGRAPHY",
  "MAGNETIC TITLE",
  "PROJECT LINK",
  "INTERACTIVE TYPE",
  "DISTORTED HOVER"
];

function stringValue(value: EffectProps[string], fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export function LiquidTypographyLinkDemo(props: EffectProps) {
  const compact = stringValue(props.previewMode, "") === "card";
  const openLabel = stringValue(props.openLabel, "OPEN");
  const visibleItems = compact ? demoItems.slice(0, 3) : demoItems;

  return (
    <div
      className={[
        "liquidTypographyDemo",
        compact ? "liquidTypographyDemo--compact" : ""
      ].filter(Boolean).join(" ")}
    >
      <div className="liquidTypographyDemo__left">
        <div className="liquidTypographyDemo__list" aria-label="Liquid typography link demo">
          {visibleItems.map((title, itemIndex) => (
            <LiquidTypographyLink
              key={title}
              title={title}
              index={String(itemIndex + 1).padStart(2, "0")}
              openLabel={openLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
