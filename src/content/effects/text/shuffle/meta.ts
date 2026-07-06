import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import ShuffleSource from "./Shuffle.tsx?raw";
import ShuffleStyles from "./Shuffle.css?raw";
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

export const shuffleEffect = createImportedEffect({
  ...{
    slug: "shuffle",
    title: "Shuffle",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/shuffle",
    description: "GSAP per-letter shuffle animation with direction, timing, stagger, loop, scramble charset, colors, and hover trigger.\nsource: https://reactbits.dev/text-animations/shuffle",
    visualStyle: "Letters slide and scramble into place with a compact strip reveal.",
    motionLogic: "Uses the adapted Shuffle component with SplitText and GSAP timelines.",
    defaultProps: withRendererProps("shuffle", {
      text: "Hello World",
      shuffleDirection: "right",
      duration: 0.35,
      maxDelay: 0,
      ease: "power3.out",
      shuffleTimes: 1,
      animationMode: "evenodd",
      loop: false,
      loopDelay: 0,
      stagger: 0.03,
      scrambleCharset: "",
      colorFrom: "#b5b5b5",
      colorTo: "#ffffff",
      triggerOnHover: true
    }),
    controls: withRenderer("shuffle", [
      text("text", "Text", "Hello World", "Text content to shuffle.", "primary"),
      select("shuffleDirection", "Direction", "right", ["left", "right", "up", "down"], "Direction the strip slides."),
      range("duration", "Duration", 0.35, 0.1, 2, 0.05, "Duration per letter.", "primary", "s"),
      range("stagger", "Stagger", 0.03, 0, 0.2, 0.01, "Delay between letters."),
      range("shuffleTimes", "Shuffle Times", 1, 1, 8, 1, "How many times characters shuffle."),
      select("animationMode", "Mode", "evenodd", ["evenodd", "random"], "Delay mode."),
      bool("triggerOnHover", "Trigger On Hover", true, "Starts on hover."),
      bool("loop", "Loop", false, "Loops the animation.", "advanced"),
      range("loopDelay", "Loop Delay", 0, 0, 5, 0.1, "Delay between loops.", "advanced", "s"),
      range("maxDelay", "Max Delay", 0, 0, 2, 0.05, "Max random delay in random mode.", "advanced", "s"),
      text("ease", "Ease", "power3.out", "GSAP ease string."),
      text("scrambleCharset", "Scramble Charset", "", "Optional scramble character set."),
      color("colorFrom", "Color From", "#b5b5b5", "Initial text color.", "advanced"),
      color("colorTo", "Color To", "#ffffff", "Final text color.", "advanced")
    ]),
    dependencies: ["gsap", "@gsap/react"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("Shuffle.tsx", "tsx", ShuffleSource),
  codeFile("Shuffle.css", "css", ShuffleStyles)
  ]
});
