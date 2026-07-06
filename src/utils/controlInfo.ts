import type { EffectControl } from "../types/effect";

const complexSelectKeys = new Set(["splitType", "segmentBy", "ease", "direction", "trigger", "imageRatio", "activeItem", "density", "variant"]);

export function shouldShowControlInfo(control: EffectControl) {
  if (!control.description || control.type !== "select") {
    return false;
  }

  return (control.options?.length ?? 0) > 2 || complexSelectKeys.has(control.key);
}
