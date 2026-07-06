import { NotionInboxPreview } from "../../content/effects/notion-inbox/NotionInboxPreview";
import notionInboxPreviewSource from "../../content/effects/notion-inbox/NotionInboxPreview.tsx?raw";
import glareHoverStyles from "../../content/effects/notion-inbox/react-bits/Animations/GlareHover/GlareHover.css?raw";
import glareHoverSource from "../../content/effects/notion-inbox/react-bits/Animations/GlareHover/GlareHover.tsx?raw";
import imageTrailStyles from "../../content/effects/notion-inbox/react-bits/Animations/ImageTrail/ImageTrail.css?raw";
import imageTrailSource from "../../content/effects/notion-inbox/react-bits/Animations/ImageTrail/ImageTrail.tsx?raw";
import magnetLinesStyles from "../../content/effects/notion-inbox/react-bits/Animations/MagnetLines/MagnetLines.css?raw";
import magnetLinesSource from "../../content/effects/notion-inbox/react-bits/Animations/MagnetLines/MagnetLines.tsx?raw";
import shapeBlurSource from "../../content/effects/notion-inbox/react-bits/Animations/ShapeBlur/ShapeBlur.tsx?raw";
import splashCursorSource from "../../content/effects/notion-inbox/react-bits/Animations/SplashCursor/SplashCursor.tsx?raw";
import strandsStyles from "../../content/effects/notion-inbox/react-bits/Animations/Strands/Strands.css?raw";
import strandsSource from "../../content/effects/notion-inbox/react-bits/Animations/Strands/Strands.tsx?raw";
import beamsStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/Beams/Beams.css?raw";
import beamsSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/Beams/Beams.tsx?raw";
import ditherStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/Dither/Dither.css?raw";
import ditherSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/Dither/Dither.tsx?raw";
import dotFieldStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/DotField/DotField.css?raw";
import dotFieldSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/DotField/DotField.tsx?raw";
import gradientBlindsStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/GradientBlinds/GradientBlinds.css?raw";
import gradientBlindsSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/GradientBlinds/GradientBlinds.tsx?raw";
import letterGlitchSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/LetterGlitch/LetterGlitch.tsx?raw";
import lightRaysStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/LightRays/LightRays.css?raw";
import lightRaysSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/LightRays/LightRays.tsx?raw";
import pixelBlastStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/PixelBlast/PixelBlast.css?raw";
import pixelBlastSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/PixelBlast/PixelBlast.tsx?raw";
import prismStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/Prism/Prism.css?raw";
import prismSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/Prism/Prism.tsx?raw";
import prismaticBurstStyles from "../../content/effects/notion-inbox/react-bits/Backgrounds/PrismaticBurst/PrismaticBurst.css?raw";
import prismaticBurstSource from "../../content/effects/notion-inbox/react-bits/Backgrounds/PrismaticBurst/PrismaticBurst.tsx?raw";
import cardSwapStyles from "../../content/effects/notion-inbox/react-bits/Components/CardSwap/CardSwap.css?raw";
import cardSwapSource from "../../content/effects/notion-inbox/react-bits/Components/CardSwap/CardSwap.tsx?raw";
import flowingMenuStyles from "../../content/effects/notion-inbox/react-bits/Components/FlowingMenu/FlowingMenu.css?raw";
import flowingMenuSource from "../../content/effects/notion-inbox/react-bits/Components/FlowingMenu/FlowingMenu.tsx?raw";
import fluidGlassSource from "../../content/effects/notion-inbox/react-bits/Components/FluidGlass/FluidGlass.tsx?raw";
import glassSurfaceStyles from "../../content/effects/notion-inbox/react-bits/Components/GlassSurface/GlassSurface.css?raw";
import glassSurfaceSource from "../../content/effects/notion-inbox/react-bits/Components/GlassSurface/GlassSurface.tsx?raw";
import staggeredMenuStyles from "../../content/effects/notion-inbox/react-bits/Components/StaggeredMenu/StaggeredMenu.css?raw";
import staggeredMenuSource from "../../content/effects/notion-inbox/react-bits/Components/StaggeredMenu/StaggeredMenu.tsx?raw";
import decryptedTextSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/DecryptedText/DecryptedText.tsx?raw";
import rotatingTextStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/RotatingText/RotatingText.css?raw";
import rotatingTextSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/RotatingText/RotatingText.tsx?raw";
import shinyTextStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/ShinyText/ShinyText.css?raw";
import shinyTextSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/ShinyText/ShinyText.tsx?raw";
import shuffleStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/Shuffle/Shuffle.css?raw";
import shuffleSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/Shuffle/Shuffle.tsx?raw";
import textPressureSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/TextPressure/TextPressure.tsx?raw";
import textTypeStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/TextType/TextType.css?raw";
import textTypeSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/TextType/TextType.tsx?raw";
import trueFocusStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/TrueFocus/TrueFocus.css?raw";
import trueFocusSource from "../../content/effects/notion-inbox/react-bits/TextAnimations/TrueFocus/TrueFocus.tsx?raw";
import variableProximityStyles from "../../content/effects/notion-inbox/react-bits/TextAnimations/VariableProximity/VariableProximity.css?raw";
import variableProximitySource from "../../content/effects/notion-inbox/react-bits/TextAnimations/VariableProximity/VariableProximity.tsx?raw";
import { sourceNameFromUrl } from "../../lib/notion/effectInboxSchema";
import type { DesignEffect, EffectCategory, EffectCodeFile, EffectControl, EffectProps } from "../../types/effect";

type NotionInboxDefinition = {
  slug: string;
  title: string;
  category: EffectCategory;
  sourceUrl: string;
  description: string;
  visualStyle: string;
  motionLogic: string;
  tags?: string[];
  defaultProps: EffectProps;
  controls: EffectControl[];
  dependencies: string[];
};

const hiddenRenderer = (slug: string): EffectControl => ({
  key: "renderer",
  label: "Renderer",
  type: "text",
  defaultValue: slug,
  description: "Internal renderer key for the Notion inbox adapter.",
  level: "hidden"
});

const text = (key: string, label: string, defaultValue: string, description: string, level: "primary" | "advanced" = "advanced"): EffectControl => ({
  key,
  label,
  type: "text",
  defaultValue,
  description,
  level
});

const color = (key: string, label: string, defaultValue: string, description: string, level: "primary" | "advanced" = "primary"): EffectControl => ({
  key,
  label,
  type: "color",
  defaultValue,
  description,
  level
});

const bool = (key: string, label: string, defaultValue: boolean, description: string, level: "primary" | "advanced" = "advanced"): EffectControl => ({
  key,
  label,
  type: "boolean",
  defaultValue,
  description,
  level
});

