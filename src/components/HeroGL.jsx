/*
 * HeroGL — WebGL fragment-shader background for the hero.
 *
 * Domain-warped FBM noise produces a slowly flowing warm gradient
 * (ember → amber) emanating from the upper-right, leaving the
 * lower-left (where text lives) near-black for contrast.
 *
 * Raw WebGL — no library dependency. Canvas is sized at devicePixelRatio
 * (capped at 2) for sharp rendering without excess fill-rate cost.
 *
 * prefers-reduced-motion: renders a single static frame at t=20s
 * (a visually interesting mid-animation state) and stops.
 */

import { useEffect, useRef } from 'react'

/* ── Shaders ─────────────────────────────────────────────────────────────── */

const VERT = /* glsl */`
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG = /* glsl */`
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_res;

  /* Value-noise hash */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  /* Bilinear value noise */
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);          /* smoothstep */
    return mix(
      mix(hash(i),               hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y);
  }

  /* Fractal Brownian Motion — 6 octaves */
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(3.7, 2.9);
      a *= 0.5;
    }
    return v;
  }

  /* Three-stop warm ramp: bg → ember → amber */
  vec3 warm(float t) {
    vec3 bg    = vec3(0.055, 0.047, 0.039);   /* #0E0C0A */
    vec3 ember = vec3(0.26,  0.12,  0.04);    /* deep warm dark */
    vec3 amber = vec3(0.64,  0.40,  0.14);    /* ~65% of #E0A64B — visible but not blown */
    if (t < 0.45) return mix(bg,    ember, t / 0.45);
    return              mix(ember,  amber,  (t - 0.45) / 0.55);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;                        /* flip: Y=0 at top */

    float t = u_time * 0.10;

    /* Domain warp — two noise lookups distort the main fbm lookup */
    float q1 = fbm(uv * 2.2 + t);
    float q2 = fbm(uv * 2.2 + vec2(5.2, 1.3) + t * 0.85);
    float n   = fbm(uv * 1.6 + 1.8 * vec2(q1, q2) + 0.12 * t);

    /* Radial falloff: focal point moved to mid-upper-right,
       away from the nav strip at the very top */
    float dist   = distance(uv, vec2(0.85, 0.28));
    float radial = 1.0 - smoothstep(0.0, 0.92, dist);

    float glow = pow(clamp(n * radial, 0.0, 1.0), 0.75);

    gl_FragColor = vec4(warm(glow), 1.0);
  }
`

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function compileShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[HeroGL] shader compile:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function HeroGL() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return   /* fallback: canvas stays invisible, CSS bg shows */

    /* --- build program --- */
    const vert = compileShader(gl, gl.VERTEX_SHADER,   VERT)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) return

    const prog = gl.createProgram()
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[HeroGL] link:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    /* --- fullscreen quad (two triangles) --- */
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    /* --- uniforms --- */
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes  = gl.getUniformLocation(prog, 'u_res')

    /* --- resize --- */
    const dpr = Math.min(window.devicePixelRatio, 2)
    function resize() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width  = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* --- animate --- */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let rafId
    const t0 = performance.now()

    function frame() {
      const t = prefersReduced ? 20.0 : (performance.now() - t0) / 1000
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!prefersReduced) rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="hero-gl"
      aria-hidden="true"
    />
  )
}
