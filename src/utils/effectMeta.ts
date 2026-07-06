import type { ControlValue, DesignEffect, EffectCodeFile, EffectDependency, EffectPropDoc } from "../types/effect";
import { defaultPropsForEffect, parametersForEffect } from "./effects";

function defaultValueForKey(effect: DesignEffect, key: string, fallback: ControlValue) {
  return defaultPropsForEffect(effect)[key] ?? fallback;
}

export function normalizedDependencies(effect: DesignEffect): EffectDependency[] {
  return (effect.dependencies ?? [])
    .map((dependency) =>
      typeof dependency === "string"
        ? {
            name: dependency,
            packageName: dependency
          }
        : {
            ...dependency,
            name: dependency.name || dependency.packageName || "dependency"
          }
    )
    .filter((dependency) => dependency.packageName || dependency.name);
}

export function normalizedCodeFiles(effect: DesignEffect): EffectCodeFile[] {
  if (effect.codeFiles?.length) {
    return effect.codeFiles;
  }

  if (!effect.code) {
    return [];
  }

  return [
    {
      filename: `${effect.componentName ?? effect.slug}.tsx`,
      language: "tsx",
      code: effect.code
    }
  ];
}

function inferredPropType(effect: DesignEffect, key: string) {
  const control = parametersForEffect(effect).find((item) => item.key === key);
  if (!control) {
    return typeof defaultPropsForEffect(effect)[key];
  }

  if (control.type === "range" || control.type === "number") {
    return "number";
  }

  if (control.type === "color" || control.type === "text") {
    return "string";
  }

  if (control.type === "boolean") {
    return "boolean";
  }

  if (control.type === "select" && control.options?.length) {
    return control.options
      .map((option) => JSON.stringify(option.value))
      .join(" | ");
  }

  return "string";
}

function inferredDescription(label: string) {
  const normalized = label.trim().replace(/\s+/g, " ");
  return `Controls ${normalized.charAt(0).toLowerCase()}${normalized.slice(1)}.`;
}

export function propDocsForEffect(effect: DesignEffect): EffectPropDoc[] {
  if (effect.propsDocs?.length) {
    return effect.propsDocs;
  }

  return parametersForEffect(effect).map((control) => ({
    property: control.key,
    type: inferredPropType(effect, control.key),
    defaultValue: defaultValueForKey(effect, control.key, control.defaultValue),
    description: control.description ?? inferredDescription(control.label)
  }));
}
