"use client";

import { useRef, useEffect, useState } from "react";

export default function PlasmaBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (!mountRef.current || !isDesktop) return;
    const mount = mountRef.current;

    import("three").then((THREE) => {
      if (!mountRef.current) return;
      try {
        const rect = mount.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          width / height,
          0.1,
          1000,
        );
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        const plasmaMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(width, height) },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform vec2 uMouse;
            uniform vec2 uResolution;
            varying vec2 vUv;
            #define NUM_OCTAVES 5
            float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
            float noise(vec2 p) {
              vec2 ip = floor(p); vec2 u = fract(p);
              u = u*u*(3.0-2.0*u);
              float res = mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y);
              return res*res;
            }
            float fbm(vec2 x) {
              float v=0.0,a=0.5; vec2 shift=vec2(100);
              mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
              for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.5;}
              return v;
            }
            void main() {
              vec2 uv = vUv;
              float time = uTime * 0.2;
              float aspect = uResolution.x / uResolution.y;
              vec2 mousePos = vec2(uMouse.x, uMouse.y);
              vec2 q = vec2(fbm(uv+time*0.3), fbm(uv+vec2(1.0)));
              vec2 r = vec2(fbm(uv+1.0*q+vec2(1.7,9.2)+0.15*time), fbm(uv+1.0*q+vec2(8.3,2.8)+0.126*time));
              float f = fbm(uv+r);
              vec2 mouseVec = vec2((uv.x-mousePos.x)*aspect, uv.y-mousePos.y);
              float mouseDist = length(mouseVec);
              float distortion = smoothstep(0.3,0.0,mouseDist)*0.3;
              float pattern = f + distortion;
              vec3 color1 = vec3(0.0, 0.1, 0.4);
              vec3 color2 = vec3(0.0, 0.5, 0.8);
              vec3 color3 = vec3(0.0, 0.8, 0.9);
              vec3 color4 = vec3(0.6, 0.1, 0.8);
              vec3 color = mix(mix(color1,color2,pattern),mix(color3,color4,r.x),clamp(pattern*2.0+distortion,0.0,1.0));
              float glow = smoothstep(0.2,0.0,mouseDist);
              vec3 glowColor = mix(vec3(0.6,0.8,1.0),vec3(0.9,0.6,1.0),sin(time)*0.5+0.5);
              color = mix(color,glowColor,glow*0.7);
              color = pow(color,vec3(0.8));
              color *= 1.0+(sin(time*1.5)*0.5+0.5)*0.2;
              gl_FragColor = vec4(color, 0.95);
            }
          `,
          transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        scene.add(new THREE.Mesh(geometry, plasmaMaterial));

        const handleMouseMove = (e: MouseEvent) => {
          const rect = mountRef.current?.getBoundingClientRect();
          if (!rect) return;
          plasmaMaterial.uniforms.uMouse.value.set(
            (e.clientX - rect.left) / rect.width,
            1.0 - (e.clientY - rect.top) / rect.height,
          );
        };
        window.addEventListener("mousemove", handleMouseMove);

        const clock = new THREE.Clock();
        let rafId: number;
        const animate = () => {
          plasmaMaterial.uniforms.uTime.value = clock.getElapsedTime();
          renderer.render(scene, camera);
          rafId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
          if (!mount) return;
          const r = mount.getBoundingClientRect();
          const w = r.width || window.innerWidth;
          const h = r.height || window.innerHeight;
          renderer.setSize(w, h);
          plasmaMaterial.uniforms.uResolution.value.set(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // store cleanup on mount element for effect cleanup
        (mount as HTMLDivElement & { _cleanup?: () => void })._cleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (mount.contains(renderer.domElement))
            mount.removeChild(renderer.domElement);
        };
      } catch (e) {
        console.error("PlasmaBackground init failed:", e);
      }
    });

    return () => {
      const m = mount as HTMLDivElement & { _cleanup?: () => void };
      m._cleanup?.();
    };
  }, [isDesktop]);

  return (
    <>
      {/* Desktop: WebGL plasma */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full overflow-hidden hidden md:block"
      />
      {/* Mobile: CSS gradient fallback */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-950" />
    </>
  );
}
