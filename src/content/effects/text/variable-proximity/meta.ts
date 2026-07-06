import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import VariableProximitySource from "./VariableProximity.tsx?raw";
import VariableProximityStyles from "./VariableProximity.css?raw";
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

export const variableProximityEffect = createImportedEffect({
  ...{
    slug: "variable-proximity",
    title: "Variable Proximity",
    category: "text",
    sourceUrl: "https://reactbits.dev/text-animations/variable-proximity",
    description: "Variable font text that morphs font variation settings based on pointer distance.\nsource: https://reactbits.dev/text-animations/variable-proximity",
    visualStyle: "A clean wordmark becomes heavier and more optical near the pointer.",
    motionLogic: "Measures pointer proximity within the container and interpolates from/to font-variation-settings with a selected falloff curve.",
    defaultProps: withRendererProps("variable-proximity", {
      text: "Design Atlas reacts to proximity",
      fromFontVariationSettings: "'wght' 400, 'opsz' 9",
      toFontVariationSettings: "'wght' 900, 'opsz' 40",
      radius: 120,
      falloff: "linear"
    }),
    controls: withRenderer("variable-proximity", [
      text("text", "Text", "Design Atlas reacts to proximity", "Displayed text.", "primary"),
      range("radius", "Radius", 120, 20, 360, 5, "Pointer influence radius.", "primary", "px"),
      select("falloff", "Falloff", "linear", ["linear", "exponential", "gaussian"], "Influence falloff curve."),
      text("fromFontVariationSettings", "From Settings", "'wght' 400, 'opsz' 9", "Base font variation settings.", "advanced"),
      text("toFontVariationSettings", "To Settings", "'wght' 900, 'opsz' 40", "Near-pointer font variation settings.", "advanced")
    ]),
    dependencies: ["motion"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("VariableProximity.tsx", "tsx", VariableProximitySource),
  codeFile("VariableProximity.css", "css", VariableProximityStyles)
  ]
});
