import { LiquidTypographyLinkDemo } from "./LiquidTypographyLinkDemo";
import { code, componentCode, cssCode } from "./code";
import { notes } from "./notes";
import { prompt } from "./prompt";
import { source } from "./source";
import type { DesignEffect } from "../../../../types/effect";

export const liquidTypographyLinkEffect: DesignEffect = {
  id: "liquid-typography-link",
  slug: "liquid-typography-link",
  title: "Liquid Typography Link",
  type: "Font Effects / Link Hover",
  componentName: "LiquidTypographyLink",
  category: "text",
  description: "A bold interactive typography link with sliced liquid distortion on enter, exit, and pointer-local hover.",
  tags: ["text", "typography", "hover", "liquid", "distortion", "project-list", "font-effects", "link-hover"],
  useCases: ["Portfolio project index", "Case-study list", "Large menu link", "Editorial navigation"],
  status: "implemented",
  author: "Design Atlas",
  sourceUrl: "https://www.thomasmonavon.com/",
  licenseNote: "Original Design Atlas implementation inspired by a public interaction reference. No original site content, images, or brand assets are reused.",
  note: notes,
  visualStyle: "Minimal white-and-black project-list typography with heavy uppercase titles, compact line-height, right-side indexes, and strong divider lines.",
  motionLogic: "The component overlays 10 clipped text slices over a crisp base layer. Pointer velocity updates CSS variables for a small masked area, producing the local horizontal liquid pull shown in the reference video. Click plays a masked exit and replayed entrance.",
  reusable: {
    componentName: "LiquidTypographyLink",
    componentPath: "src/components/effects/LiquidTypographyLink.tsx",
    demoPath: "/workbench/text/liquid-typography-link",
    codeType: "react"
  },
  previewComponent: LiquidTypographyLinkDemo,
  defaultProps: {
    openLabel: "OPEN"
  },
  controls: [
    {
      key: "openLabel",
      label: "Open Label",
      type: "text",
      defaultValue: "OPEN",
      description: "Small label that follows the pointer while a row is hovered.",
      level: "primary"
    }
  ],
  parameters: [
    {
      key: "openLabel",
      label: "Open Label",
      type: "text",
      defaultValue: "OPEN",
      description: "Small label that follows the pointer while a row is hovered.",
      level: "primary"
    }
  ],
  propsDocs: [
    { property: "title", type: "string", defaultValue: "LIQUID TYPOGRAPHY", description: "Main uppercase link text." },
    { property: "index", type: "string", defaultValue: "01", description: "Optional right-aligned index label." },
    { property: "href", type: "string", defaultValue: "", description: "Optional link URL. Without href the component renders as a button." },
    { property: "openLabel", type: "string", defaultValue: "OPEN", description: "Cursor label shown while hovering." },
    { property: "className", type: "string", defaultValue: "", description: "Optional className for theming or layout wrappers." },
    { property: "onHoverChange", type: "(isHovering: boolean) => void", defaultValue: "", description: "Optional hover callback for parent demos or linked media." },
    { property: "onClick", type: "() => void", defaultValue: "", description: "Optional click callback. Click also triggers the exit and re-entry animation." }
  ],
  dependencies: [],
  codeFiles: [
    { filename: "LiquidTypographyLink.tsx", language: "tsx", code: componentCode },
    { filename: "LiquidTypographyLink.css", language: "css", code: cssCode }
  ],
  code,
  prompt,
  notes,
  source,
  createdAt: "2026-07-03"
};
