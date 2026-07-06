import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import RotatingTextSource from "./RotatingText.tsx?raw";
import RotatingTextStyles from "./RotatingText.css?raw";
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

export const rotatingTextEffect = createImportedEffect({
  ...{
    slug: "rotating-text",
    title: "Rotating Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/rotating-text",
    description: "Motion-powered word replacement with split-level stagger controls and timed rotation.\nsource: https://reactbits.dev/text-animations/rotating-text",
    visualStyle: "A stable sentence swaps its final word inside an accent pill.",
    motionLogic: "Uses AnimatePresence and split text children to animate words, characters, or lines in and out.",
    defaultProps: withRendererProps("rotating-text", {
      texts: "alive|quiet|precise",
      rotationInterval: 2400,
      staggerDuration: 0.025,
      staggerFrom: "first",
      splitBy: "characters",
      loop: true,
      auto: true
    }),
    controls: withRenderer("rotating-text", [
      text("texts", "Texts", "alive|quiet|precise", "Pipe or newline separated replacement words.", "primary"),
      range("rotationInterval", "Interval", 2400, 600, 6000, 100, "Time between rotations.", "primary", "ms"),
      range("staggerDuration", "Stagger", 0.025, 0, 0.2, 0.005, "Delay between split items.", "primary", "s"),
      select("staggerFrom", "Stagger From", "first", ["first", "last", "center", "random"], "Split animation origin."),
      select("splitBy", "Split By", "characters", ["characters", "words", "lines"], "How text is split for animation."),
      bool("loop", "Loop", true, "Loops through all text values.", "advanced"),
      bool("auto", "Auto", true, "Automatically rotates text.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("RotatingText.tsx", "tsx", RotatingTextSource),
  codeFile("RotatingText.css", "css", RotatingTextStyles)
  ]
});
