import type { ComponentType } from "react";
import type { DesignEffect, EffectCategory, EffectCodeFile, EffectControl, EffectProps } from "../../../types/effect";
import { sourceNameFromUrl } from "../../../lib/notion/effectInboxSchema";

export type ImportedEffectDefinition = {
  slug: string;
  title: string;
  category: EffectCategory;
  sourceUrl: string;
  description: string;
  visualStyle: string;
  motionLogic: string;
  defaultProps: EffectProps;
  controls: EffectControl[];
  dependencies: string[];
  codeFiles: EffectCodeFile[];
  previewComponent: ComponentType<EffectProps>;
  tags?: string[];
};

export const hiddenRenderer = (slug: string): EffectControl => ({
  key: "renderer",
  label: "Renderer",
  type: "text",
  defaultValue: slug,
  description: "Internal renderer key for the shared imported-effect preview adapter.",
  level: "hidden"
});

export const text = (
  key: string,
  label: string,
  defaultValue: string,
  description: string,
  level: "primary" | "advanced" = "advanced"
): EffectControl => ({
  key,
  label,
  type: "text",
  defaultValue,
  description,
  level
});

export const color = (
  key: string,
  label: string,
  defaultValue: string,
  description: string,
  level: "primary" | "advanced" = "primary"
): EffectControl => ({
  key,
  label,
  type: "color",
  defaultValue,
  description,
  level
});

export const bool = (
  key: string,
  label: string,
  defaultValue: boolean,
  description: string,
  level: "primary" | "advanced" = "advanced"
): EffectControl => ({
  key,
  label,
  type: "boolean",
  defaultValue,
  description,
  level
});

export const range = (
  key: string,
  label: string,
  defaultValue: number,
  min: number,
  max: number,
  step: number,
  description: string,
  level: "primary" | "advanced" = "primary",
  unit?: string
): EffectControl => ({
  key,
  label,
  type: "range",
  defaultValue,
  min,
  max,
  step,
  unit,
  description,
  level
});

export const select = (
  key: string,
  label: string,
  defaultValue: string,
  options: string[],
  description: string,
  level: "primary" | "advanced" = "primary"
): EffectControl => ({
  key,
  label,
  type: "select",
  defaultValue,
  options: options.map((option) => ({ label: option, value: option })),
  description,
  level
});

export function withRenderer(slug: string, controls: EffectControl[]) {
  return [hiddenRenderer(slug), ...controls];
}

export function withRendererProps(slug: string, props: EffectProps): EffectProps {
  return { renderer: slug, ...props };
}

export function codeFile(filename: string, language: "tsx" | "css", code: string): EffectCodeFile {
  return { filename, language, code };
}

const categoryUseCases: Record<EffectCategory, string[]> = {
  backgrounds: ["Hero backgrounds", "Product surfaces", "Immersive landing sections"],
  text: ["Hero headlines", "Editorial callouts", "Portfolio opening statements"],
  navigation: ["Product navigation", "Menu reveal states", "Top-of-page interaction studies"],
  media: ["Case-study galleries", "Portfolio indexes", "Image-led feature sections"],
  "video-browser": ["Video covers", "Project case studies", "Fullscreen portfolio players"],
  components: ["Reusable UI fragments", "Marketing modules", "Interactive presentation surfaces"],
  layouts: ["Page composition studies", "Section rhythm references"],
  interactions: ["Pointer feedback", "Hover affordances", "Interactive detail states"],
  tools: ["Design production helpers", "Token exploration"]
};

function cleanDescription(value: string) {
  return value.replace(/\nsource:\s*https?:\/\/\S+\s*$/i, "").trim();
}

function visibleControls(definition: ImportedEffectDefinition) {
  return definition.controls.filter((control) => control.level !== "hidden");
}

function controlList(definition: ImportedEffectDefinition) {
  const controls = visibleControls(definition);

  if (controls.length === 0) {
    return "- No visible controls.";
  }

  return controls
    .map((control) => {
      const defaultValue = definition.defaultProps[control.key] ?? control.defaultValue;
      return `- ${control.label} (\`${control.key}\`, default \`${String(defaultValue)}\`): ${control.description ?? "Adjusts the effect."}`;
    })
    .join("\n");
}

function propDocs(definition: ImportedEffectDefinition) {
  return visibleControls(definition).map((control) => ({
    property: control.key,
    type: control.type === "range" || control.type === "number" ? "number" : control.type === "boolean" ? "boolean" : "string",
    defaultValue: definition.defaultProps[control.key] ?? control.defaultValue,
    description: control.description ?? control.label
  }));
}

function useCasesForDefinition(definition: ImportedEffectDefinition) {
  return categoryUseCases[definition.category] ?? ["Reusable implementation"];
}

function licenseNoteForDefinition() {
  return "License not verified. Use as inspiration only. Rebuilt as an original Design Atlas effect; do not copy third-party source code directly.";
}

