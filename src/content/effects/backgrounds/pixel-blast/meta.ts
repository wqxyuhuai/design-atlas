import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import PixelBlastSource from "./PixelBlast.tsx?raw";
import PixelBlastStyles from "./PixelBlast.css?raw";
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

export const pixelBlastEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("PixelBlast.tsx", "tsx", PixelBlastSource),
  codeFile("PixelBlast.css", "css", PixelBlastStyles)
  ]
});
