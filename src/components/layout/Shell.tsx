import { PrimaryCategoryRail } from "../sidebar/PrimaryCategoryRail";
import { SecondaryEffectList } from "../sidebar/SecondaryEffectList";
import type { EffectCategory } from "../../types/effect";

interface ShellProps {
  activeCategory: EffectCategory;
  activeEffectSlug?: string;
  activeType?: string;
  mode: "gallery" | "workbench";
  children: React.ReactNode;
}

export function Shell({ activeCategory, activeEffectSlug, activeType, mode, children }: ShellProps) {
  return (
    <div className="relative isolate min-h-[calc(100dvh-64px)] bg-atlas-canvas">
      <div aria-hidden="true" className="primary-rail-band hidden md:block" />
      <div aria-hidden="true" className="content-right-band hidden xl:block" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-64px)] w-full max-w-[1760px] grid-cols-1 md:grid-cols-[72px_180px_220px_minmax(0,1fr)] xl:grid-cols-[96px_180px_220px_minmax(0,1180px)_84px] 2xl:grid-cols-[120px_180px_220px_minmax(0,1180px)_60px]">
        <div aria-hidden="true" className="shell-left-spacer hidden h-full md:block" />
        <PrimaryCategoryRail activeCategory={activeCategory} />
        <SecondaryEffectList
          activeCategory={activeCategory}
          activeEffectSlug={activeEffectSlug}
          activeType={activeType}
          mode={mode}
        />
        <section className="min-w-0 bg-atlas-surface2 md:col-start-4">{children}</section>
        <div aria-hidden="true" className="hidden bg-atlas-surface2 xl:block xl:col-start-5" />
      </div>
    </div>
  );
}
