import { Link } from "react-router-dom";
import type { DesignEffect } from "../../types/effect";
import { effectBadgesForEffect } from "../../utils/effectBadges";
import { defaultPropsForEffect } from "../../utils/effects";
import { effectPath } from "../../utils/routes";
import { EffectBadges } from "../common/EffectBadges";

interface EffectPreviewCardProps {
  effect: DesignEffect;
}

function PlaceholderPreview({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="w-full max-w-[62%] space-y-3">
        <div className="h-3 rounded-full bg-white/18" />
        <div className="h-3 w-3/4 rounded-full bg-white/10" />
        <div className="mt-5 aspect-[16/8] rounded-[14px] border border-white/[0.08] bg-black/42" />
      </div>
      <span className="sr-only">{title} placeholder preview</span>
    </div>
  );
}

export function EffectPreviewCard({ effect }: EffectPreviewCardProps) {
  const Preview = effect.previewComponent;
  const defaultProps = defaultPropsForEffect(effect);
  const badges = effectBadgesForEffect(effect);
  const previewProps =
    effect.category === "backgrounds"
      ? {
          ...defaultProps,
          previewMode: "card"
        }
      : {
          ...defaultProps,
          previewMode: "card"
        };
  const aspectClass =
    effect.category === "navigation"
      ? "aspect-[16/7]"
      : effect.category === "backgrounds"
        ? "aspect-[16/10]"
        : effect.category === "text"
          ? "aspect-[16/10]"
          : "aspect-[4/3]";

  return (
    <Link
      to={effectPath(effect)}
      data-category={effect.category}
      className={`effect-preview-card group relative block overflow-hidden rounded-[18px] bg-black outline-none transition hover:ring-1 hover:ring-white/[0.10] focus-visible:ring-2 focus-visible:ring-atlas-accent/55 ${aspectClass}`}
      aria-label={`Open ${effect.title}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-black">
        {Preview ? (
          <Preview {...previewProps} />
        ) : effect.screenshot ? (
          <img
            src={effect.screenshot}
            alt={`${effect.title} screenshot`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <PlaceholderPreview title={effect.title} />
        )}
      </div>
      <EffectBadges badges={badges} compact className="pointer-events-none absolute left-3 top-3 z-10" />
      <span className="sr-only">{effect.title}</span>
    </Link>
  );
}
