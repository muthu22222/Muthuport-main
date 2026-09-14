import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-[#800021] via-[#881144] via-[#C24366] to-[#ec8298]"
      style={{
        scaleX,
        boxShadow: "0 0 12px rgba(194, 67, 102, 0.7), 0 0 24px rgba(236, 130, 152, 0.5)",
      }}
    />
  );
}
