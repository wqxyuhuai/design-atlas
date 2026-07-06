import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import CardSwapSource from "./CardSwap.tsx?raw";
import CardSwapStyles from "./CardSwap.css?raw";
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

export const cardSwapEffect = createImportedEffect({
  ...{
    slug: "card-swap",
    title: "Card Swap",
    category: "media",
    sourceUrl: "https://reactbits.dev/components/card-swap",
    description: "Timed stacked-card exchange with perspective, skew, and hover pause controls.\nsource: https://reactbits.dev/components/card-swap",
    visualStyle: "Image cards sit in a layered 3D stack and cycle forward with elastic movement.",
    motionLogic: "Uses a GSAP timeline to drop the front card, promote the stack, and return the card to the back slot.",
    defaultProps: withRendererProps("card-swap", {
      cardDistance: 54,
      verticalDistance: 64,
      delay: 4200,
      pauseOnHover: true,
      skewAmount: 6,
      easing: "elastic"
    }),
    controls: withRenderer("card-swap", [
      range("cardDistance", "Card Distance", 54, 20, 110, 1, "Horizontal distance between stacked cards."),
      range("verticalDistance", "Vertical Distance", 64, 20, 130, 1, "Vertical distance between stacked cards."),
      range("delay", "Delay", 4200, 1200, 9000, 100, "Time between card swaps.", "primary", "ms"),
      bool("pauseOnHover", "Pause On Hover", true, "Pauses swapping on hover."),
      range("skewAmount", "Skew", 6, 0, 14, 0.5, "Perspective skew applied to cards."),
      select("easing", "Easing", "elastic", ["elastic", "linear"], "Swap motion curve.")
    ]), 
    dependencies: ["gsap"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("CardSwap.tsx", "tsx", CardSwapSource),
  codeFile("CardSwap.css", "css", CardSwapStyles)
  ]
});
