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

export const orbitGalleryEffect = createImportedEffect({
  ...{
    slug: "orbit-gallery",
    title: "Orbit Gallery",
    category: "media",
    sourceUrl: "https://portfolio2021.michalzalobny.com/orbit-gallery",
    description: "Black portfolio gallery with a scroll-driven image field, rotated editorial type, and velocity-based 3D bending.\nsource: https://portfolio2021.michalzalobny.com/orbit-gallery",
    visualStyle: "A black editorial viewport contains a wide three-column image field behind a rotated serif wordmark.",
    motionLogic: "Captures wheel input into an internal scroll field, keeps images upright, and uses pointer parallax plus velocity-driven rotateX, depth, and vertical stretch to match the reference page's fixed black viewport and rotated title overlay.",
    defaultProps: withRendererProps("orbit-gallery", {
      imageCount: 21,
      bendStrength: 37,
      pointerParallax: 24
    }),
    controls: withRenderer("orbit-gallery", [
      range("imageCount", "Image Count", 21, 9, 30, 1, "Number of images in the repeated scroll field."),
      range("bendStrength", "Bend Strength", 37, 0, 58, 1, "3D bend applied while scrolling.", "primary"),
      range("pointerParallax", "Pointer Parallax", 24, 0, 48, 1, "Horizontal pointer drift.", "primary", "px")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource)
  ]
});
