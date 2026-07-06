import type { DesignEffect } from "../../types/effect";
import { EmptyState } from "../common/EmptyState";
import { EffectPreviewCard } from "./EffectPreviewCard";

interface EffectGridProps {
  effects: DesignEffect[];
  category: DesignEffect["category"];
}

function gridClassForCategory(category: DesignEffect["category"]) {
  if (category === "backgrounds") {
    return "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3";
  }

  if (category === "navigation") {
    return "grid-cols-1 xl:grid-cols-2";
  }

  if (category === "text") {
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }

  return "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3";
}

export function EffectGrid({ effects, category }: EffectGridProps) {
  if (effects.length === 0) {
    return (
      <EmptyState
        title="No effects in this category yet."
        description="Add a new effect folder and register it to populate this lane."
      />
    );
  }

  return (
    <div className={`grid gap-4 ${gridClassForCategory(category)}`}>
      {effects.map((effect) => (
        <EffectPreviewCard key={`${effect.category}-${effect.slug}`} effect={effect} />
      ))}
    </div>
  );
}
