import { VERTEX_SHADER, FRAGMENT_SHADER } from './shaders'

/* Quality tiers. The surface is soft and organic, so it renders below
   native resolution and is upscaled by the browser with no visible loss.
   `maxPixels` caps the backing store on very large screens. */
const QUALITY = {
  high: { scale: 0.62, maxDpr: 2, maxPixels: 950000, octaves: 4, fps: 60 },
  low: { scale: 0.45, maxDpr: 2, maxPixels: 320000, octaves: 3, fps: 30 },
}

// Deterministic, pleasing frame used for reduced motion and first paint.
const STATIC_TIME = 14.5

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) console.warn('[OilSlick] shader compile failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/* Returns a renderer bound to `canvas`, or null when WebGL is unavailable
   (the caller then keeps the static CSS fallback). */
export function createOilSlickRenderer(canvas, { quality = 'high', onContextLost } = {}) {
  const settings = QUALITY[quality] ?? QUALITY.high

  let gl
  try {
    gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })
  } catch {
    gl = null
  }
  if (!gl || gl.isContextLost()) return null

  const highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)?.precision > 0
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER.replace('__PRECISION__', highp ? 'highp' : 'mediump'))
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (import.meta.env.DEV) console.warn('[OilSlick] program link failed:', gl.getProgramInfoLog(program))
    return null
  }
  gl.useProgram(program)

  // One oversized triangle covers the viewport: cheaper than a quad.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPosition = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(aPosition)
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

  const uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    time: gl.getUniformLocation(program, 'uTime'),
    pointer: gl.getUniformLocation(program, 'uPointer'),
    pointerStrength: gl.getUniformLocation(program, 'uPointerStrength'),
    octaves: gl.getUniformLocation(program, 'uOctaves'),
  }
  gl.uniform1f(uniforms.octaves, settings.octaves)

  const state = {
    rafId: 0,
    running: false,
    lastFrame: 0,
    lastTick: 0,
    // Accumulated animation time: pausing and resuming never jumps.
    elapsed: STATIC_TIME + Math.random() * 40,
    pointer: { x: 0.72, y: 0.6 },
    pointerTarget: { x: 0.72, y: 0.6 },
    strength: 0,
    strengthTarget: 0,
    destroyed: false,
  }
  const frameInterval = 1000 / settings.fps

  function resize() {
    if (state.destroyed) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, settings.maxDpr)
    let width = Math.max(1, Math.round(rect.width * dpr * settings.scale))
    let height = Math.max(1, Math.round(rect.height * dpr * settings.scale))
    const pixels = width * height
    if (pixels > settings.maxPixels) {
      const shrink = Math.sqrt(settings.maxPixels / pixels)
      width = Math.round(width * shrink)
      height = Math.round(height * shrink)
    }
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
    gl.uniform2f(uniforms.resolution, width, height)
  }

  function draw(time) {
    gl.uniform1f(uniforms.time, time)
    gl.uniform2f(uniforms.pointer, state.pointer.x, state.pointer.y)
    gl.uniform1f(uniforms.pointerStrength, state.strength)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  function frame(now) {
    if (!state.running) return
    state.rafId = requestAnimationFrame(frame)
    if (now - state.lastFrame < frameInterval - 1) return

    const delta = state.lastTick ? Math.min(now - state.lastTick, 100) : 16
    state.lastTick = now
    state.lastFrame = now
    state.elapsed += delta / 1000

    // Frame-rate independent easing toward the pointer.
    const k = 1 - Math.pow(0.0025, delta / 1000)
    state.pointer.x += (state.pointerTarget.x - state.pointer.x) * k
    state.pointer.y += (state.pointerTarget.y - state.pointer.y) * k
    state.strength += (state.strengthTarget - state.strength) * k

    draw(state.elapsed)
  }

  function onLost(event) {
    event.preventDefault()
    stop()
    onContextLost?.()
  }
  canvas.addEventListener('webglcontextlost', onLost)

  function start() {
    if (state.running || state.destroyed) return
    state.running = true
    state.lastTick = 0
    state.rafId = requestAnimationFrame(frame)
  }

  function stop() {
    state.running = false
    cancelAnimationFrame(state.rafId)
  }

  function renderStatic() {
    if (state.destroyed) return
    state.strength = 0
    draw(STATIC_TIME)
  }

  function setPointer(x, y, active) {
    state.pointerTarget.x = x
    state.pointerTarget.y = y
    state.strengthTarget = active ? 1 : 0
  }

  function destroy() {
    if (state.destroyed) return
    stop()
    state.destroyed = true
    canvas.removeEventListener('webglcontextlost', onLost)
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    // Release the GPU context now rather than waiting for GC.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }

  return {
    start,
    stop,
    resize,
    renderStatic,
    setPointer,
    destroy,
    isRunning: () => state.running,
  }
}
