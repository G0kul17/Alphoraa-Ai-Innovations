import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useScroll } from 'motion/react';
import { Cpu, Network, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface Chapter {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: '01',
    badge: 'Phase 01 / Cognitive Inception',
    title: 'From Static Code to Autonomous Cognition',
    subtitle:
      'Traditional software follows rigid instructions. ALPHORAA agents perceive environment context, formulate independent plans, and reason through ambiguous edge cases with self-correcting logic.',
    icon: Cpu,
    metric: '99.4%',
    metricLabel: 'Contextual Intent Accuracy',
  },
  {
    id: '02',
    badge: 'Phase 02 / Multi-Agent Synergy',
    title: 'Coordinated Neural Swarms Working in Parallel',
    subtitle:
      'Autonomous systems do not work in isolation. Our proprietary swarm architecture enables specialized agents—researchers, architects, verifiers—to collaborate synchronously across complex workflows.',
    icon: Network,
    metric: '10x',
    metricLabel: 'Workflow Throughput Multiplier',
  },
  {
    id: '03',
    badge: 'Phase 03 / High-Velocity Execution',
    title: 'Deterministic Guardrails with Zero Hallucination',
    subtitle:
      'Enterprise automation demands absolute reliability. Every agent decision passes through strict boundary verification, sandboxed execution rules, and real-time security safeguards.',
    icon: ShieldCheck,
    metric: '< 45ms',
    metricLabel: 'Guardrail Decision Latency',
  },
  {
    id: '04',
    badge: 'Phase 04 / Enterprise Autonomy',
    title: 'The Future of Business Run by Agentic Systems',
    subtitle:
      'Scale your operations into the next era. Transform mission-critical operations into resilient, self-optimizing intelligent systems that deliver compounding value every single day.',
    icon: Sparkles,
    metric: '24/7',
    metricLabel: 'Continuous Autonomous Operation',
  },
];

