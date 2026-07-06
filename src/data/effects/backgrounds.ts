import { beamsEffect } from "../../content/effects/backgrounds/beams";
import { ditherEffect } from "../../content/effects/backgrounds/dither";
import { dotFieldEffect } from "../../content/effects/backgrounds/dot-field";
import { galaxyEffect } from "../../content/effects/backgrounds/galaxy/meta";
import { gradientBlindsEffect } from "../../content/effects/backgrounds/gradient-blinds";
import { letterGlitchEffect } from "../../content/effects/backgrounds/letter-glitch";
import { lightRaysEffect } from "../../content/effects/backgrounds/light-rays";
import { pixelBlastEffect } from "../../content/effects/backgrounds/pixel-blast";
import { prismEffect } from "../../content/effects/backgrounds/prism";
import { prismaticBurstEffect } from "../../content/effects/backgrounds/prismatic-burst";
import type { DesignEffect } from "../../types/effect";

export const backgroundEffects: DesignEffect[] = [
  galaxyEffect,
  beamsEffect,
  ditherEffect,
  dotFieldEffect,
  gradientBlindsEffect,
  letterGlitchEffect,
  lightRaysEffect,
  pixelBlastEffect,
  prismEffect,
  prismaticBurstEffect
];
