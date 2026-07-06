import { decryptedTextEffect } from "../../content/effects/text/decrypted-text";
import { liquidTypographyLinkEffect } from "../../content/effects/text/liquid-typography-link";
import { rotatingTextEffect } from "../../content/effects/text/rotating-text";
import { shinyTextEffect } from "../../content/effects/text/shiny-text";
import { shuffleEffect } from "../../content/effects/text/shuffle";
import { textPressureEffect } from "../../content/effects/text/text-pressure";
import { textRevealEffect } from "../../content/effects/text/text-reveal";
import { textTypeEffect } from "../../content/effects/text/text-type";
import { trueFocusEffect } from "../../content/effects/text/true-focus";
import { variableProximityEffect } from "../../content/effects/text/variable-proximity";
import type { DesignEffect } from "../../types/effect";

export const textEffects: DesignEffect[] = [
  textRevealEffect,
  liquidTypographyLinkEffect,
  shinyTextEffect,
  shuffleEffect,
  textPressureEffect,
  textTypeEffect,
  rotatingTextEffect,
  variableProximityEffect,
  trueFocusEffect,
  decryptedTextEffect
];
