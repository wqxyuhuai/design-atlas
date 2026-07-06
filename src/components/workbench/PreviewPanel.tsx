import type { DesignEffect, EffectProps } from "../../types/effect";

interface PreviewPanelProps {
  effect: DesignEffect;
  values: EffectProps;
}

export function PreviewPanel({ effect, values }: PreviewPanelProps) {
  const Preview = effect.previewComponent;

  return (
    <div className="overflow-hidden rounded-[18px] bg-atlas-canvas p-4">
      <div className="preview-grid min-h-[360px] overflow-hidden rounded-xl bg-atlas-canvas">
        {Preview ? (
          <Preview {...values} />
        ) : effect.screenshot ? (
          <img src={effect.screenshot} alt={`${effect.title} screenshot`} className="h-full w-full object-cover" />
        ) : null}
      </div>
    </div>
  );
}
