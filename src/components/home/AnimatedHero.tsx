'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface AnimatedHeroProps {
  title?: ReactNode;
  description: string;
  quick_links?: Array<{
    title: string;
    description: string;
    link: string;
    type: 'music' | 'writing';
  }>;
  cta?: {
    text: string;
    link: string;
  };
  background_style?: 'dynamic' | 'image' | 'gradient';
  background_image?: string;
}

const PlasmaField = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop on mount
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (!mountRef.current || !isDesktop) return;

    // Dynamically import THREE.js only on desktop
    import('three').then((THREE) => {
      if (!mountRef.current) return;

      // Store mountRef.current in a variable to avoid cleanup issues
      const mount = mountRef.current;

      try {
        // Get container dimensions instead of window dimensions
        const rect = mount.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const plasmaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        #define NUM_OCTAVES 5

        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          float res = mix(
            mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
            mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
          return res*res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
          
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse;
          float time = uTime * 0.2;

          // Calculate distance from mouse with proper aspect ratio correction
          float aspect = uResolution.x / uResolution.y;
          vec2 mousePos = vec2(mouse.x, mouse.y);
          vec2 uvPos = vec2(uv.x, uv.y);
          
          // Adjust coordinates for aspect ratio
          uvPos.x *= aspect;
          mousePos.x *= aspect;
          
          float mouseDist = length(uvPos - mousePos);

          // Base plasma pattern
          vec2 baseUV = uv * 3.0;
          float f = fbm(baseUV + vec2(time * 0.5));
          
          // Create distortion based on mouse position
          float distortion = exp(-mouseDist * 4.0);
          vec2 distortedUV = baseUV + normalize(uvPos - mousePos) * distortion;
          
          // Generate plasma waves
          vec2 q = vec2(
            fbm(distortedUV + 0.1 * time),
            fbm(distortedUV + vec2(1.0) - 0.1 * time)
          );
          
          vec2 r = vec2(
            fbm(distortedUV + 4.0 * q + 0.15 * time),
            fbm(distortedUV + 4.0 * q - 0.126 * time)
          );
          
          float pattern = fbm(distortedUV + r);
          
          // Color palette
          vec3 color1 = vec3(0.1, 0.3, 0.9);    // Deep blue
          vec3 color2 = vec3(0.0, 0.5, 0.8);    // Ocean blue
          vec3 color3 = vec3(0.0, 0.8, 0.9);    // Bright cyan
          vec3 color4 = vec3(0.6, 0.1, 0.8);    // Royal purple
          
          // Mix colors based on pattern and mouse influence
          vec3 color = mix(
            mix(color1, color2, pattern),
            mix(color3, color4, r.x),
            clamp(pattern * 2.0 + distortion, 0.0, 1.0)
          );
          
          // Add centered glow around mouse
          float glow = smoothstep(0.2, 0.0, mouseDist);
          vec3 glowColor = mix(vec3(0.6, 0.8, 1.0), vec3(0.9, 0.6, 1.0), sin(time) * 0.5 + 0.5);
          color = mix(color, glowColor, glow * 0.7);
          
          // Enhance contrast
          color = pow(color, vec3(0.8));
          
          // Add subtle pulsing
          float pulse = sin(time * 1.5) * 0.5 + 0.5;
          color *= 1.0 + pulse * 0.2;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
    });

    // Create a full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, plasmaMaterial);
    scene.add(mesh);

    // Enhanced mouse interaction with proper coordinate conversion
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate normalized coordinates relative to the container
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      
      plasmaMaterial.uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      plasmaMaterial.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      const newWidth = rect.width || window.innerWidth;
      const newHeight = rect.height || window.innerHeight;
      
      renderer.setSize(newWidth, newHeight);
      plasmaMaterial.uniforms.uResolution.value.set(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

      } catch (error) {
        console.error('Failed to initialize PlasmaField:', error);
      }
    }).catch((error) => {
      console.error('Failed to load Three.js:', error);
    });

    return () => {
      // Cleanup will be handled by the dynamic import context
    };
  }, [isDesktop]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
};

const AnimatedHero = ({ 
  title, 
  description, 
  quick_links,
  cta, 
  background_style = 'dynamic',
  background_image 
}: AnimatedHeroProps) => {
  
  // Type indicator styling
  const getTypeIndicator = (type: 'music' | 'writing') => {
    const styles = {
      music: 'bg-purple-600/90 text-purple-100 border-purple-400 hover:bg-purple-500/90',
      writing: 'bg-blue-600/90 text-blue-100 border-blue-400 hover:bg-blue-500/90'
    };
    return styles[type];
  };
  return (
    <div className="relative w-full overflow-hidden m-0 p-0">
      {/* Hero Section */}
      <div className="relative h-auto min-h-screen w-full overflow-hidden m-0 p-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-[1]" />
        
        {/* Dynamic background based on style */}
        {background_style === 'dynamic' && (
          <>
            {/* Desktop: WebGL PlasmaField */}
            <PlasmaField />
            {/* Mobile: Animated CSS gradient fallback */}
            <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-pink-500/50 animate-pulse" />
            </div>
          </>
        )}
        
        {background_style === 'image' && background_image && (
          <div className="absolute inset-0">
            <Image
              src={background_image}
              alt="Hero background"
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
        
        {background_style === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-primary-800 to-purple-800" />
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center py-8" style={{ paddingTop: '4rem' }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:-mt-48">
            <div className="text-center welcome-text">
              {title && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {title}
                  </div>
                </motion.div>
              )}
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-4xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                {description}
              </motion.p>

              {/* Quick Navigation Links */}
              {quick_links && quick_links.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-3 w-full"
                >
                  {quick_links.map((link, index) => {
                    // Define background images for each section
                    const getBackgroundImage = (title: string) => {
                      if (title.includes('Educational Music') || title.includes('🎵')) {
                        return '/images/musings-bg.png';
                      } else if (title.includes('Stories') || title.includes('Fiction') || title.includes('📚')) {
                        return '/images/fiction-bg.png';
                      } else if (title.includes('Companies') || title.includes('Projects') || title.includes('🚀')) {
                        return '/images/projects-bg.png';
                      } else if (title.includes('Ideas') || title.includes('Insights') || title.includes('💡')) {
                        return '/images/ideas-bg.png';
                      }
                      return '/images/default-collection.jpg';
                    };

                    return (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="aspect-square w-full"
                      >
                        <Link
                          href={link.link}
                          className="group block relative h-full rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                          {/* Background Image with Overlay */}
                          <div className="absolute inset-0">
                            <Image
                              src={getBackgroundImage(link.title)}
                              alt={`${link.title} background`}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              priority={index < 4}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                          </div>

                          {/* Content */}
                          <div className="relative h-full flex items-center justify-center p-4 sm:p-5 text-white">
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white drop-shadow-lg">
                                {link.title.replace(/^[^\s]+\s/, '')}
                              </div>
                              {link.description && (
                                <div className="text-xs sm:text-sm text-white/70 mt-2 drop-shadow">
                                  {link.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - Hidden on mobile */}
        <motion.div 
          className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-[3] hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1"
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-white/70 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHero; 