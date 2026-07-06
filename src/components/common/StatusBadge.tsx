import clsx from "clsx";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex h-7 items-center rounded-full px-3 text-xs tracking-[-0.01em]",
        status === "implemented"
          ? "bg-atlas-surface3 text-atlas-ink"
          : status === "reference"
            ? "bg-black/55 text-atlas-muted"
          : "bg-atlas-surface2 text-atlas-muted"
      )}
    >
      {status}
    </span>
  );
}
