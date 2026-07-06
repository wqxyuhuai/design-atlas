import { cardSwapEffect } from "../../content/effects/media/card-swap";
import { curvedScrollGalleryEffect } from "../../content/effects/media/curved-scroll-gallery";
import { flowingMenuEffect } from "../../content/effects/media/flowing-menu";
import { imageTrailEffect } from "../../content/effects/media/image-trail";
import { infiniteCanvasEffect } from "../../content/effects/media/infinite-canvas";
import { orbitGalleryEffect } from "../../content/effects/media/orbit-gallery";
import { spiralShowreelGalleryEffect } from "../../content/effects/media/spiral-showreel-gallery";
import type { DesignEffect } from "../../types/effect";

export const mediaEffects: DesignEffect[] = [
  spiralShowreelGalleryEffect,
  flowingMenuEffect,
  cardSwapEffect,
  orbitGalleryEffect,
  curvedScrollGalleryEffect,
  infiniteCanvasEffect,
  imageTrailEffect
];
