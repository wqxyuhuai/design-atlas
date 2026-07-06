import { Info } from "lucide-react";

interface InfoTooltipProps {
  label: string;
  content: string;
}

export function InfoTooltip({ label, content }: InfoTooltipProps) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label}
        className="inline-flex h-4 w-4 items-center justify-center text-atlas-subtle outline-none transition hover:text-atlas-ink focus:text-atlas-ink"
      >
        <Info size={13} strokeWidth={1.9} aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-7 z-50 w-56 -translate-x-1/2 rounded-[14px] border border-white/[0.10] bg-black px-3 py-2 text-left text-[12px] font-normal leading-[1.42] tracking-[-0.01em] text-atlas-muted opacity-0 shadow-[0_18px_48px_rgb(0_0_0_/_0.46)] transition group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
