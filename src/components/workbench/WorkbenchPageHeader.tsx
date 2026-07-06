import { RotateCcw } from "lucide-react";
import type { DesignEffect, WorkbenchTab } from "../../types/effect";
import { effectBadgesForEffect } from "../../utils/effectBadges";
import { CopyButton } from "../common/CopyButton";
import { EffectBadges } from "../common/EffectBadges";
import { SegmentedTabs } from "../common/SegmentedTabs";

interface WorkbenchPageHeaderProps {
  effect: DesignEffect;
  activeTab: WorkbenchTab;
  onTabChange: (tab: WorkbenchTab) => void;
  onReset: () => void;
  integrationPrompt: string;
  shareUrl: string;
}

const modeOptions = [
  { label: "Preview", value: "preview" },
  { label: "Code", value: "code" }
];

const toolbarButtonClass =
  "inline-flex h-9 items-center gap-2 rounded-full bg-atlas-surface2 px-4 text-[14px] font-normal tracking-[-0.01em] text-atlas-muted transition hover:bg-atlas-surface3 hover:text-atlas-ink active:scale-95";

export function WorkbenchPageHeader({
  effect,
  activeTab,
  onTabChange,
  onReset,
  integrationPrompt,
  shareUrl
}: WorkbenchPageHeaderProps) {
  const badges = effectBadgesForEffect(effect);

  return (
    <div className="pb-4">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <h1 className="min-w-0 text-[40px] font-semibold leading-[1.08] tracking-[-0.015em] text-atlas-ink">
              {effect.title}
            </h1>
            <EffectBadges badges={badges} />
          </div>
          <SegmentedTabs
            options={modeOptions}
            value={activeTab}
            onChange={(value) => onTabChange(value as WorkbenchTab)}
            ariaLabel="Workbench mode"
            className="mt-5"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <button type="button" onClick={onReset} className={toolbarButtonClass}>
            <RotateCcw size={14} strokeWidth={1.8} />
            Reset
          </button>
          <CopyButton value={shareUrl} label="Copy Link" compact />
          <CopyButton value={integrationPrompt} label="Copy Prompt" compact />
        </div>
      </div>
    </div>
  );
}
