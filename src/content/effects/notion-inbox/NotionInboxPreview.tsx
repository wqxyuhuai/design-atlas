import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, MutableRefObject, RefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { placeholderImagesForEffect } from "../../../data/placeholderImages";
import type { PlaceholderImage } from "../../../data/placeholderImages";
import type { EffectProps } from "../../../types/effect";
import Beams from "./react-bits/Backgrounds/Beams/Beams";
import Dither from "./react-bits/Backgrounds/Dither/Dither";
import DotField from "./react-bits/Backgrounds/DotField/DotField";
import GradientBlinds from "./react-bits/Backgrounds/GradientBlinds/GradientBlinds";
import LetterGlitch from "./react-bits/Backgrounds/LetterGlitch/LetterGlitch";
import LightRays from "./react-bits/Backgrounds/LightRays/LightRays";
import PixelBlast from "./react-bits/Backgrounds/PixelBlast/PixelBlast";
import Prism from "./react-bits/Backgrounds/Prism/Prism";
import PrismaticBurst from "./react-bits/Backgrounds/PrismaticBurst/PrismaticBurst";
import ShinyText from "./react-bits/TextAnimations/ShinyText/ShinyText";
import Shuffle from "./react-bits/TextAnimations/Shuffle/Shuffle";
import TextPressure from "./react-bits/TextAnimations/TextPressure/TextPressure";
import TextType from "./react-bits/TextAnimations/TextType/TextType";
import FlowingMenu from "./react-bits/Components/FlowingMenu/FlowingMenu";
import CardSwap, { Card } from "./react-bits/Components/CardSwap/CardSwap";
import { StaggeredMenu } from "./react-bits/Components/StaggeredMenu/StaggeredMenu";
import GlassSurface from "./react-bits/Components/GlassSurface/GlassSurface";
import FluidGlass from "./react-bits/Components/FluidGlass/FluidGlass";
import SplashCursor from "./react-bits/Animations/SplashCursor/SplashCursor";
import ImageTrail from "./react-bits/Animations/ImageTrail/ImageTrail";
import ShapeBlur from "./react-bits/Animations/ShapeBlur/ShapeBlur";
import Strands from "./react-bits/Animations/Strands/Strands";
import MagnetLines from "./react-bits/Animations/MagnetLines/MagnetLines";
import GlareHover from "./react-bits/Animations/GlareHover/GlareHover";
import RotatingText from "./react-bits/TextAnimations/RotatingText/RotatingText";
import VariableProximity from "./react-bits/TextAnimations/VariableProximity/VariableProximity";
import TrueFocus from "./react-bits/TextAnimations/TrueFocus/TrueFocus";
import DecryptedText from "./react-bits/TextAnimations/DecryptedText/DecryptedText";

function stringValue(props: EffectProps, key: string, fallback: string) {
  const value = props[key];
  return typeof value === "string" ? value : fallback;
}

function numberValue(props: EffectProps, key: string, fallback: number) {
  const value = props[key];
  return typeof value === "number" ? value : fallback;
}

function booleanValue(props: EffectProps, key: string, fallback: boolean) {
  const value = props[key];
  return typeof value === "boolean" ? value : fallback;
}

function hexToRgbUnit(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").padEnd(6, "0");
  return [
    Number.parseInt(clean.slice(0, 2), 16) / 255,
    Number.parseInt(clean.slice(2, 4), 16) / 255,
    Number.parseInt(clean.slice(4, 6), 16) / 255
  ];
}

function hexToRgbObject(hex: string) {
  const [r, g, b] = hexToRgbUnit(hex);
  return { r, g, b };
}

