import { glareHoverEffect } from "../../content/effects/interactions/glare-hover";
import { magnetLinesEffect } from "../../content/effects/interactions/magnet-lines";
import { shapeBlurEffect } from "../../content/effects/interactions/shape-blur";
import { splashCursorEffect } from "../../content/effects/interactions/splash-cursor";
import type { DesignEffect } from "../../types/effect";

export const interactionEffects: DesignEffect[] = [
  splashCursorEffect,
  shapeBlurEffect,
  magnetLinesEffect,
  glareHoverEffect
];
