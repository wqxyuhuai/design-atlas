import type { ControlLevel, DesignEffect, EffectCategory, EffectControl } from "../types/effect";

const categoryControlOrder: Record<EffectCategory, string[]> = {
  text: [
    "text",
    "splitType",
    "segmentBy",
    "duration",
    "staggerDelay",
    "delay",
    "ease",
    "direction",
    "blur",
    "showCompletionToast",
    "repeat",
    "trigger",
    "once"
  ],
  backgrounds: [
    "color",
    "lightColor",
    "accent",
    "glow",
    "count",
    "beamNumber",
    "scale",
    "size",
    "speed",
    "rotation",
    "noiseIntensity",
    "opacity",
    "blur",
    "density",
    "intensity",
    "beamHeight",
    "beamWidth",
    "followMouse",
    "demoContent"
  ],
  interactions: [
    "trigger",
    "duration",
    "delay",
    "stagger",
    "direction",
    "distance",
    "ease",
    "accent",
    "repeat",
    "once",
    "threshold",
    "exitOnScrollOut"
  ],
  navigation: [
    "brand",
    "activeItem",
    "active",
    "density",
    "accentColor",
    "accent",
    "showIndicator",
    "count",
    "blur",
    "sticky",
    "radius",
    "showBadge",
    "compact"
  ],
  media: [
    "columns",
    "gap",
    "imageRatio",
    "hoverScale",
    "hoverBlur",
    "showMeta",
    "accent",
    "overlayOpacity",
    "transitionDuration",
    "metaPosition"
  ],
  components: [
    "variant",
    "size",
    "radius",
    "accentColor",
    "accent",
    "hoverEffect",
    "disabled",
    "activeState",
    "loading"
  ],
  layouts: ["columns", "gap", "density", "rhythm", "imageRatio", "spacing", "accent"],
  tools: ["accent", "variant", "size", "radius", "mode", "density"]
};

export function controlLevel(control: EffectControl): ControlLevel {
  return control.level ?? "primary";
}

export function orderedControlsForEffect(effect: DesignEffect, controls: EffectControl[]) {
  const order = categoryControlOrder[effect.category];

  return [...controls].sort((a, b) => {
    const rankA = order.indexOf(a.key);
    const rankB = order.indexOf(b.key);
    const safeRankA = rankA === -1 ? Number.MAX_SAFE_INTEGER : rankA;
    const safeRankB = rankB === -1 ? Number.MAX_SAFE_INTEGER : rankB;

    return safeRankA - safeRankB;
  });
}
