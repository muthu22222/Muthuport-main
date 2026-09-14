import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, Megaphone, BarChart3, Award, X, Download, Github } from "lucide-react";
import { SectionHeader } from "./Section";
import { downloadFile } from "@/lib/utils";

import certNptel from "@/assets/cert_nptel.jpg";
import certOracle from "@/assets/cert_oracle.jpg";
import certHp from "@/assets/cert_accenture.jpg";
import certAccenture from "@/assets/cert_hp.jpg";

const items = [
  {
    title: "Database Management System",
    org: "NPTEL · IIT Kharagpur (Swayam)",
    desc: "Successfully completed the 8-week proctored exam and coursework covering advanced relational model, SQL, and database transaction architectures.",
    icon: Database,
    image: certNptel,
    accentGlow: "rgba(59, 130, 246, 0.15)",
    iconColor: "text-blue-400",
  },
  {
    title: "Oracle Certified Foundations Associate",
    org: "Oracle Cloud Infrastructure",
    desc: "Achieved the official 2025 Certified AI Foundations Associate credential, validating core knowledge in machine learning models and cloud AI infrastructure.",
    icon: Cpu,
    image: certOracle,
    accentGlow: "rgba(245, 158, 11, 0.15)",
    iconColor: "text-amber-400",
  },
  {
    title: "Social Media Marketing",
    org: "HP LIFE Foundation",
    desc: "Completed the HP LIFE program specializing in target social media advertising, campaign analytics, and strategic content planning for audience engagement.",
    icon: Megaphone,
    image: certHp,
    accentGlow: "rgba(6, 182, 212, 0.15)",
    iconColor: "text-cyan-400",
  },
  {
    title: "Digital Skills: Web Analytics",
    org: "Accenture",
    desc: "Mastered fundamental analytics methodologies, measuring digital channel reach, descriptive/prescriptive insights, and building business measurement plans.",
    icon: BarChart3,
    image: certAccenture,
    accentGlow: "rgba(194, 67, 102, 0.25)",
    iconColor: "text-[#ec8298]",
  },
];

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string } | null>(null);

  return (
    <section id="certificates" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Achievements"
          title={
            <>
              Courses and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                Certification
              </span>
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-6 sm:p-7 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_12px_40px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_12px_40px_rgba(136,17,68,0.25)]"
            >
              {/* Dynamic Accent Corner Glow */}
              <div
                className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                style={{ background: it.accentGlow }}
              />

              <div className="relative flex flex-col h-full justify-between">
                <div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-[#881144]/5 dark:bg-white/[0.03] shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105 ${it.iconColor}`}
                  >
                    <it.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors leading-snug">
                    {it.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366] uppercase tracking-wider">
                    {it.org}
                  </div>
                  <p className="mt-3 text-sm font-normal text-muted-foreground leading-relaxed">
                    {it.desc}
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => setSelectedCert({ image: it.image, title: it.title })}
                    className="inline-flex items-center gap-2 rounded-full border border-[#881144]/20 dark:border-white/[0.1] bg-[#881144]/5 dark:bg-white/[0.03] px-4 py-2 text-xs font-display font-semibold text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:shadow-[0_0_15px_rgba(194,67,102,0.3)] hover:scale-105 cursor-pointer backdrop-blur-md"
                  >
                    <Award className="h-4 w-4 text-[#881144] dark:text-[#ec8298] animate-pulse" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View my works CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-center text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#881144]/25 dark:border-[#C24366]/40 bg-white/90 dark:bg-[#14060c]/80 p-8 sm:p-10 max-w-xl w-full backdrop-blur-2xl shadow-xl dark:shadow-[0_0_50px_rgba(136,17,68,0.2)]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#C24366]/15 dark:bg-[#C24366]/20 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#800021]/20 dark:bg-[#800021]/30 blur-3xl" />

            <h4 className="font-display text-lg sm:text-xl font-bold text-[#22060f] dark:text-white uppercase tracking-wider">
              View My Works
            </h4>
            <p className="mt-2.5 text-sm font-normal text-muted-foreground leading-relaxed">
              Explore my GitHub repositories to review my open-source codebases, automation scripts, and digital solutions.
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="https://github.com/muthu22222?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-6 py-3 text-sm font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(194,67,102,0.65)] pointer-events-auto"
              >
                <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Click here to explore more</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Lightbox Modal for Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-3xl border border-[#C24366]/40 bg-[#0e0408] p-3 sm:p-4 shadow-[0_0_60px_rgba(136,17,68,0.4)] cursor-default"
            >
              <div className="rounded-2xl overflow-hidden bg-black/50 border border-white/[0.06] flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} Certificate`}
                  className="max-h-[78vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() =>
                    downloadFile(
                      selectedCert.image,
                      `Muthukumaran_${selectedCert.title.replace(/\s+/g, "_")}_Certificate.jpg`
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#14060c]/80 text-foreground hover:text-white hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                  title="Download Certificate"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#14060c]/80 text-foreground hover:text-[#ec8298] hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}