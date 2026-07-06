import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import TrueFocusSource from "./TrueFocus.tsx?raw";
import TrueFocusStyles from "./TrueFocus.css?raw";
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

export const trueFocusEffect = createImportedEffect({
  ...{
    slug: "true-focus",
    title: "True Focus",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/true-focus",
    description: "Focus-box text animation with blur, border, glow, duration, and automatic pause controls.\nsource: https://reactbits.dev/text-animations/true-focus",
    visualStyle: "Words alternate between soft blur and a crisp focused frame.",
    motionLogic: "Animates a focus border and blur state across words using motion transitions and timed cycling.",
    defaultProps: withRendererProps("true-focus", {
      text: "Design Atlas stays focused",
      manualMode: false,
      blurAmount: 5,
      borderColor: "#b7d075",
      glowColor: "rgba(183, 208, 117, 0.55)",
      animationDuration: 0.5,
      pauseBetweenAnimations: 1
    }),
    controls: withRenderer("true-focus", [
      text("text", "Text", "Design Atlas stays focused", "Focused sentence.", "primary"),
      bool("manualMode", "Manual Mode", false, "Focuses words on hover instead of timer."),
      range("blurAmount", "Blur", 5, 0, 16, 0.5, "Blur applied to unfocused words.", "primary", "px"),
      color("borderColor", "Border Color", "#b7d075", "Focus frame border color."),
      text("glowColor", "Glow Color", "rgba(183, 208, 117, 0.55)", "Focus frame glow color.", "advanced"),
      range("animationDuration", "Duration", 0.5, 0.1, 2, 0.05, "Focus transition duration.", "primary", "s"),
      range("pauseBetweenAnimations", "Pause", 1, 0.2, 4, 0.1, "Pause between automatic focus changes.", "advanced", "s")
    ]),
    dependencies: ["motion"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("TrueFocus.tsx", "tsx", TrueFocusSource),
  codeFile("TrueFocus.css", "css", TrueFocusStyles)
  ]
});
