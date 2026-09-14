import { motion } from "framer-motion";

const particles = [
  { id: 1, x: "12%", y: "25%", size: 2, duration: 8, delay: 0 },
  { id: 2, x: "28%", y: "65%", size: 3, duration: 11, delay: 1 },
  { id: 3, x: "45%", y: "15%", size: 2, duration: 9, delay: 2 },
  { id: 4, x: "68%", y: "40%", size: 2.5, duration: 12, delay: 0.5 },
  { id: 5, x: "82%", y: "75%", size: 2, duration: 10, delay: 1.5 },
  { id: 6, x: "90%", y: "20%", size: 3, duration: 13, delay: 2.5 },
  { id: 7, x: "35%", y: "85%", size: 2, duration: 7, delay: 3 },
  { id: 8, x: "55%", y: "60%", size: 1.5, duration: 10, delay: 1 },
];

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-background">
      {/* 1. Subtle Futuristic Cyber Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* 2. Soft Ambient Glowing Orbs */}
      {/* Deep Burgundy / Soft Rose Orb (Top-Left) */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-[#ec8298]/25 dark:bg-[#800021]/30 blur-[140px]"
      />

      {/* Vivid Rose / Champagne Blush Orb (Right-Center) */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#f9dbdb]/50 dark:bg-[#C24366]/22 blur-[150px]"
      />

      {/* Rich Crimson / Soft Rose Berry Orb (Bottom-Left) */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -35, 25, 0],
          scale: [0.95, 1.1, 1, 0.95],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#C24366]/15 dark:bg-[#881144]/25 blur-[160px]"
      />

      {/* Subtle Central Rose Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#ec8298]/[0.08] dark:bg-[#ec8298]/[0.05] blur-[180px]" />

      {/* 3. Minimal Cinematic Micro-Particles in Blossom Pink */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#ec8298]"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 ${p.size * 3}px rgba(236, 130, 152, 0.85)`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.6, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* 4. Cinematic Vignette (dark mode only for deep contrast) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(13, 3, 7, 0.6) 100%)",
        }}
      />
    </div>
  );
}
