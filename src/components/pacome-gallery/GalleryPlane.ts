import * as THREE from "three";
import type { GalleryProject } from "./galleryData";
import { clamp, mixSlot, type GallerySlot, type ViewportSize } from "./galleryMath";
import vertexShader from "./shaders/galleryPlane.vert?raw";
import fragmentShader from "./shaders/galleryPlane.frag?raw";

export class GalleryPlane {
  readonly geometry: THREE.PlaneGeometry;
  readonly material: THREE.ShaderMaterial;
  readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  readonly project: GalleryProject;
  readonly imageAspect: number;
  readonly displayAspect: number;
  introProgress = 0;

  constructor(project: GalleryProject, texture: THREE.Texture) {
    this.project = project;
    const image = texture.image as HTMLImageElement | undefined;
    const imageWidth = project.width ?? image?.naturalWidth ?? image?.width ?? 1200;
    const imageHeight = project.height ?? image?.naturalHeight ?? image?.height ?? 800;
    const naturalWidth = image?.naturalWidth ?? image?.width ?? imageWidth;
    const naturalHeight = image?.naturalHeight ?? image?.height ?? imageHeight;
    this.imageAspect = naturalWidth / naturalHeight;
    this.displayAspect = imageWidth / imageHeight;
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 18);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uImageSize: { value: new THREE.Vector2(naturalWidth, naturalHeight) },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
        uOpacity: { value: 0 },
        uRadius: { value: 0.045 },
        uBend: { value: 0.12 },
        uVelocity: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.userData.project = project;
    this.mesh.frustumCulled = false;
  }

  update({
    spiralSlot,
    listSlot,
    modeMix,
    viewport,
    velocity,
    index
  }: {
    spiralSlot: GallerySlot;
    listSlot: GallerySlot;
    modeMix: number;
    viewport: ViewportSize;
    velocity: number;
    index: number;
  }) {
    const slot = mixSlot(spiralSlot, listSlot, modeMix);
    const intro = this.introProgress;
    const baseWidth = clamp(viewport.width * 0.18, 1.25, 3.2);
    let planeWidth = baseWidth;
    let planeHeight = planeWidth / this.displayAspect;

    if (planeHeight > 2.6) {
      planeHeight = 2.6;
      planeWidth = planeHeight * this.displayAspect;
    }
    if (planeHeight < 0.8) {
      planeHeight = 0.8;
      planeWidth = planeHeight * this.displayAspect;
    }

    const introOffset = 1 - intro;
    const scale = slot.s * (0.72 + intro * 0.28);
    const x = slot.x * viewport.width + introOffset * (index % 2 === 0 ? -0.9 : 0.9);
    const y = slot.y * viewport.height + introOffset * (index % 3 === 0 ? 0.8 : -0.7);
    const z = slot.z - introOffset * 3.4;
    const opacity = slot.opacity * intro;
    const velocityBend = Math.min(Math.abs(velocity) * 1.8, 0.25);
    const v = THREE.MathUtils.clamp(velocity * 6, -1, 1);

    this.mesh.position.set(x, y, z);
    this.mesh.rotation.set(slot.rx, slot.ry, slot.rz);
    this.mesh.scale.set(planeWidth * scale, planeHeight * scale, 1);
    this.mesh.renderOrder = Math.round((slot.z + 3) * 100) + index;

    this.material.uniforms.uPlaneSize.value.set(planeWidth, planeHeight);
    this.material.uniforms.uOpacity.value = opacity;
    this.material.uniforms.uBend.value = slot.bend + velocityBend;
    this.material.uniforms.uVelocity.value.set(v, v * 0.35);
  }

  dispose() {
    const texture = this.material.uniforms.uTexture.value as THREE.Texture;
    texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}
