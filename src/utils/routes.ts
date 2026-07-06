import type { DesignEffect, EffectCategory } from "../types/effect";

export function workbenchPath(category: EffectCategory, effectSlug: string) {
  return `/workbench/${category}/${effectSlug}`;
}

export function effectPath(effect: DesignEffect) {
  return workbenchPath(effect.category, effect.slug);
}
