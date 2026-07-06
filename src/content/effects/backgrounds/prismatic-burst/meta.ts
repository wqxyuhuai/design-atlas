import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import PrismaticBurstSource from "./PrismaticBurst.tsx?raw";
import PrismaticBurstStyles from "./PrismaticBurst.css?raw";
import {
  bool,
  codeFile,
  color,
  createImportedEffect,
  range,
  select,
  text,
  withRenderer,
  withRendererProps
} from "../../_shared/importedEffectFactory";

export const prismaticBurstEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("PrismaticBurst.tsx", "tsx", PrismaticBurstSource),
  codeFile("PrismaticBurst.css", "css", PrismaticBurstStyles)
  ]
});
