interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[18px] bg-atlas-canvas p-6 text-[17px] tracking-[-0.01em]">
      <div className="font-semibold leading-[1.24] text-atlas-ink">{title}</div>
      {description ? <p className="mt-2 leading-[1.47] text-atlas-subtle">{description}</p> : null}
    </div>
  );
}
