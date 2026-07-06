import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import ShapeBlurSource from "./ShapeBlur.tsx?raw";
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

export const shapeBlurEffect = createImportedEffect({
  ...{
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
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("ShapeBlur.tsx", "tsx", ShapeBlurSource)
  ]
});
