import type { DesignEffect, EffectCategory } from "../types/effect";
import { backgroundEffects } from "./effects/backgrounds";
import { componentEffects } from "./effects/components";
import { interactionEffects } from "./effects/interactions";
import { layoutEffects } from "./effects/layouts";
import { mediaEffects } from "./effects/media";
import { navigationEffects } from "./effects/navigation";
import { textEffects } from "./effects/text";
import { toolEffects } from "./effects/tools";
import { videoBrowserEffects } from "./effects/video-browser";

function sortEffectsByTitle(items: DesignEffect[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
}

const unsortedEffects: DesignEffect[] = [
  ...backgroundEffects,
  ...textEffects,
  ...navigationEffects,
  ...mediaEffects,
  ...videoBrowserEffects,
  ...componentEffects,
  ...layoutEffects,
  ...interactionEffects,
  ...toolEffects
];

const latestImportSlugs = new Set([
  "prism",
  "prismatic-burst",
  "true-focus",
  "decrypted-text",
  "infinite-canvas",
  "image-trail",
  "staggered-menu",
  "fluid-glass",
  "strands",
  "magnet-lines",
  "glare-hover"
]);

export const effects: DesignEffect[] = sortEffectsByTitle(unsortedEffects);

export function effectsByCategory(category: EffectCategory): DesignEffect[] {
  return effects.filter((effect) => effect.category === category);
}

export function isLatestBatchEffect(effect: DesignEffect) {
  return latestImportSlugs.has(effect.slug);
}
