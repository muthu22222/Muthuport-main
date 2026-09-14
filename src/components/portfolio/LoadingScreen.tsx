import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GearLoader } from "./GearLoader";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

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

          <div className="relative flex flex-col items-center justify-center">
            {/* Rotating Interlocking Gears Loader */}
            <div className="relative flex items-center justify-center">
              {/* Subtle outer tech halo */}
              <div className="absolute -inset-6 rounded-full border border-dashed border-white/10 animate-[spin_35s_linear_infinite] pointer-events-none" />

              <GearLoader size={190} speed={3.6} glow={true} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
