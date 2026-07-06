import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import MagnetLinesSource from "./MagnetLines.tsx?raw";
import MagnetLinesStyles from "./MagnetLines.css?raw";
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

export const magnetLinesEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("MagnetLines.tsx", "tsx", MagnetLinesSource),
  codeFile("MagnetLines.css", "css", MagnetLinesStyles)
  ]
});
