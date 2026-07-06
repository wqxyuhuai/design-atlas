import type { DesignEffect, EffectProps } from "../../types/effect";
import { PromptSection } from "./PromptSection";
import { SourceCodePanel } from "./SourceCodePanel";
import { SourceLicenseSection } from "./SourceLicenseSection";
import { UsageSnippet } from "./UsageSnippet";

interface CodeTabProps {
  effect: DesignEffect;
  values: EffectProps;
  integrationPrompt: string;
}

export function CodeTab({ effect, values, integrationPrompt }: CodeTabProps) {
  return (
    <div className="space-y-6">
      <UsageSnippet effect={effect} values={values} />
      <SourceCodePanel effect={effect} />
      <PromptSection prompt={integrationPrompt} />
      <SourceLicenseSection effect={effect} />
    </div>
  );
}
