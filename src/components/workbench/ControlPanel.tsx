import { RotateCcw } from "lucide-react";
import type { ControlValue, DesignEffect, EffectControl, EffectProps } from "../../types/effect";
import { shouldShowControlInfo } from "../../utils/controlInfo";
import { ColorPickerControl } from "../common/ColorPickerControl";
import { EmptyState } from "../common/EmptyState";
import { InfoTooltip } from "../common/InfoTooltip";
import { NumericValueInput } from "../common/NumericValueInput";
import { SelectControl } from "../common/SelectControl";
import { SwitchControl } from "../common/SwitchControl";

interface ControlPanelProps {
  effect: DesignEffect;
  values: EffectProps;
  onChange: (key: string, value: ControlValue) => void;
  onReset: () => void;
}

function controlValue(control: EffectControl, values: EffectProps) {
  return values[control.key] ?? control.defaultValue;
}

export function ControlPanel({ effect, values, onChange, onReset }: ControlPanelProps) {
  const controls = effect.controls ?? effect.parameters ?? [];

  if (controls.length === 0) {
    return <EmptyState title="No configurable parameters for this effect." />;
  }

  return (
    <div className="rounded-[18px] bg-atlas-canvas">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-[17px] font-semibold leading-[1.24] tracking-[-0.01em] text-atlas-ink">Parameters</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-atlas-surface2 px-4 text-[14px] font-normal tracking-[-0.01em] text-atlas-muted transition hover:bg-atlas-surface3 hover:text-atlas-ink active:scale-95"
        >
          <RotateCcw size={14} strokeWidth={1.8} />
          Reset
        </button>
      </div>
      <div className="px-2 pb-2">
        {controls.map((control) => (
          <div
            key={control.key}
            className="grid gap-3 rounded-xl px-3 py-4 md:grid-cols-[148px_minmax(0,1fr)]"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <label className="text-[15px] font-normal tracking-[-0.01em] text-atlas-muted" htmlFor={control.key}>
                  {control.label}
                </label>
                {shouldShowControlInfo(control) ? (
                  <InfoTooltip label={`${control.label} details`} content={control.description ?? ""} />
                ) : null}
              </div>
            </div>
            <ControlInput control={control} value={controlValue(control, values)} onChange={onChange} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ControlInputProps {
  control: EffectControl;
  value: ControlValue;
  onChange: (key: string, value: ControlValue) => void;
}

function ControlInput({ control, value, onChange }: ControlInputProps) {
  if (control.type === "range") {
    return (
      <div className="flex items-center gap-3">
        <input
          id={control.key}
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={Number(value)}
          onChange={(event) => onChange(control.key, Number(event.target.value))}
          className="w-full accent-atlas-accent"
        />
        <NumericValueInput
          control={control}
          value={value}
          onChange={(nextValue) => onChange(control.key, nextValue)}
          ariaLabel={`${control.label} value`}
        />
      </div>
    );
  }

  if (control.type === "boolean") {
    const enabled = Boolean(value);

    return (
      <SwitchControl checked={enabled} label={control.label} onChange={() => onChange(control.key, !enabled)} />
    );
  }

  if (control.type === "select") {
    return (
      <SelectControl
        id={control.key}
        value={String(value)}
        options={control.options}
        onChange={(nextValue) => onChange(control.key, nextValue)}
      />
    );
  }

  if (control.type === "color") {
    return (
      <ColorPickerControl
        id={control.key}
        label={control.label}
        value={String(value)}
        onChange={(nextValue) => onChange(control.key, nextValue)}
      />
    );
  }

  return (
    <input
      id={control.key}
      type={control.type}
      value={String(value)}
      min={control.min}
      max={control.max}
      step={control.step}
      onChange={(event) => {
        const nextValue = control.type === "number" ? Number(event.target.value) : event.target.value;
        onChange(control.key, nextValue);
      }}
      className="h-11 rounded-full border border-atlas-hairline/80 bg-atlas-canvas px-4 text-[15px] font-normal tracking-[-0.01em] text-atlas-ink outline-none focus:border-atlas-accent focus:ring-2 focus:ring-atlas-accent/20"
    />
  );
}
