import * as THREE from 'three';

/**
 * TransmissionEngine
 *  pass 1 — Lakshan Ganesan's studio portrait rendered with interactive 3D perspective,
 *           dynamic contrast bloom, and pulse displacement into a render target.
 *  pass 2 — the scene is re-drawn as a grid of monospace glyphs sampled from a runtime
 *           glyph atlas. A circular "decoder lens" around the pointer shows the true render
 *           with chromatic aberration and warm amber rim; a click sends a scrambling shockwave
 *           through the grid.
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
uniform sampler2D uImage;
uniform vec2 uRes;
uniform vec2 uImageRes;
uniform float uTime;
uniform float uBloom;
uniform float uYaw;
uniform float uPitch;
uniform float uPulse;
varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 frag = vUv * uRes;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;

  // Interactive 3D perspective parallax & tilt from yaw & pitch
  float yawAngle = sin(uYaw) * 0.08;
  float pitchAngle = (uPitch - 0.28) * 0.08;
  
  // Perspective warp
  uv.x += uv.x * (uv.y * 0.25) * yawAngle;
  uv.x += yawAngle * 0.35;
  uv.y -= pitchAngle * 0.35;

  // Aspect ratio fitting (landscape widescreen format)
  float imgAspect = uImageRes.x / uImageRes.y;
  float screenAspect = uRes.x / uRes.y;
  
  float scale = 0.96 + 0.16 * uBloom;
  vec2 imgUv;

  if (screenAspect > imgAspect) {
    // Widescreen viewport: screen is wider than image (scale based on height)
    imgUv.y = (uv.y / scale) + 0.5;
    imgUv.x = (uv.x / (scale * imgAspect)) + 0.5;
  } else {
    // Narrower viewport: screen is taller than image (scale based on width)
    imgUv.x = (uv.x / (scale * screenAspect)) + 0.5;
    imgUv.y = (uv.y * imgAspect / (scale * screenAspect)) + 0.5;
  }

  // Holographic wave displacement on click pulse
  if (uPulse > 0.005) {
    float wave = sin(imgUv.y * 28.0 - uTime * 18.0) * uPulse * 0.015;
    imgUv.x += wave;
  }

  // Edge falloff mask
  float mask = smoothstep(0.0, 0.05, imgUv.x) * smoothstep(1.0, 0.95, imgUv.x) *
               smoothstep(0.0, 0.05, imgUv.y) * smoothstep(1.0, 0.95, imgUv.y);

  vec3 col = vec3(0.008, 0.008, 0.008);

  if (imgUv.x >= 0.0 && imgUv.x <= 1.0 && imgUv.y >= 0.0 && imgUv.y <= 1.0) {
    vec3 tex = texture2D(uImage, imgUv).rgb;
    
    // High-contrast monochromatic black & white balance
    float lum = dot(tex, vec3(0.299, 0.587, 0.114));
    
    // Bloom lifts the shadows and boosts highlight illumination
    lum = mix(pow(lum, 1.15) * 0.9, pow(lum, 0.85) * 1.3, uBloom);
    
    // Warm amber rim glow at silhouette edges
    vec3 amberRim = vec3(0.98, 0.62, 0.35) * pow(lum, 2.2) * 0.35;
    
    // Blend luminance with subtle warm tones from original image labels
    col = mix(vec3(lum), tex, 0.45) + amberRim;
    col *= mask;
  }

  // Subtle ambient background backlight in warm portfolio tone
  col += vec3(0.98, 0.55, 0.28) * (1.0 - length(uv)) * 0.028;

  // Fine film grain
  col += (hash21(frag + fract(uTime)) - 0.5) * 0.01;
  
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
  lum = smoothstep(0.04, 0.96, lum);

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
  tint = mix(tint, sc * 1.25, 0.18);                       // keep a trace of the real tone
  vec3 col = tint * g * (0.28 + lum * 0.95 + glow * 0.25);

  // decoder lens: the true photorealistic portrait with chromatic aberration
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
    col += uAccent * rim * 0.85; // Warm amber rim glow
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
  private portraitTexture: THREE.Texture | null = null;
  private raf = 0;
  private running = false;
  private start = performance.now();
  private last = performance.now();
  private frameTimes: number[] = [];
  private dpr = 1;
  private w = 1;
  private h = 1;
  private scale = 0.6;
  private maxScale = 0.75;
  private staticMode = false;
  private dirty = true;
  private font: string;

  state = {
    bloom: 0.3,
    yaw: 0.0,
    pitch: 0.28,
    cell: 16,
    lensR: 0,
    decode: 0,
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

    // Load Lakshan's widescreen hero portrait texture
    const textureLoader = new THREE.TextureLoader();
    this.portraitTexture = textureLoader.load('/images/lakshan-hero-wide.png', (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      if (tex.image && tex.image.width && tex.image.height) {
        this.sceneMat.uniforms.uImageRes.value.set(tex.image.width, tex.image.height);
      }
      this.sceneMat.uniforms.uImage.value = tex;
      this.dirty = true;
    });

    this.sceneMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: SCENE_FRAG,
      uniforms: {
        uImage: { value: this.portraitTexture },
        uRes: { value: new THREE.Vector2(2, 2) },
        uImageRes: { value: new THREE.Vector2(1024, 576) },
        uTime: { value: 0 },
        uBloom: { value: 0.3 },
        uYaw: { value: 0 },
        uPitch: { value: 0.28 },
        uPulse: { value: 0 },
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
        uInk: { value: new THREE.Vector3(0.92, 0.90, 0.86) }, // Warm off-white #E8E5DF
        uAccent: { value: new THREE.Vector3(1.0, 0.635, 0.4) }, // Warm brand amber #FFA266
      },
      depthTest: false,
      depthWrite: false,
    });

    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.asciiMat);
    this.scene.add(this.quad);
    this.setGlyphs('ascii');
  }

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

    const ease = this.staticMode ? 1 : 1 - Math.pow(0.001, dt);
    const p = this.pointer;
    p.sx += (p.x - p.sx) * ease;
    p.sy += (p.y - p.sy) * ease;
    p.r += (this.state.lensR - p.r) * (this.staticMode ? 1 : 1 - Math.pow(0.02, dt));
    if (!this.staticMode) this.autoYaw += dt * 0.06;
    this.ring.r += dt * Math.max(this.w, this.h) * 0.55;
    this.ring.amp *= Math.pow(0.3, dt);
    this.pulse *= Math.pow(0.12, dt);

    const s = this.sceneMat.uniforms;
    s.uTime.value = this.staticMode ? 0 : t;
    s.uBloom.value = this.state.bloom;
    s.uYaw.value = this.state.yaw + this.autoYaw;
    s.uPitch.value = this.state.pitch;
    s.uPulse.value = this.pulse;

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
    this.portraitTexture?.dispose();
    this.quad.geometry.dispose();
    this.renderer.dispose();
  }
}
