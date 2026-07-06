import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { effectsByCategory } from "../../registry/effects";
import type { EffectCategory } from "../../types/effect";
import { effectBadgesForEffect } from "../../utils/effectBadges";
import { effectPath } from "../../utils/routes";
import { EffectBadges } from "../common/EffectBadges";

interface SecondaryEffectListProps {
  activeCategory: EffectCategory;
  activeEffectSlug?: string;
  activeType?: string;
  mode: "gallery" | "workbench";
}

export function SecondaryEffectList({
  activeCategory,
  activeEffectSlug,
  mode
}: SecondaryEffectListProps) {
  const [, setSearchParams] = useSearchParams();
  const categoryEffects = effectsByCategory(activeCategory);

  return (
    <aside className="hidden bg-atlas-surface2 md:col-start-3 md:block">
      <div className="secondary-rail-fixed p-3">
        <div className="px-2 pb-2 pt-1 text-xs font-normal text-atlas-tertiary">Effects</div>
        <Link
          to={`/?category=${activeCategory}&type=all`}
          onClick={() => setSearchParams({ category: activeCategory, type: "all" })}
          className={clsx(
            "mb-2 block rounded-xl px-3 py-3 text-left text-[16px] tracking-[-0.01em] transition",
            mode === "gallery" && !activeEffectSlug
              ? "bg-atlas-canvas font-semibold text-white"
              : "font-normal text-atlas-subtle hover:bg-atlas-surface3 hover:text-atlas-muted"
          )}
        >
          All
        </Link>
        <div className="space-y-1">
          {categoryEffects.map((effect) => (
            <Link
              key={effect.slug}
              to={effectPath(effect)}
              className={clsx(
                "block rounded-xl px-3 py-3 text-left text-[16px] tracking-[-0.01em] transition",
                activeEffectSlug === effect.slug
                  ? "bg-atlas-canvas font-semibold text-white"
                  : "font-normal text-atlas-subtle hover:bg-atlas-surface3 hover:text-atlas-muted"
              )}
            >
              <span className="flex min-w-0 items-center gap-2 text-left">
                <span className="min-w-0 truncate">{effect.title}</span>
                <EffectBadges badges={effectBadgesForEffect(effect)} compact />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
