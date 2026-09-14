import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Download,
} from "lucide-react";
import profile from "@/assets/profile.jpg";
import resume from "@/assets/resume.jpg";
import resumePdf from "@/assets/resume.pdf";
import { downloadFile } from "@/lib/utils";

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ to, duration = 3.5, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    if (start === end) return;

    const totalMilliseconds = duration * 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalMilliseconds, 1);

      // Easing out quad
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [to, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}


export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Subtle Background Radial Blend */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        {/* Left Column: Hero Text & Metrics */}
        <div>
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#881144]/30 dark:bg-[#14060c]/80 bg-[#881144]/[0.06] px-4 py-1.5 text-xs font-semibold shadow-[0_0_15px_rgba(136,17,68,0.15)] backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 dark:text-[#ec8298] text-[#881144] animate-pulse" />
            <span className="text-muted-foreground">Currently in freelancing</span>
            <span className="h-1.5 w-1.5 rounded-full dark:bg-[#ec8298] bg-[#C24366] shadow-[0_0_8px_rgba(236,130,152,0.9)]" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-condensed text-5xl sm:text-7xl lg:text-8xl tracking-wide leading-[0.9] uppercase"
          >
            <span className="text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-slate-100 dark:to-slate-400 bg-gradient-to-b from-[#1b040c] via-[#430919] to-[#73122e] drop-shadow-sm dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              Hi, I'm Muthukumaran
            </span>
            <br />
            <span className="text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-[#C24366] dark:via-[#ec8298] dark:to-[#f9dbdb] bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:drop-shadow-[0_0_35px_rgba(194,67,102,0.5)] drop-shadow-[0_0_20px_rgba(194,67,102,0.3)]">
              Full stack developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base text-muted-foreground font-normal leading-relaxed sm:text-lg"
          >
            Full Stack Web Developer & UI/UX Designer crafting fast, beautiful
            interfaces with React, Node.js and a designer's eye for detail.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-6 py-3.5 text-sm font-display font-bold text-white shadow-[0_0_25px_rgba(136,17,68,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(194,67,102,0.65)] cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full dark:border-white/[0.1] border-[#881144]/20 dark:bg-white/[0.03] bg-white/85 px-6 py-3.5 text-sm font-display font-semibold text-foreground transition-all duration-300 hover:border-[#C24366]/40 hover:bg-[#881144]/10 dark:hover:text-white hover:text-[#800021] hover:shadow-[0_0_20px_rgba(194,67,102,0.25)] backdrop-blur-md cursor-pointer shadow-sm"
            >
              Hire Me
            </a>
          </motion.div>

          {/* Floating Metric Counter Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg"
          >
            {[
              { count: 4, suffix: "+", label: "Projects Completed" },
              { count: 5, suffix: "+", label: "Courses Completed" },
              { count: 7, suffix: "+", label: "Tools Learned" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl dark:border-white/[0.08] border-[#881144]/15 dark:bg-[#14060c]/70 bg-white/85 p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_0_20px_rgba(194,67,102,0.2)] hover:-translate-y-1 shadow-md"
              >
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366] bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366]">
                  <CountUp to={stat.count} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-[11px] sm:text-xs font-medium text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto flex flex-col items-center"
        >
          {/* Avatar Container with Glow */}
          <div className="relative flex items-center justify-center h-72 w-72 sm:h-96 sm:w-96">
            {/* Cinematic Radial Back-Glow */}
            <div className="absolute inset-0 animate-glow-pulse rounded-full dark:bg-gradient-to-tr dark:from-[#800021]/45 dark:via-[#881144]/30 dark:to-[#C24366]/35 bg-gradient-to-tr from-[#ec8298]/30 via-[#C24366]/20 to-[#881144]/20 blur-3xl opacity-75 pointer-events-none" />

            {/* Portrait Image */}
            <div className="relative z-10 animate-float">
              <div className="rounded-full bg-gradient-to-tr from-[#800021] via-[#881144] via-[#C24366] to-[#ec8298] p-1 shadow-[0_0_35px_rgba(136,17,68,0.4)]">
                <div className="rounded-full dark:bg-[#0c0307] bg-white p-1">
                  <img
                    src={profile}
                    alt="Muthukumaran"
                    width={400}
                    height={400}
                    className="h-60 w-60 rounded-full object-cover object-top sm:h-80 sm:w-80"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Download Resume Button */}
          <div className="mt-8 sm:mt-10 flex justify-center z-30">
            <button
              onClick={() => downloadFile(resumePdf || resume, "Muthukumaran_Resume.pdf")}
              className="group inline-flex items-center gap-2 rounded-full dark:border-white/[0.1] border-[#881144]/20 dark:bg-[#14060c]/80 bg-white/90 hover:border-[#C24366]/50 px-5 py-2.5 text-xs font-display font-bold text-foreground dark:hover:text-white hover:text-[#800021] transition-all duration-300 hover:scale-105 hover:bg-[#881144]/10 hover:shadow-[0_0_20px_rgba(194,67,102,0.3)] backdrop-blur-xl pointer-events-auto cursor-pointer shadow-sm"
            >
              <Download className="h-4 w-4 dark:text-[#ec8298] text-[#881144] transition-transform group-hover:-translate-y-0.5" />
              <span>Download Resume</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}