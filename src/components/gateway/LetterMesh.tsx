import React, { forwardRef, useEffect, useRef } from 'react';
import HeroTitle from '../hero/HeroTitle';
import HeroTagline from '../hero/HeroTagline';
import HeroActions from '../hero/HeroActions';
import { gatewayScroll } from '../../animation/gatewayScroll';
import { GATEWAY_CONFIG } from '../../config/gatewayConfig';

interface LetterMeshProps {
  className?: string;
  titleRef?: React.Ref<HTMLHeadingElement>;
  hackRef?: React.Ref<HTMLDivElement>;
  forGoodRef?: React.Ref<HTMLDivElement>;
  taglineRef?: React.Ref<HTMLParagraphElement>;
  actionsRef?: React.Ref<HTMLDivElement>;
  onExploreClick?: () => void;
  onRegisterClick?: () => void;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  char: string;
}

/**
 * LetterMesh component.
 * 
 * Houses the hybrid HTML typography title, tagline, and CTA actions within
 * the architectural opening of the gateway.
 * 
 * Features:
 * - Subtle depth & mouse parallax with smooth spring recovery
 * - Scroll-driven deformation & glyph particles release (0.70 → 0.87)
 * - Zero React re-renders during motion loops (all state managed in refs & canvas)
 * - Scaled density for mobile, tablet, and reduced-motion
 */
export const LetterMesh = forwardRef<HTMLDivElement, LetterMeshProps>(
  (
    {
      className = '',
      titleRef,
      hackRef,
      forGoodRef,
      taglineRef,
      actionsRef,
      onExploreClick,
      onRegisterClick,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);

    // Spring physics & mouse tracking refs (no re-renders)
    const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const currentProgress = useRef(0);
    const isReducedMotion = useRef(false);

    useEffect(() => {
      isReducedMotion.current = gatewayScroll.getIsReducedMotion();

      // Listen to normalized scroll progress without triggering React state
      const unsubScroll = gatewayScroll.subscribe((progress) => {
        currentProgress.current = progress;
      });

      // Mouse move handler with bounded normalized coordinates (-1 to 1)
      const handleMouseMove = (e: MouseEvent) => {
        if (isReducedMotion.current || currentProgress.current > 0.35) return;
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        mousePos.current.targetX = nx * 14; // max 14px tilt
        mousePos.current.targetY = ny * 10; // max 10px tilt
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Canvas Particle Setup for Glyph Release (0.70 → 0.87)
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      let animId: number;

      let particles: Particle[] = [];
      const glyphs = ['+', '×', '•', '◇', '▲', '0', '1', 'H', 'F', 'G'];
      const colors = ['#f59e0b', '#ef4444', '#fbf7ee', '#ffd3dd'];

      const resizeCanvas = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth < 1024;
        const count = isMobile
          ? GATEWAY_CONFIG.mesh.particles.mobileCount
          : isTablet
          ? GATEWAY_CONFIG.mesh.particles.tabletCount
          : GATEWAY_CONFIG.mesh.particles.desktopCount;

        particles = Array.from({ length: count }, () => {
          const cx = window.innerWidth * (0.35 + Math.random() * 0.3);
          const cy = window.innerHeight * (0.38 + Math.random() * 0.24);
          return {
            x: cx,
            y: cy,
            originX: cx,
            originY: cy,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 11 + 9,
            alpha: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            char: glyphs[Math.floor(Math.random() * glyphs.length)],
          };
        });
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });

      // Physics & Particle Render Loop
      const renderLoop = () => {
        // 1. Mouse Spring Lerp
        const m = mousePos.current;
        const decay = Math.max(0, 1 - currentProgress.current * 3); // fades out as scroll progresses
        m.x += (m.targetX * decay - m.x) * 0.08;
        m.y += (m.targetY * decay - m.y) * 0.08;

        if (innerContainerRef.current && !isReducedMotion.current) {
          innerContainerRef.current.style.transform = `translate3d(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px, 0)`;
        }

        // 2. Glyph Particle Dispersal during 0.70 → 0.87
        if (ctx && canvas && !isReducedMotion.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const prog = currentProgress.current;
          // Particle active window: 0.68 → 0.88
          if (prog >= 0.68 && prog <= 0.90) {
            const burstProgress = (prog - 0.68) / (0.90 - 0.68);
            const fadeAlpha = burstProgress < 0.6 ? burstProgress / 0.6 : 1 - (burstProgress - 0.6) / 0.4;

            particles.forEach((p) => {
              const currentX = p.originX + p.vx * burstProgress * 160;
              const currentY = p.originY + p.vy * burstProgress * 180;
              ctx.font = `600 ${p.size}px "JetBrains Mono", monospace`;
              ctx.fillStyle = p.color;
              ctx.globalAlpha = Math.max(0, Math.min(1, fadeAlpha * 0.85));
              ctx.fillText(p.char, currentX, currentY);
            });
          }
        }

        animId = requestAnimationFrame(renderLoop);
      };

      animId = requestAnimationFrame(renderLoop);

      return () => {
        unsubScroll();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animId);
      };
    }, []);

    return (
      <div
        ref={ref}
        data-layer="letter-mesh"
        className={`relative z-20 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto my-auto text-center pointer-events-auto select-none ${className}`}
      >
        {/* Glyph Particles Canvas Overlay for Phase 3 Dispersal */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 w-full h-full"
          aria-hidden="true"
        />

        {/* Inner container responsive to mouse spring physics */}
        <div
          ref={innerContainerRef}
          className="w-[88vw] sm:w-[72vw] md:w-[60vw] lg:w-[52vw] max-w-3xl flex flex-col items-center justify-center will-change-transform"
        >
          {/* Main Hybrid Display Title: HACK / FOR GOOD */}
          <HeroTitle ref={titleRef} hackRef={hackRef} forGoodRef={forGoodRef} />

          {/* Supporting Tagline */}
          <HeroTagline ref={taglineRef} className="mt-3 sm:mt-5" />

          {/* Real HTML CTA Buttons */}
          <HeroActions
            ref={actionsRef}
            onExploreClick={onExploreClick}
            onRegisterClick={onRegisterClick}
            className="mt-6 sm:mt-8"
          />
        </div>
      </div>
    );
  }
);

LetterMesh.displayName = 'LetterMesh';
export default LetterMesh;
