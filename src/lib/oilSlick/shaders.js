/* Oil Slick / iridescent liquid metal: GLSL ES 1.00 (WebGL 1) so it runs on
   every WebGL-capable device.

   Technique:
   1. A height field from domain-warped fBm simplex noise: a liquid membrane
      whose shape drifts slowly and never repeats.
   2. Surface normals from finite differences of that field, so lighting
      follows the actual geometry instead of being painted on.
   3. Thin-film interference: film "thickness" (height + Fresnel at grazing
      slopes) indexes a controlled brand palette, the way oil on water shifts
      hue with thickness and viewing angle.
   4. Blinn-Phong silver specular (with a trace of gold) and a cyan rim,
      lit by a light that eases toward the pointer on capable devices. */

export const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

export const FRAGMENT_SHADER = `
precision __PRECISION__ float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uOctaves;

// 2D simplex noise: Ian McEwan, Stefan Gustavson (Ashima Arts), MIT license.
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  const mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    if (float(i) >= uOctaves) break;
    sum += amp * snoise(p);
    p = rot * p * 1.9 + vec2(3.1, 1.7);
    amp *= 0.38;
  }
  return sum;
}

float heightAt(vec2 p, vec2 warp, vec2 pointerPos) {
  float h = fbm(p + warp);
  float d = distance(p, pointerPos);
  // A soft swell under the pointer, like a fingertip pressing the membrane.
  h += 0.3 * uPointerStrength * exp(-d * d * 3.0);
  return h;
}

// Thin-film interference ramp, restricted to the brand palette. Cyclic:
// both ends are midnight navy, so fract() never produces a seam.
vec3 thinFilm(float x) {
  float s = fract(x) * 8.0;
  vec3 c = vec3(0.031, 0.078, 0.149);                                // midnight #081426
  c = mix(c, vec3(0.145, 0.388, 0.922), smoothstep(0.0, 1.0, s));   // electric #2563EB
  c = mix(c, vec3(0.133, 0.827, 0.933), smoothstep(1.0, 2.0, s));   // cyan #22D3EE
  c = mix(c, vec3(0.82, 0.88, 0.95), smoothstep(2.0, 3.0, s));      // silver
  c = mix(c, vec3(0.545, 0.361, 0.965), smoothstep(3.0, 4.0, s));   // violet #8B5CF6
  c = mix(c, vec3(0.62, 0.26, 0.6), smoothstep(4.0, 5.0, s));       // muted magenta
  c = mix(c, vec3(0.26, 0.22, 0.64), smoothstep(5.0, 6.0, s));      // indigo
  c = mix(c, vec3(0.145, 0.388, 0.922), smoothstep(6.0, 7.0, s));   // electric
  c = mix(c, vec3(0.031, 0.078, 0.149), smoothstep(7.0, 8.0, s));   // midnight
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  // Large, slow forms: a membrane, not a texture.
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.85;
  float t = uTime;

  // Two slow, opposed drifts warp the domain: organic, non-repeating flow.
  vec2 q = vec2(
    fbm(p * 0.7 + vec2(0.0, t * 0.04)),
    fbm(p * 0.7 + vec2(5.2, 1.3) - vec2(t * 0.032, 0.0))
  );
  vec2 warp = 0.95 * q + vec2(0.12 * sin(t * 0.05), 0.12 * cos(t * 0.04));
  vec2 pointerPos = vec2(uPointer.x * aspect, uPointer.y) * 0.85;

  float e = 0.012;
  float h = heightAt(p, warp, pointerPos);
  float hx = heightAt(p + vec2(e, 0.0), warp, pointerPos);
  float hy = heightAt(p + vec2(0.0, e), warp, pointerPos);
  vec3 n = normalize(vec3((h - hx) / e, (h - hy) / e, 1.35));

  vec3 V = vec3(0.0, 0.0, 1.0);
  vec2 lightUv = mix(vec2(0.8, 0.85), uPointer, 0.55 * uPointerStrength);
  vec3 L = normalize(vec3((lightUv - uv) * vec2(aspect, 1.0), 0.9));
  vec3 H = normalize(L + V);
  float diffuse = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(n, H), 0.0, 1.0), 60.0);
  float broad = pow(clamp(dot(n, H), 0.0, 1.0), 8.0);
  float fresnel = pow(1.0 - clamp(n.z, 0.0, 1.0), 1.4);

  // One colour cycle at most across the surface: broad fields, no rainbow bands.
  // Film thickness follows the membrane height and is clamped to the
  // midnight → electric blue → cyan → silver stretch of the ramp (no wrap).
  // Hue also shifts with lighting, as a real film does with viewing angle:
  // lit slopes lean cyan, shaded ones electric blue.
  float film = clamp(0.06 + 0.14 * h + 0.18 * fresnel + 0.1 * diffuse + 0.04 * q.x + 0.015 * sin(t * 0.06), 0.0, 0.245);
  vec3 iri = thinFilm(film);
  // Desaturation keeps it metallic rather than neon.
  iri = mix(vec3(dot(iri, vec3(0.299, 0.587, 0.114))), iri, 0.85);
  // Darkened cyan reads teal; in shadow, pull it toward azure instead.
  iri.g *= mix(0.74, 1.0, diffuse);

  // Midnight/deep navy membrane with slow indigo nuances.
  vec3 base = mix(vec3(0.031, 0.078, 0.149), vec3(0.063, 0.137, 0.247), smoothstep(-0.5, 0.7, h));
  base = mix(base, vec3(0.075, 0.085, 0.26), 0.55 * smoothstep(0.0, 0.6, q.y));
  base *= 0.55 + 0.6 * diffuse;

  // Iridescence lives on the steeper slopes; navy dominates the membrane.
  float sheen = smoothstep(0.14, 0.68, fresnel * 1.6 + broad * 0.1);
  vec3 col = mix(base, iri * (0.38 + 0.7 * diffuse), sheen * 0.75);

  // Violet and a trace of magenta as slow, large-scale veils over the slopes:
  // subtle transitions, never the dominant hue.
  float violetZone = smoothstep(-0.2, 0.4, q.y);
  col = mix(col, vec3(0.545, 0.361, 0.965) * (0.32 + 0.65 * diffuse), sheen * 0.5 * violetZone);
  col = mix(col, vec3(0.62, 0.26, 0.6) * (0.3 + 0.5 * diffuse), 0.12 * violetZone * smoothstep(0.55, 0.9, fresnel));

  // Silver specular, with the faintest gold on the crests.
  vec3 specTint = mix(vec3(0.9, 0.94, 1.0), vec3(0.83, 0.66, 0.29), 0.14 * smoothstep(0.15, 0.8, h));
  col += specTint * (spec * 0.9 + broad * 0.07);
  // Thin silver line along the sharpest contours: the liquid-metal edge.
  col += vec3(0.85, 0.9, 1.0) * pow(fresnel, 4.0) * 0.14 * (0.4 + diffuse);
  col += vec3(0.133, 0.827, 0.933) * pow(fresnel, 2.5) * 0.18;

  // Calmer on the left where the headline sits; soft vignette elsewhere.
  col = mix(col * 0.55, col, smoothstep(0.05, 0.65, uv.x));
  float vignette = smoothstep(1.35, 0.35, length((uv - vec2(0.68, 0.55)) * vec2(1.1, 1.3)));
  col *= mix(0.5, 1.0, vignette);

  // Sub-LSB dither against gradient banding.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) / 255.0;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`
