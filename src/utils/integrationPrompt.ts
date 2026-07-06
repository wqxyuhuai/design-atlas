import type { DesignEffect, EffectCodeFile, EffectProps } from "../types/effect";
import { normalizedCodeFiles, normalizedDependencies, propDocsForEffect } from "./effectMeta";
import { createEffectPrompt, defaultPropsForEffect, notesForEffect, parametersForEffect } from "./effects";
import { usageSnippetForEffect } from "./usageSnippet";

function currentSettingsForEffect(effect: DesignEffect, values: EffectProps) {
  return parametersForEffect(effect).reduce<EffectProps>((settings, control) => {
    settings[control.key] = values[control.key] ?? defaultPropsForEffect(effect)[control.key] ?? control.defaultValue;
    return settings;
  }, {});
}

function markdownCodeBlock(language: string, code: string) {
  return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}

function propsTable(effect: DesignEffect) {
  const docs = propDocsForEffect(effect);

  if (docs.length === 0) {
    return "No configurable props.";
  }

  const rows = docs.map((doc) => {
    const defaultValue = typeof doc.defaultValue === "string" ? doc.defaultValue : JSON.stringify(doc.defaultValue);
    return `| \`${doc.property}\` | \`${doc.type}\` | \`${defaultValue}\` | ${doc.description} |`;
  });

  return ["| Prop | Type | Default | Description |", "| --- | --- | --- | --- |", ...rows].join("\n");
}

function dependenciesSection(effect: DesignEffect) {
  const dependencies = normalizedDependencies(effect);

  if (dependencies.length === 0) {
    return "No external dependencies.";
  }

  return dependencies
    .map((dependency) => {
      const packageName = dependency.packageName ?? dependency.name;
      const url = dependency.url ? ` (${dependency.url})` : "";
      return `- ${dependency.name}: \`${packageName}\`${url}`;
    })
    .join("\n");
}

function codeFilesForEffect(effect: DesignEffect): EffectCodeFile[] {
  const files = normalizedCodeFiles(effect);

  if (files.length > 0) {
    return files;
  }

  return effect.code
    ? [
        {
          filename: `${effect.componentName ?? effect.slug}.tsx`,
          language: "tsx",
          code: effect.code
        }
      ]
    : [];
}

function componentSourceSection(files: EffectCodeFile[]) {
  const componentFiles = files.filter((file) => file.language !== "css");

  if (componentFiles.length === 0) {
    return "No component source is available.";
  }

  return componentFiles
    .map((file) => `### ${file.filename}\n\n${markdownCodeBlock(file.language, file.code)}`)
    .join("\n\n");
}

function stylesSection(files: EffectCodeFile[]) {
  const cssFiles = files.filter((file) => file.language === "css");

  if (cssFiles.length === 0) {
    return "";
  }

  return `## Styles\n\n${cssFiles
    .map((file) => `### ${file.filename}\n\n${markdownCodeBlock("css", file.code)}`)
    .join("\n\n")}`;
}

function sourceLicenseSection(effect: DesignEffect) {
  const lines = [
    `- Source URL: ${effect.sourceUrl ?? "Not provided"}`,
    `- GitHub URL: ${effect.githubUrl ?? "Not provided"}`,
    `- Author: ${effect.author ?? "Design Atlas"}`,
    `- License note: ${effect.licenseNote ?? "Original Design Atlas effect for reuse in your own projects."}`
  ];

  if (effect.sourceUrl || effect.githubUrl) {
    lines.push(
      "- Reference warning: this effect may be inspired by a third-party reference. Do not copy third-party source code verbatim; use the Design Atlas component source and adapt responsibly."
    );
  } else {
    lines.push("- Origin: Original Design Atlas effect.");
  }

  return lines.join("\n");
}

export function generateIntegrationPrompt(effect: DesignEffect, currentValues: EffectProps) {
  const settings = currentSettingsForEffect(effect, currentValues);
  const files = codeFilesForEffect(effect);
  const styles = stylesSection(files);

  return [
    effect.status === "implemented" && effect.componentName
      ? `## Integrate the <${effect.componentName} /> effect from Design Atlas`
      : `## Recreate the ${effect.title} effect from Design Atlas`,
    "",
    "## Basic Information",
    "",
    `- Effect name: ${effect.title}`,
    `- Category: ${effect.category}`,
    `- Type: ${effect.type}`,
    `- Status: ${effect.status}`,
    `- Description: ${effect.description}`,
    `- Tags: ${effect.tags.length ? effect.tags.join(", ") : "None"}`,
    `- Use cases: ${effect.useCases.length ? effect.useCases.join(", ") : "None"}`,
    "",
    "## Current Settings",
    "",
    markdownCodeBlock("json", JSON.stringify(settings, null, 2)),
    "",
    "## Usage Example",
    "",
    markdownCodeBlock("tsx", usageSnippetForEffect(effect, settings)),
    "",
    "## Props",
    "",
    propsTable(effect),
    "",
    "## Component Source",
    "",
    componentSourceSection(files),
    "",
    styles,
    styles ? "" : null,
    "## Dependencies",
    "",
    dependenciesSection(effect),
    "",
    "## Integration Instructions",
    "",
    "1. Install dependencies if needed.",
    "2. Copy the component source into the target project.",
    "3. Copy CSS files if included.",
    "4. Import and render the component using the usage example.",
    "5. Adjust props as needed.",
    "",
    "## Source / License",
    "",
    sourceLicenseSection(effect),
    "",
    "## Additional Instructions",
    "",
    createEffectPrompt({ ...effect, note: notesForEffect(effect) }) || "No additional instructions."
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
