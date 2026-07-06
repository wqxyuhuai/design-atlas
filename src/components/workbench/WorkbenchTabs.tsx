import { useState } from "react";
import clsx from "clsx";
import type { DesignEffect } from "../../types/effect";
import { notesForEffect } from "../../utils/effects";
import { CodeBlock } from "../common/CodeBlock";
import { CopyButton } from "../common/CopyButton";

type TabKey = "code" | "prompt" | "notes" | "source";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "code", label: "Code" },
  { key: "prompt", label: "Prompt" },
  { key: "notes", label: "Notes" },
  { key: "source", label: "Source" }
];

interface WorkbenchTabsProps {
  effect: DesignEffect;
}

export function WorkbenchTabs({ effect }: WorkbenchTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("code");
  const textContent = {
    code: effect.code ?? "",
    prompt: effect.prompt,
    notes: notesForEffect(effect),
    source: effect.source ?? effect.sourceUrl ?? ""
  }[activeTab];

  return (
    <div className="rounded-[18px] bg-atlas-canvas">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "h-9 rounded-full px-4 text-[14px] tracking-[-0.01em] transition",
                activeTab === tab.key
                  ? "bg-atlas-surface3 font-medium text-atlas-ink"
                  : "font-normal text-atlas-subtle hover:bg-atlas-surface2 hover:text-atlas-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab !== "code" ? <CopyButton value={textContent} compact /> : null}
      </div>
      <div className="p-4 pt-1">
        {activeTab === "code" ? (
          <CodeBlock code={effect.code ?? "// No component source recorded yet."} />
        ) : (
          <pre className="min-h-48 whitespace-pre-wrap rounded-xl bg-atlas-canvas p-5 font-sans text-[15px] font-normal leading-[1.47] tracking-[-0.01em] text-atlas-muted">
            {textContent}
          </pre>
        )}
      </div>
    </div>
  );
}
