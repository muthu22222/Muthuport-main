import { motion } from "framer-motion";
import { Users, Lightbulb, Zap, Clock } from "lucide-react";
import { SectionHeader } from "./Section";

const softSkills = [
  {
    tag: "Collaboration",
    title: "Strong communication and teamwork",
    desc: "Collaborating effectively with cross-functional teams and stakeholders to build cohesive solutions.",
    icon: Users,
  },
  {
    tag: "Innovation",
    title: "Creative thinking and problem-solving",
    desc: "Approaching design and architectural challenges with innovative out-of-the-box ideas.",
    icon: Lightbulb,
  },
  {
    tag: "Speed",
    title: "Quick learner with adaptability",
    desc: "Swiftly mastering new frameworks, libraries, and emerging AI technologies to stay ahead.",
    icon: Zap,
  },
  {
    tag: "Reliability",
    title: "Time management and discipline",
    desc: "Delivering professional work under precise timelines with structured discipline.",
    icon: Clock,
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Creative designer turned{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                problem-solving developer
              </span>
              .
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Bio & Tag Pills */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-4">
              <p className="text-lg font-bold text-[#22060f] dark:text-white leading-snug">
                I’m Muthukumaran, a Computer Science and Design student at SNS College of Engineering, Coimbatore.
              </p>
              <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                Full-Stack & Python Developer experienced in React.js, Node.js, MySQL, and backend automation.
              </p>
              <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                Skilled at building and deploying web applications end-to-end with a strong foundation in problem-solving.
              </p>
              <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                Seeking a Software Developer / Web Developer Intern role to apply and grow these skills in collaborative teams.
              </p>

              {/* Status Chips */}
              <div className="flex flex-wrap gap-2.5 pt-3">
                {["Freelance", "Open to Internships", "Remote", "Coimbatore, IN"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-[#881144]/15 dark:border-white/[0.08] bg-[#881144]/5 dark:bg-white/[0.03] px-3.5 py-1 text-xs font-semibold text-[#800021] dark:text-foreground/90 backdrop-blur-md transition-colors hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Soft Skills Timeline */}
          <div className="relative">
            {/* Luminous Vertical Timeline Beam */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-[#800021] via-[#C24366] to-transparent opacity-40 dark:opacity-60" />

            <div className="space-y-5">
              {softSkills.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group relative ml-12 rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-5 backdrop-blur-xl shadow-md dark:shadow-none transition-all duration-300 hover:border-[#C24366]/40 hover:bg-white dark:hover:bg-[#14060c]/90 hover:shadow-[0_8px_30px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_8px_30px_rgba(136,17,68,0.2)]"
                >
                  {/* Glowing Node on Timeline */}
                  <div className="absolute -left-[45px] top-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#800021] to-[#881144] shadow-[0_0_15px_rgba(136,17,68,0.4)] dark:shadow-[0_0_15px_rgba(136,17,68,0.5)] z-10">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                      {item.tag}
                    </div>
                    <div className="mt-1 font-display text-base sm:text-lg font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors">
                      {item.title}
                    </div>
                    <div className="mt-1.5 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}