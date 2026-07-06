import { useEffect, useState } from "react";
import clsx from "clsx";
import type { DesignEffect } from "../../types/effect";
import { normalizedCodeFiles } from "../../utils/effectMeta";
import { CodeBlock } from "../common/CodeBlock";
import { CopyButton } from "../common/CopyButton";
import { EmptyState } from "../common/EmptyState";

interface SourceCodePanelProps {
  effect: DesignEffect;
}

export function SourceCodePanel({ effect }: SourceCodePanelProps) {
  const files = normalizedCodeFiles(effect).filter((file) => file.language === "tsx" || file.language === "css");
  const firstFilename = files[0]?.filename ?? "";
  const [activeFilename, setActiveFilename] = useState(firstFilename);

  useEffect(() => {
    setActiveFilename(firstFilename);
  }, [effect.slug, firstFilename]);

  if (files.length === 0) {
    return <EmptyState title="No source files available." />;
  }

  const activeFile = files.find((file) => file.filename === activeFilename) ?? files[0];

  return (
    <section className="rounded-[18px] bg-atlas-canvas p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">Source Code</h2>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {files.length > 1 ? (
            <div className="inline-flex w-fit items-center gap-1 rounded-full bg-black p-1" role="tablist" aria-label="Source files">
              {files.map((file) => {
                const active = file.filename === activeFile.filename;

                return (
                  <button
                    key={file.filename}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilename(file.filename)}
                    className={clsx(
                      "h-8 rounded-full px-3 text-[13px] font-normal tracking-[-0.01em] transition active:scale-95",
                      active ? "bg-[#202224] text-white" : "text-atlas-subtle hover:bg-white/[0.04] hover:text-atlas-ink"
                    )}
                  >
                    {file.filename}
                  </button>
                );
              })}
            </div>
          ) : null}
          <CopyButton value={activeFile.code} label="Copy Code" compact />
        </div>
      </div>

      <div className="mt-5">
        <CodeBlock
          code={activeFile.code}
          language={activeFile.language}
          maxHeight={420}
        />
      </div>
    </section>
  );
}
