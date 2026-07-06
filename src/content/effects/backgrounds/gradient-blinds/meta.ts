import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import GradientBlindsSource from "./GradientBlinds.tsx?raw";
import GradientBlindsStyles from "./GradientBlinds.css?raw";
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

export const gradientBlindsEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("GradientBlinds.tsx", "tsx", GradientBlindsSource),
  codeFile("GradientBlinds.css", "css", GradientBlindsStyles)
  ]
});
