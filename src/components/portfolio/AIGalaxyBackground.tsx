import React, { useEffect, useRef } from "react";

export interface AIGalaxyBackgroundProps {
  /** Custom CSS classes for the container */
  className?: string;
  /** Whether mouse parallax is enabled */
  interactive?: boolean;
  /** Number of stars (default 1200) */
  starCount?: number;
  /** Number of orbital particles (default 180) */
  particleCount?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  brightness: number;
  twinklePhase: number;
  twinkleSpeed: number;
  colorType: number; // 0: pure white, 1: electric cyan, 2: soft violet, 3: warm starlight
}

interface OrbitalParticle {
  // Elliptical orbit properties
  a: number; // Semi-major axis
  e: number; // Eccentricity (0 = circular, 0.6 = elongated)
  tilt: number; // Tilt angle in radians
  speed: number; // Base angular velocity
  angle: number; // Current angle in orbit (radians)
  z: number; // Depth (-1 back of orb, 1 front of orb)
  size: number;
  colorType: number; // 0: cyan, 1: violet, 2: magenta, 3: core white
  brightness: number;
  // Gravitational plunge state
  isPlunging: boolean;
  plungePhase: number;
  history: { x: number; y: number; alpha: number }[];
}

export function AIGalaxyBackground({
  className = "",
  interactive = true,
  starCount = 1200,
  particleCount = 180,
}: AIGalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Viewport dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High-DPI support (capped at 2 for performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / width - 0.5) * 2;
      const ny = (e.clientY / height - 0.5) * 2;
      mouse.targetX = nx;
      mouse.targetY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle tab visibility to pause rendering when inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 1. Generate Starfield
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1, // 0.1 (far) to 1.0 (near)
        baseRadius: Math.random() * 1.1 + 0.35,
        brightness: Math.random() * 0.6 + 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 1.8 + 0.6,
        colorType: Math.floor(Math.random() * 4),
      });
    }

    // 2. Generate Orbital Particles
    const particles: OrbitalParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      // Stratified orbit radii around the central orb
      const minRadius = 90;
      const maxRadius = Math.min(width, height) * 0.48;
      const r = minRadius + Math.pow(Math.random(), 1.6) * (maxRadius - minRadius);

      particles.push({
        a: r,
        e: Math.random() * 0.45 + 0.05,
        tilt: (Math.random() - 0.5) * 1.3,
        speed:
          ((Math.random() * 0.4 + 0.25) / Math.sqrt(r * 0.08)) * (Math.random() > 0.08 ? 1 : -1),
        angle: Math.random() * Math.PI * 2,
        z: 0,
        size: Math.random() * 2.0 + 0.8,
        colorType: Math.floor(Math.random() * 4),
        brightness: Math.random() * 0.4 + 0.6,
        isPlunging: Math.random() < 0.12,
        plungePhase: Math.random() * Math.PI * 2,
        history: [],
      });
    }

    let lastTime = performance.now();
    let globalTime = 0;

    // Palette definition
    const STAR_COLORS = [
      "255, 255, 255", // pure white
      "165, 243, 252", // electric cyan
      "216, 180, 254", // soft violet
      "254, 240, 138", // warm star
    ];

    const PARTICLE_COLORS = [
      "56, 189, 248", // vivid cyan
      "168, 85, 247", // electric violet
      "244, 63, 94", // cosmic magenta
      "255, 255, 255", // pure light
    ];

    // Main Render Loop
    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      globalTime += delta;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Clear Canvas with deep space black
      ctx.fillStyle = "#030007";
      ctx.fillRect(0, 0, width, height);

      // Parallax offsets
      const px = mouse.x * 24;
      const py = mouse.y * 24;

      // Subtle center orb position (centered horizontally, slightly above middle vertically)
      const orbCenterX = width * 0.5 + px * 0.7 + Math.sin(globalTime * 0.3) * 6;
      const orbCenterY = height * 0.44 + py * 0.7 + Math.cos(globalTime * 0.35) * 5;
      const baseOrbRadius = Math.min(width * 0.2, height * 0.24, 185);

      // Orb breathing pulse
      const orbPulse = 1 + Math.sin(globalTime * 1.2) * 0.025 + Math.cos(globalTime * 2.1) * 0.012;
      const orbRadius = baseOrbRadius * orbPulse;

      // =========================================================================
      // 1. NEBULA DUST CLOUDS (Volumetric Cosmic Glows)
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Cyan / Blue Nebula (Left-Top)
      const neb1 = ctx.createRadialGradient(
        width * 0.38 + px * 0.3,
        height * 0.38 + py * 0.3,
        20,
        width * 0.38 + px * 0.3,
        height * 0.38 + py * 0.3,
        Math.min(width, height) * 0.55,
      );
      neb1.addColorStop(0, "rgba(6, 182, 212, 0.13)");
      neb1.addColorStop(0.5, "rgba(14, 116, 144, 0.06)");
      neb1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Violet / Indigo Nebula (Right-Center)
      const neb2 = ctx.createRadialGradient(
        width * 0.62 - px * 0.3,
        height * 0.48 - py * 0.3,
        30,
        width * 0.62 - px * 0.3,
        height * 0.48 - py * 0.3,
        Math.min(width, height) * 0.6,
      );
      neb2.addColorStop(0, "rgba(139, 92, 246, 0.15)");
      neb2.addColorStop(0.55, "rgba(109, 40, 217, 0.07)");
      neb2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // Magenta / Rose Cloud (Bottom-Center)
      const neb3 = ctx.createRadialGradient(
        width * 0.5 + px * 0.2,
        height * 0.6 + py * 0.2,
        20,
        width * 0.5 + px * 0.2,
        height * 0.6 + py * 0.2,
        Math.min(width, height) * 0.45,
      );
      neb3.addColorStop(0, "rgba(236, 72, 153, 0.09)");
      neb3.addColorStop(0.6, "rgba(190, 24, 93, 0.04)");
      neb3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      // =========================================================================
      // 2. STARFIELD (Depth-Sorted, Parallax, Twinkling)
      // =========================================================================
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // Calculate twinkle
        const twinkle = Math.sin(globalTime * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0.08, Math.min(1, s.brightness + twinkle * 0.25));

        // Parallax offset proportional to z-depth
        const sx = s.x + px * s.z * 1.1;
        const sy = s.y + py * s.z * 1.1;

        // Wrap around boundaries seamlessly
        const wx = ((sx % width) + width) % width;
        const wy = ((sy % height) + height) % height;

        ctx.beginPath();
        ctx.arc(wx, wy, s.baseRadius * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${STAR_COLORS[s.colorType]}, ${alpha * s.z})`;
        ctx.fill();

        // Subtle glow for closer, brighter stars
        if (s.z > 0.8 && alpha > 0.75) {
          ctx.beginPath();
          ctx.arc(wx, wy, s.baseRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${STAR_COLORS[s.colorType]}, ${alpha * 0.2})`;
          ctx.fill();
        }
      }

      // =========================================================================
      // 3. BACK ORBITAL PARTICLES & TRAILS (z < 0, Behind Orb)
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Update and draw background particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitational acceleration: moves faster near periapsis
        let currentRadius = p.a;
        if (p.isPlunging) {
          p.plungePhase += delta * 0.8;
          const plungeOsc = (Math.sin(p.plungePhase) + 1) * 0.5; // 0 to 1
          currentRadius = orbRadius * 1.05 + plungeOsc * (p.a - orbRadius * 1.05);
        }

        // Keplerian angular speed scaling: faster when closer
        const speedMultiplier = Math.pow(p.a / Math.max(currentRadius, 30), 1.2);
        p.angle += p.speed * speedMultiplier * delta;

        // Elliptical coordinate calculation with tilt
        const cosA = Math.cos(p.angle);
        const sinA = Math.sin(p.angle);
        const rOrbit = (currentRadius * (1 - p.e * p.e)) / (1 + p.e * cosA);

        const localX = rOrbit * cosA;
        const localY = rOrbit * sinA * 0.42; // Flattened 3D perspective

        // Rotate by tilt angle
        const cosT = Math.cos(p.tilt);
        const sinT = Math.sin(p.tilt);
        const xRot = localX * cosT - localY * sinT;
        const yRot = localX * sinT + localY * cosT;

        const posX = orbCenterX + xRot;
        const posY = orbCenterY + yRot;

        // Depth determination based on orbital position
        p.z = Math.sin(p.angle + p.tilt);

        // Record history for light trail
        p.history.push({ x: posX, y: posY, alpha: p.brightness });
        if (p.history.length > 6) {
          p.history.shift();
        }

        // Only draw background particles in this pass (z < 0)
        if (p.z < 0) {
          drawParticleWithTrail(ctx, p, PARTICLE_COLORS[p.colorType]);
        }
      }
      ctx.restore();

      // =========================================================================
      // 4. CENTRAL AI ENERGY ORB
      // =========================================================================
      ctx.save();

      // Outer Volumetric Ambient Aura
      const auraGrad = ctx.createRadialGradient(
        orbCenterX,
        orbCenterY,
        orbRadius * 0.2,
        orbCenterX,
        orbCenterY,
        orbRadius * 2.6,
      );
      auraGrad.addColorStop(0, "rgba(56, 189, 248, 0.22)"); // cyan center
      auraGrad.addColorStop(0.3, "rgba(139, 92, 246, 0.18)"); // violet
      auraGrad.addColorStop(0.65, "rgba(236, 72, 153, 0.08)"); // magenta
      auraGrad.addColorStop(1, "rgba(3, 0, 7, 0)"); // fade to void
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(orbCenterX, orbCenterY, orbRadius * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Smooth Translucent Holographic Glass Orb Body
      // (Center kept clean and translucent so foreground content shines)
      const glassGrad = ctx.createRadialGradient(
        orbCenterX,
        orbCenterY,
        orbRadius * 0.05,
        orbCenterX,
        orbCenterY,
        orbRadius,
      );
      glassGrad.addColorStop(0, "rgba(255, 255, 255, 0.18)"); // soft luminous core
      glassGrad.addColorStop(0.25, "rgba(56, 189, 248, 0.12)"); // cyan sheen
      glassGrad.addColorStop(0.65, "rgba(139, 92, 246, 0.08)"); // deep violet
      glassGrad.addColorStop(0.92, "rgba(236, 72, 153, 0.18)"); // magenta edge
      glassGrad.addColorStop(1, "rgba(56, 189, 248, 0.4)"); // glowing rim

      ctx.beginPath();
      ctx.arc(orbCenterX, orbCenterY, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = glassGrad;
      ctx.fill();

      // Luminous Glass Rim (Fresnel edge highlight)
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "rgba(165, 243, 252, 0.45)";
      ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Layered Translucent Rings (3D Inclined Gyroscope / Planetary Rings)
      drawHolographicRings(ctx, orbCenterX, orbCenterY, orbRadius, globalTime);

      // Subtle Pulsing Intelligent White Core (Soft, not blinding)
      const coreGrad = ctx.createRadialGradient(
        orbCenterX,
        orbCenterY,
        0,
        orbCenterX,
        orbCenterY,
        orbRadius * 0.32,
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      coreGrad.addColorStop(0.4, "rgba(224, 242, 254, 0.2)");
      coreGrad.addColorStop(1, "rgba(224, 242, 254, 0)");

      ctx.beginPath();
      ctx.arc(orbCenterX, orbCenterY, orbRadius * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.restore();

      // =========================================================================
      // 5. FRONT ORBITAL PARTICLES & TRAILS (z >= 0, In Front of Orb)
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.z >= 0) {
          drawParticleWithTrail(ctx, p, PARTICLE_COLORS[p.colorType]);
        }
      }
      ctx.restore();
    };

    // Helper: Draw particle with silky fading tail
    function drawParticleWithTrail(c: CanvasRenderingContext2D, p: OrbitalParticle, rgb: string) {
      if (p.history.length < 2) return;

      // Draw light trail
      c.beginPath();
      c.moveTo(p.history[0].x, p.history[0].y);
      for (let j = 1; j < p.history.length; j++) {
        c.lineTo(p.history[j].x, p.history[j].y);
      }
      c.strokeStyle = `rgba(${rgb}, ${p.brightness * 0.35})`;
      c.lineWidth = p.size * 0.9;
      c.lineCap = "round";
      c.stroke();

      // Draw leading particle head
      const head = p.history[p.history.length - 1];
      c.beginPath();
      c.arc(head.x, head.y, p.size, 0, Math.PI * 2);
      c.fillStyle = `rgba(${rgb}, ${p.brightness * 0.95})`;
      c.fill();

      // Subtle outer particle glow for brighter particles
      if (p.size > 1.4) {
        c.beginPath();
        c.arc(head.x, head.y, p.size * 2.6, 0, Math.PI * 2);
        c.fillStyle = `rgba(${rgb}, ${p.brightness * 0.25})`;
        c.fill();
      }
    }

    // Helper: Draw layered translucent orbital rings around the AI orb
    function drawHolographicRings(
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      t: number,
    ) {
      // Ring 1: Cyan/Blue Ring, inclined ~25 deg, clockwise rotation
      drawSingleRing(
        c,
        cx,
        cy,
        r * 1.34,
        r * 0.42,
        -0.42 + Math.sin(t * 0.15) * 0.05,
        t * 0.2,
        "56, 189, 248",
        [10, 18],
      );

      // Ring 2: Violet/Magenta Ring, inclined -38 deg, counter-clockwise
      drawSingleRing(
        c,
        cx,
        cy,
        r * 1.58,
        r * 0.34,
        0.65 + Math.cos(t * 0.18) * 0.04,
        -t * 0.16,
        "168, 85, 247",
        [14, 24],
      );

      // Ring 3: Subtle outer ethereal track
      drawSingleRing(
        c,
        cx,
        cy,
        r * 1.9,
        r * 0.52,
        -0.85 + Math.sin(t * 0.12) * 0.04,
        t * 0.09,
        "244, 63, 94",
        [6, 30],
      );
    }

    function drawSingleRing(
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      tilt: number,
      dashOffset: number,
      rgb: string,
      dashPattern: number[],
    ) {
      c.save();
      c.translate(cx, cy);
      c.rotate(tilt);

      // Faint continuous base line
      c.beginPath();
      c.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      c.strokeStyle = `rgba(${rgb}, 0.12)`;
      c.lineWidth = 1.0;
      c.setLineDash([]);
      c.stroke();

      // Glowing dashed active light segment
      c.beginPath();
      c.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      c.strokeStyle = `rgba(${rgb}, 0.48)`;
      c.lineWidth = 1.6;
      c.lineDashOffset = dashOffset * 60;
      c.setLineDash(dashPattern);
      c.stroke();

      // Shimmering accent orbital node
      const nodeAngle = dashOffset * 1.8;
      const nx = rx * Math.cos(nodeAngle);
      const ny = ry * Math.sin(nodeAngle);

      c.beginPath();
      c.arc(nx, ny, 2.5, 0, Math.PI * 2);
      c.fillStyle = `rgba(255, 255, 255, 0.85)`;
      c.shadowColor = `rgba(${rgb}, 0.9)`;
      c.shadowBlur = 8;
      c.fill();
      c.shadowBlur = 0;

      c.restore();
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [interactive, starCount, particleCount]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#030007] ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Subtle deep space vignette for cinematic contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(3, 0, 7, 0.45) 70%, rgba(3, 0, 7, 0.92) 100%)",
        }}
      />
    </div>
  );
}
