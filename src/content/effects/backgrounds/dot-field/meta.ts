import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import DotFieldSource from "./DotField.tsx?raw";
import DotFieldStyles from "./DotField.css?raw";
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

export const dotFieldEffect = createImportedEffect({
  ...{
    slug: "dot-field",
    title: "Dot Field",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/dot-field",
    description: "Cursor-reactive dotted field using an adapted canvas implementation and exact demo controls.\nsource: https://reactbits.dev/backgrounds/dot-field",
    visualStyle: "A restrained purple dot matrix with subtle cursor glow and bulge response.",
    motionLogic: "Uses dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, and glowColor.",
    defaultProps: withRendererProps("dot-field", {
      dotRadius: 1.5,
      dotSpacing: 14,
      cursorRadius: 500,
      cursorForce: 0.1,
      bulgeOnly: true,
      bulgeStrength: 67,
      glowRadius: 160,
      sparkle: false,
      waveAmplitude: 0,
      gradientFrom: "#A855F7",
      gradientTo: "#B497CF",
      glowColor: "#120F17"
    }),
    controls: withRenderer("dot-field", [
      range("dotRadius", "Dot Radius", 1.5, 0.5, 5, 0.5, "Radius of each dot."),
      range("dotSpacing", "Dot Spacing", 14, 5, 30, 1, "Spacing between dots."),
      range("cursorRadius", "Cursor Radius", 500, 100, 1000, 50, "Radius of the cursor interaction area."),
      range("cursorForce", "Cursor Force", 0.1, 0, 1, 0.01, "Force applied in physics mode."),
      bool("bulgeOnly", "Bulge Only", true, "Bulges dots away from the cursor instead of pushing them with physics."),
      range("bulgeStrength", "Bulge Strength", 67, 0, 150, 1, "Strength of the cursor bulge."),
      range("glowRadius", "Glow Radius", 160, 50, 400, 10, "Radius of the SVG glow that follows the cursor."),
      range("waveAmplitude", "Wave Amplitude", 0, 0, 20, 1, "Wave displacement applied to dots."),
      bool("sparkle", "Sparkle", false, "Randomly enlarges a small percentage of dots."),
      color("gradientFrom", "Gradient From", "#A855F7", "Start color for the dot gradient.", "advanced"),
      color("gradientTo", "Gradient To", "#B497CF", "End color for the dot gradient.", "advanced"),
      color("glowColor", "Glow Color", "#120F17", "Color of the cursor glow.", "advanced")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("DotField.tsx", "tsx", DotFieldSource),
  codeFile("DotField.css", "css", DotFieldStyles)
  ]
});
