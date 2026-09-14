import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Github, ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { SectionHeader } from "./Section";
import { downloadFile } from "@/lib/utils";
import clinic from "@/assets/project-clinic.jpg";
import studymate from "@/assets/project-studymate.png";

import studymateAnalytics from "@/assets/studymate_analytics.png";
import studymateDashboard from "@/assets/studymate_dashboard.png";
import studymateSignup from "@/assets/studymate_signup.png";
import studymateLanding from "@/assets/studymate_landing.png";

import frostbiteBrowse from "@/assets/frostbite_browse.png";
import frostbiteDetails from "@/assets/frostbite_details.png";
import frostbiteBrochure from "@/assets/frostbite_brochure.png";

import factorySightDashboard from "@/assets/factory_sight_dashboard.jpg";
import factorySightAnalytics from "@/assets/factory_sight_analytics.jpg";

const projects = [
  {
    title: "Health Nav",
    description:
      "A healthcare web application that recommends appropriate doctors/specialists based on user-reported symptoms, age, and symptom duration. Features symptom-to-specialist matching logic and structured MySQL schema.",
    image: clinic,
    tags: ["React.js", "Node.js", "MySQL", "API Handling"],
    demo: "#",
    repo: "https://github.com/muthu22222",
    designs: [
      {
        image: clinic,
        caption: "Health Nav — Healthcare doctor recommendation & specialist matching.",
      },
    ],
  },
  {
    title: "Study-Mate AI",
    description:
      "An AI-powered study planner that helps students create and track personalized study schedules. Implements AI-driven plan generation and progress tracking features to keep users on pace with their goals.",
    image: studymate,
    tags: ["React.js", "Node.js", "AI/API Integration"],
    demo: "#",
    repo: "https://github.com/muthu22222/Study-Mate-AI",
    designs: [
      {
        image: studymateLanding,
        caption: "Landing Page — conversion-focused marketing page highlighting core features.",
      },
      {
        image: studymateDashboard,
        caption: "Dashboard Home — daily study schedules, statistics cards, and upcoming exams.",
      },
      {
        image: studymateAnalytics,
        caption:
          "Progress Analytics — comprehensive learning trends, subject distributions, and AI insights.",
      },
      {
        image: studymateSignup,
        caption: "User Onboarding — seamless sign-up and authentication onboarding flow.",
      },
    ],
  },
  {
    title: "Factory Sight AI",
    description:
      "An AI-powered predictive maintenance platform that combines sensor monitoring, YOLO-based defect detection, XGBoost failure prediction, and Gemini AI analysis to identify machine risks and provide automated maintenance alerts.",
    image: factorySightDashboard,
    tags: ["React.js", "Node.js", "AI/API Integration", "YOLO", "XGBoost", "Gemini AI"],
    demo: "#",
    repo: "https://github.com/muthu22222/Factory-Sight-AI",
    designs: [
      {
        image: factorySightDashboard,
        caption:
          "Dashboard Overview — real-time sensor monitoring, YOLO defect detection feed, and XGBoost failure risk gauge.",
      },
      {
        image: factorySightAnalytics,
        caption:
          "Automated Maintenance Alert — YOLO visual inspection, XGBoost Remaining Useful Life (RUL) curve, and Gemini AI root-cause diagnostics.",
      },
    ],
  },
  {
    title: "Ready-to-Eat",
    description:
      "A mobile/web food ordering platform letting users browse, order, and track ready-made food from nearby restaurants in real time. Deployed using Firebase for backend services.",
    image: frostbiteBrowse,
    tags: ["React.js", "Node.js", "MySQL", "Firebase"],
    demo: "#",
    repo: "https://github.com/muthu22222/readytoeat",
    designs: [
      {
        image: frostbiteBrowse,
        caption: "Browse Meals — browse food categories and items in real time.",
      },
      {
        image: frostbiteDetails,
        caption: "Product Detail — view item details, pricing, and order tracking.",
      },
      {
        image: frostbiteBrochure,
        caption: "Brochure Request — simple dynamic order tracking form.",
      },
    ],
  },
];

