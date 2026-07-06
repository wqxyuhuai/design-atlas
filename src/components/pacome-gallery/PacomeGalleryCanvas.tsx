import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { GalleryPlane } from "./GalleryPlane";
import type { GalleryProject } from "./galleryData";
import { getViewport, listSlotAt, spiralSlotAt } from "./galleryMath";
import type { GalleryMode } from "./PacomeGalleryUI";
import type { VirtualScrollState } from "./useVirtualScroll";

const LERP = 0.075;

export function PacomeGalleryCanvas({
  projects,
  mode,
  scrollRef
}: {
  projects: GalleryProject[];
  mode: GalleryMode;
  scrollRef: React.MutableRefObject<VirtualScrollState>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ modeMix: mode === "list" ? 1 : 0 });

  useEffect(() => {
    gsap.to(stateRef.current, {
      modeMix: mode === "list" ? 1 : 0,
      duration: 1.15,
      ease: "power3.inOut"
    });
  }, [mode]);

  useEffect(() => {
    const modeState = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let disposed = false;
    let rafId = 0;
    let planes: GalleryPlane[] = [];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : isTablet ? 1.75 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const loader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleClick = (event: MouseEvent) => {
      if (scrollRef.current.dragDistance > 5 || !planes.length) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(planes.map((plane) => plane.mesh), false);
      const project = intersections[0]?.object.userData.project as GalleryProject | undefined;
      if (project?.href) {
        console.log(project.href);
      }
    };

    const render = () => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(render);
      if (document.hidden) return;

      const scroll = scrollRef.current;
      const previous = scroll.current;
      scroll.current += (scroll.target - scroll.current) * LERP;
      scroll.velocity = scroll.current - previous;

      const viewport = getViewport(camera, 0);
      planes.forEach((plane, index) => {
        const spiralSlot = spiralSlotAt(index, planes.length, scroll.current);
        const listSlot = listSlotAt(index, planes.length, scroll.current);
        plane.update({
          spiralSlot,
          listSlot,
          modeMix: stateRef.current.modeMix,
          viewport,
          velocity: scroll.velocity,
          index
        });
      });

      renderer.render(scene, camera);
    };

    Promise.all(
      projects.map((project) =>
        loader.loadAsync(project.image).then((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 8;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          return new GalleryPlane(project, texture);
        })
      )
    ).then((createdPlanes) => {
      if (disposed) {
        createdPlanes.forEach((plane) => plane.dispose());
        return;
      }

      planes = createdPlanes;
      planes.forEach((plane, index) => {
        scene.add(plane.mesh);
        gsap.to(plane, {
          introProgress: 1,
          delay: index * 0.045,
          duration: 1.2,
          ease: "power3.out"
        });
      });
      render();
    });

    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      gsap.killTweensOf(modeState);
      planes.forEach((plane) => {
        scene.remove(plane.mesh);
        gsap.killTweensOf(plane);
        plane.dispose();
      });
      renderer.dispose();
    };
  }, [projects, scrollRef]);

  return <canvas ref={canvasRef} className="pacome-gallery__canvas" aria-label="Pacome-style spiral gallery canvas" />;
}
