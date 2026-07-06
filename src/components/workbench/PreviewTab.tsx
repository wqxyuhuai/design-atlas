import type { ControlValue, DesignEffect, EffectProps } from "../../types/effect";
import { CustomizePanel } from "./CustomizePanel";
import { LivePreviewPanel } from "./LivePreviewPanel";
import { NotesSection } from "./NotesSection";
import { PropsTable } from "./PropsTable";

interface PreviewTabProps {
  effect: DesignEffect;
  values: EffectProps;
  onChange: (key: string, value: ControlValue) => void;
  demoContent: boolean;
  onDemoContentChange: (nextValue: boolean) => void;
}

export function PreviewTab({
  effect,
  values,
  onChange,
  demoContent,
  onDemoContentChange
}: PreviewTabProps) {
  return (
    <div className="space-y-6">
      <LivePreviewPanel
        effect={effect}
        values={values}
        demoContent={demoContent}
        onDemoContentChange={onDemoContentChange}
      />
      <CustomizePanel effect={effect} values={values} onChange={onChange} />
      <PropsTable effect={effect} />
      <NotesSection notes={effect.note ?? effect.notes ?? ""} />
    </div>
  );
}
