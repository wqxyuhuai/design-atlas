import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import BeamsSource from "./Beams.tsx?raw";
import BeamsStyles from "./Beams.css?raw";
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

export const beamsEffect = createImportedEffect({
  ...{
    slug: "beams",
    title: "Beams",
    category: "backgrounds",
    sourceUrl: "https://reactbits.dev/backgrounds/beams",
    description: "Volumetric diagonal light beams driven by an adapted Three.js shader material.\nsource: https://reactbits.dev/backgrounds/beams",
    visualStyle: "Soft white beams sweep through a dark WebGL scene with noisy volumetric light.",
    motionLogic: "Uses beamWidth, beamHeight, beamNumber, speed, noiseIntensity, scale, and rotation from the source reference.",
    defaultProps: withRendererProps("beams", {
      beamWidth: 3,
      beamHeight: 30,
      beamNumber: 20,
      lightColor: "#ffffff",
      speed: 2,
      noiseIntensity: 1.75,
      scale: 0.2,
      rotation: 30
    }),
    controls: withRenderer("beams", [
      range("beamWidth", "Beam Width", 3, 1, 8, 0.25, "Width of each beam."),
      range("beamHeight", "Beam Height", 30, 8, 70, 1, "Height of each beam."),
      range("beamNumber", "Beam Number", 20, 4, 40, 1, "Number of beams."),
      color("lightColor", "Light Color", "#ffffff", "Directional light color."),
      range("speed", "Speed", 2, 0.1, 6, 0.1, "Animation speed."),
      range("noiseIntensity", "Noise Intensity", 1.75, 0, 5, 0.05, "Shader noise intensity.", "advanced"),
      range("scale", "Scale", 0.2, 0.05, 1, 0.01, "Scene scale.", "advanced"),
      range("rotation", "Rotation", 30, -90, 90, 1, "Beam rotation in degrees.", "advanced")
    ]),
    dependencies: ["three", "@react-three/fiber", "@react-three/drei"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("Beams.tsx", "tsx", BeamsSource),
  codeFile("Beams.css", "css", BeamsStyles)
  ]
});
