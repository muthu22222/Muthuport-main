import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Smooth counter animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 16);

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  // SVG Circle dimensions
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (counter / 100) * circumference;

  const titleText = "WELCOME TO MY PORTFOLIO";

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0205]"
        >
          {/* Ambient Cinematic Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full bg-[#800021]/30 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[22rem] w-[22rem] rounded-full bg-[#C24366]/20 blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-9">
            {/* High-tech Circular Ring with central initial */}
            <div className="relative flex h-36 w-36 items-center justify-center">
              {/* Outer decorative subtle dotted track */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite]" />

              {/* Progress Ring */}
              <svg className="absolute h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#800021" />
                    <stop offset="50%" stopColor="#881144" />
                    <stop offset="100%" stopColor="#ec8298" />
                  </linearGradient>
                </defs>
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-white/[0.06] fill-none"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="url(#loaderGradient)"
                  className="fill-none drop-shadow-[0_0_8px_rgba(194,67,102,0.8)]"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ ease: "easeInOut" }}
                />
              </svg>

              {/* Center Medallion */}
              <motion.div
                className="h-20 w-20 rounded-full border border-[#C24366]/40 bg-[#16060c]/80 backdrop-blur-md shadow-[0_0_30px_rgba(136,17,68,0.4)] flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-[#f9dbdb] via-[#ec8298] to-[#C24366]">
                  M
                </span>
              </motion.div>
            </div>

            {/* High-tech Typography & Status Bar */}
            <div className="flex flex-col items-center gap-3 text-center">
              <motion.h2
                initial={{ letterSpacing: "-0.1em", opacity: 0, filter: "blur(8px)" }}
                animate={{ letterSpacing: "0.28em", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.28em] pl-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f9dbdb] to-[#ec8298] drop-shadow-[0_0_12px_rgba(194,67,102,0.4)]"
              >
                {titleText}
              </motion.h2>

              {/* Monospace System Metadata */}
              <div className="font-mono text-[11px] text-muted-foreground/80 flex items-center gap-2.5 mt-1 bg-white/[0.04] border border-white/[0.08] px-3.5 py-1 rounded-full backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ec8298] shadow-[0_0_8px_rgba(236,130,152,0.9)] animate-pulse" />
                <span className="tracking-wide">SYS.LOAD: {counter}%</span>
                <span className="opacity-30">|</span>
                <span className="tracking-wider">BUILD.v2.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