function textList(value: string, fallback: string[]) {
  const parts = value
    .split(/\n|\|/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length ? parts : fallback;
}

function colorsFromProps(props: EffectProps, keys: string[], fallback: string[]) {
  const colors = keys.map((key, index) => stringValue(props, key, fallback[index] ?? fallback[0])).filter(Boolean);
  return colors.length ? colors : fallback;
}

function selectValue<const T extends string>(props: EffectProps, key: string, fallback: T, options: readonly T[]): T {
  const value = props[key];
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

type StaggerFrom = "first" | "last" | "center" | "random";
type Falloff = "linear" | "exponential" | "gaussian";
type RevealDirection = "start" | "end" | "center";
type DecryptedTrigger = "view" | "hover" | "inViewHover" | "click";
type SwapEasing = "elastic" | "linear";
type GlassChannel = "R" | "G" | "B";
type GlassBlend = "normal" | "screen" | "overlay" | "difference" | "plus-lighter";
type MenuPosition = "left" | "right";

function images(count: number, offset = 0) {
  return placeholderImagesForEffect(count, offset);
}

const ORBIT_LAYOUT = [
  { rotate: -1.8, opacity: 0.72, force: 0.8 },
  { rotate: 0.8, opacity: 0.8, force: 0.94 },
  { rotate: 1.4, opacity: 0.86, force: 1.08 },
  { rotate: -0.6, opacity: 0.76, force: 1 },
  { rotate: -3.2, opacity: 0.68, force: 0.88 },
  { rotate: -1, opacity: 0.82, force: 1.16 },
  { rotate: 2.4, opacity: 0.7, force: 0.9 }
];

const ORBIT_VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ORBIT_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 image = texture2D(tMap, uv);
  gl_FragColor = vec4(image.rgb, image.a * uOpacity);
}
`;

function TextPreview({ props, renderer, mode }: { props: EffectProps; renderer: string; mode: string }) {
  const text = stringValue(props, "text", "Build interfaces that feel alive");
  const className = "notion-rb-text";
  const compact = mode === "card";
  const variableContainerRef = useRef<HTMLDivElement>(null);

  if (renderer === "shiny-text") {
    return (
      <ShinyText
        text={text}
        className={className}
        color={stringValue(props, "color", "#b5b5b5")}
        shineColor={stringValue(props, "shineColor", "#ffffff")}
        speed={numberValue(props, "speed", 2)}
        delay={numberValue(props, "delay", 0)}
        spread={numberValue(props, "spread", 120)}
        direction={stringValue(props, "direction", "left") === "right" ? "right" : "left"}
        yoyo={booleanValue(props, "yoyo", false)}
        pauseOnHover={booleanValue(props, "pauseOnHover", false)}
        disabled={booleanValue(props, "disabled", false)}
      />
    );
  }

  if (renderer === "shuffle") {
    return (
      <Shuffle
        text={text}
        className={className}
        shuffleDirection={stringValue(props, "shuffleDirection", "right") as "left" | "right" | "up" | "down"}
        duration={numberValue(props, "duration", 0.35)}
        maxDelay={numberValue(props, "maxDelay", 0)}
        ease={stringValue(props, "ease", "power3.out")}
        shuffleTimes={numberValue(props, "shuffleTimes", 1)}
        animationMode={stringValue(props, "animationMode", "evenodd") === "random" ? "random" : "evenodd"}
        loop={booleanValue(props, "loop", false)}
        loopDelay={numberValue(props, "loopDelay", 0)}
        stagger={numberValue(props, "stagger", 0.03)}
        scrambleCharset={stringValue(props, "scrambleCharset", "")}
        colorFrom={stringValue(props, "colorFrom", "#b5b5b5")}
        colorTo={stringValue(props, "colorTo", "#ffffff")}
        triggerOnHover={booleanValue(props, "triggerOnHover", true)}
        triggerOnce={false}
      />
    );
  }

  if (renderer === "text-pressure") {
    return (
      <TextPressure
        text={text}
        flex={booleanValue(props, "flex", false)}
        alpha={booleanValue(props, "alpha", false)}
        stroke={booleanValue(props, "stroke", false)}
        width={booleanValue(props, "width", true)}
        weight={booleanValue(props, "weight", true)}
        italic={booleanValue(props, "italic", true)}
        scale={booleanValue(props, "scale", false)}
        textColor={stringValue(props, "textColor", "#ffffff")}
        strokeColor={stringValue(props, "strokeColor", "#5227FF")}
        minFontSize={numberValue(props, "minFontSize", compact ? 18 : 36)}
        className="notion-rb-pressure-text"
      />
    );
  }

  if (renderer === "rotating-text") {
    return (
      <div className="notion-rb-rotating-text-wrap">
        <span>Design systems feel</span>
        <RotatingText
          texts={textList(stringValue(props, "texts", "alive|quiet|precise"), ["alive", "quiet", "precise"])}
          rotationInterval={numberValue(props, "rotationInterval", 2400)}
          staggerDuration={numberValue(props, "staggerDuration", 0.025)}
          staggerFrom={selectValue<StaggerFrom>(props, "staggerFrom", "first", ["first", "last", "center", "random"])}
          splitBy={selectValue(props, "splitBy", "characters", ["characters", "words", "lines"])}
          loop={booleanValue(props, "loop", true)}
          auto={booleanValue(props, "auto", true)}
          mainClassName="notion-rb-rotating-text-pill"
          splitLevelClassName="notion-rb-rotating-text-line"
          elementLevelClassName="notion-rb-rotating-text-char"
        />
      </div>
    );
  }

  if (renderer === "variable-proximity") {
    return (
      <div className="notion-rb-variable-proximity-wrap" ref={variableContainerRef}>
        <VariableProximity
          label={text}
          fromFontVariationSettings={stringValue(props, "fromFontVariationSettings", "'wght' 400, 'opsz' 9")}
          toFontVariationSettings={stringValue(props, "toFontVariationSettings", "'wght' 900, 'opsz' 40")}
          radius={numberValue(props, "radius", 120)}
          falloff={selectValue<Falloff>(props, "falloff", "linear", ["linear", "exponential", "gaussian"])}
          className="notion-rb-variable-proximity-text"
          containerRef={variableContainerRef as RefObject<HTMLElement>}
        />
      </div>
    );
  }

  if (renderer === "true-focus") {
    return (
      <TrueFocus
        sentence={text}
        manualMode={booleanValue(props, "manualMode", false)}
        blurAmount={numberValue(props, "blurAmount", 5)}
        borderColor={stringValue(props, "borderColor", "#b7d075")}
        glowColor={stringValue(props, "glowColor", "rgba(183, 208, 117, 0.55)")}
        animationDuration={numberValue(props, "animationDuration", 0.5)}
        pauseBetweenAnimations={numberValue(props, "pauseBetweenAnimations", 1)}
      />
    );
  }

  if (renderer === "decrypted-text") {
    return (
      <DecryptedText
        text={text}
        speed={numberValue(props, "speed", 45)}
        maxIterations={numberValue(props, "maxIterations", 18)}
        sequential={booleanValue(props, "sequential", true)}
        revealDirection={selectValue<RevealDirection>(props, "revealDirection", "start", ["start", "end", "center"])}
        useOriginalCharsOnly={booleanValue(props, "useOriginalCharsOnly", false)}
        characters={stringValue(props, "characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")}
        animateOn={selectValue<DecryptedTrigger>(props, "animateOn", "view", ["view", "hover", "inViewHover", "click"])}
        className="notion-rb-decrypted-text"
        encryptedClassName="notion-rb-decrypted-char"
      />
    );
  }

  return (
    <TextType
      text={textList(stringValue(props, "texts", text), ["Text typing effect", "for your websites", "Happy coding!"])}
      className={className}
      typingSpeed={numberValue(props, "typingSpeed", 75)}
      initialDelay={numberValue(props, "initialDelay", 0)}
      pauseDuration={numberValue(props, "pauseDuration", 1500)}
      deletingSpeed={numberValue(props, "deletingSpeed", 50)}
      loop={booleanValue(props, "loop", true)}
      showCursor={booleanValue(props, "showCursor", true)}
      hideCursorWhileTyping={booleanValue(props, "hideCursorWhileTyping", false)}
      cursorCharacter={stringValue(props, "cursorCharacter", "_")}
      cursorBlinkDuration={numberValue(props, "cursorBlinkDuration", 0.5)}
      textColors={colorsFromProps(props, ["textColor0", "textColor1", "textColor2"], ["#ffffff"])}
      variableSpeed={
        booleanValue(props, "variableSpeedEnabled", false)
          ? {
              min: numberValue(props, "variableSpeedMin", 60),
              max: numberValue(props, "variableSpeedMax", 120)
            }
          : undefined
      }
      startOnVisible={false}
      reverseMode={booleanValue(props, "reverseMode", false)}
    />
  );
}

type CurvedMotionState = {
  target: number;
  current: number;
  speed: number;
  pointerX: number;
  pointerY: number;
};

type CurvedAtlasState = {
  texture: THREE.CanvasTexture;
  imageInfos: Array<{
    uvs: [number, number, number, number];
  }>;
};

const CURVED_VERTEX_SHADER = `
  attribute float aIndex;
  attribute vec4 aTextureCoords;

  uniform float uPageWidth;
  uniform float uPageHeight;
  uniform float uMeshCount;
  uniform float uPageSpacing;
  uniform float uScrollY;
  uniform float uSpeedY;
  uniform float uCurveDepth;
  uniform float uBendStrength;
  uniform float uPointerX;
  uniform float uPointerY;
  uniform float uRowWidth;

  varying vec2 vUv;
  varying vec4 vTextureCoords;
  varying float vLighting;

  const float PI = 3.14159265359;

  mat3 rotateY(float angle) {
    return mat3(
      cos(angle), 0.0, sin(angle),
      0.0, 1.0, 0.0,
      -sin(angle), 0.0, cos(angle)
    );
  }

  mat3 rotateX(float angle) {
    return mat3(
      1.0, 0.0, 0.0,
      0.0, cos(angle), -sin(angle),
      0.0, sin(angle), cos(angle)
    );
  }

  float wrapCenter(float value, float range) {
    return mod(value + range * 0.5, range) - range * 0.5;
  }

  void main() {
    float maxTravel = uMeshCount * uPageSpacing;
    float baseTravel = (aIndex - (uMeshCount - 1.0) * 0.5) * uPageSpacing;
    float travel = wrapCenter(baseTravel - uScrollY, maxTravel);
    float normalized = clamp(travel / (maxTravel * 0.5), -1.0, 1.0);
    float absNormalized = abs(normalized);
    float direction = normalized < 0.0 ? -1.0 : 1.0;

    vec3 transformed = position;
    float speed = clamp(uSpeedY * 0.54, -1.55, 1.55);
    float bendScale = uBendStrength / 34.0;
    float verticalWave = sin((uv.y + 0.08) * 2.18) * 0.42;
    float scrollBend = verticalWave * speed * bendScale;
    float centerWeight = 1.0 - smoothstep(0.0, 0.58, absNormalized);
    float faceProgress = smoothstep(0.05, 1.0, absNormalized);
    float yaw = direction * mix(PI * 0.47, PI * 0.08, faceProgress);

    yaw += scrollBend * 0.16 * (0.75 - absNormalized * 0.28);
    transformed.z -= scrollBend * 0.62;

    transformed = rotateY(yaw) * transformed;

    transformed.x += normalized * uRowWidth + uPointerX * 0.08;
    transformed.y += -0.84;
    transformed.z += -absNormalized * uCurveDepth * 0.006 - centerWeight * 0.12;

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vTextureCoords = aTextureCoords;
    vLighting = mix(0.72, 1.0, faceProgress);
  }
`;

const CURVED_FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D uAtlas;
  varying vec2 vUv;
  varying vec4 vTextureCoords;
  varying float vLighting;

  void main() {
    vec2 atlasUv = vec2(
      mix(vTextureCoords.x, vTextureCoords.y, vUv.x),
      mix(vTextureCoords.w, vTextureCoords.z, vUv.y)
    );
    vec4 color = texture2D(uAtlas, atlasUv);
    color.rgb *= vLighting;
    gl_FragColor = color;
  }
`;

function useCurvedAtlas(images: PlaceholderImage[]) {
  const [atlas, setAtlas] = useState<CurvedAtlasState | null>(null);

  useEffect(() => {
    let disposed = false;
    let texture: THREE.CanvasTexture | null = null;

    const loadImages = async () => {
      const loadedImages = await Promise.all(
        images.map(
          (image) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = () => reject(new Error(`Failed to load ${image.src}`));
              img.src = image.src;
            })
        )
      );

      if (disposed) return;

      const atlasWidth = Math.max(...loadedImages.map((image) => image.naturalWidth || image.width));
      const atlasHeight = loadedImages.reduce((total, image) => total + (image.naturalHeight || image.height), 0);
      const canvas = document.createElement("canvas");
      canvas.width = atlasWidth;
      canvas.height = atlasHeight;

      const context = canvas.getContext("2d");
      if (!context) return;

      let currentY = 0;
      const imageInfos = loadedImages.map((image) => {
        const width = image.naturalWidth || image.width;
        const height = image.naturalHeight || image.height;
        context.drawImage(image, 0, currentY, width, height);

        const uvs: [number, number, number, number] = [
          0,
          width / atlasWidth,
          1 - currentY / atlasHeight,
          1 - (currentY + height) / atlasHeight
        ];

        currentY += height;
        return { uvs };
      });

      texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;

      setAtlas({ texture, imageInfos });
    };

    void loadImages();

    return () => {
      disposed = true;
      texture?.dispose();
    };
  }, [images]);

  return atlas;
}

