import { GradualBlur } from "./GradualBlur";
import { code } from "./code";
import { notes } from "./notes";
import { prompt } from "./prompt";
import { source } from "./source";
import type { DesignEffect } from "../../../../types/effect";

export const gradualBlurEffect: DesignEffect = {
  id: "gradual-blur",
  slug: "gradual-blur",
  title: "Gradual Blur",
  type: "Gradual Blur",
  componentName: "GradualBlur",
  category: "navigation",
  description: "A layered edge blur overlay for sticky navigation and scroll containers.",
  tags: ["navigation", "blur", "edge", "scroll"],
  useCases: ["Sticky header edge", "Scroll container fade", "Top navigation treatment", "Footer overlay"],
  status: "implemented",
  sourceUrl: "https://reactbits.dev/animations/gradual-blur?position=top&strength=5&divCount=4",
  author: "ReactBits / Design Atlas adaptation",
  licenseNote: "License not verified. Use the ReactBits Gradual Blur page as inspiration only unless the upstream license is confirmed; keep the original source link attached when reusing.",
  note: notes,
  visualStyle: "A glassy edge fade that blurs content progressively instead of covering it with an opaque gradient.",
  motionLogic: "Stacked masked backdrop-filter layers increase blur across the selected edge; optional hover amplification raises strength interactively.",
  reusable: {
    componentName: "GradualBlur",
    componentPath: "src/content/effects/navigation/gradual-blur/GradualBlur.tsx",
    demoPath: "/workbench/navigation/gradual-blur",
    codeType: "react"
  },
  previewComponent: GradualBlur,
  defaultProps: {
    position: "top",
    strength: 5,
    heightRem: 6,
    widthRem: 8,
    divCount: 4,
    exponential: false,
    opacity: 1,
    curve: "linear",
    zIndex: 20,
    animated: false,
    hoverIntensity: 1
  },
  controls: [
    {
      key: "position",
      label: "Position",
      type: "select",
      defaultValue: "top",
      description: "Edge where the blur attaches.",
      level: "primary",
      options: [
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]
    },
    { key: "strength", label: "Strength", type: "range", defaultValue: 5, min: 1, max: 8, step: 0.5, description: "Base blur strength multiplier applied to every layer.", level: "primary" },
    { key: "divCount", label: "Div count", type: "range", defaultValue: 4, min: 1, max: 10, step: 1, description: "Number of stacked blur layers. Higher values create a smoother transition.", level: "primary" },
    {
      key: "curve",
      label: "Curve",
      type: "select",
      defaultValue: "linear",
      description: "Distribution curve applied to the blur progression.",
      level: "primary",
      options: [
        { label: "Linear", value: "linear" },
        { label: "Bezier", value: "bezier" },
        { label: "Ease in", value: "ease-in" },
        { label: "Ease out", value: "ease-out" },
        { label: "Ease in out", value: "ease-in-out" }
      ]
    },
    { key: "heightRem", label: "Height", type: "range", defaultValue: 6, min: 2, max: 12, step: 0.5, unit: "rem", description: "Overlay height for top and bottom positions.", level: "primary" },
    { key: "opacity", label: "Opacity", type: "range", defaultValue: 1, min: 0.1, max: 1, step: 0.05, description: "Opacity applied to the blur overlay.", level: "primary" },
    { key: "exponential", label: "Exponential", type: "boolean", defaultValue: false, description: "Uses an exponential blur ramp for a stronger far edge.", level: "advanced" },
    { key: "widthRem", label: "Width", type: "range", defaultValue: 8, min: 3, max: 16, step: 0.5, unit: "rem", description: "Overlay width for left and right positions.", level: "advanced" },
    { key: "hoverIntensity", label: "Hover intensity", type: "range", defaultValue: 1, min: 1, max: 2, step: 0.1, description: "Multiplies strength while the blur overlay is hovered.", level: "advanced" },
    { key: "zIndex", label: "Z index", type: "range", defaultValue: 20, min: 1, max: 60, step: 1, description: "Stacking level for the blur overlay.", level: "advanced" },
    { key: "animated", label: "Animated", type: "boolean", defaultValue: false, description: "Adds an opacity transition to the overlay.", level: "advanced" }
  ],
  parameters: [
    {
      key: "position",
      label: "Position",
      type: "select",
      defaultValue: "top",
      description: "Edge where the blur attaches.",
      level: "primary",
      options: [
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]
    },
    { key: "strength", label: "Strength", type: "range", defaultValue: 5, min: 1, max: 8, step: 0.5, description: "Base blur strength multiplier applied to every layer.", level: "primary" },
    { key: "divCount", label: "Div count", type: "range", defaultValue: 4, min: 1, max: 10, step: 1, description: "Number of stacked blur layers. Higher values create a smoother transition.", level: "primary" },
    {
      key: "curve",
      label: "Curve",
      type: "select",
      defaultValue: "linear",
      description: "Distribution curve applied to the blur progression.",
      level: "primary",
      options: [
        { label: "Linear", value: "linear" },
        { label: "Bezier", value: "bezier" },
        { label: "Ease in", value: "ease-in" },
        { label: "Ease out", value: "ease-out" },
        { label: "Ease in out", value: "ease-in-out" }
      ]
    },
    { key: "heightRem", label: "Height", type: "range", defaultValue: 6, min: 2, max: 12, step: 0.5, description: "Overlay height for top and bottom positions.", level: "primary" },
    { key: "opacity", label: "Opacity", type: "range", defaultValue: 1, min: 0.1, max: 1, step: 0.05, description: "Opacity applied to the blur overlay.", level: "primary" },
    { key: "exponential", label: "Exponential", type: "boolean", defaultValue: false, description: "Uses an exponential blur ramp for a stronger far edge.", level: "advanced" }
  ],
  propsDocs: [
    { property: "position", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", defaultValue: "top", description: "Edge where the overlay is attached." },
    { property: "strength", type: "number", defaultValue: 5, description: "Base blur strength multiplier." },
    { property: "divCount", type: "number", defaultValue: 4, description: "Number of layered blur divs." },
    { property: "heightRem", type: "number", defaultValue: 6, description: "Height in rem for top and bottom placement." },
    { property: "widthRem", type: "number", defaultValue: 8, description: "Width in rem for left and right placement." },
    { property: "curve", type: "\"linear\" | \"bezier\" | \"ease-in\" | \"ease-out\" | \"ease-in-out\"", defaultValue: "linear", description: "Progression curve for the blur layers." },
    { property: "exponential", type: "boolean", defaultValue: false, description: "Uses exponential blur progression." },
    { property: "opacity", type: "number", defaultValue: 1, description: "Overlay opacity." }
  ],
  dependencies: [],
  codeFiles: [{ filename: "GradualBlur.tsx", language: "tsx", code }],
  code,
  prompt,
  notes,
  source,
  createdAt: "2026-07-03"
};
