import { ExternalLink } from "lucide-react";
import type { DesignEffect } from "../../types/effect";

interface SourceLicenseSectionProps {
  effect: DesignEffect;
}

function DetailLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-[14px] font-normal tracking-[-0.01em] text-atlas-ink transition hover:text-atlas-accentHover"
    >
      <ExternalLink size={14} strokeWidth={1.8} />
      {label}
    </a>
  );
}

export function SourceLicenseSection({ effect }: SourceLicenseSectionProps) {
  const sourceHref = effect.sourceUrl ?? effect.githubUrl;
  const sourceText = effect.source?.trim();
  const licenseText = effect.licenseNote?.trim();
  const sourceLabel = sourceHref
    ? (() => {
        try {
          return new URL(sourceHref).hostname.replace(/^www\./, "");
        } catch {
          return sourceHref;
        }
      })()
    : "Original reference";

  return (
    <section className="rounded-[18px] bg-atlas-canvas p-4">
      <h2 className="text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">Source</h2>

      <div className="mt-3 rounded-[14px] bg-atlas-surface2 p-3.5">
        {sourceHref ? <DetailLink href={sourceHref} label="Original source" /> : null}
        <div className="mt-2 space-y-3 text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-atlas-muted">
          <p>{sourceLabel}</p>
          {sourceText ? <p className="whitespace-pre-wrap">{sourceText}</p> : null}
          {licenseText ? <p className="whitespace-pre-wrap">License: {licenseText}</p> : null}
        </div>
      </div>
    </section>
  );
}
