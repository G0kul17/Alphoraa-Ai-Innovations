import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DSceneProps {
  className?: string;
}

export function Hero3DScene({ className = '' }: Hero3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Glowing Agent Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x1769AA,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.52, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xF36B21,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    mainGroup.add(nucleusMesh);

    // 2. Orbital Cyber Rings
    const ringGeo1 = new THREE.TorusGeometry(1.95, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x5BB4F5, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xF36B21, transparent: true, opacity: 0.55 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Neural Particle Swarm
    const particleCount = 260;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const colorBlue = new THREE.Color(0x1769AA);
    const colorOrange = new THREE.Color(0xF36B21);
    const colorCyan = new THREE.Color(0x5BB4F5);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.65 ? colorOrange : Math.random() > 0.4 ? colorCyan : colorBlue;
      colorArray[i] = chosenColor.r;
      colorArray[i + 1] = chosenColor.g;
      colorArray[i + 2] = chosenColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particleSystem);

    // Mouse & Touch Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Normalized progress: 0 when entering viewport, up to 1 when exiting
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
      scrollProgress = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Observer to accurately stay synced with container
    const updateSize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Scroll-driven camera zooming: smoothly zoom from 6.8 down to 5.1
      const targetZ = 6.8 - scrollProgress * 1.7;
      camera.position.z += (targetZ - camera.position.z) * 0.08;

      mainGroup.rotation.y = elapsed * 0.2 + mouseX * 0.8;
      mainGroup.rotation.x = mouseY * 0.6;

      // Rotate core & rings independently
      coreMesh.rotation.y = -elapsed * 0.4;
      coreMesh.rotation.x = elapsed * 0.2;

      nucleusMesh.rotation.y = elapsed * 0.6;
      nucleusMesh.rotation.z = -elapsed * 0.3;

      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.25;

      particleSystem.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none ${className}`}
      aria-label="Interactive 3D Agentic AI Core"
    />
  );
}
