import { Galaxy } from "./Galaxy";
import { code } from "./code";
import { notes } from "./notes";
import { prompt } from "./prompt";
import { source } from "./source";
import type { DesignEffect } from "../../../../types/effect";

export const galaxyEffect: DesignEffect = {
  id: "galaxy",
  slug: "galaxy",
  title: "Galaxy",
  type: "Galaxy",
  componentName: "Galaxy",
  category: "backgrounds",
  description: "An interactive procedural star field with configurable density, glow, twinkle, rotation, and mouse repulsion.",
  tags: ["background", "webgl", "stars", "interactive"],
  useCases: ["Hero background", "Immersive launch page", "Dark product section"],
  status: "implemented",
  sourceUrl: "https://reactbits.dev/backgrounds/galaxy",
  author: "ReactBits / Design Atlas adaptation",
  licenseNote: "License not verified. Use the ReactBits Galaxy page as inspiration only unless the upstream license is confirmed; keep the original source link attached when reusing.",
  note: notes,
  visualStyle: "Dark procedural star field with layered depth, soft star flares, optional color shift, and a pointer-reactive gravity feel.",
  motionLogic: "WebGL shader layers move through depth, stars twinkle over time, the field rotates slowly, and cursor movement can repel or offset the star coordinates.",
  reusable: {
    componentName: "Galaxy",
    componentPath: "src/content/effects/backgrounds/galaxy/Galaxy.tsx",
    demoPath: "/workbench/backgrounds/galaxy",
    codeType: "react"
  },
  previewComponent: Galaxy,
  defaultProps: {
    density: 1,
    glowIntensity: 0.3,
    saturation: 0,
    hueShift: 140,
    twinkleIntensity: 0.3,
    rotationSpeed: 0.1,
    repulsionStrength: 2,
    autoCenterRepulsion: 0,
    starSpeed: 0.5,
    speed: 1,
    mouseRepulsion: true,
    mouseInteraction: true,
    transparent: true,
    disableAnimation: false,
    focalX: 0.5,
    focalY: 0.5,
    rotation: 0
  },
  controls: [
    { key: "mouseInteraction", label: "Mouse interaction", type: "boolean", defaultValue: true, description: "Enables pointer tracking inside the star field.", level: "primary" },
    { key: "mouseRepulsion", label: "Mouse repulsion", type: "boolean", defaultValue: true, description: "Repels stars away from the cursor instead of simply offsetting the field.", level: "primary" },
    { key: "density", label: "Density", type: "range", defaultValue: 1, min: 0.1, max: 3, step: 0.1, description: "Controls how many stars appear in the layered field.", level: "primary" },
    { key: "glowIntensity", label: "Glow intensity", type: "range", defaultValue: 0.3, min: 0, max: 1, step: 0.05, description: "Controls flare brightness around stars.", level: "primary" },
    { key: "saturation", label: "Saturation", type: "range", defaultValue: 0, min: 0, max: 1, step: 0.05, description: "Controls star color intensity.", level: "primary" },
    { key: "hueShift", label: "Hue shift", type: "range", defaultValue: 140, min: 0, max: 360, step: 5, unit: "deg", description: "Shifts star colors around the hue wheel.", level: "primary" },
    { key: "twinkleIntensity", label: "Twinkle", type: "range", defaultValue: 0.3, min: 0, max: 1, step: 0.05, description: "Controls the visible amount of star shimmer.", level: "primary" },
    { key: "rotationSpeed", label: "Rotation speed", type: "range", defaultValue: 0.1, min: 0, max: 0.5, step: 0.01, description: "Controls automatic field rotation speed.", level: "primary" },
    { key: "repulsionStrength", label: "Repulsion", type: "range", defaultValue: 2, min: 0, max: 10, step: 0.5, description: "Controls cursor repulsion force.", level: "advanced" },
    { key: "autoCenterRepulsion", label: "Center repulsion", type: "range", defaultValue: 0, min: 0, max: 20, step: 1, description: "Creates a center-outward distortion that overrides mouse repulsion when above zero.", level: "advanced" },
    { key: "starSpeed", label: "Star speed", type: "range", defaultValue: 0.5, min: 0.1, max: 2, step: 0.1, description: "Controls star depth travel speed.", level: "advanced" },
    { key: "speed", label: "Animation speed", type: "range", defaultValue: 1, min: 0.1, max: 3, step: 0.1, description: "Global speed multiplier for time-based motion.", level: "advanced" },
    { key: "rotation", label: "Rotation", type: "range", defaultValue: 0, min: -180, max: 180, step: 5, unit: "deg", description: "Rotates the field before automatic rotation is applied.", level: "advanced" },
    { key: "focalX", label: "Focal X", type: "range", defaultValue: 0.5, min: 0, max: 1, step: 0.05, description: "Sets the horizontal focal point.", level: "advanced" },
    { key: "focalY", label: "Focal Y", type: "range", defaultValue: 0.5, min: 0, max: 1, step: 0.05, description: "Sets the vertical focal point.", level: "advanced" },
    { key: "transparent", label: "Transparent", type: "boolean", defaultValue: true, description: "Uses transparent canvas output instead of a solid black clear color.", level: "advanced" },
    { key: "disableAnimation", label: "Freeze", type: "boolean", defaultValue: false, description: "Stops time-based shader updates while leaving the current frame visible.", level: "advanced" }
  ],
  parameters: [
    { key: "mouseInteraction", label: "Mouse interaction", type: "boolean", defaultValue: true, description: "Enables pointer tracking inside the star field.", level: "primary" },
    { key: "mouseRepulsion", label: "Mouse repulsion", type: "boolean", defaultValue: true, description: "Repels stars away from the cursor instead of simply offsetting the field.", level: "primary" },
    { key: "density", label: "Density", type: "range", defaultValue: 1, min: 0.1, max: 3, step: 0.1, description: "Controls how many stars appear in the layered field.", level: "primary" },
    { key: "glowIntensity", label: "Glow intensity", type: "range", defaultValue: 0.3, min: 0, max: 1, step: 0.05, description: "Controls flare brightness around stars.", level: "primary" },
    { key: "saturation", label: "Saturation", type: "range", defaultValue: 0, min: 0, max: 1, step: 0.05, description: "Controls star color intensity.", level: "primary" },
    { key: "hueShift", label: "Hue shift", type: "range", defaultValue: 140, min: 0, max: 360, step: 5, description: "Shifts star colors around the hue wheel.", level: "primary" },
    { key: "twinkleIntensity", label: "Twinkle", type: "range", defaultValue: 0.3, min: 0, max: 1, step: 0.05, description: "Controls the visible amount of star shimmer.", level: "primary" },
    { key: "rotationSpeed", label: "Rotation speed", type: "range", defaultValue: 0.1, min: 0, max: 0.5, step: 0.01, description: "Controls automatic field rotation speed.", level: "primary" },
    { key: "repulsionStrength", label: "Repulsion", type: "range", defaultValue: 2, min: 0, max: 10, step: 0.5, description: "Controls cursor repulsion force.", level: "advanced" },
    { key: "autoCenterRepulsion", label: "Center repulsion", type: "range", defaultValue: 0, min: 0, max: 20, step: 1, description: "Creates a center-outward distortion that overrides mouse repulsion when above zero.", level: "advanced" },
    { key: "starSpeed", label: "Star speed", type: "range", defaultValue: 0.5, min: 0.1, max: 2, step: 0.1, description: "Controls star depth travel speed.", level: "advanced" },
    { key: "speed", label: "Animation speed", type: "range", defaultValue: 1, min: 0.1, max: 3, step: 0.1, description: "Global speed multiplier for time-based motion.", level: "advanced" }
  ],
  propsDocs: [
    { property: "density", type: "number", defaultValue: 1, description: "Controls star field density." },
    { property: "glowIntensity", type: "number", defaultValue: 0.3, description: "Controls star flare brightness." },
    { property: "saturation", type: "number", defaultValue: 0, description: "Controls color saturation." },
    { property: "hueShift", type: "number", defaultValue: 140, description: "Hue rotation in degrees." },
    { property: "mouseInteraction", type: "boolean", defaultValue: true, description: "Enables pointer input." },
    { property: "mouseRepulsion", type: "boolean", defaultValue: true, description: "Repels stars from the cursor." },
    { property: "repulsionStrength", type: "number", defaultValue: 2, description: "Repulsion force multiplier." },
    { property: "twinkleIntensity", type: "number", defaultValue: 0.3, description: "Twinkle intensity from 0 to 1." },
    { property: "rotationSpeed", type: "number", defaultValue: 0.1, description: "Automatic rotation speed." },
    { property: "starSpeed", type: "number", defaultValue: 0.5, description: "Star travel speed." },
    { property: "speed", type: "number", defaultValue: 1, description: "Global animation speed multiplier." }
  ],
  dependencies: [{ name: "ogl", packageName: "ogl", url: "https://github.com/oframe/ogl" }],
  codeFiles: [{ filename: "Galaxy.tsx", language: "tsx", code }],
  code,
  prompt,
  notes,
  source,
  createdAt: "2026-07-03"
};
