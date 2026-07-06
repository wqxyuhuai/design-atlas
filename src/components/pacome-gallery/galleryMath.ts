import * as THREE from "three";

export type GallerySlot = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
  bend: number;
  opacity: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

export const SPIRAL_SLOTS: GallerySlot[] = [
  { x: 0.42, y: 0.48, z: -1.8, rx: -0.14, ry: -0.5, rz: 0.1, s: 0.66, bend: 0.16, opacity: 0.54 },
  { x: 0.12, y: 0.42, z: -1.2, rx: -0.12, ry: -0.24, rz: 0.06, s: 0.74, bend: 0.16, opacity: 0.68 },
  { x: -0.12, y: 0.32, z: -0.55, rx: -0.1, ry: 0.18, rz: -0.04, s: 0.8, bend: 0.18, opacity: 0.78 },
  { x: -0.24, y: 0.12, z: 0.18, rx: -0.04, ry: 0.52, rz: -0.04, s: 0.92, bend: 0.24, opacity: 0.94 },
  { x: -0.06, y: 0.02, z: 0.9, rx: 0.02, ry: 0.08, rz: 0.01, s: 1.16, bend: 0.19, opacity: 1 },
  { x: 0.24, y: -0.08, z: 0.72, rx: 0.02, ry: -0.42, rz: -0.06, s: 1.04, bend: 0.3, opacity: 1 },
  { x: 0.36, y: -0.3, z: 0.06, rx: 0.06, ry: -0.58, rz: -0.08, s: 0.9, bend: 0.27, opacity: 0.9 },
  { x: 0.18, y: -0.48, z: -0.58, rx: 0.12, ry: -0.18, rz: -0.08, s: 0.78, bend: 0.18, opacity: 0.72 },
  { x: -0.12, y: -0.56, z: -1.05, rx: 0.16, ry: 0.2, rz: 0.05, s: 0.68, bend: 0.16, opacity: 0.58 },
  { x: -0.38, y: -0.36, z: -0.62, rx: 0.1, ry: 0.54, rz: 0.08, s: 0.76, bend: 0.22, opacity: 0.72 },
  { x: -0.48, y: -0.02, z: 0.08, rx: 0.04, ry: 0.66, rz: 0.06, s: 0.88, bend: 0.3, opacity: 0.9 },
  { x: -0.34, y: 0.24, z: 0.4, rx: -0.06, ry: 0.44, rz: -0.06, s: 0.94, bend: 0.26, opacity: 0.94 },
  { x: 0.02, y: 0.22, z: 0.62, rx: -0.04, ry: -0.1, rz: -0.04, s: 1.02, bend: 0.2, opacity: 0.96 },
  { x: 0.32, y: 0.18, z: -0.08, rx: -0.08, ry: -0.46, rz: 0.04, s: 0.88, bend: 0.24, opacity: 0.86 },
  { x: 0.52, y: -0.04, z: -0.86, rx: -0.02, ry: -0.66, rz: 0.05, s: 0.74, bend: 0.2, opacity: 0.68 },
  { x: 0.5, y: -0.42, z: -1.45, rx: 0.1, ry: -0.4, rz: -0.05, s: 0.64, bend: 0.16, opacity: 0.52 }
];

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function fract(value: number) {
  return value - Math.floor(value);
}

export function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function mixSlot(a: GallerySlot, b: GallerySlot, t: number): GallerySlot {
  return {
    x: mix(a.x, b.x, t),
    y: mix(a.y, b.y, t),
    z: mix(a.z, b.z, t),
    rx: mix(a.rx, b.rx, t),
    ry: mix(a.ry, b.ry, t),
    rz: mix(a.rz, b.rz, t),
    s: mix(a.s, b.s, t),
    bend: mix(a.bend, b.bend, t),
    opacity: mix(a.opacity, b.opacity, t)
  };
}

export function spiralSlotAt(itemIndex: number, itemCount: number, scroll: number) {
  const slotCount = SPIRAL_SLOTS.length;
  const t = (itemIndex / itemCount) * slotCount + scroll;
  const slotAIndex = mod(Math.floor(t), slotCount);
  const slotBIndex = mod(slotAIndex + 1, slotCount);
  const localT = smoothstep(fract(t));
  return mixSlot(SPIRAL_SLOTS[slotAIndex], SPIRAL_SLOTS[slotBIndex], localT);
}

export function listSlotAt(itemIndex: number, itemCount: number, scroll: number): GallerySlot {
  const rowGap = 1.25;
  const totalHeight = itemCount * rowGap;
  const rawY = -itemIndex * rowGap + scroll * rowGap;
  const y = mod(rawY + totalHeight * 0.5, totalHeight) - totalHeight * 0.5;
  return {
    x: 0,
    y,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 1,
    bend: 0.03,
    opacity: Math.abs(y) < 4.8 ? 1 : 0
  };
}

export function getViewport(camera: THREE.PerspectiveCamera, z = 0): ViewportSize {
  const distance = camera.position.z - z;
  const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
  return { width: height * camera.aspect, height };
}
