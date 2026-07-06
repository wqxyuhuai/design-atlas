import type { DesignEffect } from "../../types/effect";
import { notesForEffect, parametersForEffect } from "../../utils/effects";
import { CopyButton } from "../common/CopyButton";

interface ReusePanelProps {
  effect: DesignEffect;
  currentUrl: string;
}

function createReuseSkill(effect: DesignEffect, currentUrl: string) {
  const controls = parametersForEffect(effect)
    .map((control) => `- ${control.key}: ${control.type}, default ${String(control.defaultValue)}`)
    .join("\n");

  return `# ${effect.title} reuse brief

Use this as a portable implementation brief for a new case.

Effect: ${effect.title}
Category: ${effect.category}
Description: ${effect.description}
Current tuned URL: ${currentUrl}

Controls:
${controls}

Implementation contract:
1. Rebuild the effect as a self-contained React component.
2. Preserve the visual intent, but do not copy third-party source code.
3. Keep props aligned with the controls above.
4. Use stable layout dimensions so parameter changes do not cause layout shift.
5. Include required CSS and a usage example.

Prompt:
${effect.prompt}

Notes:
${notesForEffect(effect)}

Source:
${effect.source ?? effect.sourceUrl ?? "Not recorded"}`;
}

export function ReusePanel({ effect, currentUrl }: ReusePanelProps) {
  const reuseSkill = createReuseSkill(effect, currentUrl);

  return (
    <div className="flex justify-end">
      <div className="inline-flex flex-wrap justify-end gap-2 rounded-full bg-atlas-canvas p-2">
        {effect.code ? <CopyButton value={effect.code} label="Copy Code" compact /> : null}
        <CopyButton value={effect.prompt} label="Copy Prompt" compact />
        <CopyButton value={reuseSkill} label="Copy Skill" compact />
      </div>
    </div>
  );
}
