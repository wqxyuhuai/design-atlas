import type { DesignEffect, EffectCategory } from "../types/effect";
import { backgroundEffects } from "./effects/backgrounds";
import { componentEffects } from "./effects/components";
import { interactionEffects } from "./effects/interactions";
import { layoutEffects } from "./effects/layouts";
import { mediaEffects } from "./effects/media";
import { navigationEffects } from "./effects/navigation";
import { notionInboxEffects } from "./effects/notion-inbox";
import { textEffects } from "./effects/text";
import { toolEffects } from "./effects/tools";

function sortEffectsByTitle(items: DesignEffect[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
}

function latestImportSlugsByCategory(items: DesignEffect[], countPerCategory: number) {
  const slugs = new Set<string>();
  const categorySlugs = new Map<EffectCategory, string[]>();

  for (const effect of items) {
    const itemsForCategory = categorySlugs.get(effect.category) ?? [];
    itemsForCategory.push(effect.slug);
    categorySlugs.set(effect.category, itemsForCategory);
  }

  for (const itemsForCategory of categorySlugs.values()) {
    for (const slug of itemsForCategory.slice(-countPerCategory)) {
      slugs.add(slug);
    }
  }

  return slugs;
}

const unsortedEffects: DesignEffect[] = [
  ...backgroundEffects,
  ...textEffects,
  ...navigationEffects,
  ...mediaEffects,
  ...componentEffects,
  ...layoutEffects,
  ...interactionEffects,
  ...toolEffects,
  ...notionInboxEffects
];

// Notion imports share a batch-wide createdAt, so the visual "New" marker needs
// a per-category import-order marker instead of timestamp matching.
const latestImportSlugs = latestImportSlugsByCategory(notionInboxEffects, 2);

export const effects: DesignEffect[] = sortEffectsByTitle(unsortedEffects);

export function effectsByCategory(category: EffectCategory): DesignEffect[] {
  return effects.filter((effect) => effect.category === category);
}

export function isLatestBatchEffect(effect: DesignEffect) {
  return latestImportSlugs.has(effect.slug);
}