export function Projects() {
  const [activeDesigns, setActiveDesigns] = useState<{ image: string; caption: string }[] | null>(
    null,
  );
  const [activeSlide, setActiveSlide] = useState(0);

  const openLightbox = (designsList: { image: string; caption: string }[]) => {
    setActiveDesigns(designsList);
    setActiveSlide(0);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeDesigns) return;
    setActiveSlide((prev) => (prev + 1) % activeDesigns.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeDesigns) return;
    setActiveSlide((prev) => (prev - 1 + activeDesigns.length) % activeDesigns.length);
  };

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title={
            <>
              Projects I've{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                shipped
              </span>
            </>
          }
          description="A few products built from scratch — design, frontend, backend, deployment."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 backdrop-blur-xl shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_20px_50px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_20px_50px_rgba(136,17,68,0.25)]"
            >
              {/* Media Container with Cinematic Vignette */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/10 dark:bg-black/40">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent dark:from-[#14060c] dark:via-[#14060c]/30" />
              </div>

              {/* Card Body */}
              <div className="relative -mt-14 p-6 sm:p-8">
                {/* Tech Pills */}
                <div className="mb-3.5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#881144]/25 dark:border-[#881144]/40 bg-white/90 dark:bg-[#881144]/15 px-3 py-1 text-xs font-semibold text-[#800021] dark:text-[#f9dbdb] shadow-sm dark:shadow-[0_0_10px_rgba(136,17,68,0.2)] backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-2xl font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm font-normal text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => openLightbox(p.designs)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-4 py-2 text-xs font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.3)] dark:shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(194,67,102,0.65)] cursor-pointer"
                  >
                    <Palette className="h-3.5 w-3.5" />
                    <span>View Designs</span>
                  </button>
                  {p.repo && p.repo !== "#" && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#881144]/20 dark:border-white/[0.1] bg-[#881144]/5 dark:bg-white/[0.03] px-4 py-2 text-xs font-display font-semibold text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/40 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:shadow-[0_0_15px_rgba(194,67,102,0.25)] backdrop-blur-md cursor-pointer"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Project Designs Carousel Lightbox */}
      <AnimatePresence>
        {activeDesigns && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDesigns(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#C24366]/40 bg-[#0e0408] p-3 sm:p-4 shadow-[0_0_60px_rgba(136,17,68,0.4)] cursor-default"
            >
              {/* Slideshow Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/70 flex items-center justify-center border border-white/[0.06]">
                <motion.img
                  key={activeSlide}
                  src={activeDesigns[activeSlide].image}
                  alt={`Design slide ${activeSlide + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-contain"
                />

                {/* Left/Right Navigation Arrows */}
                {activeDesigns.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#14060c]/80 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.4)] cursor-pointer z-10"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#14060c]/80 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.4)] cursor-pointer z-10"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Dots indicator */}
                {activeDesigns.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 rounded-full border border-white/[0.1] bg-[#14060c]/80 px-3.5 py-1.5 backdrop-blur-md">
                    {activeDesigns.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === activeSlide
                            ? "bg-[#ec8298] w-5 shadow-[0_0_8px_rgba(236,130,152,0.9)]"
                            : "bg-white/30 hover:bg-white/60 w-2"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Caption Bar */}
              <div className="p-4 sm:p-5 bg-[#0e0408]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f9dbdb] via-[#ec8298] to-[#C24366] tracking-widest uppercase">
                      Screen {activeSlide + 1} of {activeDesigns.length}
                    </span>
                    <p className="mt-1 text-sm font-medium text-foreground/90">
                      {activeDesigns[activeSlide].caption}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() =>
                        downloadFile(
                          activeDesigns[activeSlide].image,
                          `StudyMate_Design_${activeSlide + 1}.png`,
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-foreground hover:text-white hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] transition-all hover:scale-105 cursor-pointer"
                      title="Download image"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveDesigns(null)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-foreground hover:text-[#ec8298] hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] transition-all hover:scale-105 cursor-pointer"
                      title="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