const range = (
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

const select = (
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

function withRenderer(slug: string, controls: EffectControl[]) {
  return [hiddenRenderer(slug), ...controls];
}

function withRendererProps(slug: string, props: EffectProps): EffectProps {
  return { renderer: slug, ...props };
}

function codeFile(filename: string, language: "tsx" | "css", code: string): EffectCodeFile {
  return { filename, language, code };
}

const adapterCodeFile = codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource);

const sourceFilesBySlug: Record<string, EffectCodeFile[]> = {
  beams: [codeFile("Beams.tsx", "tsx", beamsSource), codeFile("Beams.css", "css", beamsStyles)],
  dither: [codeFile("Dither.tsx", "tsx", ditherSource), codeFile("Dither.css", "css", ditherStyles)],
  "dot-field": [codeFile("DotField.tsx", "tsx", dotFieldSource), codeFile("DotField.css", "css", dotFieldStyles)],
  "gradient-blinds": [
    codeFile("GradientBlinds.tsx", "tsx", gradientBlindsSource),
    codeFile("GradientBlinds.css", "css", gradientBlindsStyles)
  ],
  "letter-glitch": [codeFile("LetterGlitch.tsx", "tsx", letterGlitchSource)],
  "light-rays": [codeFile("LightRays.tsx", "tsx", lightRaysSource), codeFile("LightRays.css", "css", lightRaysStyles)],
  "pixel-blast": [codeFile("PixelBlast.tsx", "tsx", pixelBlastSource), codeFile("PixelBlast.css", "css", pixelBlastStyles)],
  prism: [codeFile("Prism.tsx", "tsx", prismSource), codeFile("Prism.css", "css", prismStyles)],
  "prismatic-burst": [
    codeFile("PrismaticBurst.tsx", "tsx", prismaticBurstSource),
    codeFile("PrismaticBurst.css", "css", prismaticBurstStyles)
  ],
  "shiny-text": [codeFile("ShinyText.tsx", "tsx", shinyTextSource), codeFile("ShinyText.css", "css", shinyTextStyles)],
  shuffle: [codeFile("Shuffle.tsx", "tsx", shuffleSource), codeFile("Shuffle.css", "css", shuffleStyles)],
  "text-pressure": [codeFile("TextPressure.tsx", "tsx", textPressureSource)],
  "text-type": [codeFile("TextType.tsx", "tsx", textTypeSource), codeFile("TextType.css", "css", textTypeStyles)],
  "flowing-menu": [codeFile("FlowingMenu.tsx", "tsx", flowingMenuSource), codeFile("FlowingMenu.css", "css", flowingMenuStyles)],
  "card-swap": [codeFile("CardSwap.tsx", "tsx", cardSwapSource), codeFile("CardSwap.css", "css", cardSwapStyles)],
  "staggered-menu": [
    codeFile("StaggeredMenu.tsx", "tsx", staggeredMenuSource),
    codeFile("StaggeredMenu.css", "css", staggeredMenuStyles)
  ],
  "glass-surface": [
    codeFile("GlassSurface.tsx", "tsx", glassSurfaceSource),
    codeFile("GlassSurface.css", "css", glassSurfaceStyles)
  ],
  "fluid-glass": [codeFile("FluidGlass.tsx", "tsx", fluidGlassSource)],
  "splash-cursor": [codeFile("SplashCursor.tsx", "tsx", splashCursorSource)],
  "image-trail": [codeFile("ImageTrail.tsx", "tsx", imageTrailSource), codeFile("ImageTrail.css", "css", imageTrailStyles)],
  "shape-blur": [codeFile("ShapeBlur.tsx", "tsx", shapeBlurSource)],
  strands: [codeFile("Strands.tsx", "tsx", strandsSource), codeFile("Strands.css", "css", strandsStyles)],
  "magnet-lines": [codeFile("MagnetLines.tsx", "tsx", magnetLinesSource), codeFile("MagnetLines.css", "css", magnetLinesStyles)],
  "glare-hover": [codeFile("GlareHover.tsx", "tsx", glareHoverSource), codeFile("GlareHover.css", "css", glareHoverStyles)],
  "rotating-text": [codeFile("RotatingText.tsx", "tsx", rotatingTextSource), codeFile("RotatingText.css", "css", rotatingTextStyles)],
  "variable-proximity": [
    codeFile("VariableProximity.tsx", "tsx", variableProximitySource),
    codeFile("VariableProximity.css", "css", variableProximityStyles)
  ],
  "true-focus": [codeFile("TrueFocus.tsx", "tsx", trueFocusSource), codeFile("TrueFocus.css", "css", trueFocusStyles)],
  "decrypted-text": [codeFile("DecryptedText.tsx", "tsx", decryptedTextSource)]
};

const categoryUseCases: Record<EffectCategory, string[]> = {
  backgrounds: ["Hero backgrounds", "Product surfaces", "Immersive landing sections"],
  text: ["Hero headlines", "Editorial callouts", "Portfolio opening statements"],
  navigation: ["Product navigation", "Menu reveal states", "Top-of-page interaction studies"],
  media: ["Case-study galleries", "Portfolio indexes", "Image-led feature sections"],
  components: ["Reusable UI fragments", "Marketing modules", "Interactive presentation surfaces"],
  layouts: ["Page composition studies", "Section rhythm references"],
  interactions: ["Pointer feedback", "Hover affordances", "Interactive detail states"],
  tools: ["Design production helpers", "Token exploration"]
};

function cleanDescription(value: string) {
  return value.replace(/\nsource:\s*https?:\/\/\S+\s*$/i, "").trim();
}

function visibleControls(definition: NotionInboxDefinition) {
  return definition.controls.filter((control) => control.level !== "hidden");
}

function controlList(definition: NotionInboxDefinition) {
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

function codeFilesForDefinition(definition: NotionInboxDefinition): EffectCodeFile[] {
  return [adapterCodeFile, ...(sourceFilesBySlug[definition.slug] ?? [])];
}

function getUseCasesForDefinition(definition: NotionInboxDefinition) {
  return categoryUseCases[definition.category] ?? ["Reusable implementation"];
}

function licenseNoteForDefinition() {
  return "License not verified. Use as inspiration only. Rebuilt as an original Design Atlas effect; do not copy third-party source code directly.";
}

function sourceForDefinition(definition: NotionInboxDefinition, sourceName: string) {
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

function notesForDefinition(definition: NotionInboxDefinition, description: string) {
  const useCases = getUseCasesForDefinition(definition).join(", ");
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
    `Reuse notes: start from the Usage with your settings snippet, keep \`renderer="${definition.slug}"\` when using the shared NotionInboxPreview adapter, and copy the listed TSX/CSS source files. If extracting the underlying component, preserve the prop mapping from the adapter source.`,
    "",
    "Performance and interaction notes: test the default values on mobile before increasing density, resolution, blur, or continuous animation speed. For long-running animation surfaces, respect reduced-motion needs or expose a lower-intensity mode in the host project.",
    "",
    `Source / license: inspired by ${definition.sourceUrl}. ${licenseNoteForDefinition()}`
  ].join("\n");
}

function promptForDefinition(definition: NotionInboxDefinition, description: string, sourceName: string) {
  const dependencies = definition.dependencies.length ? definition.dependencies.map((dependency) => `\`${dependency}\``).join(", ") : "React and local CSS only";

  return [
    `Effect name: ${definition.title}`,
    "",
    `Effect goal: integrate a reusable ${definition.category} effect that matches the Design Atlas preview behavior while staying restrained enough for Apple-style product surfaces.`,
    "",
    `Suitable scenarios: ${getUseCasesForDefinition(definition).join(", ")}.`,
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

const definitions: NotionInboxDefinition[] = [
  {
    slug: "beams",
    title: "Beams",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/beams",
    description: "Volumetric diagonal light beams driven by an adapted Three.js shader material.\nsource: https://reactbits.dev/backgrounds/beams",
    visualStyle: "Soft white beams sweep through a dark WebGL scene with noisy volumetric light.",
    motionLogic: "Uses beamWidth, beamHeight, beamNumber, speed, noiseIntensity, scale, and rotation from the source reference.",
    defaultProps: withRendererProps("beams", {
      beamWidth: 3,
      beamHeight: 30,
      beamNumber: 20,
      lightColor: "#ffffff",
      speed: 2,
      noiseIntensity: 1.75,
      scale: 0.2,
      rotation: 30
    }),
    controls: withRenderer("beams", [
      range("beamWidth", "Beam Width", 3, 1, 8, 0.25, "Width of each beam."),
      range("beamHeight", "Beam Height", 30, 8, 70, 1, "Height of each beam."),
      range("beamNumber", "Beam Number", 20, 4, 40, 1, "Number of beams."),
      color("lightColor", "Light Color", "#ffffff", "Directional light color."),
      range("speed", "Speed", 2, 0.1, 6, 0.1, "Animation speed."),
      range("noiseIntensity", "Noise Intensity", 1.75, 0, 5, 0.05, "Shader noise intensity.", "advanced"),
      range("scale", "Scale", 0.2, 0.05, 1, 0.01, "Scene scale.", "advanced"),
      range("rotation", "Rotation", 30, -90, 90, 1, "Beam rotation in degrees.", "advanced")
    ]),
    dependencies: ["three", "@react-three/fiber", "@react-three/drei"]
  },
  {
    slug: "dither",
    title: "Dither",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/dither",
    description: "Dithered wave shader with quantized color levels, mouse interaction, and pixel-size controls.\nsource: https://reactbits.dev/backgrounds/dither",
    visualStyle: "A grayscale procedural wave surface rendered through a dither postprocess.",
    motionLogic: "Uses Dither waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, mouse interaction, and mouseRadius props.",
    defaultProps: withRendererProps("dither", {
      waveColor: "#808080",
      mouseRadius: 0.3,
      colorNum: 4,
      pixelSize: 2,
      waveAmplitude: 0.3,
      waveFrequency: 3,
      waveSpeed: 0.05,
      enableMouseInteraction: true,
      disableAnimation: false
    }),
    controls: withRenderer("dither", [
      color("waveColor", "Wave Color", "#808080", "Wave color, mapped to the source RGB array."),
      range("waveSpeed", "Wave Speed", 0.05, 0, 0.2, 0.01, "Speed of the wave animation."),
      range("waveFrequency", "Wave Frequency", 3, 0.5, 8, 0.1, "Frequency of the wave pattern."),
      range("waveAmplitude", "Wave Amplitude", 0.3, 0.05, 1, 0.05, "Amplitude of the wave pattern."),
      range("colorNum", "Color Count", 4, 2, 8, 1, "Number of quantized colors."),
      range("pixelSize", "Pixel Size", 2, 1, 8, 1, "Dither pixel size."),
      bool("enableMouseInteraction", "Mouse Interaction", true, "Enables pointer influence."),
      range("mouseRadius", "Mouse Radius", 0.3, 0.05, 1, 0.05, "Radius of mouse interaction.", "advanced"),
      bool("disableAnimation", "Disable Animation", false, "Stops the wave animation.", "advanced")
    ]),
    dependencies: ["three", "@react-three/fiber", "@react-three/postprocessing", "postprocessing"]
  },
  {
    slug: "dot-field",
    title: "Dot Field",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/dot-field",
    description: "Cursor-reactive dotted field using an adapted canvas implementation and exact demo controls.\nsource: https://reactbits.dev/backgrounds/dot-field",
    visualStyle: "A restrained purple dot matrix with subtle cursor glow and bulge response.",
    motionLogic: "Uses dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, and glowColor.",
    defaultProps: withRendererProps("dot-field", {
      dotRadius: 1.5,
      dotSpacing: 14,
      cursorRadius: 500,
      cursorForce: 0.1,
      bulgeOnly: true,
      bulgeStrength: 67,
      glowRadius: 160,
      sparkle: false,
      waveAmplitude: 0,
      gradientFrom: "#A855F7",
      gradientTo: "#B497CF",
      glowColor: "#120F17"
    }),
    controls: withRenderer("dot-field", [
      range("dotRadius", "Dot Radius", 1.5, 0.5, 5, 0.5, "Radius of each dot."),
      range("dotSpacing", "Dot Spacing", 14, 5, 30, 1, "Spacing between dots."),
      range("cursorRadius", "Cursor Radius", 500, 100, 1000, 50, "Radius of the cursor interaction area."),
      range("cursorForce", "Cursor Force", 0.1, 0, 1, 0.01, "Force applied in physics mode."),
      bool("bulgeOnly", "Bulge Only", true, "Bulges dots away from the cursor instead of pushing them with physics."),
      range("bulgeStrength", "Bulge Strength", 67, 0, 150, 1, "Strength of the cursor bulge."),
      range("glowRadius", "Glow Radius", 160, 50, 400, 10, "Radius of the SVG glow that follows the cursor."),
      range("waveAmplitude", "Wave Amplitude", 0, 0, 20, 1, "Wave displacement applied to dots."),
      bool("sparkle", "Sparkle", false, "Randomly enlarges a small percentage of dots."),
      color("gradientFrom", "Gradient From", "#A855F7", "Start color for the dot gradient.", "advanced"),
      color("gradientTo", "Gradient To", "#B497CF", "End color for the dot gradient.", "advanced"),
      color("glowColor", "Glow Color", "#120F17", "Color of the cursor glow.", "advanced")
    ]),
    dependencies: []
  },
  {
    slug: "gradient-blinds",
    title: "Gradient Blinds",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/gradient-blinds",
    description: "OGL gradient blind shader using the original strip, spotlight, noise, and shine controls.\nsource: https://reactbits.dev/backgrounds/gradient-blinds",
    visualStyle: "Animated gradient strips sweep like translucent blinds over a dark surface.",
    motionLogic: "Maps color stops, angle, noise, blindCount, mouseDampening, spotlight, distortAmount, shineDirection, and blend mode to the adapted component.",
    defaultProps: withRendererProps("gradient-blinds", {
      color1: "#FF9FFC",
      color2: "#5227FF",
      angle: 20,
      noise: 0.5,
      blindCount: 16,
      blindMinWidth: 60,
      mouseDampening: 0.15,
      mirrorGradient: false,
      spotlightRadius: 0.5,
      spotlightSoftness: 1,
      spotlightOpacity: 1,
      distortAmount: 0,
      shineDirection: "left",
      mixBlendMode: "lighten"
    }),
    controls: withRenderer("gradient-blinds", [
      color("color1", "Color 1", "#FF9FFC", "First gradient stop."),
      color("color2", "Color 2", "#5227FF", "Second gradient stop."),
      range("angle", "Angle", 20, -180, 180, 1, "Gradient rotation in degrees."),
      range("noise", "Noise", 0.5, 0, 1, 0.05, "Per-pixel noise strength."),
      range("blindCount", "Blind Count", 16, 4, 40, 1, "Number of blind strips."),
      range("blindMinWidth", "Blind Min Width", 60, 20, 160, 1, "Minimum strip width."),
      range("mouseDampening", "Mouse Dampening", 0.15, 0, 1, 0.01, "Pointer smoothing."),
      select("shineDirection", "Shine Direction", "left", ["left", "right"], "Direction of shine motion."),
      range("spotlightRadius", "Spotlight Radius", 0.5, 0, 1.5, 0.05, "Mouse spotlight radius.", "advanced"),
      range("spotlightSoftness", "Spotlight Softness", 1, 0.1, 3, 0.1, "Softness of spotlight falloff.", "advanced"),
      range("spotlightOpacity", "Spotlight Opacity", 1, 0, 2, 0.05, "Spotlight opacity.", "advanced"),
      range("distortAmount", "Distort Amount", 0, 0, 1, 0.01, "Distortion amount.", "advanced"),
      bool("mirrorGradient", "Mirror Gradient", false, "Mirrors the gradient across strips.", "advanced"),
      select("mixBlendMode", "Blend Mode", "lighten", ["lighten", "screen", "normal", "overlay"], "CSS mix-blend-mode.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  {
    slug: "letter-glitch",
    title: "Letter Glitch",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/letter-glitch",
    description: "Canvas character grid with glitch colors, timed scrambling, and optional vignettes.\nsource: https://reactbits.dev/backgrounds/letter-glitch",
    visualStyle: "Dense animated monospace symbols flicker between green, cyan, and dark tones.",
    motionLogic: "Uses glitchColors, glitchSpeed, centerVignette, outerVignette, smooth, and characters from the source component.",
    defaultProps: withRendererProps("letter-glitch", {
      color0: "#2b4539",
      color1: "#61dca3",
      color2: "#61b3dc",
      glitchSpeed: 50,
      centerVignette: true,
      outerVignette: false,
      smooth: true,
      characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
    }),
    controls: withRenderer("letter-glitch", [
      color("color0", "Glitch Color 1", "#2b4539", "First glitch color."),
      color("color1", "Glitch Color 2", "#61dca3", "Second glitch color."),
      color("color2", "Glitch Color 3", "#61b3dc", "Third glitch color."),
      range("glitchSpeed", "Glitch Speed", 50, 10, 180, 5, "Speed at which letters scramble."),
      bool("centerVignette", "Center Vignette", true, "Adds a center vignette."),
      bool("outerVignette", "Outer Vignette", false, "Adds edge vignette."),
      bool("smooth", "Smooth", true, "Smooths color interpolation."),
      text("characters", "Characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789", "Character set rendered in the canvas.")
    ]),
    dependencies: []
  },
  {
    slug: "light-rays",
    title: "Light Rays",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/light-rays",
    description: "OGL light ray shader with origin, spread, ray length, pulsation, mouse, noise, and distortion controls.\nsource: https://reactbits.dev/backgrounds/light-rays",
    visualStyle: "Atmospheric white rays stream from an edge across a dark canvas.",
    motionLogic: "Uses raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, and distortion.",
    defaultProps: withRendererProps("light-rays", {
      raysOrigin: "top-center",
      raysColor: "#ffffff",
      raysSpeed: 1,
      lightSpread: 0.5,
      rayLength: 3,
      pulsating: false,
      fadeDistance: 1,
      saturation: 1,
      followMouse: true,
      mouseInfluence: 0.1,
      noiseAmount: 0,
      distortion: 0
    }),
    controls: withRenderer("light-rays", [
      select("raysOrigin", "Rays Origin", "top-center", ["top-center", "top-left", "top-right", "right", "left", "bottom-center", "bottom-right", "bottom-left"], "Ray origin."),
      color("raysColor", "Rays Color", "#ffffff", "Light ray color."),
      range("raysSpeed", "Rays Speed", 1, 0, 4, 0.1, "Ray animation speed."),
      range("lightSpread", "Light Spread", 0.5, 0, 2, 0.05, "Spread of the light rays."),
      range("rayLength", "Ray Length", 3, 0.5, 8, 0.1, "Length of rays."),
      bool("pulsating", "Pulsating", false, "Enables pulse modulation."),
      range("fadeDistance", "Fade Distance", 1, 0, 3, 0.05, "Fade distance."),
      range("saturation", "Saturation", 1, 0, 2, 0.05, "Color saturation."),
      bool("followMouse", "Follow Mouse", true, "Allows rays to follow pointer."),
      range("mouseInfluence", "Mouse Influence", 0.1, 0, 1, 0.01, "Pointer influence strength.", "advanced"),
      range("noiseAmount", "Noise Amount", 0, 0, 1, 0.01, "Noise amount.", "advanced"),
      range("distortion", "Distortion", 0, 0, 1, 0.01, "Ray distortion.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  {
    slug: "pixel-blast",
    title: "Pixel Blast",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/pixel-blast",
    description: "Three.js pixel shader background with pattern variants, ripple/liquid interaction, jitter, edge fade, and noise.\nsource: https://reactbits.dev/backgrounds/pixel-blast",
    visualStyle: "A purple pixel field reacts to cursor trails with ripple and optional liquid movement.",
    motionLogic: "Uses the PixelBlast variant, pixelSize, patternScale, patternDensity, jitter, ripple, liquid, speed, edgeFade, color, and noise controls.",
    defaultProps: withRendererProps("pixel-blast", {
      variant: "square",
      pixelSize: 4,
      patternScale: 2,
      patternDensity: 1,
      pixelSizeJitter: 0,
      enableRipples: true,
      liquid: false,
      liquidStrength: 0.1,
      speed: 0.5,
      edgeFade: 0.25,
      noiseAmount: 0,
      color: "#B497CF"
    }),
    controls: withRenderer("pixel-blast", [
      select("variant", "Variant", "square", ["square", "circle", "triangle", "diamond"], "Pixel shape variant."),
      color("color", "Color", "#B497CF", "Pixel color."),
      range("pixelSize", "Pixel Size", 4, 1, 12, 1, "Base pixel size."),
      range("patternScale", "Pattern Scale", 2, 0.5, 6, 0.1, "Pattern scale."),
      range("patternDensity", "Pattern Density", 1, 0.1, 3, 0.05, "Pattern density."),
      range("pixelSizeJitter", "Pixel Jitter", 0, 0, 1, 0.01, "Pixel size jitter."),
      bool("enableRipples", "Ripples", true, "Enables pointer ripples."),
      bool("liquid", "Liquid", false, "Enables liquid deformation."),
      range("liquidStrength", "Liquid Strength", 0.1, 0, 1, 0.01, "Liquid deformation strength.", "advanced"),
      range("speed", "Speed", 0.5, 0, 3, 0.05, "Animation speed."),
      range("edgeFade", "Edge Fade", 0.25, 0, 1, 0.01, "Edge fade amount.", "advanced"),
      range("noiseAmount", "Noise Amount", 0, 0, 1, 0.01, "Noise amount.", "advanced")
    ]),
    dependencies: ["three", "postprocessing"]
  },
  {
    slug: "prism",
    title: "Prism",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/prism",
    description: "OGL spectral prism shader with rotate, hover, and 3D rotate animation modes.\nsource: https://reactbits.dev/backgrounds/prism",
    visualStyle: "A refractive triangular prism emits spectral glow and noise on a dark transparent canvas.",
    motionLogic: "Uses animationType, timeScale, scale, noise, glow, height, baseWidth, hueShift, colorFrequency, and bloom from the adapted Prism component.",
    defaultProps: withRendererProps("prism", {
      animationType: "rotate",
      timeScale: 0.5,
      scale: 3.6,
      noise: 0,
      glow: 1,
      height: 3.5,
      baseWidth: 5.5,
      hueShift: 0,
      colorFrequency: 1,
      bloom: 1
    }),
    controls: withRenderer("prism", [
      select("animationType", "Animation Type", "rotate", ["rotate", "hover", "3drotate"], "Animation mode."),
      range("timeScale", "Time Scale", 0.5, 0, 2, 0.05, "Global time multiplier."),
      range("scale", "Scale", 3.6, 0.5, 8, 0.1, "Prism scale."),
      range("noise", "Noise", 0, 0, 1, 0.01, "Noise amount."),
      range("glow", "Glow", 1, 0, 3, 0.05, "Glow multiplier."),
      range("height", "Height", 3.5, 1, 8, 0.1, "Apex height."),
      range("baseWidth", "Base Width", 5.5, 1, 10, 0.1, "Total base width."),
      range("hueShift", "Hue Shift", 0, -180, 180, 1, "Hue rotation.", "advanced"),
      range("colorFrequency", "Color Frequency", 1, 0, 4, 0.05, "Spectral color frequency.", "advanced"),
      range("bloom", "Bloom", 1, 0, 3, 0.05, "Bloom-like intensity.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  {
    slug: "prismatic-burst",
    title: "Prismatic Burst",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/prismatic-burst",
    description: "OGL radial ray burst with spectral colors, rotate/3D/hover modes, distortion, and custom ray count.\nsource: https://reactbits.dev/backgrounds/prismatic-burst",
    visualStyle: "A bright radial prism burst spreads purple-blue spectral rays from the center.",
    motionLogic: "Uses animationType, intensity, speed, distort, hoverDampness, rayCount, colors, and blend mode from the adapted component.",
    defaultProps: withRendererProps("prismatic-burst", {
      animationType: "rotate3d",
      intensity: 2,
      speed: 0.5,
      distort: 0,
      hoverDampness: 0.25,
      rayCount: 0,
      color0: "#A855F7",
      color1: "#7C3AED",
      color2: "#6366F1",
      mixBlendMode: "screen"
    }),
    controls: withRenderer("prismatic-burst", [
      select("animationType", "Animation Type", "rotate3d", ["rotate", "rotate3d", "hover"], "Core motion style."),
      range("intensity", "Intensity", 2, 0, 5, 0.1, "Brightness multiplier."),
      range("speed", "Speed", 0.5, 0, 3, 0.05, "Global time multiplier."),
      range("distort", "Distort", 0, 0, 1, 0.01, "Ray distortion."),
      range("hoverDampness", "Hover Dampness", 0.25, 0, 1, 0.01, "Pointer damping for hover mode.", "advanced"),
      range("rayCount", "Ray Count", 0, 0, 80, 1, "Custom ray count; 0 uses spectral default.", "advanced"),
      color("color0", "Color 1", "#A855F7", "First custom ray color."),
      color("color1", "Color 2", "#7C3AED", "Second custom ray color."),
      color("color2", "Color 3", "#6366F1", "Third custom ray color."),
      select("mixBlendMode", "Blend Mode", "screen", ["screen", "lighten", "normal", "overlay"], "CSS mix-blend-mode.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  {
    slug: "shiny-text",
    title: "Shiny Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/shiny-text",
    description: "Motion-powered text shimmer using the source component's color, shineColor, speed, delay, spread, yoyo, hover, and direction props.\nsource: https://reactbits.dev/text-animations/shiny-text",
    visualStyle: "A subtle shine highlight sweeps across muted text.",
    motionLogic: "Uses the adapted ShinyText component with motion values and animation-frame progress.",
    defaultProps: withRendererProps("shiny-text", {
      text: "Shiny Text Effect",
      speed: 2,
      delay: 0,
      color: "#b5b5b5",
      shineColor: "#ffffff",
      spread: 120,
      direction: "left",
      yoyo: false,
      pauseOnHover: false,
      disabled: false
    }),
    controls: withRenderer("shiny-text", [
      text("text", "Text", "Shiny Text Effect", "Displayed text.", "primary"),
      color("color", "Base Color", "#b5b5b5", "Base text color."),
      color("shineColor", "Shine Color", "#ffffff", "Highlight color."),
      range("speed", "Speed", 2, 0.2, 8, 0.1, "Duration of one cycle.", "primary", "s"),
      range("delay", "Delay", 0, 0, 5, 0.1, "Pause between cycles.", "advanced", "s"),
      range("spread", "Spread", 120, 0, 180, 1, "Gradient angle/spread."),
      select("direction", "Direction", "left", ["left", "right"], "Shine direction."),
      bool("yoyo", "Yoyo", false, "Reverses the animation every cycle.", "advanced"),
      bool("pauseOnHover", "Pause On Hover", false, "Pauses on hover.", "advanced"),
      bool("disabled", "Disabled", false, "Disables animation.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  {
    slug: "shuffle",
    title: "Shuffle",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/shuffle",
    description: "GSAP per-letter shuffle animation with direction, timing, stagger, loop, scramble charset, colors, and hover trigger.\nsource: https://reactbits.dev/text-animations/shuffle",
    visualStyle: "Letters slide and scramble into place with a compact strip reveal.",
    motionLogic: "Uses the adapted Shuffle component with SplitText and GSAP timelines.",
    defaultProps: withRendererProps("shuffle", {
      text: "Hello World",
      shuffleDirection: "right",
      duration: 0.35,
      maxDelay: 0,
      ease: "power3.out",
      shuffleTimes: 1,
      animationMode: "evenodd",
      loop: false,
      loopDelay: 0,
      stagger: 0.03,
      scrambleCharset: "",
      colorFrom: "#b5b5b5",
      colorTo: "#ffffff",
      triggerOnHover: true
    }),
    controls: withRenderer("shuffle", [
      text("text", "Text", "Hello World", "Text content to shuffle.", "primary"),
      select("shuffleDirection", "Direction", "right", ["left", "right", "up", "down"], "Direction the strip slides."),
      range("duration", "Duration", 0.35, 0.1, 2, 0.05, "Duration per letter.", "primary", "s"),
      range("stagger", "Stagger", 0.03, 0, 0.2, 0.01, "Delay between letters."),
      range("shuffleTimes", "Shuffle Times", 1, 1, 8, 1, "How many times characters shuffle."),
      select("animationMode", "Mode", "evenodd", ["evenodd", "random"], "Delay mode."),
      bool("triggerOnHover", "Trigger On Hover", true, "Starts on hover."),
      bool("loop", "Loop", false, "Loops the animation.", "advanced"),
      range("loopDelay", "Loop Delay", 0, 0, 5, 0.1, "Delay between loops.", "advanced", "s"),
      range("maxDelay", "Max Delay", 0, 0, 2, 0.05, "Max random delay in random mode.", "advanced", "s"),
      text("ease", "Ease", "power3.out", "GSAP ease string."),
      text("scrambleCharset", "Scramble Charset", "", "Optional scramble character set."),
      color("colorFrom", "Color From", "#b5b5b5", "Initial text color.", "advanced"),
      color("colorTo", "Color To", "#ffffff", "Final text color.", "advanced")
    ]),
    dependencies: ["gsap", "@gsap/react"]
  },
  {
    slug: "text-pressure",
    title: "Text Pressure",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/text-pressure",
    description: "Variable font pressure text that interpolates glyph width, weight, italic, alpha, stroke, and scale from cursor distance.\nsource: https://reactbits.dev/text-animations/text-pressure",
    visualStyle: "Large variable glyphs react to pointer proximity with pressure-like deformation.",
    motionLogic: "Uses TextPressure with Roboto Flex axis interpolation and cursor-distance mapping.",
    defaultProps: withRendererProps("text-pressure", {
      text: "Pressure",
      flex: false,
      alpha: false,
      stroke: false,
      width: true,
      weight: true,
      italic: true,
      scale: false,
      textColor: "#ffffff",
      strokeColor: "#5227FF",
      minFontSize: 36
    }),
    controls: withRenderer("text-pressure", [
      text("text", "Text", "Pressure", "Displayed text.", "primary"),
      color("textColor", "Text Color", "#ffffff", "Text fill color."),
      color("strokeColor", "Stroke Color", "#5227FF", "Stroke color."),
      bool("flex", "Flex", false, "Distributes letters across the line for wide wordmark layouts."),
      bool("width", "Width Axis", true, "Enables width axis response."),
      bool("weight", "Weight Axis", true, "Enables weight axis response."),
      bool("italic", "Italic Axis", true, "Enables italic axis response."),
      bool("alpha", "Alpha", false, "Enables opacity response.", "advanced"),
      bool("stroke", "Stroke", false, "Enables stroke rendering.", "advanced"),
      bool("scale", "Scale", false, "Enables vertical scale response.", "advanced"),
      range("minFontSize", "Min Font Size", 36, 16, 80, 1, "Minimum responsive font size.", "advanced", "px")
    ]),
    dependencies: []
  },
  {
    slug: "text-type",
    title: "Text Type",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/text-type",
    description: "GSAP cursor-blink typewriter for string arrays with typing/deleting speed, pause, loop, cursor, variable speed, and reverse mode.\nsource: https://reactbits.dev/text-animations/text-type",
    visualStyle: "A clean typewriter line cycles through short phrases with a blinking cursor.",
    motionLogic: "Uses the adapted TextType state machine and GSAP cursor blink.",
    defaultProps: withRendererProps("text-type", {
      texts: "Text typing effect|for your websites|Happy coding!",
      typingSpeed: 75,
      initialDelay: 0,
      pauseDuration: 1500,
      deletingSpeed: 50,
      showCursor: true,
      hideCursorWhileTyping: false,
      cursorCharacter: "_",
      cursorBlinkDuration: 0.5,
      variableSpeedEnabled: false,
      variableSpeedMin: 60,
      variableSpeedMax: 120,
      textColor0: "#ffffff",
      textColor1: "#b7d075",
      textColor2: "#ffffff",
      loop: true,
      reverseMode: false
    }),
    controls: withRenderer("text-type", [
      text("texts", "Texts", "Text typing effect|for your websites|Happy coding!", "Pipe or newline separated text list.", "primary"),
      range("typingSpeed", "Typing Speed", 75, 10, 240, 5, "Typing speed.", "primary", "ms"),
      range("pauseDuration", "Pause Duration", 1500, 0, 5000, 100, "Pause between phrases.", "primary", "ms"),
      range("deletingSpeed", "Deleting Speed", 50, 10, 240, 5, "Deleting speed.", "primary", "ms"),
      bool("showCursor", "Show Cursor", true, "Shows cursor."),
      text("cursorCharacter", "Cursor", "_", "Cursor character."),
      range("cursorBlinkDuration", "Cursor Blink", 0.5, 0.1, 2, 0.05, "Cursor blink duration.", "advanced", "s"),
      range("initialDelay", "Initial Delay", 0, 0, 3000, 100, "Initial delay before typing.", "advanced", "ms"),
      bool("hideCursorWhileTyping", "Hide Cursor While Typing", false, "Hides cursor during typing.", "advanced"),
      bool("variableSpeedEnabled", "Variable Speed", false, "Enables random typing speed.", "advanced"),
      range("variableSpeedMin", "Variable Min", 60, 10, 200, 5, "Minimum random speed.", "advanced", "ms"),
      range("variableSpeedMax", "Variable Max", 120, 20, 300, 5, "Maximum random speed.", "advanced", "ms"),
      color("textColor0", "Text Color 1", "#ffffff", "First text color.", "advanced"),
      color("textColor1", "Text Color 2", "#b7d075", "Second text color.", "advanced"),
      color("textColor2", "Text Color 3", "#ffffff", "Third text color.", "advanced"),
      bool("loop", "Loop", true, "Loops phrases.", "advanced"),
      bool("reverseMode", "Reverse Mode", false, "Types in reverse mode.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  {
    slug: "flowing-menu",
    title: "Flowing Menu",
    category: "media",
    sourceUrl: "https://reactbits.dev/components/flowing-menu",
    description: "Hover-driven media menu with directional marquee reveal and image strips.\nsource: https://reactbits.dev/components/flowing-menu",
    visualStyle: "Stacked horizontal menu rows reveal moving image-and-label marquees on hover.",
    motionLogic: "Uses GSAP timelines for edge-aware hover entry/exit and a looping marquee driven by speed, color, and border controls.",
    defaultProps: withRendererProps("flowing-menu", {
      speed: 15,
      textColor: "#f5f5f7",
      bgColor: "#09090b",
      marqueeBgColor: "#b7d075",
      marqueeTextColor: "#050505",
      borderColor: "rgba(255,255,255,0.18)"
    }),
    controls: withRenderer("flowing-menu", [
      range("speed", "Speed", 15, 6, 30, 1, "Duration of the marquee loop.", "primary", "s"),
      color("textColor", "Text Color", "#f5f5f7", "Base row text color."),
      color("bgColor", "Background", "#09090b", "Menu background color."),
      color("marqueeBgColor", "Marquee Background", "#b7d075", "Hover marquee background."),
      color("marqueeTextColor", "Marquee Text", "#050505", "Hover marquee text color."),
      text("borderColor", "Border Color", "rgba(255,255,255,0.18)", "Row divider color.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  {
    slug: "card-swap",
    title: "Card Swap",
    category: "media",
    sourceUrl: "https://reactbits.dev/components/card-swap",
    description: "Timed stacked-card exchange with perspective, skew, and hover pause controls.\nsource: https://reactbits.dev/components/card-swap",
    visualStyle: "Image cards sit in a layered 3D stack and cycle forward with elastic movement.",
    motionLogic: "Uses a GSAP timeline to drop the front card, promote the stack, and return the card to the back slot.",
    defaultProps: withRendererProps("card-swap", {
      cardDistance: 54,
      verticalDistance: 64,
      delay: 4200,
      pauseOnHover: true,
      skewAmount: 6,
      easing: "elastic"
    }),
    controls: withRenderer("card-swap", [
      range("cardDistance", "Card Distance", 54, 20, 110, 1, "Horizontal distance between stacked cards."),
      range("verticalDistance", "Vertical Distance", 64, 20, 130, 1, "Vertical distance between stacked cards."),
      range("delay", "Delay", 4200, 1200, 9000, 100, "Time between card swaps.", "primary", "ms"),
      bool("pauseOnHover", "Pause On Hover", true, "Pauses swapping on hover."),
      range("skewAmount", "Skew", 6, 0, 14, 0.5, "Perspective skew applied to cards."),
      select("easing", "Easing", "elastic", ["elastic", "linear"], "Swap motion curve.")
    ]), 
    dependencies: ["gsap"]
  },
  {
    slug: "orbit-gallery",
    title: "Orbit Gallery",
    category: "media",
    sourceUrl: "https://portfolio2021.michalzalobny.com/orbit-gallery",
    description: "Black portfolio gallery with a scroll-driven image field, rotated editorial type, and velocity-based 3D bending.\nsource: https://portfolio2021.michalzalobny.com/orbit-gallery",
    visualStyle: "A black editorial viewport contains a wide three-column image field behind a rotated serif wordmark.",
    motionLogic: "Captures wheel input into an internal scroll field, keeps images upright, and uses pointer parallax plus velocity-driven rotateX, depth, and vertical stretch to match the reference page's fixed black viewport and rotated title overlay.",
    defaultProps: withRendererProps("orbit-gallery", {
      imageCount: 21,
      bendStrength: 37,
      pointerParallax: 24
    }),
    controls: withRenderer("orbit-gallery", [
      range("imageCount", "Image Count", 21, 9, 30, 1, "Number of images in the repeated scroll field."),
      range("bendStrength", "Bend Strength", 37, 0, 58, 1, "3D bend applied while scrolling.", "primary"),
      range("pointerParallax", "Pointer Parallax", 24, 0, 48, 1, "Horizontal pointer drift.", "primary", "px")
    ]),
    dependencies: []
  },
  {
    slug: "curved-scroll-gallery",
    title: "Curved Scroll Gallery",
    category: "media",
    sourceUrl: "https://webgl-magazine.vercel.app/",
    description: "Curved magazine-style scroll gallery with cards distributed along a soft horizontal arc.\nsource: https://webgl-magazine.vercel.app/",
    visualStyle: "A fixed dark editorial viewport with a dense row of thin WebGL magazine pages crossing the middle of the screen.",
    motionLogic: "Uses a React Three Fiber instanced shader scene inspired by the original WebGL Magazine structure: wheel input feeds unbounded gallery travel, each page wraps through the center, and scroll speed bends the page geometry while it settles.",
    defaultProps: withRendererProps("curved-scroll-gallery", {
      imageCount: 56,
      curveDepth: 62,
      bendStrength: 34
    }),
    controls: withRenderer("curved-scroll-gallery", [
      range("imageCount", "Image Count", 56, 24, 72, 1, "Number of instanced pages in the WebGL strip."),
      range("curveDepth", "Curve Depth", 62, 0, 120, 1, "Vertical depth of the scroll arc.", "primary", "px"),
      range("bendStrength", "Bend Strength", 34, 0, 58, 1, "Horizontal track bend while scroll velocity is high.")
    ]),
    dependencies: []
  },
  {
    slug: "infinite-canvas",
    title: "Infinite Canvas",
    category: "media",
    sourceUrl: "https://tympanus.net/Tutorials/InfiniteCanvas/",
    description: "Large draggable-feeling media board with tiled images drifting across an infinite canvas.\nsource: https://tympanus.net/Tutorials/InfiniteCanvas/",
    visualStyle: "A pale WebGL space where upright artwork planes float around a clear central title under a minimal difference-blend frame.",
    motionLogic: "Uses a React Three Fiber scene with deterministic chunked artwork planes, drag-to-pan velocity, unbounded wheel-driven depth travel, fog depth, and distance-based fading.",
    defaultProps: withRendererProps("infinite-canvas", {
      tileCount: 24,
      scale: 1
    }),
    controls: withRenderer("infinite-canvas", [
      range("tileCount", "Tile Count", 24, 10, 32, 1, "Number of artwork textures reused by the infinite canvas."),
      range("scale", "Scale", 1, 0.72, 1.35, 0.01, "Canvas scale.", "primary")
    ]),
    dependencies: []
  },
  {
    slug: "staggered-menu",
    title: "Staggered Menu",
    category: "navigation",
    sourceUrl: "https://reactbits.dev/components/staggered-menu",
    description: "Layered navigation drawer with staggered panel entrance, numbered links, and social link reveal.\nsource: https://reactbits.dev/components/staggered-menu",
    visualStyle: "A restrained navigation shell opens colored layers before revealing large menu links.",
    motionLogic: "Uses GSAP timelines for layered panel movement, button icon rotation, label cycling, numbered item entrance, and social link reveal.",
    defaultProps: withRendererProps("staggered-menu", {
      position: "right",
      color0: "#111114",
      color1: "#2a2d31",
      color2: "#b7d075",
      displaySocials: true,
      displayItemNumbering: true,
      menuButtonColor: "#f5f5f7",
      openMenuButtonColor: "#f5f5f7",
      accentColor: "#b7d075",
      changeMenuColorOnOpen: true
    }),
    controls: withRenderer("staggered-menu", [
      select("position", "Position", "right", ["left", "right"], "Side from which the menu opens."),
      color("accentColor", "Accent", "#b7d075", "Panel accent color."),
      color("color0", "Layer 1", "#111114", "First pre-layer color.", "advanced"),
      color("color1", "Layer 2", "#2a2d31", "Second pre-layer color.", "advanced"),
      color("color2", "Layer 3", "#b7d075", "Third pre-layer color.", "advanced"),
      bool("displaySocials", "Socials", true, "Shows social links."),
      bool("displayItemNumbering", "Numbering", true, "Shows item numbering."),
      color("menuButtonColor", "Button Color", "#f5f5f7", "Closed menu button color.", "advanced"),
      color("openMenuButtonColor", "Open Button", "#f5f5f7", "Open menu button color.", "advanced"),
      bool("changeMenuColorOnOpen", "Change Button Color", true, "Changes button color when opened.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  {
    slug: "glass-surface",
    title: "Glass Surface",
    category: "components",
    sourceUrl: "https://reactbits.dev/components/glass-surface",
    description: "SVG-filter liquid glass surface with displacement, blur, opacity, channel, and blend controls.\nsource: https://reactbits.dev/components/glass-surface",
    visualStyle: "A translucent glass control floats over image content with refractive edges.",
    motionLogic: "Generates an SVG displacement map from the element bounds and uses backdrop filter fallbacks for browser support.",
    defaultProps: withRendererProps("glass-surface", {
      borderRadius: 24,
      borderWidth: 0.07,
      brightness: 50,
      opacity: 0.93,
      blur: 11,
      displace: 0,
      backgroundOpacity: 0,
      saturation: 1,
      distortionScale: -180,
      redOffset: 0,
      greenOffset: 10,
      blueOffset: 20,
      xChannel: "R",
      yChannel: "G",
      mixBlendMode: "difference"
    }),
    controls: withRenderer("glass-surface", [
      range("borderRadius", "Radius", 24, 4, 48, 1, "Surface corner radius.", "primary", "px"),
      range("borderWidth", "Edge Width", 0.07, 0.01, 0.2, 0.01, "Displacement edge width."),
      range("brightness", "Brightness", 50, 0, 100, 1, "Inner highlight brightness."),
      range("opacity", "Opacity", 0.93, 0, 1, 0.01, "Glass opacity."),
      range("blur", "Blur", 11, 0, 30, 1, "Blur applied to the displacement map.", "primary", "px"),
      range("displace", "Displace", 0, 0, 8, 0.1, "Gaussian blur on filter output.", "advanced"),
      range("backgroundOpacity", "Frost", 0, 0, 1, 0.01, "Fallback frost opacity.", "advanced"),
      range("saturation", "Saturation", 1, 0, 2, 0.05, "Backdrop saturation.", "advanced"),
      range("distortionScale", "Distortion", -180, -300, 80, 1, "Base displacement scale.", "advanced"),
      range("redOffset", "Red Offset", 0, -80, 80, 1, "Red channel offset.", "advanced"),
      range("greenOffset", "Green Offset", 10, -80, 80, 1, "Green channel offset.", "advanced"),
      range("blueOffset", "Blue Offset", 20, -80, 80, 1, "Blue channel offset.", "advanced"),
      select("xChannel", "X Channel", "R", ["R", "G", "B"], "SVG xChannelSelector.", "advanced"),
      select("yChannel", "Y Channel", "G", ["R", "G", "B"], "SVG yChannelSelector.", "advanced"),
      select("mixBlendMode", "Blend Mode", "difference", ["normal", "screen", "overlay", "difference", "plus-lighter"], "Gradient blend mode.", "advanced")
    ]),
    dependencies: []
  },
  {
    slug: "fluid-glass",
    title: "Fluid Glass",
    category: "components",
    sourceUrl: "https://reactbits.dev/components/fluid-glass",
    description: "Three.js transmission glass object over scrollable image typography content.\nsource: https://reactbits.dev/components/fluid-glass",
    visualStyle: "A refractive lens, bar, or cube bends local artwork and Design Atlas typography.",
    motionLogic: "Uses React Three Fiber, Drei ScrollControls, GLB geometry, and MeshTransmissionMaterial with mode-specific properties.",
    defaultProps: withRendererProps("fluid-glass", {
      mode: "lens",
      scale: 0.15,
      ior: 1.15,
      thickness: 5,
      chromaticAberration: 0.1
    }),
    controls: withRenderer("fluid-glass", [
      select("mode", "Mode", "lens", ["lens", "bar", "cube"], "Glass object mode."),
      range("scale", "Scale", 0.15, 0.05, 0.45, 0.01, "Geometry scale."),
      range("ior", "IOR", 1.15, 1, 2.2, 0.01, "Index of refraction."),
      range("thickness", "Thickness", 5, 0.2, 12, 0.1, "Transmission material thickness."),
      range("chromaticAberration", "Chromatic Aberration", 0.1, 0, 1, 0.01, "Color separation in transmission.")
    ]),
    dependencies: ["three", "@react-three/fiber", "@react-three/drei", "maath"]
  },
  {
    slug: "splash-cursor",
    title: "Splash Cursor",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/splash-cursor",
    description: "Pointer-driven WebGL fluid splats with simulation, dye, pressure, curl, radius, force, and color controls.\nsource: https://reactbits.dev/animations/splash-cursor",
    visualStyle: "Soft color fluid follows pointer movement over a dark preview surface.",
    motionLogic: "Runs a WebGL fluid simulation in an absolute canvas constrained to the preview stage.",
    defaultProps: withRendererProps("splash-cursor", {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR: "#b7d075",
      BACK_COLOR: "#000000",
      TRANSPARENT: true
    }),
    controls: withRenderer("splash-cursor", [
      color("COLOR", "Color", "#b7d075", "Fluid splat color."),
      range("SPLAT_RADIUS", "Splat Radius", 0.2, 0.02, 0.8, 0.01, "Radius of each splat."),
      range("SPLAT_FORCE", "Splat Force", 6000, 500, 12000, 100, "Force applied to fluid."),
      range("DENSITY_DISSIPATION", "Density Dissipation", 3.5, 0.2, 8, 0.1, "How quickly dye fades."),
      range("VELOCITY_DISSIPATION", "Velocity Dissipation", 2, 0.2, 6, 0.1, "How quickly motion fades."),
      range("PRESSURE", "Pressure", 0.1, 0, 1, 0.01, "Pressure solve strength."),
      range("CURL", "Curl", 3, 0, 20, 0.5, "Vorticity curl."),
      range("SIM_RESOLUTION", "Simulation Resolution", 128, 64, 256, 1, "Simulation resolution.", "advanced"),
      range("DYE_RESOLUTION", "Dye Resolution", 1440, 256, 2048, 16, "Dye resolution.", "advanced"),
      bool("SHADING", "Shading", true, "Adds shading to the fluid.", "advanced"),
      color("BACK_COLOR", "Back Color", "#000000", "Background color.", "advanced"),
      bool("TRANSPARENT", "Transparent", true, "Keeps the canvas background transparent.", "advanced")
    ]),
    dependencies: []
  },
  {
    slug: "image-trail",
    title: "Image Trail",
    category: "media",
    sourceUrl: "https://reactbits.dev/animations/image-trail",
    description: "Pointer-following image trail using local placeholder artwork and selectable animation variants.\nsource: https://reactbits.dev/animations/image-trail",
    visualStyle: "Artwork cards appear along pointer movement with scale, clip, or transform trails.",
    motionLogic: "Uses GSAP-driven trail images with a selectable variant number from the reference implementation.",
    defaultProps: withRendererProps("image-trail", {
      variant: 1
    }),
    controls: withRenderer("image-trail", [
      range("variant", "Variant", 1, 1, 8, 1, "Trail animation variant.")
    ]),
    dependencies: ["gsap"]
  },
  {
    slug: "shape-blur",
    title: "Shape Blur",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/shape-blur",
    description: "Pointer-reactive shader shape with round-rect, circle, ring, and polygon variations.\nsource: https://reactbits.dev/animations/shape-blur",
    visualStyle: "A white shader outline blooms and blurs around the pointer over a dark grid.",
    motionLogic: "Uses a Three.js ShaderMaterial with mouse-damped uniforms for shape, border, roundness, and circle edge response.",
    defaultProps: withRendererProps("shape-blur", {
      variation: 0,
      pixelRatioProp: 2,
      shapeSize: 1.2,
      roundness: 0.4,
      borderSize: 0.05,
      circleSize: 0.3,
      circleEdge: 0.5
    }),
    controls: withRenderer("shape-blur", [
      range("variation", "Variation", 0, 0, 3, 1, "Shape variation."),
      range("shapeSize", "Shape Size", 1.2, 0.2, 2, 0.05, "Base shape size."),
      range("roundness", "Roundness", 0.4, 0, 1, 0.01, "Round rectangle radius."),
      range("borderSize", "Border Size", 0.05, 0.005, 0.2, 0.005, "Stroke thickness."),
      range("circleSize", "Circle Size", 0.3, 0.05, 1, 0.01, "Pointer circle radius."),
      range("circleEdge", "Circle Edge", 0.5, 0.05, 1, 0.01, "Pointer circle softness."),
      range("pixelRatioProp", "Pixel Ratio", 2, 1, 3, 0.5, "Maximum pixel ratio.", "advanced")
    ]),
    dependencies: ["three"]
  },
  {
    slug: "strands",
    title: "Strands",
    category: "components",
    sourceUrl: "https://reactbits.dev/animations/strands",
    description: "OGL strand field with palette, density, amplitude, waviness, glow, opacity, scale, and glass controls.\nsource: https://reactbits.dev/animations/strands",
    visualStyle: "Fine luminous strands ripple across a dark field behind a quiet label.",
    motionLogic: "Runs an OGL fragment shader with color palette sampling and strand parameters for count, speed, amplitude, thickness, glow, taper, and spread.",
    defaultProps: withRendererProps("strands", {
      color0: "#b7d075",
      color1: "#8bd3ff",
      color2: "#f5f5f7",
      count: 70,
      speed: 1,
      amplitude: 1,
      waviness: 1,
      thickness: 1,
      glow: 0.35,
      intensity: 1,
      saturation: 1,
      opacity: 1,
      scale: 1,
      glass: false
    }),
    controls: withRenderer("strands", [
      color("color0", "Color 1", "#b7d075", "First palette color."),
      color("color1", "Color 2", "#8bd3ff", "Second palette color."),
      color("color2", "Color 3", "#f5f5f7", "Third palette color."),
      range("count", "Count", 70, 8, 160, 1, "Number of strands."),
      range("speed", "Speed", 1, 0, 4, 0.05, "Animation speed."),
      range("amplitude", "Amplitude", 1, 0, 3, 0.05, "Wave amplitude."),
      range("waviness", "Waviness", 1, 0, 4, 0.05, "Wave frequency."),
      range("thickness", "Thickness", 1, 0.2, 4, 0.05, "Strand thickness."),
      range("glow", "Glow", 0.35, 0, 2, 0.05, "Glow strength."),
      range("intensity", "Intensity", 1, 0, 3, 0.05, "Overall intensity.", "advanced"),
      range("saturation", "Saturation", 1, 0, 2, 0.05, "Color saturation.", "advanced"),
      range("opacity", "Opacity", 1, 0, 1, 0.01, "Canvas opacity.", "advanced"),
      range("scale", "Scale", 1, 0.25, 2.5, 0.05, "Shader scale.", "advanced"),
      bool("glass", "Glass", false, "Adds glass-like processing.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  {
    slug: "magnet-lines",
    title: "Magnet Lines",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/magnet-lines",
    description: "Grid of line segments that rotate toward the pointer like a magnetic field.\nsource: https://reactbits.dev/animations/magnet-lines",
    visualStyle: "A centered line grid smoothly aligns to cursor position over a dark surface.",
    motionLogic: "Each line computes the angle from its center to the pointer and updates a CSS rotation variable.",
    defaultProps: withRendererProps("magnet-lines", {
      rows: 12,
      columns: 16,
      lineColor: "#f5f5f7",
      lineWidth: 2,
      lineHeight: 18,
      baseAngle: 0
    }),
    controls: withRenderer("magnet-lines", [
      range("rows", "Rows", 12, 4, 24, 1, "Line grid rows."),
      range("columns", "Columns", 16, 4, 28, 1, "Line grid columns."),
      color("lineColor", "Line Color", "#f5f5f7", "Line segment color."),
      range("lineWidth", "Line Width", 2, 1, 8, 1, "Line width.", "primary", "px"),
      range("lineHeight", "Line Height", 18, 6, 42, 1, "Line height.", "primary", "px"),
      range("baseAngle", "Base Angle", 0, -90, 90, 1, "Initial line rotation.", "advanced")
    ]),
    dependencies: []
  },
  {
    slug: "glare-hover",
    title: "Glare Hover",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/glare-hover",
    description: "Hover glare card with configurable angle, glare size, opacity, duration, background, and border.\nsource: https://reactbits.dev/animations/glare-hover",
    visualStyle: "A restrained dark card reveals a diagonal light sweep when hovered.",
    motionLogic: "Uses CSS custom properties and pseudo-element animation to drive the glare sweep.",
    defaultProps: withRendererProps("glare-hover", {
      background: "#111114",
      borderRadius: 18,
      borderColor: "rgba(255,255,255,0.18)",
      glareColor: "#ffffff",
      glareOpacity: 0.35,
      glareAngle: -30,
      glareSize: 300,
      transitionDuration: 800,
      playOnce: false
    }),
    controls: withRenderer("glare-hover", [
      color("glareColor", "Glare Color", "#ffffff", "Color of the glare sweep."),
      range("glareOpacity", "Glare Opacity", 0.35, 0, 1, 0.01, "Opacity of the glare sweep."),
      range("glareAngle", "Glare Angle", -30, -90, 90, 1, "Glare sweep angle.", "primary", "deg"),
      range("glareSize", "Glare Size", 300, 100, 600, 10, "Size of the glare gradient.", "primary", "%"),
      range("transitionDuration", "Duration", 800, 200, 2400, 50, "Glare transition duration.", "primary", "ms"),
      color("background", "Background", "#111114", "Card background."),
      range("borderRadius", "Radius", 18, 0, 48, 1, "Card radius.", "advanced", "px"),
      text("borderColor", "Border Color", "rgba(255,255,255,0.18)", "Card border color.", "advanced"),
      bool("playOnce", "Play Once", false, "Runs the glare only once.", "advanced")
    ]),
    dependencies: []
  },
  {
    slug: "rotating-text",
    title: "Rotating Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/rotating-text",
    description: "Motion-powered word replacement with split-level stagger controls and timed rotation.\nsource: https://reactbits.dev/text-animations/rotating-text",
    visualStyle: "A stable sentence swaps its final word inside an accent pill.",
    motionLogic: "Uses AnimatePresence and split text children to animate words, characters, or lines in and out.",
    defaultProps: withRendererProps("rotating-text", {
      texts: "alive|quiet|precise",
      rotationInterval: 2400,
      staggerDuration: 0.025,
      staggerFrom: "first",
      splitBy: "characters",
      loop: true,
      auto: true
    }),
    controls: withRenderer("rotating-text", [
      text("texts", "Texts", "alive|quiet|precise", "Pipe or newline separated replacement words.", "primary"),
      range("rotationInterval", "Interval", 2400, 600, 6000, 100, "Time between rotations.", "primary", "ms"),
      range("staggerDuration", "Stagger", 0.025, 0, 0.2, 0.005, "Delay between split items.", "primary", "s"),
      select("staggerFrom", "Stagger From", "first", ["first", "last", "center", "random"], "Split animation origin."),
      select("splitBy", "Split By", "characters", ["characters", "words", "lines"], "How text is split for animation."),
      bool("loop", "Loop", true, "Loops through all text values.", "advanced"),
      bool("auto", "Auto", true, "Automatically rotates text.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  {
    slug: "variable-proximity",
    title: "Variable Proximity",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/variable-proximity",
    description: "Variable font text that morphs font variation settings based on pointer distance.\nsource: https://reactbits.dev/text-animations/variable-proximity",
    visualStyle: "A clean wordmark becomes heavier and more optical near the pointer.",
    motionLogic: "Measures pointer proximity within the container and interpolates from/to font-variation-settings with a selected falloff curve.",
    defaultProps: withRendererProps("variable-proximity", {
      text: "Design Atlas reacts to proximity",
      fromFontVariationSettings: "'wght' 400, 'opsz' 9",
      toFontVariationSettings: "'wght' 900, 'opsz' 40",
      radius: 120,
      falloff: "linear"
    }),
    controls: withRenderer("variable-proximity", [
      text("text", "Text", "Design Atlas reacts to proximity", "Displayed text.", "primary"),
      range("radius", "Radius", 120, 20, 360, 5, "Pointer influence radius.", "primary", "px"),
      select("falloff", "Falloff", "linear", ["linear", "exponential", "gaussian"], "Influence falloff curve."),
      text("fromFontVariationSettings", "From Settings", "'wght' 400, 'opsz' 9", "Base font variation settings.", "advanced"),
      text("toFontVariationSettings", "To Settings", "'wght' 900, 'opsz' 40", "Near-pointer font variation settings.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  {
    slug: "true-focus",
    title: "True Focus",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/true-focus",
    description: "Focus-box text animation with blur, border, glow, duration, and automatic pause controls.\nsource: https://reactbits.dev/text-animations/true-focus",
    visualStyle: "Words alternate between soft blur and a crisp focused frame.",
    motionLogic: "Animates a focus border and blur state across words using motion transitions and timed cycling.",
    defaultProps: withRendererProps("true-focus", {
      text: "Design Atlas stays focused",
      manualMode: false,
      blurAmount: 5,
      borderColor: "#b7d075",
      glowColor: "rgba(183, 208, 117, 0.55)",
      animationDuration: 0.5,
      pauseBetweenAnimations: 1
    }),
    controls: withRenderer("true-focus", [
      text("text", "Text", "Design Atlas stays focused", "Focused sentence.", "primary"),
      bool("manualMode", "Manual Mode", false, "Focuses words on hover instead of timer."),
      range("blurAmount", "Blur", 5, 0, 16, 0.5, "Blur applied to unfocused words.", "primary", "px"),
      color("borderColor", "Border Color", "#b7d075", "Focus frame border color."),
      text("glowColor", "Glow Color", "rgba(183, 208, 117, 0.55)", "Focus frame glow color.", "advanced"),
      range("animationDuration", "Duration", 0.5, 0.1, 2, 0.05, "Focus transition duration.", "primary", "s"),
      range("pauseBetweenAnimations", "Pause", 1, 0.2, 4, 0.1, "Pause between automatic focus changes.", "advanced", "s")
    ]),
    dependencies: ["motion"]
  },
  {
    slug: "decrypted-text",
    title: "Decrypted Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/decrypted-text",
    description: "Scrambled text reveal with speed, iteration, sequence, direction, character set, and trigger controls.\nsource: https://reactbits.dev/text-animations/decrypted-text",
    visualStyle: "Characters resolve from a controlled encrypted state into readable display text.",
    motionLogic: "Iteratively replaces encrypted characters until the original text is revealed, optionally sequentially and by direction.",
    defaultProps: withRendererProps("decrypted-text", {
      text: "Design Atlas decrypts motion",
      speed: 45,
      maxIterations: 18,
      sequential: true,
      revealDirection: "start",
      useOriginalCharsOnly: false,
      characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      animateOn: "view"
    }),
    controls: withRenderer("decrypted-text", [
      text("text", "Text", "Design Atlas decrypts motion", "Displayed text.", "primary"),
      range("speed", "Speed", 45, 10, 180, 5, "Iteration speed.", "primary", "ms"),
      range("maxIterations", "Max Iterations", 18, 2, 50, 1, "Maximum iterations per character."),
      bool("sequential", "Sequential", true, "Reveals characters in sequence."),
      select("revealDirection", "Direction", "start", ["start", "end", "center"], "Reveal direction."),
      bool("useOriginalCharsOnly", "Original Chars Only", false, "Scrambles only from characters in the original text.", "advanced"),
      text("characters", "Characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", "Scramble character set.", "advanced"),
      select("animateOn", "Animate On", "view", ["view", "hover"], "Trigger mode.")
    ]),
    dependencies: []
  }
];

function propDocs(definition: NotionInboxDefinition) {
  return definition.controls
    .filter((control) => control.level !== "hidden")
    .map((control) => ({
      property: control.key,
      type: control.type === "range" || control.type === "number" ? "number" : control.type === "boolean" ? "boolean" : "string",
      defaultValue: definition.defaultProps[control.key] ?? control.defaultValue,
      description: control.description ?? control.label
    }));
}

function createEffect(definition: NotionInboxDefinition): DesignEffect {
  const sourceName = sourceNameFromUrl(definition.sourceUrl);
  const description = cleanDescription(definition.description);
  const codeFiles = codeFilesForDefinition(definition);
  const notes = notesForDefinition(definition, description);

  return {
    id: `notion-${definition.slug}`,
    slug: definition.slug,
    title: definition.title,
    type: definition.title,
    componentName: "NotionInboxPreview",
    category: definition.category,
    status: "implemented",
    description,
    tags: ["notion-inbox", "source-reference", ...(definition.tags ?? [])],
    useCases: getUseCasesForDefinition(definition),
    sourceUrl: definition.sourceUrl,
    licenseNote: licenseNoteForDefinition(),
    note: notes,
    visualStyle: definition.visualStyle,
    motionLogic: definition.motionLogic,
    reusable: {
      componentName: "NotionInboxPreview",
      componentPath: "src/content/effects/notion-inbox/NotionInboxPreview.tsx",
      demoPath: `/workbench/${definition.category}/${definition.slug}`,
      codeType: definition.category === "backgrounds" ? "canvas" : "react"
    },
    previewComponent: NotionInboxPreview,
    defaultProps: definition.defaultProps,
    controls: definition.controls,
    parameters: definition.controls,
    propsDocs: propDocs(definition),
    dependencies: definition.dependencies,
    codeFiles,
    code: codeFiles[0]?.code,
    prompt: promptForDefinition(definition, description, sourceName),
    notes,
    source: sourceForDefinition(definition, sourceName),
    createdAt: "2026-07-03T03:42:25.462Z",
    updatedAt: "2026-07-03T04:15:00.000Z"
  };
}

export const notionInboxEffects: DesignEffect[] = definitions.map(createEffect);
