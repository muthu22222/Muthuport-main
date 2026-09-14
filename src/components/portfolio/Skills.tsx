import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const skills = [
  {
    name: "Python",
    icon: "🐍",
    progress: 92,
    gradient: "from-amber-400 to-cyan-400",
    shadow: "shadow-[0_0_12px_rgba(251,191,36,0.5)]",
  },
  {
    name: "JavaScript",
    icon: "⚡",
    progress: 90,
    gradient: "from-yellow-400 to-amber-500",
    shadow: "shadow-[0_0_12px_rgba(234,179,8,0.5)]",
  },
  {
    name: "React.js",
    icon: "⚛️",
    progress: 88,
    gradient: "from-cyan-400 to-blue-500",
    shadow: "shadow-[0_0_12px_rgba(6,182,212,0.6)]",
  },
  {
    name: "Node.js",
    icon: "🟢",
    progress: 85,
    gradient: "from-emerald-400 to-green-500",
    shadow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  {
    name: "MySQL",
    icon: "🛢️",
    progress: 86,
    gradient: "from-blue-400 to-indigo-500",
    shadow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
  },
  {
    name: "Tailwind CSS",
    icon: "💨",
    progress: 92,
    gradient: "from-cyan-400 to-teal-400",
    shadow: "shadow-[0_0_12px_rgba(20,184,166,0.5)]",
  },
  {
    name: "C / C++",
    icon: "⚙️",
    progress: 82,
    gradient: "from-[#ec8298] to-[#C24366]",
    shadow: "shadow-[0_0_12px_rgba(194,67,102,0.6)]",
  },
  {
    name: "Git & GitHub",
    icon: "🐙",
    progress: 90,
    gradient: "from-slate-300 to-slate-500",
    shadow: "shadow-[0_0_12px_rgba(148,163,184,0.4)]",
  },
  {
    name: "Vercel / Firebase / Railway",
    icon: "🚀",
    progress: 88,
    gradient: "from-orange-400 to-rose-500",
    shadow: "shadow-[0_0_12px_rgba(249,115,22,0.5)]",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="SKILLS"
          title={
            <>
              Tools I use to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                ship fast
              </span>
            </>
          }
          description="A focused stack I know deeply — chosen for speed, scalability, and beautiful end results."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-5 sm:p-6 backdrop-blur-xl shadow-md dark:shadow-none transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_8px_30px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_8px_30px_rgba(136,17,68,0.2)]"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#881144]/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#881144]/15 dark:border-white/[0.08] bg-[#881144]/5 dark:bg-white/[0.03] text-2xl shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    {s.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-display text-base sm:text-lg font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors">
                        {s.name}
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                        {s.progress}%
                      </div>
                    </div>
                    <div className="text-[11px] font-medium text-muted-foreground/80 mt-0.5">
                      Production ready
                    </div>
                  </div>
                </div>

                {/* Cyber Progress Bar */}
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#881144]/10 dark:bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.05 + 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.gradient} ${s.shadow}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}