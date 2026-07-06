import clsx from "clsx";

interface SegmentedTabOption {
  label: string;
  value: string;
}

interface SegmentedTabsProps {
  options: SegmentedTabOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}

export function SegmentedTabs({
  options,
  value,
  onChange,
  ariaLabel,
  size = "md",
  className
}: SegmentedTabsProps) {
  const optionCount = Math.max(1, options.length);
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );

  return (
    <div
      className={clsx(
        "relative inline-grid grid-flow-col items-center rounded-full bg-black p-1",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${optionCount}, minmax(6rem, 1fr))` }}
      role="tablist"
      aria-label={ariaLabel}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-[#202224] transition-transform duration-300 ease-in-out"
        style={{
          width: `calc((100% - 0.5rem) / ${optionCount})`,
          transform: `translateX(${activeIndex * 100}%)`
        }}
      />
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={clsx(
              "relative z-10 min-w-24 rounded-full bg-transparent px-5 tracking-[-0.01em] transition-[color,transform] duration-200 ease-in-out active:scale-95",
              size === "sm" ? "h-8 text-[13px]" : "h-10 text-[14px]",
              active
                ? "font-medium text-white"
                : "font-normal text-atlas-subtle hover:text-atlas-ink"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
