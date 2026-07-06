import { categories } from "../data/categories";
import type { DesignEffect, EffectCategory, EffectControl } from "../types/effect";

export function effectKey(effect: DesignEffect) {
  return effect.id ?? effect.slug;
}

export function typeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function typesForCategory(effects: DesignEffect[]) {
  return Array.from(new Map(effects.map((effect) => [typeSlug(effect.type), effect.type])).entries()).map(
    ([slug, label]) => ({ slug, label })
  );
}

export function filterEffectsByType(effects: DesignEffect[], type: string | null) {
  if (!type || type === "all") return effects;
  return effects.filter((effect) => typeSlug(effect.type) === type);
}

export function categoryLabel(category: EffectCategory) {
  return categories.find((item) => item.slug === category)?.label ?? category;
}

export function parametersForEffect(effect: DesignEffect): EffectControl[] {
  return effect.parameters ?? effect.controls ?? [];
}

export function defaultPropsForEffect(effect: DesignEffect) {
  return effect.defaultProps ?? {};
}

export function notesForEffect(effect: DesignEffect) {
  return effect.note ?? effect.notes ?? "";
}

export function createEffectPrompt(effect: DesignEffect) {
  const parameters = parametersForEffect(effect);
  const parameterText = parameters.length
    ? parameters.map((parameter) => `- ${parameter.key}: ${parameter.description ?? parameter.label}`).join("\n")
    : "- No adjustable parameters recorded yet.";

  return [
    `Effect name: ${effect.title}`,
    `Category: ${categoryLabel(effect.category)}`,
    `Type: ${effect.type}`,
    `Status: ${effect.status}`,
    "",
    "Visual style:",
    effect.visualStyle ?? effect.description,
    "",
    "Use cases:",
    effect.useCases.length ? effect.useCases.map((useCase) => `- ${useCase}`).join("\n") : "- Not recorded yet.",
    "",
    "Motion logic:",
    effect.motionLogic ?? "No motion logic recorded yet.",
    "",
    "Adjustable parameters:",
    parameterText,
    "",
    "Source link:",
    effect.sourceUrl ?? effect.githubUrl ?? "Not provided",
    "",
    "My note:",
    notesForEffect(effect) || "No note yet.",
    "",
    "Prompt:",
    effect.prompt,
    "",
    "Important constraints:",
    effect.caveats?.length ? effect.caveats.map((caveat) => `- ${caveat}`).join("\n") : "- Keep the result restrained and reusable."
  ].join("\n");
}

export function createReferenceInfo(effect: DesignEffect) {
  return [
    `# ${effect.title}`,
    "",
    `- id: ${effectKey(effect)}`,
    `- category: ${effect.category}`,
    `- type: ${effect.type}`,
    `- status: ${effect.status}`,
    `- tags: ${effect.tags.join(", ") || "None"}`,
    `- use cases: ${effect.useCases.join(", ") || "None"}`,
    `- source: ${effect.sourceUrl ?? effect.githubUrl ?? "Not provided"}`,
    `- screenshot: ${effect.screenshot ?? "Not provided"}`,
    "",
    "Description:",
    effect.description,
    "",
    "Note:",
    notesForEffect(effect) || "No note yet.",
    "",
    "Prompt:",
    effect.prompt
  ].join("\n");
}
