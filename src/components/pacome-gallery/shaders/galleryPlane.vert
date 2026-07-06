varying vec2 vUv;

uniform float uBend;
uniform vec2 uVelocity;

const float PI = 3.14159265359;

void main() {
  vUv = uv;

  vec3 pos = position;
  float curveX = sin(uv.x * PI) * uBend;
  float curveY = sin(uv.y * PI) * uBend * 0.35;

  pos.z += curveX + curveY;
  pos.x += sin(uv.y * PI) * uVelocity.x * 0.18;
  pos.y += sin(uv.x * PI) * uVelocity.y * 0.10;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
