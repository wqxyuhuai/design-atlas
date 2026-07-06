import type { ControlValue, DesignEffect, EffectProps } from "../types/effect";
import { defaultPropsForEffect, parametersForEffect } from "./effects";

function jsxLiteral(value: ControlValue) {
  if (typeof value === "string") {
    return `{${JSON.stringify(value)}}`;
  }

  return `{${String(value)}}`;
}

function propLines(effect: DesignEffect, values: EffectProps) {
  return parametersForEffect(effect).map((control) => {
    const value = values[control.key] ?? defaultPropsForEffect(effect)[control.key] ?? control.defaultValue;
    return `        ${control.key}=${jsxLiteral(value)}`;
  });
}

export function usageSnippetForEffect(effect: DesignEffect, values: EffectProps) {
  if (effect.getUsageSnippet) {
    return effect.getUsageSnippet(values);
  }

  if (!effect.componentName || effect.status !== "implemented") {
    return `// ${effect.title} is currently a ${effect.status} asset.
// Use Copy Prompt or Copy Reference Info to recreate or spec this effect.`;
  }

  const props = propLines(effect, values);
  const component =
    props.length === 0
      ? `      <${effect.componentName} />`
      : `      <${effect.componentName}\n${props.join("\n")}\n      />`;

  const body =
    effect.category === "backgrounds"
      ? `    <div style={{ width: "100%", height: "600px", position: "relative" }}>\n${component}\n    </div>`
      : component;

  return `import { ${effect.componentName} } from "./${effect.componentName}";

export default function Demo() {
  return (
${body}
  );
}`;
}
