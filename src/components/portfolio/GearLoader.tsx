import React from "react";
import { motion } from "framer-motion";

export interface GearLoaderProps {
  /** Size in pixels or preset string */
  size?: number | "sm" | "md" | "lg" | "xl";
  /** Rotation duration in seconds (lower is faster, default 4) */
  speed?: number;
  /** Whether to enable cinematic glowing drop shadow */
  glow?: boolean;
  /** Optional loading progress (0-100) */
  progress?: number;
  /** Whether to show a circular progress halo around the gears */
  showProgress?: boolean;
  /** Additional CSS class names */
  className?: string;
}

// Generate the 8-tooth gear path based on the user's reference sketch
function createGearPath(teeth = 8, rTip = 51, rRoot = 37): string {
  const step = (Math.PI * 2) / teeth;
  const toothHalfAngle = (6.5 * Math.PI) / 180;
  const rootHalfAngle = (11.5 * Math.PI) / 180;
  let d = "";

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const a1 = a - rootHalfAngle;
    const a2 = a - toothHalfAngle;
    const a3 = a + toothHalfAngle;
    const a4 = a + rootHalfAngle;

    const x1 = Math.cos(a1) * rRoot;
    const y1 = Math.sin(a1) * rRoot;
    const x2 = Math.cos(a2) * rTip;
    const y2 = Math.sin(a2) * rTip;
    const x3 = Math.cos(a3) * rTip;
    const y3 = Math.sin(a3) * rTip;
    const x4 = Math.cos(a4) * rRoot;
    const y4 = Math.sin(a4) * rRoot;

    if (i === 0) {
      d += `M ${x1.toFixed(2)} ${y1.toFixed(2)}`;
    } else {
      d += ` L ${x1.toFixed(2)} ${y1.toFixed(2)}`;
    }
    d += ` L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
    d += ` A ${rTip} ${rTip} 0 0 1 ${x3.toFixed(2)} ${y3.toFixed(2)}`;
    d += ` L ${x4.toFixed(2)} ${y4.toFixed(2)}`;
    const nextA1 = (i + 1) * step - rootHalfAngle;
    const nx1 = Math.cos(nextA1) * rRoot;
    const ny1 = Math.sin(nextA1) * rRoot;
    d += ` A ${rRoot} ${rRoot} 0 0 1 ${nx1.toFixed(2)} ${ny1.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

// Pre-computed gear path
const GEAR_PATH = createGearPath(8, 51, 37);

// Coordinates matching the exact diagonal mesh from the user's sketch
const GEAR1_CENTER = { x: 78, y: 72 };
const GEAR2_CENTER = { x: 144, y: 134 };

const SIZE_MAP = {
  sm: 100,
  md: 150,
  lg: 200,
  xl: 260,
};

export function GearLoader({
  size = "lg",
  speed = 4,
  glow = true,
  progress,
  showProgress = false,
  className = "",
}: GearLoaderProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 200;

  // Unique SVG IDs to avoid conflicts when multiple instances are mounted
  const idSuffix = React.useId().replace(/:/g, "-");
  const grad1Id = `gearGrad1${idSuffix}`;
  const grad2Id = `gearGrad2${idSuffix}`;
  const glowFilterId = `gearGlow${idSuffix}`;
  const hubGradId = `gearHubGrad${idSuffix}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      role="status"
      aria-label="Loading..."
    >
      <svg
        viewBox="0 0 220 206"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Luxurious crimson & rose gradients tailored to portfolio theme */}
          <linearGradient id={grad1Id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9dbdb" />
            <stop offset="30%" stopColor="#ec8298" />
            <stop offset="70%" stopColor="#C24366" />
            <stop offset="100%" stopColor="#881144" />
          </linearGradient>

          <linearGradient id={grad2Id} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7597" />
            <stop offset="35%" stopColor="#C24366" />
            <stop offset="75%" stopColor="#881144" />
            <stop offset="100%" stopColor="#550015" />
          </linearGradient>

          <radialGradient id={hubGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec8298" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#16060c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0205" stopOpacity="1" />
          </radialGradient>

          {/* Cinematic Neon Aura Filter */}
          {glow && (
            <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Optional Progress Ring Halo */}
        {showProgress && typeof progress === "number" && (
          <g>
            <circle
              cx="110"
              cy="103"
              r="100"
              className="stroke-white/[0.06] fill-none"
              strokeWidth="2"
            />
            <circle
              cx="110"
              cy="103"
              r="100"
              stroke={`url(#${grad1Id})`}
              className="fill-none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
              style={{
                transformOrigin: "110px 103px",
                transform: "rotate(-90deg)",
                transition: "stroke-dashoffset 0.3s ease",
              }}
            />
          </g>
        )}

        {/* Ambient Backlight Blur */}
        {glow && (
          <g opacity="0.45">
            <circle
              cx={GEAR1_CENTER.x}
              cy={GEAR1_CENTER.y}
              r="40"
              fill="#881144"
              className="blur-xl"
            />
            <circle
              cx={GEAR2_CENTER.x}
              cy={GEAR2_CENTER.y}
              r="40"
              fill="#C24366"
              className="blur-xl"
            />
          </g>
        )}

        {/* Top-Left Gear (Rotates Clockwise) */}
        <motion.g
          style={{ transformOrigin: `${GEAR1_CENTER.x}px ${GEAR1_CENTER.y}px` }}
          animate={{ rotate: 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <g
            transform={`translate(${GEAR1_CENTER.x}, ${GEAR1_CENTER.y})`}
            filter={glow ? `url(#${glowFilterId})` : undefined}
          >
            {/* Gear Body */}
            <path
              d={GEAR_PATH}
              fill="rgba(194, 67, 102, 0.08)"
              stroke={`url(#${grad1Id})`}
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Central Inner Hole (Hub) */}
            <circle
              cx="0"
              cy="0"
              r="19"
              fill={`url(#${hubGradId})`}
              stroke={`url(#${grad1Id})`}
              strokeWidth="6.5"
            />
            {/* Center Axis Jewel Accent */}
            <circle cx="0" cy="0" r="3.5" fill="#f9dbdb" opacity="0.8" />
          </g>
        </motion.g>

        {/* Bottom-Right Gear (Rotates Counter-Clockwise in exact mesh synchronization) */}
        <motion.g
          style={{ transformOrigin: `${GEAR2_CENTER.x}px ${GEAR2_CENTER.y}px` }}
          initial={{ rotate: 22.5 }}
          animate={{ rotate: 22.5 - 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <g
            transform={`translate(${GEAR2_CENTER.x}, ${GEAR2_CENTER.y})`}
            filter={glow ? `url(#${glowFilterId})` : undefined}
          >
            {/* Gear Body */}
            <path
              d={GEAR_PATH}
              fill="rgba(194, 67, 102, 0.08)"
              stroke={`url(#${grad2Id})`}
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Central Inner Hole (Hub) */}
            <circle
              cx="0"
              cy="0"
              r="19"
              fill={`url(#${hubGradId})`}
              stroke={`url(#${grad2Id})`}
              strokeWidth="6.5"
            />
            {/* Center Axis Jewel Accent */}
            <circle cx="0" cy="0" r="3.5" fill="#f9dbdb" opacity="0.8" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
