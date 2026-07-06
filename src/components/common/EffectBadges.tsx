import clsx from "clsx";
import type { EffectBadgeMeta } from "../../utils/effectBadges";

interface EffectBadgesProps {
  badges: EffectBadgeMeta[];
  compact?: boolean;
  className?: string;
}

const toneClass: Record<EffectBadgeMeta["tone"], string> = {
  default: "bg-white/10 text-atlas-muted ring-white/10",
  new: "bg-atlas-accent text-black ring-atlas-accent/20",
  demo: "bg-[#F28A2E] text-black ring-[#F28A2E]/25"
};

export function EffectBadges({ badges, compact = false, className }: EffectBadgesProps) {
  if (!badges.length) return null;

  return (
    <span className={clsx("inline-flex min-w-0 flex-wrap items-center gap-1.5", className)}>
      {badges.map((badge) => (
        <span
          key={`${badge.tone}-${badge.label}`}
          className={clsx(
            "shrink-0 rounded-full font-semibold uppercase leading-none tracking-[0.02em] ring-1",
            compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]",
            toneClass[badge.tone]
          )}
        >
          {badge.label}
        </span>
      ))}
    </span>
  );
}
