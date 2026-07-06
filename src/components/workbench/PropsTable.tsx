import type { DesignEffect } from "../../types/effect";
import { propDocsForEffect } from "../../utils/effectMeta";
import { Badge } from "../common/Badge";
import { EmptyState } from "../common/EmptyState";

interface PropsTableProps {
  effect: DesignEffect;
}

export function PropsTable({ effect }: PropsTableProps) {
  const docs = propDocsForEffect(effect);

  if (docs.length === 0) {
    return <EmptyState title="No parameters recorded." description="Add parameters when this asset needs tuning or reuse controls." />;
  }

  return (
    <section className="overflow-hidden rounded-[18px] bg-atlas-canvas">
      <div className="px-5 pb-4 pt-5">
        <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">Props</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-y border-atlas-hairline/70 bg-atlas-surface2/80 text-left text-[12px] font-normal tracking-[-0.01em] text-atlas-tertiary">
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Default</th>
              <th className="px-5 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.property} className="border-b border-atlas-hairline/60 align-top">
                <td className="px-5 py-4">
                  <Badge tone="strong">
                    {doc.property}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-[14px] font-normal leading-[1.43] tracking-[-0.01em] text-atlas-muted">
                  {doc.type}
                </td>
                <td className="px-5 py-4">
                  <Badge>{String(doc.defaultValue)}</Badge>
                </td>
                <td className="px-5 py-4 text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-atlas-subtle">
                  {doc.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
