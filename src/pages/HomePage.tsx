import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { EffectGrid } from "../components/gallery/EffectGrid";
import { Shell } from "../components/layout/Shell";
import { categories, normalizeEffectCategory } from "../registry/categories";
import { effectsByCategory } from "../registry/effects";
import type { EffectCategory } from "../types/effect";
import { filterEffectsByType, typesForCategory } from "../utils/effects";

function categoryFromQuery(value: string | null): EffectCategory {
  return normalizeEffectCategory(value) ?? "backgrounds";
}

export function HomePage() {
  const [searchParams] = useSearchParams();
  const activeCategory = categoryFromQuery(searchParams.get("category"));
  const activeType = searchParams.get("type") ?? searchParams.get("secondary") ?? "all";
  const activeCategoryDefinition = categories.find((category) => category.slug === activeCategory);
  const categoryEffects = useMemo(() => effectsByCategory(activeCategory), [activeCategory]);
  const visibleEffects = useMemo(
    () => filterEffectsByType(categoryEffects, activeType),
    [activeType, categoryEffects]
  );
  const typeOptions = useMemo(() => typesForCategory(categoryEffects), [categoryEffects]);
  const typeLabel =
    activeType === "all"
      ? "All types"
      : typeOptions.find((type) => type.slug === activeType)?.label ?? "Filtered";

  return (
    <Shell activeCategory={activeCategory} activeType={activeType} mode="gallery">
      <div className="mx-auto max-w-[1440px] p-5 md:p-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-atlas-hairline/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] text-atlas-ink">
              {activeCategoryDefinition?.label ?? "Backgrounds"}
            </h1>
            <p className="mt-3 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.01em] text-atlas-subtle">
              {activeCategoryDefinition?.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full bg-atlas-surface1 px-4 py-2 text-[14px] tracking-[-0.01em] text-atlas-subtle">
              {typeLabel}
            </div>
            <div className="rounded-full bg-atlas-surface1 px-4 py-2 text-[14px] tracking-[-0.01em] text-atlas-subtle">
              <span className="text-atlas-ink">{visibleEffects.length}</span> effects
            </div>
          </div>
        </div>
        <EffectGrid effects={visibleEffects} category={activeCategory} />
      </div>
    </Shell>
  );
}
