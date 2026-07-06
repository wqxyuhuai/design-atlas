import type { DesignEffect, EffectProps } from "../../types/effect";
import { usageSnippetForEffect } from "../../utils/usageSnippet";
import { CodeBlock } from "../common/CodeBlock";
import { CopyButton } from "../common/CopyButton";

interface UsageSnippetProps {
  effect: DesignEffect;
  values: EffectProps;
}

export function UsageSnippet({ effect, values }: UsageSnippetProps) {
  const usageCode = usageSnippetForEffect(effect, values);

  return (
    <section className="rounded-[18px] bg-atlas-canvas p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">
          Usage with your settings
        </h2>
        <CopyButton value={usageCode} label="Copy Usage" compact />
      </div>
      <div className="mt-5">
        <CodeBlock code={usageCode} language="tsx" />
      </div>
    </section>
  );
}
