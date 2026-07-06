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
    visualStyle: "A black portfolio viewport holds curved artwork cards that orbit through a vertical spiral, with minimal top controls, a menu pill, and a small showreel thumbnail.",
    motionLogic: "Uses a React Three Fiber scene with world-masterpiece placeholder textures, curved double-sided shader cards, the Pacome-style vertical helix formula, wheel-damped scroll offset, and subtle pointer parallax for a portfolio-style media navigation surface.",
    defaultProps: withRendererProps("spiral-showreel-gallery", {
      cardCount: 20,
      radius: 42,
      bend: 28,
      autoSpeed: 0.72
    }),
    controls: withRenderer("spiral-showreel-gallery", [
      range("cardCount", "Card Count", 20, 8, 20, 1, "Number of artwork images before the loop is duplicated."),
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
