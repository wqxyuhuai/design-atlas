import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import TextTypeSource from "./TextType.tsx?raw";
import TextTypeStyles from "./TextType.css?raw";
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

export const textTypeEffect = createImportedEffect({
  ...{
    slug: "text-type",
    title: "Text Type",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/text-type",
    description: "GSAP cursor-blink typewriter for string arrays with typing/deleting speed, pause, loop, cursor, variable speed, and reverse mode.\nsource: https://reactbits.dev/text-animations/text-type",
    visualStyle: "A clean typewriter line cycles through short phrases with a blinking cursor.",
    motionLogic: "Uses the adapted TextType state machine and GSAP cursor blink.",
    defaultProps: withRendererProps("text-type", {
      texts: "Text typing effect|for your websites|Happy coding!",
      typingSpeed: 75,
      initialDelay: 0,
      pauseDuration: 1500,
      deletingSpeed: 50,
      showCursor: true,
      hideCursorWhileTyping: false,
      cursorCharacter: "_",
      cursorBlinkDuration: 0.5,
      variableSpeedEnabled: false,
      variableSpeedMin: 60,
      variableSpeedMax: 120,
      textColor0: "#ffffff",
      textColor1: "#b7d075",
      textColor2: "#ffffff",
      loop: true,
      reverseMode: false
    }),
    controls: withRenderer("text-type", [
      text("texts", "Texts", "Text typing effect|for your websites|Happy coding!", "Pipe or newline separated text list.", "primary"),
      range("typingSpeed", "Typing Speed", 75, 10, 240, 5, "Typing speed.", "primary", "ms"),
      range("pauseDuration", "Pause Duration", 1500, 0, 5000, 100, "Pause between phrases.", "primary", "ms"),
      range("deletingSpeed", "Deleting Speed", 50, 10, 240, 5, "Deleting speed.", "primary", "ms"),
      bool("showCursor", "Show Cursor", true, "Shows cursor."),
      text("cursorCharacter", "Cursor", "_", "Cursor character."),
      range("cursorBlinkDuration", "Cursor Blink", 0.5, 0.1, 2, 0.05, "Cursor blink duration.", "advanced", "s"),
      range("initialDelay", "Initial Delay", 0, 0, 3000, 100, "Initial delay before typing.", "advanced", "ms"),
      bool("hideCursorWhileTyping", "Hide Cursor While Typing", false, "Hides cursor during typing.", "advanced"),
      bool("variableSpeedEnabled", "Variable Speed", false, "Enables random typing speed.", "advanced"),
      range("variableSpeedMin", "Variable Min", 60, 10, 200, 5, "Minimum random speed.", "advanced", "ms"),
      range("variableSpeedMax", "Variable Max", 120, 20, 300, 5, "Maximum random speed.", "advanced", "ms"),
      color("textColor0", "Text Color 1", "#ffffff", "First text color.", "advanced"),
      color("textColor1", "Text Color 2", "#b7d075", "Second text color.", "advanced"),
      color("textColor2", "Text Color 3", "#ffffff", "Third text color.", "advanced"),
      bool("loop", "Loop", true, "Loops phrases.", "advanced"),
      bool("reverseMode", "Reverse Mode", false, "Types in reverse mode.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("TextType.tsx", "tsx", TextTypeSource),
  codeFile("TextType.css", "css", TextTypeStyles)
  ]
});