function CurvedWebGLGallery({
  images,
  pageCount,
  motionRef,
  curveDepth,
  bendStrength,
  compact
}: {
  images: PlaceholderImage[];
  pageCount: number;
  motionRef: MutableRefObject<CurvedMotionState>;
  curveDepth: number;
  bendStrength: number;
  compact: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const viewport = useThree((state) => state.viewport);
  const meshCount = compact ? Math.min(32, Math.max(18, pageCount)) : Math.min(72, Math.max(30, pageCount));
  const atlas = useCurvedAtlas(images);
  const pageWidth = compact ? 0.98 : 1.44;
  const pageHeight = compact ? 1.56 : 2.42;
  const pageSpacing = compact ? 0.5 : 0.42;
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(pageWidth, pageHeight, 42, 42),
    [pageHeight, pageWidth]
  );
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: CURVED_VERTEX_SHADER,
        fragmentShader: CURVED_FRAGMENT_SHADER,
        transparent: false,
        side: THREE.DoubleSide,
        uniforms: {
          uAtlas: new THREE.Uniform(atlas?.texture ?? new THREE.Texture()),
          uPageWidth: new THREE.Uniform(pageWidth),
          uPageHeight: new THREE.Uniform(pageHeight),
          uMeshCount: new THREE.Uniform(meshCount),
          uPageSpacing: new THREE.Uniform(pageSpacing),
          uScrollY: new THREE.Uniform(0),
          uSpeedY: new THREE.Uniform(0),
          uCurveDepth: new THREE.Uniform(curveDepth),
          uBendStrength: new THREE.Uniform(bendStrength),
          uPointerX: new THREE.Uniform(0),
          uPointerY: new THREE.Uniform(0),
          uRowWidth: new THREE.Uniform(8)
        }
      }),
    [atlas?.texture, bendStrength, curveDepth, meshCount, pageHeight, pageSpacing, pageWidth]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useEffect(() => {
    if (!atlas) return;

    const textureCoords = new Float32Array(meshCount * 4);
    const indexes = new Float32Array(meshCount);
    const identity = new THREE.Matrix4();

    for (let index = 0; index < meshCount; index += 1) {
      const imageInfo = atlas.imageInfos[index % atlas.imageInfos.length];
      textureCoords.set(imageInfo.uvs, index * 4);
      indexes[index] = index;
      meshRef.current?.setMatrixAt(index, identity);
    }

    geometry.setAttribute("aTextureCoords", new THREE.InstancedBufferAttribute(textureCoords, 4));
    geometry.setAttribute("aIndex", new THREE.InstancedBufferAttribute(indexes, 1));
    geometry.attributes.aTextureCoords.needsUpdate = true;
    geometry.attributes.aIndex.needsUpdate = true;
    material.uniforms.uAtlas.value = atlas.texture;
    material.uniforms.uMeshCount.value = meshCount;

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.frustumCulled = false;
    }
  }, [atlas, geometry, material, meshCount]);

  useFrame((_, delta) => {
    const motion = motionRef.current;
    const ease = 1 - Math.exp(-delta * 8.4);
    motion.current = THREE.MathUtils.lerp(motion.current, motion.target, ease);
    motion.speed *= Math.exp(-delta * 5.8);

    material.uniforms.uScrollY.value = motion.current;
    material.uniforms.uSpeedY.value = motion.speed;
    material.uniforms.uPointerX.value = THREE.MathUtils.lerp(material.uniforms.uPointerX.value, motion.pointerX, 1 - Math.exp(-delta * 5));
    material.uniforms.uPointerY.value = THREE.MathUtils.lerp(material.uniforms.uPointerY.value, motion.pointerY, 1 - Math.exp(-delta * 5));
    material.uniforms.uCurveDepth.value = curveDepth;
    material.uniforms.uBendStrength.value = bendStrength;
    material.uniforms.uRowWidth.value = Math.max(8.4, viewport.width * (compact ? 0.68 : 0.9));
  });

  if (!atlas) return null;

  return <instancedMesh ref={meshRef} args={[geometry, material, meshCount]} />;
}

type OrbitGalleryMotionState = {
  currentY: number;
  targetY: number;
  strength: number;
  targetStrength: number;
  pointerX: number;
  pointerY: number;
};

function OrbitWebGLGallery({
  images,
  motionRef,
  compact,
  bendStrength,
  pointerParallax
}: {
  images: PlaceholderImage[];
  motionRef: MutableRefObject<OrbitGalleryMotionState>;
  compact: boolean;
  bendStrength: number;
  pointerParallax: number;
}) {
  const textures = useLoader(
    THREE.TextureLoader,
    images.map((image) => image.src)
  );
  const viewport = useThree((state) => state.viewport);
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const materialRefs = useRef<Array<THREE.ShaderMaterial | null>>([]);

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  });

  useFrame((_, delta) => {
    const motion = motionRef.current;
    const columns = compact ? 3 : 7;
    const rows = Math.ceil(images.length / columns);
    const cardWidth = viewport.width * (compact ? 0.34 : 0.15);
    const cardHeight = cardWidth * (compact ? 0.74 : 0.72);
    const xGap = viewport.width * (compact ? 0.42 : 0.2);
    const rowGap = cardHeight * (compact ? 1.42 : 1.36);
    const totalHeight = rowGap * rows;
    const autoSpeed = compact ? 0.34 : 0.5;
    const scrollDamp = 1 - Math.exp(-delta * 7.2);
    const strengthDamp = 1 - Math.exp(-delta * 8);
    const strengthDecay = Math.exp(-delta * 4.2);
    const pointerInfluence = pointerParallax / 24;
    const pointerX = motion.pointerX * viewport.width * 0.035 * pointerInfluence;
    const pointerY = motion.pointerY * viewport.height * 0.02 * pointerInfluence;

    motion.targetY += delta * autoSpeed;
    motion.currentY = THREE.MathUtils.lerp(motion.currentY, motion.targetY, scrollDamp);
    motion.strength = THREE.MathUtils.lerp(motion.strength, motion.targetStrength, strengthDamp);
    motion.targetStrength *= strengthDecay;

    if (totalHeight > 0 && Math.abs(motion.currentY) > totalHeight * 2) {
      const wrapOffset = Math.trunc(motion.currentY / totalHeight) * totalHeight;
      motion.currentY -= wrapOffset;
      motion.targetY -= wrapOffset;
    }

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const material = materialRefs.current[index];
      const layout = ORBIT_LAYOUT[index % ORBIT_LAYOUT.length];
      const column = index % columns;
      const row = Math.floor(index / columns);
      const columnOffset = -(column + 1) * rowGap * (compact ? 0.1 : 0.12);
      const baseY = -row * rowGap + columnOffset;
      const wrappedY = ((((baseY + motion.currentY + totalHeight / 2) % totalHeight) + totalHeight) % totalHeight) - totalHeight / 2;
      const normalizedY = Math.min(Math.abs(wrappedY) / (viewport.height * 0.58), 1);
      const edgeFade = 1 - Math.max(normalizedY - 0.78, 0) * 1.8;
      const x = (column - (columns - 1) / 2) * xGap + pointerX;
      const y = wrappedY + pointerY;
      const depth = -motion.strength * bendStrength * 0.006 * layout.force;
      const pulseY = -motion.strength * 0.008 * layout.force;
      const opacity = THREE.MathUtils.clamp(layout.opacity * edgeFade, 0, 0.92);

      mesh.position.set(x, y + pulseY, depth);
      mesh.rotation.set(0, 0, THREE.MathUtils.degToRad(layout.rotate));
      mesh.scale.set(cardWidth, cardHeight, 1);
      mesh.visible = opacity > 0.04 && Math.abs(x) < viewport.width * 0.95;

      if (material) {
        material.uniforms.uPlaneSizes.value.set(cardWidth, cardHeight);
        material.uniforms.uOpacity.value = opacity;
      }
    });
  });

  return (
    <group>
      {textures.map((texture, index) => (
        <mesh
          key={`${images[index]?.src ?? "orbit"}-${index}`}
          ref={(node) => {
            meshRefs.current[index] = node;
          }}
        >
          <planeGeometry args={[1, 1, 1, 1]} />
          <shaderMaterial
            ref={(node) => {
              materialRefs.current[index] = node;
            }}
            uniforms={{
              tMap: { value: texture },
              uPlaneSizes: { value: new THREE.Vector2(1, 1) },
              uImageSizes: { value: new THREE.Vector2(texture.image?.width ?? 1, texture.image?.height ?? 1) },
              uOpacity: { value: 0 }
            }}
            vertexShader={ORBIT_VERTEX_SHADER}
            fragmentShader={ORBIT_FRAGMENT_SHADER}
            transparent
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      ))}
    </group>
  );
}

