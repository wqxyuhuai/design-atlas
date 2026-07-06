import type { EffectCategory } from "../types/effect";
import { normalizeEffectCategory } from "./categories";
import { effects, effectsByCategory } from "./effects";

export function getEffect(category: string | undefined, slug: string | undefined) {
  const normalizedCategory = normalizeEffectCategory(category);
  return effects.find((effect) => effect.category === normalizedCategory && effect.slug === slug);
}

export function firstEffectByCategory(category: EffectCategory) {
  return effectsByCategory(category)[0];
}
