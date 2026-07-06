export const notionInboxPreviewCode = `import type { EffectProps } from "../../../types/effect";
import Beams from "./adapted-reference/Backgrounds/Beams/Beams";
import Dither from "./adapted-reference/Backgrounds/Dither/Dither";
import DotField from "./adapted-reference/Backgrounds/DotField/DotField";
import GradientBlinds from "./adapted-reference/Backgrounds/GradientBlinds/GradientBlinds";
import LetterGlitch from "./adapted-reference/Backgrounds/LetterGlitch/LetterGlitch";
import LightRays from "./adapted-reference/Backgrounds/LightRays/LightRays";
import PixelBlast from "./adapted-reference/Backgrounds/PixelBlast/PixelBlast";
import Prism from "./adapted-reference/Backgrounds/Prism/Prism";
import PrismaticBurst from "./adapted-reference/Backgrounds/PrismaticBurst/PrismaticBurst";
import ShinyText from "./adapted-reference/TextAnimations/ShinyText/ShinyText";
import Shuffle from "./adapted-reference/TextAnimations/Shuffle/Shuffle";
import TextPressure from "./adapted-reference/TextAnimations/TextPressure/TextPressure";
import TextType from "./adapted-reference/TextAnimations/TextType/TextType";

// Design Atlas stores each imported Notion record as data.
// The hidden renderer prop selects the local adapted implementation.
// Each effect keeps the source component's own controls, for example:
// DotField: dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly,
// bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom,
// gradientTo, glowColor.

export function NotionInboxPreview(props: EffectProps) {
  switch (props.renderer) {
    case "dot-field":
      return (
        <DotField
          dotRadius={Number(props.dotRadius)}
          dotSpacing={Number(props.dotSpacing)}
          cursorRadius={Number(props.cursorRadius)}
          cursorForce={Number(props.cursorForce)}
          bulgeOnly={Boolean(props.bulgeOnly)}
          bulgeStrength={Number(props.bulgeStrength)}
          glowRadius={Number(props.glowRadius)}
          sparkle={Boolean(props.sparkle)}
          waveAmplitude={Number(props.waveAmplitude)}
          gradientFrom={String(props.gradientFrom)}
          gradientTo={String(props.gradientTo)}
          glowColor={String(props.glowColor)}
        />
      );

    case "shiny-text":
      return (
        <ShinyText
          text={String(props.text)}
          speed={Number(props.speed)}
          color={String(props.color)}
          shineColor={String(props.shineColor)}
          spread={Number(props.spread)}
          direction={props.direction === "right" ? "right" : "left"}
        />
      );

    // Other renderers are mapped the same way:
    // Beams, Dither, GradientBlinds, LetterGlitch, LightRays,
    // PixelBlast, Prism, PrismaticBurst, Shuffle, TextPressure, TextType.
    default:
      return null;
  }
}
`;
