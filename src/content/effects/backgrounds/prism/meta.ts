import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import PrismSource from "./Prism.tsx?raw";
import PrismStyles from "./Prism.css?raw";
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

export const prismEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("Prism.tsx", "tsx", PrismSource),
  codeFile("Prism.css", "css", PrismStyles)
  ]
});
