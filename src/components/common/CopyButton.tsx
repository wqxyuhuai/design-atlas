import { AlertCircle, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { copyText } from "../../utils/copy";

interface CopyButtonProps {
  value: string;
  label?: string;
  compact?: boolean;
}

export function CopyButton({ value, label = "Copy", compact = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied && !failed) return;
    const timeout = window.setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 1600);
    return () => window.clearTimeout(timeout);
  }, [copied, failed]);

  async function handleCopy() {
    try {
      await copyText(value);
      setFailed(false);
      setCopied(true);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  const Icon = failed ? AlertCircle : copied ? Check : Copy;
  const text = failed ? "Failed" : copied ? "Copied" : label;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full text-[14px] font-normal tracking-[-0.01em] transition active:scale-95 ${
        failed
          ? "bg-[#3a2023] text-[#ffb4ab] hover:bg-[#47282c]"
          : copied
            ? "bg-atlas-canvas text-atlas-ink hover:bg-atlas-canvas"
            : "bg-atlas-surface2 text-atlas-muted hover:bg-atlas-surface3 hover:text-atlas-ink"
      } ${
        compact ? "h-9 px-4" : "h-11 px-5"
      }`}
    >
      <Icon size={15} strokeWidth={1.8} />
      {text}
    </button>
  );
}