type InfinitePlaneData = {
  id: string;
  position: [number, number, number];
  size: number;
  rotation: number;
  mediaIndex: number;
  chunk: [number, number, number];
};

type InfiniteCameraGridState = {
  cx: number;
  cy: number;
  cz: number;
  camZ: number;
};

const INFINITE_CHUNK_SIZE = 68;
const INFINITE_RENDER_DISTANCE = 1;
const INFINITE_FADE_MARGIN = 1;
const INFINITE_INITIAL_CAMERA_Z = 52;
const INFINITE_MAX_VELOCITY = 1.9;
const INFINITE_VELOCITY_LERP = 0.16;
const INFINITE_VELOCITY_DECAY = 0.9;
const INFINITE_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1);

const INFINITE_CHUNK_OFFSETS = (() => {
  const maxDistance = INFINITE_RENDER_DISTANCE + INFINITE_FADE_MARGIN;
  const offsets: Array<[number, number, number]> = [];

  for (let dx = -maxDistance; dx <= maxDistance; dx += 1) {
    for (let dy = -maxDistance; dy <= maxDistance; dy += 1) {
      for (let dz = -maxDistance; dz <= maxDistance; dz += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz)) <= maxDistance) {
          offsets.push([dx, dy, dz]);
        }
      }
    }
  }

  return offsets;
})();

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function seededUnit(seed: number) {
  const value = Math.sin(seed * 9999) * 10000;
  return value - Math.floor(value);
}

function hashKey(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function generateInfiniteChunkPlanes(cx: number, cy: number, cz: number, mediaCount: number, compact: boolean): InfinitePlaneData[] {
  const seed = hashKey(`${cx},${cy},${cz}`);
  const count = compact ? 3 : mediaCount >= 23 ? 8 : 7;

  return Array.from({ length: count }, (_, index) => {
    const base = seed + index * 997;
    const random = (offset: number) => seededUnit(base + offset);
    const isCenterChunk = cx === 0 && cy === 0;
    const centerFiller = !compact && isCenterChunk && index < 4;
    const edgeSweep = !compact && index === count - 1 && random(8) > 0.56;
    const size = centerFiller
      ? 2.6 + random(4) * 3.8
      : ((compact ? 3.2 : 4.6) + random(4) * (compact ? 4.2 : 6.4)) * (edgeSweep ? 1.52 : 1);
    const ringAngle = random(0) * Math.PI * 2;
    const centerAngle = (index / 4) * Math.PI * 2 + (random(12) - 0.5) * 0.72;
    const centerRadius = 12 + random(13) * 19;
    const ringRadius = (compact ? 18 : 22) + random(1) * (compact ? 24 : 38);
    const edgeSide = random(9) > 0.5 ? 1 : -1;
    const localX = isCenterChunk
      ? centerFiller
        ? Math.cos(centerAngle) * centerRadius + (random(14) - 0.5) * 8
        : Math.cos(ringAngle) * ringRadius
      : edgeSweep
        ? edgeSide * INFINITE_CHUNK_SIZE * (0.54 + random(10) * 0.18)
        : (random(0) - 0.5) * INFINITE_CHUNK_SIZE;
    const localY = isCenterChunk
      ? centerFiller
        ? Math.sin(centerAngle) * centerRadius * 0.52 + (random(15) - 0.5) * 5
        : Math.sin(ringAngle) * ringRadius * 0.62
      : edgeSweep
        ? (random(11) - 0.5) * INFINITE_CHUNK_SIZE * 0.74
        : (random(1) - 0.5) * INFINITE_CHUNK_SIZE;

    return {
      id: `${cx}-${cy}-${cz}-${index}`,
      position: [
        cx * INFINITE_CHUNK_SIZE + localX,
        cy * INFINITE_CHUNK_SIZE + localY,
        cz * INFINITE_CHUNK_SIZE + (random(2) - 0.5) * INFINITE_CHUNK_SIZE
      ],
      size,
      rotation: 0,
      mediaIndex: Math.floor(random(5) * mediaCount) % mediaCount,
      chunk: [cx, cy, cz]
    };
  });
}

function buildInfinitePlanes(cx: number, cy: number, cz: number, mediaCount: number, compact: boolean) {
  return INFINITE_CHUNK_OFFSETS.flatMap(([dx, dy, dz]) => generateInfiniteChunkPlanes(cx + dx, cy + dy, cz + dz, mediaCount, compact));
}

function InfiniteCanvasPlane({
  plane,
  texture,
  cameraGridRef
}: {
  plane: InfinitePlaneData;
  texture: THREE.Texture;
  cameraGridRef: RefObject<InfiniteCameraGridState>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const opacityRef = useRef(0);
  const image = texture.image as { width?: number; height?: number } | undefined;
  const aspect = image?.width && image?.height ? image.width / image.height : 1;

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    const cameraGrid = cameraGridRef.current;
    if (!mesh || !material || !cameraGrid) return;

    const chunkDistance = Math.max(
      Math.abs(plane.chunk[0] - cameraGrid.cx),
      Math.abs(plane.chunk[1] - cameraGrid.cy),
      Math.abs(plane.chunk[2] - cameraGrid.cz)
    );
    const chunkFade =
      chunkDistance <= INFINITE_RENDER_DISTANCE
        ? 1
        : clampNumber(1 - (chunkDistance - INFINITE_RENDER_DISTANCE) / Math.max(INFINITE_FADE_MARGIN, 0.0001), 0, 1);
    const depthDistance = Math.abs(plane.position[2] - cameraGrid.camZ);
    const depthFade = depthDistance < 62 ? 1 : clampNumber(1 - (depthDistance - 62) / 68, 0, 1);
    const targetOpacity = chunkFade * depthFade * depthFade;

    opacityRef.current = targetOpacity < 0.01 && opacityRef.current < 0.01 ? 0 : THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.18);
    material.opacity = opacityRef.current;
    material.depthWrite = opacityRef.current > 0.98;
    mesh.visible = opacityRef.current > 0.012;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={INFINITE_PLANE_GEOMETRY}
      position={plane.position}
      rotation={[0, 0, plane.rotation]}
      scale={[plane.size * aspect, plane.size, 1]}
      visible={false}
    >
      <meshBasicMaterial ref={materialRef} map={texture} transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

function InfiniteCanvasField({
  textures,
  compact,
  scale
}: {
  textures: THREE.Texture[];
  compact: boolean;
  scale: number;
}) {
  const { camera, gl } = useThree();
  const cameraGridRef = useRef<InfiniteCameraGridState>({ cx: 0, cy: 0, cz: 0, camZ: INFINITE_INITIAL_CAMERA_Z });
  const controllerRef = useRef({
    velocity: { x: 0, y: 0, z: 0 },
    targetVelocity: { x: 0, y: 0, z: 0 },
    basePosition: { x: 0, y: 0, z: INFINITE_INITIAL_CAMERA_Z },
    lastMouse: { x: 0, y: 0 },
    scrollAccum: 0,
    isDragging: false,
    keys: new Set<string>(),
    lastChunkKey: ""
  });
  const [planes, setPlanes] = useState(() => buildInfinitePlanes(0, 0, 0, textures.length, compact));

  useEffect(() => {
    const canvas = gl.domElement;
    const controller = controllerRef.current;

    canvas.style.cursor = "grab";

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      event.preventDefault();
      controller.isDragging = true;
      controller.lastMouse = { x: event.clientX, y: event.clientY };
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (!controller.isDragging) return;

      const zoomFactor = clampNumber(Math.abs(controller.basePosition.z) / INFINITE_INITIAL_CAMERA_Z, 0.45, 1.8);
      controller.targetVelocity.x -= (event.clientX - controller.lastMouse.x) * 0.018 * zoomFactor;
      controller.targetVelocity.y += (event.clientY - controller.lastMouse.y) * 0.018 * zoomFactor;
      controller.lastMouse = { x: event.clientX, y: event.clientY };
    };

    const stopDrag = () => {
      controller.isDragging = false;
      canvas.style.cursor = "grab";
    };

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      controller.scrollAccum += event.deltaY * 0.0038;
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      controller.keys.add(event.key.toLowerCase());
    };

    const handleKeyUp = (event: globalThis.KeyboardEvent) => {
      controller.keys.delete(event.key.toLowerCase());
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointerleave", stopDrag);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrag);
      canvas.removeEventListener("pointerleave", stopDrag);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl]);

  useFrame(() => {
    const controller = controllerRef.current;
    const keys = controller.keys;
    const keyboardSpeed = 0.08;

    if (keys.has("w") || keys.has("arrowup")) controller.targetVelocity.z -= keyboardSpeed;
    if (keys.has("s") || keys.has("arrowdown")) controller.targetVelocity.z += keyboardSpeed;
    if (keys.has("a") || keys.has("arrowleft")) controller.targetVelocity.x -= keyboardSpeed;
    if (keys.has("d") || keys.has("arrowright")) controller.targetVelocity.x += keyboardSpeed;
    if (keys.has("q")) controller.targetVelocity.y -= keyboardSpeed;
    if (keys.has("e")) controller.targetVelocity.y += keyboardSpeed;

    controller.targetVelocity.z += controller.scrollAccum;
    controller.scrollAccum *= 0.78;

    controller.targetVelocity.x = clampNumber(controller.targetVelocity.x, -INFINITE_MAX_VELOCITY, INFINITE_MAX_VELOCITY);
    controller.targetVelocity.y = clampNumber(controller.targetVelocity.y, -INFINITE_MAX_VELOCITY, INFINITE_MAX_VELOCITY);
    controller.targetVelocity.z = clampNumber(controller.targetVelocity.z, -INFINITE_MAX_VELOCITY, INFINITE_MAX_VELOCITY);

    controller.velocity.x = THREE.MathUtils.lerp(controller.velocity.x, controller.targetVelocity.x, INFINITE_VELOCITY_LERP);
    controller.velocity.y = THREE.MathUtils.lerp(controller.velocity.y, controller.targetVelocity.y, INFINITE_VELOCITY_LERP);
    controller.velocity.z = THREE.MathUtils.lerp(controller.velocity.z, controller.targetVelocity.z, INFINITE_VELOCITY_LERP);

    controller.basePosition.x += controller.velocity.x;
    controller.basePosition.y += controller.velocity.y;
    controller.basePosition.z += controller.velocity.z;

    camera.position.set(controller.basePosition.x, controller.basePosition.y, controller.basePosition.z);
    camera.lookAt(controller.basePosition.x, controller.basePosition.y, controller.basePosition.z - 80);

    controller.targetVelocity.x *= INFINITE_VELOCITY_DECAY;
    controller.targetVelocity.y *= INFINITE_VELOCITY_DECAY;
    controller.targetVelocity.z *= INFINITE_VELOCITY_DECAY;

    const cx = Math.floor(controller.basePosition.x / INFINITE_CHUNK_SIZE);
    const cy = Math.floor(controller.basePosition.y / INFINITE_CHUNK_SIZE);
    const cz = Math.floor(controller.basePosition.z / INFINITE_CHUNK_SIZE);
    const chunkKey = `${cx},${cy},${cz}`;

    cameraGridRef.current = { cx, cy, cz, camZ: controller.basePosition.z };

    if (chunkKey !== controller.lastChunkKey) {
      controller.lastChunkKey = chunkKey;
      setPlanes(buildInfinitePlanes(cx, cy, cz, textures.length, compact));
    }
  });

  return (
    <group scale={scale}>
      {planes.map((plane) => (
        <InfiniteCanvasPlane
          key={plane.id}
          plane={plane}
          texture={textures[plane.mediaIndex % textures.length]}
          cameraGridRef={cameraGridRef}
        />
      ))}
    </group>
  );
}

function InfiniteCanvasWebGL({
  images,
  compact,
  scale
}: {
  images: PlaceholderImage[];
  compact: boolean;
  scale: number;
}) {
  const textures = useLoader(
    THREE.TextureLoader,
    images.map((image) => image.src)
  );

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 6;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  });

  return <InfiniteCanvasField textures={textures} compact={compact} scale={scale} />;
}

