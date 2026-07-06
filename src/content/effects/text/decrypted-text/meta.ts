import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import DecryptedTextSource from "./DecryptedText.tsx?raw";
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

export const decryptedTextEffect = createImportedEffect({
  ...{
    slug: "decrypted-text",
    title: "Decrypted Text",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/decrypted-text",
    description: "Scrambled text reveal with speed, iteration, sequence, direction, character set, and trigger controls.\nsource: https://reactbits.dev/text-animations/decrypted-text",
    visualStyle: "Characters resolve from a controlled encrypted state into readable display text.",
    motionLogic: "Iteratively replaces encrypted characters until the original text is revealed, optionally sequentially and by direction.",
    defaultProps: withRendererProps("decrypted-text", {
      text: "Design Atlas decrypts motion",
      speed: 45,
      maxIterations: 18,
      sequential: true,
      revealDirection: "start",
      useOriginalCharsOnly: false,
      characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      animateOn: "view"
    }),
    controls: withRenderer("decrypted-text", [
      text("text", "Text", "Design Atlas decrypts motion", "Displayed text.", "primary"),
      range("speed", "Speed", 45, 10, 180, 5, "Iteration speed.", "primary", "ms"),
      range("maxIterations", "Max Iterations", 18, 2, 50, 1, "Maximum iterations per character."),
      bool("sequential", "Sequential", true, "Reveals characters in sequence."),
      select("revealDirection", "Direction", "start", ["start", "end", "center"], "Reveal direction."),
      bool("useOriginalCharsOnly", "Original Chars Only", false, "Scrambles only from characters in the original text.", "advanced"),
      text("characters", "Characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", "Scramble character set.", "advanced"),
      select("animateOn", "Animate On", "view", ["view", "hover"], "Trigger mode.")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("DecryptedText.tsx", "tsx", DecryptedTextSource)
  ]
});
