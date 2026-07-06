import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ControlValue } from "../../types/effect";

interface SelectControlOption {
  label: string;
  value: ControlValue;
}

interface SelectControlProps {
  id?: string;
  value: ControlValue;
  options?: SelectControlOption[];
  onChange: (value: ControlValue) => void;
  className?: string;
}

function optionMatchesValue(option: SelectControlOption, value: ControlValue) {
  return String(option.value) === String(value);
}

export function SelectControl({ id, value, options = [], onChange, className = "" }: SelectControlProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const listboxId = `${controlId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => optionMatchesValue(option, value))
  );
  const selectedOption = options[selectedIndex];
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => window.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  function selectOption(index: number) {
    const option = options[index];

    if (!option) {
      return;
    }

    onChange(option.value);
    setOpen(false);
  }

  function moveActive(delta: number) {
    if (options.length === 0) {
      return;
    }

    setActiveIndex((index) => (index + delta + options.length) % options.length);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        id={controlId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            moveActive(1);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            moveActive(-1);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) {
              selectOption(activeIndex);
            } else {
              setOpen(true);
            }
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-full border border-atlas-hairline/70 bg-atlas-canvas px-4 text-left text-[15px] font-normal tracking-[-0.01em] text-atlas-ink outline-none transition hover:border-white/20 hover:bg-black focus:border-atlas-accent focus:ring-2 focus:ring-atlas-accent/25"
      >
        <span className="min-w-0 truncate">{selectedOption?.label ?? String(value)}</span>
        <ChevronDown
          size={17}
          strokeWidth={1.9}
          className={`shrink-0 text-atlas-ink transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={controlId}
          tabIndex={-1}
          className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-56 overflow-auto rounded-[18px] border border-white/[0.10] bg-black p-1.5 shadow-[0_18px_48px_rgb(0_0_0_/_0.46)]"
        >
          {options.map((option, index) => {
            const selected = optionMatchesValue(option, value);
            const active = index === activeIndex;

            return (
              <button
                key={`${option.label}-${String(option.value)}`}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(index)}
                className={`flex h-10 w-full items-center rounded-[13px] px-3 text-left text-[14px] font-normal tracking-[-0.01em] transition ${
                  selected
                    ? "bg-atlas-accent text-black"
                    : active
                      ? "bg-atlas-surface2 text-atlas-ink"
                      : "text-atlas-muted hover:bg-atlas-surface2 hover:text-atlas-ink"
                }`}
              >
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