function MediaPreview({ props, renderer, mode }: { props: EffectProps; renderer: string; mode: string }) {
  const compact = mode === "card";
  const menuImages = images(4, 0);
  const orbitStageRef = useRef<HTMLDivElement>(null);
  const orbitWebglMotionRef = useRef<OrbitGalleryMotionState>({
    currentY: 0,
    targetY: 0,
    strength: 0,
    targetStrength: 0,
    pointerX: 0,
    pointerY: 0
  });
  const curveStageRef = useRef<HTMLDivElement>(null);
  const curveVisualRef = useRef<CurvedMotionState>({ target: 0, current: 0, speed: 0, pointerX: 0, pointerY: 0 });
  const motion = { progress: 0, scrollPx: 0, velocity: 0, pointerX: 0, pointerY: 0 };
  const orbitBendValue = numberValue(props, "bendStrength", compact ? 18 : 37);
  const orbitParallaxValue = numberValue(props, "pointerParallax", compact ? 10 : 24);
  const curveDepthValue = numberValue(props, "curveDepth", compact ? 34 : 62);
  const curveBendValue = numberValue(props, "bendStrength", compact ? 22 : 34);

  const applyCurveWheelDelta = useCallback((delta: number) => {
    const motionState = curveVisualRef.current;
    const scrollDelta = delta * (compact ? 0.006 : 0.0052);
    motionState.target += scrollDelta;
    motionState.speed = THREE.MathUtils.clamp(motionState.speed + scrollDelta * 1.8, -3.2, 3.2);
  }, [compact]);

  const handleCurvePointer = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    curveVisualRef.current.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    curveVisualRef.current.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  useEffect(() => {
    if (renderer !== "curved-scroll-gallery") return undefined;
    const stage = curveStageRef.current;
    if (!stage) return undefined;

    const handleNativeWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const dominantDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      applyCurveWheelDelta(dominantDelta);
    };

    stage.addEventListener("wheel", handleNativeWheel, { capture: true, passive: false });
    return () => {
      stage.removeEventListener("wheel", handleNativeWheel, { capture: true });
    };
  }, [applyCurveWheelDelta, renderer]);

  const applyOrbitWheelDelta = useCallback((dominantDelta: number) => {
    const motion = orbitWebglMotionRef.current;
    motion.targetY += dominantDelta * (compact ? 0.006 : 0.0044);
    motion.targetStrength = Math.min(2.4, Math.max(motion.targetStrength, Math.abs(dominantDelta) * 0.006));
  }, [compact]);

  useEffect(() => {
    if (renderer !== "orbit-gallery") return undefined;
    const stage = orbitStageRef.current;
    if (!stage) return undefined;

    const handleNativeWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const dominantDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      applyOrbitWheelDelta(dominantDelta);
    };

    stage.addEventListener("wheel", handleNativeWheel, { capture: true, passive: false });
    return () => {
      stage.removeEventListener("wheel", handleNativeWheel, { capture: true });
    };
  }, [applyOrbitWheelDelta, renderer]);

  const handleOrbitPointer = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const motion = orbitWebglMotionRef.current;
    motion.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    motion.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const motionStyle = {
    "--media-progress": motion.progress.toFixed(4),
    "--media-scroll-px": motion.scrollPx.toFixed(2),
    "--media-velocity": motion.velocity.toFixed(4),
    "--media-pointer-x": motion.pointerX.toFixed(4),
    "--media-pointer-y": motion.pointerY.toFixed(4),
    "--orbit-pointer-x": "0px",
    "--orbit-pointer-y": "0px",
    "--orbit-rotate-x": "0deg",
    "--orbit-depth": "0px",
    "--orbit-stretch": "1",
    "--orbit-shift-a": "0px",
    "--orbit-shift-b": "0px",
    "--orbit-shift-c": "0px",
    "--orbit-shift-d": "0px",
    "--orbit-card-depth-a": "0px",
    "--orbit-card-depth-b": "0px",
    "--orbit-card-depth-c": "0px",
    "--orbit-card-depth-d": "0px",
    "--orbit-card-stretch-a": "1",
    "--orbit-card-stretch-b": "1",
    "--orbit-card-stretch-c": "1",
    "--orbit-card-stretch-d": "1"
  } as CSSProperties;

  if (renderer === "orbit-gallery") {
    const orbitItemCount = Math.round(numberValue(props, "imageCount", compact ? 12 : 21));
    const orbitLoopImages = images(orbitItemCount * (compact ? 3 : 2), 0);
    const orbitWords = ["Swipe", "Culture", "Discover"];

    return (
      <div
        ref={orbitStageRef}
        className="notion-rb-media-stage notion-rb-orbit-gallery-stage"
        style={
          {
            ...motionStyle,
            "--orbit-bend": orbitBendValue,
            "--orbit-parallax": orbitParallaxValue
          } as CSSProperties
        }
        onPointerMove={handleOrbitPointer}
      >
        <Canvas
          className="notion-rb-orbit-webgl-canvas"
          camera={{ position: [0, 0, compact ? 8.5 : 8], fov: compact ? 28 : 32 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <OrbitWebGLGallery
              images={orbitLoopImages}
              motionRef={orbitWebglMotionRef}
              compact={compact}
              bendStrength={orbitBendValue}
              pointerParallax={orbitParallaxValue}
            />
          </Suspense>
        </Canvas>
        <div className="notion-rb-orbit-title" aria-hidden="true">
          {orbitWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
        <div className="notion-rb-orbit-footer">
          <span>MICHAL ZALOBNY</span>
          <span>portfolio 2021</span>
          <span>Twitter</span>
          <span>Github</span>
          <span>LinkedIn</span>
        </div>
      </div>
    );
  }

  if (renderer === "curved-scroll-gallery") {
    const curvedImageCount = Math.round(numberValue(props, "imageCount", compact ? 28 : 56));
    const galleryImages = images(Math.min(20, curvedImageCount), 6);

    return (
      <div
        ref={curveStageRef}
        className="notion-rb-media-stage notion-rb-curved-scroll-gallery-stage"
        style={
          {
            ...motionStyle,
            "--curve-depth": `${curveDepthValue}px`,
            "--curve-bend": curveBendValue
          } as CSSProperties
        }
        onPointerMove={handleCurvePointer}
      >
        <div className="notion-rb-curved-gallery-viewport">
          <Canvas
            className="notion-rb-curved-webgl-canvas"
            camera={{ position: [0, 0, compact ? 6.4 : 6], fov: compact ? 68 : 75, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#151515"]} />
            <Suspense fallback={null}>
              <CurvedWebGLGallery
                images={galleryImages}
                pageCount={curvedImageCount}
                motionRef={curveVisualRef}
                curveDepth={curveDepthValue}
                bendStrength={curveBendValue}
                compact={compact}
              />
            </Suspense>
          </Canvas>
        </div>
        <div className="notion-rb-media-copy">
          <span>Design Atlas magazine</span>
          <strong>Collected covers in motion.</strong>
        </div>
        <div className="notion-rb-curved-header">
          <span>Digital research</span>
          <span>Archive</span>
          <span>Motion index</span>
          <span>Studio notes</span>
        </div>
        <div className="notion-rb-curved-footer">
          <span>2026</span>
          <span>W27</span>
          <span>M07</span>
        </div>
      </div>
    );
  }

  if (renderer === "infinite-canvas") {
    const canvasImages = images(Math.round(numberValue(props, "tileCount", compact ? 14 : 24)), 0);
    return (
      <div
        className="notion-rb-media-stage notion-rb-infinite-canvas-stage"
        style={
          {
            "--canvas-scale": numberValue(props, "scale", 1)
          } as CSSProperties
        }
      >
        <Canvas
          className="notion-rb-infinite-canvas-webgl"
          camera={{ position: [0, 0, INFINITE_INITIAL_CAMERA_Z], fov: compact ? 50 : 46, near: 1, far: 230 }}
          dpr={[1, 1.5]}
          flat
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#f6f3ed"]} />
          <fog attach="fog" args={["#f6f3ed", compact ? 62 : 76, compact ? 132 : 178]} />
          <Suspense fallback={null}>
            <InfiniteCanvasWebGL
              images={canvasImages}
              compact={compact}
              scale={numberValue(props, "scale", 1)}
            />
          </Suspense>
        </Canvas>
        <div className="notion-rb-infinite-frame">
          <div className="notion-rb-infinite-frame-top-left">
            <span>Source</span>
            <span>GitHub</span>
            <span>All demos</span>
          </div>
          <div className="notion-rb-infinite-frame-top-right">By Design Atlas</div>
          <div className="notion-rb-infinite-frame-bottom-left">
            <span>#scroll</span>
            <span>#infinite</span>
            <span>#draggable</span>
            <span>#three.js</span>
            <span>#webgl</span>
          </div>
          <div className="notion-rb-infinite-frame-bottom-right">
            With Design Atlas, nothing stands between your ideas and the final result
          </div>
        </div>
        <div className="notion-rb-infinite-title">Infinite Canvas</div>
        <div className="notion-rb-canvas-hud">
          <span>Infinite Canvas</span>
          <strong>Collected works in 3D space.</strong>
        </div>
      </div>
    );
  }

  if (renderer === "flowing-menu") {
    return (
      <div className="notion-rb-media-stage notion-rb-flowing-menu-stage">
        <FlowingMenu
          items={["Archive", "Signals", "Systems", "Studio"].map((label, index) => ({
            text: label,
            link: "#",
            image: menuImages[index].src
          }))}
          speed={numberValue(props, "speed", 15)}
          textColor={stringValue(props, "textColor", "#f5f5f7")}
          bgColor={stringValue(props, "bgColor", "#09090b")}
          marqueeBgColor={stringValue(props, "marqueeBgColor", "#b7d075")}
          marqueeTextColor={stringValue(props, "marqueeTextColor", "#050505")}
          borderColor={stringValue(props, "borderColor", "rgba(255,255,255,0.18)")}
        />
      </div>
    );
  }

  if (renderer === "card-swap") {
    const cardImages = images(3, 4);
    return (
      <div className="notion-rb-media-stage notion-rb-card-swap-stage">
        <div className="notion-rb-card-swap-copy">
          <span>Design Atlas</span>
          <strong>Layered cards with a timed swap rhythm.</strong>
        </div>
        <CardSwap
          width={compact ? 210 : 320}
          height={compact ? 150 : 220}
          cardDistance={numberValue(props, "cardDistance", compact ? 34 : 54)}
          verticalDistance={numberValue(props, "verticalDistance", compact ? 38 : 64)}
          delay={numberValue(props, "delay", 4200)}
          pauseOnHover={booleanValue(props, "pauseOnHover", true)}
          skewAmount={numberValue(props, "skewAmount", 6)}
          easing={selectValue<SwapEasing>(props, "easing", "elastic", ["elastic", "linear"])}
        >
          {cardImages.map((image, index) => (
            <Card key={image.src}>
              <img src={image.src} alt={image.alt} />
              <span>{["Editorial", "Museum", "Archive"][index]}</span>
            </Card>
          ))}
        </CardSwap>
      </div>
    );
  }

  return (
    <div className="notion-rb-media-stage notion-rb-image-trail-stage">
      <div className="notion-rb-image-trail-copy">
        <span>Move across the canvas</span>
        <strong>Curated images follow the pointer.</strong>
      </div>
      <ImageTrail items={images(8, 8).map((image) => image.src)} variant={numberValue(props, "variant", 1)} />
    </div>
  );
}

function ComponentPreview({ props, renderer, mode }: { props: EffectProps; renderer: string; mode: string }) {
  const compact = mode === "card";

  if (renderer === "glass-surface") {
    const bgImages = images(compact ? 6 : 10, 10);
    return (
      <div className="notion-rb-component-stage notion-rb-glass-surface-stage">
        <div className="notion-rb-glass-scroll" tabIndex={0} aria-label="Scrollable glass surface preview content">
          <div className="notion-rb-glass-scroll-copy">
            <span>Design Atlas archive</span>
            <strong>Scroll the content behind the glass.</strong>
          </div>
          <div className="notion-rb-glass-background">
            {bgImages.map((image, index) => (
              <figure key={image.src} className={index % 3 === 1 ? "is-tall" : ""}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="notion-rb-glass-scroll-copy is-secondary">
            <span>Material notes</span>
            <strong>Refraction is easiest to judge when artwork, captions, and edges move underneath.</strong>
          </div>
        </div>
        <div className="notion-rb-glass-surface-overlay" aria-hidden="true">
          <GlassSurface
            width={compact ? 220 : 420}
            height={compact ? 72 : 118}
            borderRadius={numberValue(props, "borderRadius", 24)}
            borderWidth={numberValue(props, "borderWidth", 0.07)}
            brightness={numberValue(props, "brightness", 50)}
            opacity={numberValue(props, "opacity", 0.93)}
            blur={numberValue(props, "blur", 11)}
            displace={numberValue(props, "displace", 0)}
            backgroundOpacity={numberValue(props, "backgroundOpacity", 0)}
            saturation={numberValue(props, "saturation", 1)}
            distortionScale={numberValue(props, "distortionScale", -180)}
            redOffset={numberValue(props, "redOffset", 0)}
            greenOffset={numberValue(props, "greenOffset", 10)}
            blueOffset={numberValue(props, "blueOffset", 20)}
            xChannel={selectValue<GlassChannel>(props, "xChannel", "R", ["R", "G", "B"])}
            yChannel={selectValue<GlassChannel>(props, "yChannel", "G", ["R", "G", "B"])}
            mixBlendMode={selectValue<GlassBlend>(props, "mixBlendMode", "difference", [
              "normal",
              "screen",
              "overlay",
              "difference",
              "plus-lighter"
            ])}
          >
            <span>Design Atlas</span>
          </GlassSurface>
        </div>
      </div>
    );
  }

  if (renderer === "fluid-glass") {
    const modeValue = selectValue(props, "mode", "lens", ["lens", "bar", "cube"]);
    const modeProps = {
      scale: numberValue(props, "scale", modeValue === "bar" ? 0.2 : 0.15),
      ior: numberValue(props, "ior", 1.15),
      thickness: numberValue(props, "thickness", 5),
      chromaticAberration: numberValue(props, "chromaticAberration", 0.1)
    };

    return (
      <div className="notion-rb-component-stage notion-rb-fluid-glass-stage">
        <FluidGlass mode={modeValue} lensProps={modeProps} barProps={modeProps} cubeProps={modeProps} />
      </div>
    );
  }

  return (
    <div className="notion-rb-component-stage notion-rb-strands-stage">
      <Strands
        colors={colorsFromProps(props, ["color0", "color1", "color2"], ["#b7d075", "#8bd3ff", "#f5f5f7"])}
        count={numberValue(props, "count", 70)}
        speed={numberValue(props, "speed", 1)}
        amplitude={numberValue(props, "amplitude", 1)}
        waviness={numberValue(props, "waviness", 1)}
        thickness={numberValue(props, "thickness", 1)}
        glow={numberValue(props, "glow", 0.35)}
        intensity={numberValue(props, "intensity", 1)}
        saturation={numberValue(props, "saturation", 1)}
        opacity={numberValue(props, "opacity", 1)}
        scale={numberValue(props, "scale", 1)}
        glass={booleanValue(props, "glass", false)}
      />
      <div className="notion-rb-strands-copy">Design Atlas motion field</div>
    </div>
  );
}

function InteractionPreview({ props, renderer, mode }: { props: EffectProps; renderer: string; mode: string }) {
  const compact = mode === "card";

  if (renderer === "splash-cursor") {
    return (
      <div className="notion-rb-interaction-stage notion-rb-splash-stage">
        <div className="notion-rb-splash-copy">
          <span>Pointer-responsive color</span>
          <strong>Fluid trails react to movement.</strong>
        </div>
        <SplashCursor
          SIM_RESOLUTION={numberValue(props, "SIM_RESOLUTION", 128)}
          DYE_RESOLUTION={numberValue(props, "DYE_RESOLUTION", 1440)}
          DENSITY_DISSIPATION={numberValue(props, "DENSITY_DISSIPATION", 3.5)}
          VELOCITY_DISSIPATION={numberValue(props, "VELOCITY_DISSIPATION", 2)}
          PRESSURE={numberValue(props, "PRESSURE", 0.1)}
          CURL={numberValue(props, "CURL", 3)}
          SPLAT_RADIUS={numberValue(props, "SPLAT_RADIUS", 0.2)}
          SPLAT_FORCE={numberValue(props, "SPLAT_FORCE", 6000)}
          SHADING={booleanValue(props, "SHADING", true)}
          COLOR={stringValue(props, "COLOR", "#b7d075")}
          BACK_COLOR={hexToRgbObject(stringValue(props, "BACK_COLOR", "#000000"))}
          TRANSPARENT={booleanValue(props, "TRANSPARENT", true)}
        />
      </div>
    );
  }

  if (renderer === "shape-blur") {
    return (
      <div className="notion-rb-interaction-stage notion-rb-shape-blur-stage">
        <ShapeBlur
          className="notion-rb-shape-blur-canvas"
          variation={numberValue(props, "variation", 0)}
          pixelRatioProp={numberValue(props, "pixelRatioProp", 2)}
          shapeSize={numberValue(props, "shapeSize", 1.2)}
          roundness={numberValue(props, "roundness", 0.4)}
          borderSize={numberValue(props, "borderSize", 0.05)}
          circleSize={numberValue(props, "circleSize", 0.3)}
          circleEdge={numberValue(props, "circleEdge", 0.5)}
        />
        <div className="notion-rb-shape-blur-copy">Drag near the outline</div>
      </div>
    );
  }

  if (renderer === "magnet-lines") {
    return (
      <div className="notion-rb-interaction-stage notion-rb-magnet-lines-stage">
        <MagnetLines
          rows={numberValue(props, "rows", compact ? 8 : 12)}
          columns={numberValue(props, "columns", compact ? 10 : 16)}
          containerSize={compact ? "78%" : "min(58vmin, 460px)"}
          lineColor={stringValue(props, "lineColor", "#f5f5f7")}
          lineWidth={`${numberValue(props, "lineWidth", 2)}px`}
          lineHeight={`${numberValue(props, "lineHeight", 18)}px`}
          baseAngle={numberValue(props, "baseAngle", 0)}
        />
        <div className="notion-rb-magnet-lines-label">Magnetic alignment</div>
      </div>
    );
  }

  return (
    <div className="notion-rb-interaction-stage notion-rb-glare-hover-stage">
      <GlareHover
        width={compact ? "72%" : "420px"}
        height={compact ? "58%" : "260px"}
        background={stringValue(props, "background", "#111114")}
        borderRadius={`${numberValue(props, "borderRadius", 18)}px`}
        borderColor={stringValue(props, "borderColor", "rgba(255,255,255,0.18)")}
        glareColor={stringValue(props, "glareColor", "#ffffff")}
        glareOpacity={numberValue(props, "glareOpacity", 0.35)}
        glareAngle={numberValue(props, "glareAngle", -30)}
        glareSize={numberValue(props, "glareSize", 300)}
        transitionDuration={numberValue(props, "transitionDuration", 800)}
        playOnce={booleanValue(props, "playOnce", false)}
      >
        <div className="notion-rb-glare-content">
          <span>Design Atlas</span>
          <strong>Hover glare surface</strong>
        </div>
      </GlareHover>
    </div>
  );
}

function NavigationPreview({ props }: { props: EffectProps }) {
  return (
    <div className="notion-rb-navigation-stage notion-rb-staggered-menu-stage">
      <StaggeredMenu
        position={selectValue<MenuPosition>(props, "position", "right", ["left", "right"])}
        colors={colorsFromProps(props, ["color0", "color1", "color2"], ["#111114", "#2a2d31", "#b7d075"])}
        items={[
          { label: "Workbench", ariaLabel: "Workbench", link: "#" },
          { label: "Inspiration", ariaLabel: "Inspiration", link: "#" },
          { label: "Library", ariaLabel: "Library", link: "#" },
          { label: "Systems", ariaLabel: "Systems", link: "#" }
        ]}
        socialItems={[
          { label: "Notes", link: "#" },
          { label: "Archive", link: "#" }
        ]}
        displaySocials={booleanValue(props, "displaySocials", true)}
        displayItemNumbering={booleanValue(props, "displayItemNumbering", true)}
        menuButtonColor={stringValue(props, "menuButtonColor", "#f5f5f7")}
        openMenuButtonColor={stringValue(props, "openMenuButtonColor", "#f5f5f7")}
        accentColor={stringValue(props, "accentColor", "#b7d075")}
        changeMenuColorOnOpen={booleanValue(props, "changeMenuColorOnOpen", true)}
        closeOnClickAway={false}
      />
    </div>
  );
}

function BackgroundPreview({ props, renderer }: { props: EffectProps; renderer: string }) {
  if (renderer === "beams") {
    return (
      <Beams
        beamWidth={numberValue(props, "beamWidth", 3)}
        beamHeight={numberValue(props, "beamHeight", 30)}
        beamNumber={numberValue(props, "beamNumber", 20)}
        lightColor={stringValue(props, "lightColor", "#ffffff")}
        speed={numberValue(props, "speed", 2)}
        noiseIntensity={numberValue(props, "noiseIntensity", 1.75)}
        scale={numberValue(props, "scale", 0.2)}
        rotation={numberValue(props, "rotation", 30)}
      />
    );
  }

  if (renderer === "dither") {
    return (
      <Dither
        waveColor={hexToRgbUnit(stringValue(props, "waveColor", "#808080"))}
        mouseRadius={numberValue(props, "mouseRadius", 0.3)}
        colorNum={numberValue(props, "colorNum", 4)}
        pixelSize={numberValue(props, "pixelSize", 2)}
        waveAmplitude={numberValue(props, "waveAmplitude", 0.3)}
        waveFrequency={numberValue(props, "waveFrequency", 3)}
        waveSpeed={numberValue(props, "waveSpeed", 0.05)}
        enableMouseInteraction={booleanValue(props, "enableMouseInteraction", true)}
        disableAnimation={booleanValue(props, "disableAnimation", false)}
      />
    );
  }

  if (renderer === "dot-field") {
    return (
      <DotField
        dotRadius={numberValue(props, "dotRadius", 1.5)}
        dotSpacing={numberValue(props, "dotSpacing", 14)}
        cursorRadius={numberValue(props, "cursorRadius", 500)}
        cursorForce={numberValue(props, "cursorForce", 0.1)}
        bulgeOnly={booleanValue(props, "bulgeOnly", true)}
        bulgeStrength={numberValue(props, "bulgeStrength", 67)}
        glowRadius={numberValue(props, "glowRadius", 160)}
        sparkle={booleanValue(props, "sparkle", false)}
        waveAmplitude={numberValue(props, "waveAmplitude", 0)}
        gradientFrom={stringValue(props, "gradientFrom", "#A855F7")}
        gradientTo={stringValue(props, "gradientTo", "#B497CF")}
        glowColor={stringValue(props, "glowColor", "#120F17")}
      />
    );
  }

  if (renderer === "gradient-blinds") {
    return (
      <GradientBlinds
        gradientColors={colorsFromProps(props, ["color1", "color2"], ["#FF9FFC", "#5227FF"])}
        angle={numberValue(props, "angle", 20)}
        noise={numberValue(props, "noise", 0.5)}
        blindCount={numberValue(props, "blindCount", 16)}
        blindMinWidth={numberValue(props, "blindMinWidth", 60)}
        mouseDampening={numberValue(props, "mouseDampening", 0.15)}
        mirrorGradient={booleanValue(props, "mirrorGradient", false)}
        spotlightRadius={numberValue(props, "spotlightRadius", 0.5)}
        spotlightSoftness={numberValue(props, "spotlightSoftness", 1)}
        spotlightOpacity={numberValue(props, "spotlightOpacity", 1)}
        distortAmount={numberValue(props, "distortAmount", 0)}
        shineDirection={stringValue(props, "shineDirection", "left") === "right" ? "right" : "left"}
        mixBlendMode={stringValue(props, "mixBlendMode", "lighten")}
      />
    );
  }

  if (renderer === "letter-glitch") {
    return (
      <LetterGlitch
        glitchColors={colorsFromProps(props, ["color0", "color1", "color2"], ["#2b4539", "#61dca3", "#61b3dc"])}
        glitchSpeed={numberValue(props, "glitchSpeed", 50)}
        centerVignette={booleanValue(props, "centerVignette", true)}
        outerVignette={booleanValue(props, "outerVignette", false)}
        smooth={booleanValue(props, "smooth", true)}
        characters={stringValue(props, "characters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789")}
      />
    );
  }

  if (renderer === "light-rays") {
    return (
      <LightRays
        raysOrigin={
          stringValue(props, "raysOrigin", "top-center") as
            | "top-center"
            | "top-left"
            | "top-right"
            | "right"
            | "left"
            | "bottom-center"
            | "bottom-right"
            | "bottom-left"
        }
        raysColor={stringValue(props, "raysColor", "#ffffff")}
        raysSpeed={numberValue(props, "raysSpeed", 1)}
        lightSpread={numberValue(props, "lightSpread", 0.5)}
        rayLength={numberValue(props, "rayLength", 3)}
        pulsating={booleanValue(props, "pulsating", false)}
        fadeDistance={numberValue(props, "fadeDistance", 1)}
        saturation={numberValue(props, "saturation", 1)}
        followMouse={booleanValue(props, "followMouse", true)}
        mouseInfluence={numberValue(props, "mouseInfluence", 0.1)}
        noiseAmount={numberValue(props, "noiseAmount", 0)}
        distortion={numberValue(props, "distortion", 0)}
      />
    );
  }

  if (renderer === "pixel-blast") {
    return (
      <PixelBlast
        variant={stringValue(props, "variant", "square") as "square" | "circle" | "triangle" | "diamond"}
        pixelSize={numberValue(props, "pixelSize", 4)}
        patternScale={numberValue(props, "patternScale", 2)}
        patternDensity={numberValue(props, "patternDensity", 1)}
        pixelSizeJitter={numberValue(props, "pixelSizeJitter", 0)}
        enableRipples={booleanValue(props, "enableRipples", true)}
        liquid={booleanValue(props, "liquid", false)}
        liquidStrength={numberValue(props, "liquidStrength", 0.1)}
        speed={numberValue(props, "speed", 0.5)}
        edgeFade={numberValue(props, "edgeFade", 0.25)}
        noiseAmount={numberValue(props, "noiseAmount", 0)}
        color={stringValue(props, "color", "#B497CF")}
      />
    );
  }

  if (renderer === "prism") {
    return (
      <Prism
        animationType={stringValue(props, "animationType", "rotate") as "rotate" | "hover" | "3drotate"}
        timeScale={numberValue(props, "timeScale", 0.5)}
        scale={numberValue(props, "scale", 3.6)}
        noise={numberValue(props, "noise", 0)}
        glow={numberValue(props, "glow", 1)}
        height={numberValue(props, "height", 3.5)}
        baseWidth={numberValue(props, "baseWidth", 5.5)}
        hueShift={numberValue(props, "hueShift", 0)}
        colorFrequency={numberValue(props, "colorFrequency", 1)}
        bloom={numberValue(props, "bloom", 1)}
      />
    );
  }

  return (
    <PrismaticBurst
      animationType={stringValue(props, "animationType", "rotate3d") as "rotate" | "rotate3d" | "hover"}
      intensity={numberValue(props, "intensity", 2)}
      speed={numberValue(props, "speed", 0.5)}
      distort={numberValue(props, "distort", 0)}
      hoverDampness={numberValue(props, "hoverDampness", 0.25)}
      rayCount={numberValue(props, "rayCount", 0)}
      colors={colorsFromProps(props, ["color0", "color1", "color2"], ["#A855F7", "#7C3AED", "#6366F1"])}
      mixBlendMode={stringValue(props, "mixBlendMode", "screen") as CSSProperties["mixBlendMode"]}
    />
  );
}

export function NotionInboxPreview(props: EffectProps) {
  const renderer = stringValue(props, "renderer", stringValue(props, "variant", "shiny-text"));
  const previewMode = stringValue(props, "previewMode", "");
  const textRenderers = [
    "shiny-text",
    "shuffle",
    "text-pressure",
    "text-type",
    "rotating-text",
    "variable-proximity",
    "true-focus",
    "decrypted-text"
  ];
  const mediaRenderers = ["flowing-menu", "card-swap", "image-trail", "orbit-gallery", "curved-scroll-gallery", "infinite-canvas"];
  const componentRenderers = ["glass-surface", "fluid-glass", "strands"];
  const interactionRenderers = ["splash-cursor", "shape-blur", "magnet-lines", "glare-hover"];
  const navigationRenderers = ["staggered-menu"];
  const isText = textRenderers.includes(renderer);
  const compact = previewMode === "card";
  const renderPreview = () => {
    if (textRenderers.includes(renderer)) {
      return <TextPreview props={props} renderer={renderer} mode={previewMode} />;
    }
    if (mediaRenderers.includes(renderer)) {
      return <MediaPreview props={props} renderer={renderer} mode={previewMode} />;
    }
    if (componentRenderers.includes(renderer)) {
      return <ComponentPreview props={props} renderer={renderer} mode={previewMode} />;
    }
    if (interactionRenderers.includes(renderer)) {
      return <InteractionPreview props={props} renderer={renderer} mode={previewMode} />;
    }
    if (navigationRenderers.includes(renderer)) {
      return <NavigationPreview props={props} />;
    }
    return <BackgroundPreview props={props} renderer={renderer} />;
  };

  return (
    <div
      className={`notion-inbox-preview notion-rb-preview notion-rb-${isText ? "text-effect" : "background-effect"} notion-rb-${renderer} ${
        compact ? "notion-rb-card" : ""
      }`}
    >
      {renderPreview()}
    </div>
  );
}
