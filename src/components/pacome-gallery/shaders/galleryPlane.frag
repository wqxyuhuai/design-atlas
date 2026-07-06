varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uColorStrength;
uniform float uZoom;
uniform vec2 uPlaneSizes;
uniform vec2 uImageSizes;
uniform float uRevealProgress;

float roundedRectSDF(vec2 uv, vec2 size, float radius) {
  vec2 d = abs(uv - 0.5) - size * 0.5 + radius;
  return length(max(d, 0.0)) - radius;
}

vec2 coverUv(vec2 uv) {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

void main() {
  vec2 uv = coverUv(vUv);
  vec2 zoomedUv = (uv - 0.5) / uZoom + 0.5;
  vec4 color;

  if (gl_FrontFacing) {
    color = texture2D(uTexture, zoomedUv);
    color = mix(color, vec4(0.0, 0.0, 0.0, 1.0), uColorStrength);
  } else {
    float offset = 40.0 / 1024.0;
    vec4 blurred = vec4(0.0);

    blurred += texture2D(uTexture, uv + vec2(-offset, -offset)) * 1.0;
    blurred += texture2D(uTexture, uv + vec2(0.0, -offset)) * 2.0;
    blurred += texture2D(uTexture, uv + vec2(offset, -offset)) * 1.0;
    blurred += texture2D(uTexture, uv + vec2(-offset, 0.0)) * 2.0;
    blurred += texture2D(uTexture, uv) * 4.0;
    blurred += texture2D(uTexture, uv + vec2(offset, 0.0)) * 2.0;
    blurred += texture2D(uTexture, uv + vec2(-offset, offset)) * 1.0;
    blurred += texture2D(uTexture, uv + vec2(0.0, offset)) * 2.0;
    blurred += texture2D(uTexture, uv + vec2(offset, offset)) * 1.0;
    blurred /= 16.0;

    color = blurred;
  }

  float reveal = clamp(uRevealProgress, 0.0, 1.0);
  float radius = 0.05 * reveal;
  float sdf = roundedRectSDF(vUv, vec2(reveal), radius);
  float alpha = 1.0 - smoothstep(0.0, 0.002, sdf);
  alpha *= smoothstep(0.1, 1.0, uRevealProgress);

  gl_FragColor = vec4(color.rgb, alpha);
}