export function Story3DScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [percent, setPercent] = useState(0);

  // High-performance refs to decouple scroll updates from React renders & Three.js teardowns
  const scrollProgressRef = useRef(0);
  const isVisibleRef = useRef(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll progress: update ref continuously (zero lag), throttle state updates
  useEffect(() => {
    let lastChapter = -1;
    let lastPct = -1;

    return scrollYProgress.on('change', (latest) => {
      scrollProgressRef.current = latest;

      const newIndex = Math.min(CHAPTERS.length - 1, Math.floor(latest * CHAPTERS.length));
      if (newIndex !== lastChapter) {
        lastChapter = newIndex;
        setActiveChapter(newIndex);
      }

      const newPct = Math.round(latest * 100);
      if (newPct !== lastPct) {
        lastPct = newPct;
        setPercent(newPct);
      }
    });
  }, [scrollYProgress]);

  // Clickable Chapter jump helper
  const scrollToChapter = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const startY = window.scrollY + rect.top;
    const totalScroll = containerRef.current.clientHeight - window.innerHeight;
    const targetY = startY + (idx / CHAPTERS.length) * totalScroll + 20;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  // 3D Scene Initialization & Scroll-driven Animation (MOUNT ONCE, NEVER TEAR DOWN ON SCROLL)
  useEffect(() => {
    const canvasContainer = canvasRef.current;
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      50,
      canvasContainer.clientWidth / canvasContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    // Cap pixel ratio at 1.5 to eliminate GPU throttling on 4K/retina laptops
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    canvasContainer.appendChild(renderer.domElement);

    // Root Group
    const world = new THREE.Group();
    scene.add(world);

    // 1. Central Complex 3D Monolith / Agentic Polyhedron
    const coreGeo = new THREE.OctahedronGeometry(2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x1769AA,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    world.add(coreMesh);

    // 2. Inner Golden Ratio Lattice
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xF36B21,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    world.add(innerMesh);

    // 3. Swarm Data Points (400 Particles for optimal 60fps)
    const particleCount = 400;
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const initialPos = new Float32Array(particleCount * 3);

    const colorOrange = new THREE.Color(0xF36B21);
    const colorBlue = new THREE.Color(0x1769AA);
    const colorCyan = new THREE.Color(0x5BB4F5);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i] = x;
      pos[i + 1] = y;
      pos[i + 2] = z;

      initialPos[i] = x;
      initialPos[i + 1] = y;
      initialPos[i + 2] = z;

      const c = Math.random() > 0.6 ? colorOrange : Math.random() > 0.3 ? colorCyan : colorBlue;
      col[i] = c.r;
      col[i + 1] = c.g;
      col[i + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    world.add(particles);

    // 4. Connecting Neural Lines between random nearby nodes
    const linesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(150 * 6);
    for (let i = 0; i < 150 * 6; i += 6) {
      const idx1 = Math.floor(Math.random() * particleCount) * 3;
      const idx2 = Math.floor(Math.random() * particleCount) * 3;
      linePositions[i] = initialPos[idx1];
      linePositions[i + 1] = initialPos[idx1 + 1];
      linePositions[i + 2] = initialPos[idx1 + 2];
      linePositions[i + 3] = initialPos[idx2];
      linePositions[i + 4] = initialPos[idx2 + 1];
      linePositions[i + 5] = initialPos[idx2 + 2];
    }
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x5BB4F5,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(linesGeo, linesMat);
    world.add(neuralLines);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!canvasContainer) return;
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // IntersectionObserver to pause rendering when section is out of viewport (saves battery & GPU)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // High-performance Animation & Scroll Scrubbing Loop
    let animId: number;
    let currentScroll = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Skip render if off-screen
      if (!isVisibleRef.current) return;

      const elapsed = clock.getElapsedTime();
      const targetScroll = scrollProgressRef.current;

      // Smooth interpolation of scroll progress (buttery 60fps)
      currentScroll += (targetScroll - currentScroll) * 0.1;
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // 3D Camera & Scene Transformation based on Scroll Progress
      camera.position.z = 9 - currentScroll * 4.5;
      camera.position.x = Math.sin(currentScroll * Math.PI * 2) * 2.2 + mouseX * 0.8;
      camera.position.y = Math.cos(currentScroll * Math.PI * 1.5) * 1.2 - mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // World Rotation
      world.rotation.y = elapsed * 0.15 + currentScroll * Math.PI * 3;
      world.rotation.x = currentScroll * Math.PI * 0.8 + mouseY * 0.3;

      // Core scaling and morphing
      const scale = 1 + Math.sin(elapsed * 2 + currentScroll * 10) * 0.15;
      innerMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.y = -elapsed * 0.4;
      coreMesh.rotation.z = elapsed * 0.2;

      // Particle pulsing
      particles.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
    };
  }, []); // <--- RUNS ONCE ON MOUNT, NO TEARDOWN DURING SCROLL!

  return (
    <section
      ref={containerRef}
      id="agentic-story"
      className="keep-dark relative h-[420vh] bg-black text-white"
      aria-label="Interactive 3D Agentic AI Journey"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Three.js Canvas Container */}
        <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* Ambient Cinematic Vignette & Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

        {/* Right / Left Ambient Accent Aura */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1769AA]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F36B21]/15 blur-3xl" />

        {/* Story HUD Overlay Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
            {/* Left Column: Dynamic Chapter Glass Card */}
            <div className="lg:col-span-7 xl:col-span-6 pointer-events-auto">
              <div className="relative p-6 sm:p-10 rounded-3xl bg-[#0A0A0A]/85 backdrop-blur-xl border border-white/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300">
                {/* Subtle top edge neon line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1769AA] via-[#F36B21] to-transparent" />

                {CHAPTERS.map((ch, idx) => {
                  const isCurrent = activeChapter === idx;
                  const Icon = ch.icon;

                  return (
                    <div
                      key={ch.id}
                      className={`transition-all duration-500 ${
                        isCurrent
                          ? 'opacity-100 translate-y-0 relative'
                          : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none p-6 sm:p-10'
                      }`}
                    >
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-[#5BB4F5] mb-5">
                        <Icon className="w-3.5 h-3.5 text-[#F36B21]" />
                        <span>{ch.badge}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                        {ch.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed mb-8">
                        {ch.subtitle}
                      </p>

                      {/* Metric Pill & CTA */}
                      <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAF4FB] to-[#5BB4F5]">
                            {ch.metric}
                          </div>
                          <div className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mt-0.5">
                            {ch.metricLabel}
                          </div>
                        </div>

                        <Button to="/services" variant="primary" size="sm" withArrow>
                          Explore Systems
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive 3D Journey Rail */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col items-end pointer-events-auto">
              <div className="p-6 rounded-2xl bg-[#0A0A0A]/70 backdrop-blur-md border border-white/10 max-w-xs space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#9CA3AF] flex items-center justify-between">
                  <span>Interactive 3D Engine</span>
                  <span className="text-[#F36B21] font-bold">
                    {percent}%
                  </span>
                </div>

                {/* Vertical Step Nodes - Now Interactive Clickable Buttons */}
                <div className="space-y-3 pt-2">
                  {CHAPTERS.map((ch, idx) => {
                    const isPassed = activeChapter >= idx;
                    const isCurrent = activeChapter === idx;

                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => scrollToChapter(idx)}
                        className="flex items-center gap-3 text-left w-full group cursor-pointer focus:outline-none"
                      >
                        <div
                          className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all duration-300 ${
                            isCurrent
                              ? 'bg-[#F36B21] text-white shadow-[0_0_15px_rgba(243,107,33,0.6)] scale-110'
                              : isPassed
                              ? 'bg-[#1769AA] text-white'
                              : 'bg-white/10 text-[#9CA3AF] group-hover:bg-white/20'
                          }`}
                        >
                          {ch.id}
                        </div>
                        <div className="text-xs font-medium truncate">
                          <span className={`transition-colors ${isCurrent ? 'text-white' : 'text-[#9CA3AF] group-hover:text-white'}`}>
                            {ch.title.split(' ')[0]} {ch.title.split(' ')[1] || ''}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-[#9CA3AF] pt-2 border-t border-white/10 leading-snug">
                  Scroll to orbit the 3D Neural Swarm. Cursor position adjusts camera parallax.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
