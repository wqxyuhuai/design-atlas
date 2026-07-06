import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
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

export const curvedScrollGalleryEffect = createImportedEffect({
  ...{
    slug: "curved-scroll-gallery",
    title: "Curved Scroll Gallery",
    category: "media",
    sourceUrl: "https://webgl-magazine.vercel.app/",
    description: "Curved magazine-style scroll gallery with cards distributed along a soft horizontal arc.\nsource: https://webgl-magazine.vercel.app/",
    visualStyle: "A fixed dark editorial viewport with a dense row of thin WebGL magazine pages crossing the middle of the screen.",
    motionLogic: "Uses a React Three Fiber instanced shader scene inspired by the original WebGL Magazine structure: wheel input feeds unbounded gallery travel, each page wraps through the center, and scroll speed bends the page geometry while it settles.",
    defaultProps: withRendererProps("curved-scroll-gallery", {
      imageCount: 56,
      curveDepth: 62,
      bendStrength: 34
    }),
    controls: withRenderer("curved-scroll-gallery", [
      range("imageCount", "Image Count", 56, 24, 72, 1, "Number of instanced pages in the WebGL strip."),
      range("curveDepth", "Curve Depth", 62, 0, 120, 1, "Vertical depth of the scroll arc.", "primary", "px"),
      range("bendStrength", "Bend Strength", 34, 0, 58, 1, "Horizontal track bend while scroll velocity is high.")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource)
  ]
});
