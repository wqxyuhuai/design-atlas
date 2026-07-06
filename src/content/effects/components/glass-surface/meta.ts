import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import GlassSurfaceSource from "./GlassSurface.tsx?raw";
import GlassSurfaceStyles from "./GlassSurface.css?raw";
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

export const glassSurfaceEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("GlassSurface.tsx", "tsx", GlassSurfaceSource),
  codeFile("GlassSurface.css", "css", GlassSurfaceStyles)
  ]
});
