import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

function hexToVec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const VERTEX_SHADER = `
attribute float size;
uniform float iTime;
uniform vec3 iShift;
uniform vec2 iResolution;
uniform vec3 iAnimation;
uniform float uDepth;
varying float transparency;
varying float warmness;
vec3 warp3d(vec3 pos, float t) {
  float curv = 0.9, a = 1.9, b = 0.25, b2 = 0.03, c = 0.02;
  pos *= 2.;
  pos.x += curv * sin(c * t + a * pos.y) + t * b2;
  pos.y += curv * cos(c * t + a * pos.x);
  pos.z += curv * cos(c * t + a * pos.y);
  pos.z += curv * sin(c * t + a * pos.x) + t * b;
  pos.z = abs(pos.z);
  return pos.xyz;
}
void main() {
  vec3 v = warp3d(position, iTime);
  v = uDepth * (2. * fract(v + iShift) - 1.) + iAnimation;
  vec4 vpos = modelViewMatrix * vec4(v, 1.);
  transparency = step(length(v), uDepth);
  warmness = step(.75, fract(size * 7.13));
  gl_PointSize = size * iResolution.y / 1000. / -vpos.z;
  gl_Position = projectionMatrix * vpos;
}
`;

const FRAGMENT_SHADER = `
varying float transparency; varying float warmness;
uniform float iAlpha; uniform vec3 uCool; uniform vec3 uWarm;
void main() {
  vec3 color = mix(uCool * .8, uWarm * .8, warmness);
  float tex = smoothstep(1., .3, length(2. * gl_PointCoord - 1.));
  gl_FragColor = vec4(tex * color, tex * transparency * iAlpha);
}
`;

const FINAL_VERTEX_SHADER = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`;

const FINAL_FRAGMENT_SHADER = `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
  vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.25, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Full-bleed particle-field hero background. Faithful port of the "Cosmic
 * Dust" Three.js spec: 940 warped points drifting toward the camera and
 * wrapping seamlessly, composited through a torus/bloom/final three-pass
 * pipeline with animated corner flames. `active` gates it off for
 * prefers-reduced-motion (falls back to a static gradient).
 */
export function CosmicDust({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 22);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 0, 3);
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    // ---- Geometry: 940 warped points ----
    const count = 940;
    const positions: number[] = [];
    const sizes: number[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
      sizes.push(25 + 25 * Math.random());
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const uniforms = {
      iTime: { value: 0 },
      iShift: { value: new THREE.Vector3() },
      iAlpha: { value: 0 },
      iAnimation: { value: new THREE.Vector3(0, 0, 0) },
      iResolution: { value: new THREE.Vector2(1, 1) },
      uDepth: { value: 3.7 },
      uCool: { value: hexToVec3('#b3401f') },
      uWarm: { value: hexToVec3('#ffc46b') },
    };

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    pointsMaterial.stencilWrite = false;

    const points = new THREE.Points(geometry, pointsMaterial);
    points.position.set(0, 0, -1);
    points.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(points);

    // ---- Postprocessing ----
    const renderPass = new RenderPass(scene, camera);

    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderPass);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.3, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderPass);
    bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.7, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    const FinalPass = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null },
        torusTexture: { value: null as THREE.Texture | null },
        bloomTexture: { value: null as THREE.Texture | null },
        haloTexture: { value: null as THREE.Texture | null },
        uBg: { value: hexToVec3('#1a0a04') },
        uFlameA: { value: hexToVec3('#ff7a2a') },
        uFlameB: { value: hexToVec3('#ffce5a') },
        uFlameAmt: { value: 0.2 },
      },
      vertexShader: FINAL_VERTEX_SHADER,
      fragmentShader: FINAL_FRAGMENT_SHADER,
    };
    const finalPass = new ShaderPass(FinalPass);
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderPass);
    finalComposer.addPass(finalPass);

    // ---- Fade in ----
    const start = performance.now();
    const FILL_MS = 2200;
    const TARGET_ALPHA = 0.68;

    // ---- Resize ----
    function resize() {
      const rect = container!.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio, 1.75);

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      [torusComposer, bloomComposer, finalComposer].forEach((c) => {
        c.setPixelRatio(dpr);
        c.setSize(w, h);
      });

      uniforms.iResolution.value.set(w * dpr, h * dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ---- Render loop ----
    let raf = 0;
    function animate() {
      const now = performance.now();
      const t = Math.min(1, (now - start) / FILL_MS);
      uniforms.iAlpha.value = easeInOutCubic(t) * TARGET_ALPHA;

      uniforms.iTime.value = now / 1000;
      uniforms.iShift.value.add(camera.position.clone().multiplyScalar(0.0022 * 0.4));

      finalPass.uniforms.iTime.value = now / 1000;

      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();

      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();

      camera.layers.set(LAYERS.ENTIRE_SCENE);
      finalComposer.render();

      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      pointsMaterial.dispose();
      (torusComposer as unknown as { dispose?: () => void }).dispose?.();
      (bloomComposer as unknown as { dispose?: () => void }).dispose?.();
      (finalComposer as unknown as { dispose?: () => void }).dispose?.();
      renderer.dispose();
    };
  }, [active]);

  if (!active) {
    return <div className="cosmic-dust__static" />;
  }

  return (
    <div className="cosmic-dust">
      <canvas ref={canvasRef} className="cosmic-dust__canvas" />
    </div>
  );
}
