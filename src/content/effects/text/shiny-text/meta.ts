import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import ShinyTextSource from "./ShinyText.tsx?raw";
import ShinyTextStyles from "./ShinyText.css?raw";
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

export const shinyTextEffect = createImportedEffect({
  ...{
    slug: "shiny-text",
    title: "Shiny Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/shiny-text",
    description: "Motion-powered text shimmer using the source component's color, shineColor, speed, delay, spread, yoyo, hover, and direction props.\nsource: https://reactbits.dev/text-animations/shiny-text",
    visualStyle: "A subtle shine highlight sweeps across muted text.",
    motionLogic: "Uses the adapted ShinyText component with motion values and animation-frame progress.",
    defaultProps: withRendererProps("shiny-text", {
      text: "Shiny Text Effect",
      speed: 2,
      delay: 0,
      color: "#b5b5b5",
      shineColor: "#ffffff",
      spread: 120,
      direction: "left",
      yoyo: false,
      pauseOnHover: false,
      disabled: false
    }),
    controls: withRenderer("shiny-text", [
      text("text", "Text", "Shiny Text Effect", "Displayed text.", "primary"),
      color("color", "Base Color", "#b5b5b5", "Base text color."),
      color("shineColor", "Shine Color", "#ffffff", "Highlight color."),
      range("speed", "Speed", 2, 0.2, 8, 0.1, "Duration of one cycle.", "primary", "s"),
      range("delay", "Delay", 0, 0, 5, 0.1, "Pause between cycles.", "advanced", "s"),
      range("spread", "Spread", 120, 0, 180, 1, "Gradient angle/spread."),
      select("direction", "Direction", "left", ["left", "right"], "Shine direction."),
      bool("yoyo", "Yoyo", false, "Reverses the animation every cycle.", "advanced"),
      bool("pauseOnHover", "Pause On Hover", false, "Pauses on hover.", "advanced"),
      bool("disabled", "Disabled", false, "Disables animation.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("ShinyText.tsx", "tsx", ShinyTextSource),
  codeFile("ShinyText.css", "css", ShinyTextStyles)
  ]
});
