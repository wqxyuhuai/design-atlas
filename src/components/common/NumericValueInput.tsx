import { useEffect, useState } from "react";
import type { ControlValue, EffectControl } from "../../types/effect";

interface NumericValueInputProps {
  control: EffectControl;
  value: ControlValue;
  onChange: (value: number) => void;
  ariaLabel?: string;
  className?: string;
}

function clampValue(control: EffectControl, value: number) {
  let nextValue = value;

  if (typeof control.min === "number") {
    nextValue = Math.max(control.min, nextValue);
  }

  if (typeof control.max === "number") {
    nextValue = Math.min(control.max, nextValue);
  }

  return nextValue;
}

function parseDraft(draft: string, unit?: string) {
  const trimmed = draft.trim();
  const withoutUnit = unit && trimmed.toLowerCase().endsWith(unit.toLowerCase())
    ? trimmed.slice(0, -unit.length).trim()
    : trimmed;

  if (withoutUnit === "") {
    return null;
  }

  const parsed = Number(withoutUnit);
  return Number.isFinite(parsed) ? parsed : null;
}

export function NumericValueInput({ control, value, onChange, ariaLabel, className = "" }: NumericValueInputProps) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commitDraft() {
    const parsed = parseDraft(draft, control.unit);

    if (parsed === null) {
      setDraft(String(value));
      return;
    }

    const nextValue = clampValue(control, parsed);
    setDraft(String(nextValue));
    onChange(nextValue);
  }

  return (
    <label
      className={`inline-flex h-7 shrink-0 items-center rounded-full bg-atlas-canvas px-3 text-[12px] font-normal tracking-[-0.01em] text-atlas-muted transition focus-within:ring-2 focus-within:ring-atlas-accent/45 ${className}`}
    >
      <input
        type="text"
        inputMode="decimal"
        value={draft}
        aria-label={ariaLabel ?? `${control.label} value`}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commitDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          } else if (event.key === "Escape") {
            setDraft(String(value));
            event.currentTarget.blur();
          }
        }}
        className="w-[4.5ch] min-w-0 bg-transparent p-0 text-right text-inherit outline-none"
      />
      {control.unit ? <span aria-hidden="true">{control.unit}</span> : null}
    </label>
  );
}
