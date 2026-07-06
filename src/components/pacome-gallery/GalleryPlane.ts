import * as THREE from "three";
import type { GalleryProject } from "./galleryData";
import { mixSlot, type GallerySlot } from "./galleryMath";
import vertexShader from "./shaders/galleryPlane.vert?raw";
import fragmentShader from "./shaders/galleryPlane.frag?raw";

const PLANE_WIDTH = 1.7;
const PLANE_HEIGHT = 1;

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
    this.geometry = new THREE.PlaneGeometry(1, 1, 8, 8);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uColorStrength: { value: 0 },
        uZoom: { value: 1 },
        uPlaneSizes: { value: new THREE.Vector2(PLANE_WIDTH, PLANE_HEIGHT) },
        uImageSizes: { value: new THREE.Vector2(naturalWidth, naturalHeight) },
        uRevealProgress: { value: 0 },
        uScrollSpeed: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
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
    velocity,
    index
  }: {
    spiralSlot: GallerySlot;
    listSlot: GallerySlot;
    modeMix: number;
    velocity: number;
    index: number;
  }) {
    const slot = mixSlot(spiralSlot, listSlot, modeMix);
    const intro = this.introProgress;
    const introOffset = 1 - intro;
    const scale = slot.s * (0.76 + intro * 0.24);
    const x = slot.x + introOffset * (index % 2 === 0 ? -0.6 : 0.6);
    const y = slot.y + introOffset * (index % 3 === 0 ? 0.8 : -0.7);
    const z = slot.z - introOffset * 2.8;
    const opacity = slot.opacity * intro;
    const scrollSpeed = THREE.MathUtils.clamp(velocity, -0.75, 0.75);

    this.mesh.position.set(x, y, z);
    this.mesh.rotation.set(slot.rx, slot.ry, slot.rz);
    this.mesh.scale.set(PLANE_WIDTH * scale, PLANE_HEIGHT * scale, 1);
    this.mesh.renderOrder = Math.round((slot.z + 3) * 1000) + index;

    this.material.uniforms.uPlaneSizes.value.set(PLANE_WIDTH, PLANE_HEIGHT);
    this.material.uniforms.uRevealProgress.value = opacity;
    this.material.uniforms.uScrollSpeed.value = scrollSpeed;
  }

  dispose() {
    const texture = this.material.uniforms.uTexture.value as THREE.Texture;
    texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}
