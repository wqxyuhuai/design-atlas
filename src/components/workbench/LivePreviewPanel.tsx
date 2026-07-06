import { RotateCcw } from "lucide-react";
import { useState } from "react";
import type { DesignEffect, EffectProps } from "../../types/effect";
import { defaultPropsForEffect } from "../../utils/effects";

interface LivePreviewPanelProps {
  effect: DesignEffect;
  values: EffectProps;
  demoContent: boolean;
  onDemoContentChange: (nextValue: boolean) => void;
}

const greenPreviewButtonClass =
  "relative isolate overflow-hidden bg-atlas-accent text-black shadow-[inset_0_1px_0_rgb(255_255_255_/_0.24)] transition before:pointer-events-none before:absolute before:inset-0 before:bg-black/0 before:transition-colors hover:before:bg-black/20 active:scale-95";
const neutralPreviewButtonClass =
  "relative isolate overflow-hidden border border-white/[0.08] bg-atlas-surface2 text-white/82 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)] transition before:pointer-events-none before:absolute before:inset-0 before:bg-black/0 before:transition-colors hover:text-white hover:before:bg-black/20 active:scale-95";

function DemoOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-4 md:p-7">
      <div className="mx-auto mt-4 flex h-12 w-[min(74%,820px)] items-center justify-between rounded-[14px] border border-white/[0.08] bg-[#1a1621]/88 px-4 text-[13px] text-white/58 shadow-[0_24px_80px_rgb(0_0_0_/_0.28)] backdrop-blur">
        <span className="text-[15px] font-semibold text-white">Design Atlas</span>
        <div className="hidden items-center gap-5 md:flex">
          <span>Features</span>
          <span>About</span>
          <span className="rounded-[12px] bg-white px-4 py-2 font-medium text-black">Sign up</span>
        </div>
      </div>

      <div className="absolute inset-x-6 top-1/2 mx-auto max-w-[560px] -translate-y-[42%] text-center">
        <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-[#17131c]/78 px-3 py-1 text-[12px] font-semibold tracking-[0.02em] text-white/82 backdrop-blur">
          NEW
          <span className="ml-2 font-normal text-white/54">Just shipped v2.0</span>
        </span>
        <h2 className="mt-7 text-[30px] font-semibold leading-[1.03] tracking-[-0.02em] text-white md:text-[42px]">
          Build interfaces that feel alive
        </h2>
        <div className="mt-7 flex justify-center gap-3">
          <span className="inline-flex h-11 items-center rounded-[12px] bg-white px-5 text-[14px] font-semibold text-black">
            Get started
          </span>
          <span className="inline-flex h-11 items-center rounded-[12px] border border-white/[0.08] bg-white/[0.05] px-5 text-[14px] font-medium text-white/62 backdrop-blur">
            Learn more
          </span>
        </div>
      </div>
    </div>
  );
}

export function LivePreviewPanel({
  effect,
  values,
  demoContent,
  onDemoContentChange
}: LivePreviewPanelProps) {
  const [replayKey, setReplayKey] = useState(0);
  const Preview = effect.previewComponent;
  const isBackgroundEffect = effect.category === "backgrounds";
  const previewProps: EffectProps = isBackgroundEffect
    ? {
        ...values,
        previewMode: "backgroundOnly"
      }
    : values;

  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-[18px] bg-black">
      <div className="absolute inset-0">
        {Preview ? (
          <Preview key={replayKey} {...(Object.keys(previewProps).length ? previewProps : defaultPropsForEffect(effect))} />
        ) : effect.screenshot ? (
          <img
            src={effect.screenshot}
            alt={`${effect.title} screenshot`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="w-full max-w-xl px-8 text-center">
              <div className="mx-auto aspect-[16/8] max-w-md rounded-[18px] border border-white/[0.08] bg-black/45" />
              <p className="mt-5 text-[15px] tracking-[-0.01em] text-atlas-muted">
                No screenshot yet. Add one to <span className="text-atlas-ink">public/effects/{effect.category}/{effect.slug}.jpg</span>.
              </p>
            </div>
          </div>
        )}
      </div>
      {isBackgroundEffect && demoContent ? <DemoOverlay /> : null}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {Preview ? (
          <button
            type="button"
            onClick={() => setReplayKey((currentKey) => currentKey + 1)}
            aria-label="Replay preview animation"
            title="Replay"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full backdrop-blur ${greenPreviewButtonClass}`}
          >
            <RotateCcw aria-hidden="true" size={15} strokeWidth={1.8} />
          </button>
        ) : null}
        {isBackgroundEffect ? (
          <button
            type="button"
            onClick={() => onDemoContentChange(!demoContent)}
            style={demoContent ? undefined : { backgroundColor: "#202224" }}
            className={`inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-normal tracking-[-0.01em] backdrop-blur transition active:scale-95 ${
              demoContent
                ? greenPreviewButtonClass
                : neutralPreviewButtonClass
            }`}
          >
            Demo Content {demoContent ? "On" : "Off"}
          </button>
        ) : null}
      </div>
    </section>
  );
}
