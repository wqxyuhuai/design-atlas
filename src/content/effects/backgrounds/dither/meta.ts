import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import DitherSource from "./Dither.tsx?raw";
import DitherStyles from "./Dither.css?raw";
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

export const ditherEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("Dither.tsx", "tsx", DitherSource),
  codeFile("Dither.css", "css", DitherStyles)
  ]
});
