import * as THREE from 'three';

/**
 * TransmissionEngine
 *  pass 1 — a raymarched, signed-distance-field Quantum Cybernetic Core (no model files)
 *           rendered into a lower-resolution target (adaptive: drops resolution if frames get slow).
 *  pass 2 — the scene is re-drawn as a grid of monospace glyphs sampled from a runtime
 *           glyph atlas. A circular "decoder lens" around the pointer shows the true render
 *           with chromatic aberration; a click sends a scrambling shockwave through the grid.
 */

export const GLYPH_SETS = {
  ascii: ' .:-=+*oxX#%@',
  binary: ' .·:01',
  blocks: ' ·░▒▓█',
} as const;

export type GlyphSet = keyof typeof GLYPH_SETS;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const SCENE_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uBloom;
uniform float uYaw;
uniform float uPitch;
uniform float uPulse;
uniform int uSteps;
varying vec2 vUv;

#define PI 3.14159265359

vec2 rotv(vec2 v, float a) {
  float c = cos(a), s = sin(a);
  return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Primitives
float sdBox(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return min(max(q.x, max(q.y, q.z)), 0.0) + length(max(q, 0.0)) - r;
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float sdCylinder(vec3 p, vec2 h) {
  vec2 d = abs(vec2(length(p.xz), p.y)) - h;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float sdOctahedron(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735027;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// map returns: vec4(distance, materialId, coordAlong, coordSide)
// Materials:
// 1.0: Silicon Wafer / Titanium Die (Circuit traces & logic pins)
// 2.0: Quantum Energy Singularity & Plasma Core (Glowing lime/gold)
// 3.0: Concentric Gyroscopic Orbit Rings (Dark metal with laser notches)
// 4.0: Satellite Quantum Data Nodes (Faceted octahedrons)
vec4 map(vec3 p) {
  float b = uBloom; // 0.3 (closed/compact) to 1.0 (bloomed/expanded)
  float pulse = uPulse;
  
  // Center alignment
  p.y -= 0.15;

  // 1. Central Quantum Singularity Sphere
  float coreR = 0.22 + 0.05 * b + 0.06 * pulse * sin(uTime * 24.0);
  float dCore = length(p) - coreR;
  vec4 res = vec4(dCore, 2.0, 0.0, 0.0);

  // 2. Processor Wafer Plates (Exploded CAD view on bloom)
  float ySpread = 0.12 + 0.42 * b;
  vec3 pPlateTop = p - vec3(0.0, ySpread, 0.0);
  vec3 pPlateBot = p + vec3(0.0, ySpread, 0.0);

  // Top wafer with chip die
  float dPlateTop = sdRoundBox(pPlateTop, vec3(0.52, 0.03, 0.52), 0.025);
  // Inset logic die
  float dDieTop = sdBox(pPlateTop - vec3(0.0, 0.02, 0.0), vec3(0.34, 0.015, 0.34));
  dPlateTop = min(dPlateTop, dDieTop);

  // Bottom wafer
  float dPlateBot = sdRoundBox(pPlateBot, vec3(0.52, 0.03, 0.52), 0.025);
  float dDieBot = sdBox(pPlateBot + vec3(0.0, 0.02, 0.0), vec3(0.34, 0.015, 0.34));
  dPlateBot = min(dPlateBot, dDieBot);

  float dPlates = min(dPlateTop, dPlateBot);
  if (dPlates < res.x) {
    res = vec4(dPlates, 1.0, length(p.xz), p.y);
  }

  // Vertical Central Plasma Column connecting wafers
  float dBeam = sdCylinder(p, vec2(0.042, ySpread + 0.04));
  if (dBeam < res.x) {
    res = vec4(dBeam, 2.0, 0.0, 0.0);
  }

  // 3. Concentric Gyroscopic Orbital Rings
  // Ring 1 (Equatorial XZ plane with radial teeth)
  vec3 q1 = p;
  q1.xz = rotv(q1.xz, uTime * 0.45 + pulse * 1.5);
  float r1Rad = 1.05 + 0.28 * b;
  float dRing1 = sdTorus(q1, vec2(r1Rad, 0.035));
  // Notched gear teeth on ring 1
  float teeth1 = sin(atan(q1.z, q1.x) * 18.0) * 0.01;
  dRing1 += teeth1;
  if (dRing1 < res.x) {
    res = vec4(dRing1, 3.0, r1Rad, abs(q1.y));
  }

  // Ring 2 (Inclined Gimbal at ~50 degrees, counter-rotating)
  vec3 q2 = p;
  q2.yz = rotv(q2.yz, 0.88 + 0.15 * sin(uTime * 0.6));
  q2.xz = rotv(q2.xz, -uTime * 0.55 - pulse * 1.2);
  float r2Rad = 0.86 + 0.22 * b;
  float dRing2 = sdTorus(q2, vec2(r2Rad, 0.028));
  if (dRing2 < res.x) {
    res = vec4(dRing2, 3.0, r2Rad, abs(q2.y));
  }

  // Ring 3 (Outer Polar Ring)
  vec3 q3 = p;
  q3.xy = rotv(q3.xy, 1.5707 + 0.12 * cos(uTime * 0.5));
  q3.xz = rotv(q3.xz, uTime * 0.3);
  float r3Rad = 1.28 + 0.35 * b;
  float dRing3 = sdTorus(q3, vec2(r3Rad, 0.024));
  if (dRing3 < res.x) {
    res = vec4(dRing3, 3.0, r3Rad, abs(q3.y));
  }

  // 4. Satellite Quantum Nodes (Polar Repetition - 6 nodes orbiting in a hexagon)
  float sector = 2.0 * PI / 6.0;
  float a = atan(p.z, p.x) + uTime * 0.35;
  float id = floor(a / sector + 0.5);
  a -= id * sector;
  float r = length(p.xz);
  float nodeDist = 1.55 + 0.38 * b;
  vec3 qNode = vec3(r * cos(a) - nodeDist, p.y - 0.08 * sin(uTime * 2.0 + id), r * sin(a));
  qNode.xy = rotv(qNode.xy, uTime + id);
  qNode.yz = rotv(qNode.yz, uTime * 1.3);
  float dNode = sdOctahedron(qNode, 0.075 + 0.02 * pulse);
  if (dNode < res.x) {
    res = vec4(dNode, 4.0, id, length(qNode));
  }

  return res;
}

vec3 calcNormal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float h = 0.0015;
  return normalize(k.xyy * map(p + k.xyy * h).x + k.yyx * map(p + k.yyx * h).x +
                   k.yxy * map(p + k.yxy * h).x + k.xxx * map(p + k.xxx * h).x);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 4; i++) {
    float h = 0.02 + 0.09 * float(i);
    occ += (h - map(p + h * n).x) * sca;
    sca *= 0.75;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

void main() {
  vec2 frag = vUv * uRes;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;

  // orbit camera
  float k = smoothstep(0.3, 1.2, uPitch);                 // frame the core as camera rises
  float dist = mix(4.1, 5.0, k);
  vec3 target = vec3(0.0, mix(0.3, 0.12, k), 0.0);
  vec3 ro = target + dist * vec3(cos(uPitch) * sin(uYaw), sin(uPitch), cos(uPitch) * cos(uYaw));
  vec3 ww = normalize(target - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = cross(uu, ww);
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.9 * ww);

  // background: deep obsidian field with subtle cyber glow
  vec3 col = vec3(0.012, 0.014, 0.011) + 0.03 * vec3(0.8, 0.9, 0.6) * (1.0 - length(uv));

  float t = 0.5;
  vec4 hit = vec4(-1.0);
  for (int i = 0; i < 110; i++) {
    if (i >= uSteps) break;
    vec4 h = map(ro + rd * t);
    if (h.x < 0.0012 * t) { hit = vec4(t, h.yzw); break; }
    t += h.x * 0.75;
    if (t > 7.5) break;
  }

  if (hit.x > 0.0) {
    vec3 p = ro + rd * hit.x;
    vec3 n = calcNormal(p);
    float ao = calcAO(p, n);
    vec3 l1 = normalize(vec3(0.6, 0.9, 0.5));
    vec3 l2 = normalize(vec3(-0.7, 0.3, -0.6));
    float dif = clamp(dot(n, l1), 0.0, 1.0);
    float back = clamp(dot(-n, l1), 0.0, 1.0);
    float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);
    float spec = pow(clamp(dot(reflect(rd, n), l1), 0.0, 1.0), 32.0);

    vec3 alb;
    float glowMask = 0.0;

    if (hit.y < 1.5) {
      // 1. Silicon Wafer & Micro-Die: Brushed Titanium with gold/lime logic tracks
      vec2 grid = fract(p.xz * 14.0);
      float trace = step(0.88, max(grid.x, grid.y));
      alb = mix(vec3(0.08, 0.09, 0.10), vec3(0.84, 0.94, 0.42), trace * 0.85); // Lime circuit tracks
      alb += vec3(0.02, 0.02, 0.02); // Anisotropic base
    } else if (hit.y < 2.5) {
      // 2. Quantum Singularity Core: Radiant Lime / Emerald Plasma
      alb = vec3(0.84, 0.94, 0.42);
      glowMask = 1.0;
    } else if (hit.y < 3.5) {
      // 3. Gyroscopic Rings: Dark gunmetal with glowing laser ticks
      float tick = step(0.85, fract(atan(p.z, p.x) * 12.0 / PI));
      alb = mix(vec3(0.12, 0.13, 0.15), vec3(0.84, 0.94, 0.42), tick * 0.9);
    } else {
      // 4. Satellite Quantum Nodes: Chrome Octahedrons with iridescent core
      alb = vec3(0.75, 0.82, 0.88);
      spec *= 2.0;
    }

    vec3 lin = vec3(0.0);
    lin += 1.4 * dif * vec3(1.0, 0.98, 0.9);
    lin += 0.4 * back * vec3(0.84, 0.94, 0.42);
    lin += 0.3 * clamp(dot(n, l2), 0.0, 1.0) * vec3(0.5, 0.7, 1.0);
    lin += 0.15 * vec3(0.7, 0.8, 0.6);

    col = alb * lin * (0.35 + 0.65 * ao);
    col += spec * 0.45 * vec3(1.0, 0.98, 0.92);
    col += rim * vec3(0.84, 0.94, 0.42) * 0.5; // Lime Fresnel rim
    col += glowMask * vec3(0.84, 0.94, 0.42) * 1.2; // Direct core emission!
  }

  col = pow(col, vec3(0.4545));
  col += (hash21(frag + fract(uTime)) - 0.5) * 0.015;
  gl_FragColor = vec4(col, 1.0);
}`;

const ASCII_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uAtlas;
uniform vec2 uRes;
uniform float uGlyphs;
uniform float uCell;
uniform vec2 uPointer;
uniform float uGlowR;
uniform vec2 uLensC;
uniform float uLensR;
uniform float uRing;
uniform float uRingAmp;
uniform float uTime;
uniform float uFlicker;
uniform vec3 uInk;
uniform vec3 uAccent;
varying vec2 vUv;

float hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 cs = vec2(uCell * 0.62, uCell);
  vec2 cell = floor(frag / cs);
  vec2 center = (cell + 0.5) * cs;
  vec2 local = fract(frag / cs);

  vec3 sc = texture2D(uScene, center / uRes).rgb;
  float lum = dot(sc, vec3(0.299, 0.587, 0.114));
  lum = smoothstep(0.05, 0.95, lum);

  float dp = length(center - uPointer);
  float glow = uGlowR > 0.0 ? smoothstep(uGlowR * 2.2, uGlowR * 0.6, dp) : 0.0;
  float ring = exp(-pow((dp - uRing) / (uCell * 4.0), 2.0)) * uRingAmp;

  float tick = floor(uTime * 14.0);
  float h = hash21(cell + tick * 0.37);
  float scramble = step(1.0 - clamp(ring * 0.95 + uFlicker * lum * 0.08, 0.0, 1.0), h);

  float idx = floor(clamp(lum + glow * 0.1, 0.0, 1.0) * (uGlyphs - 1.0) + 0.5);
  float rnd = 1.0 + floor(hash21(cell * 1.7 + tick) * (uGlyphs - 1.0));
  idx = mix(idx, rnd, scramble);

  vec2 auv = vec2((idx + local.x) / uGlyphs, local.y);
  float g = texture2D(uAtlas, auv).r;
  float heat = clamp(glow * 0.75 + ring * 1.2 + scramble * 0.6, 0.0, 1.0);
  vec3 tint = mix(uInk, uAccent, heat);
  tint = mix(tint, sc * 1.25, 0.18);                       // keep a trace of the real colour
  vec3 col = tint * g * (0.28 + lum * 0.95 + glow * 0.25);

  // decoder lens: the true render, with chromatic aberration near the rim
  vec2 lv = frag - uLensC;
  float ld = length(lv);
  if (uLensR > 0.5) {
    float inside = 1.0 - smoothstep(uLensR - 1.5, uLensR + 1.5, ld);
    vec2 dir = lv / max(ld, 1e-3);
    float edge = smoothstep(uLensR * 0.55, uLensR, ld);
    vec2 uv = frag / uRes;
    vec2 off = dir * edge * 6.0 / uRes;
    vec3 real = vec3(texture2D(uScene, uv - off).r, texture2D(uScene, uv).g, texture2D(uScene, uv + off).b);
    col = mix(col, real, inside);
    float rim = smoothstep(1.6, 0.0, abs(ld - uLensR));
    col += uAccent * rim * 0.7;
  }

  // CRT whisper: faint scanlines + vignette
  col *= 0.94 + 0.06 * sin(frag.y * 1.6);
  vec2 q = frag / uRes - 0.5;
  col *= 1.0 - dot(q, q) * 0.9;
  gl_FragColor = vec4(col, 1.0);
}`;

export type EngineStats = { fps: number; scale: number; cell: number };

export class TransmissionEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quad: THREE.Mesh;
  private sceneRT: THREE.WebGLRenderTarget;
  private sceneMat: THREE.ShaderMaterial;
  private asciiMat: THREE.ShaderMaterial;
  private atlas: THREE.CanvasTexture | null = null;
  private raf = 0;
  private running = false;
  private start = performance.now();
  private last = performance.now();
  private frameTimes: number[] = [];
  private dpr = 1;
  private w = 1;
  private h = 1;
  private scale = 0.6; // raymarch resolution relative to CSS pixels
  private maxScale = 0.75;
  private staticMode = false;
  private dirty = true;
  private font: string;

  // inputs (CSS px unless noted), smoothed internally
  state = {
    bloom: 0.3,
    yaw: 0.6,
    pitch: 0.28,
    cell: 16, // CSS px
    lensR: 0, // target lens radius (CSS px)
    decode: 0, // 0..1 lens grows to fill the screen
  };

  private pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, r: 0 };
  private ring = { r: 0, amp: 0 };
  private pulse = 0;
  private autoYaw = 0;
  stats: EngineStats = { fps: 60, scale: 0.6, cell: 16 };

  constructor(private canvas: HTMLCanvasElement, opts: { font: string }) {
    this.font = opts.font;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.sceneRT = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });
    this.sceneMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: SCENE_FRAG,
      uniforms: {
        uRes: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 },
        uBloom: { value: 0.3 },
        uYaw: { value: 0 },
        uPitch: { value: 0.3 },
        uPulse: { value: 0 },
        uSteps: { value: 96 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.asciiMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: ASCII_FRAG,
      uniforms: {
        uScene: { value: this.sceneRT.texture },
        uAtlas: { value: null },
        uRes: { value: new THREE.Vector2(2, 2) },
        uGlyphs: { value: 1 },
        uCell: { value: 16 },
        uPointer: { value: new THREE.Vector2(-9999, -9999) },
        uGlowR: { value: 0 },
        uLensC: { value: new THREE.Vector2() },
        uLensR: { value: 0 },
        uRing: { value: 0 },
        uRingAmp: { value: 0 },
        uTime: { value: 0 },
        uFlicker: { value: 1 },
        uInk: { value: new THREE.Vector3(0.91, 0.9, 0.84) },
        uAccent: { value: new THREE.Vector3(0.84, 0.94, 0.42) },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.asciiMat);
    this.scene.add(this.quad);
    this.setGlyphs('ascii');
  }

  /** Build the glyph atlas: one row of cells, white glyphs on black. */
  setGlyphs(set: GlyphSet) {
    const chars = [...GLYPH_SETS[set]];
    const cw = 40;
    const ch = 64;
    const c = document.createElement('canvas');
    c.width = cw * chars.length;
    c.height = ch;
    const g = c.getContext('2d')!;
    g.fillStyle = '#000';
    g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#fff';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `500 50px ${this.font}`;
    chars.forEach((chr, i) => g.fillText(chr, i * cw + cw / 2, ch / 2 + 2));
    this.atlas?.dispose();
    this.atlas = new THREE.CanvasTexture(c);
    this.atlas.minFilter = THREE.LinearFilter;
    this.atlas.magFilter = THREE.LinearFilter;
    this.atlas.generateMipmaps = false;
    this.asciiMat.uniforms.uAtlas.value = this.atlas;
    this.asciiMat.uniforms.uGlyphs.value = chars.length;
    this.dirty = true;
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w);
    this.h = Math.max(1, h);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.maxScale = w < 700 ? 0.55 : 0.75;
    this.scale = Math.min(this.scale, this.maxScale);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.w, this.h, false);
    this.asciiMat.uniforms.uRes.value.set(this.w * this.dpr, this.h * this.dpr);
    this.sizeSceneTarget();
    this.dirty = true;
  }

  private sizeSceneTarget() {
    const sw = Math.max(2, Math.round(this.w * this.scale));
    const sh = Math.max(2, Math.round(this.h * this.scale));
    this.sceneRT.setSize(sw, sh);
    this.sceneMat.uniforms.uRes.value.set(sw, sh);
  }

  setStatic(v: boolean) {
    this.staticMode = v;
    this.asciiMat.uniforms.uFlicker.value = v ? 0 : 1;
    this.dirty = true;
  }

  setState(s: Partial<TransmissionEngine['state']>) {
    Object.assign(this.state, s);
    this.dirty = true;
  }

  setPointer(x: number, y: number, active: boolean) {
    this.pointer.x = x;
    this.pointer.y = y;
    if (this.pointer.sx < -999) {
      this.pointer.sx = x;
      this.pointer.sy = y;
    }
    this.state.lensR = active ? (this.w < 700 ? 88 : 128) : 0;
    this.dirty = true;
  }

  /** Drag-to-turn: yaw offset in radians. */
  nudgeYaw(dx: number) {
    this.state.yaw += dx;
    this.dirty = true;
  }

  pulseAt(x: number, y: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.ring.r = 0;
    this.ring.amp = 1;
    this.pulse = 1;
    this.dirty = true;
  }

  private frame(now: number) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const t = (now - this.start) / 1000;

    // adaptive resolution: watch the last 40 frames
    this.frameTimes.push(dt);
    if (this.frameTimes.length > 40) {
      const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.frameTimes.length = 0;
      this.stats.fps = Math.round(1 / Math.max(avg, 1e-3));
      if (!this.staticMode) {
        if (avg > 0.021 && this.scale > 0.34) {
          this.scale = Math.max(0.34, this.scale - 0.08);
          this.sizeSceneTarget();
        } else if (avg < 0.0135 && this.scale < this.maxScale) {
          this.scale = Math.min(this.maxScale, this.scale + 0.04);
          this.sizeSceneTarget();
        }
      }
      this.stats.scale = this.scale;
    }

    const ease = this.staticMode ? 1 : 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
    const p = this.pointer;
    p.sx += (p.x - p.sx) * ease;
    p.sy += (p.y - p.sy) * ease;
    p.r += (this.state.lensR - p.r) * (this.staticMode ? 1 : 1 - Math.pow(0.02, dt));
    if (!this.staticMode) this.autoYaw += dt * 0.12;
    this.ring.r += dt * Math.max(this.w, this.h) * 0.55;
    this.ring.amp *= Math.pow(0.3, dt);
    this.pulse *= Math.pow(0.12, dt);

    const s = this.sceneMat.uniforms;
    s.uTime.value = this.staticMode ? 0 : t;
    s.uBloom.value = this.state.bloom;
    s.uYaw.value = this.state.yaw + this.autoYaw;
    s.uPitch.value = this.state.pitch;
    s.uPulse.value = this.pulse;
    s.uSteps.value = this.scale < 0.45 ? 70 : 96;

    const d = this.dpr;
    const decode = this.state.decode;
    const diag = Math.hypot(this.w, this.h);
    const cx = p.sx < -999 ? this.w / 2 : p.sx;
    const cy = p.sy < -999 ? this.h / 2 : p.sy;
    const lensX = cx + (this.w / 2 - cx) * decode;
    const lensY = cy + (this.h / 2 - cy) * decode;
    const lensR = p.r + (diag * 0.6 - p.r) * decode;

    const a = this.asciiMat.uniforms;
    a.uTime.value = this.staticMode ? 0 : t;
    a.uCell.value = this.state.cell * d;
    a.uPointer.value.set(p.sx * d, (this.h - p.sy) * d);
    a.uGlowR.value = p.r * d;
    a.uLensC.value.set(lensX * d, (this.h - lensY) * d);
    a.uLensR.value = lensR * d;
    a.uRing.value = this.ring.r * d;
    a.uRingAmp.value = this.ring.amp;
    this.stats.cell = this.state.cell;

    this.quad.material = this.sceneMat;
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.scene, this.camera);
    this.quad.material = this.asciiMat;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
    this.dirty = false;
  }

  private loop = (now: number) => {
    if (!this.running) return;
    const settling = Math.abs(this.pointer.r - this.state.lensR) > 0.5 || this.ring.amp > 0.01;
    if (!this.staticMode || this.dirty || settling) this.frame(now);
    else this.last = now;
    this.raf = requestAnimationFrame(this.loop);
  };

  play() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  pause() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.pause();
    this.sceneRT.dispose();
    this.sceneMat.dispose();
    this.asciiMat.dispose();
    this.atlas?.dispose();
    this.quad.geometry.dispose();
    this.renderer.dispose();
  }
}
