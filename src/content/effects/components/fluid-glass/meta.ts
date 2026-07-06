import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import FluidGlassSource from "./FluidGlass.tsx?raw";
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

export const fluidGlassEffect = createImportedEffect({
  ...{
    slug: "fluid-glass",
    title: "Fluid Glass",
    category: "components",
    sourceUrl: "https://reactbits.dev/components/fluid-glass",
    description: "Three.js transmission glass object over scrollable image typography content.\nsource: https://reactbits.dev/components/fluid-glass",
    visualStyle: "A refractive lens, bar, or cube bends local artwork and Design Atlas typography.",
    motionLogic: "Uses React Three Fiber, Drei ScrollControls, GLB geometry, and MeshTransmissionMaterial with mode-specific properties.",
    defaultProps: withRendererProps("fluid-glass", {
      mode: "lens",
      scale: 0.15,
      ior: 1.15,
      thickness: 5,
      chromaticAberration: 0.1
    }),
    controls: withRenderer("fluid-glass", [
      select("mode", "Mode", "lens", ["lens", "bar", "cube"], "Glass object mode."),
      range("scale", "Scale", 0.15, 0.05, 0.45, 0.01, "Geometry scale."),
      range("ior", "IOR", 1.15, 1, 2.2, 0.01, "Index of refraction."),
      range("thickness", "Thickness", 5, 0.2, 12, 0.1, "Transmission material thickness."),
      range("chromaticAberration", "Chromatic Aberration", 0.1, 0, 1, 0.01, "Color separation in transmission.")
    ]),
    dependencies: ["three", "@react-three/fiber", "@react-three/drei", "maath"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("FluidGlass.tsx", "tsx", FluidGlassSource)
  ]
});
