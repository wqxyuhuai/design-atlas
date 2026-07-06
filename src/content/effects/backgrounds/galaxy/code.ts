export const code = `import { useEffect, useMemo, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

interface GalaxyProps {
  focalX?: number;
  focalY?: number;
  rotation?: number;
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseInteraction?: boolean;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  disableAnimation?: boolean;
}

const vertexShader = \`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
\`;

const fragmentShader = \`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) { return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * fract(x) - 1.0)); }
float trisn(float x) { return 2.0 * tris(x) - 1.0; }

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  return m * smoothstep(1.0, 0.2, d);
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float flareSize = smoothstep(0.9, 1.0, size) * tri(uStarSpeed / (PERIOD * seed + 1.0));
      vec3 base = vec3(
        smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF,
        0.0,
        smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF
      );
      base.g = min(base.r, base.b) * seed;

      float hue = atan(base.g - base.r, base.b - base.r) / 6.28318 + 0.5;
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      base = hsv2rgb(vec3(fract(hue + uHueShift / 360.0), sat, max(max(base.r, base.g), base.b)));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      star *= mix(1.0, trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0, uTwinkleIntensity);
      col += star * size * base;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    uv += normalize(uv) * (uAutoCenterRepulsion / (length(uv) + 0.1)) * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    uv += normalize(uv - mousePosUV) * (uRepulsionStrength / (length(uv - mousePosUV) + 0.1)) * 0.05 * uMouseActiveFactor;
  } else {
    uv += mouseNorm * 0.1 * uMouseActiveFactor;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  uv = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle)) * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    col += StarLayer(uv * scale + i * 453.32) * depth * smoothstep(1.0, 0.9, depth);
  }

  float alpha = uTransparent ? min(smoothstep(0.0, 0.3, length(col)), 1.0) : 1.0;
  gl_FragColor = vec4(col, alpha);
}
\`;

export function Galaxy({
  focalX = 0.5,
  focalY = 0.5,
  rotation = 0,
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  speed = 1,
  glowIntensity = 0.3,
  saturation = 0,
  mouseInteraction = true,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  disableAnimation = false
}: GalaxyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const targetActive = useRef(0);
  const smoothActive = useRef(0);
  const rotationVector = useMemo(() => {
    const radians = (rotation * Math.PI) / 180;
    return [Math.cos(radians), Math.sin(radians)] as [number, number];
  }, [rotation]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false });
    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    let frame = 0;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(container.offsetWidth, container.offsetHeight, 1) },
        uFocal: { value: new Float32Array([focalX, focalY]) },
        uRotation: { value: new Float32Array(rotationVector) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    };

    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      if (!disableAnimation) {
        program.uniforms.uTime.value = time * 0.001;
        program.uniforms.uStarSpeed.value = (time * 0.001 * starSpeed) / 10;
      }
      smoothMouse.current.x += (targetMouse.current.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (targetMouse.current.y - smoothMouse.current.y) * 0.05;
      smoothActive.current += (targetActive.current - smoothActive.current) * 0.05;
      program.uniforms.uMouse.value[0] = smoothMouse.current.x;
      program.uniforms.uMouse.value[1] = smoothMouse.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothActive.current;
      renderer.render({ scene: mesh });
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height
      };
      targetActive.current = 1;
    };

    resize();
    window.addEventListener("resize", resize);
    if (mouseInteraction) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", () => {
        targetActive.current = 0;
      });
    }
    container.appendChild(gl.canvas);
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [autoCenterRepulsion, density, disableAnimation, focalX, focalY, glowIntensity, hueShift, mouseInteraction, mouseRepulsion, repulsionStrength, rotationSpeed, rotationVector, saturation, speed, starSpeed, transparent, twinkleIntensity]);

  return <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 360 }} />;
}`;