function sourceForDefinition(definition: ImportedEffectDefinition, sourceName: string) {
  return [
    `Inspired by / Reference: ${sourceName}`,
    `Original reference URL: ${definition.sourceUrl}`,
    "",
    "Design Atlas implementation: rebuilt as a local React effect with registry controls, preview wiring, usage snippet, and copied source attribution. Use the local Design Atlas code files as the integration starting point.",
    "",
    "Do not copy third-party source code directly into another product unless you have verified the upstream license and attribution requirements.",
    "",
    `License note: ${licenseNoteForDefinition()}`
  ].join("\n");
}

function notesForDefinition(definition: ImportedEffectDefinition, description: string) {
  const useCases = useCasesForDefinition(definition).join(", ");
  const controlNames = visibleControls(definition).map((control) => control.label).join(", ");

  return [
    `Use this effect for ${useCases.toLowerCase()}. ${description}`,
    "",
    `Visual characteristics: ${definition.visualStyle}`,
    "",
    `Key parameters: ${controlNames || "No visible controls"}. Keep only the controls that a designer needs in the Customize panel; the hidden renderer prop is an adapter detail required by the shared preview component.`,
    "",
    `Best fit: ${useCases}. It is strongest in a focused preview surface, hero area, gallery, navigation study, or interaction demo where the effect has room to be judged clearly.`,
    "",
    `Reuse notes: start from the Usage with your settings snippet, keep \`renderer="${definition.slug}"\` when using the shared imported-effect adapter, and copy the listed TSX/CSS source files. If extracting the underlying component, preserve the prop mapping from the adapter source.`,
    "",
    "Performance and interaction notes: test the default values on mobile before increasing density, resolution, blur, or continuous animation speed. For long-running animation surfaces, respect reduced-motion needs or expose a lower-intensity mode in the host project.",
    "",
    `Source / license: inspired by ${definition.sourceUrl}. ${licenseNoteForDefinition()}`
  ].join("\n");
}

function promptForDefinition(definition: ImportedEffectDefinition, description: string, sourceName: string) {
  const dependencies = definition.dependencies.length
    ? definition.dependencies.map((dependency) => `\`${dependency}\``).join(", ")
    : "React and local CSS only";

  return [
    `Effect name: ${definition.title}`,
    "",
    `Effect goal: integrate a reusable ${definition.category} effect that matches the Design Atlas preview behavior while staying restrained enough for Apple-style product surfaces.`,
    "",
    `Suitable scenarios: ${useCasesForDefinition(definition).join(", ")}.`,
    "",
    `Visual description: ${definition.visualStyle}`,
    "",
    `Interaction / motion description: ${definition.motionLogic}`,
    "",
    "Adjustable parameters:",
    controlList(definition),
    "",
    `Technical stack: React + TypeScript with ${dependencies}. Use the provided Design Atlas adapter and source files as the starting point.`,
    "",
    `Usage: render \`<NotionInboxPreview />\` with \`renderer="${definition.slug}"\` plus the current settings from the generated Usage section, or extract the underlying component and preserve the adapter's prop transformations.`,
    "",
    "Integration requirements: keep the preview in a stable relative container, preserve cleanup for timers, animation frames, WebGL contexts, and listeners, and avoid exposing developer-only callbacks or renderer internals in designer controls.",
    "",
    `Source / license: Inspired by / reference ${sourceName} (${definition.sourceUrl}). This Design Atlas entry is an original local rebuild for reuse workflows. Do not copy third-party source code directly. License not verified; use as inspiration only unless the upstream license is confirmed.`
  ].join("\n");
}

export function createImportedEffect(definition: ImportedEffectDefinition): DesignEffect {
  const sourceName = sourceNameFromUrl(definition.sourceUrl);
  const description = cleanDescription(definition.description);
  const notes = notesForDefinition(definition, description);

  return {
    id: `imported-${definition.slug}`,
    slug: definition.slug,
    title: definition.title,
    type: definition.title,
    componentName: "NotionInboxPreview",
    category: definition.category,
    status: "implemented",
    description,
    tags: ["source-reference", ...(definition.tags ?? [])],
    useCases: useCasesForDefinition(definition),
    sourceUrl: definition.sourceUrl,
    licenseNote: licenseNoteForDefinition(),
    note: notes,
    visualStyle: definition.visualStyle,
    motionLogic: definition.motionLogic,
    reusable: {
      componentName: "NotionInboxPreview",
      componentPath: "src/content/effects/_shared/NotionInboxPreview.tsx",
      demoPath: `/workbench/${definition.category}/${definition.slug}`,
      codeType: definition.category === "backgrounds" ? "canvas" : "react"
    },
    previewComponent: definition.previewComponent,
    defaultProps: definition.defaultProps,
    controls: definition.controls,
    parameters: definition.controls,
    propsDocs: propDocs(definition),
    dependencies: definition.dependencies,
    codeFiles: definition.codeFiles,
    code: definition.codeFiles[0]?.code,
    prompt: promptForDefinition(definition, description, sourceName),
    notes,
    source: sourceForDefinition(definition, sourceName),
    createdAt: "2026-07-03T03:42:25.462Z",
    updatedAt: "2026-07-06T00:00:00.000Z"
  };
}
