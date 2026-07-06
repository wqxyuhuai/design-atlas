import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import ImageTrailSource from "./ImageTrail.tsx?raw";
import ImageTrailStyles from "./ImageTrail.css?raw";
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

export const imageTrailEffect = createImportedEffect({
  ...{
    slug: "image-trail",
    title: "Image Trail",
    category: "media",
    sourceUrl: "https://reactbits.dev/animations/image-trail",
    description: "Pointer-following image trail using local placeholder artwork and selectable animation variants.\nsource: https://reactbits.dev/animations/image-trail",
    visualStyle: "Artwork cards appear along pointer movement with scale, clip, or transform trails.",
    motionLogic: "Uses GSAP-driven trail images with a selectable variant number from the reference implementation.",
    defaultProps: withRendererProps("image-trail", {
      variant: 1
    }),
    controls: withRenderer("image-trail", [
      range("variant", "Variant", 1, 1, 8, 1, "Trail animation variant.")
    ]),
    dependencies: ["gsap"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("ImageTrail.tsx", "tsx", ImageTrailSource),
  codeFile("ImageTrail.css", "css", ImageTrailStyles)
  ]
});
