import { useEffect, useRef, useState } from "react";
import flameCursorImg from "@/assets/flame-cursor.png";

interface FlameParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const FLAME_COLORS = [
  "#f9dbdb", // pale silk blush
  "#ec8298", // soft blossom rose
  "#C24366", // vivid raspberry rose
  "#881144", // rich crimson
  "#800021", // deep burgundy
  "#ff8da1", // glowing rose fire
  "#ffffff", // core white-hot ignition spark
];

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FlameParticle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);
  const idleTimerRef = useRef(0);

  // Original image dimensions: 189 x 267. Arrow tip at (24, 69).
  // Petite, micro-sleek cursor size: 14px width by 20px height
  const cursorWidth = 14;
  const cursorHeight = Math.round(cursorWidth * (267 / 189)); // ~20px
  const tipOffsetX = (cursorWidth * 24) / 189; // ~1.78px
  const tipOffsetY = (cursorHeight * 69) / 267; // ~5.17px

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    // Enable custom cursor styles on document
    document.documentElement.classList.add("custom-flame-cursor");

    // Spawn flame particles helper
    const spawnParticles = (x: number, y: number, count: number, isBurst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = isBurst
          ? Math.random() * Math.PI * 2
          : Math.random() * Math.PI - Math.PI / 2;
        const speed = isBurst ? Math.random() * 2.0 + 0.6 : Math.random() * 0.7 + 0.2;
        const vx = Math.cos(angle) * speed + (isBurst ? 0 : (Math.random() - 0.5) * 0.4);
        const vy = isBurst
          ? Math.sin(angle) * speed - 0.4
          : -Math.random() * 1.0 - 0.3; // gentle heat drift

        const spawnOffsetX = isBurst ? 0 : 2 + (Math.random() - 0.5) * 4;
        const spawnOffsetY = isBurst ? 0 : 4 + (Math.random() - 0.5) * 4;

        particlesRef.current.push({
          x: x + spawnOffsetX,
          y: y + spawnOffsetY,
          vx,
          vy,
          size: isBurst ? Math.random() * 1.8 + 0.8 : Math.random() * 1.2 + 0.5,
          color: FLAME_COLORS[Math.floor(Math.random() * FLAME_COLORS.length)],
          life: 0,
          maxLife: isBurst ? Math.random() * 18 + 15 : Math.random() * 14 + 12,
        });
      }

      // Limit particle count for high performance
      if (particlesRef.current.length > 40) {
        particlesRef.current.splice(0, particlesRef.current.length - 40);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Spawn extra particles based on speed
      if (dist > 3) {
        const count = Math.min(2, Math.floor(dist / 14) + 1);
        spawnParticles(e.clientX, e.clientY, count);
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Detect interactive elements (links, buttons, inputs)
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        setIsHovering(Boolean(interactive));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      // Burst flame sparks on click!
      spawnParticles(e.clientX, e.clientY, 8, true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
      document.documentElement.classList.add("custom-flame-cursor");
    };

    const handleMouseLeave = () => {
      setVisible(false);
      document.documentElement.classList.remove("custom-flame-cursor");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // Canvas resize handling
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation render loop
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

          // Idle ember spawn
          idleTimerRef.current++;
          if (visible && idleTimerRef.current % 16 === 0) {
            spawnParticles(lastPosRef.current.x, lastPosRef.current.y, 1);
          }

          // Render & update particles
          const particles = particlesRef.current;
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.025; // buoyant acceleration upward
            p.size *= 0.95; // shrink as it burns
            p.life++;

            if (p.life >= p.maxLife || p.size <= 0.2) {
              particles.splice(i, 1);
              continue;
            }

            const alpha = Math.max(0, 1 - p.life / p.maxLife);
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.size * 2;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.25, p.size), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-flame-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [visible]);

  if (!isPointerFine) {
    return null;
  }

  return (
    <>
      {/* 1. Fire Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ pointerEvents: "none" }}
      />

      {/* 2. Soft Ambient Luminescent Aura Behind Cursor */}
      <div
        className="pointer-events-none fixed z-[1] hidden h-[260px] w-[260px] rounded-full opacity-20 dark:opacity-35 blur-[80px] md:block transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pos.x - 130}px, ${pos.y - 130}px, 0)`,
          background:
            "radial-gradient(circle at center, rgba(194, 67, 102, 0.22) 0%, rgba(136, 17, 68, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* 3. The Flaming Cursor Element (Petite micro-sleek size) */}
      <div
        className={`pointer-events-none fixed z-[9999] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${pos.x - tipOffsetX}px, ${pos.y - tipOffsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <div
          className={`relative transition-transform duration-150 ease-out ${
            isMouseDown ? "scale-90" : isHovering ? "scale-110" : "scale-100"
          }`}
        >
          {/* Animated Rose & Crimson Flame Cursor Graphic */}
          <img
            src={flameCursorImg}
            alt=""
            width={cursorWidth}
            height={cursorHeight}
            className="animate-flame-flicker select-none pointer-events-none drop-shadow-[0_0_4px_rgba(194,67,102,0.7)]"
            style={{
              width: `${cursorWidth}px`,
              height: `${cursorHeight}px`,
            }}
          />

          {/* Interactive Core Flame Spark when Hovering */}
          {isHovering && (
            <span className="absolute left-[2px] top-[5px] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_4px_#ec8298,0_0_8px_#C24366] animate-ping" />
          )}
        </div>
      </div>
    </>
  );
}