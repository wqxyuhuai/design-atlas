import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import TextPressureSource from "./TextPressure.tsx?raw";
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

export const textPressureEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("TextPressure.tsx", "tsx", TextPressureSource)
  ]
});
