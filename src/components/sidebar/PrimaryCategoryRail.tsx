import { NavLink, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import {
  CursorClick,
  DiamondsFour,
  ImagesSquare,
  NavigationArrow,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  TextAa,
  type Icon
} from "@phosphor-icons/react";
import { categories } from "../../registry/categories";
import { effectsByCategory } from "../../registry/effects";
import type { EffectCategory } from "../../types/effect";

interface PrimaryCategoryRailProps {
  activeCategory: EffectCategory;
}

const categoryIcons = {
  backgrounds: Sparkle,
  text: TextAa,
  navigation: NavigationArrow,
  media: ImagesSquare,
  components: DiamondsFour,
  layouts: SquaresFour,
  interactions: CursorClick,
  tools: SlidersHorizontal
} satisfies Record<EffectCategory, Icon>;

export function PrimaryCategoryRail({ activeCategory }: PrimaryCategoryRailProps) {
  const [, setSearchParams] = useSearchParams();
  const visibleCategories = categories.filter((category) => effectsByCategory(category.slug).length > 0);

  return (
    <aside className="hidden bg-atlas-canvas md:col-start-2 md:block">
      <div className="primary-rail-fixed p-3">
        <div className="px-2 pb-2 pt-1 text-xs font-normal text-atlas-tertiary">Categories</div>
        <div className="space-y-1">
          {visibleCategories.map((category) => {
            const active = category.slug === activeCategory;
            const Icon = categoryIcons[category.slug];
            return (
              <NavLink
                key={category.slug}
                to={`/?category=${category.slug}&type=all`}
                onClick={() => setSearchParams({ category: category.slug, type: "all" })}
                className={clsx(
                  "flex items-center justify-start gap-3 rounded-xl px-3 py-3 text-left text-[16px] tracking-[-0.01em] transition",
                  active
                    ? "bg-atlas-surface4 font-medium text-white"
                    : "font-normal text-atlas-subtle hover:bg-atlas-surface3 hover:text-atlas-muted"
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={clsx("h-[20px] w-[20px] shrink-0", active ? "text-white" : "text-[#a1a1a6]")}
                  weight="fill"
                />
                <span className="min-w-0 flex-1 truncate text-left">{category.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
