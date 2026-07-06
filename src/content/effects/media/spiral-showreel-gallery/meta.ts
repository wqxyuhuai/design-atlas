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

export const spiralShowreelGalleryEffect = createImportedEffect({
  ...{
    slug: "spiral-showreel-gallery",
    title: "Spiral Showreel Gallery",
    category: "media",
    sourceUrl: "https://pacomepertant.com/",
    description: "Dark portfolio home effect with floating media cards arranged in a depth-based spiral showreel.\nsource: https://pacomepertant.com/",
    visualStyle: "A black grid viewport holds curved media cards that orbit through a loose spiral, with minimal top controls, a menu pill, and a small showreel thumbnail.",
    motionLogic: "Uses a React Three Fiber scene with generated showreel textures, curved double-sided shader cards, a depth-based vertical helix, slow automatic drift, wheel-driven phase changes, and subtle pointer parallax for a portfolio-style media navigation surface.",
    defaultProps: withRendererProps("spiral-showreel-gallery", {
      cardCount: 16,
      radius: 42,
      bend: 28,
      autoSpeed: 0.72
    }),
    controls: withRenderer("spiral-showreel-gallery", [
      range("cardCount", "Card Count", 16, 8, 22, 1, "Number of floating cards in the spiral."),
      range("radius", "Radius", 42, 24, 68, 1, "Distance of cards from the spiral center.", "primary"),
      range("bend", "Card Bend", 28, 0, 52, 1, "Amount of curved card surface deformation.", "primary"),
      range("autoSpeed", "Auto Speed", 0.72, 0, 1.8, 0.01, "Default spiral drift speed.", "primary")
    ]),
    dependencies: ["@react-three/fiber", "three"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource)
  ]
});
