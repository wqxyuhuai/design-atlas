import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import SplashCursorSource from "./SplashCursor.tsx?raw";
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

export const splashCursorEffect = createImportedEffect({
  ...{
    slug: "splash-cursor",
    title: "Splash Cursor",
    category: "interactions",
    sourceUrl: "https://reactbits.dev/animations/splash-cursor",
    description: "Pointer-driven WebGL fluid splats with simulation, dye, pressure, curl, radius, force, and color controls.\nsource: https://reactbits.dev/animations/splash-cursor",
    visualStyle: "Soft color fluid follows pointer movement over a dark preview surface.",
    motionLogic: "Runs a WebGL fluid simulation in an absolute canvas constrained to the preview stage.",
    defaultProps: withRendererProps("splash-cursor", {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR: "#b7d075",
      BACK_COLOR: "#000000",
      TRANSPARENT: true
    }),
    controls: withRenderer("splash-cursor", [
      color("COLOR", "Color", "#b7d075", "Fluid splat color."),
      range("SPLAT_RADIUS", "Splat Radius", 0.2, 0.02, 0.8, 0.01, "Radius of each splat."),
      range("SPLAT_FORCE", "Splat Force", 6000, 500, 12000, 100, "Force applied to fluid."),
      range("DENSITY_DISSIPATION", "Density Dissipation", 3.5, 0.2, 8, 0.1, "How quickly dye fades."),
      range("VELOCITY_DISSIPATION", "Velocity Dissipation", 2, 0.2, 6, 0.1, "How quickly motion fades."),
      range("PRESSURE", "Pressure", 0.1, 0, 1, 0.01, "Pressure solve strength."),
      range("CURL", "Curl", 3, 0, 20, 0.5, "Vorticity curl."),
      range("SIM_RESOLUTION", "Simulation Resolution", 128, 64, 256, 1, "Simulation resolution.", "advanced"),
      range("DYE_RESOLUTION", "Dye Resolution", 1440, 256, 2048, 16, "Dye resolution.", "advanced"),
      bool("SHADING", "Shading", true, "Adds shading to the fluid.", "advanced"),
      color("BACK_COLOR", "Back Color", "#000000", "Background color.", "advanced"),
      bool("TRANSPARENT", "Transparent", true, "Keeps the canvas background transparent.", "advanced")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("SplashCursor.tsx", "tsx", SplashCursorSource)
  ]
});
