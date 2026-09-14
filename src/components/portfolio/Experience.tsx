import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Section";
import { Award, X, Download } from "lucide-react";
import { downloadFile } from "@/lib/utils";
import certificatePython from "@/assets/certificate_python.jpg";

const items = [
  {
    tag: "Internship",
    role: "Python Developer Intern",
    org: "Alfido Tech · Remote",
    period: "Aug 2025 – Sep 2025",
    desc: "Wrote and tested Python scripts to automate data processing and backend logic, strengthening core programming and debugging skills. Collaborated with dev team using Git and refactored code for performance.",
    certificateImage: certificatePython,
  },
  {
    tag: "Internship",
    role: "Web Developer Intern",
    org: "InternPe · Remote",
    period: "Nov 2025 – Dec 2025",
    desc: "Built responsive front-end components using HTML5, CSS3, and JavaScript, translating design requirements into functional UI. Integrated REST APIs with React.js for reusable components.",
  },
];

export function Experience() {
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string } | null>(null);

  return (
    <section id="experience" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Experience creates{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                mastery
              </span>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.role}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-6 sm:p-7 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_12px_40px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_12px_40px_rgba(136,17,68,0.25)]"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#881144]/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

              <div className="relative flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-[#881144]/25 dark:border-[#881144]/40 bg-[#881144]/10 dark:bg-[#881144]/15 px-3 py-1 text-xs font-semibold text-[#800021] dark:text-[#f9dbdb] shadow-sm dark:shadow-[0_0_10px_rgba(136,17,68,0.2)] backdrop-blur-md">
                      {it.tag}
                    </span>
                    <span className="font-mono text-xs font-medium text-muted-foreground/80">
                      {it.period}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors">
                    {it.role}
                  </h3>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                    {it.org}
                  </div>
                  <p className="mt-3.5 text-sm font-normal text-muted-foreground leading-relaxed">
                    {it.desc}
                  </p>
                </div>

                {it.certificateImage && (
                  <div className="mt-6 pt-2">
                    <button
                      onClick={() => setSelectedCert({ image: it.certificateImage!, title: it.role })}
                      className="inline-flex items-center gap-2 rounded-full border border-[#881144]/20 dark:border-white/[0.1] bg-[#881144]/5 dark:bg-white/[0.03] px-4 py-2 text-xs font-display font-semibold text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:shadow-[0_0_15px_rgba(194,67,102,0.3)] hover:scale-105 cursor-pointer backdrop-blur-md"
                    >
                      <Award className="h-4 w-4 text-[#881144] dark:text-[#ec8298] animate-pulse" />
                      <span>View Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
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
              {/* Image with subtle border */}
              <div className="rounded-2xl overflow-hidden bg-black/50 border border-white/[0.06] flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} Certificate`}
                  className="max-h-[78vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Action Buttons Overlay */}
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