import type { ControlValue, DesignEffect, EffectControl, EffectProps } from "../../types/effect";
import { shouldShowControlInfo } from "../../utils/controlInfo";
import { controlLevel, orderedControlsForEffect } from "../../utils/controlLevels";
import { defaultPropsForEffect, parametersForEffect } from "../../utils/effects";
import { ColorPickerControl } from "../common/ColorPickerControl";
import { InfoTooltip } from "../common/InfoTooltip";
import { NumericValueInput } from "../common/NumericValueInput";
import { SelectControl } from "../common/SelectControl";
import { SwitchControl } from "../common/SwitchControl";

interface CustomizePanelProps {
  effect: DesignEffect;
  values: EffectProps;
  onChange: (key: string, value: ControlValue) => void;
}

function valueForControl(effect: DesignEffect, control: EffectControl, values: EffectProps) {
  return values[control.key] ?? defaultPropsForEffect(effect)[control.key] ?? control.defaultValue;
}

function gridSpanClass(control: EffectControl) {
  if (control.type === "text") {
    return "md:col-span-1 xl:col-span-3";
  }

  return "md:col-span-1 xl:col-span-2";
}

function cardHeightClass(control: EffectControl) {
  if (control.type === "boolean") {
    return "min-h-12";
  }

  return "min-h-24";
}

function layoutRank(control: EffectControl) {
  if (control.type === "text") {
    return 0;
  }

  if (control.type === "boolean") {
    return 2;
  }

  return 1;
}

function orderedControlsForLayout(controls: EffectControl[]) {
  return [...controls].sort((a, b) => layoutRank(a) - layoutRank(b));
}

export function CustomizePanel({ effect, values, onChange }: CustomizePanelProps) {
  const controls = parametersForEffect(effect);
  if (controls.length === 0) {
    return null;
  }

  const visibleControls = orderedControlsForEffect(
    effect,
    controls.filter((control) => controlLevel(control) !== "hidden")
  );
  const layoutControls = orderedControlsForLayout(visibleControls);

  return (
    <section className="rounded-[18px] bg-atlas-canvas p-4 md:p-5">
      <ControlGrid effect={effect} controls={layoutControls} values={values} onChange={onChange} />
    </section>
  );
}

interface ControlGridProps {
  effect: DesignEffect;
  controls: EffectControl[];
  values: EffectProps;
  onChange: (key: string, value: ControlValue) => void;
}

function ControlGrid({ effect, controls, values, onChange }: ControlGridProps) {
  return (
    <div className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-6">
      {controls.map((control) => {
        const value = valueForControl(effect, control, values);
        const showValueBadge = control.type === "range" || control.type === "number";
        const inlineControl = control.type === "boolean";

        return (
          <div
            key={control.key}
            className={`flex flex-col justify-between rounded-[14px] bg-atlas-surface2 p-3 ${cardHeightClass(control)} ${gridSpanClass(control)}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[15px] font-medium leading-[1.2] tracking-[-0.01em] text-atlas-ink">
                  {control.label}
                  {shouldShowControlInfo(control) ? (
                    <InfoTooltip label={`${control.label} details`} content={control.description ?? ""} />
                  ) : null}
                </div>
              </div>
              {inlineControl ? (
                <ControlInput control={control} value={value} onChange={onChange} />
              ) : showValueBadge ? (
                <NumericValueInput
                  control={control}
                  value={value}
                  onChange={(nextValue) => onChange(control.key, nextValue)}
                  ariaLabel={`${control.label} value`}
                />
              ) : null}
            </div>
            {!inlineControl ? (
              <div className="mt-2.5">
                <ControlInput control={control} value={value} onChange={onChange} />
              </div>
            ) : null}
          </div>
        );
      })}
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
      <input
        id={control.key}
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={Number(value)}
        onChange={(event) => onChange(control.key, Number(event.target.value))}
        className="atlas-slider w-full"
      />
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
      type={control.type === "number" ? "number" : "text"}
      value={String(value)}
      min={control.min}
      max={control.max}
      step={control.step}
      onChange={(event) => {
        const nextValue = control.type === "number" ? Number(event.target.value) : event.target.value;
        onChange(control.key, nextValue);
      }}
      className="h-11 w-full rounded-full border border-atlas-hairline/70 bg-atlas-canvas px-4 text-[15px] font-normal tracking-[-0.01em] text-atlas-ink outline-none transition focus:border-atlas-accent"
    />
  );
}
