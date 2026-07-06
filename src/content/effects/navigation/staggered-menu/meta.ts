import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import StaggeredMenuSource from "./StaggeredMenu.tsx?raw";
import StaggeredMenuStyles from "./StaggeredMenu.css?raw";
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

export const staggeredMenuEffect = createImportedEffect({
  ...{
    slug: "staggered-menu",
    title: "Staggered Menu",
    category: "navigation",
    sourceUrl: "https://reactbits.dev/components/staggered-menu",
    description: "Layered navigation drawer with staggered panel entrance, numbered links, and social link reveal.\nsource: https://reactbits.dev/components/staggered-menu",
    visualStyle: "A restrained navigation shell opens colored layers before revealing large menu links.",
    motionLogic: "Uses GSAP timelines for layered panel movement, button icon rotation, label cycling, numbered item entrance, and social link reveal.",
    defaultProps: withRendererProps("staggered-menu", {
      position: "right",
      color0: "#111114",
      color1: "#2a2d31",
      color2: "#b7d075",
      displaySocials: true,
      displayItemNumbering: true,
      menuButtonColor: "#f5f5f7",
      openMenuButtonColor: "#f5f5f7",
      accentColor: "#b7d075",
      changeMenuColorOnOpen: true
    }),
    controls: withRenderer("staggered-menu", [
      select("position", "Position", "right", ["left", "right"], "Side from which the menu opens."),
      color("accentColor", "Accent", "#b7d075", "Panel accent color."),
      color("color0", "Layer 1", "#111114", "First pre-layer color.", "advanced"),
      color("color1", "Layer 2", "#2a2d31", "Second pre-layer color.", "advanced"),
      color("color2", "Layer 3", "#b7d075", "Third pre-layer color.", "advanced"),
      bool("displaySocials", "Socials", true, "Shows social links."),
      bool("displayItemNumbering", "Numbering", true, "Shows item numbering."),
      color("menuButtonColor", "Button Color", "#f5f5f7", "Closed menu button color.", "advanced"),
      color("openMenuButtonColor", "Open Button", "#f5f5f7", "Open menu button color.", "advanced"),
      bool("changeMenuColorOnOpen", "Change Button Color", true, "Changes button color when opened.", "advanced")
    ]),
    dependencies: ["gsap"]
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource),
  codeFile("StaggeredMenu.tsx", "tsx", StaggeredMenuSource),
  codeFile("StaggeredMenu.css", "css", StaggeredMenuStyles)
  ]
});
