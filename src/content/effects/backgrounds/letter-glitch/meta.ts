import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import LetterGlitchSource from "./LetterGlitch.tsx?raw";
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

export const letterGlitchEffect = createImportedEffect({
  ...{
    slug: "letter-glitch",
    title: "Letter Glitch",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/letter-glitch",
    description: "Canvas character grid with glitch colors, timed scrambling, and optional vignettes.\nsource: https://reactbits.dev/backgrounds/letter-glitch",
    visualStyle: "Dense animated monospace symbols flicker between green, cyan, and dark tones.",
    motionLogic: "Uses glitchColors, glitchSpeed, centerVignette, outerVignette, smooth, and characters from the source component.",
    defaultProps: withRendererProps("letter-glitch", {
      color0: "#2b4539",
      color1: "#61dca3",
      color2: "#61b3dc",
      glitchSpeed: 50,
      centerVignette: true,
      outerVignette: false,
      smooth: true,
      characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
    }),
    controls: withRenderer("letter-glitch", [
      color("color0", "Glitch Color 1", "#2b4539", "First glitch color."),
      color("color1", "Glitch Color 2", "#61dca3", "Second glitch color."),
      color("color2", "Glitch Color 3", "#61b3dc", "Third glitch color."),
      range("glitchSpeed", "Glitch Speed", 50, 10, 180, 5, "Speed at which letters scramble."),
      bool("centerVignette", "Center Vignette", true, "Adds a center vignette."),
      bool("outerVignette", "Outer Vignette", false, "Adds edge vignette."),
      bool("smooth", "Smooth", true, "Smooths color interpolation."),
      text("characters", "Characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789", "Character set rendered in the canvas.")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("LetterGlitch.tsx", "tsx", LetterGlitchSource)
  ]
});
