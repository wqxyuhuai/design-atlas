import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import FlowingMenuSource from "./FlowingMenu.tsx?raw";
import FlowingMenuStyles from "./FlowingMenu.css?raw";
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

export const flowingMenuEffect = createImportedEffect({
  ...{
    slug: "flowing-menu",
    title: "Flowing Menu",
    category: "media",
    sourceUrl: "https://reactbits.dev/components/flowing-menu",
    description: "Hover-driven media menu with directional marquee reveal and image strips.\nsource: https://reactbits.dev/components/flowing-menu",
    visualStyle: "Stacked horizontal menu rows reveal moving image-and-label marquees on hover.",
    motionLogic: "Uses GSAP timelines for edge-aware hover entry/exit and a looping marquee driven by speed, color, and border controls.",
    defaultProps: withRendererProps("flowing-menu", {
      speed: 15,
      textColor: "#f5f5f7",
      bgColor: "#09090b",
      marqueeBgColor: "#b7d075",
      marqueeTextColor: "#050505",
      borderColor: "rgba(255,255,255,0.18)"
    }),
    controls: withRenderer("flowing-menu", [
      range("speed", "Speed", 15, 6, 30, 1, "Duration of the marquee loop.", "primary", "s"),
      color("textColor", "Text Color", "#f5f5f7", "Base row text color."),
      color("bgColor", "Background", "#09090b", "Menu background color."),
      color("marqueeBgColor", "Marquee Background", "#b7d075", "Hover marquee background."),
      color("marqueeTextColor", "Marquee Text", "#050505", "Hover marquee text color."),
      text("borderColor", "Border Color", "rgba(255,255,255,0.18)", "Row divider color.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("FlowingMenu.tsx", "tsx", FlowingMenuSource),
  codeFile("FlowingMenu.css", "css", FlowingMenuStyles)
  ]
});
