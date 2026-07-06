import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import LightRaysSource from "./LightRays.tsx?raw";
import LightRaysStyles from "./LightRays.css?raw";
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

export const lightRaysEffect = createImportedEffect({
  ...{
    slug: "light-rays",
    title: "Light Rays",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/light-rays",
    description: "OGL light ray shader with origin, spread, ray length, pulsation, mouse, noise, and distortion controls.\nsource: https://reactbits.dev/backgrounds/light-rays",
    visualStyle: "Atmospheric white rays stream from an edge across a dark canvas.",
    motionLogic: "Uses raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, and distortion.",
    defaultProps: withRendererProps("light-rays", {
      raysOrigin: "top-center",
      raysColor: "#ffffff",
      raysSpeed: 1,
      lightSpread: 0.5,
      rayLength: 3,
      pulsating: false,
      fadeDistance: 1,
      saturation: 1,
      followMouse: true,
      mouseInfluence: 0.1,
      noiseAmount: 0,
      distortion: 0
    }),
    controls: withRenderer("light-rays", [
      select("raysOrigin", "Rays Origin", "top-center", ["top-center", "top-left", "top-right", "right", "left", "bottom-center", "bottom-right", "bottom-left"], "Ray origin."),
      color("raysColor", "Rays Color", "#ffffff", "Light ray color."),
      range("raysSpeed", "Rays Speed", 1, 0, 4, 0.1, "Ray animation speed."),
      range("lightSpread", "Light Spread", 0.5, 0, 2, 0.05, "Spread of the light rays."),
      range("rayLength", "Ray Length", 3, 0.5, 8, 0.1, "Length of rays."),
      bool("pulsating", "Pulsating", false, "Enables pulse modulation."),
      range("fadeDistance", "Fade Distance", 1, 0, 3, 0.05, "Fade distance."),
      range("saturation", "Saturation", 1, 0, 2, 0.05, "Color saturation."),
      bool("followMouse", "Follow Mouse", true, "Allows rays to follow pointer."),
      range("mouseInfluence", "Mouse Influence", 0.1, 0, 1, 0.01, "Pointer influence strength.", "advanced"),
      range("noiseAmount", "Noise Amount", 0, 0, 1, 0.01, "Noise amount.", "advanced"),
      range("distortion", "Distortion", 0, 0, 1, 0.01, "Ray distortion.", "advanced")
    ]),
    dependencies: ["ogl"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("LightRays.tsx", "tsx", LightRaysSource),
  codeFile("LightRays.css", "css", LightRaysStyles)
  ]
});
