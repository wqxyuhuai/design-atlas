import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import StrandsSource from "./Strands.tsx?raw";
import StrandsStyles from "./Strands.css?raw";
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

export const strandsEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("Strands.tsx", "tsx", StrandsSource),
  codeFile("Strands.css", "css", StrandsStyles)
  ]
});
