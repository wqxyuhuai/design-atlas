import type { DesignEffect } from "../types/effect";
import { isLatestBatchEffect } from "../registry/effects";

export type EffectBadgeTone = "default" | "new" | "demo";

export interface EffectBadgeMeta {
  label: string;
  tone: EffectBadgeTone;
}

export function effectBadgesForEffect(effect: DesignEffect) {
  const badges: EffectBadgeMeta[] = [];
  const tags = new Set(effect.tags);

  if (tags.has("demo")) {
    badges.push({ label: "Demo", tone: "demo" });
  } else if (isLatestBatchEffect(effect)) {
    badges.push({ label: "New", tone: "new" });
  }

  return badges;
}
