varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform float uOpacity;
uniform float uRadius;
uniform vec2 uVelocity;

float roundedBoxSDF(vec2 centerPosition, vec2 size, float radius) {
  return length(max(abs(centerPosition) - size + radius, 0.0)) - radius;
}

vec2 coverUv(vec2 uv) {
  float planeAspect = uPlaneSize.x / uPlaneSize.y;
  float imageAspect = uImageSize.x / uImageSize.y;
  vec2 ratio = vec2(
    min(planeAspect / imageAspect, 1.0),
    min(imageAspect / planeAspect, 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

void main() {
  vec2 uv = coverUv(vUv);
  vec2 velocity = uVelocity * 0.018;

  vec4 color = vec4(0.0);
  color += texture2D(uTexture, clamp(uv - velocity * 2.0, 0.001, 0.999)) * 0.12;
  color += texture2D(uTexture, clamp(uv - velocity, 0.001, 0.999)) * 0.18;
  color += texture2D(uTexture, uv) * 0.40;
  color += texture2D(uTexture, clamp(uv + velocity, 0.001, 0.999)) * 0.18;
  color += texture2D(uTexture, clamp(uv + velocity * 2.0, 0.001, 0.999)) * 0.12;
  color.rgb = clamp(pow(color.rgb, vec3(0.86)) * 1.08, 0.0, 1.0);

  float distance = roundedBoxSDF(vUv - 0.5, vec2(0.5), uRadius);
  float alpha = 1.0 - smoothstep(0.0, 0.005, distance);

  gl_FragColor = vec4(color.rgb, color.a * alpha * uOpacity);
}
