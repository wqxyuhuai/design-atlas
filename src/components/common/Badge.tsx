import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "subtle" | "strong" | "accent";
  monospace?: boolean;
}

export function Badge({ children, tone = "subtle", monospace = false }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-normal tracking-[-0.01em]",
        tone === "strong" && "bg-atlas-canvas text-atlas-ink",
        tone === "subtle" && "bg-atlas-surface3 text-atlas-subtle",
        tone === "accent" && "bg-atlas-accent text-atlas-accentInk",
        monospace && "font-mono"
      )}
    >
      {children}
    </span>
  );
}
