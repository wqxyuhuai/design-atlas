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

const SPIRAL_VERTICAL_GAP = 0.5;
const SPIRAL_ANGLE_GAP = 0.85;
const SPIRAL_RADIUS = 2;
const SPIRAL_Y_OFFSET = -0.8;

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
  const centerIndex = Math.floor(itemCount / 2);
  const wrappedIndex = mod(itemIndex - scroll, itemCount);
  const centeredIndex = wrappedIndex - centerIndex;
  const angle = centeredIndex * SPIRAL_ANGLE_GAP;

  return {
    x: Math.cos(angle) * SPIRAL_RADIUS,
    y: centeredIndex * SPIRAL_VERTICAL_GAP + SPIRAL_Y_OFFSET,
    z: Math.sin(angle) * SPIRAL_RADIUS,
    rx: 0,
    ry: -angle + Math.PI / 2,
    rz: 0,
    s: 1,
    bend: 0.2,
    opacity: 1
  };
}

export function listSlotAt(itemIndex: number, itemCount: number, scroll: number): GallerySlot {
  const rowGap = 1.05;
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
    s: 0.82,
    bend: 0.03,
    opacity: Math.abs(y) < 4.8 ? 1 : 0
  };
}

export function getViewport(camera: THREE.PerspectiveCamera, z = 0): ViewportSize {
  const distance = camera.position.z - z;
  const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
  return { width: height * camera.aspect, height };
}
