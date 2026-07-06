import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import GlareHoverSource from "./GlareHover.tsx?raw";
import GlareHoverStyles from "./GlareHover.css?raw";
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

export const glareHoverEffect = createImportedEffect({
  ...{
    slug: "glare-hover",
    title: "Glare Hover",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/glare-hover",
    description: "Hover glare card with configurable angle, glare size, opacity, duration, background, and border.\nsource: https://reactbits.dev/animations/glare-hover",
    visualStyle: "A restrained dark card reveals a diagonal light sweep when hovered.",
    motionLogic: "Uses CSS custom properties and pseudo-element animation to drive the glare sweep.",
    defaultProps: withRendererProps("glare-hover", {
      background: "#111114",
      borderRadius: 18,
      borderColor: "rgba(255,255,255,0.18)",
      glareColor: "#ffffff",
      glareOpacity: 0.35,
      glareAngle: -30,
      glareSize: 300,
      transitionDuration: 800,
      playOnce: false
    }),
    controls: withRenderer("glare-hover", [
      color("glareColor", "Glare Color", "#ffffff", "Color of the glare sweep."),
      range("glareOpacity", "Glare Opacity", 0.35, 0, 1, 0.01, "Opacity of the glare sweep."),
      range("glareAngle", "Glare Angle", -30, -90, 90, 1, "Glare sweep angle.", "primary", "deg"),
      range("glareSize", "Glare Size", 300, 100, 600, 10, "Size of the glare gradient.", "primary", "%"),
      range("transitionDuration", "Duration", 800, 200, 2400, 50, "Glare transition duration.", "primary", "ms"),
      color("background", "Background", "#111114", "Card background."),
      range("borderRadius", "Radius", 18, 0, 48, 1, "Card radius.", "advanced", "px"),
      text("borderColor", "Border Color", "rgba(255,255,255,0.18)", "Card border color.", "advanced"),
      bool("playOnce", "Play Once", false, "Runs the glare only once.", "advanced")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("GlareHover.tsx", "tsx", GlareHoverSource),
  codeFile("GlareHover.css", "css", GlareHoverStyles)
  ]
});
