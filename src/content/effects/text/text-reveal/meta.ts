import { TextReveal } from "./TextReveal";
import { code } from "./code";
import { notes } from "./notes";
import { prompt } from "./prompt";
import { source } from "./source";
import type { DesignEffect } from "../../../../types/effect";

export const textRevealEffect: DesignEffect = {
  id: "text-reveal",
  slug: "text-reveal",
  title: "Text Reveal",
  type: "Text Reveal",
  componentName: "TextReveal",
  category: "text",
  description: "A word-by-word reveal with configurable blur, timing, and direction.",
  tags: ["headline", "motion", "copy"],
  useCases: ["Hero headline", "Section intro", "Editorial transition"],
  status: "implemented",
  author: "Design Atlas",
  licenseNote: "Original Design Atlas implementation for reuse in your own React projects.",
  note: notes,
  visualStyle: "Quiet typographic motion with soft blur and precise stagger timing.",
  motionLogic: "Text is split into words, characters, or lines, then each segment resolves from offset and blur.",
  reusable: {
    componentName: "TextReveal",
    componentPath: "src/content/effects/text/text-reveal/TextReveal.tsx",
    demoPath: "/workbench/text/text-reveal",
    codeType: "react"
  },
  previewComponent: TextReveal,
  defaultProps: {
    text: "Design systems should feel inevitable.",
    splitType: "words",
    staggerDelay: 90,
    duration: 760,
    ease: "ease-out",
    blur: 10,
    direction: "up"
  },
  controls: [
    { key: "text", label: "Text", type: "text", defaultValue: "Design systems should feel inevitable.", description: "Sets the headline content used in the reveal.", level: "primary" },
    {
      key: "splitType",
      label: "Split type",
      type: "select",
      defaultValue: "words",
      description: "Chooses how the text is segmented before animation.",
      level: "primary",
      options: [
        { label: "Words", value: "words" },
        { label: "Characters", value: "characters" },
        { label: "Lines", value: "lines" }
      ]
    },
    { key: "duration", label: "Duration", type: "range", defaultValue: 760, min: 240, max: 1600, step: 20, unit: "ms", description: "Animation duration applied to each segment.", level: "primary" },
    { key: "staggerDelay", label: "Stagger delay", type: "range", defaultValue: 90, min: 0, max: 220, step: 10, unit: "ms", description: "Time between each segment reveal.", level: "primary" },
    {
      key: "ease",
      label: "Ease",
      type: "select",
      defaultValue: "ease-out",
      description: "Sets the timing curve used by the reveal.",
      level: "primary",
      options: [
        { label: "Ease out", value: "ease-out" },
        { label: "Ease in out", value: "ease-in-out" },
        { label: "Apple soft", value: "cubic-bezier(0.2, 0, 0, 1)" },
        { label: "Linear", value: "linear" }
      ]
    },
    {
      key: "direction",
      label: "Direction",
      type: "select",
      defaultValue: "up",
      description: "Sets the reveal offset direction.",
      level: "advanced",
      options: [
        { label: "Up", value: "up" },
        { label: "Down", value: "down" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]
    },
    { key: "blur", label: "Blur", type: "range", defaultValue: 10, min: 0, max: 24, step: 1, unit: "px", description: "Starting blur amount before the segment resolves.", level: "advanced" }
  ],
  parameters: [
    { key: "splitType", label: "Split type", type: "select", defaultValue: "words", description: "Chooses how the text is segmented before animation.", level: "primary" },
    { key: "duration", label: "Duration", type: "range", defaultValue: 760, min: 240, max: 1600, step: 20, description: "Animation duration applied to each segment.", level: "primary" },
    { key: "staggerDelay", label: "Stagger delay", type: "range", defaultValue: 90, min: 0, max: 220, step: 10, description: "Time between each segment reveal.", level: "primary" },
    { key: "direction", label: "Direction", type: "select", defaultValue: "up", description: "Sets the reveal offset direction.", level: "advanced" },
    { key: "blur", label: "Blur", type: "range", defaultValue: 10, min: 0, max: 24, step: 1, description: "Starting blur amount before the segment resolves.", level: "advanced" }
  ],
  propsDocs: [
    { property: "text", type: "string", defaultValue: "Design systems should feel inevitable.", description: "Full headline content to animate." },
    { property: "splitType", type: "\"words\" | \"characters\" | \"lines\"", defaultValue: "words", description: "Controls whether the text animates by word, character, or line." },
    { property: "duration", type: "number", defaultValue: 760, description: "Animation duration in milliseconds for each segment." },
    { property: "staggerDelay", type: "number", defaultValue: 90, description: "Time in milliseconds between consecutive segments." },
    { property: "ease", type: "string", defaultValue: "ease-out", description: "CSS timing function used by the reveal animation." },
    { property: "direction", type: "\"up\" | \"down\" | \"left\" | \"right\"", defaultValue: "up", description: "Controls the direction each segment animates from." },
    { property: "blur", type: "number", defaultValue: 10, description: "Initial blur amount before the segment resolves." }
  ],
  dependencies: [],
  codeFiles: [{ filename: "TextReveal.tsx", language: "tsx", code }],
  code,
  prompt,
  notes,
  source,
  createdAt: "2026-07-02"
};
