import type { ControlValue, DesignEffect, EffectControl, EffectProps, WorkbenchTab } from "../types/effect";
import { defaultPropsForEffect, parametersForEffect } from "./effects";

function defaultValueForControl(effect: DesignEffect, control: EffectControl): ControlValue {
  return defaultPropsForEffect(effect)[control.key] ?? control.defaultValue;
}

function coerceControlValue(effect: DesignEffect, control: EffectControl, rawValue: string | null): ControlValue {
  const defaultValue = defaultValueForControl(effect, control);

  if (rawValue === null) {
    return defaultValue;
  }

  if (control.type === "range" || control.type === "number") {
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) {
      return defaultValue;
    }

    const min = typeof control.min === "number" ? control.min : parsed;
    const max = typeof control.max === "number" ? control.max : parsed;
    return Math.min(max, Math.max(min, parsed));
  }

  if (control.type === "boolean") {
    if (rawValue !== "true" && rawValue !== "false") {
      return defaultValue;
    }

    return rawValue === "true";
  }

  if (control.type === "select") {
    const matched = control.options?.find((option) => String(option.value) === rawValue);
    return matched ? matched.value : defaultValue;
  }

  return rawValue;
}

export function valuesFromSearchParams(effect: DesignEffect, searchParams: URLSearchParams): EffectProps {
  return parametersForEffect(effect).reduce<EffectProps>((values, control) => {
    values[control.key] = coerceControlValue(effect, control, searchParams.get(control.key));
    return values;
  }, {});
}

export function defaultValuesForEffect(effect: DesignEffect): EffectProps {
  return parametersForEffect(effect).reduce<EffectProps>((values, control) => {
    values[control.key] = defaultValueForControl(effect, control);
    return values;
  }, {});
}

export function tabFromSearchParams(searchParams: URLSearchParams): WorkbenchTab {
  return searchParams.get("tab") === "code" ? "code" : "preview";
}

export function paramsForValues(effect: DesignEffect, values: EffectProps, tab: WorkbenchTab = "preview") {
  const next = new URLSearchParams();
  next.set("tab", tab);

  for (const control of parametersForEffect(effect)) {
    const value = values[control.key] ?? defaultValueForControl(effect, control);
    next.set(control.key, String(value));
  }

  return next;
}
