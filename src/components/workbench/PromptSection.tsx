import { CopyButton } from "../common/CopyButton";

interface PromptSectionProps {
  prompt: string;
}

export function PromptSection({ prompt }: PromptSectionProps) {
  return (
    <section className="rounded-[18px] bg-atlas-canvas p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">Integration Prompt</h2>
        </div>
        <CopyButton value={prompt} label="Copy Prompt" compact />
      </div>

      <pre className="mt-5 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-[16px] bg-atlas-surface2 p-4 font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-atlas-muted">
        {prompt}
      </pre>
    </section>
  );
}
