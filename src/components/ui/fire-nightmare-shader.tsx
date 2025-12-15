"use client";

import React, { useRef, useEffect, useState, FC } from "react";

const vsSource = `
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

const fsSource = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 2D random
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x)
       + (c - a) * u.y * (1.0 - u.x)
       + (d - b) * u.x * u.y;
}

// Fractal Brownian Motion
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Tunnel SDF
float mapScene(vec3 p) {
  // twist and turbulence
  p.xy += sin(p.z * 0.5 + u_time) * 0.2;
  float radius = 1.0
    + fbm(p.xz * 0.5 + u_time * 0.1) * 0.5;
  return length(p.xy) - radius;
}

// Raymarch routine
vec2 rayMarch(vec3 ro, vec3 rd) {
  float distO = 0.0;
  float distS = 0.0;
  for (int i = 0; i < 100; i++) {
    vec3 p = ro + rd * distO;
    distS = mapScene(p);
    distO += distS;
    if (distO > 20.0 || abs(distS) < 0.001) break;
  }
  return vec2(distO, distS);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy)
           / u_resolution.y;

  // camera flies forward
  vec3 ro = vec3(0.0, 0.0, -u_time * 3.0);
  vec3 rd = normalize(vec3(uv, 1.5));

  // mouse-look
  float mx = (u_mouse.x / u_resolution.x - 0.5) * 3.14;
  float my = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
  mat3 rotX = mat3(
    1.0,    0.0,     0.0,
    0.0, cos(my), -sin(my),
    0.0, sin(my),  cos(my)
  );
  mat3 rotY = mat3(
    cos(mx), 0.0, sin(mx),
    0.0,     1.0,    0.0,
   -sin(mx), 0.0, cos(mx)
  );
  rd = rotY * rotX * rd;

  vec2 rm = rayMarch(ro, rd);
  float d = rm.x;
  vec3 col = vec3(0.0);

  if (d < 20.0) {
    vec3 p = ro + rd * d;
    float pattern = fbm(p.xy * 2.0 + p.z * 0.5 - u_time * 2.0);

    // fire gradient
    vec3 fire = mix(vec3(0.1, 0.0, 0.0),
                    vec3(1.0, 0.2, 0.0),
                    smoothstep(0.4, 0.6, pattern));
    fire = mix(fire,
               vec3(1.0, 0.9, 0.2),
               smoothstep(0.6, 0.7, pattern));

    float glow = pow(pattern, 2.0);
    col = fire * glow * 2.0;

    // sparks
    float sparks = fbm(p.xz * 20.0 + u_time * 5.0);
    sparks = smoothstep(0.8, 0.81, sparks);
    col += vec3(1.0, 0.8, 0.3) * sparks;
  }

  // fog
  col = mix(col, vec3(0.0), smoothstep(0.0, 15.0, d));
  gl_FragColor = vec4(col, 1.0);
}
`;

const ShaderCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const frameId = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext)
      || (canvas.getContext("webgl") as WebGLRenderingContext);
    if (!gl) {
      setError("WebGL not supported");
      return;
    }

    function compileShader(
      type: GLenum,
      src: string
    ): WebGLShader | null {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        setError("Shader compile error (see console)");
        return null;
      }
      return sh;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      setError("Program link error (see console)");
      return;
    }

    const posLoc   = gl.getAttribLocation(program, "a_position");
    const resLoc   = gl.getUniformLocation(program, "u_resolution")!;
    const timeLoc  = gl.getUniformLocation(program, "u_time")!;
    const mouseLoc = gl.getUniformLocation(program, "u_mouse")!;

    const quad = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    const buf  = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      if (!gl) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (Date.now() - startTime.current) * 0.001);
      gl.uniform2f(mouseLoc, mouse.current.x, mouse.current.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId.current!);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-foreground font-mono p-4">
          {error}
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ShaderCanvas;
